<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useTeamStore, useClubStore } from '@/stores';
import BaseClubDetail from '@/components/BaseClubDetail.vue';
import BaseCurrentlyMatch from '@/components/BaseCurrentlyMatch.vue';
import router from '@/router';
import BaseBestNews from '@/components/BaseBestNews.vue';
import BaseStoriesCard from '@/components/BaseStoriesCard.vue';

const route = useRoute();
const teamStore = useTeamStore();
const clubStore = useClubStore();
const clubId = ref(route.params.clubId);
const clubName = ref(route.params.clubName);
const storyNews = ref([]);

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
        await clubStore.getClubDetail({
            clubId: clubId.value
        });

        storyNews.value = JSON.parse(JSON.stringify(clubStore.club.storyNews));

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
            <BaseClubDetail v-if="clubStore.club" :club="clubStore.club.clubDetail"
                :social-medias="clubStore.club.clubSocialMedias" />

            <!-- club info -->
            <div v-if="clubStore.club"
                class="!bg-[#28002b] rounded-2xl min-h-[80px] w-full p-5 flex flex-row justify-start items-center gap-20">
                <div class="flex justify-between flex-col gap-2">
                    <span class="text-xs text-gray-300">Est.</span>
                    <h3 v-if="clubStore.club.clubDetail.est" class="text-sm font-bold text-white">{{
                        clubStore.club.clubDetail.est }}</h3>
                </div>
                <div class="flex justify-between flex-col gap-2">
                    <span class="text-xs text-gray-300">Stadium</span>
                    <h3 v-if="clubStore.club.clubDetail.clubStadium" class="text-sm font-bold text-white">{{
                        clubStore.club.clubDetail.clubStadium
                        }}</h3>
                </div>
            </div>

            <!-- best news -->
            <div class="w-full bg-[#28002b] rounded-2xl overflow-hidden">
                    <BaseStoriesCard v-if="storyNews.length > 0" :stories="storyNews" :is-title="false" />
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