<script setup>
import { defineProps, defineEmits } from 'vue';
import
{
    CaretRight
} from '@element-plus/icons-vue';

const emits = defineEmits(['viewMore']);
const props = defineProps({
    title: {
        type: String,
        required: false
    },
    videos: {
        type: Array,
        required: true,
    },
    viewMore: {
        type: Function,
        required: false,
        default: () => { }
    },
    viewMoreButtonTitle: {
        type: String,
        required: false,
        default: 'View more',
    },
    classModify: {
        type: String,
        default: 'gap-5 p-4 my-4'
    },
    cardGrids: {
        type: String,
        default: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'
    }
});

const formatSlug = (text) => text.toString().toLowerCase().replace(/\s+/g, '-');
</script>

<template>
    <div class="flex flex-col !bg-[#28002b] rounded-2xl w-full" :class="classModify">
        <span v-if="props.title" class="text-white text-2xl font-bold">{{ props.title }}</span>
        <div class="grid gap-4" :class="cardGrids">
            <div v-for="(video, index) in props.videos" :key="index" class="flex flex-col gap-2 rounded-2xl h-full">
                <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                    <img v-if="video.thumbnail" :src="video.thumbnail"
                        class="absolute inset-0 w-full h-full object-cover" />
                    <router-link
                        :to="{ name: 'video-viewer', params: { videoId: video.videoId, videoTitle: formatSlug(video.title) } }"
                        class="absolute inset-0 transition-colors flex justify-center items-center z-10"></router-link>
                    <div
                        class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                        <el-icon>
                            <CaretRight class="text-white" />
                        </el-icon>
                    </div>
                </div>
                <span class="text-white text-md font-bold line-clamp-2">{{ video.title }}</span>
                <span class="text-white text-xs mt-auto">{{ video.videoTag }}</span>
            </div>
        </div>
        <div v-if="videos.length > 6" class="flex justify-center items-center">
            <button class="text-sm bg-white text-[#37003c] px-4 py-2.5 rounded-3xl cursor-pointer w-fit"
                @click="props.viewMore">{{ props.viewMoreButtonTitle }}</button>
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