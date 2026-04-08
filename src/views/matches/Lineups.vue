<script setup>
import { useApiConfig } from '@/stores/apiConfig';
const apiConfig = useApiConfig();
</script>

<template>
    <div
        class="bg-[#28002b] grid grid-rows-[auto_1fr_auto] w-full h-[2200px] lg:h-[1150px] rounded-2xl overflow-hidden">
        <div class="flex justify-between items-start lg:items-center border-b-2 border-[#4b1254] h-fit py-4">
            <div class="flex flex-col lg:flex-row lg:justify-start items-start lg:items-center gap-1 lg:gap-3 ms-6">
                <div class="flex gap-4">
                    <img :src="apiConfig.TEAM_LOGOS_DIR + ('tot.svg' || '')" :alt="'spurs' || 'Home club logo'"
                        class="w-auto h-6 md:h-8 object-contain" loading="lazy" />
                    <span class="text-white text-sm lg:text-lg font-bold truncate text-center">Spurs</span>
                </div>

                <div class="flex lg:hidden justify-start items-center gap-3">
                    <span class="text-gray-400 text-xs lg:text-md truncate text-center">Manager</span>
                    <span class="text-white text-sm lg:text-lg font-bold truncate text-center">Thomas Frank</span>
                </div>

                <div class="hidden lg:flex justify-start items-center gap-3">
                    <span class="text-gray-400 text-md truncate text-center">Formation</span>
                    <span class="text-white text-lg font-bold truncate text-center">4-2-3-1</span>
                </div>
            </div>

            <div class="hidden lg:flex justify-end items-center gap-3 me-6">
                <img :src="apiConfig.TEAM_LOGOS_DIR + ('menu.svg' || '')" :alt="'man utd' || 'Away club logo'"
                    class="w-auto h-6 md:h-8 object-contain" loading="lazy" />
                <span class="text-white text-sm lg:text-lg font-bold truncate text-center">Man Utd</span>

                <span class="text-gray-400 text-md truncate text-center">Formation</span>
                <span class="text-white text-lg font-bold truncate text-center">3-4-2-1</span>
            </div>

            <div class="flex lg:hidden justify-end items-center gap-3 me-6">
                <span class="text-gray-400 text-xs lg:text-md truncate text-center">Formation</span>
                <span class="text-white text-sm lg:text-lg font-bold truncate text-center">4-2-3-1</span>
            </div>
        </div>

        <div class="grid rows-2 lg:grid-rows-none lg:grid-cols-2 relative">
            <div class="border-b-1 lg:border-b-0 lg:border-e-1 border-[#4b1254] relative overflow-hidden">
                <div
                    class="absolute border-b-2 lg:border-x-0 lg:border-r-2 border-x-2 lg:border-y-2 border-[#4b1254] bg-[#28002b] w-[50%] lg:w-30 h-30 lg:h-[50%] top-0 lg:top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 lg:-translate-y-1/2 z-10">
                </div>
                <div
                    class="absolute border-b-2 lg:border-x-0 lg:border-r-2 border-x-2 lg:border-y-2 border-[#4b1254] w-[15%] lg:w-10 h-[20%] lg:h-[18%] top-0 lg:top-1/2 left-1/2 lg:left-0 transform -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 z-20">
                </div>
                <div
                    class="absolute w-35 h-35 rounded-full border-2 border-[#4b1254] top-4 lg:top-1/2 left-1/2 lg:left-4 transform -translate-x-1/2 lg:translate-x-0 translate-y-0 lg:-translate-y-1/2">
                </div>
            </div>

            <div
                class="absolute w-35 h-35 rounded-full border-2 border-[#4b1254] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            </div>

            <div class="border-t-1 lg:border-t-0 lg:border-s-1 border-[#4b1254] relative">
                <div
                    class="absolute border-t-2 lg:border-x-0 lg:border-l-2 border-x-2 lg:border-y-2 border-[#4b1254] bg-[#28002b] w-[50%] lg:w-30 h-30 lg:h-[50%] bottom-0 lg:top-1/2 right-1/2 lg:right-0 transform translate-x-1/2 lg:translate-x-0 translate-y-0 lg:-translate-y-1/2 z-10">
                </div>
                <div
                    class="absolute border-t-2 lg:border-x-0 lg:border-l-2 border-x-2 lg:border-y-2 border-[#4b1254] w-[15%] lg:w-10 h-[10%] lg:h-[18%] bottom-0 lg:top-1/2 right-1/2 lg:right-0 transform translate-x-1/2 lg:translate-x-0 translate-y-0 lg:-translate-y-1/2 z-20">
                </div>
                <div
                    class="absolute w-35 h-35 rounded-full border-2 border-[#4b1254] bottom-4 lg:top-1/2 right-1/2 lg:right-4 transform translate-x-1/2 lg:translate-x-0 translate-y-0 lg:-translate-y-1/2 ">
                </div>

            </div>
        </div>

        <div class="flex justify-between items-start border-t-2 border-[#4b1254] h-auto py-4">
            <div class="flex flex-col lg:flex-row lg:justify-start items-start lg:items-center gap-1 lg:gap-3 ms-6">
                <div class="flex lg:hidden gap-4">
                    <img :src="apiConfig.TEAM_LOGOS_DIR + ('menu.svg' || '')" :alt="'man utd' || 'Away club logo'"
                        class="w-auto h-6 md:h-8 object-contain" loading="lazy" />
                    <span class="text-white text-sm lg:text-lg font-bold truncate text-center">Man Utd</span>
                </div>

                <div class="flex lg:hidden justify-start items-center gap-3">
                    <span class="text-gray-400 text-xs lg:text-md truncate text-center">Manager</span>
                    <span class="text-white text-sm lg:text-lg font-bold truncate text-center">Roben Amorim</span>

                </div>

                <div class="hidden lg:flex justify-start items-center gap-3">
                    <span class="text-gray-400 text-md truncate text-center">Manager</span>
                    <span class="text-white text-sm lg:text-lg font-bold truncate text-center">Thomas Frank</span>
                </div>
            </div>


            <div class="hidden lg:flex justify-end items-center gap-3 me-6">
                <span class="text-gray-400 text-md truncate text-center">Manager</span>
                <span class="text-white text-sm lg:text-lg font-bold truncate text-center">Roben Amorim</span>
            </div>

            <div class="flex lg:hidden justify-end items-center gap-3 me-6">
                <span class="text-gray-400 text-xs lg:text-md truncate text-center">Formation</span>
                <span class="text-white text-sm lg:text-lg font-bold truncate text-center">4-2-3-1</span>
            </div>
        </div>

    </div>

    <div class="bg-[#28002b] flex flex-col gap-4 w-full h-full rounded-2xl px-4 py-4">
        <span class="text-white text-xl font-bold">Substitutes</span>

        <div class="flex flex-col lg:flex-row h-full w-full">
            <div class="w-full h-full border-b border-[#4b1254] lg:border-b-0 lg:border-r">
            </div>
            <div class="w-full h-full border-t border-[#4b1254] lg:border-t-0 lg:border-l">
            </div>

        </div>
    </div>
</template>