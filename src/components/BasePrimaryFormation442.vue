<script setup>
import { defineProps } from 'vue';
import BasePrimaryFormationPlayer from './BasePrimaryFormationPlayer.vue';
const props = defineProps({
    players: {
        type: Array,
        required: true,
    }
})
</script>

<template>
    <div class="flex justify-center flex-col items-center  w-full h-full px-10">
        <!-- GK -->
        <div class="flex justify-center border-1 border-transparent w-full h-full">
            <BasePrimaryFormationPlayer :player="players[0]" />
        </div>
        <!-- DEF -->
        <div class="grid grid-cols-4 border-1 border-transparent w-full h-full">
            <BasePrimaryFormationPlayer :player="players[1]" />
            <BasePrimaryFormationPlayer :player="players[2]" />
            <BasePrimaryFormationPlayer :player="players[3]" />
            <BasePrimaryFormationPlayer :player="players[4]" />
        </div>
        <!-- MID -->
        <div class="grid grid-cols-4 border-1 border-transparent w-full h-full">
            <BasePrimaryFormationPlayer :player="players[5]" />
            <BasePrimaryFormationPlayer :player="players[6]" />
            <BasePrimaryFormationPlayer :player="players[7]" />
            <BasePrimaryFormationPlayer :player="players[8]" />
        </div>
        <!-- FWD -->
        <div class="grid grid-cols-2 border-1 border-transparent w-full h-full px-5">
            <BasePrimaryFormationPlayer :player="players[9]" />
            <BasePrimaryFormationPlayer :player="players[10]" />
        </div>
    </div>
</template>