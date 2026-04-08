<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import
{
    ArrowRight,
    ArrowLeft,
    CaretRight,
} from '@element-plus/icons-vue';
import BaseVideosCard from '@/components/BaseVideosCard.vue';

const title = ref('Videos');
const isAtStart = ref(true);
const isAtEnd = ref(false);
const videoMenuActive = ref('Latest Video');
const videosMenu = ref([
    { name: 'Latest Video', route: 'video' },
    { name: 'Video Series', route: 'video-series' },
    { name: 'The Archive', route: 'video-the-archive' },
]);
const theArchiveOverviewUrl = ref('video-the-archive-overview');

const latestVideos = ref([
    {
        id: 4455832,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
        category: 'Fixtures',
        thumbnail: '/path/to/thumbnail1.jpg',
    },
    {
        id: 4455833,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
        thumbnail: '/path/to/thumbnail2.jpg'
    },
    {
        id: 4455834,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
        thumbnail: '/path/to/thumbnail3.jpg'
    }, 
    {
        id: 4455835,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
        thumbnail: '/path/to/thumbnail4.jpg'
    }, 
    {
        id: 4455836,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
        thumbnail: '/path/to/thumbnail5.jpg'
    }, 
    {
        id: 4455837,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
        thumbnail: '/path/to/thumbnail6.jpg'
    },
    {
        id: 4455838,
        title: 'Lorem ipsum dolor sit amet, consectetur adipisicing',
        thumbnail: '/path/to/thumbnail7.jpg'
    },
]);

onMounted(() =>
{
    // auto scroll up
    window.scrollTo({ top: 0, behavior: 'auto' });

    router.push({ name: 'video' });
    videoMenuActive.value = 'Latest Video';
});

const scrollAwards = (direction) =>
{
    const container = awardsContainer.value
    if (!container) return

    const scrollAmount = 335
    const behavior = "smooth"

    if (direction === "left")
    {
        container.scrollBy({ left: -scrollAmount, behavior })
    } else if (direction === "right")
    {
        container.scrollBy({ left: scrollAmount, behavior })
    }

    // recheck after scroll animation
    setTimeout(checkScroll, 200)
}

const checkScroll = () =>
{
    const container = awardsContainer.value
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    isAtStart.value = scrollLeft <= 5
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 5
}

