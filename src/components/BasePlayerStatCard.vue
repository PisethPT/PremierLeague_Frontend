<script setup>
import { ref, defineProps } from 'vue';
import nationalityData from '@/assets/nationality.json';

import { useApi } from '@/stores/api';

const apiConfig = useApi();
const props = defineProps({
    player: {
        type: Object,
        required: true,
        default: () => ({
            rank: 1,
            info: {
                name: 'Player Name',
                photo: 'player_photo.png',
                nationality: 'Country Name',
            },
            club: {
                clubCrest: 'club_crest.png',
                name: 'Club Name',
                clubTheme: '#ffffff',
            },
            stat: 0
        })
    },
    rankSize: {
        type: String,
        default: '25px',
    },
    isNationalityVisible: {
        type: Boolean,
        default: false,
    },
    isRankVisible: {
        type: Boolean,
        default: true,
    },
    isStatVisible: {
        type: Boolean,
        default: true,
    },
});
</script>

<template>
    <div class="flex justify-between items-center mb-4">
        <div class="grid items-center gap-2"
            :style="{ gridTemplateColumns: isRankVisible && isStatVisible ? `${rankSize} auto 1fr` : `1fr auto`, columnGap: '8px' }">
            <span class="text-white font-bold text-md me-2" v-if="isRankVisible">{{ player.rank }}</span>
            <div class="rounded-[14px] min-w-12 min-h-12 overflow-hidden"
                :style="{ backgroundColor: player.club.clubTheme }">
                <img :src="apiConfig.PLAYER_DIR + player.info.photo" alt="Club Crest"
                    class="max-w-12 h-12 object-contain mx-auto pt-1" />
            </div>
            <div class="flex flex-col justify-center">
                <span class="text-white font-bold text-md">{{ player.info.name }}</span>
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1">
                        <div class="min-w-5 min-h-5 overflow-hidden">
                            <img :src="apiConfig.CLUB_DIR + player.club.clubCrest" alt="Club Crest"
                                class="w-auto h-5 object-contain mx-auto pt-1" />
                        </div>
                        <span class="text-white text-sm">{{ player.club.name }}</span>
                    </div>

                    <div v-if="isNationalityVisible" class="flex items-center gap-1">
                        <div class="min-w-5 min-h-5 overflow-hidden">
                            <img :src="(nationalityData?.nationalities || []).find((nation) => nation.name === player.info.nationality)?.icon || ''"
                                alt="Nationality" class="w-auto h-4 object-contain mx-auto pt-1" />
                        </div>
                        <span class="text-white text-sm">{{ player.info.nationality }}</span>
                    </div>
                </div>
            </div>
        </div>
        <span v-if="isStatVisible" class="text-white text-2xl font-bold">{{ player.stat }}</span>
    </div>
</template>