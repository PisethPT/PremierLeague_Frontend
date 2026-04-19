<script setup>
import { ref, onMounted } from 'vue';
import { usePlayerStore, useSelectListItemStore } from '@/stores';
import nationalityData from '@/assets/nationality.json';
import { ElMessage } from 'element-plus';
import BasePlayerCard from '@/components/BasePlayerCard.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import SponsorBar from '@/components/SponsorBar.vue';
import
{
    ArrowLeft,
    ArrowRight
} from '@element-plus/icons-vue';

const title = ref('Players');
const playersStore = usePlayerStore();
const selectListItemStore = useSelectListItemStore();

const query = ref(null);
const search = ref(null);
const nextPage = ref(1);
const minPage = ref(1);
const maxPage = ref(10);
const loading = ref(false);
const drawer = ref(false);
const drawerTitle = ref('');
const sponsorImage = ref('/src/assets/sponsors/PL2526-ClubKits-Referral-Promos-_0000s_0000_ARS.webp');
const activeFilterId = ref(null);

const selectedCompetition = ref(1);
const selectedSeason = ref('2025/26');
const selectedClubs = ref([]);
const selectedPositions = ref([]);

const selectListItemClubs = ref([]);

const isFilters = {
    isFilter: false,
    isCompetition: false,
    isSeason: false,
    isPosition: false,
    isClub: false,
}

const competitions = ref([
    {
        competition: 1,
        name: 'Premier League',
    },
    {
        competition: 2,
        name: 'UEFA Champions League',
    },
    {
        competition: 3,
        name: 'UEFA Europa League',
    },
    {
        competition: 4,
        name: 'UEFA Conference League',
    },
    {
        competition: 5,
        name: 'FA Cup',
    },
    {
        competition: 6,
        name: 'EFL Cup',
    },
    {
        competition: 7,
        name: 'Summer Series',
    },
    {
        competition: 8,
        name: 'Premier League 2',
    },
    {
        competition: 9,
        name: 'Premier League Cup',
    },
    {
        competition: 10,
        name: 'Premier League International Cup',
    },
    {
        competition: 11,
        name: 'Professional Development League',
    },
    {
        competition: 12,
        name: 'Vertu Trophy',
    },
    {
        competition: 13,
        name: 'National League Cup',
    },
    {
        competition: 14,
        name: 'U18 Premier League',
    },
    {
        competition: 15,
        name: 'U18 Professional Development League Cup',
    },
    {
        competition: 16,
        name: 'U17 Premier League Cup',
    },
    {
        competition: 17,
        name: 'U17 Professional Development League Cup',
    },
]);

// const handleSeason = (filter) =>
// {
//     handleFilter(filter, "Seasons");
// };

// const handleClub = (filter) =>
// {
//     alert(JSON.stringify(filter));
//     handleFilter(filter, "Clubs");
// };

// const handlePosition = (filter) =>
// {
//     handleFilter(filter, "Positions");
// };


// const filters = ref([
//     { id: 1, label: '2025/26', tag: 'seasons', func: handleSeason },
//     { id: 2, label: 'Clubs', tag: 'clubs', func: handleClub },
//     { id: 3, label: 'Positions', tag: 'positions', func: handlePosition },
// ]);
const filters = ref([
    { id: 1, label: 'Premier League', tag: 'Competition', condition: 'isCompetition' },
    { id: 2, label: '2025/26', tag: 'Seasons', condition: 'isSeason' },
    { id: 3, label: 'Clubs', tag: 'Clubs', condition: 'isClub' },
    { id: 4, label: 'Positions', tag: 'Positions', condition: 'isPosition' },
]);


const handleFilterClick = (filter) =>
{
    activeFilterId.value = filter.id;
    handleFilter(filter.condition, filter.tag);
    drawer.value = true;
};

const handleReset = () =>
{
    search.value = '';
    activeFilterId.value = null;
};

const handleOpenPanel = () =>
{
    drawer.value = true;
    handleFilter("isFilter", "Filters");
};

const handleFilter = (filterKey, label) =>
{
    drawerTitle.value = label;
    Object.keys(isFilters).forEach(key =>
    {
        isFilters[key] = false;
    });
    if (filterKey in isFilters)
    {
        isFilters[filterKey] = true;
    }
};

