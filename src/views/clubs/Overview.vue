<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClubStore, useFormation } from '@/stores';
import { PLApps } from '@/stores/plApp';
import { ArrowDown, ArrowRightBold, ArrowUp, Position } from '@element-plus/icons-vue';
import BasePrimaryLineup from '@/components/BasePrimaryLineup.vue';
import BaseClubNextMatchCard from '@/components/BaseClubNextMatchCard.vue';
import BaseTeamForm from '@/components/BaseTeamForm.vue';
import ClubNewsSection from '@/components/ClubNewsSection.vue';
import BaseLeagueTable from '@/components/BaseLeagueTable.vue';
import { useApi } from '@/stores/api';

import sponsorImage from '@/assets/sponsors/PL2526-ClubKits-Referral-Promos-_0000s_0000_ARS.webp';

const apiConfig = useApi();
const route = useRoute();
const clubStore = useClubStore();
const formationStore = useFormation();

const clubId = ref(route.params.clubId);
const clubDetails = ref(null);
const isPrevious = ref(true);
const isPreviousActive = ref('#1e0021');
const isUpcomingActive = ref('');
const clubPos = ref(0);
const numberType = ref('');

const nextMatch = ref(null);
const previous = ref([]);
const upcoming = ref([]);

const lastMatch = ref(null);
const clubLineups = ref([]);
const matchId = ref(0);
const clubFormationId = ref(0);
const clubManager = ref('');
const clubNews = ref([]);
const clubServices = ref([]);
const clubTable = ref([]);

const formations = ref([]);

onMounted(async () =>
{
    try
    {
        await clubStore.getClubOverviewNextMatchAndTeamForm({ clubId: clubId.value });
        await clubStore.getClubLastStarting11({ clubId: clubId.value });
        await formationStore.getFormations();
        await clubStore.getClubNewsAndServices({ clubId: clubId.value });
        await clubStore.getClubTable({ seasonId: 4, clubId: clubId.value });

        const overview = clubStore.overview;
        nextMatch.value = overview.nextMatch;
        clubDetails.value = overview.clubDetail;
        previous.value = JSON.parse(JSON.stringify(overview.teamFormPrevious));
        upcoming.value = JSON.parse(JSON.stringify(overview.teamFormUpcoming));


        const lastStarting = clubStore.lastStarting11;
        matchId.value = lastStarting.matchId;
        clubFormationId.value = lastStarting.clubFormationId;
        clubManager.value = lastStarting.clubManager;

        lastMatch.value = lastStarting.lastMatch;
        clubLineups.value = JSON.parse(JSON.stringify(lastStarting.clubLineups));

        clubTable.value = clubStore.clubTable;

        formations.value = formationStore.formations;

        const clubNewsAndServices = clubStore.clubNewsAndServices;
        clubNews.value = JSON.parse(JSON.stringify(clubNewsAndServices.fromTheClubs));
        clubServices.value = JSON.parse(JSON.stringify(clubNewsAndServices.clubServices));


        const clubRow = clubTable.value.find((p) => p.clubId == clubId.value);

        if (clubRow)
        {
            const pos = Number(clubRow.position);
            clubPos.value = pos;

            const lastDigit = pos % 10;
            const lastTwoDigits = pos % 100;

            if (lastTwoDigits >= 11 && lastTwoDigits <= 13)
            {
                numberType.value = 'th';
            } else
            {
                switch (lastDigit)
                {
                    case 1: numberType.value = 'st'; break;
                    case 2: numberType.value = 'nd'; break;
                    case 3: numberType.value = 'rd'; break;
                    default: numberType.value = 'th'; break;
                }
            }
        } else
        {
            clubPos.value = 0;
            numberType.value = '';
        }
    } catch (error)
    {
        console.error('Error fetching ', error);
    }
});

function toggleMatchView(view)
{
    if (view === 'previous')
    {
        isPrevious.value = true;
        isPreviousActive.value = '#1e0021';
        isUpcomingActive.value = '';
    } else if (view === 'upcoming')
    {
        isPrevious.value = false;
        isPreviousActive.value = '';
        isUpcomingActive.value = '#1e0021';
    }
}

