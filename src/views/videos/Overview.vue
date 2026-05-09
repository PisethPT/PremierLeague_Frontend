<script setup>
import { ref, onMounted } from 'vue';
import { useVideoStore } from '@/stores';
import SponsorBar from '@/components/SponsorBar.vue';
import { useRouter } from 'vue-router';
import
{
    CaretRight,
    ArrowRight,
} from '@element-plus/icons-vue';

import BaseTheArchive from '@/components/BaseTheArchive.vue';
import BaseVideo from '@/components/BaseVideo.vue';
import BaseStoriesCard from '@/components/BaseStoriesCard.vue';
import BaseVideoSeries from '@/components/BaseVideoSeries.vue';
import sponsorImage from '@/assets/sponsors/07710_PremierLeagueDigitalProducts_MYPL_WebPage_1456x180_AWK-V3a.webp';

const router = useRouter();
const eightMinuteReplaysUrl = ref('video-the-archive-8-minute-replays');
const twentyMinuteReplaysUrl = ref('video-the-archive-20-minute-replays');

const videoStore = useVideoStore();
const theArchive = ref([]);


const eightMinuteReplays = ref([
    {
        title: 'Manchester City v West Bromwich Albion | 2016-17 | 8 Minute Highlights',
        cover: '/matches images/8_minute_replays/mci_wba_16_05_17.webp',
        url: '#',
        releaseDate: '28 June',
    },
    {
        title: 'Arsenal v Manchester United | 2016-17 | 8 Minute Highlights',
        cover: '/matches images/8_minute_replays/ars_mun_07_05_17.webp',
        url: '#',
        releaseDate: '28 June',
    },
    {
        title: 'Chelsea v Manchester United | 2017-18 | 8 Minute Highlights',
        cover: '/matches images/8_minute_replays/che_mun_05_11_17.webp',
        url: '',
        releaseDate: '28 June',
    },
    {
        title: 'Crystal Palace v Stoke City | 2017-18 | 8 Minute Highlights',
        cover: '/matches images/8_minute_replays/cry_stk_25_11_17.webp',
        url: '',
        releaseDate: '28 June',
    },
]);

const twentyMinuteReplays = ref([
    {
        title: 'Stoke City v West Ham | 2015-16 | 20 Minute Highlights',
        cover: '/matches images/20_minute_replays/stk_whu_15_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
    {
        title: 'Swansea City v Manchester City | 2015-16 | 20 Minute Highlights',
        cover: '/matches images/20_minute_replays/swa_mci_15_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
    {
        title: 'Manchester United v AFC Bournemouth | 2015-16 | 20 Minute Highlights',
        cover: '/matches images/20_minute_replays/mun_bou_17_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
    {
        title: 'West Bromwich Albion v Liverpool | 2015-16 | 20 Minute Highlights',
        cover: '/matches images/20_minute_replays/wba_lfc_15_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
    {
        title: 'Newcastle v Tottenham Hotspur | 2015-16 | 20 Minute Highlights',
        cover: '/matches images/20_minute_replays/new_tot_15_05_16.webp',
        url: '#',
        releaseDate: '25 June',
    },
]);

onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });

    try
    {
        await videoStore.getTheArchiveVideos();
        theArchive.value = videoStore.theArchive;

        console.log('The Archive videos fetched successfully:', theArchive.value);
    } catch (error)
    {
        console.error('Error fetching The Archive videos:', error);
    }
})

const allVideos = () => router.push({ name: 'all-videos' });

const handleViewAll = () =>
{
    console.log("Navigate to all videos page");
};
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

    <div v-for="data in theArchive" :key="data.videoLabel">
        <BaseTheArchive v-if="data.isTheArchive" :title="data.videoLabel" :videos="data.videos" />

        <BaseVideoSeries v-else-if="data.isVideoSeries" :title="data.videoLabel" :series="data.videos" />

        <BaseVideo v-else-if="!data.isStory" :title="data.videoLabel" :videos="data.videos"
            :isAllButton="data.buttonActionTitle != '' ? true : false"
            :allButtonTitle="data.buttonActionTitle != '' ? data.buttonActionTitle : ''"
            :action="data.action != '' ? data.action : 'all-videos'" @viewAll="handleViewAll" />

        <BaseStoriesCard v-else-if="data.isStory" :videoTag="data.videoLabel" :stories="data.videos" />
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
