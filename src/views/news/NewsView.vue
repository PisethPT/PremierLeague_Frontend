<script setup>
import { ref, onMounted } from 'vue';
import { useNewsStore, useHomeStore } from '@/stores';
import PageTitleBase from '@/components/PageTitleBase.vue';
import BaseViewMoreTopicCard from '@/components/BaseViewMoreTopicCard.vue';
import BaseNewsCard from '@/components/BaseNewsCard.vue';

const title = ref('News');
const news = ref(null);
const latestNewsAndFeatures = ref([]);
const newsStore = useNewsStore();
const homeStore = useHomeStore();


onMounted(async () =>
{
    try
    {
        latestNewsAndFeatures.value = await homeStore.getNewsMultiTopicByTags(["3"], { pageSize: 10 });
        await newsStore.getNews();
        news.value = newsStore.news;
    } catch (error)
    {
        console.error('Failed to fetch news:', error);
    }
});


</script>
<template>
    <div class="content-center">
        <PageTitleBase :title="title" />

        <div class="lex flex-1 flex-col gap-12 mt-4 mx-4">
            <BaseViewMoreTopicCard v-if="latestNewsAndFeatures.length > 0" :title="'Latest News & Features'" :topics="latestNewsAndFeatures"
                :viewMore="viewMore" :viewMoreButtonTitle="'View more'" />
        </div>

        <div v-for="data in news" :key="data.newsLabel" class="flex flex-1 flex-col gap-12 mt-4 mx-4">
            <BaseViewMoreTopicCard v-if="data.isViewMore" :title="data.newsLabel" :topics="data.news"
                :viewMore="viewMore" :viewMoreButtonTitle="'View more'" />

            <BaseNewsCard class="my-4" v-else :title="data.newsLabel" :topics="data.news" :allButtonTitle="''" :viewMore="viewMore"
                :is-all-button="false" :is-previous-and-next-buttons="true" />
        </div>

    </div>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>