onMounted(async () =>
{
    window.scrollTo(0, 0);
    query.value = {
        page: 1,
        pageSize: 20,
        competition: 8,
        season: 4,
        clubs: [],
        positions: []
    };
    await loadData(query.value);
    selectListItemClubs.value = await selectListItemStore.selectListItems(selectListItemStore.api.ENDPOINTS.SELECT_LIST_ITEMS_ENDPOINTS.SELECT_LIST_ITEM_CLUBS);
});

const nextPlayer = async () =>
{
    query.value = {
        page: nextPage.value,
        pageSize: 20,
        competition: 8,
        season: 4,
        clubs: [],
        positions: []
    };
    await loadData(query.value);
}

const loadData = async (query) =>
{
    window.scrollTo(0, 0);
    try
    {
        await playersStore.getPlayers(query);
    } catch (error)
    {
        console.log('error: ' + error);
        ElMessage.error('error on mount: ' + error);
    } finally
    {
        loading.value = false;
    }
};

</script>

<template>
    <div class="content-center">
        <!-- sponsor bar -->
        <SponsorBar :sponsorImage="sponsorImage" />
        <h1
            class="text-white text-5xl font-bold !bg-gradient-to-r from-[#943bff] to-[#25f1ff] px-4 py-4 mx-3 my-6 rounded-t-2xl sm:rounded-2xl md:rounded-2xl xl:rounded-2xl">
            {{ title }}
        </h1>

        <BaseFilter class="!mt-10" :is-search="true" v-model:query="search" :is-reset="true" :filters="filters"
            v-model:activeFilterId="activeFilterId" @filter-click="handleFilterClick" @reset="handleReset"
            @open-filter-panel="handleOpenPanel" />
        <el-card
            class="!bg-gradient-to-br from-[#28002b] to-[#330d36] !rounded-2xl !border-0 mb-4 mx-3 custom-card overflow-hidden">
            <template #header>
                <div class="flex items-center justify-between">
                    <div class="flex justify-between w-2/4">
                        <h2 class="text-white font-bold text-sm w-1/2">Players</h2>

                        <div class="flex justify-evenly gap-2 ml-[60px] w-4/3">
                            <h2 class="text-white font-bold text-sm">Clubs</h2>
                            <h2 class="text-white font-bold text-sm ml-5">Position</h2>
                            <h2 class="text-white font-bold text-sm">Nationality</h2>
                        </div>
                    </div>
                    <div class="w-1/4 flex justify-end mr-[50px]">
                        <h2 class="text-white font-bold text-sm ">Follow</h2>
                    </div>
                </div>
            </template>

            <div class="divide-y divide-[#4b1254]">
                <div v-for="player in playersStore.players" :key="player.playerId"
                    class="flex items-center justify-between py-3 px-2 transition">
                    <div class="flex justify-between w-2/4">
                        <BasePlayerCard :player="player" />

                        <div class="flex justify-evenly w-2/3">
                            <div class="w-1/3 flex gap-2 items-center">
                                <div class="text-center">
                                    <img :src="player.clubCrest" alt="" class="w-7 h-7 object-contain mx-auto">
                                </div>
                                <RouterLink
                                    :to="{ name: 'clubs-overview', params: { clubId: player.clubId, clubName: player.clubName.toLowerCase().replace(/\s+/g, '-') } }">
                                    <span class="text-white text-xs text-center hover:underline hover:cursor-pointer">{{
                                        player.clubName }}</span>
                                </RouterLink>
                            </div>
                            <div class="w-1/3 flex items-center">
                                <span class="text-white text-xs text-end">{{ player.position }}</span>
                            </div>
                            <div class="flex items-center gap-2 w-1/3">
                                <div class="text-center">
                                    <img v-if="player.nationality"
                                        :src="nationalityData.nationalities.find((nation) => nation.nationality === player.nationality || nation.name === player.nationality)?.icon"
                                        :alt="player.nationality" class="w-7 h-7 object-contain mx-auto">
                                </div>
                                <span class="text-white text-xs text-center">{{ nationalityData.nationalities.find((nation) => nation.nationality === player.nationality || nation.name === player.nationality)?.name }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="w-1/4 flex justify-end">
                        <a target="_blank"
                            class=" text-xs border-1 text-white rounded-3xl py-2 px-6 hover:bg-white hover:text-black text-center hover:cursor-pointer">
                            Follow
                        </a>
                    </div>
                </div>
            </div>

            <div class="flex justify-end items-center mt-2">
                <div class="flex justify-center items-center gap-3">
                    <button @click="nextPage > minPage && (nextPage -= 1, nextPlayer())" :disabled="nextPage <= minPage"
                        class="flex items-center justify-center rounded-full w-10 h-10"
                        :class="[nextPage <= minPage ? 'bg-[#41054b] opacity-40' : 'bg-[#41054b] hover:bg-[#410544] cursor-pointer']">
                        <el-icon>
                            <ArrowLeft class="text-white" />
                        </el-icon>
                    </button>
                    <button @click="nextPage < maxPage && (nextPage += 1, nextPlayer())" :disabled="nextPage >= maxPage"
                        class="flex items-center justify-center rounded-full w-10 h-10"
                        :class="[nextPage >= maxPage ? 'bg-[#41054b] opacity-40' : 'bg-[#41054b] hover:bg-[#410544] cursor-pointer']">
                        <el-icon>
                            <ArrowRight class="text-white" />
                        </el-icon>
                    </button>
                </div>
            </div>
        </el-card>
    </div>

    <el-drawer v-model="drawer" class="!bg-[#1a011d] !scrollbar-none" :size="'20%'">
        <template #header>
            <div v-if="!isFilters.isFilter" @click="handleFilter('isFilter', 'Filters')" class="flex justify-start">
                <button class="w-5 text-gray-500 hover:text-[#943bff] cursor-pointer">
                    <i class="fa-solid fa-arrow-left"></i>
                </button>
            </div>
        </template>
        <template #default class="!scrollbar-none">
            <div class="flex justify-between w-full -mt-5">
                <h4 class="text-white font-bold text-2xl">{{ drawerTitle }}</h4>
                <button v-if="isFilters.isFilter" @click="handleReset"
                    class="flex justify-center items-center gap-1 text-white text-center text-sm w-fit px-3 py-2 rounded-2xl bg-[#290d2c] text-nowrap  cursor-pointer">
                    Reset
                    <i class="fa-solid fa-arrow-rotate-left"></i>
                </button>
            </div>

            <div v-if="isFilters.isFilter" class="flex flex-col gap-4 mt-15">
                <div class="flex flex-col gap-3">
                    <div class="flex justify-between">
                        <span class="text-white text-lg">Competitions</span>
                        <i @click="handleFilter('isCompetition', 'Competitions')"
                            class="fa-solid fa-chevron-right text-white text-md cursor-pointer"></i>
                    </div>
                    <div @click="handleFilter('isCompetition', 'Competitions')"
                        class="flex justify-center items-center gap-1 w-fit text-white text-center text-sm px-3 py-2 rounded-[10px] border border-[#624d64] hover:bg-[#654c6818] cursor-pointer">
                        Premier League
                    </div>
                    <div class="border-[#37003c] border-b-2 mt-4"></div>
                </div>

                <div class="flex flex-col gap-3 mt-2">
                    <div id="showSessionDrawer" class="flex justify-between cursor-pointer">
                        <span class="text-white text-md">Sessions</span>
                        <i @click="handleFilter('isSeason', 'Seasons')"
                            class="fa-solid fa-chevron-right text-white text-md"></i>
                    </div>
                    <div @click="handleFilter('isSeason', 'Seasons')"
                        class="flex justify-center items-center gap-1 w-fit text-white text-center text-sm px-3 py-2 rounded-[10px] border border-[#624d64] hover:bg-[#654c6818] cursor-pointer">
                        2025/26
                    </div>
                    <div class="border-[#37003c] border-b-2 mt-4"></div>
                </div>

                <div class="flex flex-col gap-3 mt-2">
                    <div @click="handleFilter('isClub', 'Clubs')" class="flex justify-between cursor-pointer">
                        <span class="text-white text-md ">Clubs</span>
                        <i class="fa-solid fa-chevron-right text-white text-md"></i>
                    </div>
                    <div class="border-[#37003c] border-b-2 mt-4"></div>
                </div>

                <div class="flex flex-col gap-3 mt-2">
                    <div @click="handleFilter('isPosition', 'Positions')" class="flex justify-between cursor-pointer">
                        <span class="text-white text-md ">Positions</span>
                        <i class="fa-solid fa-chevron-right text-white text-md"></i>
                    </div>
                </div>
            </div>

            <div v-else class="flex flex-col h-[98%]">
                <div v-if="isFilters.isCompetition" class="flex-1 overflow-y-auto py-6 pr-6">
                    <ul class="space-y-6">
                        <li v-for="com in competitions" :key="com.competition"
                            class="flex items-center justify-between cursor-pointer"
                            @click="selectedCompetition = com.competition">
                            <span class="text-white text-md font-medium">{{ com.name }}</span>
                            <input type="radio" name="competition" :value="com.competition"
                                v-model="selectedCompetition" class="w-5 h-5 accent-white cursor-pointer">
                        </li>
                    </ul>
                </div>

                <div v-if="isFilters.isSeason" class="flex-1 overflow-y-auto py-6 pr-6">
                    <ul class="space-y-6">
                        <li v-for="year in ['2025/26', '2024/25', '2023/24', '2022/23', '2021/22', '2020/21', '2019/20', '2018/19', '2017/18', '2016/17', '2015/16', '2014/15', '2013/14', '2012/13', '2011/12', '2010/11', '2009/10', '2008/09']"
                            :key="year" class="flex items-center justify-between cursor-pointer"
                            @click="selectedSeason = year">
                            <span class="text-white text-md font-medium">{{ year }}</span>
                            <input type="radio" name="season" :value="year" v-model="selectedSeason"
                                class="w-5 h-5 accent-white cursor-pointer">
                        </li>
                    </ul>
                </div>

                <div v-else-if="isFilters.isClub" class="flex-1 space-y-6 overflow-y-auto py-6 pr-6">
                    <label v-for="club in selectListItemClubs" :key="club.clubId"
                        class="flex items-center justify-between cursor-pointer">
                        <div class="flex items-center gap-2">
                            <div class="flex justify-center items-center">
                                <div class="flex justify-center items-center w-12 h-12 shadow rounded-2xl overflow-hidden"
                                    :style="{ backgroundColor: club.clubTheme }">
                                    <img :src="club.clubCrest" class="w-auto h-10 object-contain cursor-pointer" />
                                </div>
                            </div>
                            <span class="text-white text-md font-medium">{{ club.clubName }}</span>
                        </div>
                        <input type="checkbox" :value="club.clubId" name="clubIds"
                            class="w-5 h-5 rounded border-white bg-transparent checked:bg-white checked:border-white accent-white">
                    </label>
                </div>

                <div v-else-if="isFilters.isPosition" class="flex-1 space-y-6 overflow-y-auto py-6 pr-6">
                    <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-white text-md font-medium">Goalkeeper</span>
                        <input type="checkbox" name="positions" value="0"
                            class="w-5 h-5 rounded border-white bg-transparent accent-white">
                    </label>

                    <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-white text-md font-medium">Defender</span>
                        <input type="checkbox" name="positions" value="1"
                            class="w-5 h-5 rounded border-white bg-transparent accent-white">
                    </label>

                    <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-white text-md font-medium">Midfielder</span>
                        <input type="checkbox" name="positions" value="2"
                            class="w-5 h-5 rounded border-white bg-transparent accent-white">
                    </label>

                    <label class="flex items-center justify-between cursor-pointer">
                        <span class="text-white text-md font-medium">Forward</span>
                        <input type="checkbox" name="positions" value="3"
                            class="w-5 h-5 rounded border-white bg-transparent accent-white">
                    </label>
                </div>

                <div class="p-4 bg-[#28002b] rounded-2xl mt-5">
                    <button @click="handleSaveFilter"
                        class="bg-white hover:bg-gray-200 transition text-sm text-[#1e0021] text-center w-full py-2 rounded-3xl cursor-pointer">
                        Save
                    </button>
                </div>
            </div>
        </template>
    </el-drawer>
</template>


<style scoped>
html,
body {
    background: #1e0021 !important;
}

.custom-card :deep(.el-card__header) {
    border-bottom: none !important;
}

.custom-card :deep(.el-card__body) {
    padding-top: 0 !important;
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>