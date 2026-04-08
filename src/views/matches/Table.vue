<script setup>
import { ref } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';
import { ArrowUp, ArrowDown } from '@element-plus/icons-vue';

const apiConfig = useApiConfig();
const dataTable = ref([
    {
        pos: 1,
        isUp: true,
        club: {
            id: 12,
            name: 'Liverpool',
            clubCrest: 'liv.png',
        },
        pi: 3,
        w: 3,
        d: 0,
        l: 0,
        gf: 8,
        ga: 4,
        gd: 4,
        form: ["W", "W", "W"],
        pts: 9,
        next: {
            fixtureId: 101,
            date: "2025-10-05T16:30:00Z",
            venue: "Anfield",
            home: true,
            club: {
                id: 19,
                name: "Tottenham Hotspur",
                clubCrest: "tot.svg",
            },
        },
    },
    {
        pos: 2,
        isUp: true,
        club: {
            id: 6,
            name: 'Chelsea',
            clubCrest: 'che.png',
        },
        pi: 3,
        w: 2,
        d: 1,
        l: 0,
        gf: 7,
        ga: 1,
        gd: 6,
        form: ["W", "D", "W"],
        pts: 7,
        next: {
            fixtureId: 102,
            date: "2025-10-06T18:00:00Z",
            venue: "Stamford Bridge",
            home: true,
            club: {
                id: 15,
                name: "Manchester United",
                clubCrest: "menu.svg",
            },
        },
    },
    {
        pos: 3,
        isUp: false,
        club: {
            id: 1,
            name: 'Arsenal',
            clubCrest: 'ars.png',
        },
        pi: 3,
        w: 2,
        d: 0,
        l: 1,
        gf: 6,
        ga: 1,
        gd: 5,
        form: ["L", "W", "W"],
        pts: 6,
        next: {
            fixtureId: 103,
            date: "2025-10-06T20:00:00Z",
            venue: "Emirates Stadium",
            home: true,
            club: {
                id: 8,
                name: "Everton",
                clubCrest: "eve.png",
            },
        },
    },
    {
        pos: 4,
        isUp: false,
        club: {
            id: 19,
            name: 'Tottenham Hotspur',
            clubCrest: 'tot.svg',
        },
        pi: 3,
        w: 2,
        d: 0,
        l: 1,
        gf: 5,
        ga: 1,
        gd: 4,
        form: ["W", "L", "W"],
        pts: 6,
        next: {
            fixtureId: 101,
            date: "2025-10-05T16:30:00Z",
            venue: "Anfield",
            home: false,
            club: {
                id: 12,
                name: "Liverpool",
                clubCrest: "liv.png",
            },
        },
    },
    {
        pos: 5,
        isUp: true,
        club: {
            id: 8,
            name: 'Everton',
            clubCrest: 'eve.png',
        },
        pi: 3,
        w: 2,
        d: 0,
        l: 1,
        gf: 4,
        ga: 2,
        gd: 2,
        form: ["W", "L", "W"],
        pts: 6,
        next: {
            fixtureId: 103,
            date: "2025-10-06T20:00:00Z",
            venue: "Emirates Stadium",
            home: false,
            club: {
                id: 1,
                name: "Arsenal",
                clubCrest: "ars.png",
            },
        },
    },
    {
        pos: 6,
        isUp: true,
        club: {
            id: 10,
            name: 'Sunderland',
            clubCrest: 'sun.svg',
        },
        pi: 3,
        w: 2,
        d: 0,
        l: 1,
        gf: 5,
        ga: 3,
        gd: 2,
        form: ["L", "W", "W"],
        pts: 6,
        next: {
            fixtureId: 104,
            date: "2025-10-07T17:30:00Z",
            venue: "Stadium of Light",
            home: true,
            club: {
                id: 7,
                name: "Bournemouth",
                clubCrest: "bou.png",
            },
        },
    },
    {
        pos: 7,
        isUp: true,
        club: {
            id: 7,
            name: 'Bournemouth',
            clubCrest: 'bou.png',
        },
        pi: 3,
        w: 2,
        d: 0,
        l: 1,
        gf: 3,
        ga: 3,
        gd: 0,
        form: ["W", "W", "L"],
        pts: 6,
        next: {
            fixtureId: 104,
            date: "2025-10-07T17:30:00Z",
            venue: "Stadium of Light",
            home: false,
            club: {
                id: 10,
                name: "Sunderland",
                clubCrest: "sun.svg",
            },
        },
    },
    {
        pos: 8,
        isUp: true,
        club: {
            id: 9,
            name: 'Crystal Palace',
            clubCrest: 'cry.png',
        },
        pi: 3,
        w: 1,
        d: 2,
        l: 0,
        gf: 6,
        ga: 3,
        gd: 3,
        form: ["D", "W", "D"],
        pts: 5,
        next: {
            fixtureId: 105,
            date: "2025-10-08T19:00:00Z",
            venue: "Selhurst Park",
            home: true,
            club: {
                id: 15,
                name: "Manchester United",
                clubCrest: "menu.svg",
            },
        },
    },
    {
        pos: 9,
        isUp: true,
        club: {
            id: 15,
            name: 'Manchester United',
            clubCrest: 'menu.svg',
        },
        pi: 3,
        w: 1,
        d: 1,
        l: 1,
        gf: 3,
        ga: 3,
        gd: 0,
        form: ["D", "W", "L"],
        pts: 4,
        next: {
            fixtureId: 105,
            date: "2025-10-08T19:00:00Z",
            venue: "Selhurst Park",
            home: false,
            club: {
                id: 9,
                name: "Crystal Palace",
                clubCrest: "cry.png",
            },
        },
    },
]);

