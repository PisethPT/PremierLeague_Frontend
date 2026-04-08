<script setup>
import { defineProps, defineEmits } from 'vue';
import
{
    ArrowRight,
    ArrowLeft,
    CaretRight
} from '@element-plus/icons-vue';

const emits = defineEmits(['allVideos', 'scrollAwards']);

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    videos: {
        type: Array,
        required: true,
        default: () => [
            {
                videoId: 0,
                title: '',
                videoTag: '',
                thumbnail: '',
                videoUrl: '',
            },
        ]
    },
    allVideosButtonTitle: {
        type: String,
        required: false,
        default: 'All Videos',
    },
    isAllVideosButton: {
        type: Boolean,
        required: true,
        default: false
    },
    isPreviousAndNextButtons: {
        type: Boolean,
        required: false,
        default: false
    },
    isAtStart: {
        type: Boolean,
        required: false,
        default: false
    },
    isAtEnd: {
        type: Boolean,
        required: false,
        default: false
    }
});
</script>

<template>
    <div class="flex flex-col gap-5 bg-[#28002b] rounded-2xl w-full p-4">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">{{ props.title }}</span>
            <div class="flex gap-2">
                <div v-if="props.isPreviousAndNextButtons" class="flex gap-2">
                    <button class="flex items-center justify-center rounded-full w-8 h-8 transition"
                        :class="[props.isAtStart ? 'bg-[#1d001f] opacity-40' : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer']"
                        :disabled="props.isAtStart" @click="emits('scrollAwards', 'left')">
                        <el-icon>
                            <ArrowLeft class="text-white" />
                        </el-icon>
                    </button>
                    <button class="flex items-center justify-center rounded-full w-8 h-8 transition"
                        :class="[props.isAtEnd ? 'bg-[#1d001f] opacity-40' : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer']"
                        :disabled="props.isAtEnd" @click="emits('scrollAwards', 'right')">
                        <el-icon>
                            <ArrowRight class="text-white" />
                        </el-icon>
                    </button>
                </div>

                <button v-if="props.isAllVideosButton && props.videos.length > 0" @click="emits('allVideos')"
                    class="flex items-center justify-start rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-4 hover:underline cursor-pointer whitespace-nowrap">
                    {{ props.allVideosButtonTitle }}
                    <el-icon class="ml-1">
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
            </div>
        </div>

        <div class="w-full">
            <div class="flex items-start gap-4 w-full overflow-x-auto scrollbar-none pb-2">
                <div v-for="video in props.videos" :key="video.videoId"
                    class="flex flex-col gap-2 rounded-2xl h-fit flex-shrink-0">

                    <div class="relative w-[300px] h-[160px] bg-[#4b1254] rounded-2xl overflow-hidden group">
                        <img v-if="video.thumbnail" :src="video.thumbnail || '/images/placeholder.jpg'"
                            class="absolute inset-0 w-full h-full object-cover" />

                        <router-link v-if="video.videoId" :to="{
                            name: 'video-viewer',
                            params: {
                                videoId: video.videoId,
                                videoTitle: (video.title || '').toString().toLowerCase().replace(/\s+/g, '-')
                            }
                        }"
                            class="absolute inset-0 transition-colors flex justify-center items-center">
                        </router-link>

                        <div
                            class="absolute bottom-2 right-2 bg-[#28002b] w-7 h-7 rounded-full flex justify-center items-center pointer-events-none">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>

                    <span class="text-white text-md font-bold text-wrap w-[300px] line-clamp-2">
                        {{ video.title }}
                    </span>
                    <span class="text-white text-xs mt-auto">
                        {{ video.videoTag }}
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>