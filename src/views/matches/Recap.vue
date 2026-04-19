<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useMatchStore } from '@/stores';
import
{
    CaretRight,
    ArrowRight,
    ArrowLeft,
    Sort,
    Edit,
} from '@element-plus/icons-vue';

const matchStore = useMatchStore();
const route = useRoute();
const matchId = ref(route.params.matchId);
const isAtStart = ref(true);
const isAtEnd = ref(false);
const relatedContent = ref(3);
const recapData = ref(null);

const isReportOpen = ref(false);

const parsedContent = computed(() =>
{
    if (!recapData.value || !recapData.value.content) return [];

    return recapData.value.content.split(/\r\n|\n\r|\n|\r/).map(line =>
    {
        const trimmed = line.trim();
        if (!trimmed) return null;

        if (trimmed.startsWith('***') && trimmed.endsWith('***'))
        {
            return { type: 'title', value: trimmed.replace(/\*\*\*/g, '') };
        }

        if (trimmed.includes('@@@'))
        {
            const linkRegex = /@@@(.*?)\@@@/g;
            const links = [];
            let match;
            while ((match = linkRegex.exec(trimmed)) !== null)
            {
                links.push(match[1]);
            }
            return { type: 'links', value: links };
        }

        return { type: 'text', value: trimmed };
    }).filter(item => item !== null);
});

onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });
    try
    {
        await matchStore.getMatchRecap({ matchId: matchId.value });
        recapData.value = matchStore.matchRecap;
        console.log('recap: ' + recapData.value);
    } catch (error)
    {
        console.error(error);
    }
});

const scrollAwards = (direction) =>
{
    const container = awardsContainer.value
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
    const container = awardsContainer.value
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container

    isAtStart.value = scrollLeft <= 5
    isAtEnd.value = scrollLeft + clientWidth >= scrollWidth - 5
}

</script>

