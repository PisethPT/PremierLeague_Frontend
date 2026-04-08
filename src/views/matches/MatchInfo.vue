<script setup>
import { ref } from 'vue';
const matchDetails = ref({
    kickoffDate: 'Sat 8 November 2025',
    kickoffTime: '19:30',
    stadium: 'Tottenham Hotspur Stadium',
    city: 'London',
    attendance: 61210,
});
const matchOfficials = ref({
    referee: 'Samuel Barrott',
    assistantRefereeOne: 'Timothy Wood',
    assistantRefereeTwo: 'Nick Greenhalgh',
    fourthOfficial: 'Robert Jones',
    VAR: 'John Brooks',
    VARAssistant: 'Tony Harrington',
});
</script>

<template>
    <div class="grid grid-rows-2 lg:grid-rows-none lg:grid-cols-2 gap-4">
        <div class="bg-[#28002b] flex flex-col gap-2 w-full h-57 rounded-2xl p-4">
            <h2 class="text-white text-lg font-bold">Match Details</h2>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Kickoff</span>
                <span class="text-white text-sm font-bold">{{ matchDetails.kickoffDate }}, {{ matchDetails.kickoffTime
                }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Stadium</span>
                <span class="text-white text-sm font-bold">{{ matchDetails.stadium }}, {{ matchDetails.city }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Attendance</span>
                <span class="text-white text-sm font-bold">{{ matchDetails.attendance.toLocaleString() }}</span>
            </div>

        </div>
        <div class="bg-[#28002b] flex flex-col gap-2 w-full h-57 rounded-2xl p-4">
            <h2 class="text-white text-lg font-bold">Match Officials</h2>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Referee</span>
                <span class="text-white text-sm font-bold">{{ matchOfficials.referee }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Assistant Referee #1</span>
                <span class="text-white text-sm font-bold">{{ matchOfficials.assistantRefereeOne }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Assistant Referee #2</span>
                <span class="text-white text-sm font-bold">{{ matchOfficials.assistantRefereeTwo }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">Fourth Official</span>
                <span class="text-white text-sm font-bold">{{ matchOfficials.fourthOfficial }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">VAR</span>
                <span class="text-white text-sm font-bold">{{ matchOfficials.VAR }}</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-gray-400 text-sm">VAR Assistant</span>
                <span class="text-white text-sm font-bold">{{ matchOfficials.VARAssistant }}</span>
            </div>
        </div>
    </div>
</template>