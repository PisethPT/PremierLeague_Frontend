<script setup>
import { ref, computed, defineProps } from 'vue';
import BaseStoryViewer from './BaseStoryViewer.vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();
const props = defineProps({
    videoTag: {
        type: String,
        required: false,
    },
    stories: {
        type: Array,
        default: () => []
    },
    isTitle: {
        type: Boolean,
        required: false,
        default: true,
    },
    isLoading: { // Added for skeleton support
        type: Boolean,
        default: false
    },
    skeleton: {
        type: Number,
        required: false,
        default: 10,
    }
});

const activeStory = ref(null);

const getYouTubeId = (url) =>
{
    if (!url) return null;
    try
    {
        const u = new URL(url);
        if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
        if (u.searchParams.get("v")) return u.searchParams.get("v");
        if (u.pathname.includes("/shorts/")) return u.pathname.split("/shorts/")[1].split("?")[0];
        if (u.pathname.includes("/embed/")) return u.pathname.split("/embed/")[1];
    } catch { }
    return null;
};

const normalizedStories = computed(() =>
    props.stories.map(story => ({
        ...story,
        ytId: getYouTubeId(story.videoUrl)
    }))
);

const handleImageError = (event) =>
{
    event.target.style.display = 'none';
};

const openStory = (story) =>
{
    activeStory.value = story;
};

const closeStory = () =>
{
    activeStory.value = null;
};
</script>

<template>
    <div v-if="props.stories.length > 0 || props.isLoading" class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl p-4">
        <div v-if="isTitle" class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">{{ videoTag }}</span>
        </div>

        <div class="flex gap-2 rounded-t-lg overflow-x-scroll scrollbar-none">

            <div v-for="story in normalizedStories" :key="story.ytId" @click="openStory(story)"
                class="relative rounded-lg w-[185px] h-[260px] overflow-hidden flex-none cursor-pointer shimmer-bg">

                <div class="absolute text-[10px] text-white bg-purple-600 px-2 rounded-lg left-1 top-1 z-10">
                    new
                </div>

                <img :src="story.thumbnail" @error="handleImageError"
                    class="absolute inset-0 w-full h-full object-cover z-0" />

                <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/95 to-transparent z-10">
                    <span class="absolute bottom-2 left-2 right-2 text-sm text-white font-bold line-clamp-2">
                        {{ story.title }}
                    </span>
                </div>
            </div>

            <template v-if="props.isLoading">
                <div v-for="i in props.skeleton" :key="'skel-' + i"
                    class="relative rounded-lg w-[185px] h-[260px] flex-none shimmer-bg">
                </div>
            </template>
        </div>
    </div>

    <BaseStoryViewer v-if="activeStory" :stories="normalizedStories" :activeStory="activeStory" @close="closeStory" />
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
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>