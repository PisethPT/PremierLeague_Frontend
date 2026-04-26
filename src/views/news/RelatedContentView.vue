<script setup>
import { ref, onMounted } from 'vue';
import { useVideoStore } from '@/stores';
import PageTitleBase from '@/components/PageTitleBase.vue';
import SponsorBar from '@/components/SponsorBar.vue';
import BaseViewMoreVideosCard from '@/components/BaseViewMoreVideosCard.vue';

const sponsorImage = ref('/src/assets/sponsors/9044630324637544770.png');
const title = ref('Related Content');
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
        await videoStore.getAllVideos({ page: page.value, pageSize: 25 });

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
                :showViewMore="!isLoading && allVideos.length < totalVideos" viewMoreButtonTitle="View More" />

            <div v-if="isLoading" class="text-white text-center py-4 italic opacity-80">
                Loading more videos...
            </div>
        </div>
    </div>
</template>