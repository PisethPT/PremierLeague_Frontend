<script setup>
import { defineProps } from 'vue';
import
{
    ArrowRightBold,
} from "@element-plus/icons-vue";

import { useApi } from '@/stores/api';

const apiConfig = useApi();
const props = defineProps({
    clubDetails: {
        type: Object,
        default: () => ({
            clubTheme: '#37003c',
            clubCrest: ''
        })
    },
    title: {
        type: String,
        default: 'From the clubs'
    },
    newsItems: {
        type: Array,
        required: true,
        default: () => []
    }
});

defineEmits(['see-all']);
const formatSlug = (title) =>
{
    return title ? title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : 'news';
};
</script>

<template>
    <div class="flex gap-4">
        <div class="flex items-start flex-wrap gap-4 !bg-[#28002b] rounded-2xl h-auto flex-1 p-4 overflow-hidden">
            <div class="flex justify-between items-center w-full h-auto">
                <div class="flex justify-start items-center gap-2">
                    <div class="flex justify-center items-end rounded-xl w-[40px] h-[40px] p-1 overflow-hidden"
                        :style="{ backgroundColor: clubDetails?.clubTheme || '#37003c' }">
                        <img :src="apiConfig.CLUB_DIR + clubDetails?.clubCrest" alt="Club Logo"
                            class="w-full h-full object-contain">
                    </div>
                    <span class="font-bold text-md text-white">{{ title }}</span>
                </div>

                <button @click="$emit('see-all')"
                    class="font-bold text-xs text-white !bg-[#37003c] px-3 py-2 rounded-2xl cursor-pointer hover:brightness-110 transition-all">
                    See all
                    <el-icon class="ml-1">
                        <ArrowRightBold class="text-white text-xs" />
                    </el-icon>
                </button>
            </div>

            <div class="grid grid-cols-3 gap-4">
                <div v-for="(newsItem, index) in newsItems" :key="index" class="flex flex-col gap-2 rounded-2xl h-full">

                    <div class="relative bg-[#4b1254] rounded-2xl h-[205px] overflow-hidden">

                        <img v-if="newsItem.thumbnail" :src="apiConfig.NEWS_DIR + newsItem.thumbnail"
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
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #37003c;
    border-radius: 10px;
}
</style>