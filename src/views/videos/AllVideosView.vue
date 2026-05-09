<script setup>
import { ref, onMounted } from 'vue';
import { useVideoStore } from '@/stores';
import PageTitleBase from '@/components/PageTitleBase.vue';
import SponsorBar from '@/components/SponsorBar.vue';
import BaseViewMoreVideosCard from '@/components/BaseViewMoreVideosCard.vue';
import sponsorImage from '@/assets/sponsors/9044630324637544770.png';

const title = ref('All Videos');
const videoStore = useVideoStore();

const allVideos = ref([]);
const page = ref(1);
const totalVideos = ref(0);
const isLoading = ref(false);
const isInitialLoad = ref(true);

const loadVideos = async () =>
{
    if (!isInitialLoad.value && allVideos.value.length >= totalVideos.value) return;
    if (isLoading.value) return;

    isLoading.value = true;

    try
    {
        const [videoData] = await Promise.all([
            videoStore.getAllVideos({ page: page.value, pageSize: 25 }),
            new Promise(resolve => setTimeout(resolve, 1000)) // 1000ms delay
        ]);

        if (videoStore.allVideos && videoStore.allVideos.length > 0)
        {
            allVideos.value = [...allVideos.value, ...videoStore.allVideos];
            page.value++;
        }
    } catch (error)
    {
        console.error('Error fetching all videos:', error);
    } finally
    {
        isLoading.value = false;
        isInitialLoad.value = false;
    }
};

onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });

    try
    {
        await videoStore.getAllVideosCount();
        totalVideos.value = videoStore.allVideosCount;

        await loadVideos();
    } catch (error)
    {
        console.error('Initial mount error:', error);
    }
});
</script>

<template>
    <div class="content-center">
        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />
        <PageTitleBase :title="title" />

        <div class="flex flex-1 flex-col gap-12 mt-8 mx-4">
            <BaseViewMoreVideosCard :videos="allVideos" :viewMore="loadVideos" :title="''"
                :showViewMore="allVideos.length < totalVideos" :isLoading="isLoading" viewMoreButtonTitle="View More"
                :skeletons="25" />
        </div>
    </div>
</template>