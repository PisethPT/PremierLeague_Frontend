<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useTableStore } from '@/stores/tableStore';
import PageTitleBase from '@/components/PageTitleBase.vue';
import BaseLeagueTable from '@/components/BaseLeagueTable.vue';

import SponsorBar from '@/components/SponsorBar.vue';
import BaseFilter from '@/components/BaseFilter.vue';

const tableStore = useTableStore();
const title = ref('Tables');
const sponsorImage = ref('/src/assets/sponsors/9044630324637544770.png');
const filters = ref([
    {
        id: 1,
        label: 'Premier League',
        tag: 'leagues',
    },
    {
        id: 2,
        label: '2025/26',
        tag: 'seasons',
    },
    {
        id: 3,
        label: 'All Matchweeks',
        tag: 'allMatchweeks',
    },
    {
        id: 4,
        label: 'Home & Alway',
        tag: 'homeAndAlway',
    },
]);

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
    <div class="content-center">
        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />
        <PageTitleBase :title="title" />
        <BaseFilter :isReset="true" :filters="filters" />

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
    </div>
</template>