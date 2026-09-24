<script setup>
import { ref, watch, nextTick } from 'vue';
import { useAIAgentStore } from '@/stores';
import { useApi } from '@/stores/api';
import copilot from '@/assets/copilot-icon.png';

const props = defineProps({
    visible: Boolean
});

const emit = defineEmits(['close', 'open']);

const AIAgentStore = useAIAgentStore();
const apiConfig = useApi();
const promptInput = ref("");
const showSuggestions = ref(true);
const copiedId = ref(null);
const isLoading = ref(false);
const editingMsgId = ref(null);
const editingContent = ref("");

// Unified tracking log stream array
const chatMessages = ref([
    {
        id: 'msg-init',
        role: 'system',
        content: 'Welcome to your Premier League AI assistant. Ask me statistical questions, historical facts, or query specific club parameters!'
    }
]);

// Track processed keys to prevent recursive watch loop execution drops
const processedPrompts = new Set();

watch(
    () => AIAgentStore.activeDashboardPrompt,
    async (newPrompt) =>
    {
        if (newPrompt && newPrompt.trim() !== "")
        {
            const targetPrompt = newPrompt.trim();

            // Generate unique execution stamp identifier
            const runKey = `${targetPrompt}-${Date.now()}`;
            if (processedPrompts.has(runKey)) return;
            processedPrompts.add(runKey);

            // Cleanly elevate UI structure status properties first
            AIAgentStore.isPanelVisible = true;
            emit('open');

            // Wait for structural DOM rendering updates to finish settling
            await nextTick();

            // Run submission workflow
            await submitPrompt(targetPrompt);

            // Clear out global store text only AFTER local processing completes cleanly
            AIAgentStore.activeDashboardPrompt = "";

            // Clear reference memory cache
            setTimeout(() => processedPrompts.delete(runKey), 1000);
        }
    },
    { immediate: true }
);

const suggestedPrompts = [
    "Surprise me!",
    "What have I missed?",
    "How can I follow the Premier League?",
    "Show me the top 5 oldest football clubs"
];

const copyToClipboard = async (text, msgId) =>
{
    try
    {
        await navigator.clipboard.writeText(text);
        copiedId.value = msgId;
        setTimeout(() => { copiedId.value = null; }, 2000);
    } catch (err)
    {
        console.error("Failed to copy", err);
    }
};

