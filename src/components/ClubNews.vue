<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { useApi } from '@/stores/api';
import { useHomeStore } from '@/stores';
import { Edit } from '@element-plus/icons-vue';

const apiConfig = useApi();
const homeStore = useHomeStore();
const clubNews = ref([]);
const loading = ref(false);

onMounted(async () =>
{
    try
    {
        loading.value = true;
        clubNews.value = await homeStore.getClubNews();
        loading.value = false;
    } catch (error)
    {   clubNews.value = [];
        console.error(error);
    }
});

</script>

<template>
    <div v-if="clubNews.length > 0"
        class="sticky top-[60px] z-40 w-full bg-[#1e0021] overflow-hidden pt-4 pb-2">
        <div class="marquee-track flex items-center gap-4 cursor-pointer overflow-x-scroll scrollbar-none">
            <a v-for="news in clubNews" :key="'orig-' + news.newsId" :href="news.referenceUrl" target="_blank"
                class="flex items-center gap-2 bg-[#28002b] hover:bg-[#2d0230fa] rounded-md px-2 py-1 shrink-0">
                <img :src="apiConfig.CLUB_DIR + news.clubCrest" alt="" class="w-6 h-6 object-contain" />
                <span class="text-white text-sm whitespace-nowrap flex items-center gap-1">
                    {{ news.title }}
                    <el-icon class="opacity-70">
                        <Edit />
                    </el-icon>
                </span>
            </a>

            <a v-for="news in clubNews" :key="'dup-' + news.newsId" :href="news.referenceUrl" target="_blank"
                class="flex items-center gap-2 bg-[#28002b] hover:bg-[#2d0230fa] rounded-md px-2 py-1 shrink-0">
                <img :src="apiConfig.CLUB_DIR + news.clubCrest" alt="" class="w-6 h-6 object-contain" />
                <span class="text-white text-sm whitespace-nowrap flex items-center gap-1">
                    {{ news.title }}
                    <el-icon class="opacity-70">
                        <Edit />
                    </el-icon>
                </span>
            </a>
        </div>
    </div>
</template>

<style scoped>
.marquee-track {
    width: max-content;
    will-change: transform;
    animation: scroll-left 300s linear infinite;
}

.marquee-track:hover {
    animation-play-state: paused;
}

@keyframes scroll-left {
    0% {
        transform: translateX(0);
    }

    100% {
        transform: translateX(-50%);
    }
}

img {
    flex-shrink: 0;
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>