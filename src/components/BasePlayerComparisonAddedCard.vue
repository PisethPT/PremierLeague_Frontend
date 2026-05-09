<script setup>
import { defineProps, defineEmits } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';
import { ArrowDown } from '@element-plus/icons-vue';

import { useApi } from '@/stores/api';

const apiConfig = useApi();
const emit = defineEmits(['clickToAddPlayer']);
const props = defineProps({
    param: {
        type: Number,
        required: true
    },
    playerIndex: {
        type: Number,
        required: true,
        default: 0
    },
    player: {
        type: Object,
        required: true,
        default: () => ({
            id: 0,
            rank: 0,
            info: {
                name: 'Player Name',
                photo: 'default_photo.png',
                position: 'FWD',
                nationality: 'Country'
            },
            club: {
                name: 'Club Name',
                clubCrest: 'default_crest.png',
                clubTheme: '#000000'
            }
        })
    }
});
</script>

<template>
    <div class="bg-[#37003c] flex flex-col gap-2 rounded-xl flex-1 p-2 h-auto cursor-pointer">
        <div class="flex flex-col gap-2" @click="emit('clickToAddPlayer', props.param, props.playerIndex)">
            <div class="rounded-[14px] w-full h-25 overflow-hidden"
                :style="{ backgroundColor: player.club?.clubTheme }">
                <img :src="apiConfig.PLAYER_DIR + player.info?.photo" alt="Club Crest"
                    class="w-25 h-auto object-contain mx-auto pt-1" />
            </div>
            <div class="flex flex-col justify-center gap-1">
                <span class="text-white font-bold text-md">{{ player.info?.name.split(' ')[1] }}</span>
                <div class="flex justify-between">
                    <div class="flex items-center gap-1">
                        <div class="min-w-5 min-h-5 overflow-hidden">
                            <img :src="apiConfig.CLUB_DIR + player.club?.clubCrest" alt="Club Crest"
                                class="w-auto h-5 object-contain mx-auto pt-1" />
                        </div>
                        <span class="text-white text-xs md:text-sm lg:text-base">{{ player.club?.name }}</span>
                    </div>
                    <span class="text-white text-xs md:text-sm lg:text-base">{{ player.info?.position }}</span>
                </div>

            </div>
        </div>
        <div class="w-full pt-4 mt-auto">
            <button
                class="flex items-center justify-center gap-1 bg-transparent border-1 border-white text-xs text-white text-center rounded-lg w-full h-8 hover:bg-[#3e003f] cursor-pointer">
                All sessions
                <el-icon class="text-center">
                    <ArrowDown class="text-md text-white" />
                </el-icon>
            </button>
        </div>
    </div>
</template>
