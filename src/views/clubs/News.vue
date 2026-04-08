<script setup>
import { ref, onMounted } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';
import { useTeamStore } from '@/stores';
import { useRoute } from 'vue-router';

const apiConfig = useApiConfig();
const teamStore = useTeamStore();
const route = useRoute();
const clubId = ref(route.params.clubId);
const club = ref(null);
const allNews = ref(24);
const takeCount = ref(12);

onMounted(async () =>
{
    allNews.value = takeCount.value;
    try
    {
        const response = await teamStore.getTeamById(clubId.value);
        club.value = response;
    } catch (error)
    {
        console.error('Error fetching club details:', error);
    }
});

function viewMore()
{
    takeCount.value = 6;
    allNews.value += takeCount.value;
}
</script>

<template>
    <div class="!bg-[#28002b] flex flex-1 items-center flex-col rounded-2xl h-fit w-full p-4 gap-4">
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 rounded-2xl h-fit">
            <div v-for="(value, index) in allNews" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                <div class="flex justify-center items-center rounded-2xl h-[205px] relative"
                    :style="{ backgroundColor: club?.teamThemeColor ? club?.teamThemeColor : '#4b1254' }">
                    <img :src="club ? apiConfig.TEAM_LOGOS_DIR + club?.clubCrest : ''" :alt="club?.name"
                        class="w-auto h-23 object-cover">
                </div>
                <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Maxime, inventore.</span>
            </div>
        </div>
        <button class="text-sm bg-white text-[#37003c] mt-4 px-4 py-2.5 rounded-3xl cursor-pointer w-fit"
            @click="viewMore">View
            More</button>
    </div>
</template>