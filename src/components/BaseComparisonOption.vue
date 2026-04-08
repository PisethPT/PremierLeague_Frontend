<script setup>
import { defineProps, defineEmits } from 'vue';
import BaseComparisonsFields from './BaseComparisonsFields.vue';
import { ArrowDown, ArrowUp } from '@element-plus/icons-vue';

const emit = defineEmits(['toggleOptionsVisibility']);
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    isOptionsVisible: {
        type: Boolean,
        required: true
    },
    comparisonsFields: {
        type: Array,
        required: true,
        default: () => []
    },
    selectedPlayer1: {
        type: Object,
        required: true
    },
    selectedPlayer2: {
        type: Object,
        required: true
    },

});
</script>

<template>
    <div class="flex flex-col gap-5 cursor-pointer" v-if="selectedPlayer1 && selectedPlayer2"
        @click="$emit('toggleOptionsVisibility', isOptionsVisible)">
        <div class="flex justify-between items-center">
            <div class="text-white text-2xl font-bold">{{ props.title }}</div>
            <button
                class="flex items-center justify-center rounded-full bg-[#37003c] w-8 h-8 hover:bg-[#55005a] cursor-pointer">
                <el-icon>
                    <component :is="isOptionsVisible ? ArrowUp : ArrowDown" class="text-white" />
                </el-icon>
            </button>
        </div>
        <div class="flex flex-col"
            :style="{ display: isOptionsVisible ? 'flex' : 'none', gap: isOptionsVisible ? '1.25rem' : '0' }">
            <div v-for="(comparison, index) in props.comparisonsFields" :key="index"
                class="grid grid-cols-[50px_1fr_50px]">
                <span class="text-white font-bold text-md border-l-4 ps-4"
                    :style="{ borderColor: comparison.playerOneMark === true ? props.selectedPlayer1.club.clubTheme : 'transparent' }">{{
                        comparison.playerOnePoint }}</span>
                <span class="text-white font-normal text-md text-center">{{ comparison.label }}</span>
                <span class="text-white font-bold text-md text-end justify-self-end truncate border-r-4 pe-4"
                    :style="{ borderColor: comparison.playerTwoMark === true ? props.selectedPlayer2.club.clubTheme : 'transparent' }">{{
                        comparison.playerTwoPoint }}</span>
            </div>
        </div>
    </div>
</template>