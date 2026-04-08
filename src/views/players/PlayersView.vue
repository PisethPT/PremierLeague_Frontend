<script setup>
import { ref, onMounted } from 'vue';
import { usePlayerStore } from '@/stores';
import nationalityData from '@/assets/nationality.json';
import { ElMessage } from 'element-plus';
import BasePlayerCard from '@/components/BasePlayerCard.vue';
import BaseFilter from '@/components/BaseFilter.vue';
import SponsorBar from '@/components/SponsorBar.vue';

const title = ref('Players');
const playersStore = usePlayerStore();
const players = ref([]);
const query = ref('');
const loading = ref(false);
const sponsorImage = ref('/src/assets/sponsors/PL2526-ClubKits-Referral-Promos-_0000s_0000_ARS.webp');
const filters = ref([
    {
        id: 1,
        label: '2025/26',
        tag: 'seasons',
    },
    {
        id: 2,
        label: 'Clubs',
        tag: 'clubs',
    },
    {
        id: 3,
        label: 'Positions',
        tag: 'positions',
    },
]);

onMounted(async () =>
{
    try
    {
        await playersStore.getPlayers();
        players.value = playersStore.players;
    } catch (error)
    {
        console.log('error: ' + error);
        ElMessage.error('error on mount: ' + error);
    } finally
    {
        loading.value = false;
    }
});

</script>

<template>
    <div class="content-center">
        <!-- sponsor bar -->
        <SponsorBar :sponsorImage="sponsorImage" />
        <h1
            class="text-white text-5xl font-bold !bg-gradient-to-r from-[#943bff] to-[#25f1ff] px-4 py-4 mx-3 my-6 rounded-t-2xl sm:rounded-2xl md:rounded-2xl xl:rounded-2xl">
            {{ title }}
        </h1>

        <BaseFilter :is-search="true" v-model="query" :is-reset="true" :filters="filters" />

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
                <div v-for="player in players" :key="player.id"
                    class="flex items-center justify-between py-3 px-2 transition">
                    <div class="flex justify-between w-2/4">
                        <BasePlayerCard :player="player" />

                        <div class="flex justify-evenly w-2/3">
                            <div class="w-1/3 flex gap-2 items-center">
                                <div class="text-center">
                                    <img :src="playersStore.TEAM_LOGOS_DIR + player.teamClubCrest" alt=""
                                        class="w-7 h-7 object-contain mx-auto">
                                </div>
                                <RouterLink
                                    :to="{ name: 'clubs', params: { clubId: player.teamId, clubName: player.teamName.toLowerCase() } }">
                                    <span class="text-white text-xs text-center hover:underline hover:cursor-pointer">{{
                                        player.teamName }}</span>
                                </RouterLink>
                            </div>
                            <div class="w-1/3 flex items-center">
                                <span class="text-white text-xs text-end">{{ player.position }}</span>
                            </div>
                            <div class="flex items-center gap-2 w-1/3">
                                <div class="text-center">
                                    <img v-if="player.nationality"
                                        :src="nationalityData.nationalities.find((nation) => nation.nationality === player.nationality)?.icon"
                                        :alt="player.nationality" class="w-7 h-7 object-contain mx-auto">
                                </div>
                                <span class="text-white text-xs text-center">{{ player.placeOfBirth }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="w-1/4 flex justify-end">
                        <a v-if="player.socialMedia != ''" :href="player.socialMedia" target="_blank"
                            class=" text-xs border-1 text-white rounded-3xl py-2 px-6 hover:bg-white hover:text-black text-center hover:cursor-pointer">
                            Follow
                        </a>
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
</style>