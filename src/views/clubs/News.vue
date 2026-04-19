<script setup>
import { ref, onMounted } from 'vue';
import { useClubStore } from '@/stores';
import { useRoute } from 'vue-router';

import BaseViewMoreNewsCard from '@/components/BaseViewMoreNewsCard.vue';

const clubStore = useClubStore();
const route = useRoute();
const clubId = ref(route.params.clubId);

onMounted(async () =>
{
    try
    {
        await clubStore.getClubNews({ seasonId: 4, clubId: clubId.value });
    } catch (error)
    {
        console.error('Error fetching club details:', error);
    }
});

function viewMore()
{
    alert('view more');
}


</script>

<template>
    <div class="!bg-[#28002b] flex flex-1 items-center flex-col rounded-2xl h-fit w-full p-4 gap-4">
        <BaseViewMoreNewsCard card-grids="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3" class-modify="''" :news="clubStore.clubNews" :viewMore="viewMore" />
    </div>
</template>