<script setup>
import { computed } from 'vue';
import { useApi } from '@/stores/api';
const apiConfig = useApi();

const props = defineProps({
    positionLabel: {
        type: String,
        required: true
    },
    players: {
        type: Array,
        default: () => []
    },
    nationalityData: {
        type: Object,
        required: true
    }
});

const formatSlug = (name) => name?.toLowerCase().replace(/\s+/g, '-') || '';

const getNation = (nationalityName) =>
{
    return props.nationalityData.nationalities.find(
        (n) => n.nationality === nationalityName || n.name === nationalityName
    );
};
</script>

<template>
    <div class="bg-[#28002b] flex flex-col rounded-2xl h-fit w-full p-4 overflow-y-auto">
        <h2 class="text-white text-xl font-bold mb-4">{{ positionLabel }}</h2>

        <div class="flex flex-col gap-4">
            <router-link v-for="player in players" :key="player.playerId" :to="{
                name: 'player-overview',
                params: {
                    playerId: player.playerId,
                    playerName: formatSlug(player.playerName)
                }
            }" class="flex gap-3 hover:bg-white/5 rounded-xl transition-colors">
                <div class="rounded-[14px] min-w-12 min-h-12 w-12 h-12 overflow-hidden flex-shrink-0"
                    :style="{ backgroundColor: player.clubTheme }">
                    <img :src="apiConfig.PLAYER_DIR + player.playerPhoto" :alt="player.playerName"
                        class="w-12 h-12 object-contain mx-auto pt-1" />
                </div>

                <div class="flex flex-col justify-center min-w-0">
                    <span class="text-white text-sm font-bold truncate">
                        {{ player.playerName }}
                    </span>

                    <div class="flex items-center gap-1">
                        <span v-if="player.playerNumber" class="text-gray-400 text-xs">
                            {{ player.playerNumber }}
                        </span>
                        <span v-if="player.playerNumber" class="text-gray-400 text-xl">
                            •
                        </span>

                        <div class="flex items-center gap-1" v-if="player.nationality">
                            <img :src="getNation(player.nationality)?.icon" :alt="player.nationality"
                                class="w-4 h-3 object-contain">
                            <span class="text-gray-400 text-xs truncate">
                                {{ getNation(player.nationality)?.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </router-link>
        </div>
    </div>
</template>