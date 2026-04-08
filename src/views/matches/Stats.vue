<script setup>
import { ref } from 'vue';

const possession = ref([
    { club: 'Club A', clubTheme: '#000a3c', percentage: 54.9 },
    { club: 'Club B', clubTheme: '#b90006', percentage: 45.1 },
]);
</script>

<template>
    <div class="flex flex-col gap-4">
        <div class="bg-[#28002b] flex flex-col gap-2 rounded-2xl w-full h-110 p-4">
            <h2 class="text-white text-lg font-bold">Top Stats</h2>
            <div class="flex justify-between w-full h-7 rounded-xl overflow-hidden">
                <div v-for="(p, index) in possession" :key="index" class="text-white text-sm font-bold px-4 text-center flex items-center"
                    :style="{ width: p.percentage + '%', backgroundColor: p.clubTheme, justifyContent:  index === 0 ? 'flex-start' : 'flex-end' }">{{ p.percentage.toFixed(1) }}%
                </div>
            </div>
        </div>
        <div class="bg-[#28002b] flex flex-col rounded-2xl w-full h-100 p-4">
            <h2 class="text-white text-lg font-bold">Attack</h2>
        </div>
        <div class="bg-[#28002b] flex flex-col rounded-2xl w-full h-70 p-4">
            <h2 class="text-white text-lg font-bold">Possession</h2>
        </div>
        <div class="bg-[#28002b] flex flex-col rounded-2xl w-full h-80 p-4">
            <h2 class="text-white text-lg font-bold">Defence</h2>
        </div>
        <div class="bg-[#28002b] flex flex-col rounded-2xl w-full h-60 p-4">
            <h2 class="text-white text-lg font-bold">Physical </h2>
        </div>
        <div class="bg-[#28002b] flex flex-col rounded-2xl w-full h-50 p-4">
            <h2 class="text-white text-lg font-bold">Discipline</h2>
        </div>
    </div>
</template>