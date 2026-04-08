<script setup>
import { ref } from 'vue';
import BasePlayerStat from '@/components/BasePlayerStat.vue';
import BasePLClubStat from '@/components/BasePLClubStat.vue';
import BaseAvailablePrior from '@/components/BaseAvailablePrior.vue';
</script>

<template>
    <div class="mx-4 my-4">
        <h2 class="text-white md:text-2xl text-xl font-bold mb-4">2025/26 Player Stats</h2>
        <div class="flex flex-wrap gap-5">
            <BasePlayerStat :title="'Goals'" />
            <BasePlayerStat :title="'Assists'" />
            <BasePlayerStat :title="'Total Passes'" />
            <BasePlayerStat :title="'Clean Sheets'" />
        </div>
    </div>

    <div class="mx-4 my-4">
        <h2 class="text-white md:text-2xl text-xl font-bold mb-4">Premier League Club Stats</h2>
        <div class="flex flex-wrap gap-5">
            <BasePLClubStat :title="'Goals '" />
            <BasePLClubStat :title="'Tackles Won '" />
            <BasePLClubStat :title="'Blocks '" />
            <BasePLClubStat :title="'Total Passes '" />
        </div>
    </div>

    <BaseAvailablePrior />
</template>