</script>

<template>
    <div class="flex-1 overflow-y-auto rounded-2xl !bg-[#28002b] py-4 pe-2">
        <div class="grid grid-cols-[90px_300px_1fr] text-white font-normal text-[16px]">
            <div class="sticky left-0 bg-[#28002b] z-10 px-3 text-center">Pos</div>
            <div class="sticky left-[70px] bg-[#28002b] z-10 px-3 w-fit">Team</div>
            <div class="grid grid-cols-[50px_50px_50px_50px_50px_50px_50px_170px_50px_60px] justify-self-end pr-6">
                <div class="text-center">PI</div>
                <div class="text-center">W</div>
                <div class="text-center">D</div>
                <div class="text-center">L</div>
                <div class="text-center">GF</div>
                <div class="text-center">GA</div>
                <div class="text-center">GD</div>
                <div class="text-center">Form</div>
                <div class="text-center">Pts</div>
                <div class="text-center">Next</div>
            </div>
        </div>

        <div v-for="row in dataTable" :key="row.pos"
            class="relative grid grid-cols-[90px_300px_1fr] items-center text-white text-sm hover:bg-[#3a0040] rounded-lg transition h-[59px] mt-2">
            <div class="sticky left-0 z-10 p-3 text-lg font-bold text-center flex items-center justify-center gap-6">
                {{ row.pos }}
                <ArrowUp v-if="row.isUp" class="text-green-600 w-3 h-3" />
                <ArrowDown v-else class="text-red-600 w-3 h-3" />
            </div>
            <div class="sticky left-[70px] z-10 p-3 font-bold flex items-center gap-2 w-fit">
                <img :src="row.club.clubCrest ? apiConfig.TEAM_LOGOS_DIR + row.club.clubCrest : ''"
                    class="w-8 h-8 object-contain" alt="" />
                <span class="text-[17px] font-bold">{{ row.club.name }}</span>
            </div>

            <div
                class="grid grid-cols-[50px_50px_50px_50px_50px_50px_50px_170px_50px_60px] justify-self-end pr-6 items-center">
                <div class="text-center">{{ row.pi }}</div>
                <div class="text-center">{{ row.w }}</div>
                <div class="text-center">{{ row.d }}</div>
                <div class="text-center">{{ row.l }}</div>
                <div class="text-center">{{ row.gf }}</div>
                <div class="text-center">{{ row.ga }}</div>
                <div class="text-center">{{ row.gd }}</div>
                <div class="flex justify-center gap-6">
                    <div v-for="(f, i) in row.form" :key="i"
                        class="w-6 h-6 text-[10px] font-bold rounded-full flex items-center justify-center" :style="{
                            backgroundColor: f === 'W' ? '#22c55e' : f === 'D' ? '#ebe5eb' : '#ef4444',
                            color: f === 'D' ? '#000' : '#fff'
                        }">
                        {{ f }}
                    </div>
                </div>
                <div class="text-center font-bold">{{ row.pts }}</div>
                <div class="flex items-center justify-center">
                    <img v-if="row.next"
                        :src="row.next.club.clubCrest ? apiConfig.TEAM_LOGOS_DIR + row.next.club.clubCrest : ''"
                        class="w-8 h-8 object-contain" alt="" />
                </div>
            </div>

            <div v-if="row.pos <= 4" class="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-lg z-10"></div>
            <div v-else-if="row.pos == 5" class="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r-lg z-10">
            </div>

            <div v-else-if="row.pts <= 4" class="absolute left-0 top-0 h-full w-1 bg-pink-500 rounded-r-lg z-10">
            </div>
        </div>
    </div>
    <div class="flex items-center gap-3 flex-wrap mx-4 mt-4">
        <div class="w-4 h-2 bg-blue-500 rounded-xs"></div>
        <span class="text-white text-sm">Champions League Qualification</span>
        <div class="w-4 h-2 bg-orange-500 rounded-xs"></div>
        <span class="text-white text-sm">Europa League Qualification</span>
        <div class="w-4 h-2 bg-pink-500 rounded-xs"></div>
        <span class="text-white text-sm">Relegation Qualification</span>
    </div>
</template>