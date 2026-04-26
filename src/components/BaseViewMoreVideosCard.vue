<script setup>
import { defineProps } from 'vue';
import { CaretRight } from '@element-plus/icons-vue';

const props = defineProps({
    title: String,
    videos: { type: Array, required: true },
    viewMore: { type: Function, required: true },
    viewMoreButtonTitle: { type: String, default: 'View more' },
    classModify: { type: String, default: 'gap-5 p-4 my-4' },
    cardGrids: { type: String, default: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5' },
    showViewMore: { type: Boolean, default: false },
    isLoading: { type: Boolean, default: false }
});

const formatSlug = (text) => text?.toString().toLowerCase().replace(/\s+/g, '-');
</script>

<template>
    <div class="flex flex-col !bg-[#28002b] rounded-2xl w-full" :class="classModify">
        <span v-if="props.title" class="text-white text-2xl font-bold mb-4">{{ props.title }}</span>

        <div class="grid gap-4" :class="cardGrids">
            <div v-for="(video, index) in props.videos" :key="index" class="flex flex-col gap-2 rounded-2xl h-full">
                <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                    <img v-if="video.thumbnail" :src="video.thumbnail"
                        class="absolute inset-0 w-full h-full object-cover" />
                    <router-link
                        :to="{ name: 'video-viewer', params: { videoId: video.videoId, videoTitle: formatSlug(video.title) } }"
                        class="absolute inset-0 z-10"></router-link>
                    <div
                        class="absolute bg-[#28002b] w-7 h-7 rounded-full bottom-2 right-2 flex justify-center items-center">
                        <el-icon>
                            <CaretRight class="text-white" />
                        </el-icon>
                    </div>
                </div>
                <span class="text-white text-md font-bold line-clamp-2">{{ video.title }}</span>
                <span class="text-white text-xs mt-auto opacity-70">{{ video.videoTag }}</span>
            </div>

            <template v-if="props.isLoading">
                <div v-for="i in 25" :key="'skel-' + i" class="flex flex-col gap-2">
                    <el-skeleton animated>
                        <template #template>
                            <el-skeleton-item variant="rect" class="skeleton-rect" />
                            <!-- <div class="mt-2">
                                <el-skeleton-item variant="text" class="skeleton-text" />
                                <el-skeleton-item variant="text" class="skeleton-text-short" />
                            </div> -->
                        </template>
                    </el-skeleton>
                </div>
            </template>
        </div>

        <div v-if="props.showViewMore && !props.isLoading" class="flex justify-center items-center mt-8">
            <button class="text-sm bg-white text-[#37003c] px-6 py-2.5 rounded-3xl cursor-pointer hover:bg-gray-200"
                @click="props.viewMore">
                {{ props.viewMoreButtonTitle }}
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Skeleton Styles to match your theme */
.skeleton-rect {
    height: 205px !important;
    border-radius: 1rem !important;
    background-color: #4b1254 !important;
}

.skeleton-text {
    width: 100% !important;
    background-color: #4b1254 !important;
}

.skeleton-text-short {
    width: 40% !important;
    margin-top: 8px;
    background-color: #4b1254 !important;
}

:deep(.el-skeleton.is-animated .el-skeleton__item) {
    background: linear-gradient(90deg, #4b1254 25%, #5d1a67 37%, #4b1254 63%) !important;
    background-size: 400% 100% !important;
}
</style>