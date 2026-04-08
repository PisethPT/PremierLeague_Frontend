<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true,
        default: 'Title',
    }
})
</script>

<template>
    <h1
        class="text-white text-5xl font-bold !bg-gradient-to-br from-[#28002b] to-[#330d36] px-4 py-4 mx-3 my-6 rounded-t-2xl sm:rounded-2xl md:rounded-2xl xl:rounded-2xl">
        {{ props.title }}
    </h1>
</template>