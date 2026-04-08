<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useApiConfig } from '@/stores/apiConfig';
import BaseClubNextMatchCard from '@/components/BaseClubNextMatchCard.vue';
import BaseTeamFormPreviousCard from '@/components/BaseTeamFormPreviousCard.vue';
import BaseTeamFormUpcomingCard from '@/components/BaseTeamFormUpcomingCard.vue';
import { PLApps } from '@/stores/plApp';
import { ArrowRightBold, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const route = useRoute();
const apiConfig = useApiConfig();
const playerStore = usePlayerStore();
const playerId = ref(route.params.playerId);
const player = ref(null);
const club = ref(null);
const isPrevious = ref(true);
const isPreviousActive = ref('#1e0021');
const isUpcomingActive = ref('');
const teammatesContainer = ref(null);
const teammates = ref([]);
const isAtStart = ref(true);
const isAtEnd = ref(false);
const placeholder = ref("/src/assets/resources/placeholder.png");
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

const previous = ref([
    {
        matchWeek: 6,
        otherClub: {
            clubId: 17,
            name: 'Newcastle United',
            shortName: 'NEW',
            clubCrest: 'new.png',
            goads: 1,
        },
        mainGoal: 2,
        isWon: true,
        isHomeClub: false,
    },
    {
        matchWeek: 7,
        otherClub: {
            clubId: 5,
            name: 'Brighton & Hove Albion',
            shortName: 'BHR',
            clubCrest: 'bhr.png',
            goads: 0,
        },
        mainGoal: 2,
        isWon: true,
        isHomeClub: true,
    },
    {
        matchWeek: 8,
        otherClub: {
            clubId: 9,
            name: 'Fulham',
            shortName: 'FUL',
            clubCrest: 'ful.png',
            goads: 0,
        },
        mainGoal: 1,
        isWon: true,
        isHomeClub: false,
    },
    {
        matchWeek: 9,
        otherClub: {
            clubId: 7,
            name: 'Crystal Palace',
            shortName: 'CRY',
            clubCrest: 'cry.png',
            goads: 0,
        },
        mainGoal: 1,
        isWon: true,
        isHomeClub: true,
    },
    {
        matchWeek: 10,
        otherClub: {
            clubId: 18,
            name: 'Burnley F.C.',
            shortName: 'BUR',
            clubCrest: 'bunley.svg',
            goads: 0,
        },
        mainGoal: 2,
        isWon: true,
        isHomeClub: false,
    },
]);

const upcoming = ref([
    {
        matchWeek: 11,
        matchDate: '08 Nov',
        otherClub: {
            clubId: 21,
            name: 'Sunderland',
            shortName: 'SUN',
            clubCrest: 'sun.svg',
        },
        isHomeClub: false,
    },
    {
        matchWeek: 12,
        matchDate: '23 Nov',
        otherClub: {
            clubId: 23,
            name: 'Tottenham Hotspur',
            shortName: 'TOT',
            clubCrest: 'tot.svg',
        },
        isHomeClub: true,
    },
    {
        matchWeek: 13,
        matchDate: '30 Nov',
        otherClub: {
            clubId: 6,
            name: 'Chelsea',
            shortName: 'CHE',
            clubCrest: 'che.png',
        },
        isHomeClub: true,
    },
    {
        matchWeek: 14,
        matchDate: '03 Dec',
        otherClub: {
            clubId: 4,
            name: 'PRE',
            shortName: 'SUN',
            clubCrest: 'bre.png',
        },
        isHomeClub: true,
    },
    {
        matchWeek: 15,
        matchDate: '06 Dec',
        otherClub: {
            clubId: 2,
            name: 'Aston Villa',
            shortName: 'AVL',
            clubCrest: 'avl.png',
        },
        isHomeClub: false,
    },
]);

onMounted(async () =>
{
    try
    {
        const data = await playerStore.getPlayerInfoById(playerId.value);
        if (data !== null)
        {
            player.value = await data.player;
            club.value = await data.club;

            nextMatch.value.homeClub.clubId = club.value.id;
            nextMatch.value.homeClub.name = club.value.name;
            nextMatch.value.homeClub.clubCrest = club.value.clubCrest;
            teammates.value = await playerStore.getTeammatesByPlayerIdAndClubId(playerId.value, club.value.id);
        }
    } catch (error)
    {
        console.error("Fetching error:", error);
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

const scrollTeammates = (direction) =>
{
    const container = teammatesContainer.value
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
    const container = teammatesContainer.value
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    isAtStart.value = scrollLeft <= 5
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 5
}

</script>

<template>
    <div class="flex flex-1 flex-col gap-4">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div class="flex flex-wrap gap-4 h-fit">
                <BaseClubNextMatchCard :next-match="nextMatch" />
            </div>

            <div class="flex flex-wrap gap-4 h-fit">
                <!-- team form -->
                <div class="!bg-[#28002b] rounded-2xl h-[205px] w-full p-4">
                    <div class="flex justify-between">
                        <span class="font-bold text-md text-white">Team Form <el-icon>
                                <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                            </el-icon></span>
                        <div class="!bg-[#37003c] flex justify-center items-center gap-0 px-1 py-1 rounded-sm">
                            <button v-on:click="toggleMatchView('previous')"
                                :style="{ backgroundColor: isPreviousActive }"
                                class="font-bold text-xs text-white  px-3 py-2 rounded-sm cursor-pointer">Previous
                            </button>
                            <button v-on:click="toggleMatchView('upcoming')"
                                :style="{ backgroundColor: isUpcomingActive }"
                                class="font-bold text-xs text-white  px-3 py-2 rounded-sm cursor-pointer">Upcoming
                            </button>
                        </div>
                    </div>

                    <div class="flex flex-row items-center gap-2 w-2/5 justify-start">
                        <img :src="club ? apiConfig.TEAM_LOGOS_DIR + club.clubCrest : ''" alt="Opponent Logo"
                            class="h-5 w-5" />
                        <span class="text-white font-semibold text-xs text-center truncate">{{ club ?
                            club.name : '' }}</span>
                    </div>

                    <div class="flex justify-start items-center gap-2 w-full overflow-x-auto scrollbar-none">
                        <div v-if="isPrevious" class="flex flex-row gap-4 p-2">
                            <BaseTeamFormPreviousCard v-for="p in previous" :key="p.matchWeek" :previous="p" />
                        </div>

                        <div v-else class="flex flex-row gap-4 p-2">
                            <BaseTeamFormUpcomingCard v-for="u in upcoming" :key="u.matchWeek" :upcoming="u" />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-transparent w-full rounded-2xl h-75 pb-2">
            <div class="flex justify-between items-center w-full h-fit mb-2">
                <h2 class="text-white text-md font-bold mb-4">Teammates</h2>
                <div class="flex gap-2">
                    <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                        isAtStart
                            ? 'bg-[#1d001f] opacity-40'
                            : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                    ]" :disabled="isAtStart" @click="scrollTeammates('left')">
                        <el-icon>
                            <ArrowLeft class="text-white" />
                        </el-icon>
                    </button>
                    <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                        isAtEnd
                            ? 'bg-[#1d001f] opacity-40'
                            : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                    ]" :disabled="isAtEnd" @click="scrollTeammates('right')">
                        <el-icon>
                            <ArrowRight class="text-white" />
                        </el-icon>
                    </button>
                </div>
            </div>

            <div ref="teammatesContainer"
                class="flex flex-col items-start flex-wrap gap-4 overflow-x-auto scrollbar-none rounded-t-2xl w-full h-75">
                <div v-for="(player, index) in teammates" :key="index"
                    class="flex gap-2 bg-[#28002b] rounded-2xl p-3 w-[320px] h-18">
                    <div class="rounded-[14px] w-12 h-12 overflow-hidden"
                        :style="{ backgroundColor: club?.teamThemeColor }">
                        <img :src="player?.photo ? apiConfig.PLAYER_LOGOS_DIR + player?.photo : placeholder"
                            alt="Club Crest" class="w-auto h-12 object-contain mx-auto pt-1" />
                    </div>
                    <div class="flex flex-col justify-center items-start gap-1">
                        <RouterLink
                            :to="{ name: 'player-overview', params: { playerId: player.id, playerName: player.firstName.toString().toLowerCase() + '_' + player.lastName.toString().toLowerCase() } }"
                            class="md:text-sm text-xs text-white hover:underline">{{
                                player?.firstName
                            }} {{ player?.lastName }}</RouterLink>
                        <span class="tmd:text-sm text-xs text-gray-400"> {{
                            player?.playerNumber }} {{ player?.position }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex items-start flex-wrap gap-4 !bg-[#28002b] rounded-2xl h-[auto] flex-1 p-4 overflow-hidden">
            <div class="flex justify-between items-center w-full h-auto">
                <div class="flex justify-start items-center gap-2">
                    <div class="flex justify-center items-end rounded-xl w-[40px] h-[40px] p-1 overflow-hidden"
                        :style="{ backgroundColor: club?.teamThemeColor || '#37003c' }">
                        <img :src="club ? apiConfig.TEAM_LOGOS_DIR + club.clubCrest : ''" alt="Club Logo"
                            class="w-full h-full object-contain">
                    </div>
                    <span class="font-bold text-md text-white">Form the clubs</span>
                </div>
                <button class="font-bold text-xs text-white !bg-[#37003c] px-3 py-2 rounded-2xl cursor-pointer">See
                    all
                    <el-icon>
                        <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                    </el-icon>
                </button>
            </div>

            <div class="flex gap-4 w-full h-[205px] overflow-x-auto scrollbar-none">
                <div class="flex flex-col gap-2 flex-1 min-w-[370px]">
                    <div class="flex justify-center items-center rounded-2xl h-full p-4 gap-3"
                        :style="{ backgroundColor: club?.teamThemeColor || '#37003c' }">
                        <img :src="club ? apiConfig.TEAM_LOGOS_DIR + club.clubCrest : ''" alt=""
                            class="w-auto h-23 object-cover">
                    </div>
                    <span class="text-sm text-white font-bold">
                        Rice score anm Madueke assists in England win
                    </span>
                </div>

                <div class="flex flex-col gap-2 flex-1 min-w-[370px]">
                    <div class="flex justify-center items-center rounded-2xl h-full p-4 gap-3"
                        :style="{ backgroundColor: club?.teamThemeColor || '#37003c' }">
                        <img :src="club ? apiConfig.TEAM_LOGOS_DIR + club.clubCrest : ''" alt=""
                            class="w-auto h-23 object-cover">
                    </div>
                    <span class="text-sm text-white font-bold">
                        41 photos from our 4-1 win over London city
                    </span>
                </div>

                <div class="flex flex-col gap-2 flex-1 min-w-[370px]">
                    <div class="flex justify-center items-center rounded-2xl h-full p-4 gap-3"
                        :style="{ backgroundColor: club?.teamThemeColor || '#37003c' }">
                        <img :src="club ? apiConfig.TEAM_LOGOS_DIR + club.clubCrest : ''" alt=""
                            class="w-auto h-23 object-cover">
                    </div>
                    <span class="text-sm text-white font-bold">
                        Renee Reflects on opening day win
                    </span>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-start gap-2 !bg-[#28002b] rounded-2xl p-4">
            <div v-for="app in PLApps" :key="app.id"
                class="flex justify-between items-center w-full px-3 py-2 rounded-xl hover:!bg-[#37003c]">
                <span class="font-bold text-md text-white">{{ app.title }}</span>
                <el-icon>
                    <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                </el-icon>
            </div>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>