const handleSeeAll = () =>
{

};

</script>

<template>
    <div class="flex flex-1 flex-col gap-4">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <!-- next match -->
            <BaseClubNextMatchCard :next-match="nextMatch" />

            <!-- team form -->
            <div class="!bg-[#28002b] rounded-2xl h-[228px] w-full p-4 flex flex-col gap-2">

                <div class="flex justify-between items-center">
                    <span class="font-bold text-md text-white">
                        Team Form
                        <el-icon>
                            <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                        </el-icon>
                    </span>

                    <div class="!bg-[#37003c] flex justify-center items-center gap-1 px-1 py-1 rounded-sm">
                        <button @click="toggleMatchView('previous')" :style="{ backgroundColor: isPreviousActive }"
                            class="font-bold text-xs text-white px-3 py-2 rounded-sm cursor-pointer transition-all duration-200 hover:bg-[rgba(72,5,78,0.35)] active:scale-95">
                            Previous
                        </button>
                        <button @click="toggleMatchView('upcoming')" :style="{ backgroundColor: isUpcomingActive }"
                            class="font-bold text-xs text-white px-3 py-2 rounded-sm cursor-pointer transition-all duration-200 hover:bg-[rgba(72,5,78,0.35)] active:scale-95">
                            Upcoming
                        </button>
                    </div>
                </div>

                <div class="flex flex-row items-center gap-2 w-full justify-start">
                    <img v-if="clubDetails" :src="apiConfig.CLUB_DIR + clubDetails.clubCrest" class="h-5 w-auto" />
                    <span class="text-white font-semibold text-xs truncate">
                        {{ clubDetails?.clubName }}
                    </span>
                </div>

                <BaseTeamForm :is-previous="isPrevious" :data="isPrevious ? previous : upcoming" />

            </div>

            <!-- last starting 11 -->
            <div class="relative !bg-[#28002b] rounded-2xl h-[680px] w-full z-10 overflow-hidden">
                <div
                    class="absolute left-1/2 -bottom-20 -translate-x-1/2 w-38 h-38 rounded-full border-2 border-[#4b1254]">
                </div>
                <div class="w-full p-4">
                    <div class="flex justify-between">
                        <span class="font-bold text-md text-white">Last Starting 11</span>
                        <button
                            class="font-bold text-xs text-white !bg-[#37003c] px-3 py-2 rounded-2xl cursor-pointer">See
                            all
                            <el-icon>
                                <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                            </el-icon>
                        </button>
                    </div>

                    <router-link v-if="lastMatch" :to="{
                        name: 'matches-detail',
                        params: {
                            matchId: lastMatch.matchId,
                            matchTitle: `${lastMatch.homeClubName.toLowerCase().replace(/\s+/g, '-')}-vs-${lastMatch.awayClubName.toLowerCase().replace(/\s+/g, '-')}`
                        },
                        query: { tab: 'recap' }
                    }"
                        class="flex justify-center flex-col items-center h-auto w-full bg-[#37003c] rounded-2xl mt-4 p-3 hover:bg-[#37003c] hover:cursor-pointer">
                        <div class="flex items-center justify-between w-full max-w-xl mx-auto p-2">
                            <div class="flex flex-row items-center w-2/5 justify-end gap-2">
                                <span class="text-white font-semibold text-xs text-center truncate">{{
                                    lastMatch.homeClubName }}</span>
                                <img :src="apiConfig.CLUB_DIR + lastMatch.homeClubCrest" class="h-5 w-5" />
                            </div>
                            <div class="flex flex-col justify-center items-center gap-1 w-1/5">
                                <div class="bg-[#1e0021] h-6 w-auto flex justify-center items-center px-3 rounded-sm">
                                    <span class="text-white font-bold text-sm text-center">{{ lastMatch.homeClubGoal }}
                                        - {{ lastMatch.awayClubGoal }}</span>
                                </div>
                                <span class="text-gray-300 text-xs font-bold">FT</span>
                            </div>
                            <div class="flex flex-row items-center gap-2 w-2/5 justify-start">
                                <img :src="apiConfig.CLUB_DIR + lastMatch.awayClubCrest" class="h-5 w-auto" />
                                <span class="text-white font-semibold text-xs text-center truncate">{{
                                    lastMatch.awayClubName }}</span>
                            </div>
                        </div>

                        <div class="flex justify-center items-center w-full max-w-xl mx-auto">
                            <span class="text-gray-400 text-xs">{{ lastMatch.matchweek }} • {{ lastMatch.matchDate
                                }}</span>
                        </div>
                    </router-link>

                    <div class="flex mt-6 flex-row gap-1">
                        <span class="text-sm text-gray-400">Manager</span>
                        <span class="text-sm text-white font-bold">{{ clubManager }}</span>
                    </div>
                </div>

                <div
                    class="flex justify-between items-center flex-col w-full h-auto border-t-2 border-t-[#4b1254] mt-3">
                    <div
                        class="flex items-center flex-col w-70 h-28 border-b-2 border-r-2 border-l-2 border-[#4b1254] bg-[#28002b]">
                        <div class="relative w-22 h-9 border-b-2 border-r-2 border-l-2 border-[#4b1254]">

                        </div>

                        <div class="relative w-full">
                            <div
                                class="absolute left-1/2 -translate-x-1/2 w-30 h-30 rounded-full border-2 border-[#4b1254] -z-1">
                            </div>
                        </div>
                    </div>

                    <!-- primary formation -->
                    <div class="absolute w-full h-[442px]">
                        <BasePrimaryLineup :formations="formations" :formation-id="clubFormationId"
                            :players="clubLineups" />
                    </div>
                </div>
            </div>

            <!-- table -->
            <div
                class="bg-[#28002b] rounded-2xl h-fit w-full flex flex-col overflow-x-auto custom-scrollbar scrollbar-none">
                <!-- header -->
                <div class="flex justify-between p-4">
                    <span class="font-bold text-md text-white flex items-center gap-1">
                        Table
                        <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                    </span>
                </div>

                <!-- title -->
                <div class="flex justify-start items-center w-full px-4 text-5xl text-white font-bold">
                    {{ clubPos }}<sup>{{ numberType }}</sup>
                </div>

                <!-- subtitle -->
                <div class="flex justify-end items-center gap-1 w-full px-4 text-gray-400 font-bold">
                    <ArrowDown class="text-pink-600 text-sm bg-[#4b1254] rounded-full w-4 h-4" />
                    <span class="text-white text-xs">Down 1 place from MW2</span>
                </div>

                <BaseLeagueTable :data="clubTable" :selectedClubId="clubId" :showCols="{
                    played: true,
                    wins: true,
                    losses: false,
                    points: true,
                    form: false,
                    next: false,
                    gf: false,
                    ga: false,
                    gd: true,
                    draws: false
                }" />
            </div>
        </div>

        <div class="flex flex-1 flex-col gap-4">
            <div class="flex gap-4 px-3 mt-4 mb-10">
                <div class="flex flex-wrap justify-center gap-4 h-[110px] flex-1">
                    <img class=" rounded-2xl w-full xl:w-[75%]" :src="sponsorImage" alt="" />
                </div>
            </div>

            <!-- <div class="flex gap-4 px-3 pt-4">
                <div class="flex flex-wrap gap-4 h-fit flex-1 overflow-hidden">
                    <div class="flex justify-between items-center w-full">
                        <span class="font-bold text-md text-white">Top Performers</span>
                        <button
                            class="font-bold text-xs text-white !bg-[#37003c] px-3 py-2 rounded-2xl cursor-pointer">See
                            all
                            <el-icon>
                                <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                            </el-icon>
                        </button>
                    </div>

                    
                    <div class="flex gap-4 w-full h-full overflow-x-auto custom-scrollbar pb-1">
                        <div class="flex flex-col !bg-[#28002b] rounded-2xl h-auto flex-1 min-w-[370px] p-4 gap-3">
                            <span class="font-bold text-md text-white">Top Goal Scorer<el-icon>
                                    <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                                </el-icon></span>
                            <div class="flex justify-start gap-3">
                                <div class="flex justify-center items-end rounded-2xl w-[85px] h-[85px] overflow-hidden"
                                    :style="{ backgroundColor: clubDetails?.clubTheme || '#37003c' }">
                                    <img src="/src/assets/players/jurriën_timber.png" alt=""
                                        class="w-19 h-auto object-cover">
                                </div>
                                <div class="flex flex-col items-start gap-0">
                                    <h4 class="text-sm text-white font-bold">Jurriën</h4>
                                    <h3 class="text-lg text-white font-bold">Timber</h3>
                                    <h2 class="text-3xl text-white font-bold">2</h2>
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-col !bg-[#28002b] rounded-2xl h-auto flex-1 min-w-[370px] p-4 gap-3">
                            <span class="font-bold text-md text-white">Most Assists<el-icon>
                                    <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                                </el-icon></span>
                            <div class="flex justify-start gap-3">
                                <div class="flex justify-center items-end rounded-2xl w-[85px] h-[85px] overflow-hidden"
                                    :style="{ backgroundColor: clubDetails?.clubTheme || '#37003c' }">
                                    <img src="/src/assets/players/ricardo_calafiori.png" alt=""
                                        class="w-19 h-auto object-cover">
                                </div>
                                <div class="flex flex-col items-start gap-0">
                                    <h4 class="text-sm text-white font-bold">Riccardo</h4>
                                    <h3 class="text-lg text-white font-bold">Calafiori</h3>
                                    <h2 class="text-3xl text-white font-bold">2</h2>
                                </div>
                            </div>
                        </div>

                        <div
                            class="flex flex-col !bg-[#28002b] rounded-2xl h-auto flex-1 min-w-[370px] p-4 gap-3 flex-wrap">
                            <span class="font-bold text-md text-white">Most Successful Passes<el-icon>
                                    <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                                </el-icon></span>
                            <div class="flex justify-start gap-3">
                                <div class="flex justify-center items-end rounded-2xl w-[85px] h-[85px] overflow-hidden"
                                    :style="{ backgroundColor: clubDetails?.clubTheme || '#37003c' }">
                                    <img src="/src/assets/players/gabriel_magalhães.png" alt=""
                                        class="w-19 h-auto object-cover">
                                </div>
                                <div class="flex flex-col items-start gap-0">
                                    <h4 class="text-sm text-white font-bold">Gabriel</h4>
                                    <h3 class="text-lg text-white font-bold">Magalhães</h3>
                                    <h2 class="text-3xl text-white font-bold">143</h2>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>
            </div> -->

            <div v-if="clubNews.length > 0" class="flex gap-4 px-3 py-4">
                <ClubNewsSection :club-details="clubDetails" :news-items="clubNews" title="From the Clubs"
                    @see-all="handleSeeAll" />
            </div>

            <div v-if="clubServices.length > 0" class="flex gap-4 px-3">
                <div class="flex flex-col items-start gap-2 !bg-[#28002b] rounded-2xl h-auto flex-1 p-4">
                    <a :href="service.serviceUrl" target="_blank" v-for="service in clubServices"
                        :key="service.serviceId"
                        class="flex justify-between items-center w-full px-3 py-2 rounded-xl hover:!bg-[#37003c]">
                        <span class="font-bold text-md text-white">{{ service.serviceName }}</span>
                        <el-icon>
                            <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                        </el-icon>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
nav::-webkit-scrollbar {
    height: 6px;
}

nav::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

nav::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 3px;
}

nav::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.6);
}

nav {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1);
}

.custom-scrollbar::-webkit-scrollbar {
    height: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
}

.scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 3px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.6);
}

.custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.4) rgba(255, 255, 255, 0.1);
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>