<script setup>
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
</script>

<template>
    <div class="flex flex-1 flex-col gap-4">
        <div class="flex justify-center items-center w-full gap-10">
            <button
                class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8 hover:bg-[#55005a] cursor-pointer">
                <el-icon>
                    <ArrowLeft class="text-white" />
                </el-icon>
            </button>
            <span class="text-white text-xl font-bold">November</span>
            <button
                class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8 hover:bg-[#55005a] cursor-pointer">
                <el-icon>
                    <ArrowRight class="text-white" />
                </el-icon>
            </button>
        </div>
        <div class="!bg-[#28002b] rounded-2xl h-[500px] w-full p-4"></div>
    </div>
</template>