<script setup>
import { defineProps, defineEmits } from 'vue';
import { Plus } from '@element-plus/icons-vue';

const props = defineProps({
    param: {
        type: Number,
        required: false,
        default: 1
    },
    playerIndex: {
        type: Number,
        required: false,
        default: 0
    }
});
const emit = defineEmits(['clickToAddPlayer']);

</script>

<template>
    <div class="bg-[#28002b] flex flex-col gap-2 items-center justify-center rounded-xl flex-1 p-5 h-auto">
        <button
            class="flex items-center justify-center rounded-full bg-[#3e003f] w-10 h-10 hover:bg-[#55005a] cursor-pointer"
            @click="emit('clickToAddPlayer', props.param, props.playerIndex)">
            <el-icon>
                <Plus class="text-white" />
            </el-icon>
        </button>
        <span class="text-white text-xs">Click + to add player</span>
    </div>
</template>