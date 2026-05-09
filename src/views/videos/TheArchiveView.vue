<script setup>
import { ref, onMounted, watch } from 'vue';
import router from '@/router';
import { useRoute } from 'vue-router';
import SponsorBar from '@/components/SponsorBar.vue';
import sponsorImage from '@/assets/sponsors/14952318241031863229.jpg';

const route = useRoute();
const title = ref('Video - The Archive');
const videoMenuActive = ref('');
const videosMenu = ref([
    { name: 'Overview', route: 'video-the-archive-overview' },
    { name: '8 Minute Replays', route: 'video-the-archive-8-minute-replays' },
    { name: '20 Minute Replays', route: 'video-the-archive-20-minute-replays' },
]);


const updateActiveMenu = () =>
{
    const found = videosMenu.value.find((m) => m.route === route.name);
    videoMenuActive.value = found ? found.name : '';
};

onMounted(() =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });

    updateActiveMenu();

    if (!videoMenuActive.value)
    {
        router.push({ name: 'video-the-archive-overview' });
        videoMenuActive.value = 'Overview';
    }
});

// watch route changes
watch(
    () => route.name,
    () =>
    {
        updateActiveMenu();
    }
);
</script>

<template>
    <div class="content-center">

        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />

        <div class="mt-4 mx-4 rounded-tl-2xl rounded-tr-2xl !bg-gradient-to-r from-[#28002b] to-[#330d36] py-4 pe-2">
            <h1 class="text-white md:text-5xl text-2xl font-bold  ms-4">
                {{ title }}
            </h1>
        </div>

        <div
            class="mx-4 !bg-gradient-to-r from-[#28002b] to-[#330d36] px-4 pt-2 pe-2 flex gap-4 overflow-x-auto scrollbar-none">
            <div v-for="menu in videosMenu" :key="menu.name"
                class="text-white text-sm pb-1 border-b-4 hover:cursor-pointer whitespace-nowrap"
                :style="videoMenuActive == menu.name ? { borderBottom: '4px solid white', fontWeight: 'bold' } : { borderBottom: '4px solid transparent', fontWeight: 'normal' }">
                <router-link :to="{ name: menu.route }" @click="videoMenuActive = menu.name">{{ menu.name
                }}</router-link>
            </div>
        </div>

        <section class="flex flex-1 flex-col gap-12 mt-10 mx-4">
            <RouterView />
        </section>

    </div>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}
</style>
