<script setup>
import { ref } from 'vue';
import BaseStatPrior from '@/components/BaseAvailablePrior.vue';
import
{
    ArrowRight,
    ArrowLeft,
} from '@element-plus/icons-vue';
import BasePLClubeStatCard from '@/components/BasePLClubeStatCard.vue';

const clubs = ref([
    { rank: 1, name: 'Arsenal', clubCrest: 'ars.png', clubTheme: '#ff0000', stat: 14 },
    { rank: 2, name: 'Manchester City', clubCrest: 'mci.png', clubTheme: '#7ab2e1', stat: 12 },
    { rank: 3, name: 'Newcastle United', clubCrest: 'new.png', clubTheme: '#231f20', stat: 10 },
    { rank: 4, name: 'Liverpool', clubCrest: 'liv.png', clubTheme: '#ffffff', stat: 9 },
    { rank: 5, name: 'Brighton & Hove Albion', clubCrest: 'bhr.png', clubTheme: '#0054a5', stat: 8 },
    { rank: 6, name: 'Tottenham Hotspur', clubCrest: 'tot.svg', clubTheme: '#000a3c', stat: 7 },
    { rank: 7, name: 'Chelsea', clubCrest: 'che.png', clubTheme: '#001489', stat: 6 },
    { rank: 8, name: 'Aston Villa', clubCrest: 'avl.png', clubTheme: '#480024', stat: 5 },
    { rank: 9, name: 'Manchester United', clubCrest: 'menu.svg', clubTheme: '#b90006', stat: 4 },
    { rank: 10, name: 'Fulham', clubCrest: 'ful.png', clubTheme: '#000000', stat: 3 },
]);
</script>

<template>
    <div class="content-center mx-4 my-4 bg-[#28002b] rounded-2xl px-4 py-4 h-fit flex flex-col">
        <div class="flex justify-between items-center w-full h-fit">
            <h2 class="text-white md:text-2xl text-xl font-bold mb-4">Premier League Club Stats</h2>
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
            <div class="grid grid-cols-[55px_1fr_auto] items-center gap-2 px-4 py-2 mb-2">
                <span class="text-gray-400 font-bold text-md">Rank</span>
                <span class="text-gray-400 font-bold text-md">Club</span>
                <span class="text-gray-400 font-bold text-md">Goals</span>
            </div>
            <div v-for="club in clubs" :key="club.rank">
                <BasePLClubeStatCard :club="club" :rank-size="'50px'" :is-club-theme-visible="false"
                    class="px-4 py-4 hover:bg-[#3a0040] hover:rounded-lg" />
            </div>
        </div>

    </div>

    <BaseStatPrior />
</template>
