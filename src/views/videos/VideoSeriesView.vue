<script setup>
import { ref, onMounted } from 'vue';
import { useVideoStore } from '@/stores';
import BaseVideoSeries from '@/components/BaseVideoSeries.vue';
import PageTitleBase from '@/components/PageTitleBase.vue';

const title = ref('Series');
const videoStore = useVideoStore();
const seriesVideos = ref([]);

onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });

    try
    {
        await videoStore.getSeriesVideos();
        seriesVideos.value = videoStore.seriesVideos;
    } catch (error)
    {
        console.error('Error fetching series videos:', error);
    }
});

</script>
<template>
    <div class="content-center">
        <PageTitleBase :title="title" />

        <div v-for="data in seriesVideos" :key="data.videoLabel" class="flex flex-1 flex-col gap-12 mt-13 mx-4">
            <BaseVideoSeries v-if="data.isVideoSeries" :title="''" :series="data.videos" />
        </div>

    </div>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}
</style>
