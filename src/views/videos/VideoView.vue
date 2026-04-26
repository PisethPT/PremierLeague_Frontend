<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useVideoStore } from '@/stores';
import BaseVideo from '@/components/BaseVideo.vue';
import BaseStoriesCard from '@/components/BaseStoriesCard.vue';
import BaseVideoSeries from '@/components/BaseVideoSeries.vue';

const videoStore = useVideoStore();
const title = ref('Videos');

const videoMenuActive = ref('Latest Video');
const videosMenu = ref([
    { name: 'Latest Video', route: 'video' },
    { name: 'Video Series', route: 'video-series' },
    { name: 'The Archive', route: 'video-the-archive' },
]);
const theArchiveOverviewUrl = ref('video-the-archive-overview');

const latestVideos = ref([]);

onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });

    router.push({ name: 'video' });
    videoMenuActive.value = 'Latest Video';

    try
    {
        await videoStore.getLatestVideos();
        latestVideos.value = videoStore.latestVideos;
    } catch (error)
    {
        console.error('Error fetching latest videos:', error);
    }
});


const allVideos = () => router.push({ name: 'all-videos' });

const handleViewAll = () =>
{
    console.log("Navigate to all videos page");
};

</script>
<template>
    <div class="content-center">
        <div class="mt-4 mx-4 rounded-tl-2xl rounded-tr-2xl !bg-gradient-to-r from-[#28002b] to-[#330d36] py-4 pe-2">
            <h1 class="text-white md:text-5xl text-2xl font-bold  ms-4">
                {{ title }}
            </h1>
        </div>
        <div
            class="mx-4 !bg-gradient-to-r from-[#28002b] to-[#330d36] px-4 pt-2 pe-2 flex gap-4 overflow-x-auto scrollbar-none">
            <div v-for="menu in videosMenu" :key="menu.name"
                class="text-white text-sm pb-1 border-b-4 hover:cursor-pointer whitespace-nowrap"
                :style="videoMenuActive == menu.name ? { borderBottom: '4px solid white', fontWeight: 'bold' } : { borderBottom: '4px solid transparent', fontWeight: 'normal' }">
                <router-link :to="{ name: menu.route }" @click="videoMenuActive = menu.name">{{ menu.name
                    }}</router-link>
            </div>
        </div>

        <div v-for="data in latestVideos" :key="data.videoLabel" class="flex flex-1 flex-col gap-12 mt-13 mx-4">
            <BaseVideoSeries v-if="data.isVideoSeries" :title="data.videoLabel" :series="data.videos" />

            <BaseVideo v-else-if="!data.isStory" :title="data.videoLabel" :videos="data.videos"
                :isAllButton="data.buttonActionTitle != '' ? true : false"
                :allButtonTitle="data.buttonActionTitle != '' ? data.buttonActionTitle : ''"
                :action="data.action != '' ? data.action : 'all-videos'" @viewAll="handleViewAll" />

            <BaseStoriesCard v-else-if="data.isStory" :videoTag="data.videoLabel" :stories="data.videos" />
        </div>

        <!-- premier league archive
        <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
            <div class="flex justify-between items-center">
                <span class="text-white text-2xl font-bold">Premier League Archive</span>
                <div class="flex gap-2">
                    <router-link :to="{ name: theArchiveOverviewUrl }"
                        class="flex items-center justify-center rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-3 hover:underline cursor-pointer whitespace-nowrap">
                        Premier League Archive
                        <el-icon>
                            <ArrowRight class="text-white" />
                        </el-icon>
                    </router-link>
                </div>
            </div>
            <div ref="awardsContainer">
                <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                    <div v-for="(value, index) in 5" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                        <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-[160px] relative overflow-hidden">
                            <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                            <div
                                class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                <el-icon>
                                    <CaretRight class="text-white" />
                                </el-icon>
                            </div>
                        </div>
                        <span class="text-white text-md font-bold text-wrap w-[300px]">Lorem ipsum dolor sit amet,
                            consectetur
                            adipisicing
                            elit.
                            Maxime, inventore.</span>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>
