<script setup>
import { defineProps } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';

const apiConfig = useApiConfig();
const props = defineProps({
    matchInfo: {
        type: Object,
        required: true,
        default: () => ({
            matchDate: '',
            matches: [
                {
                    matchId: 0,
                    matchDate: '',
                    kickoffTime: '',
                    homeClubName: '',
                    awayClubName: '',
                    homeClubCrest: '',
                    awayClubCrest: '',
                    homeClubTheme: '',
                    awayClubTheme: '',
                    homeClubGoal: '',
                    awayClubGoal: '',
                    kickoffStatus: '',
                    isGameFinished: '',
                },
            ],
        })
    }
});
</script>

<template>
    <div class="flex flex-col">
        <span class="text-white text-md font-bold mb-4">{{ matchInfo.matchDate }}</span>
        <div v-for="match in props.matchInfo.matches" :key="match.matchId"
            class="flex flex-col items-center gap-0 mb-0">
            <router-link :to="{
                name: 'matches-detail',
                params: {
                    matchId: match.matchId,
                    matchTitle: `${match.homeClubName.toLowerCase().replace(/\s+/g, '-')}-vs-${match.awayClubName.toLowerCase().replace(/\s+/g, '-')}`
                },
                query: { tab: 'recap' }
            }">
                <div
                    class="grid grid-cols-[1fr_50px_1fr] gap-4 items-start hover:bg-[#37003c] p-3 w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px]">
                    <div class="flex justify-end items-center gap-2">
                        <span
                            class="text-white text-xs xl:text-sm font-bold inline-block max-w-[100px] sm:max-w-[140px] truncate"
                            :title="match.homeClubName">{{ match.homeClubName }}</span>
                        <img :src="apiConfig.CLUB_DIR + match.homeClubCrest" :alt="match.homeClubName" srcset=""
                            class="w-7 h-7 object-contain">
                    </div>

                    <span v-if="match.kickoffStatus === 'Upcoming'" class="text-white text-center font-bold text-lg">{{
                        match.matchTime }}</span>
                    <div v-else-if="match.kickoffStatus === 'FT'" class="flex flex-col justify-start gap-2">
                        <span class="bg-[#1e0021] text-white text-md font-bold !py-[2px] rounded-md text-center">{{
                            match.homeClubGoal }} : {{ match.awayClubGoal }}</span>
                        <span class="text-white text-xs font-bold text-center">{{ match.kickoffStatus }}</span>
                    </div>

                    <div class="flex justify-start items-center gap-2">
                        <img :src="apiConfig.CLUB_DIR + match.awayClubCrest" :alt="match.awayClubName"
                            class="w-7 h-7 object-contain">
                        <span
                            class="text-white text-xs xl:text-sm font-bold inline-block max-w-[100px] sm:max-w-[140px] truncate"
                            :title="match.awayClubName">{{ match.awayClubName }}</span>
                    </div>
                </div>
            </router-link>
            <div class="bg-[#54025c] h-[2px] w-[200px]"></div>
        </div>
    </div>
</template>

<style scoped></style>