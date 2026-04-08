<script setup>
import { defineProps } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';

const apiConfig = useApiConfig();

const props = defineProps({
    match: {
        type: Object,
        required: true,
        default: () => ({
            matchId: 0,
            homeTeamName: '',
            homeTeamScore: '',
            homeTeamClubCrest: null,
            homeTeamThemeColor: null,
            awayTeamName: '',
            awayTeamScore: '',
            awayTeamClubCrest: null,
            awayTeamThemeColor: null,
            kickoffStatus: null,
            isGameFinish: null,
            matchDate: null,
            matchTime: null,
        }),
    },
    borderStyle:{
        type: String,
        default: 'none'
    }
});

const formatDate = (dateString) =>
{
    const date = new Date(dateString)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`
}

const formatTime = (timeString) =>
{
    const date = new Date(`1970-01-01T${timeString}`) // base date to parse time only
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })
}
</script>

<template>
    <div class="!bg-[#4b1254] rounded-2xl  p-4 shadow-lg" :style="{border: borderStyle}">
        <div class="flex justify-between items-center mb-4">
            <span class="text-xs text-white">Premier League</span>
            <span v-if="match.kickoffStatus == 2"
                class="text-xs px-2 py-1 bg-green-900 text-green-300 rounded-full">FT</span>
            <span v-else-if="match.kickoffStatus == 1"
                class="text-xs px-2 py-1 bg-gray-700 text-gray-300 rounded-full">Upcoming</span>
            <span v-else-if="match.kickoffStatus == 0"
                class="text-xs px-2 py-1 bg-red-700 text-gray-300 rounded-full">Live</span>
        </div>

        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2">
                <div class="w-10 h-10  rounded-2xl flex items-center justify-center"
                    :style="{ backgroundColor: match.homeTeamThemeColor }">
                    <img :src="apiConfig.TEAM_LOGOS_DIR + match.homeTeamClubCrest" :alt="match.homeTeamName"
                        class="h-8 w-8 object-contain" />
                </div>
                <span class="text-white font-medium">{{ match.homeTeamName }}</span>
            </div>
            <div v-if="match.homeTeamScore" class="text-white text-xl font-bold">{{ match.homeTeamScore }}</div>
            <div v-else-if="match.homeTeamScore == 0 && match.kickoffStatus == 2" class="text-white text-xl font-bold">0
            </div>
            <div v-else class="text-white text-xl font-bold">-</div>
        </div>

        <div class="flex justify-between items-center">
            <div class="flex items-center space-x-2">
                <div class="w-10 h-10 rounded-2xl flex items-center justify-center"
                    :style="{ backgroundColor: match.awayTeamThemeColor }">
                    <img :src="apiConfig.TEAM_LOGOS_DIR + match.awayTeamClubCrest" :alt="match.awayTeamName"
                        class="h-8 w-8 object-contain" />

                </div>
                <span class="text-white font-medium">{{ match.awayTeamName }}</span>
            </div>
            <div v-if="match.awayTeamScore" class="text-white text-xl font-bold">{{ match.awayTeamScore }}</div>
            <div v-else-if="match.awayTeamScore == 0 && match.kickoffStatus == 2" class="text-white text-xl font-bold">0
            </div>
            <div v-else class="text-white text-xl font-bold">-</div>
        </div>

        <div v-if="match.kickoffStatus == 2" class="text-center text-xs text-white mt-4">Full Time</div>
        <div v-else class="text-center text-xs text-gray-400 mt-4">{{ formatDate(match.matchDate) }} • {{
            formatTime(match.matchTime) }}</div>
    </div>
</template>