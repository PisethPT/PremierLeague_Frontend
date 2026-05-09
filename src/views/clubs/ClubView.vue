<script setup>
import { ref, onMounted, onUpdated, computed } from 'vue';
import ClubCard from '@/components/ClubCard.vue';
import PageTitleBase from '@/components/PageTitleBase.vue';
import { useClubStore } from '@/stores/clubStore';
import { ElMessage } from 'element-plus';
import
{
    ArrowRightBold,
    Edit,
} from '@element-plus/icons-vue'
import SponsorBar from '@/components/SponsorBar.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import sponsorImage from '@/assets/sponsors/9044630324637544770.png';
import { useApi } from '@/stores/api';

const apiConfig = useApi();
const title = ref('Clubs');
const clubStore = useClubStore();
const TEAM_LOGO_DIR = ref('');
const query = ref('');
const loading = ref(false);

const filters = ref([
    {
        id: 1,
        label: '2025/26',
        tag: 'seasons',
    },
]);


onMounted(async () =>
{
    try
    {
        await clubStore.getSeasonClubs({ season: '4' });
        await clubStore.getAllTimePremierLeagueClubs();
    } catch (error)
    {
        console.log('error: ' + error);
        ElMessage.error('error on mount: ' + error);
    } finally
    {
        loading.value = false;
    }
});

// const clubs = computed(() => clubStore.searchClubs(query.value));
</script>

<template>
    <div class="content-center">
        <!-- sponsor bar -->
        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />

        <!-- page title -->
        <PageTitleBase :title="title" />

        <BaseFilter :isReset="true" :filters="filters" />

        <h1 class="m-3 font-bold text-2xl text-white">2025/26 Season Clubs</h1>
        <div class="flex justify-center w-full flex-wrap grid-cols-5 gap-3 mt-2">
            <div v-for="club in clubStore.seasonClubs" :key="club.clubId">
                <ClubCard :club="club"></ClubCard>
            </div>
        </div>
    </div>

    <div class="content-center">

        <h1 class="m-3 font-bold text-2xl text-white">All-time Premier League Clubs</h1>
        <el-card
            class="!bg-gradient-to-br from-[#28002b] to-[#330d36] !rounded-2xl !border-0 mb-4 mx-3 custom-card overflow-hidden">
            <template #header>
                <div class="flex items-center justify-between">
                    <h2 class="text-white font-bold text-sm w-1/3">Clubs</h2>
                    <div class="flex justify-between w-1/3">
                        <h2 class="text-white font-bold text-sm w-1/3">Stadium</h2>
                        <h2 class="text-white font-bold text-sm w-1/3">Website</h2>
                        <h2 class="text-white font-bold text-sm w-1/3">Follow</h2>
                    </div>
                </div>
            </template>

            <div class="divide-y divide-[#4b1254]">
                <div v-for="club in clubStore.allTimePremierLeagueClubs" :key="club.clubId"
                    class="flex items-center justify-between py-3 px-2 transition">
                    <div class="flex items-center gap-2 w-1/3">
                        <div class="flex justify-center items-center rounded-[14px] px-[2px] w-14 h-12"
                            :style="{ backgroundColor: club.clubTheme }">
                            <img :src="apiConfig.CLUB_DIR + club.clubCrest" alt="Club Crest"
                                class="w-auto h-11 p-1 object-contain mx-auto" />
                        </div>
                        <router-link class="flex gap-2 items-center w-full"
                            :to="{ name: 'clubs-overview', params: { clubId: club.clubId, clubName: club.clubName.toLowerCase().replace(/\s+/g, '-') } }">
                            <h3
                                class="text-md font-bold text-center text-white text-wrap hover:underline hover:cursor-pointer">
                                {{ club.clubName }}</h3>
                            <el-icon>
                                <ArrowRightBold class="text-white text-xs " />
                            </el-icon>
                        </router-link>
                    </div>
                    <div class="flex w-1/3 gap-4 float-end">
                        <span class="text-white w-1/3 text-xs">{{ club.clubStadium }}</span>
                        <div class="text-white w-1/3">
                            <a v-if="club.clubOfficialWebsite !== ''" :href="club.clubOfficialWebsite" target="_blank"
                                class="text-xs border-1 text-white rounded-3xl py-2 px-6 hover:bg-white hover:text-black w-full text-center hover:cursor-pointer">
                                Visit website
                                <el-icon>
                                    <Edit />
                                </el-icon>
                            </a>
                        </div>
                        <div class="text-white w-1/3">
                            <a :href="club.clubOfficialWebsite" target="_blank"
                                class="text-xs border-1 text-white rounded-3xl py-2 px-6 hover:bg-white hover:text-black w-full text-center hover:cursor-pointer">
                                Follow
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
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
</style>