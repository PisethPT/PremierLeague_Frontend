<script setup>
import { ref } from 'vue';
import
{
    ArrowDown,
} from '@element-plus/icons-vue';
</script>

<template>
    <button
        class="bg-transparent text-center text-sm text-white px-3 py-2 rounded-md border-2 border-[#3e003f] w-fit cursor-pointer">2025/25
        <el-icon>
            <ArrowDown />
        </el-icon>
    </button>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        <div class="!bg-[#28002b] flex flex-1 flex-col rounded-2xl h-[550px] w-full p-4">
            <span class="text-white text-xl font-bold">Goalkeepers</span>
        </div>

        <div class="!bg-[#28002b] flex flex-1 flex-col rounded-2xl h-[550px] w-full p-4">
            <span class="text-white text-xl font-bold">Midfielders</span>
        </div>

        <div class="!bg-[#28002b] flex flex-1 flex-col rounded-2xl h-[550px] w-full p-4">
            <span class="text-white text-xl font-bold">Defenders</span>
        </div>

        <div class="!bg-[#28002b] flex flex-1 flex-col rounded-2xl h-[550px] w-full p-4">
            <span class="text-white text-xl font-bold">Forwards</span>
        </div>
    </div>
</template>