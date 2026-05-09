<script setup>
import { defineProps, defineEmits } from 'vue';
import { Plus } from '@element-plus/icons-vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();
const emits = defineEmits(['viewMore']);
const props = defineProps({
    title: { type: String, required: false, default: '' },
    news: {
        type: Array,
        required: true,
        default: () => []
    },
    isLoading: { type: Boolean, default: false },
    showViewMore: { type: Boolean, default: false },
    viewMore: { type: Function, required: false, default: () => { } },
    viewMoreButtonTitle: { type: String, required: false, default: 'View more' },
    classModify: {
        type: String,
        default: 'gap-5 p-4 my-4'
    },
    cardGrids: {
        type: String,
        default: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'
    },
    skeletons: { type: Number, default: 5 }
});

const formatSlug = (title) =>
{
    return title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'news';
};

const handleImageError = (event) =>
{
    event.target.style.display = 'none';
};
</script>

<template>
    <div v-if="props.news?.length > 0 || props.isLoading" class="flex flex-col !bg-[#28002b] rounded-2xl w-full"
        :class="classModify">

        <span v-if="props.title" class="text-white text-2xl font-bold mb-4">{{ props.title }}</span>

        <div class="grid gap-4" :class="cardGrids">
            <div v-for="(newsItem, index) in props.news" :key="'news-' + index"
                class="flex flex-col gap-2 rounded-2xl h-full group">

                <div class="relative bg-[#4b1254] rounded-2xl h-[205px] overflow-hidden shimmer-bg">
                    <img v-if="newsItem.thumbnail" :src="apiConfig.NEWS_DIR + newsItem.thumbnail"
                        @error="handleImageError" class="absolute inset-0 w-full h-full object-cover z-10" />

                    <router-link
                        :to="{ name: 'news-viewer', params: { newsId: newsItem.newsId, newsTitle: formatSlug(newsItem.title) } }"
                        class="absolute inset-0 z-20 transition-colors flex justify-center items-center">

                        <div v-if="newsItem.isVideo"
                            class="bg-black/40 p-3 rounded-full border border-white/20 backdrop-blur-sm group-hover:bg-black/60 transition-all">
                            <svg class="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        </div>
                    </router-link>
                </div>

                <span class="text-white text-md font-bold line-clamp-2">
                    {{ newsItem.title }}
                </span>
                <span class="text-white text-xs mt-auto opacity-60 tracking-wider">
                    {{ newsItem.tagName }}
                </span>
            </div>

            <template v-if="props.isLoading">
                <div v-for="i in props.skeletons" :key="'skel-' + i" class="flex flex-col gap-2">
                    <div class="h-[205px] rounded-2xl shimmer-bg"></div>
                    <!-- <div class="h-4 w-full bg-[#4b1254] rounded shimmer-bg mt-1"></div>
                    <div class="h-3 w-1/2 bg-[#4b1254] rounded shimmer-bg"></div> -->
                </div>
            </template>
        </div>

        <div v-if="props.showViewMore" class="flex justify-center items-center mt-8">
            <button v-if="!props.isLoading"
                class="group flex items-center bg-white text-[#37003c] px-6 py-3 rounded-full text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-xl"
                @click="props.viewMore">
                <span class="mr-2">{{ props.viewMoreButtonTitle }}</span>
            </button>
        </div>
    </div>

    <div v-else class="w-full flex flex-col items-center justify-center p-12 bg-[#28002b] rounded-2xl opacity-30">
        <span class="text-white italic">No articles found</span>
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

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

div {
    transition: background-color 0.3s ease;
}
</style>