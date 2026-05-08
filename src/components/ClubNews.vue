<script setup>
import { ref, onMounted } from 'vue';
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
    } catch (error)
    {
        clubNews.value = [];
        console.error(error);
    } finally
    {
        loading.value = false;
    }
});

const handleCrestError = (event) =>
{
    event.target.style.opacity = '0';
};
</script>

<template>
    <div v-if="loading" class="sticky top-[60px] z-40 w-full bg-[#1e0021] pt-4 pb-2">
        <div class="flex gap-4 px-4 overflow-hidden">
            <div v-for="i in 8" :key="'skel-' + i" class="h-8 w-48 bg-[#37003c] rounded-md shrink-0 shimmer-bg"></div>
        </div>
    </div>

    <div v-else-if="clubNews.length > 0" class="sticky top-[60px] z-40 w-full bg-[#1e0021] overflow-hidden pt-4 pb-2">
        <div class="marquee-track flex items-center gap-4 cursor-pointer overflow-x-scroll scrollbar-none">

            <a v-for="news in clubNews" :key="'orig-' + news.newsId" :href="news.referenceUrl" target="_blank"
                class="flex items-center gap-2 bg-[#28002b] hover:bg-[#2d0230fa] rounded-md px-1 py-1 shrink-0 transition-colors">
                <div
                    class="w-6 h-6 bg-[#37003c] shimmer-bg rounded-md flex items-center justify-center overflow-hidden">
                    <img :src="apiConfig.CLUB_DIR + news.clubCrest" @error="handleCrestError" alt=""
                        class="w-full h-full object-contain" />
                </div>

                <span class="text-white text-sm whitespace-nowrap flex items-center gap-1">
                    {{ news.title }}
                    <el-icon class="opacity-70">
                        <Edit />
                    </el-icon>
                </span>
            </a>

            <a v-for="news in clubNews" :key="'dup-' + news.newsId" :href="news.referenceUrl" target="_blank"
                class="flex items-center gap-2 bg-[#28002b] hover:bg-[#2d0230fa] rounded-md px-1 py-1 shrink-0 transition-colors">
                <div
                    class="w-6 h-6 bg-[#37003c] shimmer-bg rounded-md flex items-center justify-center overflow-hidden">
                    <img :src="apiConfig.CLUB_DIR + news.clubCrest" @error="handleCrestError" alt=""
                        class="w-full h-full object-contain" />
                </div>
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
            #37003c 25%,
            #4b1254 50%,
            #37003c 75%);
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite linear;
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