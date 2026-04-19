<script setup>
import { ref, onMounted } from 'vue';
import { usePlayerStore, useClubStore } from '@/stores';
import { useRoute } from 'vue-router';
import BaseViewMoreVideosCard from '@/components/BaseViewMoreVideosCard.vue';

const playerStore = usePlayerStore();
const clubStore = useClubStore();
const route = useRoute();
const playerId = ref(route.params.playerId);

onMounted(async () =>
{
    try
    {
        await playerStore.getPlayerClub({ playerId: playerId.value });

        if (playerStore.playerClub !== null)
        {
            await clubStore.getClubVideos({ seasonId: 4, clubId: playerStore.playerClub.clubId });
        }
    } catch (error)
    {
        console.error('Error fetching:', error);
    }
});

function viewMore()
{
    alert('view more');
}

</script>

<template>
    <div class="!bg-[#28002b] flex flex-1 items-center flex-col rounded-2xl h-fit w-full p-4 gap-4">
        <BaseViewMoreVideosCard :videos="clubStore.clubVideos" card-grids="sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3"
            class-modify="''" />
    </div>
</template>