const allVideos = () => router.push({ name: 'all-videos' });

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

        <div class="flex flex-1 flex-col gap-12 mt-13 mx-4">
            <!-- latest videos -->
            <BaseVideosCard :title="'Latest Videos'" :videos="latestVideos" :all-videos="allVideos" :isAllVideosButton="true"
                :allVideosButtonTitle="'All Videos'" :isPreviousAndNextButtons="true" />

            <!-- best moments of 2025/26 -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl p-4 mx-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Best Moments of 2025/26</span>
                </div>
                <div ref="awardsContainer">
                    <div class="flex gap-2 rounded-t-lg overflow-x-scroll scrollbar-none">
                        <div v-for="index in 12" :key="index"
                            class="relative rounded-lg w-[185px] h-[260px] overflow-hidden flex-none">
                            <div class="absolute text-[10px] text-white bg-purple-600 px-2 rounded-lg left-1 top-1">
                                {{ 'New' }}
                            </div>
                            <img src="/src/assets/club_best_news/best_goals.jpg" alt="best news"
                                class="w-full h-full object-cover" />
                            <div
                                class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent">
                                <span class="absolute bottom-2 left-2 text-sm text-white font-bold">Lorem ipsum
                                    dolor sit amet, consectetur</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- interviews -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl p-4 mx-4 mt-6">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Interviews</span>
                </div>
                <div ref="awardsContainer">
                    <div class="flex gap-2 rounded-t-lg overflow-x-scroll scrollbar-none">
                        <div v-for="index in 12" :key="index"
                            class="relative rounded-lg w-[185px] h-[260px] overflow-hidden flex-none">
                            <div class="absolute text-[10px] text-white bg-purple-600 px-2 rounded-lg left-1 top-1">
                                {{ 'New' }}
                            </div>
                            <img src="/src/assets/club_best_news/best_goals.jpg" alt="best news"
                                class="w-full h-full object-cover" />
                            <div
                                class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent">
                                <span class="absolute bottom-2 left-2 text-sm text-white font-bold">Lorem ipsum
                                    dolor sit amet, consectetur</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- trending now -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl p-4 mx-4 mt-6">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Trending Now</span>
                </div>
                <div ref="awardsContainer">
                    <div class="flex gap-2 rounded-t-lg overflow-x-scroll scrollbar-none">
                        <div v-for="index in 12" :key="index"
                            class="relative rounded-lg w-[185px] h-[260px] overflow-hidden flex-none">
                            <div class="absolute text-[10px] text-white bg-purple-600 px-2 rounded-lg left-1 top-1">
                                {{ 'New' }}
                            </div>
                            <img src="/src/assets/club_best_news/best_goals.jpg" alt="best news"
                                class="w-full h-full object-cover" />
                            <div
                                class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent">
                                <span class="absolute bottom-2 left-2 text-sm text-white font-bold">Lorem ipsum
                                    dolor sit amet, consectetur</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- match officials mic'd up -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Match officials mic'd up</span>
                    <div class="flex gap-2">
                        <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                            isAtStart
                                ? 'bg-[#1d001f] opacity-40'
                                : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                        ]" :disabled="isAtStart" @click="scrollAwards('left')">
                            <el-icon>
                                <ArrowLeft class="text-white" />
                            </el-icon>
                        </button>
                        <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                            isAtEnd
                                ? 'bg-[#1d001f] opacity-40'
                                : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                        ]" :disabled="isAtEnd" @click="scrollAwards('right')">
                            <el-icon>
                                <ArrowRight class="text-white" />
                            </el-icon>
                        </button>
                        <button @click="allVideos"
                            class="flex items-center justify-start rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-4 hover:underline cursor-pointer whitespace-nowrap">
                            More videos
                            <el-icon>
                                <ArrowRight class="text-white" />
                            </el-icon>
                        </button>
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex items-start gap-4 w-full rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in 6" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-[160px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur
                                adipisicing
                                elit.
                                Maxime, inventore.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- no room for racism -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">No room for racism</span>
                    <div class="flex gap-2">
                        <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                            isAtStart
                                ? 'bg-[#1d001f] opacity-40'
                                : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                        ]" :disabled="isAtStart" @click="scrollAwards('left')">
                            <el-icon>
                                <ArrowLeft class="text-white" />
                            </el-icon>
                        </button>
                        <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                            isAtEnd
                                ? 'bg-[#1d001f] opacity-40'
                                : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                        ]" :disabled="isAtEnd" @click="scrollAwards('right')">
                            <el-icon>
                                <ArrowRight class="text-white" />
                            </el-icon>
                        </button>
                        <a href="#"
                            class="flex items-center justify-start rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-4 hover:underline cursor-pointer whitespace-nowrap">
                            Hub
                            <el-icon>
                                <ArrowRight class="text-white" />
                            </el-icon>
                        </a>
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex items-start gap-4 w-full rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in 6" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-[160px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur
                                adipisicing
                                elit.
                                Maxime, inventore.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- premier league originals -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full h-fit p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Premier League Originals</span>
                </div>
                <div ref="awardsContainer">
                    <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in 4" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                            <div
                                class="flex bg-[#4b1254] rounded-2xl w-[220px] h-[350px] xl:w-[335px] xl:h-[500px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold text-wrap w-[220px] xl:w-[335px]">Lorem
                                ipsum dolor</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- premier league archive -->
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
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
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
            </div>

            <!-- liverpool - premier league champions 2024/25 -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Liverpool - Premier League Champions 2024/25</span>
                    <div class="flex gap-2">
                        <button @click="allVideos"
                            class="flex items-center justify-center rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-3 hover:underline cursor-pointer whitespace-nowrap">
                            More Videos
                            <el-icon>
                                <ArrowRight class="text-white" />
                            </el-icon>
                        </button>
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in 5" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-[160px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
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
            </div>

            <!-- best of 2024/25 -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Best of 2024/25</span>
                    <div class="flex gap-2">
                        <button @click="allVideos"
                            class="flex items-center justify-center rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-3 hover:underline cursor-pointer whitespace-nowrap">
                            More Videos
                            <el-icon>
                                <ArrowRight class="text-white" />
                            </el-icon>
                        </button>
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in 5" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-[160px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
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
            </div>

        </div>

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
