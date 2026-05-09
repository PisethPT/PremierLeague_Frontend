<script setup>
import { ref, defineProps } from 'vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();
const props = defineProps({
    upcoming: {
        type: Object,
        required: true,
        default: () => ({
            matchWeek: 0,
            matchDate: '',
            otherClub: {
                clubId: 0,
                name: '',
                shortName: '',
                clubCrest: '',
            },
            isHomeClub: false,
        })
    },
})
</script>

<template>
    <div class="flex justify-center items-center flex-col rounded-sm w-25 gap-1">
        <span class="text-gray-500 font-bold text-[10px] text-center">MW {{ upcoming.matchWeek }}</span>
        <img :src="apiConfig.CLUB_DIR + upcoming.otherClub.clubCrest" :alt="upcoming.otherClub.name"
            class="h-10 w-auto" />
        <span class="text-gray-500 font-bold text-[10px]  text-center">{{ upcoming.otherClub.shortName }} ({{
            upcoming.isHomeClub ? 'H' : 'A' }})</span>
        <span
            class="text-white font-bold text-xs text-center w-full bg-[#4b1254] rounded-br-lg rounded-bl-lg whitespace-nowrap">{{
                upcoming.matchDate }}</span>
    </div>
</template>