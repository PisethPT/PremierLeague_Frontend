<script setup>
import { defineProps } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';

const apiConfig = useApiConfig();
const props = defineProps({
    club: {
        type: Object,
        required: true,
        default: ({
            rank: 1,
            name: 'Club Name',
            clubCrest: 'club_crest.png',
            clubTheme: '#ffffff',
            stat: 0
        }),
    },
    rankSize: {
        type: String,
        default: '25px',
    },
    isClubThemeVisible: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="flex justify-between items-center">
        <div class="grid items-center gap-2" :style="{ gridTemplateColumns: `${rankSize} auto 1fr`, columnGap: '8px' }">
            <span class="text-white font-bold text-md me-3">{{ club.rank }}</span>
            <div v-if="isClubThemeVisible" class="rounded-[14px] px-[2px] min-w-12 min-h-12"
                :style="{ backgroundColor: club.clubTheme }">
                <img :src="apiConfig.TEAM_LOGOS_DIR + club.clubCrest" alt="Club Crest"
                    class="w-12 h-12 p-1 object-contain mx-auto" />
            </div>
            <div v-else class="w-12 h-12">
                <img :src="apiConfig.TEAM_LOGOS_DIR + club.clubCrest" alt="Club Crest"
                    class="w-12 h-12 p-1 object-contain mx-auto" />
            </div>
            <div class="flex flex-col justify-center">
                <span class="text-white font-bold text-md">{{ club.name }}</span>
            </div>
        </div>
        <span class="text-white text-2xl font-bold">{{ club.stat }}</span>
    </div>
</template>