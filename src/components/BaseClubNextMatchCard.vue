<script setup>
import { ref, defineProps } from 'vue';

const props = defineProps({
    nextMatch: {
        type: Object,
        required: false,
        default: () => ({
            matchId: 0,
            matchDate: '',
            kickoffTime: '',
            competition: '',
            homeClubName: '',
            awayClubName: '',
            homeClubCrest: '',
            awayClubCrest: '',
        })
    },
});

</script>

<template>
    <div class="!bg-[#28002b] grid grid-rows-3 rounded-2xl h-[228px] w-full p-4">
        <div class="font-bold text-md text-white items-start">Next Match</div>
        <router-link :to="{
            name: 'matches-detail',
            params: {
                matchId: nextMatch.matchId,
                matchTitle: `${nextMatch.homeClubName.toLowerCase().replace(/\s+/g, '-')}-vs-${nextMatch.awayClubName.toLowerCase().replace(/\s+/g, '-')}`
            },
            query: { tab: 'recap' }
        }" v-if="nextMatch && nextMatch.matchId !== 0"
            class="flex justify-center flex-col items-center p-4 h-fit w-full hover:bg-[#37003c] hover:cursor-pointer">
            <div class="flex items-center justify-between w-full max-w-xl mx-auto">
                <div class="flex flex-row items-center w-2/5 justify-end gap-2">
                    <span class="text-white font-semibold text-xs text-center truncate">{{
                        nextMatch.homeClubName }}</span>
                    <img :src="nextMatch.homeClubCrest" class="h-5 w-auto" />
                </div>
                <div class="flex flex-col items-center w-1/5">
                    <span class="text-gray-300 text-lg font-bold">{{ nextMatch.kickoffTime }}</span>
                </div>
                <div class="flex flex-row items-center gap-2 w-2/5 justify-start">
                    <img :src="nextMatch.awayClubCrest" class="h-5 w-5" />
                    <span class="text-white font-semibold text-xs text-center truncate">{{
                        nextMatch.awayClubName }}</span>
                </div>
            </div>

            <div class="flex justify-center items-center w-full max-w-xl mx-auto mt-2">
                <span class="text-gray-400 text-xs">{{ nextMatch.competition }} • {{ nextMatch.matchDate }}</span>
            </div>
        </router-link>
        <div v-else class="flex justify-center flex-col items-center">
            <span class="text-white opacity-30 text-center font-normal">
                No matches available
            </span>
        </div>
    </div>
</template>