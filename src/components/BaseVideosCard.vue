<script setup>
import { defineProps, defineEmits } from 'vue';
import { ArrowRight, ArrowLeft, CaretRight } from '@element-plus/icons-vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();


const emits = defineEmits(['allVideos', 'scrollAwards']);

const props = defineProps({
    title: { type: String, required: true },
    videos: {
        type: Array,
        required: true,
        default: () => []
    },
    isLoading: { type: Boolean, default: false },
    allVideosButtonTitle: { type: String, default: 'All Videos' },
    isAllVideosButton: { type: Boolean, default: false },
    isPreviousAndNextButtons: { type: Boolean, default: false },
    isAtStart: { type: Boolean, default: false },
    isAtEnd: { type: Boolean, default: false },
    skeletons: { type: Number, default: 6 }
});

const formatSlug = (text) => text?.toString().toLowerCase().replace(/\s+/g, '-') || '';

const handleImageError = (event) =>
{
    event.target.style.display = 'none';
};
</script>

<template>
    <div class="flex flex-col gap-5 bg-[#28002b] rounded-2xl w-full p-6 shadow-lg">

        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold tracking-tight">{{ props.title }}</span>

            <div class="flex gap-3">
                <div v-if="props.isPreviousAndNextButtons && props.videos.length > 0" class="flex gap-2">
                    <button
                        class="flex items-center justify-center rounded-full w-8 h-8 transition-all disabled:opacity-30"
                        :class="[props.isAtStart ? 'bg-[#1d001f] cursor-default' : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer shadow-md']"
                        :disabled="props.isAtStart" @click="emits('scrollAwards', 'left')">
                        <el-icon>
                            <ArrowLeft class="text-white" />
                        </el-icon>
                    </button>

                    <button
                        class="flex items-center justify-center rounded-full w-8 h-8 transition-all disabled:opacity-30"
                        :class="[props.isAtEnd ? 'bg-[#1d001f] cursor-default' : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer shadow-md']"
                        :disabled="props.isAtEnd" @click="emits('scrollAwards', 'right')">
                        <el-icon>
                            <ArrowRight class="text-white" />
                        </el-icon>
                    </button>
                </div>

                <button v-if="props.isAllVideosButton && (props.videos.length > 0 || props.isLoading)"
                    @click="emits('allVideos')"
                    class="flex items-center rounded-full bg-[#3e003f] text-[11px] font-bold uppercase tracking-widest text-white h-8 px-4 hover:bg-[#55005a] transition-all cursor-pointer whitespace-nowrap">
                    {{ props.allVideosButtonTitle }}
                    <el-icon class="ml-1.5">
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
            </div>
        </div>

        <div class="w-full">
            <div class="flex items-start gap-4 w-full overflow-x-auto scrollbar-none pb-4">

                <template v-if="props.videos.length > 0">
                    <div v-for="video in props.videos" :key="video.videoId"
                        class="flex flex-col gap-2 rounded-2xl h-fit flex-shrink-0 group cursor-pointer">

                        <div
                            class="relative w-[300px] h-[160px] bg-[#4b1254] rounded-2xl overflow-hidden shimmer-bg shadow-inner">
                            <img v-if="video.thumbnail" :src="video.thumbnail" @error="handleImageError"
                                class="absolute inset-0 w-full h-full object-cover z-10" />

                            <router-link v-if="video.videoId" :to="{
                                name: 'video-viewer',
                                params: {
                                    videoId: video.videoId,
                                    videoTitle: formatSlug(video.title)
                                }
                            }" class="absolute inset-0 z-20"></router-link>

                            <div
                                class="absolute bottom-3 right-3 bg-[#28002b] w-8 h-8 rounded-full flex justify-center items-center z-30 pointer-events-none group-hover:scale-110 transition-transform shadow-lg">
                                <el-icon>
                                    <CaretRight class="text-white" />
                                </el-icon>
                            </div>
                        </div>

                        <div class="flex flex-col gap-1 px-1">
                            <span class="text-white text-[15px] font-bold w-[300px] line-clamp-2 leading-tight">
                                {{ video.title }}
                            </span>
                            <span class="text-white text-xs mt-auto opacity-50 tracking-wider">
                                {{ video.videoTag }}
                            </span>
                        </div>
                    </div>
                </template>

                <template v-if="props.isLoading">
                    <div v-for="i in props.skeletons" :key="'skel-' + i"
                        class="flex flex-col gap-2 flex-shrink-0 w-[300px]">
                        <div class="h-[160px] rounded-2xl shimmer-bg"></div>
                        <div class="h-4 w-full bg-[#4b1254] rounded shimmer-bg mt-1"></div>
                        <div class="h-3 w-1/3 bg-[#4b1254] rounded shimmer-bg"></div>
                    </div>
                </template>
            </div>
        </div>

        <div v-if="props.videos.length === 0 && !props.isLoading" class="w-full flex justify-center items-center py-10">
            <span class="text-white/20 text-xs tracking-[0.2em] uppercase">No videos found</span>
        </div>
    </div>
</template>

<style scoped>
@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

.shimmer-bg {
    background: linear-gradient(90deg,
            #4b1254 25%,
            #5d1a67 50%,
            #4b1254 75%);
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite linear;
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>