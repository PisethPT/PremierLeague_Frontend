<script setup>
import { ref, onMounted } from 'vue';
import
{
    CaretRight,
    ArrowRight,
    ArrowLeft,
} from '@element-plus/icons-vue';

const isAtStart = ref(true);
const isAtEnd = ref(false);
const allTwentyMinuteReplays = ref(10);
const startYearOfTwentyMinuteReplays = ref(2024);

onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });
});

const scrollAwards = (direction) =>
{
    const container = awardsContainer.value
    if (!container) return

    const scrollAmount = 335
    const behavior = "smooth"

    if (direction === "left")
    {
        container.scrollBy({ left: -scrollAmount, behavior })
    } else if (direction === "right")
    {
        container.scrollBy({ left: scrollAmount, behavior })
    }

    // recheck after scroll animation
    setTimeout(checkScroll, 200)
}

const checkScroll = () =>
{
    const container = awardsContainer.value
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    isAtStart.value = scrollLeft <= 5
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 5
}

</script>

<template>
    <!-- 2016/17 - 2024/25 -->
    <div v-for="(years, index) in allTwentyMinuteReplays" :key="index"
        class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">{{ startYearOfTwentyMinuteReplays - index }}/{{
                ((startYearOfTwentyMinuteReplays - index) + 1).toString().slice(2) }}</span>
            <div class="flex gap-2">
                <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                    isAtStart
                        ? 'bg-[#1d001f] opacity-40'
                        : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                ]" :disabled="isAtStart" @click="scrollAwards('left')">
                    <el-icon>
                        <ArrowLeft class="text-white" />
                    </el-icon>
                </button>
                <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                    isAtEnd
                        ? 'bg-[#1d001f] opacity-40'
                        : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                ]" :disabled="isAtEnd" @click="scrollAwards('right')">
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
                <a href="#"
                    class="flex items-center justify-start rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-4 hover:underline whitespace-nowrap">
                    See All
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </a>
            </div>
        </div>
        <div ref="awardsContainer">
            <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                <div v-for="(value, index) in 6" :key="index" class="flex flex-col gap-2 rounded-2xl w-[300px] h-fit">
                    <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-[160px] relative overflow-hidden">
                        <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                        <div
                            class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>
                    <span class="text-white text-md font-bold text-wrap ">Lorem ipsum dolor sit amet,
                        consectetur
                        adipisicing
                        elit.
                        Maxime, inventore.</span>
                </div>
            </div>
        </div>
    </div>


</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>