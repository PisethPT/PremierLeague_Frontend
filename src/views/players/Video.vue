<script setup>
import
{
    CaretRight,
} from '@element-plus/icons-vue';
</script>

<template>
    <div class="flex flex-1 flex-col gap-4">
        <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
            <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div v-for="(value, index) in 3" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                    <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                        <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                        <div
                            class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>
                    <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                        Maxime, inventore.</span>
                </div>
            </div>

            <div class="flex flex-col gap-4">
                <span class="text-white text-xs">Fantasy Premier League</span>
                <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <div v-for="(value, index) in 2" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                        <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                            <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                            <div
                                class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                <el-icon>
                                    <CaretRight class="text-white" />
                                </el-icon>
                            </div>
                        </div>
                        <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                            Maxime, inventore.</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>