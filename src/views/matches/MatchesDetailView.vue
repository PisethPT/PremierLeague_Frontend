<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useApiConfig } from '@/stores/apiConfig';
import
{
    Plus,
} from '@element-plus/icons-vue';

const apiConfig = useApiConfig();
const route = useRoute();
const menuActive = ref('Recap');
const menuItems = ref([
    { name: 'Recap', route: 'match-tab-recap', query: 'recap' },
    { name: 'Highlights', route: 'match-tab-highlights', query: 'highlights' },
    { name: 'Lineups', route: 'match-tab-lineups', query: 'lineups' },
    { name: 'Stats', route: 'match-tab-stats', query: 'stats' },
    { name: 'Table', route: 'match-tab-table', query: 'table' },
    { name: 'Commentary', route: 'match-tab-commentary', query: 'commentary' },
    { name: 'Match Info', route: 'match-tab-match-info', query: 'match-info' },
]);
const soccerIcon = ref('/src/assets/resources/soccer_icon.png');
const refereeWhistleIcon = ref('/src/assets/resources/referee_whistle_icon.png');
const matchStoryCoverUrl = ref('/src/assets/matches_stories/tot_vs_menu.jpg');

const matchInfo = ref({
    matchId: 1,
    kickoffTime: '22:00',
    isPreview: false,
    isFullTime: true,
    HT: '0-1',
    FT: '2-2',
    homeClub: {
        id: 1,
        clubName: 'Spurs',
        clubCrest: 'tot.svg',
        clubTheme: '#000a3c',
    },
    awayClub: {
        id: 2,
        clubName: 'Man Utd',
        clubCrest: 'menu.svg',
        clubTheme: '#b90006',
    },
    matchWeek: '11',
    matchDate: 'Sat 08 Nov',
    kickoffStadium: 'Tottenham Hotspur Stadium',
    kickoffCoach: 'Samuel Barrott',
    matchClubs: 'Tottenham Hotspur vs Manchester United',
    matchOnSeason: '2025/2026',
    league: 'Premier League',
    matchStory: 'TOT 2-2 MUN'
});

const homeGoals = ref([
    {
        playerName: 'Tel',
        minute: '84\'',
    },
    {
        playerName: 'Richarlison',
        minute: '90\'+1\'',
    },
]);

const awayGoals = ref([
    {
        playerName: 'Mbeumo',
        minute: '54\'',
    },
    {
        playerName: 'de Ligt',
        minute: '90\'+6\'',
    },
]);
onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });
    router.push({ name: 'match-tab-recap', params: { matchId: route.params.matchId, matchTitle: route.params.matchTitle }, query: { tab: 'recap' } });
});
</script>

