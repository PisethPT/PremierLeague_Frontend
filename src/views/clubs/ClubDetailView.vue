<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore, useMatchStore } from '@/stores';
import BaseClubDetail from '@/components/BaseClubDetail.vue';
import BaseCurrentlyMatch from '@/components/BaseCurrentlyMatch.vue';
import router from '@/router';
import BaseBestNews from '@/components/BaseBestNews.vue';

const route = useRoute();
const teamStore = useTeamStore();
const clubId = ref(route.params.clubId);
const clubName = ref(route.params.clubName);
const clubDetails = ref(null);
const bestNews = ref([
    {
        id: 1,
        image: '1.jpg',
        title: 'Arsenal Best 15 Players',
    },
    {
        id: 2,
        image: '2.jpg',
        title: 'Arsenal Best Skills of 24/25',
    },
    {
        id: 3,
        image: '3.jpg',
        title: 'Arsenal Best Assists of 24/25',
    },
    {
        id: 4,
        image: '4.jpg',
        title: 'Arsenal Best Defending of...',
    },
    {
        id: 5,
        image: '5.jpg',
        title: 'Arsenal Best Saves of 24/25',
    },
    {
        id: 6,
        image: '6.jpg',
        title: 'Arsenal Best Goals of 24/25',
    },
])

const menuActive = ref('Overview');
const clubDetailMenu = ref([
    { name: 'Overview', route: 'clubs-overview' },
    { name: 'News', route: 'clubs-news' },
    { name: 'Video', route: 'clubs-video' },
    { name: 'Matches', route: 'clubs-matches' },
    { name: 'Squad', route: 'clubs-squad' },
    { name: 'Stats ', route: 'clubs-stats' },
    { name: 'Stadium', route: 'clubs-stadium' },
    { name: 'Tickets', route: 'clubs-tickets' },
    { name: 'Directory', route: 'clubs-directory' },
]);

onMounted(async () =>
{
    // auto scroll up
    window.scrollTo({ top: 0, behavior: 'auto' });

    // router.push({ name: 'clubs-overview', params: { clubId: clubId.value, clubName: clubName.value } });
    menuActive.value = 'Overview';

    try
    {
        const response = await teamStore.getTeamById(clubId.value);
        clubDetails.value = response;

    } catch (error)
    {
        console.error('Error fetching ', error);
    }
});

</script>

<template>
    <BaseCurrentlyMatch />
    <div
        class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-[33.33%_1fr] gap-4 py-4 px-3">
        <div class="flex flex-wrap gap-4 h-fit">
            <!-- team info card -->
            <BaseClubDetail v-if="clubDetails" :team="clubDetails" />

            <!-- club info -->
            <div v-if="clubDetails"
                class="!bg-[#28002b] rounded-2xl min-h-[80px] w-full p-5 flex flex-row justify-start items-center gap-20">
                <div class="flex justify-between flex-col gap-2">
                    <span class="text-xs text-gray-300">Est.</span>
                    <h3 v-if="clubDetails.founded" class="text-sm font-bold text-white">{{ clubDetails.founded }}</h3>
                </div>
                <div class="flex justify-between flex-col gap-2">
                    <span class="text-xs text-gray-300">Stadium</span>
                    <h3 v-if="clubDetails.homeStadium" class="text-sm font-bold text-white">{{ clubDetails.homeStadium
                        }}</h3>
                </div>
            </div>

            <!-- best news -->
            <div class="w-full p-4 bg-[#28002b] rounded-2xl overflow-hidden">
                <div class="flex gap-2 rounded-tr-lg overflow-x-scroll scrollbar-none">
                    <BaseBestNews v-for="b in bestNews" :key="b.id" :image="b.image" :title="b.title" />
                </div>
            </div>
        </div>

        <div class="flex flex-1 flex-col gap-4">
            <!-- nav bar -->
            <div class="pt-2 pe-2 flex gap-4 overflow-x-auto scrollbar-none">
                <div v-for="menu in clubDetailMenu" :key="menu.name"
                    class="text-white text-sm pb-1 border-b-4 hover:cursor-pointer whitespace-nowrap"
                    :style="menuActive == menu.name ? { borderBottom: '4px solid white', fontWeight: 'bold' } : { borderBottom: '4px solid transparent', fontWeight: 'normal' }">
                    <router-link :to="{ name: menu.route }" @click="menuActive = menu.name">{{ menu.name
                    }}</router-link>
                </div>
            </div>

            <section>
                <RouterView />
            </section>

        </div>
    </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>