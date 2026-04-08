<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore, useMatchStore } from '@/stores';
import { PLApps } from '@/stores/plApp';
import { ArrowDown, ArrowRightBold, ArrowUp, Position } from '@element-plus/icons-vue';
import BasePrimaryFormation433 from '@/components/BasePrimaryFormation433.vue';
import BasePrimaryFormation352 from '@/components/BasePrimaryFormation352.vue';
import BasePrimaryFormation442 from '@/components/BasePrimaryFormation442.vue';
import BasePrimaryFormation541 from '@/components/BasePrimaryFormation541.vue';
import BasePrimaryFormation3421 from '@/components/BasePrimaryFormation3421.vue';
import BasePrimaryFormation4231 from '@/components/BasePrimaryFormation4231.vue';
import BasePrimaryFormation4411 from '@/components/BasePrimaryFormation4411.vue';
import BaseClubNextMatchCard from '@/components/BaseClubNextMatchCard.vue';

const route = useRoute();
const teamStore = useTeamStore();
const clubId = ref(route.params.clubId);
const clubName = ref(route.params.clubName);
const clubDetails = ref(null);
const isPrevious = ref(true);
const isPreviousActive = ref('#1e0021');
const isUpcomingActive = ref('');
const matchStore = useMatchStore();
const matchTables = ref(null);
const clubPos = ref(0);
const numberType = ref('');
const clubPrimaryFormation = ref(1);
const primaryFormation = ref([
    "3-5-2",
    "4-3-3",
    "4-4-2",
    "5-4-1",
    "3-4-2-1",
    "4-2-3-1",
    "4-4-1-1",
]);

onMounted(async () =>
{
    try
    {
        await fetchClubDetails();
        await matchStore.getMatchTables(0);
        // matchStore.matchTables is not a promise, don't await it
        matchTables.value = Array.isArray(matchStore.matchTables) ? matchStore.matchTables : [];

        // take 9 clubs around the clubId
        const original = Array.isArray(matchTables.value) ? matchTables.value : [];
        const windowSize = 9;
        const centerIndex = Math.floor(windowSize / 2); // 4 -> put target at index 4 of the 9
        const targetId = Number(clubId.value);

        // try several common id fields to find the club index
        let idx = original.findIndex(c =>
            Number(c.clubId) === targetId
        );

        // fallback: if route param is non-numeric, attempt matching by name
        if (idx === -1 && clubId.value && isNaN(targetId))
        {
            const idStr = String(clubId.value).toLowerCase();
            idx = original.findIndex(c => String(c.clubName || c.team?.name || '').toLowerCase().includes(idStr));
        }

        // additional fallback: try loose numeric/string matches for clubId
        if (idx === -1 && !isNaN(targetId))
        {
            idx = original.findIndex(c =>
                String(c.clubId) === String(clubId.value) ||
                Number(c.clubId) === targetId
            );
        }

        if (original.length <= windowSize)
        {
            // short list: keep all
            matchTables.value = original;
        }
        else if (idx === -1)
        {
            // not found: default to first windowSize
            matchTables.value = original.slice(0, windowSize);
        }
        else
        {
            // compute start and clamp so slice always stays within bounds
            let start = idx - centerIndex;
            start = Math.max(0, Math.min(start, original.length - windowSize));
            matchTables.value = original.slice(start, start + windowSize);
        }

        // set clubPos from the found club (prefer the matched index), handle missing gracefully
        const matchedClub = original[idx] || original.find(c =>
            Number(c.clubId) === targetId ||
            String(c.clubName || c.team?.name || '').toLowerCase() === String(clubId.value).toLowerCase()
        );

        clubPos.value = matchedClub?.pos ?? 0;

        switch (clubPos.value)
        {
            case 1:
                numberType.value = 'st';
                break;
            case 2:
                numberType.value = 'nd';
                break;
            case 3:
                numberType.value = 'rd';
                break;
            default:
                numberType.value = 'th';
                break;
        }


        nextMatch.value.homeClub.clubId = clubDetails.value.teamId;
        nextMatch.value.homeClub.name = clubDetails.value.name;
        nextMatch.value.homeClub.clubCrest = clubDetails.value.clubCrest;

        // console.log(clubId.value, clubPos.value)
        // console.log(JSON.stringify(matchTables.value))
    } catch (error)
    {
        console.error('Error fetching ', error);
    }
})

const fetchClubDetails = async () =>
{
    try
    {
        const response = await teamStore.getTeamById(clubId.value);
        clubDetails.value = response;
        // console.log('Club Details:', clubDetails.value);
    } catch (error)
    {
        console.error('Error fetching club details:', error);
    }
};

