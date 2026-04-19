<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayerStore, useClubStore } from '@/stores';
import BaseCurrentlyMatch from '@/components/BaseCurrentlyMatch.vue';
import BasePlayerDetailCard from '@/components/BasePlayerDetailCard.vue';
import router from '@/router';
import nationalityData from '@/assets/nationality.json';

const route = useRoute();
const playerStore = usePlayerStore();
const clubStore = useClubStore();
const playerId = ref(route.params.playerId);
const playerName = ref(route.params.playerName);
const player = ref(null);
const club = ref(null);
const isFullBio = ref(false);
const isWatching = ref(false);
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
const menuActive = ref('Overview');
const playerDetailMenu = ref([
    { name: 'Overview', route: 'player-overview' },
    { name: 'Video', route: 'player-video' },
    { name: 'Matches', route: 'player-matches' },
    { name: 'Stats ', route: 'player-stats' },
    { name: 'Career History', route: 'player-career' },
]);

// watch for param changes and reload
watch(
    () => route.params.playerId,
    (newId, oldId) =>
    {
        playerId.value = newId;
        if (newId !== oldId) loadPlayerData(newId);
        isWatching.value = true;
    }
);

onMounted(async () =>
{
    await loadPlayerData();
});

async function loadPlayerData()
{
    window.scrollTo({ top: 0, behavior: 'auto' });
    try
    {
        await playerStore.getPlayerInfo({ playerId: playerId.value });
        player.value = playerStore.playerInformation;

        router.push({ name: 'player-overview', params: { playerId: playerId.value, playerName: playerName.value } });
        menuActive.value = 'Overview';
        console.log(player.value);
    } catch (error)
    {
        console.error("Fetching error:", error);
    }
}
</script>

