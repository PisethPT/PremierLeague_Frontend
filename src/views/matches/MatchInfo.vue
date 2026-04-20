<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMatchStore } from '@/stores';

const matchStore = useMatchStore();
const route = useRoute();
const matchId = ref(route.params.matchId);

const matchDetails = ref(null);
const matchOfficials = ref([]);

onMounted(async () =>
{
    try
    {
        await matchStore.getMatchInfo({ matchId: matchId.value });
        matchDetails.value = matchStore.matchInfo.matchDetail;
        matchOfficials.value = JSON.parse(JSON.stringify(matchStore.matchInfo.matchOfficials));
    } catch (error)
    {
        console.error(error);
    }
});
</script>

<template>
    <div class="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 gap-4 h-fit">
        <div class="bg-[#28002b] flex flex-col gap-2 w-full rounded-2xl p-4">
            <h2 class="text-white text-lg font-bold">Match Details</h2>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Kickoff</span>
                <span class="text-white text-sm font-bold">{{ matchDetails?.kickoff }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Stadium</span>
                <span class="text-white text-sm font-bold">{{ matchDetails?.stadium }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Attendance</span>
                <span class="text-white text-sm font-bold">{{ matchDetails?.attendance }}</span>
            </div>

        </div>
        <div class="bg-[#28002b] flex flex-col gap-2 w-full rounded-2xl p-4">
            <h2 class="text-white text-lg font-bold">Match Officials</h2>
            <div v-for="referee in matchOfficials" :key="referee.refereeRole" class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">{{ referee.refereeRole }}</span>
                <span class="text-white text-sm font-bold">{{ referee.refereeName }}</span>
            </div>
        </div>
    </div>
</template>