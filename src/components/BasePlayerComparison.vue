<script setup>
import { defineProps, defineEmits } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';
import BaseComparisonsFields from './BaseComparisonsFields.vue';

const apiConfig = useApiConfig();
const emit = defineEmits(['viewFullComparison']);

const props = defineProps({
    comparisons: {
        typeof: Object,
        require: false,
        default:
        {
            playerOne: {
                id: 0,
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
                id: 0,
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
                }
            ],
        },
    },
});

</script>

<template>
    <div class="bg-[#28002b] flex flex-col rounded-2xl w-full h-142">
        <div class="w-full h-auto">
            <div class="mx-4 my-4 grid grid-cols-2 gap-2">
                <div class="bg-[#3e003f] rounded-2xl h-45 w-full p-2">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-center rounded-2xl h-27 w-full overflow-hidden pt-2"
                            :style="{ backgroundColor: props.comparisons.playerOne.club.clubTheme ?? '' }">
                            <img :src="props.comparisons.playerOne.info.photo ? apiConfig.PLAYER_LOGOS_DIR + props.comparisons.playerOne.info.photo : ''"
                                alt="Club Crest" class="w-25 h-25 object-contain mx-auto" />
                        </div>
                        <div class="grid grid-rows-2 gap-3">
                            <span
                                class="text-white text-[11px] sm:text-xs md:text-sm lg:text-sm font-bold text-center whitespace-nowrap p-0">{{
                                    props.comparisons.playerOne.info.name }}</span>
                            <div class=" flex justify-between">
                                <div class="flex gap-1 items-center">
                                    <img :src="props.comparisons.playerOne.club.clubCrest ? apiConfig.TEAM_LOGOS_DIR + props.comparisons.playerOne.club.clubCrest : ''"
                                        alt="" class="w-auto h-4 object-contain">
                                    <span class="text-white text-[10px]">{{ props.comparisons.playerOne.club.name
                                        }}</span>
                                </div>
                                <span class="text-white text-[10px]">{{ props.comparisons.playerOne.info.shortPosition
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="bg-[#3e003f] rounded-2xl h-45 w-full p-2">
                    <div class="flex flex-col gap-1">
                        <div class="flex justify-center rounded-2xl h-27 w-full overflow-hidden pt-2"
                            :style="{ backgroundColor: props.comparisons.playerTwo.club.clubTheme ?? '' }">
                            <img :src="props.comparisons.playerTwo.info.photo ? apiConfig.PLAYER_LOGOS_DIR + props.comparisons.playerTwo.info.photo : ''"
                                alt="Club Crest" class="w-25 h-25 object-contain mx-auto" />
                        </div>
                        <div class="grid grid-rows-2 gap-3">
                            <span
                                class="text-white text-[11px] sm:text-xs md:text-sm lg:text-sm font-bold text-center whitespace-nowrap p-0">{{
                                    props.comparisons.playerTwo.info.name }}</span>
                            <div class="flex justify-between">
                                <div class="flex gap-1 items-center">
                                    <img :src="props.comparisons.playerTwo.club.clubCrest ? apiConfig.TEAM_LOGOS_DIR + props.comparisons.playerTwo.club.clubCrest : ''"
                                        alt="" class="w-auto h-4 object-contain">
                                    <span class="text-white text-[10px]">{{ props.comparisons.playerTwo.club.name
                                        }}</span>
                                </div>
                                <span class="text-white text-[10px]">{{ props.comparisons.playerTwo.info.shortPosition
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-5">
            <div class="flex justify-between px-5">
                <span class="text-white font-bold text-md">{{ props.comparisons.playerOne.sessions }}</span>
                <span class="text-white font-normal text-md">Session</span>
                <span class="text-white font-bold text-md">{{ props.comparisons.playerTwo.sessions }}</span>
            </div>

            <BaseComparisonsFields :comparisons="props.comparisons" />
        </div>

        <div class="w-full px-4 py-4 mt-auto">
            <button class="bg-white text-xs text-[#28002b] rounded-2xl w-full h-8 hover:bg-gray-300 cursor-pointer"
                @click="emit('viewFullComparison', props.comparisons.playerOne.id, props.comparisons.playerTwo.id)">View
                full comparison
            </button>
        </div>
    </div>
</template>