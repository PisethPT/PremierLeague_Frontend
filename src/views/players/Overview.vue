<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayerStore, useClubStore } from '@/stores';
import BaseClubNextMatchCard from '@/components/BaseClubNextMatchCard.vue';
import BaseTeamForm from '@/components/BaseTeamForm.vue';
import ClubNewsSection from '@/components/ClubNewsSection.vue';
import { ArrowRightBold, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const route = useRoute();
const playerStore = usePlayerStore();
const clubStore = useClubStore();
const playerId = ref(route.params.playerId);
const clubId = ref(null);
const teammatesContainer = ref(null);
const teammates = ref([]);
const isAtStart = ref(true);
const isAtEnd = ref(false);

const clubDetails = ref(null);
const nextMatch = ref(null);
const clubNews = ref([]);
const clubServices = ref([]);
const previous = ref([]);
const upcoming = ref([]);
const isPrevious = ref(true);
const isPreviousActive = ref('#1e0021');
const isUpcomingActive = ref('');

onMounted(async () =>
{
    try
    {
        await playerStore.getPlayerClub({ playerId: playerId.value });

        if (playerStore.playerClub !== null)
        {
            clubId.value = playerStore.playerClub.clubId;
            await clubStore.getClubOverviewNextMatchAndTeamForm({ clubId: clubId.value });
            await clubStore.getClubNewsAndServices({ clubId: clubId.value });

            const overview = clubStore.overview;
            nextMatch.value = overview.nextMatch;
            clubDetails.value = overview.clubDetail;
            previous.value = JSON.parse(JSON.stringify(overview.teamFormPrevious));
            upcoming.value = JSON.parse(JSON.stringify(overview.teamFormUpcoming));

            const clubNewsAndServices = clubStore.clubNewsAndServices;
            clubNews.value = JSON.parse(JSON.stringify(clubNewsAndServices.fromTheClubs));
            clubServices.value = JSON.parse(JSON.stringify(clubNewsAndServices.clubServices));
        }

        await playerStore.getPlayerTeammates({ playerId: playerId.value });
        teammates.value = playerStore.teammates;
    } catch (error)
    {
        console.error("Fetching error:", error);
    }
});

function toggleMatchView(view)
{
    if (view === 'previous')
    {
        isPrevious.value = true;
        isPreviousActive.value = '#1e0021';
        isUpcomingActive.value = '';
    } else if (view === 'upcoming')
    {
        isPrevious.value = false;
        isPreviousActive.value = '';
        isUpcomingActive.value = '#1e0021';
    }
}

const scrollTeammates = (direction) =>
{
    const container = teammatesContainer.value
    if (!container) return

    const scrollAmount = 335
    const behavior = "smooth"

    if (direction === "left")
    {
        container.scrollBy({ left: -scrollAmount, behavior })
    } else if (direction === "right")
    {
        container.scrollBy({ left: scrollAmount, behavior })
    }

    // recheck after scroll animation
    setTimeout(checkScroll, 200)
}

const checkScroll = () =>
{
    const container = teammatesContainer.value
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    isAtStart.value = scrollLeft <= 5
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 5
}

</script>

<template>
    <div class="flex flex-1 flex-col gap-4">
        <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div class="flex flex-wrap gap-4 h-fit">
                <BaseClubNextMatchCard :next-match="nextMatch" />
            </div>

            <!-- team form -->
            <div class="!bg-[#28002b] rounded-2xl h-[228px] w-full p-4 flex flex-col gap-2">

                <div class="flex justify-between items-center">
                    <span class="font-bold text-md text-white">
                        Team Form
                        <el-icon>
                            <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                        </el-icon>
                    </span>

                    <div class="!bg-[#37003c] flex justify-center items-center gap-1 px-1 py-1 rounded-sm">
                        <button @click="toggleMatchView('previous')" :style="{ backgroundColor: isPreviousActive }"
                            class="font-bold text-xs text-white px-3 py-2 rounded-sm cursor-pointer transition-all duration-200 hover:bg-[rgba(72,5,78,0.35)] active:scale-95">
                            Previous
                        </button>
                        <button @click="toggleMatchView('upcoming')" :style="{ backgroundColor: isUpcomingActive }"
                            class="font-bold text-xs text-white px-3 py-2 rounded-sm cursor-pointer transition-all duration-200 hover:bg-[rgba(72,5,78,0.35)] active:scale-95">
                            Upcoming
                        </button>
                    </div>
                </div>

                <div class="flex flex-row items-center gap-2 w-full justify-start">
                    <img v-if="clubDetails" :src="clubDetails.clubCrest" class="h-5 w-auto" />
                    <span class="text-white font-semibold text-xs truncate">
                        {{ clubDetails?.clubName }}
                    </span>
                </div>

                <BaseTeamForm :is-previous="isPrevious" :data="isPrevious ? previous : upcoming" />

            </div>
        </div>

        <div class="bg-transparent w-full rounded-2xl h-75 pb-2">
            <div class="flex justify-between items-center w-full h-fit mb-2">
                <h2 class="text-white text-md font-bold mb-4">Teammates</h2>
                <div class="flex gap-2">
                    <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                        isAtStart
                            ? 'bg-[#1d001f] opacity-40'
                            : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                    ]" :disabled="isAtStart" @click="scrollTeammates('left')">
                        <el-icon>
                            <ArrowLeft class="text-white" />
                        </el-icon>
                    </button>
                    <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                        isAtEnd
                            ? 'bg-[#1d001f] opacity-40'
                            : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                    ]" :disabled="isAtEnd" @click="scrollTeammates('right')">
                        <el-icon>
                            <ArrowRight class="text-white" />
                        </el-icon>
                    </button>
                </div>
            </div>

            <div ref="teammatesContainer"
                class="flex flex-col items-start flex-wrap gap-4 overflow-x-auto scrollbar-none rounded-t-2xl w-full h-75">
                <div v-for="(player, index) in teammates" :key="index"
                    class="flex gap-2 bg-[#28002b] rounded-2xl p-3 w-[320px] h-18">
                    <div class="rounded-[14px] w-12 h-12 overflow-hidden"
                        :style="{ backgroundColor: player?.clubTheme }">
                        <img :src="player?.playerPhoto" class="w-auto h-12 object-contain mx-auto pt-1" />
                    </div>
                    <div class="flex flex-col justify-center items-start gap-1">
                        <RouterLink
                            :to="{ name: 'player-overview', params: { playerId: player.playerId, playerName: player.playerName?.toString().replace(/\s+/g, '_').toLowerCase() } }"
                            class="md:text-sm text-xs text-white hover:underline">{{ player.playerName }}</RouterLink>
                        <span class="tmd:text-sm text-xs text-gray-400"> {{
                            player?.playerNumber }} {{ player?.position }}</span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="clubNews.length > 0" class="flex gap-4 px-3 py-4">
            <ClubNewsSection :club-details="clubDetails" :news-items="clubNews" title="From the Clubs"
                @see-all="handleSeeAll" />
        </div>

        <div v-if="clubServices.length > 0" class="flex gap-4 px-3">
            <div class="flex flex-col items-start gap-2 !bg-[#28002b] rounded-2xl h-auto flex-1 p-4">
                <a :href="service.serviceUrl" target="_blank" v-for="service in clubServices" :key="service.serviceId"
                    class="flex justify-between items-center w-full px-3 py-2 rounded-xl hover:!bg-[#37003c]">
                    <span class="font-bold text-md text-white">{{ service.serviceName }}</span>
                    <el-icon>
                        <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                    </el-icon>
                </a>
            </div>
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