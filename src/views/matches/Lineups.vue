<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMatchStore, useFormation } from '@/stores';
import BasePrimaryLineup from '@/components/BasePrimaryLineup.vue';

const matchStore = useMatchStore();
const formationStore = useFormation();
const route = useRoute();
const matchId = ref(route.params.matchId);

const formations = ref([]);

onMounted(async () =>
{
    try
    {
        await matchStore.getMatchLineup({ matchId: matchId.value });
        await formationStore.getFormations();
        formations.value = formationStore.formations;
    } catch (error)
    {
        console.error(error);
    }
});

const matchData = computed(() => matchStore.matchLineup || {});

const getCardClass = (type) =>
{
    if (type === 'Y') return 'bg-yellow-400';
    if (type === 'R') return 'bg-red-700';
    return '';
};
</script>

<template>
    <div class="flex flex-col gap-4 w-full">
        <div
            class="bg-[#28002b] grid grid-rows-[auto_1fr_auto] w-full h-[1150px] lg:h-[650px] rounded-2xl overflow-hidden shadow-2xl">

            <div class="flex justify-between items-center border-b-2 border-[#4b1254] py-4 px-6">
                <div class="flex items-center gap-3">
                    <img :src="matchData.homeClubCrest" class="w-8 h-8 object-contain" />
                    <span class="text-white text-md font-bold">{{ matchData.homeClubShortName }}</span>
                    <span class="text-gray-300 text-sm ml-1">Formation</span>
                    <span class="text-white text-sm font-bold">{{ matchData.homeClubFormation }}</span>
                </div>

                <div class="flex items-center gap-3">
                    <img :src="matchData.awayClubCrest" class="w-8 h-8 object-contain" />
                    <span class="text-white text-md font-bold mr-1">{{ matchData.awayClubShortName }}</span>
                    <span class="text-gray-300 text-sm">Formation</span>
                    <span class="text-white text-sm font-bold">{{ matchData.awayClubFormation }}</span>
                </div>
            </div>

            <div
                class="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 relative overflow-hidden bg-[rgba(58,0,64,0.1)]">

                <div class="border-b-1 lg:border-b-0 lg:border-e-1 border-[#4b1254] relative">
                    <div
                        class="absolute border-b-2 lg:border-x-0 lg:border-r-2 border-x-2 lg:border-y-2 border-[#4b1254] bg-[#28002b] w-[50%] lg:w-30 h-30 lg:h-[50%] top-0 lg:top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 z-10">
                    </div>
                    <div
                        class="absolute border-b-2 lg:border-x-0 lg:border-r-2 border-x-2 lg:border-y-2 border-[#4b1254] w-[15%] lg:w-10 h-[20%] lg:h-[18%] top-0 lg:top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 z-20">
                    </div>
                    <div
                        class="absolute w-35 h-35 rounded-full border-2 border-[#4b1254] top-4 lg:top-1/2 left-1/2 lg:left-4 transform -translate-x-1/2 lg:translate-x-0 translate-y-0 lg:-translate-y-1/2">
                    </div>

                    <div class="absolute inset-0 z-30">
                        <BasePrimaryLineup layoutMode="pitch" :formations="formations"
                            :formation-id="matchData.homeClubFormationId" :players="matchData.homeClubLineups || []" />
                    </div>
                </div>

                <div
                    class="absolute w-35 h-35 rounded-full border-2 border-[#4b1254] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0">
                </div>

                <div class="border-t-1 lg:border-t-0 lg:border-s-1 border-[#4b1254] relative">
                    <div
                        class="absolute border-t-2 lg:border-x-0 lg:border-l-2 border-x-2 lg:border-y-2 border-[#4b1254] bg-[#28002b] w-[50%] lg:w-30 h-30 lg:h-[50%] bottom-0 lg:top-1/2 right-1/2 lg:right-0 transform translate-x-1/2 lg:translate-x-0 translate-y-0 lg:-translate-y-1/2 z-10">
                    </div>
                    <div
                        class="absolute border-t-2 lg:border-x-0 lg:border-l-2 border-x-2 lg:border-y-2 border-[#4b1254] w-[15%] lg:w-10 h-[10%] lg:h-[18%] bottom-0 lg:top-1/2 right-1/2 lg:right-0 transform translate-x-1/2 lg:translate-x-0 translate-y-0 lg:-translate-y-1/2 z-20">
                    </div>
                    <div
                        class="absolute w-35 h-35 rounded-full border-2 border-[#4b1254] bottom-4 lg:top-1/2 right-1/2 lg:right-4 transform translate-x-1/2 lg:translate-x-0 translate-y-0 lg:-translate-y-1/2">
                    </div>

                    <div class="absolute inset-0 z-30">
                        <BasePrimaryLineup layoutMode="pitch" class="away-side-layout" :formations="formations"
                            :formation-id="matchData.awayClubFormationId" :players="matchData.awayClubLineups || []" />
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center py-4 px-6 border-t-2 border-[#4b1254]">
                <div class="flex gap-2">
                    <span class="text-gray-300 text-sm">Manager</span>
                    <span class="text-white text-sm font-bold">{{ matchData.homeClubManager }}</span>
                </div>
                <div class="flex gap-2">
                    <span class="text-gray-300 text-sm">Manager</span>
                    <span class="text-white text-sm font-bold">{{ matchData.awayClubManager }}</span>
                </div>
            </div>
        </div>

        <div class="bg-[#28002b] rounded-2xl p-6">
            <h3 class="text-white text-md font-bold mb-6">Substitutes</h3>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12">
                <div class="flex flex-col gap-6">
                    <router-link v-for="player in matchData.homeClubSubstitutes" :key="player.playerId"
                        :to="{ name: 'player-overview', params: { playerId: player.playerId, playerName: player.firstName.toString().toLowerCase() + '_' + player.lastName.toString().toLowerCase() } }"
                        class="flex items-center justify-between hover:bg-[#310035] rounded-xl">
                        <div class="flex items-center gap-3">
                            <div class="flex justify-center rounded-xl w-12 h-12 overflow-hidden pt-1 relative shadow-md"
                                :style="{ backgroundColor: matchStore.matchLineup.homeClubTheme }">
                                <img :src="player.playerPhoto" class="w-auto h-fit object-contain" />
                            </div>
                            <div class="flex flex-col leading-none">
                                <span class="text-white font-bold text-sm">{{ player.firstName }} {{ player.lastName
                                    }}</span>
                                <span class="text-gray-300 text-xs">{{ player.playerNumber }} Defender</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <i v-if="player.goalCount > 0" class="fa-solid fa-futbol text-white text-xs"></i>
                            <div v-if="player.hasCard" :class="[getCardClass(player.hasCard), 'w-2 h-3 rounded-sm']">
                            </div>
                            <div v-if="player.inMinute !== '0'"
                                class="flex items-center gap-1 bg-[#37003c] rounded-full w-fit h-4 px-1">
                                <i class="fa-solid fa-reply text-green-500 text-[10px] -rotate-180"></i>
                                <span class="text-white text-xs font-bold">{{ player.inMinute }}'</span>
                            </div>
                        </div>
                    </router-link>
                </div>
                <div
                    class="flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-[#4b1254] pt-4 lg:pt-0 lg:pl-10">
                    <router-link v-for="player in matchData.awayClubSubstitutes" :key="player.playerId"
                        :to="{ name: 'player-overview', params: { playerId: player.playerId, playerName: player.firstName.toString().toLowerCase() + '_' + player.lastName.toString().toLowerCase() } }"
                        class="flex items-center justify-between hover:bg-[#310035] rounded-xl">
                        <div class="flex items-center gap-3">
                            <div class="flex justify-center rounded-xl w-12 h-12 overflow-hidden pt-1 relative shadow-md"
                                :style="{ backgroundColor: matchStore.matchLineup.awayClubTheme }">
                                <img :src="player.playerPhoto" class="w-auto h-fit object-contain" />
                            </div>
                            <div class="flex flex-col leading-none">
                                <span class="text-white font-bold text-sm">{{ player.firstName }} {{ player.lastName
                                    }}</span>
                                <span class="text-gray-300 text-xs">{{ player.playerNumber }} Forward</span>
                            </div>
                        </div>
                        <div class="flex items-center gap-3">
                            <i v-if="player.goalCount > 0" class="fa-solid fa-futbol text-white text-xs"></i>
                            <div v-if="player.hasCard" :class="[getCardClass(player.hasCard), 'w-2 h-3 rounded-sm']">
                            </div>
                            <div v-if="player.inMinute !== '0'"
                                class="flex items-center gap-1 bg-[#37003c] rounded-full w-fit h-4 px-1">
                                <i class="fa-solid fa-reply text-green-500 text-[10px] -rotate-180"></i>
                                <span class="text-white text-xs font-bold">{{ player.inMinute }}'</span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>