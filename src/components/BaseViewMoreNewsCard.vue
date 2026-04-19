<script setup>
import { defineProps, defineEmits } from 'vue';

const emits = defineEmits(['viewMore']);
const props = defineProps({
    title: { type: String, required: false, default: '' },
    news: {
        type: Array,
        required: true,
        default: () => []
    },
    viewMore: { type: Function, required: false, default: () => { } },
    viewMoreButtonTitle: { type: String, required: false, default: 'View more' },
    classModify: {
        type: String,
        default: 'gap-5 p-4 my-4'
    },
    cardGrids: {
        type: String,
        default: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5'
    }
});

const formatSlug = (title) =>
{
    return title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'news';
};
</script>

<template>
    <div class="flex flex-col !bg-[#28002b] rounded-2xl w-full" :class="classModify">
        <span class="text-white text-2xl font-bold">{{ props.title }}</span>

        <div class="grid gap-4" :class="cardGrids">
            <div v-for="(newsItem, index) in props.news" :key="index" class="flex flex-col gap-2 rounded-2xl h-full">

                <div class="relative bg-[#4b1254] rounded-2xl h-[205px] overflow-hidden">

                    <img v-if="newsItem.thumbnail" :src="newsItem.thumbnail"
                        class="absolute inset-0 w-full h-full object-cover" />

                    <router-link
                        :to="{ name: 'news-viewer', params: { newsId: newsItem.newsId, newsTitle: formatSlug(newsItem.title) } }"
                        class="absolute inset-0 z-10 transition-colors flex justify-center items-center">

                        <div v-if="newsItem.isVideo" class="bg-black/50 p-3 rounded-full border border-white/20">
                            <i class="fas fa-play text-white text-xs"></i>
                        </div>
                    </router-link>
                </div>

                <span class="text-md text-white font-bold line-clamp-2 leading-tight">{{ newsItem.title }}</span>
                <span class="text-white text-xs mt-auto">{{ newsItem.tagName }}</span>
            </div>
        </div>

        <div v-if="news.length > 6" class="flex justify-center items-center">
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