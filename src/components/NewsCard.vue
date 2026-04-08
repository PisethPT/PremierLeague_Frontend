<script setup>
import { defineProps, isShallow } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';

const apiConfig = useApiConfig();

const props = defineProps({
    news: {
        type: Object,
        required: false,
        default: () => ({
            id: 0,
            title: '',
            subTitle: '',
            body: '',
            publishedDate: '',
            image: '',
            videoLink: '',
        }),
    },
    isBodyShow: false,
});

const formatDate = (dateString) =>
{
    const date = new Date(dateString)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`
}
</script>

<template>
    <div class="bg-[#28002b] w-fit h-auto shadow-sm rounded-xl">
        <div class="text-white text-xs px-2 py-1 bg-[#37003c75] rounded-br-2xl w-fit absolute">{{ formatDate(news.publishedDate) }}</div>
        <img :src="news.image ? apiConfig.NEWS_IMAGE_DIR + news.image : ''" :alt="news.title"
            class="w-full h-auto rounded-xl">
        <div class="px-4 py-4">
            <h1 class="font-bold mt-2 text-[1.2rem] text-white mb-4">{{ news.title }}</h1>
            <span class="font-medium text-gray-300 text-sm text-wrap">{{ news.subTitle }}</span>
            <p v-if="isBodyShow" class="font-mono text-gray-500 text-sm text-wrap mt-3">{{ news.body }}</p>
        </div>
    </div>
</template>
