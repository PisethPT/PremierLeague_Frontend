<script setup>
import { computed } from 'vue';
import
{
    ArrowUp,
    ArrowDown,
    Minus,
} from '@element-plus/icons-vue';

const props = defineProps({
    data: {
        type: Array,
        required: true
    },
    showCols: {
        type: Object,
        default: () => ({
            played: true, wins: true, draws: true, losses: true,
            gf: true, ga: true, gd: true, form: true, points: true, next: true
        })
    },
    selectedClubId: {
        type: [Number, String],
        required: false,
        default: null,
    },
});

import { useApi } from '@/stores/api';

const apiConfig = useApi();
const statsGridStyle = computed(() =>
{
    const widths = {
        played: '50px', wins: '50px', draws: '50px', losses: '50px',
        gf: '50px', ga: '50px', gd: '50px', form: '170px', points: '50px', next: '60px'
    };

    let cols = "";
    Object.keys(widths).forEach(key =>
    {
        if (props.showCols[key]) cols += widths[key] + " ";
    });

    return { gridTemplateColumns: cols.trim() };
});

const getFormStyle = (f) =>
{
    return {
        backgroundColor: f === 'W' ? '#22c55e' : f === 'D' ? '#e5e7eb' : '#ef4444',
        color: f === 'D' ? '#000' : '#fff'
    };
};

const formatUrl = (name) => name?.toString().toLowerCase().replace(/\s+/g, '-') || '';

const isSelected = (id) => Number(id) === Number(props.selectedClubId);
</script>

<template>
    <div class="flex-1 overflow-x-auto overflow-y-auto mt-4 mx-4 rounded-2xl !bg-[#28002b] py-4 pe-2 custom-scrollbar">
        <div class="min-w-fit px-2">

            <div class="grid grid-cols-[90px_300px_1fr] text-white font-normal text-[16px] pb-2 mb-2">
                <div class="sticky left-0 bg-[#28002b] z-20 px-3 text-center">Pos</div>
                <div class="sticky left-[90px] bg-[#28002b] z-20 px-3 w-fit">Team</div>

                <div class="grid justify-self-end pr-6" :style="statsGridStyle">
                    <div v-if="showCols.played" class="text-center">PI</div>
                    <div v-if="showCols.wins" class="text-center">W</div>
                    <div v-if="showCols.draws" class="text-center">D</div>
                    <div v-if="showCols.losses" class="text-center">L</div>
                    <div v-if="showCols.gf" class="text-center">GF</div>
                    <div v-if="showCols.ga" class="text-center">GA</div>
                    <div v-if="showCols.gd" class="text-center">GD</div>
                    <div v-if="showCols.form" class="text-center">Form</div>
                    <div v-if="showCols.points" class="text-center">Pts</div>
                    <div v-if="showCols.next" class="text-center">Next</div>
                </div>
            </div>

            <div v-for="row in data" :key="row.position"
                class="relative grid grid-cols-[90px_300px_1fr] items-center text-white text-sm hover:bg-[#3a0040] rounded-lg transition h-[59px] mt-1 group"
                :class="{ '!bg-[#3a0040]': isSelected(row.clubId) }">

                <div class="sticky left-0 z-10 p-3 text-lg font-bold text-center flex items-center justify-center gap-6 transition rounded-l-lg"
                    :class="[isSelected(row.clubId) ? 'bg-[#3a0040]' : 'bg-[#28002b] group-hover:bg-[#3a0040]']">
                    {{ row.position }}
                    <div class="flex items-center justify-center w-3">
                        <ArrowUp v-if="row.positionStatus == 'UP'" class="text-green-600 w-3 h-3" />
                        <ArrowDown v-else-if="row.positionStatus == 'DOWN'" class="text-red-600 w-3 h-3" />
                        <Minus v-else-if="row.positionStatus == 'SAME'" class="text-gray-600 w-3 h-3" />
                        <Minus v-else class="text-gray-600 w-3 h-3" />
                    </div>
                </div>

                <div class="sticky left-[90px] z-10 p-3 font-bold flex items-center gap-2 whitespace-nowrap w-fit transition"
                    :class="[isSelected(row.clubId) ? 'bg-[#3a0040]' : 'bg-[#28002b] group-hover:bg-[#3a0040]']">
                    <img :src="apiConfig.CLUB_DIR + row.clubCrest" class="w-8 h-8 object-contain" alt="crest" />
                    <router-link
                        :to="{ name: 'clubs-overview', params: { clubId: row.clubId, clubName: formatUrl(row.clubName) } }"
                        class="text-[17px] font-bold cursor-pointer hover:underline">{{ row.clubName }}</router-link>
                </div>

                <div class="grid justify-self-end pr-6 items-center" :style="statsGridStyle">
                    <div v-if="showCols.played" class="text-center">{{ row.played }}</div>
                    <div v-if="showCols.wins" class="text-center">{{ row.wins }}</div>
                    <div v-if="showCols.draws" class="text-center">{{ row.draws }}</div>
                    <div v-if="showCols.losses" class="text-center">{{ row.losses }}</div>
                    <div v-if="showCols.gf" class="text-center">{{ row.gf }}</div>
                    <div v-if="showCols.ga" class="text-center">{{ row.ga }}</div>
                    <div v-if="showCols.gd" class="text-center">{{ row.gd }}</div>

                    <div v-if="showCols.form" class="flex justify-center gap-1 px-2">
                        <div v-for="(f, i) in row.form.split(',')" :key="i"
                            class="w-6 h-6 text-[10px] font-bold rounded-full flex items-center justify-center text-center flex-shrink-0"
                            :style="getFormStyle(f.trim())">
                            {{ f.trim() }}
                        </div>
                    </div>

                    <div v-if="showCols.points" class="text-center font-bold text-md">{{ row.points }}</div>

                    <div v-if="showCols.next" class="flex items-center justify-center">
                        <img v-if="row.next" :src="apiConfig.CLUB_DIR + row.next" class="w-8 h-8 object-contain"
                            alt="next match" />
                    </div>
                </div>

                <div v-if="row.qualification == 'UCL'"
                    class="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r-lg z-30"></div>
                <div v-else-if="row.qualification == 'UEL'"
                    class="absolute left-0 top-0 h-full w-1 bg-orange-500 rounded-r-lg z-30"></div>
                <div v-else-if="row.qualification == 'RELEGATION'"
                    class="absolute left-0 top-0 h-full w-1 bg-pink-500 rounded-r-lg z-30"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    height: 8px;
    width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: #28002b;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #3a0040;
    border-radius: 10px;
}

.sticky {
    position: sticky !important;
}
</style>