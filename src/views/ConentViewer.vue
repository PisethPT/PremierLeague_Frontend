<script setup>
import { ref, onMounted } from 'vue';
import SponsorBar from '@/components/SponsorBar.vue';
import { useRoute } from 'vue-router';
import { useViewerStore } from '@/stores';

const route = useRoute();
const viewerStore = useViewerStore();
const sponsorImage = ref('/src/assets/sponsors/14952318241031863229.jpg');
const contentId = ref(null);
const contentTitle = ref(null);
const contentType = ref('video');
const content = ref(null);
const isLoading = ref(true);


onMounted(async () =>
{
    window.scrollTo(0, 0);
    contentId.value = route.params.videoId;
    contentTitle.value = route.params.videoTitle;
    contentType.value = route.params.contentType || 'video';

    isLoading.value = true;
    try
    {
        switch (contentType.value)
        {
            case 'video':
                content.value = await viewerStore.getVideoById(contentId);
                isLoading.value = false;
                break;
            case 'news':
                content.value = await viewerStore.getNewsById(contentId);
                isLoading.value = false;
                break;
            default:
                console.warn("Unknown content type:", contentType.value);
                isLoading.value = false;
        }
    } catch (error)
    {
        console.error("Error fetching video data:", error);
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="content-center">
        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />
        <section class="flex flex-1 flex-col gap-12 mt-13 mx-4">
            <div class="grid grid-cols-1 xl:grid-cols-[1fr_33.33%] gap-4">
                <div class="flex flex-col gap-4 w-full">
                    <div class="bg-[#28002b] h-[650px] flex rounded-2xl overflow-hidden">
                        <video src="#" class="w-full h-full object-contain"></video>
                    </div>
                    <div class="flex flex-col gap-2 mx-3">
                        <span class="text-white text-2xl font-bold text-wrap">Lorem ipsum dolor sit amet, consectetur
                            adipisicing elit. Itaque, harum?</span>
                        <span class="text-white text-sm text-wrap">Lorem, ipsum dolor sit amet consectetur adipisicing
                            elit.
                            Dolore repellat sit rem? Aliquam, praesentium! Recusandae!</span>

                        <span class="text-white text-xs mt-6">08 November</span>
                    </div>
                </div>

                <div class="bg-[#28002b] flex flex-col gap-4 w-full h-fit rounded-2xl px-4 py-6">
                    <div
                        class="text-white text-sm font-bold pb-1 border-b-4 w-fit hover:cursor-pointer whitespace-nowrap">
                        Related</div>
                    <span class="text-white text-md">No Related content available</span>
                </div>
            </div>
        </section>
    </div>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}
</style>