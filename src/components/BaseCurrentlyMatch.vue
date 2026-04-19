<script setup>
import { ref, defineProps } from 'vue';
import router from '@/router';

const base_url = ref('http://localhost:5245/upload/clubs/');
const currentMatch = ref({
    matchDate: 'Mon 12 Apr',
});

function viewAllMatches()
{
    router.push({ name: 'matches-index' });
}
</script>

<template>
    <div class="flex justify-start items-center gap-2 w-full p-5 flex-wrap">
        <h2 class="text-sm font-bold text-white">{{ currentMatch.matchDate }}</h2>
        <div class="flex justify-center items-center gap-2 !bg-[#28002b] rounded-md px-2 py-1 w-auto">
            <span class="text-white font-semibold text-sm text-center">FT</span>
            <div class="flex flex-row items-center justify-start gap-2">
                <span class="text-white font-semibold text-sm text-center truncate">Aston Villa</span>
                <img :src="base_url + 'avl.png'" class="h-5 w-5" />
            </div>
            <div class="!bg-[#1e0021] h-6 w-auto flex justify-center items-center px-3 rounded-md">
                <span class="text-white font-bold text-sm text-center">2 - 1</span>
            </div>
            <div class="flex flex-row items-center gap-2 justify-start">
                <img :src="base_url + 'cry.png'" class="h-5 w-5" />
                <span class="text-white font-semibold text-sm text-center truncate">Crystal Palace</span>
            </div>
        </div>
        <button @click="viewAllMatches"
            class="!bg-[#28002b] text-white text-sm rounded-md px-2 py-[6px] cursor-pointer">View all
            Matches</button>
    </div>
</template>