const players = ref([
    {
        info: {
            id: 1,
            name: 'David Raya',
            photo: 'david_raya.png',
            position: 'Goalkeeper',
            number: 22,
        },
    },
    {
        info: {
            id: 2,
            name: 'Kieran Tierney',
            photo: 'kieran_tierney.png',
            position: 'Defender',
            number: 3,
        },
    },
    {
        info: {
            id: 3,
            name: 'William Saliba',
            photo: 'william_saliba_new.png',
            position: 'Defender',
            number: 2,
        },
        forwardMinutes: "5'",
    },
    {
        info: {
            id: 4,
            name: 'Ben White',
            photo: 'ben_white.png',
            position: 'Defender',
            number: 4,
        },
        isCaption: true,
    },
    {
        info: {
            id: 5,
            name: 'Jurriën Timber',
            photo: 'jurriën_timber.png',
            position: 'Defender',
            number: 12,
        },
    },
    {
        info: {
            id: 6,
            name: 'Thomas Partey',
            photo: 'thomas_partey.png',
            position: 'Midfielder',
            number: 5,
        },
        forwardMinutes: "70'",
    },
    {
        info: {
            id: 7,
            name: 'Martin Ødegaard',
            photo: 'martin_qdegaard.png',
            position: 'Midfielder',
            number: 8,
        },
        isYellowCard: false,
    },
    {
        info: {
            id: 8,
            name: 'Riccardo Calafiori',
            photo: 'ricardo_calafiori.png',
            position: 'Defender',
            number: 33,
        },
        isAssist: true,
    },
    {
        info: {
            id: 9,
            name: 'Eberechi Eze',
            photo: '232413.png',
            position: 'Midfielder',
            number: 10,
        },
        forwardMinutes: "89'",
        isGoal: true,
    },
    {
        info: {
            id: 10,
            name: 'Oleksandr Zinchenko',
            photo: 'oleksandr_zinchenko.png',
            position: 'Defender',
            number: 17,
        },
        isYellowCard: false,
        isGoal: true,
    },
    {
        info: {
            id: 11,
            name: 'Takehiro Tomiyasu',
            photo: 'takehiro_tomiyasu.png',
            position: 'Defender',
            number: 18,
        },
        forwardMinutes: "70'",
    },

]);

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

const nextMatch = ref({
    matchId: 1,
    matchDate: 'Sat 13 Sep',
    kickoff: '12:30',
    league: 'Premier League',
    homeClub: {
        clubId: 0,
        name: '',
        clubCrest: '',
        goal: 0,
    },
    awayClub: {
        clubId: 0,
        name: 'Nottingham Forest',
        clubCrest: 'nf.svg',
        goal: 0,
    }
});

</script>

