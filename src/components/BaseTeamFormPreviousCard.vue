<script setup>
import { ref, defineProps } from 'vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();
const props = defineProps({
    previous: {
        type: Object,
        required: true,
        default: () => ({
            matchWeek: 0,
            otherClub: {
                clubId: 0,
                name: '',
                shortName: '',
                clubCrest: '',
                goads: 0,
            },
            mainGoal: 0,
            isWon: false,
            isHomeClub: false,
        })
    },
})
</script>

<template>
    <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
        <span class="text-gray-500 font-bold text-[10px] text-center">MW {{ previous.matchWeek }}</span>
        <img :src="previous.otherClub ? apiConfig.CLUB_DIR + previous.otherClub?.clubCrest : ''"
            :alt="previous.otherClub?.name" class="h-10 w-auto" />
        <span class="text-gray-500 font-bold text-[10px]  text-center">{{ previous.otherClub?.shortName }} ({{
            previous.isHomeClub ? 'H' : 'A' }})</span>
        <span class="text-white font-bold text-xs text-center w-full rounded-br-lg rounded-bl-lg"
            :style="{ backgroundColor: previous.isWon ? '#00a63e' : '#e7000b' }">{{ previous.isHomeClub ?
                previous.mainGoal : previous.otherClub?.goads }}
            - {{ previous.isHomeClub ? previous.otherClub?.goads : previous.mainGoal }}</span>
    </div>
</template>