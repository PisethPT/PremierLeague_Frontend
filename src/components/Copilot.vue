<script setup>
import { ref } from 'vue';
import { useAIAgentStore } from '@/stores';
import { Refresh } from '@element-plus/icons-vue';
import copilot from '@/assets/copilot-icon.png';

const AIAgentStore = useAIAgentStore();
const localInputPrompt = ref("");

const handleSend = async (promptText) =>
{
    console.log("prompt: " + promptText)
    if (AIAgentStore.isAiAgentProcessing || !promptText || !promptText.trim()) return;

    AIAgentStore.isPanelVisible = true;
    await nextTick();

    AIAgentStore.activeDashboardPrompt = promptText.trim();

    localInputPrompt.value = "";
};
</script>

<template>
    <div class="w-full bg-[#2b0030] rounded-2xl p-6 space-y-6">
        <div>
            <h1 class="text-white text-2xl lg:text-3xl font-semibold">
                Premier League Companion,
                <span class="text-gray-300 font-normal">
                    your personalised AI assistant.
                </span>
            </h1>

            <div class="flex items-center gap-2 mt-2">
                <img :src="copilot" alt="Copilot" class="w-5 h-5" />
                <span class="text-gray-300 text-sm">Powered by Copilot</span>
            </div>
        </div>

        <div class="flex flex-wrap gap-3">
            <button @click="handleSend('What have I missed?')" :disabled="AIAgentStore.isAiAgentProcessing"
                class="px-4 py-2 rounded-full border border-white/20 text-white hover:text-black hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-sm">
                What have I missed?
            </button>

            <button @click="handleSend(`Preview Manchester United's next match`)"
                :disabled="AIAgentStore.isAiAgentProcessing"
                class="px-4 py-2 rounded-full border border-white/20 text-white hover:text-black hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-sm">
                Preview Manchester United's next match
            </button>

            <button @click="handleSend('Surprise me!')" :disabled="AIAgentStore.isAiAgentProcessing"
                class="px-4 py-2 rounded-full border border-white/20 text-white hover:text-black hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-sm">
                Surprise me!
            </button>

            <button @click="handleSend('How can I follow the Premier League?')"
                :disabled="AIAgentStore.isAiAgentProcessing"
                class="px-4 py-2 rounded-full border border-white/20 text-white hover:text-black hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-sm">
                How can I follow the Premier League?
            </button>

            <button :disabled="AIAgentStore.isAiAgentProcessing"
                class="px-4 py-2 bg-[#37003c] rounded-full border border-white/20 text-white flex items-center gap-2 hover:bg-[#410544] transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer text-sm">
                <el-icon>
                    <Refresh class="text-white" />
                </el-icon>
                Refresh
            </button>
        </div>

        <div class="relative max-w-md">
            <input v-model="localInputPrompt" @keyup.enter="handleSend(localInputPrompt)"
                :disabled="AIAgentStore.isAiAgentProcessing" type="text" placeholder="Type your question here..."
                class="w-full text-white bg-[#1a001e]/40 border border-white/20 placeholder-gray-400 rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm" />
            <img :src="copilot" class="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 object-contain" />
        </div>
    </div>
</template>