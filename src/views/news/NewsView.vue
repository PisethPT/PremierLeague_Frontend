<script setup>
import { ref } from 'vue';
import PageTitleBase from '@/components/PageTitleBase.vue';
import
{
    CaretRight,
    ArrowLeft,
    ArrowRight,
} from '@element-plus/icons-vue';

const title = ref('News');
const latestNewsAndFeatures = ref(0);
const matchReports = ref(10);
const awards = ref(12);
const formTheClubs = ref(10);
const transfers = ref(5);
const fantasyPremierLeague = ref(5);
const communities = ref(5);
const statementsAndMediaReleases = ref(5);
const fixtures = ref(5);
const youth = ref(5);

const takeCount = ref(10);
const isAtStart = ref(true);
const isAtEnd = ref(false);
const awardsContainer = ref(null);

onMounted(async () =>
{
    latestNewsAndFeatures.value = takeCount.value;
});

function viewMore()
{
    takeCount.value = 10;
    latestNewsAndFeatures.value += takeCount.value;
}

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
    <div class="content-center">
        <PageTitleBase :title="title" />

        <div class="flex flex-1 flex-col gap-12 mt-4 mx-4">
            <!-- latest news & features -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <span class="text-white text-2xl font-bold">Latest News & Features</span>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    <div v-for="(value, index) in latestNewsAndFeatures" :key="index"
                        class="flex flex-col gap-2 rounded-2xl h-fit">
                        <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                            <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                            <div
                                class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                <el-icon>
                                    <CaretRight class="text-white" />
                                </el-icon>
                            </div>
                        </div>
                        <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                            Maxime, inventore.</span>
                        <span class="text-white text-xs">Features</span>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <button class="text-sm bg-white text-[#37003c] mt-4 px-4 py-2.5 rounded-3xl cursor-pointer w-fit"
                        @click="viewMore">View
                        More</button>
                </div>
            </div>

            <!-- match reports -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <span class="text-white text-2xl font-bold">Match Reports</span>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    <div v-for="(value, index) in matchReports" :key="index"
                        class="flex flex-col gap-2 rounded-2xl h-fit">
                        <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                            <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                            <div
                                class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                <el-icon>
                                    <CaretRight class="text-white" />
                                </el-icon>
                            </div>
                        </div>
                        <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                            Maxime, inventore.</span>
                        <span class="text-white text-xs">Match report</span>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <button class="text-sm bg-white text-[#37003c] mt-4 px-4 py-2.5 rounded-3xl cursor-pointer w-fit"
                        @click="viewMore">View
                        More</button>
                </div>
            </div>

            <!-- awards -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Awards</span>
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
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex items-start gap-4 w-full rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in awards" :key="index"
                            class="flex flex-col gap-2 rounded-2xl w-full h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[353px] h-[205px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur
                                adipisicing
                                elit.
                                Maxime, inventore.</span>
                            <span class="text-white text-xs">Awards</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- form the clubs -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <span class="text-white text-2xl font-bold">Form The Clubs</span>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    <div v-for="(value, index) in formTheClubs" :key="index"
                        class="flex flex-col gap-2 rounded-2xl h-fit">
                        <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                            <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                            <div
                                class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                <el-icon>
                                    <CaretRight class="text-white" />
                                </el-icon>
                            </div>
                        </div>
                        <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                            Maxime, inventore.</span>
                        <span class="text-white text-xs">Club news</span>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <button class="text-sm bg-white text-[#37003c] mt-4 px-4 py-2.5 rounded-3xl cursor-pointer w-fit"
                        @click="viewMore">View
                        More</button>
                </div>
            </div>

            <!-- transfers -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Transfers</span>
                    <div v-if="transfers > 5" class="flex gap-2">
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
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex items-start gap-4 w-full rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in transfers" :key="index"
                            class="flex flex-col gap-2 rounded-2xl w-full h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[353px] h-[205px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur
                                adipisicing
                                elit.
                                Maxime, inventore.</span>
                            <span class="text-white text-xs">Transfers</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- fantasy premier league -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Fantasy Premier League</span>
                    <div v-if="fantasyPremierLeague > 5" class="flex gap-2">
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
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex items-start gap-4 w-full rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in fantasyPremierLeague" :key="index"
                            class="flex flex-col gap-2 rounded-2xl w-full h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[353px] h-[205px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur
                                adipisicing
                                elit.
                                Maxime, inventore.</span>
                            <span class="text-white text-xs">Fantasy Premier League</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- communities -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Communities</span>
                    <div v-if="communities > 5" class="flex gap-2">
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
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex items-start gap-4 w-full rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in communities" :key="index"
                            class="flex flex-col gap-2 rounded-2xl w-full h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[353px] h-[205px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur
                                adipisicing
                                elit.
                                Maxime, inventore.</span>
                            <span class="text-white text-xs">More Than A Game</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- statements & media release -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Statements & Media Releases</span>
                    <div v-if="statementsAndMediaReleases > 5" class="flex gap-2">
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
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex items-start gap-4 w-full rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in statementsAndMediaReleases" :key="index"
                            class="flex flex-col gap-2 rounded-2xl w-full h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[353px] h-[205px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur
                                adipisicing
                                elit.
                                Maxime, inventore.</span>
                            <span class="text-white text-xs">Statements</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- fixtures -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <span class="text-white text-2xl font-bold">Fixtures</span>
                <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    <div v-for="(value, index) in fixtures" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                        <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                            <a href="#" class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                            <div
                                class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                <el-icon>
                                    <CaretRight class="text-white" />
                                </el-icon>
                            </div>
                        </div>
                        <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit.
                            Maxime, inventore.</span>
                        <span class="text-white text-xs">Fixtures</span>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <button class="text-sm bg-white text-[#37003c] mt-4 px-4 py-2.5 rounded-3xl cursor-pointer w-fit"
                        @click="viewMore">View
                        More</button>
                </div>
            </div>

            <!-- youth -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Youth</span>
                    <div v-if="youth > 5" class="flex gap-2">
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
                    </div>
                </div>
                <div ref="awardsContainer">
                    <div class="flex items-start gap-4 w-full rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in youth" :key="index"
                            class="flex flex-col gap-2 rounded-2xl w-full h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[353px] h-[205px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur
                                adipisicing
                                elit.
                                Maxime, inventore.</span>
                            <span class="text-white text-xs">Youth</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </div>
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