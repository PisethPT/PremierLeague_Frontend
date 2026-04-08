<script setup>
import { ref, onMounted } from 'vue';
import SponsorBar from '@/components/SponsorBar.vue';
import { useRouter } from 'vue-router';
import
{
    CaretRight,
    ArrowRight,
} from '@element-plus/icons-vue';

const router = useRouter();
const sponsorImage = ref('/src/assets/sponsors/07710_PremierLeagueDigitalProducts_MYPL_WebPage_1456x180_AWK-V3a.webp');
const eightMinuteReplaysUrl = ref('video-the-archive-8-minute-replays');
const twentyMinuteReplaysUrl = ref('video-the-archive-20-minute-replays');

const eightMinuteReplays = ref([
    {
        title: 'Manchester City v West Bromwich Albion | 2016-17 | 8 Minute Highlights',
        cover: '/src/assets/matches images/8_minute_replays/mci_wba_16_05_17.webp',
        url: '#',
        releaseDate: '28 June',
    },
    {
        title: 'Arsenal v Manchester United | 2016-17 | 8 Minute Highlights',
        cover: '/src/assets/matches images/8_minute_replays/ars_mun_07_05_17.webp',
        url: '#',
        releaseDate: '28 June',
    },
    {
        title: 'Chelsea v Manchester United | 2017-18 | 8 Minute Highlights',
        cover: '/src/assets/matches images/8_minute_replays/che_mun_05_11_17.webp',
        url: '',
        releaseDate: '28 June',
    },
    {
        title: 'Crystal Palace v Stoke City | 2017-18 | 8 Minute Highlights',
        cover: '/src/assets/matches images/8_minute_replays/cry_stk_25_11_17.webp',
        url: '',
        releaseDate: '28 June',
    },
]);

const twentyMinuteReplays = ref([
    {
        title: 'Stoke City v West Ham | 2015-16 | 20 Minute Highlights',
        cover: '/src/assets/matches images/20_minute_replays/stk_whu_15_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
    {
        title: 'Swansea City v Manchester City | 2015-16 | 20 Minute Highlights',
        cover: '/src/assets/matches images/20_minute_replays/swa_mci_15_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
    {
        title: 'Manchester United v AFC Bournemouth | 2015-16 | 20 Minute Highlights',
        cover: '/src/assets/matches images/20_minute_replays/mun_bou_17_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
    {
        title: 'West Bromwich Albion v Liverpool | 2015-16 | 20 Minute Highlights',
        cover: '/src/assets/matches images/20_minute_replays/wba_lfc_15_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
    {
        title: 'Newcastle v Tottenham Hotspur | 2015-16 | 20 Minute Highlights',
        cover: '/src/assets/matches images/20_minute_replays/new_tot_15_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
]);

onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });
})

const allVideos = () => router.push({ name: 'all-videos' });

</script>

<template>
    <section class="flex flex-col gap-5">
        <span class="text-white text-md">
            The Premier League Archive is the home for the most iconic and unforgettable moments in the
            competition' history.
        </span>

        <span class="text-white text-md">Want to watch back your favourite ever Premier League match ? Want to
            relive <i>that</i>incredible individual performance by your favourite player ?
        </span>

        <span class="text-white text-md">Premier League fans now have access to eight and 20-minutes highlights
            of historic matches-with full-match replays to follow soon.
        </span>

        <span class="text-white text-md">To gain access to the Archive, join <a href="#"
                class="text-pink-500 text-md font-bold hover:underline">myPremierLeague</a>.
        </span>
    </section>

    <SponsorBar :sponsorImage="sponsorImage" :rounded="true" :sponsorWidth="'60rem'" />

    <section class="flex flex-col gap-4">
        <h1 class="text-white text-2xl font-bold">Featured Games</h1>
        <div class="!bg-[#3e003f] flex xl:flex-row flex-col rounded-2xl h-auto gap-4 p-4">

            <div class="bg-[#28002b] flex flex-col rounded-2xl xl:w-1/2 overflow-hidden">
                <div class="bg-[#edaef777] w-full h-[500px] rounded-2xl">

                </div>
                <div class="flex flex-col gap-4 mx-6 my-6">
                    <h1 class="text-white text-2xl font-bold">Match: Man City win title with incredible comeback
                        v Aston Villa</h1>
                    <span class="text-white text-xs">Classic matches</span>
                </div>
            </div>

            <div class="grid grid-cols-2 gap-4 xl:w-1/2">
                <div v-for="(value, index) in 4" :key="index"
                    class="bg-[#28002b] flex flex-col gap-2 rounded-2xl h-full">
                    <div class="flex bg-[#4b1254] rounded-2xl w-full h-[250px] relative overflow-hidden">
                        <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                        <div
                            class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>
                    <span class="text-white text-md font-bold mx-4 mb-4">Lorem ipsum dolor sit amet, consectetur
                        adipisicing
                        elit.
                        Maxime, inventore.</span>
                </div>
            </div>
        </div>
    </section>

    <!-- best of 2024/25 -->
    <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">Best of 2024/25</span>
            <div class="flex gap-2">
                <button @click="allVideos"
                    class="flex items-center justify-center rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-3 hover:underline whitespace-nowrap">
                    More Videos
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
            </div>
        </div>
        <div ref="awardsContainer">
            <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                <div v-for="(value, index) in 3" :key="index" class="flex flex-col gap-2 rounded-2xl w-[300px] h-fit">
                    <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-[160px] relative overflow-hidden">
                        <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                        <div
                            class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>
                    <span class="text-white text-md font-bold text-wrap ">Lorem ipsum dolor sit amet,
                        consectetur
                        adipisicing
                        elit.
                        Maxime, inventore.</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 8 minute replays -->
    <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">8 Minute Replays</span>
            <div class="flex gap-2">
                <router-link :to="{ name: eightMinuteReplaysUrl }"
                    class="flex items-center justify-center rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-3 hover:underline whitespace-nowrap">
                    See All
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </router-link>
            </div>
        </div>
        <div ref="awardsContainer">
            <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                <a :href="value.url" v-for="(value, index) in eightMinuteReplays" :key="index"
                    class="flex flex-col gap-2 rounded-2xl w-[300px] h-fit">
                    <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-fit relative overflow-hidden">
                        <img :src="value.cover" alt="" class="w-auto h-full object-contain">
                        <div
                            class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>
                    <span class="text-white text-md font-bold text-wrap w-fit">{{ value.title }}</span>
                </a>
            </div>
        </div>
    </div>

    <!-- 20 minute replays -->
    <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">20 Minute Replays</span>
            <div class="flex gap-2">
                <router-link :to="{ name: twentyMinuteReplaysUrl }"
                    class="flex items-center justify-center rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-3 hover:underline whitespace-nowrap">
                    See All
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </router-link>
            </div>
        </div>
        <div ref="awardsContainer">
            <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                <a :href="value.url" v-for="(value, index) in twentyMinuteReplays" :key="index"
                    class="flex flex-col gap-2 rounded-2xl w-[300px] h-fit">
                    <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-fit relative overflow-hidden">
                        <img :src="value.cover" alt="" class="w-auto h-full object-contain">
                        <div
                            class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>
                    <span class="text-white text-md font-bold text-wrap w-fit">{{ value.title }}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}
</style>
