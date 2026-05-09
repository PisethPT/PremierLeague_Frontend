<script setup>
import { defineProps, defineEmits, ref, onMounted, nextTick } from 'vue';
import { ArrowRight, ArrowLeft, CaretRight } from '@element-plus/icons-vue';
import router from '@/router';
import { useApi } from '@/stores/api';

const apiConfig = useApi();

const emits = defineEmits(['viewAll']);

const props = defineProps({
    title: { type: String, required: true },
    videos: {
        type: Array,
        required: true,
        default: () => []
    },
    allButtonTitle: { type: String, default: 'View more' },
    action: { type: String, default: '' },
    isAllButton: { type: Boolean, default: false },
    isPreviousAndNextButtons: { type: Boolean, default: true }
});

const scrollContainer = ref(null);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const updateScrollState = () =>
{
    if (!scrollContainer.value) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
    isAtStart.value = scrollLeft <= 0;
    isAtEnd.value = Math.ceil(scrollLeft + clientWidth) >= scrollWidth;
};

const scroll = (direction) =>
{
    if (!scrollContainer.value) return;
    const scrollAmount = 320;
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
    <div class="flex flex-col gap-5 bg-[#28002b] rounded-2xl w-full max-w-full overflow-hidden p-6">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">{{ props.title }}</span>

            <div class="flex gap-2">
                <div v-if="props.isPreviousAndNextButtons && props.videos.length > 0" class="flex gap-2">
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

                <button v-if="props.isAllButton && props.videos.length > 0" @click="router.push({ name: props.action })"
                    class="flex items-center rounded-full bg-[#3e003f] text-xs text-white h-8 px-4 hover:underline cursor-pointer whitespace-nowrap">
                    {{ props.allButtonTitle }}
                    <el-icon class="ml-1">
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
            </div>
        </div>

        <div v-if="props.videos.length > 0" class="w-full rounded-t-2xl relative overflow-hidden">
            <div ref="scrollContainer" @scroll="updateScrollState"
                class="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth" style="scroll-snap-type: x mandatory;">

                <div v-for="video in props.videos" :key="video.videoId"
                    class="flex flex-col gap-2 rounded-2xl flex-none w-[280px] md:w-[300px]"
                    style="scroll-snap-align: start;">

                    <div class="relative aspect-video bg-[#4b1254] rounded-2xl overflow-hidden group">
                        <img :src="video.thumbnail || '/images/placeholder.jpg'"
                            class="absolute inset-0 w-full h-full object-cover" />

                        <a v-if="video.isReference && video.referenceUrl" :href="video.referenceUrl" target="_blank"
                            class="absolute inset-0 z-10"></a>

                        <router-link v-else :to="{
                            name: 'video-viewer',
                            params: {
                                videoId: String(video.videoId),
                                videoTitle: getSlug(video.title)
                            }
                        }" class="absolute inset-0 z-10"></router-link>

                        <div v-if="!video.isReference && !video.referenceUrl"
                            class="absolute bottom-2 right-2 bg-[#28002b] w-7 h-7 rounded-full flex justify-center items-center z-10">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="text-white text-md font-bold line-clamp-2 leading-snug">
                            {{ video.title }}
                        </span>
                        <span class="text-white text-xs font-normal opacity-70">
                            {{ video.videoTag ?? '' }}
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-else class="w-full flex justify-center items-center py-10">
            <span class="text-white opacity-30">No videos available</span>
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