<template>
    <div class="flex flex-1 flex-col gap-4">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <!-- next match -->
            <BaseClubNextMatchCard :next-match="nextMatch" />

            <!-- team form -->
            <div class="!bg-[#28002b] rounded-2xl h-[205px] w-full p-4">
                <div class="flex justify-between">
                    <span class="font-bold text-md text-white">Team Form <el-icon>
                            <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                        </el-icon></span>
                    <div class="!bg-[#37003c] flex justify-center items-center gap-0 px-1 py-1 rounded-sm">
                        <button v-on:click="toggleMatchView('previous')" :style="{ backgroundColor: isPreviousActive }"
                            class="font-bold text-xs text-white  px-3 py-2 rounded-sm cursor-pointer">Previous
                        </button>
                        <button v-on:click="toggleMatchView('upcoming')" :style="{ backgroundColor: isUpcomingActive }"
                            class="font-bold text-xs text-white  px-3 py-2 rounded-sm cursor-pointer">Upcoming
                        </button>
                    </div>
                </div>

                <div class="flex flex-row items-center gap-2 w-2/5 justify-start">
                    <img :src="clubDetails ? teamStore.TEAM_LOGOS_DIR + clubDetails.clubCrest : ''" alt="Opponent Logo"
                        class="h-5 w-auto" />
                    <span class="text-white font-semibold text-xs text-center truncate">{{ clubDetails ?
                        clubDetails.name : '' }}</span>
                </div>

                <div class="flex justify-start items-center gap-2 w-full overflow-x-auto scrollbar-none">
                    <div v-if="isPrevious" class="flex flex-row gap-4 p-2">
                        <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
                            <span class="text-gray-500 font-bold text-[10px] text-center">MW 1</span>
                            <img :src="teamStore.TEAM_LOGOS_DIR + 'menu.svg'" alt="Opponent Logo" class="h-10 w-10" />
                            <span class="text-gray-500 font-bold text-[10px]  text-center">MUN (A)</span>
                            <span
                                class="text-white font-bold text-xs text-center w-full bg-green-600 rounded-br-lg rounded-bl-lg">0
                                - 1</span>
                        </div>

                        <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
                            <span class="text-gray-500 font-bold text-[10px] text-center">MW 2</span>
                            <img :src="teamStore.TEAM_LOGOS_DIR + 'leed.svg'" alt="Opponent Logo" class="h-10 w-10" />
                            <span class="text-gray-500 font-bold text-[10px]  text-center">LEE (H)</span>
                            <span
                                class="text-white font-bold text-xs text-center w-full bg-green-600 rounded-br-lg rounded-bl-lg">5
                                - 0</span>
                        </div>

                        <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
                            <span class="text-gray-500 font-bold text-[10px] text-center">MW 3</span>
                            <img :src="teamStore.TEAM_LOGOS_DIR + 'liv.png'" alt="Opponent Logo" class="h-10 w-10" />
                            <span class="text-gray-500 font-bold text-[10px]  text-center">LIV (A)</span>
                            <span
                                class="text-white font-bold text-xs text-center w-full bg-red-600 rounded-br-lg rounded-bl-lg">1
                                - 0</span>
                        </div>
                    </div>

                    <div v-else class="flex flex-row gap-4 p-2">
                        <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
                            <span class="text-gray-500 font-bold text-[10px] text-center">MW 4</span>
                            <img :src="teamStore.TEAM_LOGOS_DIR + 'nf.svg'" alt="Opponent Logo" class="h-10 w-10" />
                            <span class="text-gray-500 font-bold text-[10px]  text-center">NFO (H)</span>
                            <span
                                class="text-white font-bold text-xs text-center w-full bg-[#4b1254] rounded-br-lg rounded-bl-lg">13
                                Sep</span>
                        </div>

                        <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
                            <span class="text-gray-500 font-bold text-[10px] text-center">MW 5</span>
                            <img :src="teamStore.TEAM_LOGOS_DIR + 'mci.png'" alt="Opponent Logo" class="h-10 w-10" />
                            <span class="text-gray-500 font-bold text-[10px]  text-center">MCI (H)</span>
                            <span
                                class="text-white font-bold text-xs text-center w-full bg-[#4b1254] rounded-br-lg rounded-bl-lg">21
                                Sep</span>
                        </div>

                        <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
                            <span class="text-gray-500 font-bold text-[10px] text-center">MW 6</span>
                            <img :src="teamStore.TEAM_LOGOS_DIR + 'new.png'" alt="Opponent Logo" class="h-10 w-10" />
                            <span class="text-gray-500 font-bold text-[10px]  text-center">NEW (A)</span>
                            <span
                                class="text-white font-bold text-xs text-center w-full bg-[#4b1254] rounded-br-lg rounded-bl-lg">28
                                Sep</span>
                        </div>
                        <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
                            <span class="text-gray-500 font-bold text-[10px] text-center">MW 7</span>
                            <img :src="teamStore.TEAM_LOGOS_DIR + 'sou.png'" alt="Opponent Logo" class="h-10 w-10" />
                            <span class="text-gray-500 font-bold text-[10px]  text-center">SOU (H)</span>
                            <span
                                class="text-white font-bold text-xs text-center w-full bg-[#4b1254] rounded-br-lg rounded-bl-lg">04
                                Oct</span>
                        </div>
                        <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
                            <span class="text-gray-500 font-bold text-[10px] text-center">MW 8</span>
                            <img :src="teamStore.TEAM_LOGOS_DIR + 'ful.png'" alt="Opponent Logo" class="h-10 w-10" />
                            <span class="text-gray-500 font-bold text-[10px]  text-center">FUL (A)</span>
                            <span
                                class="text-white font-bold text-xs text-center w-full bg-[#4b1254] rounded-br-lg rounded-bl-lg">18
                                Oct</span>
                        </div>
                    </div>
                </div>
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

                    <div
                        class="flex justify-center flex-col items-center h-auto w-full bg-[#37003c] rounded-2xl mt-4 p-3">
                        <div class="flex items-center justify-between w-full max-w-xl mx-auto p-2">
                            <div class="flex flex-row items-center w-2/5 justify-end gap-2">
                                <span class="text-white font-semibold text-xs text-center truncate">Liverpool</span>
                                <img :src="teamStore.TEAM_LOGOS_DIR + 'liv.png'" alt="Club Logo" class="h-5 w-5" />
                            </div>
                            <div class="flex flex-col justify-center items-center gap-1 w-1/5">
                                <div class="bg-[#1e0021] h-6 w-auto flex justify-center items-center px-3 rounded-sm">
                                    <span class="text-white font-bold text-sm text-center">1 - 0</span>
                                </div>
                                <span class="text-gray-300 text-xs font-bold">FT</span>
                            </div>
                            <div class="flex flex-row items-center gap-2 w-2/5 justify-start">
                                <img :src="clubDetails ? teamStore.TEAM_LOGOS_DIR + clubDetails.clubCrest : ''"
                                    alt="Opponent Logo" class="h-5 w-auto" />
                                <span class="text-white font-semibold text-xs text-center truncate">{{
                                    clubDetails ?
                                        clubDetails.name : '' }}</span>
                            </div>
                        </div>

                        <div class="flex justify-center items-center w-full max-w-xl mx-auto">
                            <span class="text-gray-400 text-xs">Matchweek 3 • Sun 31 Aug</span>
                        </div>
                    </div>

                    <div class="flex mt-6 flex-row gap-1">
                        <span class="text-sm text-gray-400">Manager</span>
                        <span class="text-sm text-white font-bold">Mikel Arteta</span>
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
                        <BasePrimaryFormation352 v-if="clubPrimaryFormation === 0" :players="players" />
                        <BasePrimaryFormation433 v-else-if="clubPrimaryFormation === 1" :players="players" />
                        <BasePrimaryFormation442 v-else-if="clubPrimaryFormation === 2" :players="players" />
                        <BasePrimaryFormation541 v-else-if="clubPrimaryFormation === 3" :players="players" />
                        <BasePrimaryFormation3421 v-else-if="clubPrimaryFormation === 4" :players="players" />
                        <BasePrimaryFormation4231 v-else-if="clubPrimaryFormation === 5" :players="players" />
                        <BasePrimaryFormation4411 v-else-if="clubPrimaryFormation === 6" :players="players" />
                    </div>
                </div>
            </div>

            <!-- table -->
            <div
                class="bg-[#28002b] rounded-2xl h-[800px] w-full flex flex-col overflow-x-auto custom-scrollbar scrollbar-none">
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

                <!-- custom table -->
                <div class="flex-1 overflow-y-auto mt-4 mx-4 rounded-lg">
                    <!-- header row -->
                    <div
                        class="grid grid-cols-[70px_200px_1fr] text-[#6a7282] font-normal text-sm border-b border-[#3a0040]">
                        <!-- Pos -->
                        <div class="sticky left-0 bg-[#28002b] z-10 p-3 text-center">Pos</div>
                        <!-- Team -->
                        <div class="sticky left-[70px] bg-[#28002b] z-10 p-3">Team</div>
                        <!-- Stats -->
                        <div class="flex justify-end gap-8 p-3 pr-6">
                            <span>PI</span>
                            <span>W</span>
                            <span>GD</span>
                            <span>Pts</span>
                        </div>
                    </div>

                    <!-- body rows -->
                    <div v-for="club in matchTables" :key="club.pos"
                        class="relative grid grid-cols-[70px_200px_1fr] items-center text-white text-sm hover:bg-[#3a0040] rounded-lg transition h-[59px] mt-2"
                        :class="club.clubId == clubId ? 'bg-[#3a0040]' : ''">
                        <!-- Pos -->
                        <div
                            class="sticky left-0 z-10 p-3 font-bold text-center flex items-center justify-center gap-1">
                            {{ club.pos }}
                            <ArrowUp v-if="club.isLatestWin" class="text-green-600 w-3 h-3" />
                            <ArrowDown v-else class="text-red-600 w-3 h-3" />
                        </div>

                        <!-- Team -->
                        <div class="sticky left-[70px] z-10 p-3 font-bold flex items-center gap-2">
                            <img :src="club.clubCrest ? teamStore.TEAM_LOGOS_DIR + club.clubCrest : ''"
                                class="w-5 h-5 object-contain" alt="" />
                            <span>{{ club.clubName }}</span>
                        </div>

                        <!-- Stats -->
                        <div class="flex justify-end gap-11 p-3 pr-6">
                            <span>{{ club.pi }}</span>
                            <span>{{ club.w }}</span>
                            <span>{{ club.gd }}</span>
                            <span class="font-bold">{{ club.pts }}</span>
                        </div>

                        <!-- left indicator bar -->
                        <div v-if="club.pos <= 4"
                            class="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-lg z-10">
                        </div>

                        <div v-else-if="club.pos == 5"
                            class="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r-lg z-10"></div>

                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-1 flex-col gap-4">
            <div class="flex gap-4 px-3 mt-4 mb-10">
                <div class="flex flex-wrap justify-center gap-4 h-[110px] flex-1">
                    <img class=" rounded-2xl w-full xl:w-[75%]"
                        src="/src/assets/sponsors/PL2526-ClubKits-Referral-Promos-_0000s_0000_ARS.webp" alt="" />
                </div>
            </div>

            <div class="flex gap-4 px-3 pt-4">
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
                                    :style="{ backgroundColor: clubDetails?.teamThemeColor || '#37003c' }">
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
                                    :style="{ backgroundColor: clubDetails?.teamThemeColor || '#37003c' }">
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
                                    :style="{ backgroundColor: clubDetails?.teamThemeColor || '#37003c' }">
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
            </div>

            <div class="flex gap-4 px-3 py-4">
                <div
                    class="flex items-start flex-wrap gap-4 !bg-[#28002b] rounded-2xl h-[auto] flex-1 p-4 overflow-hidden">
                    <div class="flex justify-between items-center w-full h-auto">
                        <div class="flex justify-start items-center gap-2">
                            <div class="flex justify-center items-end rounded-xl w-[40px] h-[40px] p-1 overflow-hidden"
                                :style="{ backgroundColor: clubDetails?.teamThemeColor || '#37003c' }">
                                <img :src="clubDetails ? teamStore.TEAM_LOGOS_DIR + clubDetails.clubCrest : ''"
                                    alt="Club Logo" class="w-full h-full object-contain">
                            </div>
                            <span class="font-bold text-md text-white">Form the clubs</span>
                        </div>
                        <button
                            class="font-bold text-xs text-white !bg-[#37003c] px-3 py-2 rounded-2xl cursor-pointer">See
                            all
                            <el-icon>
                                <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                            </el-icon>
                        </button>
                    </div>

                    <div class="flex gap-4 w-full h-[205px] overflow-x-auto custom-scrollbar">
                        <div class="flex flex-col gap-2 flex-1 min-w-[370px]">
                            <div class="flex justify-center items-center rounded-2xl h-full p-4 gap-3"
                                :style="{ backgroundColor: clubDetails?.teamThemeColor || '#37003c' }">
                                <img :src="clubDetails ? teamStore.TEAM_LOGOS_DIR + clubDetails.clubCrest : ''" alt=""
                                    class="w-auto h-23 object-cover">
                            </div>
                            <span class="text-sm text-white font-bold">
                                Rice score anm Madueke assists in England win
                            </span>
                        </div>

                        <div class="flex flex-col gap-2 flex-1 min-w-[370px]">
                            <div class="flex justify-center items-center rounded-2xl h-full p-4 gap-3"
                                :style="{ backgroundColor: clubDetails?.teamThemeColor || '#37003c' }">
                                <img :src="clubDetails ? teamStore.TEAM_LOGOS_DIR + clubDetails.clubCrest : ''" alt=""
                                    class="w-auto h-23 object-cover">
                            </div>
                            <span class="text-sm text-white font-bold">
                                41 photos from our 4-1 win over London city
                            </span>
                        </div>

                        <div class="flex flex-col gap-2 flex-1 min-w-[370px]">
                            <div class="flex justify-center items-center rounded-2xl h-full p-4 gap-3"
                                :style="{ backgroundColor: clubDetails?.teamThemeColor || '#37003c' }">
                                <img :src="clubDetails ? teamStore.TEAM_LOGOS_DIR + clubDetails.clubCrest : ''" alt=""
                                    class="w-auto h-23 object-cover">
                            </div>
                            <span class="text-sm text-white font-bold">
                                Renee Reflects on opening day win
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex gap-4 px-3">
                <div class="flex flex-col items-start gap-2 !bg-[#28002b] rounded-2xl h-auto flex-1 p-4">
                    <div v-for="app in PLApps" :key="app.id"
                        class="flex justify-between items-center w-full px-3 py-2 rounded-xl hover:!bg-[#37003c]">
                        <span class="font-bold text-md text-white">{{ app.title }}</span>
                        <el-icon>
                            <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                        </el-icon>
                    </div>

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