<template>
    <div class="content-center">
        <div
            class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[33.33%_1fr] gap-4 py-4 px-3">
            <div class="flex flex-col gap-4 w-full">
                <div class="bg-[#28002b] rounded-2xl w-full overflow-hidden relative">
                    <div class="bg-[#730a7a] grid grid-cols-2 items-center">
                        <div class="flex flex-col justify-center items-center gap-1 p-4"
                            :style="{ backgroundColor: matchInfo?.homeClub?.clubTheme || '#730a7a' }">
                            <img :src="apiConfig.TEAM_LOGOS_DIR + (matchInfo?.homeClub?.clubCrest || '')"
                                :alt="matchInfo?.homeClub?.clubName || 'Home club logo'"
                                class="w-auto h-14 md:h-16 object-contain" loading="lazy" />
                            <span class="text-white text-lg font-bold truncate text-center">{{
                                matchInfo?.homeClub?.clubName }}</span>
                        </div>

                        <div class="flex flex-col justify-center items-center gap-1 p-4"
                            :style="{ backgroundColor: matchInfo?.awayClub?.clubTheme || '#5b0f5b' }">
                            <img :src="apiConfig.TEAM_LOGOS_DIR + (matchInfo?.awayClub?.clubCrest || '')"
                                :alt="matchInfo?.awayClub?.clubName || 'Away club logo'"
                                class="w-auto h-14 md:h-16 object-contain" loading="lazy" />
                            <span class="text-white text-lg font-bold truncate text-center">{{
                                matchInfo?.awayClub?.clubName }}</span>
                        </div>

                        <div v-if="!matchInfo?.isPreview && matchInfo?.isFullTime"
                            class="absolute left-1/2 top-[13.5%] transform -translate-x-1/2 -translate-y-1/2 bg-[#41054b] rounded-2xl w-28 h-18 flex flex-col items-center justify-center z-20">
                            <span class="text-white text-3xl font-bold">{{ matchInfo.FT }}</span>
                            <span class="text-white text-sm font-bold">HT {{ matchInfo.HT }}</span>
                        </div>

                        <div v-else-if="!matchInfo?.isPreview && !matchInfo?.isFullTime"
                            class="absolute left-1/2 top-[13.5%] transform -translate-x-1/2 -translate-y-1/2 bg-[#41054b] rounded-2xl px-3 py-2 z-20">
                            <span class="text-white text-3xl font-bold">{{ matchInfo.HT }}</span>
                            <span class="text-white text-sm font-bold">HT</span>
                        </div>

                        <div v-else-if="matchInfo?.isPreview"
                            class="absolute left-1/2 top-[16.5%] transform -translate-x-1/2 -translate-y-1/2 bg-[#41054b] rounded-2xl px-3 py-2 z-20">
                            <span class="text-white text-3xl font-bold">{{ matchInfo.kickoffTime }}</span>
                        </div>
                    </div>

                    <div class="bg-[#28002b] rounded-t-2xl rounded-b-2xl p-4 z-10 relative -mt-3">
                        <div class="flex flex-col gap-3 w-full">
                            <!-- goals area -->
                            <div v-if="!matchInfo?.isPreview" class="grid grid-cols-[1fr_50px_1fr] gap-2 w-full">
                                <div class="flex flex-col gap-1 items-end">
                                    <span v-for="goal in homeGoals" :key="'h-' + goal.id"
                                        class="text-white text-xs lg:text-sm truncate">
                                        {{ goal.playerName }} <span class="text-gray-300">({{ goal.minute }})</span>
                                    </span>
                                </div>

                                <div class="flex justify-center items-start">
                                    <img :src="soccerIcon" alt="goal icon" class="w-auto h-3 lg:h-4 object-contain" />
                                </div>

                                <div class="flex flex-col gap-1">
                                    <span v-for="goal in awayGoals" :key="'a-' + goal.id"
                                        class="text-white text-xs lg:text-sm truncate">
                                        {{ goal.playerName }} <span class="text-gray-300">({{ goal.minute }})</span>
                                    </span>
                                </div>
                            </div>

                            <!-- add button -->
                            <div v-if="!matchInfo?.isPreview" class="flex justify-center items-center">
                                <button
                                    class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8 hover:bg-[#55005a] hover:cursor-pointer focus:outline-none"
                                    aria-label="Add">
                                    <el-icon>
                                        <Plus class="text-white" />
                                    </el-icon>
                                </button>
                            </div>

                            <!-- meta text -->
                            <div class="flex justify-center items-center">
                                <div class="text-gray-500 w-full">
                                    <div class="flex flex-col items-center">
                                        <span class="text-gray-400 text-xs lg:text-sm">Matchweek {{ matchInfo?.matchWeek
                                        }}</span>
                                        <div
                                            class="text-gray-400 text-xs lg:text-sm text-wrap whitespace-nowrap text-center flex items-center h-auto gap-2">
                                            {{ matchInfo?.matchDate || 'TBD' }} • {{ matchInfo?.kickoffStadium ||
                                                'Stadium' }} •
                                            <span class="inline-flex items-center">
                                                <img :src="refereeWhistleIcon" alt="whistle"
                                                    class="w-auto h-3 object-contain inline-block" />
                                            </span>
                                            <span class="mr-2">{{ matchInfo?.kickoffCoach || '' }}</span>
                                        </div>
                                        <span class="text-gray-400 text-xs text-center w-full">
                                            {{ matchInfo?.matchClubs || '' }} | Season {{ matchInfo?.matchOnSeason }} |
                                            {{ matchInfo?.league }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- center badge / match story 'truncate'-->
                        <div class="flex flex-col justify-center items-center gap-2 mt-4">
                            <div
                                class="bg-[#6b24ad] flex justify-center items-center w-19 h-19 rounded-full overflow-hidden cursor-pointer">
                                <div
                                    class="flex justify-center items-center w-18 h-18 rounded-full border-2 border-black overflow-hidden">
                                    <img :src="matchStoryCoverUrl" alt="Match story cover"
                                        class="w-auto h-full object-contain" loading="lazy" />
                                </div>
                            </div>
                            <span class="text-white text-xs lg:text-sm font-bold w-20 text-center text-wrap">{{
                                matchInfo?.matchStory }}</span>
                        </div>
                    </div>
                </div>

                <button class="bg-[#41054b] text-xs text-white rounded-2xl w-full h-8 hover:bg-[#41054ba2]">
                    All Matches
                </button>
            </div>

            <div class="flex flex-1 flex-col gap-4">
                <div class="pt-2 pe-2 flex gap-4 overflow-x-auto scrollbar-none">
                    <div v-for="menu in menuItems" :key="menu.name"
                        class="text-white text-sm pb-1 border-b-4 hover:cursor-pointer whitespace-nowrap"
                        :style="menuActive == menu.name ? { borderBottom: '4px solid white', fontWeight: 'bold' } : { borderBottom: '4px solid transparent', fontWeight: 'normal' }">
                        <router-link
                            :to="{ name: menu.route, params: { matchId: route.params.matchId, matchTitle: route.params.matchTitle }, query: { tab: menu.query } }"
                            @click="menuActive = menu.name">{{ menu.name
                            }}</router-link>
                    </div>
                </div>

                <section class="flex flex-1 flex-col gap-4 h-auto">
                    <RouterView />
                </section>

            </div>
        </div>
    </div>
</template>