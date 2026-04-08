<script setup>
import { ref, onMounted } from 'vue';
import
{
    CaretRight,
} from '@element-plus/icons-vue';

const videoUrl = ref('/src/assets/clubs/arsenal/video/');
const allVideos = ref(0);
const takeCount = ref(12);

onMounted(async () =>
{
    allVideos.value = takeCount.value;
});

function viewMore()
{
    takeCount.value = 6;
    allVideos.value += takeCount.value;
}

</script>

<template>
    <div class="!bg-[#28002b] flex flex-1 items-center flex-col rounded-2xl h-fit w-full p-4 gap-4">
        <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-4 rounded-2xl h-fit">
            <div v-for="(value, index) in allVideos" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                <div class="flex bg-[#4b1254] rounded-2xl h-[205px] relative overflow-hidden">
                    <a href="#"
                        class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full overflow-hidden">
                        <img :src="videoUrl + (index + 1) + '.webp'" :alt="(index + 1)" class="w-full object-contain">
                    </a>
                    <div
                        class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                        <el-icon>
                            <CaretRight class="text-white" />
                        </el-icon>
                    </div>
                </div>
                <span class="text-white text-md font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Maxime, inventore.</span>
            </div>
        </div>
        <button class="text-sm bg-white text-[#37003c] mt-4 px-4 py-2.5 rounded-3xl cursor-pointer w-fit"
            @click="viewMore">View
            More</button>
    </div>
</template>