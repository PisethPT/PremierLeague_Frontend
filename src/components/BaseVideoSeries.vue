<script setup>
import { defineProps, ref, onMounted, nextTick } from 'vue';
import { ArrowRight, ArrowLeft } from '@element-plus/icons-vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();

const props = defineProps({
    title: { type: String, required: true },
    series: {
        type: Array,
        required: true,
        default: () => []
    }
});

const scrollContainer = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const updateScrollState = () =>
{
    if (!scrollContainer.value) return;

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;

    isAtStart.value = scrollLeft <= 0;
    isAtEnd.value = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1;
};

const scroll = (direction) =>
{
    if (!scrollContainer.value) return;

    const scrollAmount = 350;

    scrollContainer.value.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
    });

    setTimeout(updateScrollState, 300);
};

const getSlug = (title) =>
    (title || '')
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

onMounted(async () =>
{
    await nextTick();
    updateScrollState();
});
</script>

<template>
    <div class="flex flex-col gap-5 bg-[#28002b] rounded-2xl w-full h-fit p-4 overflow-hidden">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">{{ props.title }}</span>

            <div v-if="props.series.length > 0" class="flex gap-2">
                <button
                    class="flex items-center justify-center rounded-full w-8 h-8 transition disabled:cursor-not-allowed"
                    :class="[isAtStart ? 'bg-[#1d001f] opacity-40' : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer']"
                    :disabled="isAtStart" @click="scroll('left')">
                    <el-icon>
                        <ArrowLeft class="text-white" />
                    </el-icon>
                </button>

                <button
                    class="flex items-center justify-center rounded-full w-8 h-8 transition disabled:cursor-not-allowed"
                    :class="[isAtEnd ? 'bg-[#1d001f] opacity-40' : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer']"
                    :disabled="isAtEnd" @click="scroll('right')">
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
            </div>
        </div>

        <div v-if="props.series.length > 0">
            <div ref="scrollContainer" @scroll="updateScrollState"
                class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none scroll-smooth"
                style="scroll-snap-type: x mandatory;">

                <div v-for="item in props.series" :key="item.videoId"
                    class="flex flex-col gap-2 rounded-2xl h-fit flex-none" style="scroll-snap-align: start;">

                    <div
                        class="flex bg-[#4b1254] rounded-2xl w-[220px] h-[350px] xl:w-[335px] xl:h-[500px] relative overflow-hidden group">

                        <img :src="item.thumbnail || '/images/placeholder.jpg'"
                            class="absolute inset-0 w-full h-full object-cover" />

                        <a v-if="item.isReference && item.referenceUrl" :href="item.referenceUrl" target="_blank"
                            class="flex justify-center items-center w-full h-full z-10 transition-colors"></a>

                        <router-link v-else :to="{
                            name: 'video-viewer',
                            params: {
                                videoId: String(item.videoId),
                                videoTitle: getSlug(item.title)
                            }
                        }" class="flex justify-center items-center w-full h-full z-10 transition-colors"></router-link>
                    </div>

                    <span class="text-white text-md font-bold text-wrap w-[220px] xl:w-[335px] line-clamp-2">
                        {{ item.title }}
                    </span>
                </div>
            </div>
        </div>

        <div v-else class="w-full flex justify-center items-center py-10">
            <span class="text-white opacity-30">Data not available</span>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none;
}

.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>