<template>
    <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex flex-col gap-4 lg:w-2/3">
            <div class="bg-[#28002b] flex flex-col rounded-2xl w-full h-60 p-4">
                <div class="flex justify-between mb-2">
                    <h3 class="text-white text-xl font-bold">Report</h3>
                    <button @click="isReportOpen = true"
                        class="bg-[#37003c] hover:bg-[#4a0052] transition-colors flex items-center justify-center rounded-full w-10 h-10 cursor-pointer">
                        <el-icon>
                            <Sort class="text-white rotate-45 scale-x-90" />
                        </el-icon>
                    </button>
                </div>
                <span v-if="recapData" class="text-white text-sm font-normal line-clamp-[7] whitespace-pre-line leading-relaxed">
                    {{ recapData.content }}
                </span>
            </div>
            <div class="flex w-full gap-4">
                <div class="bg-[#28002b] flex flex-col gap-4 rounded-2xl w-1/2 h-fit p-4">
                    <div class="flex justify-start items-center gap-3">
                        <div class="flex justify-center items-end rounded-xl w-[40px] h-[40px] p-1 overflow-hidden"
                            :style="{ backgroundColor: recapData?.homeClubTheme || '#37003c' }">
                            <img :src="recapData?.homeClubCrest" class="w-full h-full object-contain">
                        </div>
                        <span class="font-bold text-md text-white/50">{{ recapData?.homeClubName }}</span>
                    </div>
                    <span class="text-white text-md font-bold">{{ recapData?.homeClubName }} Report</span>
                    <a :href="recapData?.homeClubReportUrl" target="_blank"
                        class=" text-xs border-1 text-white w-fit rounded-3xl py-2 px-3 hover:bg-white hover:text-black text-center hover:cursor-pointer">
                        {{ recapData?.homeClubSite }}
                        <el-icon class="text-center">
                            <Edit />
                        </el-icon>
                    </a>
                </div>
                <div class="bg-[#28002b] flex flex-col gap-4 rounded-2xl w-1/2 h-fit p-4">
                    <div class="flex justify-start items-center gap-3">
                        <div class="flex justify-center items-end rounded-xl w-[40px] h-[40px] p-1 overflow-hidden"
                            :style="{ backgroundColor: recapData?.awayClubTheme || '#37003c' }">
                            <img :src="recapData?.awayClubCrest" class="w-full h-full object-contain">
                        </div>
                        <span class="font-bold text-md text-white/50">{{ recapData?.awayClubName }}</span>
                    </div>
                    <span class="text-white text-md font-bold">{{ recapData?.awayClubName }} Report</span>
                    <a :href="recapData?.homeClubReportUrl" target="_blank"
                        class=" text-xs border-1 text-white w-fit rounded-3xl py-2 px-3 hover:bg-white hover:text-black text-center hover:cursor-pointer">
                        {{ recapData?.awayClubSite }}
                        <el-icon class="text-center">
                            <Edit />
                        </el-icon>
                    </a>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1 rounded-2xl pt-4 px-4 lg:w-1/3 h-80 lg:h-auto overflow-hidden"
            :style="{ backgroundColor: recapData?.isHomeClubPlayerManOfTheMatch ? recapData?.homeClubTheme : recapData?.awayClubTheme }">
            <div class="flex flex-col gap-0">
                <span class="text-white text-md font-normal">{{ recapData?.firstName }}</span>
                <span class="text-white text-2xl font-bold">{{ recapData?.lastName }}</span>
                <span class="text-white text-md font-normal">{{ recapData?.position }}</span>
                <button
                    class="bg-[#ffffff2b] text-white text-center text-sm px-3 py-1 mt-4 rounded-2xl w-fit text-nowrap whitespace-nowrap cursor-pointer">
                    View stats <i class="fas fa-chevron-right !text-[8px]"></i>
                </button>
            </div>
            <div class="flex justify-between items-end gap-1 h-full">
                <span class="text-white text-md font-bold mb-4">Player of the Match</span>
                <img :src="recapData?.photo" class="w-auto h-56 object-contain cursor-pointer" />
            </div>
        </div>
    </div>

    <div class="flex flex-col gap-5 !bg-[#28002b] w-full rounded-2xl p-4">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">Related Content</span>
            <div class="flex gap-2">
                <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                    isAtStart
                        ? 'bg-[#1d001f] opacity-40'
                        : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                ]" :disabled="isAtStart" @click="scrollAwards('left')">
                    <el-icon>
                        <ArrowLeft class="text-white" />
                    </el-icon>
                </button>
                <button class="flex items-center justify-center rounded-full bg-[#3e003f] w-8 h-8" :class="[
                    isAtEnd
                        ? 'bg-[#1d001f] opacity-40'
                        : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer'
                ]" :disabled="isAtEnd" @click="scrollAwards('right')">
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
                <a href="#"
                    class="flex items-center justify-start rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-4 hover:underline whitespace-nowrap">
                    See All
                    <el-icon>
                        <ArrowRight class="text-white" />
                    </el-icon>
                </a>
            </div>
        </div>
        <div ref="awardsContainer">
            <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                <div v-for="(value, index) in relatedContent" :key="index"
                    class="flex flex-col gap-2 rounded-2xl w-[300px] h-fit">
                    <div class="flex bg-[#4b1254] rounded-2xl w-[300px] h-[160px] relative overflow-hidden">
                        <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                        <div
                            class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>
                    <span class="text-white text-md font-bold text-wrap ">Lorem ipsum dolor sit amet,
                        consectetur
                        adipisicing
                        elit.
                        Maxime, inventore.</span>
                </div>
            </div>
        </div>
    </div>

    <el-drawer v-model="isReportOpen" class="!bg-[#1a011d] custom-report-drawer" :size="'50%'" direction="rtl">
        <template #header>
            <div class="flex flex-col gap-2">
                <h4 class="text-white font-bold text-3xl">Match Report</h4>
            </div>
        </template>

        <template #default>
            <div class="flex flex-col gap-6 pb-10">

                <div v-for="(block, index) in parsedContent" :key="index">

                    <h3 v-if="block.type === 'title'" class="text-white text-md font-bold mt-4 mb-2">
                        {{ block.value }}
                    </h3>

                    <div v-else-if="block.type === 'links'" class="flex items-center gap-0 text-md">
                        <template v-for="(linkText, lIdx) in block.value" :key="lIdx">
                            <a href="#" :class="[
                                'hover:underline cursor-pointer transition-colors',
                                lIdx === 0 ? 'text-white' : 'text-[#e91e63]'
                            ]">
                                {{ linkText }}
                            </a>

                            <span v-if="lIdx < block.value.length - 1" class="text-white mx-1">|</span>
                        </template>
                    </div>

                    <p v-else class="text-gray-200 text-md leading-relaxed">
                        {{ block.value }}
                    </p>

                </div>
            </div>
        </template>
    </el-drawer>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}

.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>