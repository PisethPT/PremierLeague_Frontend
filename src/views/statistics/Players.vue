<script setup>
import { ref } from 'vue';
import BaseStatPrior from '@/components/BaseAvailablePrior.vue';
import
{
    ArrowRight,
    ArrowLeft,
} from '@element-plus/icons-vue';
import BasePlayerStatCard from '@/components/BasePlayerStatCard.vue';

const players = ref([
    {
        rank: 1,
        info: {
            name: 'Gabriel Magalhães',
            photo: 'gabriel_magalhães.png',
            nationality: 'Brazil',
        },
        club: {
            clubCrest: 'ars.png',
            name: 'Arsenal',
            clubTheme: '#ff0000',
        },
        stat: 8
    },
    {
        rank: 2,
        info: {
            name: 'James Trafford',
            photo: 'james_trafford.png',
            nationality: 'England',
        },
        club: {
            clubCrest: 'bunley.svg',
            name: 'Burnley F.C.',
            clubTheme: '#81204c',
        },
        stat: 7
    },
    {
        rank: 3,
        info: {
            name: 'Oleksandr Zinchenko',
            photo: 'oleksandr_zinchenko.png',
            nationality: 'Ukraine',
        },
        club: {
            clubCrest: 'ars.png',
            name: 'Arsenal',
            clubTheme: '#ff0000',
        },
        stat: 6
    },
    {
        rank: 4,
        info: {
            name: 'Emiliano Buendía',
            photo: 'emiliano_buendía.png',
            nationality: 'Argentina',
        },
        club: {
            clubCrest: 'avl.png',
            name: 'Aston Villa',
            clubTheme: '#480024',
        },
        stat: 5
    },
    {
        rank: 1,
        info: {
            name: 'Gabriel Magalhães',
            photo: 'gabriel_magalhães.png',
            nationality: 'Cambodia',
        },
        club: {
            clubCrest: 'ars.png',
            name: 'Arsenal',
            clubTheme: '#ff0000',
        },
        stat: 8
    },
    {
        rank: 2,
        info: {
            name: 'James Trafford',
            photo: 'james_trafford.png',
            nationality: 'England',
        },
        club: {
            clubCrest: 'bunley.svg',
            name: 'Burnley F.C.',
            clubTheme: '#81204c',
        },
        stat: 7
    },
    {
        rank: 3,
        info: {
            name: 'Oleksandr Zinchenko',
            photo: 'oleksandr_zinchenko.png',
            nationality: 'Ukraine',
        },
        club: {
            clubCrest: 'ars.png',
            name: 'Arsenal',
            clubTheme: '#ff0000',
        },
        stat: 6
    },
    {
        rank: 4,
        info: {
            name: 'Emiliano Buendía',
            photo: 'emiliano_buendía.png',
            nationality: 'Argentina',
        },
        club: {
            clubCrest: 'avl.png',
            name: 'Aston Villa',
            clubTheme: '#480024',
        },
        stat: 5
    },
    {
        rank: 3,
        info: {
            name: 'Oleksandr Zinchenko',
            photo: 'oleksandr_zinchenko.png',
            nationality: 'Ukraine',
        },
        club: {
            clubCrest: 'ars.png',
            name: 'Arsenal',
            clubTheme: '#ff0000',
        },
        stat: 6
    },
    {
        rank: 4,
        info: {
            name: 'Emiliano Buendía',
            photo: 'emiliano_buendía.png',
            nationality: 'Argentina',
        },
        club: {
            clubCrest: 'avl.png',
            name: 'Aston Villa',
            clubTheme: '#480024',
        },
        stat: 5
    },
]);
</script>

<template>
    <div class="content-center mx-4 my-4 bg-[#28002b] rounded-2xl px-4 pt-4 pb-0 h-fit flex flex-col">
        <div class="flex justify-between items-center w-full h-fit">
            <h2 class="text-white md:text-2xl text-xl font-bold mb-4">Premier League Player Stats</h2>
            <div class="flex gap-2">
                <button
                    class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8 hover:bg-[#55005a] cursor-pointer">
                    <el-icon>
                        <ArrowLeft class="text-white" />
                    </el-icon>
                </button>
                <button
                    class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8 hover:bg-[#55005a] cursor-pointer">
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
            </div>
        </div>
        <div class="flex flex-col w-full">
            <div class="grid grid-cols-[50px_1fr_auto] items-center gap-2 px-4 py-2 mb-2">
                <span class="text-gray-400 font-bold text-md">Rank</span>
                <span class="text-gray-400 font-bold text-md">Player</span>
                <span class="text-gray-400 font-bold text-md">Goals</span>
            </div>
            <div v-for="player in players" :key="player.rank">
                <BasePlayerStatCard :player="player" :rank-size="'50px'" :is-nationality-visible="true"
                    class="px-4 py-4 hover:bg-[#3a0040] hover:rounded-lg" />
                <!-- hover:scale-105 transition-transform duration-200 -->
            </div>
        </div>
    </div>

    <BaseStatPrior />
</template>