<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePlayerStore, useClubStore } from '@/stores';
import BaseSingleMatchSection from '@/components/BaseSingleMatchSection.vue';

import { ArrowDown, ArrowLeft, ArrowRight } from '@element-plus/icons-vue';

const route = useRoute();
const clubId = ref(null);
const playerId = ref(route.params.playerId);
const month = ref(6);
const clubStore = useClubStore();
const playerStore = usePlayerStore();
const matchData = ref([]);
const months = ref([]);
const minValue = ref(0);
const maxValue = ref(0);

onMounted(async () =>
{
    window.scrollTo(0, 0);

    try
    {

        await playerStore.getPlayerClub({ playerId: playerId.value });

        if (playerStore.playerClub !== null)
        {
            clubId.value = playerStore.playerClub.clubId;

            const response = await clubStore.getClubMonthOfMatch({
                clubId: clubId.value,
                seasonId: 4
            });

            months.value = response;

            if (months.value.length > 0)
            {
                minValue.value = months.value[0].monthNumber;
                maxValue.value = months.value[months.value.length - 1].monthNumber;
                month.value = maxValue.value;
                await loadData(month.value);
            }
        }

    } catch (error)
    {
        console.error('Error fetching matches:', error);
    }

    await loadData(month.value);
});

const nextOrPrevious = (direction) =>
{
    const currentIndex = months.value.findIndex(m => m.monthNumber === month.value);

    if (direction === 'next' && currentIndex < months.value.length - 1)
    {
        const nextMonth = months.value[currentIndex + 1];
        month.value = nextMonth.monthNumber;
        loadData(month.value);
    }
    else if (direction === 'prev' && currentIndex > 0)
    {
        const prevMonth = months.value[currentIndex - 1];
        month.value = prevMonth.monthNumber;
        loadData(month.value);
    }
}

const loadData = async (param) =>
{
    try
    {
        const response = await clubStore.getClubMatches({
            clubId: clubId.value,
            month: param
        });
        matchData.value = response;
    } catch (error)
    {
        console.error('Error fetching matches:', error);
    }
}
</script>

<template>
    <div class="flex flex-1 flex-col gap-4">

        <button
            class="bg-transparent text-center text-sm text-white px-3 py-2 rounded-md border-2 border-[#3e003f] w-fit cursor-pointer">2025/25
            <el-icon>
                <ArrowDown />
            </el-icon>
        </button>

        <div class="flex justify-center items-center w-full gap-10">
            <button @click="nextOrPrevious('prev')" :disabled="months.findIndex(m => m.monthNumber === month) <= 0"
                class="flex items-center justify-center rounded-full w-10 h-10"
                :class="[months.findIndex(m => m.monthNumber === month) <= 0 ? 'opacity-40 bg-[#2e0430]' : 'bg-[#37003c] cursor-pointer']">
                <el-icon>
                    <ArrowLeft class="text-white" />
                </el-icon>
            </button>

            <div class="flex justify-center items-center flex-col min-w-[120px]">
                <span class="text-white text-xl font-bold">
                    {{months.find(m => m.monthNumber === month)?.monthName}}
                </span>
            </div>

            <button @click="nextOrPrevious('next')"
                :disabled="months.findIndex(m => m.monthNumber === month) >= months.length - 1"
                class="flex items-center justify-center rounded-full w-10 h-10"
                :class="[months.findIndex(m => m.monthNumber === month) >= months.length - 1 ? 'opacity-40 bg-[#2e0430]' : 'bg-[#37003c] cursor-pointer']">
                <el-icon>
                    <ArrowRight class="text-white" />
                </el-icon>
            </button>
        </div>

        <div v-if="matchData.length > 0" class="!bg-[#28002b] rounded-2xl h-fit w-full pt-4">
            <BaseSingleMatchSection v-for="match in matchData" :key="match.matchDate" :matchDate="match.matchDate"
                :match="match" />
        </div>
    </div>
</template>