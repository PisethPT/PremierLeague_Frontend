<script setup>
import { ref } from 'vue';
import PageTitleBase from '@/components/PageTitleBase.vue';

const title = ref('Transfers');
</script>
<template>
    <div class="content-center">
        <PageTitleBase :title="title" />
    </div>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}
</style>