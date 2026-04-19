<script setup>
import { ref, onMounted } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import { useMatchStore } from '@/stores';
import { useApiConfig } from '@/stores/apiConfig';
import
{
    Plus,
} from '@element-plus/icons-vue';

const matchStore = useMatchStore();
const apiConfig = useApiConfig();
const route = useRoute();
const matchId = ref(route.params.matchId);
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

const matchInfo = ref(null);


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

    try
    {
        await matchStore.getMatchInfoDetail({ matchId: matchId.value });
        matchInfo.value = matchStore.matchInfoDetail.matchInfo;

    } catch (error)
    {
        console.error(error);
    }
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
                            :style="{ backgroundColor: matchInfo?.homeClubTheme || '#730a7a' }">
                            <img :src="matchInfo?.homeClubCrest" class="w-auto h-14 md:h-16 object-contain"
                                loading="lazy" />
                            <span class="text-white text-lg font-bold truncate text-center">{{ matchInfo?.homeClubName
                                }}</span>
                        </div>

                        <div class="flex flex-col justify-center items-center gap-1 p-4"
                            :style="{ backgroundColor: matchInfo?.awayClubTheme || '#5b0f5b' }">
                            <img :src="matchInfo?.awayClubCrest" class="w-auto h-14 md:h-16 object-contain"
                                loading="lazy" />
                            <span class="text-white text-lg font-bold truncate text-center">{{ matchInfo?.awayClubName
                                }}</span>
                        </div>

                        <div v-if="matchInfo?.kickoffStatusDisplay === 'FT'"
                            class="absolute left-1/2 top-[13.5%] transform -translate-x-1/2 -translate-y-1/2 bg-[#41054b] rounded-2xl w-28 h-18 flex flex-col items-center justify-center z-20">
                            <span class="text-white text-3xl font-bold">{{ matchInfo?.homeClubGoal }} - {{
                                matchInfo?.awayClubGoal }}</span>
                            <span class="text-white text-sm font-bold">FT</span>
                        </div>

                        <div v-else-if="matchInfo?.kickoffStatusDisplay === 'Live' || matchInfo?.kickoffStatusDisplay === 'HT'"
                            class="absolute left-1/2 top-[13.5%] transform -translate-x-1/2 -translate-y-1/2 bg-[#41054b] rounded-2xl px-3 py-2 z-20 flex flex-col items-center justify-center min-w-[112px]">
                            <span class="text-white text-3xl font-bold">{{ matchInfo?.homeClubGoal }} - {{
                                matchInfo?.awayClubGoal }}</span>
                            <span class="text-sm font-bold text-red-500 animate-pulse">
                                {{ matchInfo?.kickoffStatusDisplay }}
                            </span>
                        </div>

                        <div v-else-if="matchInfo?.kickoffStatusDisplay === 'Upcoming'"
                            class="absolute left-1/2 top-[16.5%] transform -translate-x-1/2 -translate-y-1/2 bg-[#41054b] rounded-2xl px-4 py-2 z-20">
                            <span class="text-white text-3xl font-bold">{{ matchInfo?.kickoffTime }}</span>
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
                                    <i class="fa-solid fa-futbol text-white text-sm"></i>
                                </div>

                                <div class="flex flex-col gap-1">
                                    <span v-for="goal in awayGoals" :key="'a-' + goal.id"
                                        class="text-white text-xs lg:text-sm truncate">
                                        {{ goal.playerName }} <span class="text-gray-300">({{ goal.minute }})</span>
                                    </span>
                                </div>
                            </div>

                            <!-- add button -->
                            <div v-if="matchInfo?.kickoffStatusDisplay === 'FT' || matchInfo?.kickoffStatusDisplay === 'HT'"
                                class="flex justify-center items-center">
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
                                        <div class="flex gap-2 items-center">
                                            <span class="text-white/60 text-xs lg:text-sm">{{ matchInfo?.competition
                                            }}</span>
                                            <span class="text-white/60 text-2xl font-bold"> • </span>
                                            <span class="text-white/60 text-xs lg:text-sm"> {{ matchInfo?.matchweek
                                            }}</span>
                                        </div>
                                        <div
                                            class="text-white/60 text-xs lg:text-sm text-wrap whitespace-nowrap text-center flex items-center h-auto gap-2">
                                            {{ matchInfo?.matchDate }} <span class="text-white/60 text-2xl font-bold"> •
                                            </span> {{ matchInfo?.stadium }} <span
                                                class="text-white/60 text-2xl font-bold"> • </span>
                                            <span class="inline-flex items-center">
                                                <img :src="refereeWhistleIcon" alt="whistle"
                                                    class="w-auto h-3 object-contain inline-block" />
                                            </span>
                                            <span class="mr-2">{{ matchInfo?.referee }}</span>
                                        </div>
                                        <span class="text-white/60 text-xs text-center w-full"> {{ matchInfo?.matchInfo
                                        }}</span>
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