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
            matches: [],
        })
    },
    isLoading: {
        type: Boolean,
        default: false
    }
});

const handleImageError = (event) =>
{
    // Hide only the broken icon, keeping the w-7 h-7 frame visible
    event.target.style.display = 'none';
};
</script>

<template>
    <div class="flex flex-col">
        <template v-if="props.isLoading">
            <div class="h-6 w-40 bg-[#28002b] rounded-md shimmer-bg mb-4 ml-1"></div>
            <div v-for="i in 3" :key="'skel-' + i" class="flex flex-col items-center mb-0">
                <div
                    class="h-[70px] w-[300px] sm:w-[400px] md:w-[500px] lg:w-[600px] xl:w-[700px] bg-[#28002b] rounded-md shimmer-bg">
                </div>
                <div class="bg-[#54025c] h-[2px] w-[200px] my-2 opacity-30"></div>
            </div>
        </template>

        <template v-else>
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

                            <div
                                class="w-7 h-7 min-w-[28px] min-h-[28px] bg-[#37003c] shimmer-bg rounded-md flex items-center justify-center overflow-hidden">
                                <img :src="apiConfig.CLUB_DIR + match.homeClubCrest" @error="handleImageError"
                                    :alt="match.homeClubName" class="w-full h-full object-contain p-0.5">
                            </div>
                        </div>

                        <span v-if="match.kickoffStatus === 'Upcoming'"
                            class="text-white text-center font-bold text-lg">
                            {{ match.matchTime }}
                        </span>

                        <div v-else-if="match.kickoffStatus === 'FT'" class="flex flex-col justify-start gap-2">
                            <span class="bg-[#1e0021] text-white text-md font-bold !py-[2px] rounded-md text-center">
                                {{ match.homeClubGoal }} : {{ match.awayClubGoal }}
                            </span>
                            <span class="text-white text-xs font-bold text-center">{{ match.kickoffStatus }}</span>
                        </div>

                        <div class="flex justify-start items-center gap-2">
                            <div
                                class="w-7 h-7 min-w-[28px] min-h-[28px] bg-[#37003c] shimmer-bg rounded-md flex items-center justify-center overflow-hidden">
                                <img :src="apiConfig.CLUB_DIR + match.awayClubCrest" @error="handleImageError"
                                    :alt="match.awayClubName" class="w-full h-full object-contain p-0.5">
                            </div>

                            <span
                                class="text-white text-xs xl:text-sm font-bold inline-block max-w-[100px] sm:max-w-[140px] truncate"
                                :title="match.awayClubName">{{ match.awayClubName }}</span>
                        </div>
                    </div>
                </router-link>

                <div class="bg-[#54025c] h-[2px] w-[200px]"></div>
            </div>
        </template>
    </div>
</template>

<style scoped>
@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

.shimmer-bg {
    background: linear-gradient(90deg,
            #37003c 25%,
            #4b1254 50%,
            #37003c 75%);
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite linear;
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>