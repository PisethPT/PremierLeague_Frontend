<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useNewsStore, useHomeStore } from '@/stores';
import PageTitleBase from '@/components/PageTitleBase.vue';
import BaseViewMoreTopicCard from '@/components/BaseViewMoreTopicCard.vue';
import BaseNewsCard from '@/components/BaseNewsCard.vue';

const title = ref('News');
const newsStore = useNewsStore();
const homeStore = useHomeStore();

const latestNewsAndFeatures = ref([]);
const dynamicSections = reactive({});

const loadMoreNews = async (label) =>
{
    const section = dynamicSections[label];
    if (section.loading || !section.hasMore) return;

    section.loading = true;
    try
    {
        const [response] = await Promise.all([
            newsStore.getNewsByLabel({
                newsCategoryId: section.categoryId,
                pageNumber: section.page,
                pageSize: 5
            }),
            new Promise(resolve => setTimeout(resolve, 800))
        ]);

        // CHECK: Access response.news because your API returns a wrapper object
        const newsItems = response?.news || response;

        if (Array.isArray(newsItems) && newsItems.length > 0)
        {
            const formattedData = newsItems.map(item => ({
                ...item,
                // Ensure topicId is assigned for vue-router
                topicId: item.topicId
            }));

            section.items.push(...formattedData);
            section.page++;

            // Use the totalNews from the first item in the new batch
            const totalCount = formattedData[0]?.totalNews || section.total;

            if (section.items.length >= totalCount)
            {
                section.hasMore = false;
            }
        } else
        {
            section.hasMore = false;
        }
    } catch (error)
    {
        console.error(`Failed to load more news for ${label}:`, error);
    } finally
    {
        section.loading = false;
    }
};


onMounted(async () =>
{
    try
    {
        latestNewsAndFeatures.value = await homeStore.getNewsMultiTopicByTags(["3"], { pageSize: 10 });
        await newsStore.getNews();
        newsStore.news.forEach(group =>
        {
            if (group.isViewMore)
            {
                const totalCountFromApi = group.news[0]?.totalNews || 0;

                dynamicSections[group.newsLabel] = {
                    items: group.news,
                    page: 2,
                    loading: false,
                    hasMore: group.news.length < totalCountFromApi,
                    total: totalCountFromApi,
                    categoryId: group.news[0]?.categoryId
                };
            }
        });
    } catch (error)
    {
        console.error('Initial load error:', error);
    }
});
</script>

<template>
    <div class="content-center pb-20">
        <PageTitleBase :title="title" />

        <div class="flex flex-col gap-12 mt-4 mx-4">
            <BaseViewMoreTopicCard v-if="latestNewsAndFeatures.length > 0" title="Latest News & Features"
                :topics="latestNewsAndFeatures" :showViewMore="false" />
        </div>

        <div v-for="group in newsStore.news" :key="group.newsLabel" class="flex flex-col gap-12 mt-4 mx-4">

            <BaseViewMoreTopicCard v-if="group.isViewMore" :title="group.newsLabel"
                :topics="dynamicSections[group.newsLabel]?.items || group.news"
                :viewMore="() => loadMoreNews(group.newsLabel)"
                :showViewMore="dynamicSections[group.newsLabel]?.hasMore"
                :isLoading="dynamicSections[group.newsLabel]?.loading" viewMoreButtonTitle="View more" />

            <BaseNewsCard v-else class="my-4" :title="group.newsLabel" :topics="group.news" :is-all-button="false"
                :is-previous-and-next-buttons="true" />

        </div>
    </div>
</template>