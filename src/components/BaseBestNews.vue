<script setup>
import { ref, defineProps } from 'vue';
const props = defineProps({
    videoId: 0,
    title: '',
    thumbnail: '',
    videoUrl: '',
})
</script>

<template>
    <div class="relative rounded-lg w-[192px] h-[260px] overflow-hidden flex-none">
        <div class="absolute text-[10px] text-white bg-purple-600 px-2 rounded-lg left-1 top-1">new
        </div>
        <img :src="thumbnail" class="w-full h-full object-cover" />
        <div class="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black to-transparent">
            <span class="absolute bottom-2 left-2 text-sm text-white font-bold">{{ title }}</span>
        </div>
    </div>
</template>