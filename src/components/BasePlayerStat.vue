<script setup>
import { ref, defineProps } from 'vue';
import { ArrowRight } from '@element-plus/icons-vue';
import BasePlayerStatCard from './BasePlayerStatCard.vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    }
});

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
    <div class="px-5 py-5 bg-[#28002b] flex-1 h-176 rounded-2xl">
        <span class="text-white font-bold text-xl text-center flex items-center mb-3">{{ title }} <el-icon>
                <ArrowRight class="text-white font-bold" />
            </el-icon></span>

        <div v-for="player in players" class="flex flex-col gap-2 w-full">
            <BasePlayerStatCard :player="player" />
        </div>
    </div>
</template>