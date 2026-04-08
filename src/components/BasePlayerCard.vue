<script setup>
import { ref, defineProps } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';
import
{
    ArrowRightBold
} from '@element-plus/icons-vue'

const apiConfig = useApiConfig();
const placeholder = ref("/src/assets/resources/placeholder.png");

const props = defineProps({
    player: {
        type: Object,
        required: true,
        default: () => (
            {
                id: 0,
                firstName: '',
                lastName: '',
                photo: '',
                teamThemeColor: '',
            }
        )
    }
})

</script>

<template>
    <div class="flex items-center gap-2 w-1/2">
        <div class="rounded-[14px] min-w-12 min-h-12 overflow-hidden"
            :style="{ backgroundColor: player.teamThemeColor }">
            <img :src="player?.photo ? apiConfig.PLAYER_LOGOS_DIR + player?.photo : placeholder" :alt="player?.photo"
                class="w-12 h-12 object-contain mx-auto pt-1" />
        </div>
        <RouterLink class="flex gap-2 items-center w-full"
            :to="{ name: 'player-overview', params: { playerId: player.id, playerName: player.firstName.toString().toLowerCase() + '_' + player.lastName.toString().toLowerCase() } }">
            <h3 class="text-md font-bold text-center text-white text-wrap hover:underline">{{ player.firstName }} {{
                player.lastName
            }}</h3>
            <el-icon>
                <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
            </el-icon>
        </RouterLink>
    </div>
</template>