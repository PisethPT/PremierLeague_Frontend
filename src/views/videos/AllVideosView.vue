<script setup>
import { ref, onMounted } from 'vue';
import PageTitleBase from '@/components/PageTitleBase.vue';
import SponsorBar from '@/components/SponsorBar.vue';
import
{
    CaretRight,
} from '@element-plus/icons-vue';

const sponsorImage = ref('/src/assets/sponsors/9044630324637544770.png');
const title = ref('All Videos');
const takeCount = ref(10);
const allVideos = ref(0);

onMounted(async () =>
{
    window.scrollTo({ top: 0, behavior: 'auto' });
    allVideos.value = 10;
})

function viewMore()
{
    takeCount.value = 10;
    allVideos.value += takeCount.value;
}
</script>

<template>
    <div class="content-center">
        <SponsorBar :sponsorImage="sponsorImage" :rounded="false" />
        <PageTitleBase :title="title" />
        <div class="flex flex-1 flex-col gap-12 mt-8 mx-4">
            <!-- latest news & features -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    <div v-for="(value, index) in allVideos" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
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
        </div>
    </div>
</template>

<style scoped>
html,
body {
    background: #1e0021 !important;
}
</style>