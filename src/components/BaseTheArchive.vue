<script setup>
import { computed } from 'vue';
import { CaretRight } from '@element-plus/icons-vue';

const props = defineProps({
    title: { type: String, required: true },
    videos: {
        type: Array,
        required: true,
        default: () => []
    },
    featuredOverlayTitle: { type: String, default: "Best Matches" }
});

const mainVideo = computed(() => props.videos[0] || null);
const childVideos = computed(() => props.videos.slice(1, 5));

const getSlug = (title) =>
    (title || '')
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
</script>

<template>
    <section v-if="props.videos.length > 0" class="flex flex-col gap-4">
        <h1 class="text-white text-2xl font-bold">{{ props.title }}</h1>

        <div class="bg-[#300131] flex xl:flex-row flex-col rounded-2xl h-auto gap-4 p-4">

            <div v-if="mainVideo" class="flex flex-col xl:w-1/2 overflow-hidden group">
                <div class="bg-[#28002b] rounded-2xl flex flex-col h-full">

                    <div
                        class="relative w-full h-[300px] md:h-[500px] bg-[#4b1254] rounded-2xl overflow-hidden shadow-2xl">
                        <img :src="mainVideo.thumbnail || '/images/placeholder.jpg'"
                            class="absolute inset-0 w-full h-full object-cover" />

                        <a v-if="mainVideo.isReference && mainVideo.referenceUrl" :href="mainVideo.referenceUrl"
                            target="_blank"
                            class="absolute inset-0 bg-black/0 hover:bg-black/20 z-10 transition-colors"></a>

                        <router-link v-else
                            :to="{ name: 'video-viewer', params: { videoId: String(mainVideo.videoId), videoTitle: getSlug(mainVideo.title) } }"
                            class="absolute inset-0 bg-black/0 hover:bg-black/20 z-10 transition-colors"></router-link>
                    </div>

                    <div class="flex flex-col gap-1 px-2 pb-2 m-4">
                        <h2 class="text-white text-3xl font-bold leading-snug line-clamp-2">
                            {{ mainVideo.title }}
                        </h2>
                        <span class="text-white text-xs font-normal opacity-70">
                            {{ mainVideo.videoTag ?? '' }}
                        </span>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 xl:w-1/2">
                <div v-for="video in childVideos" :key="video.videoId"
                    class="bg-[#28002b] flex flex-col gap-2 rounded-2xl overflow-hidden group">

                    <div class="relative bg-[#4b1254] w-full h-[200px] xl:h-[230px] rounded-xl overflow-hidden">
                        <img :src="video.thumbnail || '/images/placeholder.jpg'"
                            class="w-full h-full object-cover transition-opacity group-hover:opacity-80" />

                        <a v-if="video.isReference && video.referenceUrl" :href="video.referenceUrl" target="_blank"
                            class="absolute inset-0 z-10"></a>

                        <router-link v-else
                            :to="{ name: 'video-viewer', params: { videoId: String(video.videoId), videoTitle: getSlug(video.title) } }"
                            class="absolute inset-0 z-10"></router-link>

                        <div
                            class="absolute bg-[#28002b] w-8 h-8 rounded-full bottom-3 right-3 flex justify-center items-center z-20">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1 px-1 pb-1 m-4">
                        <span class="text-white text-md font-bold line-clamp-2 leading-snug">
                            {{ video.title }}
                        </span>
                        <span class="text-white text-xs font-normal opacity-70">
                            {{ video.videoTag ?? '' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>