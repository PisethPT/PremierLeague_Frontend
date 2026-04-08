<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    comparisons: {
        typeof: Object,
        require: false,
        default:
        {
            playerOne: {
                info: {
                    name: '',
                    photo: '',
                    shortPosition: '',
                },
                club: {
                    name: '',
                    clubCrest: '',
                    clubTheme: '',
                },
                sessions: '2025/26',
            },
            playerTwo: {
                info: {
                    name: '',
                    photo: '',
                    shortPosition: '',
                },
                club: {
                    name: '',
                    clubCrest: '',
                    clubTheme: '',
                },
                sessions: '2025/26',
            },
            comparisonsFields: [
                {
                    label: 'Labels',
                    playerOnePoint: 'N/A',
                    playerTwoPoint: 'N/A',
                    playerOneMark: true,
                    playerTwoMark: false,
                },
            ],
        },
    },
});
</script>

<template>
    <div v-for="(comparison, index) in props.comparisons.comparisonsFields" :key="index"
        class="grid grid-cols-[50px_1fr_50px]">
        <span class="text-white font-bold text-md border-l-4 ps-4"
            :style="{ borderColor: comparison.playerOneMark === true ? props.comparisons.playerOne.club.clubTheme : 'transparent' }">{{
                comparison.playerOnePoint }}</span>
        <span class="text-white font-normal text-md text-center">{{ comparison.label }}</span>
        <span class="text-white font-bold text-md text-end border-r-4 pe-4"
            :style="{ borderColor: comparison.playerTwoMark === true ? props.comparisons.playerTwo.club.clubTheme : 'transparent' }">{{
                comparison.playerTwoPoint }}</span>
    </div>
</template>