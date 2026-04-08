<script setup>
import { ArrowDown, ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
</script>

<template>
    <div class="flex flex-1 flex-col gap-4">

        <button class="bg-transparent text-center text-sm text-white px-3 py-2 rounded-md border-2 border-[#3e003f] w-fit cursor-pointer">2025/25
            <el-icon>
                <ArrowDown />
            </el-icon>
        </button>

        <div class="flex justify-center items-center w-full gap-10">
            <button
                class="flex items-center justify-center rounded-full bg-[#4b1254] w-10 h-10 hover:bg-[#6c0472] cursor-pointer">
                <el-icon>
                    <ArrowLeft class="text-white" />
                </el-icon>
            </button>
            <div class="flex justify-center items-center flex-col">
                <span class="text-white text-xl font-bold">November</span>
            </div>
            <button
                class="flex items-center justify-center rounded-full bg-[#4b1254] w-10 h-10 hover:bg-[#6c0472] cursor-pointer">
                <el-icon>
                    <ArrowRight class="text-white" />
                </el-icon>
            </button>
        </div>
        <div class="!bg-[#28002b] rounded-2xl h-[500px] w-full p-4"></div>
    </div>
</template>