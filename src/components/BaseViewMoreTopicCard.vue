<script setup>
import { defineProps } from 'vue';
import { CaretRight, Plus } from '@element-plus/icons-vue';

const props = defineProps({
    title: { type: String, default: '' },
    topics: { type: Array, required: true, default: () => [] },
    viewMore: { type: Function, default: () => { } },
    viewMoreButtonTitle: { type: String, default: 'View more' },
    classModify: { type: String, default: 'gap-5 p-4 my-4' },
    cardGrids: { type: String, default: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5' },
    isLoading: { type: Boolean, default: false },
    showViewMore: { type: Boolean, default: false },
    skeletons: { type: Number, default: 5 }
});

const formatSlug = (text) => text?.toString().toLowerCase().replace(/\s+/g, '-');

const handleImageError = (event) =>
{
    event.target.style.display = 'none';
};
</script>

<template>
    <div v-if="props.topics?.length > 0 || props.isLoading" class="flex flex-col !bg-[#28002b] rounded-2xl w-full"
        :class="classModify">

        <span v-if="props.title" class="text-white text-2xl font-bold">{{ props.title }}</span>

        <div class="grid gap-4" :class="cardGrids">

            <div v-for="(topic, index) in props.topics" :key="'topic-' + index" class="flex flex-col gap-2">

                <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden group shimmer-bg">

                    <img v-if="topic.thumbnail" :src="topic.thumbnail" @error="handleImageError"
                        class="absolute inset-0 w-full h-full object-cover z-10" />

                    <template v-if="topic.isVideo">
                        <router-link
                            :to="{ name: 'news-viewer', params: { newsId: topic.topicId, newsTitle: formatSlug(topic.title) } }"
                            class="absolute inset-0 z-20"></router-link>
                        <div
                            class="absolute bg-[#28002b] w-7 h-7 rounded-full bottom-2 right-2 flex justify-center items-center z-30 pointer-events-none">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </template>

                    <template v-else>
                        <router-link
                            :to="{ name: 'news-viewer', params: { newsId: topic.topicId, newsTitle: formatSlug(topic.title) } }"
                            class="absolute inset-0 z-20"></router-link>
                    </template>
                </div>

                <span class="text-white text-md font-bold line-clamp-2">
                    {{ topic.title }}
                </span>
                <span class="text-white text-xs mt-auto opacity-60 tracking-wide">
                    {{ topic.topicTag }}
                </span>
            </div>

            <template v-if="props.isLoading">
                <div v-for="i in props.skeletons" :key="'skel-' + i" class="flex flex-col gap-2">
                    <div class="skeleton-rect shimmer-bg"></div>
                    <!-- <div class="h-4 w-full bg-[#4b1254] rounded shimmer-bg mt-2"></div>
                    <div class="h-3 w-2/3 bg-[#4b1254] rounded shimmer-bg"></div> -->
                </div>
            </template>
        </div>

        <div v-if="props.showViewMore" class="flex justify-center items-center mt-8">

            <button v-if="!props.isLoading"
                class="group flex items-center bg-white text-[#37003c] px-6 py-3 rounded-full text-sm transition-all hover:scale-105 hover:bg-gray-100 active:scale-95 cursor-pointer shadow-xl"
                @click="props.viewMore">
                <span class="mr-2">{{ props.viewMoreButtonTitle }}</span>
            </button>

            <!-- <div v-else class="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest animate-pulse">
                <span>Updating {{ props.title }}...</span>
            </div> -->
        </div>
    </div>

    <div v-else class="flex flex-col !bg-[#28002b] rounded-2xl w-full p-12 border border-white/5" :class="classModify">
        <span class="text-white opacity-20 text-center font-light italic">No stories found for this category</span>
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

.skeleton-rect {
    height: 205px;
    border-radius: 1rem;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

div {
    transition: all 0.3s ease-in-out;
}
</style>