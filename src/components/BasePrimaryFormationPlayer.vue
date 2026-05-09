<script setup>
import { useApi } from '@/stores/api';
import assists from '@/assets/icons/assists_white.png';
const apiConfig = useApi();
const props = defineProps({
    player: { type: Object, required: true }
});
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-1 relative scale-90 sm:scale-100">
        <router-link
            :to="{ name: 'player-overview', params: { playerId: player.playerId, playerName: player.firstName?.toString().toLowerCase() + '_' + player.lastName?.toString().toLowerCase() } }"
            class="absolute rounded-xl w-15 h-19 hover:cursor-pointer hover:bg-[rgba(58,0,64,0.3)] z-[50]">
        </router-link>

        <div v-if="player.outMinute !== '0'" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-2xl w-fit h-4.5 right-2 bottom-5 z-10 flex items-center gap-1 px-1">
                <span class="text-white text-[10px] font-bold">{{ player.outMinute }}'</span>
                <i class="fa-solid fa-reply text-red-600 text-[10px]"></i>
            </div>
        </div>

        <div v-if="player.inMinute !== '0'" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-2xl w-fit h-4.5 left-2 bottom-5 z-10 flex items-center gap-1 px-1">
                <i class="fa-solid fa-reply text-green-600 text-[10px] -rotate-180"></i>
                <span class="text-white text-[10px] font-bold">{{ player.inMinute }}'</span>
            </div>
        </div>

        <div v-if="player.hasCard === 'Y' || player.hasCard === 'R'" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-4 h-4 right-3 bottom-0.5 z-10 flex justify-center items-center">
                <div :class="[player.hasCard === 'Y' ? 'bg-yellow-400' : 'bg-red-700', 'w-[7px] h-2.5']"></div>
            </div>
        </div>

        <div v-if="player.isCaption" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-4.5 h-4.5 right-3 top-[-8px] z-10 flex justify-center items-center">
                <span class="text-white text-[13px] font-bold">C</span>
            </div>
        </div>

        <div v-if="player.isHasGoal" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-fit h-4.5 px-1 left-3 top-[-8px] z-10 flex justify-center items-center gap-1">
                <i class="fa-solid fa-futbol text-white text-xs"></i>
                <span v-if="player.goals > 1" class="text-white text-[10px] font-bold">{{ player.goals }}</span>
            </div>
        </div>

        <div v-if="player.isHasAssist" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-4.5 h-4.5 left-3.5 bottom-1 z-10 flex justify-center items-center gap-1">
                <img :src="assists" class="w-4 object-contain -rotate-25 scale-x-100" />
                <span v-if="player.assists > 1" class="text-white text-[10px] font-bold">{{ player.assists }}</span>
            </div>
        </div>

        <div class="flex justify-center bg-[#37003c] rounded-[4px] w-12 h-12 overflow-hidden pt-1 relative shadow-md">
            <img :src="apiConfig.PLAYER_DIR + player.playerPhoto" class="w-auto h-fit object-contain" />
        </div>

        <div class="flex flex-row items-center gap-1 leading-none">
            <span class="text-gray-400 text-[10px]">{{ player.playerNumber }}</span>
            <span class="text-white text-[10px] font-bold">
                {{ player.lastName }}
            </span>
        </div>
    </div>
</template>