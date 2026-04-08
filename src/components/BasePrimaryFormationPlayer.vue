<script setup>
import { defineProps } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';
import
{
    ArrowLeft
} from '@element-plus/icons-vue'

const apiConfig = useApiConfig();
const props = defineProps({
    player: {
        type: Object,
        required: true,
        default: () => (
            {
                info: {
                    id: 0,
                    name: 'Player Name',
                    photo: 'player.png',
                    nationality: 'Nationality',
                    number: 0,
                },
                forwardMinutes: {
                    type: String,
                    required: false,
                },
                isYellowCard: {
                    type: Boolean,
                    required: false,
                },
                isCaption: {
                    type: Boolean,
                    required: false,
                },
                isGoal: {
                    type: Boolean,
                    required: false,
                },
                isAssist: {
                    type: Boolean,
                    required: false,
                }
            }
        )
    }

})
</script>

<template>
    <div class="flex flex-col justify-center items-center gap-1 relative">
        <a :href="`/${props.player.info.id}`"
            class="absolute rounded-xl w-17 h-21 hover:cursor-pointer hover:bg-[rgba(58,0,64,0.3)] z-100">
        </a>
        <div v-if="props.player.forwardMinutes" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-2xl w-fit h-[18px] right-3 bottom-6 z-10 flex justify-between items-center gap-1">
                <span class="text-white text-xs font-bold ps-1.5">{{ props.player.forwardMinutes }}</span>
                <el-icon>
                    <ArrowLeft class="text-red-600 !h-3" />
                </el-icon>
            </div>
        </div>

        <div v-if="props.player.isYellowCard === false" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-4.5 h-4.5 right-3.5 bottom-1 z-10 flex justify-center items-center">
                <div class="bg-yellow-400 w-2 h-3"></div>
            </div>
        </div>
        <div v-else-if="props.player.isYellowCard === true" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-4.5 h-4.5 right-3.5  bottom-1 z-10 flex justify-center items-center">
                <div class="bg-red-700 w-2 h-3"></div>
            </div>
        </div>

        <div v-if="props.player.isCaption" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-4.5 h-4.5 right-3.5 top-[-7px] z-10 flex justify-center items-center">
                <span class="text-white text-sm font-bold">C</span>
            </div>
        </div>

        <div v-if="props.player.isGoal" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-4.5 h-4.5 left-3.5 top-[-7px] z-10 flex justify-center items-center">
                <span class="text-white text-sm font-bold">⚽</span>
            </div>
        </div>

        <div v-if="props.player.isAssist" class="absolute">
            <div
                class="absolute bg-[#37003c] rounded-full w-4.5 h-4.5 left-3.5 bottom-1 z-10 flex justify-center items-center">
                <span class="text-white text-xs rotate-x-0 rotate-y-180">👟</span>
            </div>
        </div>

        <div class="flex justify-center bg-[#37003c] rounded-[4px] w-12 h-12 overflow-hidden pt-1 relative">
            <img :src="apiConfig.PLAYER_LOGOS_DIR + props.player.info.photo" alt="" class="w-auto h-fit object-contain">
        </div>
        <div class="flex justify-center gap-1">
            <span class="text-gray-400 text-xs">{{ props.player.info.number }}</span>
            <span class="text-white text-xs font-bold">{{ props.player.info.name.split(' ')[1]
            }}</span>
        </div>
    </div>
</template>