<template>
    <!-- currently match -->
    <BaseCurrentlyMatch />

    <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[33.33%_1fr] gap-4 py-4 px-3">
        <div class="flex flex-wrap gap-4 h-fit">
            <BasePlayerDetailCard :player="player" />
            <div class="!bg-[#28002b] rounded-2xl h-[180px] w-full p-5 flex flex-col justify-start items-center gap-3">

                <div class="grid grid-cols-3 w-full">
                    <div class="flex flex-col justify-start gap-1">
                        <span class="text-gray-400 text-[12px]">Nationality</span>
                        <div class="flex justify-start w-fit gap-2">
                            <img :src="(nationalityData?.nationalities || []).find((nation) => nation.nationality === player?.nationality || nation.name === player?.placeOfBirth)?.icon || ''"
                                alt="Nationality" class="w-auto h-4 object-contain mx-auto" />
                            <span class="text-white text-sm font-bold">{{nationalityData.nationalities.find((nation) =>
                                nation.nationality === player?.nationality || nation.name ===
                                player?.placeOfBirth)?.name
                            }}</span>
                        </div>
                    </div>

                    <div class="flex flex-col justify-start gap-1">
                        <span class="text-gray-400 text-[12px]">Preferred Foot</span>
                        <span class="text-white text-sm font-bold">{{ player?.preferredFoot }}</span>
                    </div>

                    <div class="flex flex-col justify-start gap-1">
                        <span class="text-gray-400 text-[12px]">Date of Birth</span>
                        <span class="text-white text-sm font-bold">{{ player?.dateOfBirth }}</span>
                    </div>
                </div>

                <div class="grid grid-cols-3 w-full">
                    <div class="flex flex-col justify-start gap-1">
                        <span class="text-gray-400 text-[12px]">Appearances</span>
                        <span class="text-white text-sm font-bold">{{ player?.appearances }}</span>
                    </div>

                    <div class="flex flex-col justify-start gap-1">
                        <span class="text-gray-400 text-[12px]">Goals</span>
                        <span class="text-white text-sm font-bold">{{ player?.goals }}</span>
                    </div>
                    <div class="flex flex-col justify-start gap-1">
                        <span class="text-gray-400 text-[12px]">Assists</span>
                        <span class="text-white text-sm font-bold">{{ player?.assists }}</span>
                    </div>
                </div>

                <button class="bg-[#4b1254] text-white text-sm text-center w-full h-8 rounded-2xl hover:cursor-pointer"
                    @click="isFullBio = true">Full
                    Bio</button>
            </div>
        </div>

        <div class="flex flex-1 flex-col gap-4">
            <!-- nav bar -->
            <div class="pt-2 pe-2 flex gap-4 overflow-x-auto scrollbar-none">
                <div v-for="menu in playerDetailMenu" :key="menu.name"
                    class="text-white text-sm pb-1 border-b-4 hover:cursor-pointer whitespace-nowrap"
                    :style="menuActive == menu.name ? { borderBottom: '4px solid white', fontWeight: 'bold' } : { borderBottom: '4px solid transparent', fontWeight: 'normal' }">
                    <router-link :to="{ name: menu.route }" @click="menuActive = menu.name">{{ menu.name
                        }}</router-link>
                </div>
            </div>
            <section>
                <!-- render players menu content -->
                <router-view :key="$route.fullPath" />
            </section>
        </div>
    </div>

    <!-- full bio -->
    <el-drawer v-model="isFullBio" class="!bg-[#1a011d]" :size="'23%'">
        <template #header>
            <div class="flex flex-col gap-5">
                <h4 class="text-white font-bold text-3xl">Full Bio</h4>
            </div>
        </template>
        <template #default>
            <div class="grid grid-cols-2 w-full h-fit gap-2">

                <div v-if="player?.dateOfBirth" class="flex flex-col gap-2 p-4 bg-[#28002b] rounded-2xl">
                    <span class="text-gray-400 text-md">Date of Birth</span>
                    <span class="text-white text-lx font-bold">{{ player?.dateOfBirth }}</span>
                </div>

                <div v-if="player?.position" class="flex flex-col gap-2 p-4 bg-[#28002b] rounded-2xl">
                    <span class="text-gray-400 text-md">Position</span>
                    <span class="text-white text-lx font-bold">{{ player?.position }}</span>
                </div>

                <div v-if="player?.placeOfBirth" class="flex flex-col gap-2 p-4 bg-[#28002b] rounded-2xl">
                    <span class="text-gray-400 text-md">Place of Birth</span>
                    <span class="text-white text-lx font-bold">{{ player?.placeOfBirth }}</span>
                </div>

                <div v-if="player?.nationality" class="flex flex-col gap-2 p-4 bg-[#28002b] rounded-2xl">
                    <span class="text-gray-400 text-md">Nationality</span>
                    <span class="text-white text-lx font-bold">{{ player?.nationality }}</span>
                </div>

                <div v-if="player?.height" class="flex flex-col gap-2 p-4 bg-[#28002b] rounded-2xl">
                    <span class="text-gray-400 text-md">Height</span>
                    <span class="text-white text-lx font-bold">{{ player?.height }}</span>
                </div>

                <div v-if="player?.preferredFoot" class="flex flex-col gap-2 p-4 bg-[#28002b] rounded-2xl">
                    <span class="text-gray-400 text-md">Preferred Foot</span>
                    <span class="text-white text-lx font-bold">{{ player?.preferredFoot }}</span>
                </div>

                <div v-if="player?.playerNumber" class="flex flex-col gap-2 p-4 bg-[#28002b] rounded-2xl">
                    <span class="text-gray-400 text-md">Shirt Number</span>
                    <span class="text-white text-lx font-bold">{{ player?.playerNumber }}</span>
                </div>

                <div v-if="player?.joinedClub" class="flex flex-col gap-2 p-4 bg-[#28002b] rounded-2xl">
                    <span class="text-gray-400 text-md">Joined Club</span>
                    <span class="text-white text-lx font-bold">{{ player?.joinedClub }}</span>
                </div>

            </div>
        </template>
    </el-drawer>
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