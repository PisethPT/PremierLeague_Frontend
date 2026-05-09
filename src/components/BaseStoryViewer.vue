<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
    stories: { type: Array, required: true },
    activeStory: { type: Object, required: true }
});

const emit = defineEmits(['close']);

const isMuted = ref(true);
const isPausedMap = ref({});
const likedMap = ref({});
const storyRefs = ref([]);
const progressMap = ref({});
let observer = null;
let progressInterval = null;

const getYouTubeId = (url) =>
{
    if (!url) return null;
    try
    {
        const u = new URL(url);
        if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
        if (u.searchParams.get("v")) return u.searchParams.get("v");
        if (u.pathname.includes("/shorts/")) return u.pathname.split("/shorts/")[1].split("?")[0];
        if (u.pathname.includes("/embed/")) return u.pathname.split("/embed/")[1];
    } catch { }
    return null;
};

const getEmbedUrl = (url) =>
{
    const id = getYouTubeId(url);
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&enablejsapi=1&origin=${window.location.origin}`;
};


const toggleLike = (id) =>
{
    likedMap.value[id] = !likedMap.value[id];
};

const sendCommand = (iframe, func, args = []) =>
{
    if (!iframe || !iframe.contentWindow) return;
    try
    {
        iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func, args }), "*");
    } catch (e) { }
};

const togglePlay = (storyId) =>
{
    const container = storyRefs.value.find(el => el?.dataset.id === storyId);
    const iframe = container?.querySelector("iframe");
    const currentlyPaused = isPausedMap.value[storyId] || false;

    if (currentlyPaused)
    {
        sendCommand(iframe, "playVideo");
        isPausedMap.value[storyId] = false;
    } else
    {
        sendCommand(iframe, "pauseVideo");
        isPausedMap.value[storyId] = true;
    }
};

const toggleMute = () =>
{
    isMuted.value = !isMuted.value;
    document.querySelectorAll("iframe").forEach(frame =>
    {
        sendCommand(frame, isMuted.value ? "mute" : "unMute");
    });
};

const startProgressTracking = () =>
{
    progressInterval = setInterval(() =>
    {
        document.querySelectorAll("iframe").forEach(iframe =>
        {
            iframe.contentWindow.postMessage(JSON.stringify({ event: "listening" }), "*");
            iframe.contentWindow.postMessage(JSON.stringify({ event: "command", func: "getVideoLoadedFraction" }), "*");
        });
    }, 500);
};

const handleYoutubeMessages = (event) =>
{
    try
    {
        const data = JSON.parse(event.data);
        const iframes = document.querySelectorAll("iframe");

        const targetIframe = Array.from(iframes).find(f => f.contentWindow === event.source);
        if (!targetIframe) return;

        const storyId = targetIframe.closest('[data-id]').dataset.id;

        if (data.event === 'infoDelivery' && data.info)
        {
            if (data.info.currentTime !== undefined && data.info.duration !== undefined)
            {
                const percent = (data.info.currentTime / data.info.duration) * 100;
                progressMap.value[storyId] = percent;
            }
            if (data.info.playerState === 2) isPausedMap.value[storyId] = true;
            if (data.info.playerState === 1) isPausedMap.value[storyId] = false;
        }
    } catch (e) { }
};

const enableSound = () =>
{
    isMuted.value = false;
    document.querySelectorAll("iframe").forEach(frame => sendCommand(frame, "unMute"));
    window.removeEventListener("click", enableSound);
};

onMounted(async () =>
{
    window.addEventListener("click", enableSound);
    window.addEventListener("message", handleYoutubeMessages);
    startProgressTracking();

    await nextTick();
    const activeId = getYouTubeId(props.activeStory.videoUrl);
    const activeEl = storyRefs.value.find(el => el?.dataset.id == activeId);
    if (activeEl) activeEl.scrollIntoView({ behavior: 'auto' });

    observer = new IntersectionObserver((entries) =>
    {
        entries.forEach(entry =>
        {
            const iframe = entry.target.querySelector("iframe");
            const storyId = entry.target.dataset.id;
            if (entry.isIntersecting)
            {
                setTimeout(() => sendCommand(iframe, "playVideo"), 500);
                isPausedMap.value[storyId] = false;
            } else
            {
                sendCommand(iframe, "pauseVideo");
            }
        });
    }, { threshold: 0.7 });

    storyRefs.value.forEach(el => el && observer.observe(el));
});

onUnmounted(() =>
{
    observer?.disconnect();
    window.removeEventListener("message", handleYoutubeMessages);
    clearInterval(progressInterval);
});
</script>

<template>
    <div class="fixed inset-0 z-[1000] bg-black flex justify-center items-center overflow-hidden">
        <button @click="emit('close')"
            class="fixed top-6 right-6 w-[50px] text-white z-[1100] p-3 bg-white/10 rounded-full hover:bg-white/20 backdrop-blur-md transition cursor-pointer">✕</button>

        <div
            class="h-full w-full overflow-y-scroll snap-y snap-mandatory flex flex-col items-center gap-6 scrollbar-none">
            <div v-for="story in stories" :key="getYouTubeId(story.videoUrl)" :data-id="getYouTubeId(story.videoUrl)"
                ref="storyRefs" class="w-full h-[100dvh] snap-center flex justify-center items-center">

                <div
                    class="relative w-[460px] max-w-[95vw] h-[90vh] bg-black rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col">

                    <div class="absolute top-4 left-0 w-full flex gap-1 px-4 z-20">
                        <div class="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <div class="h-full bg-white transition-all duration-500 ease-linear"
                                :style="{ width: (progressMap[getYouTubeId(story.videoUrl)] || 0) + '%' }">
                            </div>
                        </div>
                    </div>

                    <div class="flex-1 relative" @click="togglePlay(getYouTubeId(story.videoUrl))">
                        <iframe class="absolute inset-0 w-full h-full scale-110 pointer-events-none"
                            :src="getEmbedUrl(story.videoUrl)" frameborder="0"
                            allow="autoplay; encrypted-media"></iframe>

                        <div v-if="isPausedMap[getYouTubeId(story.videoUrl)]"
                            class="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                            <i class="fas fa-play text-white text-5xl opacity-50"></i>
                        </div>
                    </div>

                    <div
                        class="absolute inset-0 flex flex-col justify-between p-5 bg-gradient-to-b from-black/40 via-transparent to-black/80 pointer-events-none">
                        <div class="flex justify-end pointer-events-auto">
                            <button @click.stop="toggleMute"
                                class="text-white bg-black/40 w-[45px] h-[45px] rounded-full flex items-center justify-center backdrop-blur-md border border-white/10 hover:scale-105 transition cursor-pointer">
                                <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
                            </button>
                        </div>

                        <div class="flex justify-between items-end pointer-events-auto">
                            <div class="flex-1 pr-3">
                                <h2 class="text-white text-sm font-bold leading-tight">{{ story.title }}</h2>
                                <div class="flex items-center gap-2 mt-2">
                                    <div
                                        class="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center text-[10px] text-white font-bold">
                                        PL</div>
                                    <span class="text-gray-200 text-xs">Premier League</span>
                                </div>
                            </div>
                            <button @click="toggleLike(getYouTubeId(story.videoUrl))"
                                class="bg-black/40 rounded-full px-3 py-2 hover:scale-110 transition cursor-pointer">
                                <i
                                    :class="likedMap[getYouTubeId(story.videoUrl)] ? 'fas fa-heart text-red-500' : 'fas fa-heart text-white'"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none;
}

.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>