const formatAiDescription = (text) =>
{
    if (!text) return '';

    let formatted = text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

    formatted = formatted.replace(
        /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g,
        '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#10b981] hover:underline inline-flex items-center gap-0.5 font-medium mx-0.5">$1 <i class="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-70"></i></a>'
    );

    formatted = formatted.replace(/###\s+(.*?)(?=<br\s*\/?>|$)/g, '<h5 class="text-white font-bold text-xs uppercase tracking-wider mt-3 mb-1">$1</h5>');
    formatted = formatted.replace(/\*\*(.*?)\*\"/g, '<strong class="text-[#933afb] font-semibold">$1</strong>');
    formatted = formatted.replace(/(\d+\.\s+)/g, '<br/><span class="text-purple-400 font-mono font-bold inline-block mt-2 mr-1">$1</span>');

    return formatted;
};

const isUrl = (value) => typeof value === 'string' && (value.startsWith('http://') || value.startsWith('https://'));

const getBaseApiUrl = () =>
{
    if (apiConfig.BASE_URL) return apiConfig.BASE_URL.replace(/\/$/, '');
    if (apiConfig.API_URL) return apiConfig.API_URL.replace(/\/$/, '');
    return "http://localhost:5245";
};

const getMediaSrc = (row) =>
{
    const baseUrl = getBaseApiUrl();

    const thumbnail = row.Thumbnail || row.thumbnail;
    if (thumbnail)
    {
        if (isUrl(thumbnail)) return thumbnail;

        const newsDir = apiConfig.NEWS_DIR || apiConfig.NEWS_IMAGE_DIR || '/upload/news/';
        if (isUrl(newsDir)) return newsDir.replace(/\/$/, '') + '/' + thumbnail.replace(/^\//, '');

        const formattedDir = newsDir.startsWith('/') ? newsDir : `/${newsDir}`;
        return baseUrl + formattedDir.replace(/\/$/, '') + '/' + thumbnail.replace(/^\//, '');
    }

    // 2. Player Photos
    const playerPhoto = row.PlayerPhoto || row.playerPhoto;
    if (playerPhoto)
    {
        if (isUrl(playerPhoto)) return playerPhoto;

        const playerDir = apiConfig.PLAYER_DIR || apiConfig.PLAYER_IMAGE_DIR || '/upload/players/';
        if (isUrl(playerDir)) return playerDir.replace(/\/$/, '') + '/' + playerPhoto.replace(/^\//, '');

        const formattedDir = playerDir.startsWith('/') ? playerDir : `/${playerDir}`;
        return baseUrl + formattedDir.replace(/\/$/, '') + '/' + playerPhoto.replace(/^\//, '');
    }

    // 3. Club Crests
    const clubCrest = row.ClubCrest || row.clubCrest;
    if (clubCrest)
    {
        if (isUrl(clubCrest)) return clubCrest;

        const clubDir = apiConfig.CLUB_DIR || apiConfig.CLUB_IMAGE_DIR || '/upload/clubs/';
        if (isUrl(clubDir))
        {
            return clubDir.replace(/\/$/, '') + '/' + clubCrest.replace(/^\//, '');
        }

        const formattedDir = clubDir.startsWith('/') ? clubDir : `/${clubDir}`;
        return baseUrl + formattedDir.replace(/\/$/, '') + '/' + clubCrest.replace(/^\//, '');
    }

    return null;
};

const handleImageError = (e) =>
{
    e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23933afb' stroke-width='1.5' opacity='0.4'><rect width='18' height='18' x='3' y='3' rx='2' ry='2'/><circle cx='9' cy='9' r='2'/><path d='m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21'/></svg>";
};

const cleanKeyName = (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();

const startEdit = (msg) =>
{
    editingMsgId.value = msg.id;
    editingContent.value = msg.content;
};

const cancelEdit = () =>
{
    editingMsgId.value = null;
    editingContent.value = "";
};

const saveAndResend = async (msgId) =>
{
    if (!editingContent.value.trim()) return;

    const index = chatMessages.value.findIndex(m => m.id === msgId);
    if (index === -1) return;

    chatMessages.value[index].content = editingContent.value;
    const updatedPrompt = editingContent.value;
    chatMessages.value = chatMessages.value.slice(0, index + 1);

    cancelEdit();
    await executeAIService(updatedPrompt);
};

const deleteMessage = (msgId) =>
{
    const index = chatMessages.value.findIndex(m => m.id === msgId);
    if (index === -1) return;

    if (chatMessages.value[index].role === 'user')
    {
        chatMessages.value.splice(index, 2);
    } else
    {
        chatMessages.value.splice(index, 1);
    }
};

const resendPrompt = async (promptText) =>
{
    await executeAIService(promptText);
};

const submitPrompt = async (textToSubmit) =>
{
    const currentPrompt = textToSubmit || promptInput.value;
    if (!currentPrompt || !currentPrompt.trim()) return;

    const cleanPrompt = currentPrompt.trim();
    const userMsgId = `msg-${Date.now()}`;

    chatMessages.value.push({
        id: userMsgId,
        role: 'user',
        content: cleanPrompt
    });

    if (!textToSubmit)
    {
        promptInput.value = "";
    }

    await executeAIService(cleanPrompt);
};

const executeAIService = async (promptText) =>
{
    isLoading.value = true;
    AIAgentStore.isAiAgentProcessing = true;

    try
    {
        await AIAgentStore.askAI(promptText);

        let rawData = AIAgentStore.aiResponse;
        if (rawData && typeof rawData === 'object' && 'value' in rawData)
        {
            rawData = rawData.value;
        }

        let parsedData = null;
        if (typeof rawData === 'string')
        {
            try
            {
                parsedData = JSON.parse(rawData);
            } catch (e)
            {
                parsedData = null;
            }
        } else if (rawData && typeof rawData === 'object')
        {
            parsedData = rawData;
        }

        const aiMsgId = `msg-ai-${Date.now()}`;

        if (parsedData && (parsedData.chat || parsedData.data))
        {
            chatMessages.value.push({
                id: aiMsgId,
                role: 'assistant',
                content: parsedData.chat?.description || "Data loaded.",
                structured: JSON.parse(JSON.stringify(parsedData))
            });
        } else
        {
            const plainTextResponse = typeof rawData === 'string' ? rawData : JSON.stringify(rawData);
            chatMessages.value.push({
                id: aiMsgId,
                role: 'assistant',
                content: plainTextResponse || "Response generated with no text output."
            });
        }
    } catch (error)
    {
        console.error("Agent Panel invocation breakdown:", error);
        chatMessages.value.push({
            id: `msg-err-${Date.now()}`,
            role: 'assistant',
            content: "An execution problem happened while parsing database queries."
        });
    } finally
    {
        isLoading.value = false;
        AIAgentStore.isAiAgentProcessing = false;
    }
};

defineExpose({
    submitPrompt
});
</script>

<template>
    <div v-if="visible || AIAgentStore.isPanelVisible"
        class="fixed top-0 right-0 h-screen w-[500px] bg-[#1a011d] border-l border-white/10 shadow-2xl flex flex-col z-50 transition-all duration-300 font-sans">

        <div class="p-4 border-b border-white/10 flex items-center justify-between bg-[#19021d]">
            <div class="flex items-center gap-2">
                <div class="w-4 h-4" :class="{ 'animate-pulse': isLoading }">
                    <img :src="copilot" alt="Copilot" class="w-4 h-4" />
                </div>
                <span class="text-xs font-mono text-white/50 tracking-wider uppercase">COPILOT @OLLAMA</span>
            </div>

            <button @click="emit('close'); AIAgentStore.isPanelVisible = false;"
                class="text-white/40 hover:text-white transition-colors cursor-pointer p-1">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div v-for="msg in chatMessages" :key="msg.id"
                :class="['flex flex-col w-full group relative', msg.role === 'user' ? 'items-end' : 'items-start']">

                <div v-if="msg.role === 'user'" class="max-w-[85%] flex flex-col items-end gap-1.5">
                    <div v-if="editingMsgId !== msg.id"
                        class="p-3 px-4 rounded-2xl text-sm leading-relaxed bg-[#3d195d] text-white rounded-br-none shadow-md">
                        {{ msg.content }}
                    </div>

                    <div class="w-full bg-[#210425] border border-white/10 rounded-xl p-2 space-y-2 min-w-[280px]"
                        v-else>
                        <textarea v-model="editingContent" rows="2"
                            class="w-full bg-transparent text-sm text-white focus:outline-none resize-none p-1"></textarea>
                        <div class="flex justify-end gap-2 text-xs">
                            <button @click="cancelEdit"
                                class="px-2.5 py-1 rounded bg-white/5 text-white/60 hover:bg-white/10 cursor-pointer">
                                Cancel
                            </button>
                            <button @click="saveAndResend(msg.id)" :disabled="isLoading"
                                class="px-2.5 py-1 rounded bg-[#933afb] text-white hover:bg-[#8126e0] disabled:opacity-50 cursor-pointer">
                                Save & Submit
                            </button>
                        </div>
                    </div>

                    <div v-if="editingMsgId !== msg.id"
                        class="opacity-0 group-hover:opacity-100 flex items-center gap-2 text-white/40 text-xs transition-opacity duration-200 pr-1">
                        <button @click="startEdit(msg)" class="hover:text-white cursor-pointer transition-colors">
                            <i class="fa-regular fa-pen-to-square"></i> Edit
                        </button>
                        <span>•</span>
                        <button @click="resendPrompt(msg.content)" :disabled="isLoading"
                            class="hover:text-white cursor-pointer transition-colors disabled:opacity-40">
                            <i class="fa-solid fa-rotate-right text-[11px]"></i> Resend
                        </button>
                        <span>•</span>
                        <button @click="deleteMessage(msg.id)"
                            class="hover:text-red-400 cursor-pointer transition-colors">
                            <i class="fa-regular fa-trash-can"></i> Delete
                        </button>
                    </div>
                </div>

                <div v-else-if="msg.role === 'assistant' && msg.structured" class="w-full space-y-4 text-white">
                    <div class="grid grid-cols-[auto_1fr] gap-2">
                        <div
                            class="w-5 h-5 p-0.5 rounded-full bg-[#3d195d]/20 flex items-center justify-center mt-0.5 border border-[#3d195d]/30">
                            <img :src="copilot" alt="Copilot" class="w-3 h-3" />
                        </div>
                        <div class="w-full relative">
                            <div class="flex items-center justify-between">
                                <h4 class="text-sm font-bold text-white/90">
                                    {{ msg.structured.chat?.title || 'System Response' }}
                                </h4>
                                <button @click="deleteMessage(msg.id)"
                                    class="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 cursor-pointer transition-all text-xs">
                                    <i class="fa-regular fa-trash-can"></i>
                                </button>
                            </div>

                            <p v-html="formatAiDescription(msg.structured.chat?.description)"
                                class="text-sm text-white/70 leading-relaxed font-normal mt-1 pr-2">
                            </p>
                        </div>
                    </div>

                    <div v-if="msg.structured.chat?.sql && msg.structured.chat.sql.trim() !== ''"
                        class="rounded-xl overflow-hidden border border-white/10 bg-[#16021a] shadow-lg ml-8">
                        <div
                            class="flex items-center justify-between px-4 py-2 bg-white/[0.03] text-[11px] font-mono text-white/40 border-b border-white/5">
                            <span class="tracking-wider text-white/60">sql</span>
                            <button @click="copyToClipboard(msg.structured.chat.sql, msg.id)"
                                class="hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer">
                                <i
                                    :class="copiedId === msg.id ? 'fa-solid fa-check text-[#933afb]' : 'fa-regular fa-copy'"></i>
                                <span>{{ copiedId === msg.id ? 'Copied!' : 'Copy code' }}</span>
                            </button>
                        </div>
                        <div class="p-4 overflow-x-auto font-mono text-xs text-purple-200/90 leading-6 whitespace-pre">
                            {{ msg.structured.chat.sql }}
                        </div>
                    </div>

                    <div v-if="msg.structured.data && msg.structured.data.length > 0"
                        class="ml-8 space-y-3 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                        <div class="text-[10px] font-mono text-white/30 tracking-wider uppercase mb-1">Dataset Results
                        </div>

                        <div class="space-y-3">
                            <div v-for="(row, idx) in msg.structured.data" :key="idx"
                                class="text-sm text-white/80 leading-relaxed flex items-start gap-2.5">
                                <span class="text-[#933afb] text-base leading-none select-none mt-1">•</span>

                                <div v-if="getMediaSrc(row)"
                                    class="w-10 h-10 flex items-center justify-center overflow-hidden shrink-0 mt-0.5 rounded border border-white/5 bg-white/[0.01]">
                                    <img :src="getMediaSrc(row)" class="w-full h-full object-contain p-0.5"
                                        @error="handleImageError" />
                                </div>

                                <div class="flex-1 min-w-0">
                                    <span class="text-white font-bold">
                                        {{ row.Title || row.title || row.PlayerName || row.playerName || row.Name ||
                                            row.name || row.ClubShortName || row.clubShortName || `Record #${idx + 1}` }}
                                    </span>

                                    <span
                                        v-if="row.PlayerId || row.playerId || row.ClubId || row.clubId || row.Id || row.id"
                                        class="text-white/40 text-xs font-mono ml-1.5">
                                        (ID: {{ row.PlayerId || row.playerId || row.ClubId || row.clubId || row.Id ||
                                            row.id }})
                                    </span>

                                    <div
                                        class="text-xs text-white/50 space-x-2 mt-0.5 flex flex-wrap gap-y-1 items-center">
                                        <template v-for="(val, key) in row" :key="key">
                                            <span
                                                v-if="!['playername', 'name', 'title', 'playerid', 'id', 'clubid', 'playerphoto', 'clubcrest', 'thumbnail', 'clubtheme', 'teamthemecolor'].includes(key.toLowerCase()) && val !== null && val !== undefined"
                                                class="inline-flex items-center gap-1">
                                                <span class="text-white/30 font-light text-[11px]">{{ cleanKeyName(key)
                                                }}:</span>

                                                <span v-if="isUrl(val)">
                                                    <a :href="val" target="_blank" rel="noopener noreferrer"
                                                        class="text-[#10b981] hover:underline inline-flex items-center gap-0.5 font-medium transition-all">
                                                        Visit Link <i
                                                            class="fa-solid fa-arrow-up-right-from-square text-[9px] opacity-70"></i>
                                                    </a>
                                                </span>
                                                <span v-else class="text-white/70 font-medium truncate max-w-[260px]">
                                                    {{ val }}
                                                </span>
                                                <span class="text-white/10 ml-2 select-none last:hidden">|</span>
                                            </span>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="msg.structured.chat?.tip"
                        class="ml-8 p-3 rounded-xl bg-[#933afb]/5 border border-[#933afb]/15 flex gap-2.5 text-xs text-white/80 leading-relaxed">
                        <i class="fa-regular fa-lightbulb text-[#933afb] text-sm mt-0.5 shrink-0"></i>
                        <div>
                            <span class="font-bold text-[#933afb]">Tip: </span>
                            <span>{{ msg.structured.chat.tip }}</span>
                        </div>
                    </div>
                </div>

                <div v-else-if="msg.role === 'assistant' && !msg.structured"
                    class="w-full space-y-2 text-white grid grid-cols-[auto_1fr] gap-2">
                    <div
                        class="w-5 h-5 p-0.5 rounded-full bg-[#3d195d]/20 flex items-center justify-center mt-0.5 border border-[#3d195d]/30">
                        <img :src="copilot" alt="Copilot" class="w-3 h-3" />
                    </div>
                    <div class="w-full relative bg-white/[0.02] p-4 rounded-xl border border-white/5 ml-1">
                        <div class="flex items-center justify-between border-b border-white/5 pb-1 mb-2">
                            <h4 class="text-[10px] font-mono text-white/40 uppercase tracking-wider">Assistant Response
                            </h4>
                            <button @click="deleteMessage(msg.id)"
                                class="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 text-xs cursor-pointer transition-all">
                                <i class="fa-regular fa-trash-can"></i>
                            </button>
                        </div>
                        <p class="text-sm text-white/80 leading-relaxed font-normal mt-1 whitespace-pre-line">
                            {{ msg.content }}
                        </p>
                    </div>
                </div>

                <div v-else-if="msg.role === 'system'"
                    class="p-4 bg-white/[0.02] border border-white/5 rounded-xl text-xs text-white/60 leading-relaxed max-w-full">
                    <div class="flex justify-between items-start gap-4">
                        <span>{{ msg.content }}</span>
                        <button @click="deleteMessage(msg.id)"
                            class="opacity-0 group-hover:opacity-100 text-white/30 hover:text-red-400 text-[11px] mt-0.5 cursor-pointer transition-all">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div v-if="isLoading" class="flex items-start gap-2 w-full animate-pulse">
                <div class="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center mt-0.5">
                    <i class="fa-solid fa-circle-notch animate-spin text-xs text-white/40"></i>
                </div>
                <div class="space-y-2 flex-1">
                    <div class="h-3 bg-white/10 rounded w-1/4"></div>
                    <div class="h-4 bg-white/5 rounded w-3/4"></div>
                </div>
            </div>
        </div>

        <div v-if="showSuggestions" class="p-3 bg-[#16021a] border-t border-white/5 relative group transition-all">
            <div class="flex items-center justify-between mb-2 px-1">
                <p class="text-[10px] text-white/30 font-mono uppercase tracking-wider">Suggested Questions</p>
                <button @click="showSuggestions = false"
                    class="text-white/30 hover:text-white/80 transition-colors cursor-pointer">
                    <i class="fa-solid fa-xmark text-[10px]"></i>
                </button>
            </div>

            <div class="flex flex-wrap gap-1.5">
                <button v-for="suggestion in suggestedPrompts" :key="suggestion" @click="submitPrompt(suggestion)"
                    :disabled="isLoading"
                    class="text-xs bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 disabled:opacity-40 text-white/80 px-3 py-1.5 rounded-lg transition-all text-left cursor-pointer">
                    {{ suggestion }}
                </button>
            </div>
        </div>

        <div class="p-4 bg-[#140117] border-t border-white/10">
            <div
                class="relative flex items-center bg-[#210425] border border-white/10 rounded-xl focus-within:border-[#3d195d] transition-all">
                <input v-model="promptInput" @keyup.enter="submitPrompt(null)" :disabled="isLoading" type="text"
                    placeholder="Ask AI Agent..."
                    class="w-full bg-transparent text-sm text-white placeholder-white/20 pl-4 pr-12 py-3.5 focus:outline-none disabled:opacity-50" />
                <button @click="submitPrompt(null)" :disabled="isLoading || !promptInput.trim()"
                    class="absolute right-2 p-2 rounded-lg text-white/40 hover:text-white disabled:text-white/10 transition-colors cursor-pointer">
                    <i class="fa-solid fa-arrow-up text-sm"></i>
                </button>
            </div>
        </div>
    </div>
</template>