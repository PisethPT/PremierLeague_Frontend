<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useMatchStore } from '@/stores';
import BaseViewMoreTopicCard from '@/components/BaseViewMoreTopicCard.vue';
import
{
    CaretRight,
} from '@element-plus/icons-vue';

const matchStore = useMatchStore();
const route = useRoute();
const matchId = ref(route.params.matchId);

onMounted(async () =>
{
    try
    {
        await matchStore.getMatchHighlight({ matchId: matchId.value });
    } catch (error)
    {
        console.error(error);

    }
});

function viewMore()
{
    console.log('View more news clicked!');
}

</script>

<template>
    <div class="!bg-[#28002b] flex items-center flex-col rounded-2xl h-fit w-full p-4 gap-4">
        <BaseViewMoreTopicCard card-grids="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3" class-modify="''"
            :topics="matchStore.matchHighlight" :viewMore="viewMore" :viewMoreButtonTitle="'View more'" />
    </div>
</template>