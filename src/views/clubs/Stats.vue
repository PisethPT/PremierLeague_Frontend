<script setup>
import { ArrowDown, } from '@element-plus/icons-vue'
</script>

<template>

    <div class="flex flex-1 flex-col gap-3">
        <button
            class="bg-transparent text-center text-sm text-white px-3 py-2 rounded-md border-2 border-[#3e003f] w-fit cursor-pointer">2025/25
            <el-icon>
                <ArrowDown />
            </el-icon>
        </button>
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-3 w-full">
            <div class="flex flex-col gap-2 bg-[#28002b] rounded-md h-fit p-4">
                <span class="text-white text-md font-bold">Games Played</span>
                <span class="text-white text-4xl font-bold">10</span>
            </div>

            <div class="flex flex-col gap-2 bg-[#28002b] rounded-md h-fit p-4">
                <span class="text-white text-md font-bold">Goals</span>
                <span class="text-white text-4xl font-bold">18</span>
            </div>

            <div class="flex flex-col gap-2 bg-[#28002b] rounded-md h-fit p-4">
                <span class="text-white text-md font-bold">Goals Canceled</span>
                <span class="text-white text-4xl font-bold">3</span>
            </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-2 gap-3 w-full">
            <div class="grid grid-cols-2 bg-[#28002b] rounded-2xl h-[500px] p-4"></div>
            <div class="grid grid-cols-2 bg-[#28002b] rounded-2xl h-[500px] p-4"></div>
            <div class="grid grid-cols-2 bg-[#28002b] rounded-2xl h-[205px] p-4"></div>
            <div class="grid grid-cols-2 bg-[#28002b] rounded-2xl h-[205px] p-4"></div>
        </div>

        <div class="!bg-[#28002b] rounded-2xl h-[205px] w-full p-4"></div>
    </div>
</template>