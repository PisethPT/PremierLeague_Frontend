<script setup>
import { ref, defineProps } from 'vue';
import
{
    ArrowRightBold
} from '@element-plus/icons-vue'
import { useApi } from '@/stores/api';

import placeholder from '@/assets/resources/placeholder.png';
const apiConfig = useApi();
const props = defineProps({
    player: {
        type: Object,
        required: true,
        default: () => (
            {
                playerId: 0,
                playerName: '',
                position: '',
                playerPhoto: '',
                clubTheme: '',
            }
        )
    }
})

</script>

<template>
    <div class="flex items-center gap-2 w-1/2">
        <div class="rounded-[14px] min-w-12 min-h-12 overflow-hidden" :style="{ backgroundColor: player.clubTheme }">
            <img :src="apiConfig.PLAYER_DIR + player?.playerPhoto" :alt="player?.playerPhoto" @error="placeholder"
                class="w-12 h-12 object-contain mx-auto pt-1" />
        </div>
        <RouterLink class="flex gap-2 items-center w-full"
            :to="{ name: 'player-overview', params: { playerId: player.playerId, playerName: player.playerName.toLowerCase().replace(/\s+/g, '-') } }">
            <h3 class="text-md font-bold text-center text-white text-wrap hover:underline">{{ player.playerName }}</h3>
            <el-icon>
                <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
            </el-icon>
        </RouterLink>
    </div>
</template>