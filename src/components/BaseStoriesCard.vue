<script setup>
import { ref, computed } from 'vue';
import BaseStoryViewer from './BaseStoryViewer.vue';

const props = defineProps({
    videoTag: String,
    stories: {
        type: Array,
        default: () => []
    }
});

const activeStory = ref(null);

// ✅ FIXED parser
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
    <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl p-4 mx-4">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">{{ videoTag }}</span>
        </div>

        <div class="flex gap-2 rounded-t-lg overflow-x-scroll scrollbar-none">
            <div v-for="story in normalizedStories" :key="story.ytId" @click="openStory(story)"
                class="relative rounded-lg w-[185px] h-[260px] overflow-hidden flex-none cursor-pointer">

                <div class="absolute text-[10px] text-white bg-purple-600 px-2 rounded-lg left-1 top-1 z-10">
                    new
                </div>

                <img :src="story.thumbnail" class="w-full h-full object-cover" />

                <div class="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/95 to-transparent">
                    <span class="absolute bottom-2 left-2 right-2 text-sm text-white font-bold line-clamp-2">
                        {{ story.title }}
                    </span>
                </div>
            </div>
        </div>
    </div>

    <BaseStoryViewer v-if="activeStory" :stories="normalizedStories" :activeStory="activeStory" @close="closeStory" />
</template>