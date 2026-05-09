<script setup>
import { defineProps } from 'vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();
const props = defineProps({
    matchDate: {
        type: String,
        required: true
    },
    match: {
        type: Object,
        required: true,
        default: () => ({
            matchId: '',
            homeClubName: '',
            awayClubName: '',
            homeClubCrest: '',
            awayClubCrest: '',
            matchTime: '',
            kickoffStatus: '',
            homeClubGoal: '',
            awayClubGoal: '',
        })
    },
})
</script>

<template>
    <section class="mb-4">
        <div class="flex justify-between items-center px-4 mb-3">
            <span class="text-white text-md font-bold">
                {{ props.matchDate }}
            </span>
        </div>

        <div class="flex flex-col items-center w-full">
            <div v-if="match" class="w-full flex justify-center">
                <router-link :to="{
                    name: 'matches-detail',
                    params: {
                        matchId: match.matchId,
                        matchTitle: `${match.homeClubName}-vs-${match.awayClubName}`
                    },
                    // query: { tab: 'recap' }
                }" class="w-full">
                    <div
                        class="flex flex-col md:flex-row md:items-center md:justify-between p-3 hover:bg-[#37003c] transition gap-2">
                        <div class="w-15">
                            <span v-if="match.kickoffStatus === 'FT'" class="text-white text-[11px] text-start">
                                {{ match.kickoffStatus }}
                            </span>
                        </div>

                        <div class="grid grid-cols-[1fr_60px_1fr] items-center gap-4 w-full">
                            <div class="flex justify-end items-center gap-2">
                                <span
                                    class="text-white text-xs xl:text-sm font-bold truncate max-w-[100px] sm:max-w-[140px]"
                                    :title="match.homeClubName">
                                    {{ match.homeClubName }}
                                </span>
                                <img :src="apiConfig.CLUB_DIR + match.homeClubCrest" :alt="match.homeClubName"
                                    class="w-7 h-7 object-contain" />
                            </div>
                            <span v-if="match.kickoffStatus === 'Upcoming'"
                                class="text-white text-center font-bold text-lg">
                                {{ match.kickoffTime }}
                            </span>

                            <div v-else-if="match.kickoffStatus === 'FT'" class="flex flex-col items-center gap-1">
                                <span class="bg-[#1e0021] text-white text-lg font-bold px-2 py-[2px] rounded-md">
                                    {{ match.homeClubGoal }} : {{ match.awayClubGoal }}
                                </span>
                            </div>
                            <div class="flex justify-start items-center gap-2">
                                <img :src="apiConfig.CLUB_DIR + match.awayClubCrest" :alt="match.awayClubName"
                                    class="w-7 h-7 object-contain" />
                                <span
                                    class="text-white text-xs xl:text-sm font-bold truncate max-w-[100px] sm:max-w-[140px]"
                                    :title="match.awayClubName">
                                    {{ match.awayClubName }}
                                </span>
                            </div>
                        </div>
                        <div class="w-15">
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
    </section>
</template>