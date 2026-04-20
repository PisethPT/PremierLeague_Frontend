<script setup>
import { ref, onMounted } from 'vue';
import { useTableStore } from '@/stores/tableStore';
import BaseLeagueTable from '@/components/BaseLeagueTable.vue';

const tableStore = useTableStore();

onMounted(async () =>
{
    try
    {
        await tableStore.getTables();
    } catch (error)
    {
        console.error('Error fetching table data:', error);
    }
});
</script>

<template>
    <BaseLeagueTable :data="tableStore.tables" :showCols="{
        played: true,
        wins: true,
        losses: true,
        points: true,
        form: true,
        next: true,
        gf: true,
        ga: true,
        gd: true,
        draws: true
    }" />


    <div class="flex items-center gap-3 flex-wrap mx-4 mt-6">
        <div class="w-4 h-2 bg-blue-500 rounded-xs"></div>
        <span class="text-white text-sm">Champions League Qualification</span>
        <div class="w-4 h-2 bg-orange-500 rounded-xs"></div>
        <span class="text-white text-sm">Europa League Qualification</span>
        <div class="w-4 h-2 bg-pink-500 rounded-xs"></div>
        <span class="text-white text-sm">Relegation Qualification</span>
    </div>
</template>