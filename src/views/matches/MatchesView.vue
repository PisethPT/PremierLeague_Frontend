<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';
import { useMatchStore } from '@/stores/matchStore';
import BaseMatchSection from '@/components/BaseMatchSection.vue';
import
{
    ArrowLeft,
    ArrowRight,
} from '@element-plus/icons-vue';
import SponsorBar from '@/components/SponsorBar.vue';
import BaseFilter from '@/components/BaseFilter.vue';

const matchStore = useMatchStore();
const title = ref('Matches');
const sponsorImage = ref('/src/assets/sponsors/unmissable.webp');
const filters = ref([
    {
        id: 1,
        label: 'Premier League',
        tag: 'leagues',
    },
    {
        id: 2,
        label: '2025/26',
        tag: 'seasons',
    },
    {
        id: 3,
        label: 'MW11',
        tag: 'allMatchweeks',
    },
    {
        id: 4,
        label: 'Home & Alway',
        tag: 'homeAndAlway',
    },
]);

const latestMatchweekLabel = ref('');
const latestMatchweekDateRange = ref('');
const currentMatchWeek = ref(28);
const maxMatchWeek = ref(30); // 38 matchweeks in a season, adjust if necessary
const minMatchWeek = ref(1);
const matches = ref([]);

onMounted(async () =>
{
    window.scrollTo(0, 0);
    await loadData(currentMatchWeek.value);
});

const nextMatch = async () =>
{
    await loadData(currentMatchWeek.value);
};

const loadData = async (currentMatchWeek) =>
{
    try
    {
        matches.value = await matchStore.getMatches({ matchWeek: currentMatchWeek });
        latestMatchweekLabel.value = matches.value[0].latestMatchWeek;
        latestMatchweekDateRange.value = matches.value[0].latestMatchweekDateRange;
    } catch (error)
    {
        console.error('Error fetching matches:', error);
    }
};

</script>

<template class="content-center">
    <SponsorBar :sponsorImage="sponsorImage" />
    <h1
        class="text-white text-5xl font-bold !bg-gradient-to-r from-[#943bff] to-[#25f1ff] px-4 py-4 mx-3 my-6 rounded-t-2xl sm:rounded-2xl md:rounded-2xl xl:rounded-2xl">
        {{ title }}
    </h1>

    <BaseFilter :isReset="true" :filters="filters" />

    <div class="flex flex-1 flex-col gap-4 mt-4">
        <div class="flex justify-center items-center w-full gap-10">
            <button @click="currentMatchWeek > minMatchWeek && (currentMatchWeek -= 1, nextMatch())"
                :disabled="currentMatchWeek <= minMatchWeek"
                class="flex items-center justify-center rounded-full w-10 h-10"
                :class="[currentMatchWeek <= minMatchWeek ? 'bg-[#2e0430] opacity-40' : 'bg-[#37003c] hover:bg-[#410544] cursor-pointer']">
                <el-icon>
                    <ArrowLeft class="text-white" />
                </el-icon>
            </button>
            <div class="flex justify-center items-center flex-col">
                <span class="text-white text-xl font-bold">{{ latestMatchweekLabel }}</span>
                <span class="text-white text-sm">{{ latestMatchweekDateRange }}</span>
            </div>
            <button @click="currentMatchWeek < maxMatchWeek && (currentMatchWeek += 1, nextMatch())"
                :disabled="currentMatchWeek >= maxMatchWeek"
                class="flex items-center justify-center rounded-full w-10 h-10"
                :class="[currentMatchWeek >= maxMatchWeek ? 'bg-[#2e0430] opacity-40' : 'bg-[#37003c] hover:bg-[#410544] cursor-pointer']">
                <el-icon>
                    <ArrowRight class="text-white" />
                </el-icon>
            </button>
        </div>
    </div>

    <div class="bg-[#28002b] py-4 mx-3 my-6 rounded-2xl h-fit">
        <BaseMatchSection v-for="match in matches" :key="match.matchDate" :matchDate="match.matchDate"
            :matches="match.matches" />
    </div>

    <div class="bg-[#28002b] py-4 mx-3 my-13 rounded-2xl h-fit">
        <div class="flex justify-between mx-4">
            <div>
                <span class="font-bold text-md text-white">Possible Premier League Fixtures Changes in 2025/26</span>
                <p class="text-sm text-gray-400">Fixtures</p>
            </div>
            <a href="#">
                <img src="/src/assets/others/PUMA-ball-lead-image.webp" alt=""
                    class="w-[195px] rounded-2xl object-contain" />
            </a>
        </div>
    </div>
</template>


<style scoped>
html,
body {
    background: #1e0021 !important;
}

.scrollbar-none::-webkit-scrollbar {
    display: none;
}

.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>