<script setup>
import { ref, onMounted } from 'vue';
import SponsorBar from '@/components/SponsorBar.vue';
import router from '@/router';

const title = ref('Stats Centre');
const sponsorImage = ref('/src/assets/sponsors/9044630324637544770.png');
const statMenuActive = ref('Dashboard');
const statsMenu = ref([
    { name: 'Dashboard', route: 'guest-statistics-stats-dashboard' },
    { name: 'Player', route: 'guest-statistics-stats-players' },
    { name: 'Club', route: 'guest-statistics-stats-clubs' },
    { name: 'All-time Stats ', route: 'guest-statistics-stats-all-time-stats' },
    { name: 'Records', route: 'guest-statistics-stats-records' },
    { name: 'Player Comparison', route: 'guest-statistics-stats-players-comparison' },
]);

onMounted(() =>
{
    router.push({ name: 'guest-statistics-stats-dashboard' });
    statMenuActive.value = 'Dashboard';
});


</script>
<template>
    <div class="content-center">
        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />

        <div class="mt-4 mx-4 rounded-tl-2xl rounded-tr-2xl !bg-gradient-to-r from-[#943bff] to-[#25f1ff] py-4 pe-2">
            <h1 class="text-white md:text-5xl text-2xl font-bold  ms-4">
                {{ title }}
            </h1>
        </div>
        <div
            class="mx-4 !bg-gradient-to-r from-[#6f24b1] to-[#1b93b5] px-4 pt-2 pe-2 flex gap-4 overflow-x-auto scrollbar-none">
            <div v-for="menu in statsMenu" :key="menu.name"
                class="text-white text-sm pb-1 border-b-4 hover:cursor-pointer whitespace-nowrap"
                :style="statMenuActive == menu.name ? { borderBottom: '4px solid white', fontWeight: 'bold' } : { borderBottom: '4px solid transparent', fontWeight: 'normal' }">
                <router-link :to="{ name: menu.route }" @click="statMenuActive = menu.name">{{ menu.name
                }}</router-link>
            </div>
        </div>

        <section>
            <!-- render stats menu content -->
            <router-view />
        </section>
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