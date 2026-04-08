<script setup>
import { ref, defineProps } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';

const apiConfig = useApiConfig();
const props = defineProps({
    nextMatch: {
        type: Object,
        required: false,
        default: () => ({
            matchId: 0,
            matchDate: 'Sat 13 Sep',
            kickoff: '12:30',
            league: 'Premier League',
            homeClub: {
                clubId: 0,
                name: '',
                clubCrest: '',
                goal: 0,
            },
            awayClub: {
                clubId: 0,
                name: '',
                clubCrest: '',
                goal: 0,
            }
        }),
    }
})

</script>

<template>
    <div class="!bg-[#28002b] rounded-2xl h-[205px] w-full p-4">
        <div class="font-bold text-md text-white">Next Match</div>
        <div class="flex justify-center flex-col items-center h-[70%] w-full">
            <div class="mt-4 flex items-center justify-between w-full max-w-xl mx-auto">
                <div class="flex flex-row items-center w-2/5 justify-end gap-2">
                    <span class="text-white font-semibold text-xs text-center truncate">{{ nextMatch.homeClub ?
                        nextMatch.homeClub.name : '' }}</span>
                    <img :src="nextMatch.homeClub ? apiConfig.TEAM_LOGOS_DIR + nextMatch.homeClub.clubCrest : ''"
                        alt="Club Logo" class="h-5 w-auto" />
                </div>
                <div class="flex flex-col items-center w-1/5">
                    <span class="text-gray-300 text-lg font-bold">{{ nextMatch.kickoff }}</span>
                </div>
                <div class="flex flex-row items-center gap-2 w-2/5 justify-start">
                    <img :src="nextMatch.awayClub ? apiConfig.TEAM_LOGOS_DIR + nextMatch.awayClub.clubCrest : ''"
                        alt="Opponent Logo" class="h-5 w-5" />
                    <span class="text-white font-semibold text-xs text-center truncate">{{ nextMatch.awayClub.name
                        }}</span>
                </div>
            </div>

            <div class="flex justify-center items-center w-full max-w-xl mx-auto mt-2">
                <span class="text-gray-400 text-xs">{{ nextMatch.league }} • {{ nextMatch.matchDate }}</span>
            </div>
        </div>
    </div>
</template>