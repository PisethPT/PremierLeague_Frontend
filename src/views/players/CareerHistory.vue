<script setup>
import { ref, defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayerStore } from '@/stores';
import BaseAvailablePrior from '@/components/BaseAvailablePrior.vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();

const route = useRoute();
const playerStore = usePlayerStore();
const playerId = ref(route.params.playerId);
const player = ref(null);
const club = ref(null);
const availablePriorTittle = ref('Player career and some statistics are not currently available prior to the 2006/07 sessions. Click here for more details.');

onMounted(async () =>
{
    try
    {
        const data = await playerStore.getPlayerInfoById(playerId.value);
        if (data !== null)
        {
            player.value = await data.player;
            club.value = await data.club;

            nextMatch.value.homeClub.clubId = club.value.id;
            nextMatch.value.homeClub.name = club.value.name;
            nextMatch.value.homeClub.clubCrest = club.value.clubCrest;

        }
    } catch (error)
    {
        console.error("Fetching error:", error);
    }
});

</script>

<template>
    <div class="flex flex-1 flex-col gap-4">
        <div class="!bg-[#28002b] flex flex-col gap-2 rounded-2xl h-fit w-full p-4">
            <div class="flex flex-col gap-1">
                <span class="text-white text-2xl font-bold">2025/2026</span>
                <div class="flex items-center gap-1">
                    <div class="w-8 h-8 overflow-hidden">
                        <img :src="apiConfig.CLUB_DIR + club?.clubCrest" alt="Club Crest"
                            class="w-auto h-8 object-contain mx-auto pt-1" />
                    </div>
                    <span class="text-white text-sm">{{ club?.name }}</span>
                </div>
            </div>

            <div class="flex justify-between items-center">
                <span class="text-white text-md">Appearances (Sub)</span>
                <span class="text-white text-md font-bold">10 (0)</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-white text-md">Goals</span>
                <span class="text-white text-md font-bold">2</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-white text-md">Assists</span>
                <span class="text-white text-md font-bold">1</span>
            </div>

        </div>

        <div class="!bg-[#28002b] flex flex-col gap-2 rounded-2xl h-fit w-full p-4">
            <div class="flex flex-col gap-1">
                <span class="text-white text-2xl font-bold">2024/2025</span>
                <div class="flex items-center gap-1">
                    <div class="w-8 h-8 overflow-hidden">
                        <img :src="apiConfig.CLUB_DIR + club?.clubCrest" alt="Club Crest"
                            class="w-auto h-8 object-contain mx-auto pt-1" />
                    </div>
                    <span class="text-white text-sm">{{ club?.name }}</span>
                </div>
            </div>

            <div class="flex justify-between items-center">
                <span class="text-white text-md">Appearances (Sub)</span>
                <span class="text-white text-md font-bold">19 (8)</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-white text-md">Goals</span>
                <span class="text-white text-md font-bold">1</span>
            </div>
            <div class="flex justify-between items-center">
                <span class="text-white text-md">Assists</span>
                <span class="text-white text-md font-bold">2</span>
            </div>

        </div>
    </div>
    <BaseAvailablePrior :margin-top="'1rem'" />
</template>