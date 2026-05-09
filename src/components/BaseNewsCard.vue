<script setup>
import
{
    defineProps,
    defineEmits,
    ref,
    onMounted,
    nextTick
} from 'vue';

import
{
    ArrowRight,
    ArrowLeft,
    CaretRight
} from '@element-plus/icons-vue';

import { useApi } from '@/stores/api';

const emits = defineEmits(['viewAll']);

const apiConfig = useApi();

const props = defineProps({
    title: {
        type: String,
        required: true
    },

    topics: {
        type: Array,
        required: true,
        default: () => []
    },

    isLoading: {
        type: Boolean,
        default: false
    },

    allButtonTitle: {
        type: String,
        default: 'View more'
    },

    isAllButton: {
        type: Boolean,
        default: false
    },

    isPreviousAndNextButtons: {
        type: Boolean,
        default: false
    },

    skeletons: {
        type: Number,
        default: 5
    }
});

const scrollContainer = ref(null);

const isAtStart = ref(true);
const isAtEnd = ref(false);

const updateScrollState = () =>
{
    if (!scrollContainer.value)
    {
        return;
    }

    const {
        scrollLeft,
        scrollWidth,
        clientWidth
    } = scrollContainer.value;

    isAtStart.value = scrollLeft <= 5;

    isAtEnd.value =
        Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 5;
};

const scroll = (direction) =>
{
    if (!scrollContainer.value)
    {
        return;
    }

    const scrollAmount = 320;

    scrollContainer.value.scrollBy({
        left: direction === 'left'
            ? -scrollAmount
            : scrollAmount,
        behavior: 'smooth'
    });

    setTimeout(updateScrollState, 400);
};

const formatSlug = (text) =>
{
    return text
        ?.toString()
        .toLowerCase()
        .replace(/\s+/g, '-') || '';
};

const getThumbnail = (thumbnail) =>
{
    if (!thumbnail)
    {
        return '/images/news-placeholder.png';
    }

    if (thumbnail.startsWith('http'))
    {
        return thumbnail;
    }

    return `${apiConfig.NEWS_DIR}${thumbnail}`;
};

const handleImageError = (event) =>
{
    event.target.src = '/images/news-placeholder.png';
};

onMounted(async () =>
{
    await nextTick();

    updateScrollState();
});
</script>

<template>
    <div class="flex flex-col gap-5 bg-[#28002b] rounded-2xl w-full max-w-full overflow-hidden p-6 shadow-xl">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold tracking-tight">
                {{ props.title }}
            </span>

            <div class="flex gap-3">
                <div v-if="props.isPreviousAndNextButtons && props.topics.length > 0" class="flex gap-2">
                    <button
                        class="flex items-center justify-center rounded-full w-8 h-8 transition-all disabled:opacity-30"
                        :class="[
                            isAtStart
                                ? 'bg-[#1d001f] cursor-default'
                                : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer shadow-lg'
                        ]" :disabled="isAtStart" @click="scroll('left')">
                        <el-icon>
                            <ArrowLeft class="text-white" />
                        </el-icon>
                    </button>

                    <button
                        class="flex items-center justify-center rounded-full w-8 h-8 transition-all disabled:opacity-30"
                        :class="[
                            isAtEnd
                                ? 'bg-[#1d001f] cursor-default'
                                : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer shadow-lg'
                        ]" :disabled="isAtEnd" @click="scroll('right')">
                        <el-icon>
                            <ArrowRight class="text-white" />
                        </el-icon>
                    </button>
                </div>

                <button v-if="props.isAllButton && (props.topics.length > 0 || props.isLoading)"
                    @click="emits('viewAll')"
                    class="flex items-center rounded-full bg-[#3e003f] text-[11px] tracking-wider text-white h-8 px-4 hover:bg-[#55005a] transition-colors cursor-pointer whitespace-nowrap">
                    {{ props.allButtonTitle }}

                    <el-icon class="ml-1.5">
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
            </div>
        </div>

        <div class="w-full rounded-t-2xl relative">
            <div ref="scrollContainer" @scroll="updateScrollState"
                class="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-2"
                style="scroll-snap-type: x mandatory;">

                <template v-if="props.topics.length > 0">
                    <div v-for="(item, index) in props.topics" :key="index"
                        class="flex flex-col gap-2 rounded-2xl flex-none w-[280px] md:w-[300px] group cursor-pointer"
                        style="scroll-snap-align: start;">

                        <div
                            class="flex bg-[#4b1254] rounded-2xl aspect-video relative overflow-hidden shimmer-bg shadow-md">
                            <img :src="getThumbnail(item.thumbnail)" @error="handleImageError"
                                class="absolute inset-0 w-full h-full object-cover z-10" loading="lazy"
                                alt="News Thumbnail" />

                            <template v-if="item.isVideo">
                                <router-link :to="{
                                    name: 'news-viewer',
                                    params: {
                                        newsId: item.topicId,
                                        newsTitle: formatSlug(item.title)
                                    }
                                }" class="absolute inset-0 z-20" />

                                <div
                                    class="absolute bg-[#28002b] w-7 h-7 rounded-full bottom-2 right-2 flex justify-center items-center z-30 pointer-events-none">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </template>

                            <template v-else-if="item.referenceUrl || item.topicUrl">
                                <a :href="item.referenceUrl || item.topicUrl" target="_blank" rel="noopener noreferrer"
                                    class="absolute inset-0 z-20"></a>

                                <div class="absolute inset-0 bg-black/5 z-10"></div>
                            </template>

                            <template v-else>
                                <router-link :to="{
                                    name: 'news-viewer',
                                    params: {
                                        newsId: item.topicId,
                                        newsTitle: formatSlug(item.title)
                                    }
                                }" class="absolute inset-0 z-20" />

                                <div class="absolute inset-0 bg-black/5 z-10"></div>
                            </template>
                        </div>

                        <div class="flex flex-col gap-1 px-1">
                            <span
                                class="text-white text-[15px] font-bold line-clamp-2 leading-tight group-hover:text-purple-200 transition-colors">
                                {{ item.title }}
                            </span>

                            <span class="text-white text-xs mt-auto opacity-60 tracking-wide">
                                {{ item.topicTag }}
                            </span>
                        </div>
                    </div>
                </template>

                <template v-if="props.isLoading">
                    <div v-for="i in props.skeletons" :key="'skel-' + i"
                        class="flex flex-col gap-2 flex-none w-[280px] md:w-[300px]">
                        <div class="aspect-video rounded-2xl shimmer-bg"></div>
                    </div>
                </template>
            </div>
        </div>

        <div v-if="props.topics.length === 0 && !props.isLoading" class="w-full flex justify-center items-center py-10">
            <span class="text-white/20 text-sm italic tracking-widest uppercase">
                No content available
            </span>
        </div>
    </div>
</template>

<style scoped>
@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

.shimmer-bg {
    background: linear-gradient(90deg,
            #4b1254 25%,
            #5d1a67 50%,
            #4b1254 75%);

    background-size: 200% 100%;

    animation: shimmer 2.5s infinite linear;
}

.scrollbar-none::-webkit-scrollbar {
    display: none;
}

.scrollbar-none {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>