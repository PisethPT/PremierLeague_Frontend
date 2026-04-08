<script setup>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import SponsorBar from '@/components/SponsorBar.vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useViewerStore } from '@/stores';
import BaseNewsMiniCard from '@/components/BaseNewsMiniCard.vue';

const route = useRoute();
const viewerStore = useViewerStore();

const iframeRef = ref(null);
const isLoading = ref(true);
const isPlaying = ref(false);
const isMuted = ref(true);
const progress = ref(0);

const sponsorImage = ref('/src/assets/sponsors/14952318241031863229.jpg');

const videoItem = ref({
    title: '',
    description: '',
    thumbnail: '',
    videoUrl: '',
    publishedDate: '',
});

const relatedItems = ref([]);

const getYouTubeId = (url) =>
{
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const embedUrl = computed(() =>
{
    const id = getYouTubeId(videoItem.value.videoUrl);
    if (!id) return '';
    return `https://www.youtube.com/embed/${id}?enablejsapi=1&autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&playsinline=1&origin=${window.location.origin}`;
});

const sendCommand = (func, args = []) =>
{
    if (iframeRef.value)
    {
        iframeRef.value.contentWindow.postMessage(
            JSON.stringify({ event: 'command', func, args }),
            '*'
        );
    }
};

const togglePlay = () =>
{
    sendCommand(isPlaying.value ? 'pauseVideo' : 'playVideo');
    isPlaying.value = !isPlaying.value;
};

const toggleMute = () =>
{
    isMuted.value = !isMuted.value;
    sendCommand(isMuted.value ? 'mute' : 'unMute');
};

const handleMessage = (event) =>
{
    try
    {
        const data = JSON.parse(event.data);
        if (data.event === 'infoDelivery' && data.info)
        {
            if (data.info.playerState === 1) isPlaying.value = true;
            if (data.info.playerState === 2) isPlaying.value = false;

            if (data.info.currentTime && data.info.duration)
            {
                progress.value = (data.info.currentTime / data.info.duration) * 100;
                isLoading.value = false;
            }
        }
    } catch (e) { }
};

const shareVideo = () =>
{
    if (navigator.share)
    {
        navigator.share({
            title: videoItem.value.title,
            url: window.location.href
        });
    } else
    {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
    }
};

const loadVideo = async (videoId) =>
{
    isLoading.value = true;

    try
    {
        const { video, relateds } = await viewerStore.getVideoViewerById({
            videoId
        });

        videoItem.value = video;
        relatedItems.value = relateds;

        isMuted.value = false;

        setTimeout(() =>
        {
            isLoading.value = false;
            isPlaying.value = true;
            sendCommand(isMuted.value ? 'mute' : 'unMute');
        }, 2500);

    } catch (e)
    {
        console.error(e);
        isLoading.value = false;
    }
};

onMounted(async () =>
{
    window.scrollTo(0, 0);
    window.addEventListener('message', handleMessage);
    await loadVideo(route.params.videoId);
});

onUnmounted(() =>
{
    window.removeEventListener('message', handleMessage);
});

watch(
    () => route.params.videoId,
    async (newId, oldId) =>
    {
        if (newId && newId !== oldId)
        {
            window.scrollTo(0, 0);
            await loadVideo(newId);
        }
    }
);
</script>

<template>
    <div class="min-h-screen bg-[#1e0021]">
        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />

        <section class="max-w-7xl mx-auto mt-8 px-4 pb-20">
            <div class="grid grid-cols-1 xl:grid-cols-[1fr_450px] gap-8 relative">

                <div class="flex flex-col gap-6 w-full">
                    <div class="relative w-full bg-[#28002b] rounded-3xl overflow-hidden shadow-2xl group">

                        <div class="relative w-full pb-[56.25%] h-0">
                            
                            <div v-if="isLoading" class="absolute inset-0 z-20">
                                <img :src="videoItem.thumbnail" class="w-full h-full object-cover" />
                                <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <div
                                        class="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent">
                                    </div>
                                </div>
                            </div>

                            <iframe v-if="videoItem.videoUrl" ref="iframeRef" :src="embedUrl"
                                class="absolute top-0 left-0 w-full h-full pointer-events-none scale-[1.01] z-0"
                                frameborder="0" allow="autoplay; encrypted-media; allowfullscreen">
                            </iframe>
                            
                            <div
                                class="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end p-6 bg-gradient-to-t from-[#28002b]/95 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">

                                <div class="w-full h-1 bg-white/20 rounded-full mb-6 overflow-hidden">
                                    <div class="h-full bg-purple-500 transition-all duration-300"
                                        :style="{ width: progress + '%' }"></div>
                                </div>

                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-6 text-white">
                                        <button @click="togglePlay"
                                            class="pointer-events-auto hover:text-purple-400 text-2xl transition cursor-pointer">
                                            <i :class="isPlaying ? 'fas fa-pause' : 'fas fa-play'"></i>
                                        </button>

                                        <button @click="toggleMute"
                                            class="pointer-events-auto hover:text-purple-400 text-2xl transition cursor-pointer">
                                            <i :class="isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up'"></i>
                                        </button>
                                    </div>

                                    <div class="flex items-center gap-6 text-white">
                                        <button @click="shareVideo"
                                            class="pointer-events-auto hover:text-purple-400 text-xl transition cursor-pointer">
                                            <i class="fas fa-share-alt"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                    <div class="flex flex-col gap-3 px-2">
                        <span
                            class="flex items-center justify-start rounded-full text-xs text-white w-fit h-8 px-3 border border-white/30 whitespace-nowrap cursor-pointer">
                            {{ videoItem.videoTag }}
                        </span>

                        <h1 class="text-white text-xl md:text-2xl font-bold leading-tight">
                            {{ videoItem.title }}
                        </h1>

                        <p class="text-gray-100 text-sm leading-relaxed whitespace-pre-wrap mt-4 opacity-90">
                            {{ videoItem.description }}
                        </p>

                        <span class="text-gray-300 text-xs font-normal">
                            {{ videoItem.publishedDate }}
                        </span>
                    </div>
                </div>
                
                <div class="bg-[#28002b] flex flex-col gap-4 w-full h-fit rounded-2xl px-4 py-6 relative z-10">
                    <div class="text-white text-sm font-bold pb-1 border-b-4 w-fit whitespace-nowrap">
                        Related
                    </div>

                    <span v-if="relatedItems.length === 0" class="text-white text-md">
                        No Related content available
                    </span>

                    <BaseNewsMiniCard v-else v-for="related in relatedItems" :key="related.relatedId" :related="related"
                        :isVideo="true" />
                </div>

            </div>
        </section>
    </div>
</template>

<style scoped>
input[type=range] {
    accent-color: #a855f7;
}
</style>