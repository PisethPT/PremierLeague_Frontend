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
        required: true
    },
    videos: {
        type: Array,
        required: true,
        default: () => [
            {
                id: 1,
                title: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime, inventore.',
                category: 'Fixtures',
                thumbnail: '/path/to/thumbnail1.jpg',
            },
        ]
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
    }
});
</script>

<template>
    <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4 my-4">
        <span class="text-white text-2xl font-bold">{{ props.title }}</span>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            <div v-for="(video, index) in props.videos" :key="index" class="flex flex-col gap-2 rounded-2xl h-full">
                <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                    <router-link
                        :to="{ name: 'video-viewer', params: { videoId: video.id, videoTitle: video.title.toString().toLowerCase().replace(/ /g, '-') } }"
                        class="flex justify-center items-center w-full h-full"></router-link>
                    <div
                        class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                        <el-icon>
                            <CaretRight class="text-white" />
                        </el-icon>
                    </div>
                </div>
                <span class="text-white text-md font-bold">{{ video.title }}</span>
                <span class="text-white text-xs mt-auto">{{ video.category }}</span>
            </div>
        </div>
        <div class="flex justify-center items-center">
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