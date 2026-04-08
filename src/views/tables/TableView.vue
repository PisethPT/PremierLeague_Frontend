<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useTableStore } from '@/stores/tableStore';
import PageTitleBase from '@/components/PageTitleBase.vue';
import
{
    ArrowUp,
    ArrowDown,
    Minus,
} from '@element-plus/icons-vue';
import SponsorBar from '@/components/SponsorBar.vue';
import BaseFilter from '@/components/BaseFilter.vue';

const tableStore = useTableStore();
const title = ref('Tables');
const sponsorImage = ref('/src/assets/sponsors/9044630324637544770.png');
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
        label: 'All Matchweeks',
        tag: 'allMatchweeks',
    },
    {
        id: 4,
        label: 'Home & Alway',
        tag: 'homeAndAlway',
    },
]);

onMounted(async () =>
{
    try
    {
        await tableStore.getTables();
    } catch (error)
    {
        console.error('Error fetching table data:', error);
    }
});

</script>

<template>
    <div class="content-center">
        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />
        <PageTitleBase :title="title" />
        <BaseFilter :isReset="true" :filters="filters" />

        <div class="flex-1 overflow-y-auto mt-4 mx-4 rounded-2xl !bg-[#28002b] py-4 pe-2">
            <div class="grid grid-cols-[90px_300px_1fr] text-white font-normal text-[16px]">
                <div class="sticky left-0 bg-[#28002b] z-10 px-3 text-center">Pos</div>
                <div class="sticky left-[70px] bg-[#28002b] z-10 px-3 w-fit">Team</div>
                <div class="grid grid-cols-[50px_50px_50px_50px_50px_50px_50px_170px_50px_60px] justify-self-end pr-6">
                    <div class="text-center">PI</div>
                    <div class="text-center">W</div>
                    <div class="text-center">D</div>
                    <div class="text-center">L</div>
                    <div class="text-center">GF</div>
                    <div class="text-center">GA</div>
                    <div class="text-center">GD</div>
                    <div class="text-center">Form</div>
                    <div class="text-center">Pts</div>
                    <div class="text-center">Next</div>
                </div>
            </div>

            <div v-for="row in tableStore.tables" :key="row.position"
                class="relative grid grid-cols-[90px_300px_1fr] items-center text-white text-sm hover:bg-[#3a0040] rounded-lg transition h-[59px] mt-2">
                <div
                    class="sticky left-0 z-10 p-3 text-lg font-bold text-center flex items-center justify-center gap-6">
                    {{ row.position }}
                    <ArrowUp v-if="row.positionStatus == 'UP'" class="text-green-600 w-3 h-3" />
                    <ArrowDown v-else-if="row.positionStatus == 'DOWN'" class="text-red-600 w-3 h-3" />
                    <Minus v-else-if="row.positionStatus == 'SAME'" class="text-gray-600 w-3 h-3" />
                    <div v-else class="text-gray-600 w-3 h-3"></div>
                </div>
                <div class="sticky left-[70px] z-10 p-3 font-bold flex items-center gap-2 whitespace-nowrap w-fit">
                    <img :src="row.clubCrest" class="w-8 h-8 object-contain" alt="" />
                    <router-link
                        :to="{ name: 'clubs-overview', params: { clubId: row.clubId, clubName: row.clubName.toString().toLowerCase().replace(/\s+/g, '-') } }"
                        class="text-[17px] font-bold cursor-pointer">{{ row.clubName }}</router-link>
                </div>
                <div
                    class="grid grid-cols-[50px_50px_50px_50px_50px_50px_50px_170px_50px_60px] justify-self-end pr-6 items-center">
                    <div class="text-center">{{ row.played }}</div>
                    <div class="text-center">{{ row.wins }}</div>
                    <div class="text-center">{{ row.draws }}</div>
                    <div class="text-center">{{ row.losses }}</div>
                    <div class="text-center">{{ row.gf }}</div>
                    <div class="text-center">{{ row.ga }}</div>
                    <div class="text-center">{{ row.gd }}</div>
                    <div class="flex justify-center gap-2">
                        <div v-for="(f, i) in row.form.split(',')" :key="i"
                            class="w-6 h-6 text-[10px] font-bold rounded-full flex items-center justify-center text-center"
                            :style="{
                                backgroundColor: f === 'W' ? '#22c55e' : f === 'D' ? '#e5e7eb' : '#ef4444',
                                color: f === 'D' ? '#000' : '#fff'
                            }">
                            {{ f }}
                        </div>
                    </div>
                    <div class="text-center font-bold">{{ row.points }}</div>
                    <div class="flex items-center justify-center">
                        <img v-if="row.next" :src="row.next" class="w-8 h-8 object-contain" alt="" />
                    </div>
                </div>
                <div v-if="row.qualification == 'UCL'"
                    class="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-lg z-10"></div>
                <div v-else-if="row.qualification == 'UEL'"
                    class="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r-lg z-10">
                </div>
                <div v-else-if="row.qualification == 'RELEGATION'"
                    class="absolute left-0 top-0 h-full w-1 bg-pink-500 rounded-r-lg z-10">
                </div>
            </div>
        </div>
        <div class="flex items-center gap-3 flex-wrap mx-4 mt-6">
            <div class="w-4 h-2 bg-blue-500 rounded-xs"></div>
            <span class="text-white text-sm">Champions League Qualification</span>
            <div class="w-4 h-2 bg-orange-500 rounded-xs"></div>
            <span class="text-white text-sm">Europa League Qualification</span>
            <div class="w-4 h-2 bg-pink-500 rounded-xs"></div>
            <span class="text-white text-sm">Relegation Qualification</span>
        </div>
    </div>
</template>