<script setup>
import { ref, onMounted } from 'vue';
import PageTitleBase from '@/components/PageTitleBase.vue';
import
{
    CaretRight,
} from '@element-plus/icons-vue';

const title = ref('Series');

onMounted(async () =>
{
    // auto scroll up
    window.scrollTo({ top: 0, behavior: 'auto' });
});

</script>
<template>
    <div class="content-center">
        <PageTitleBase :title="title" />

        <div class="flex flex-1 flex-col gap-12 mt-13 mx-4">
            <!-- premier league originals -->
            <div class="flex flex-col gap-5 !bg-[#28002b] rounded-2xl w-full p-4">
                <div class="flex justify-between items-center">
                    <span class="text-white text-2xl font-bold">Premier League Originals</span>
                </div>
                <div ref="awardsContainer">
                    <div class="flex gap-4 rounded-t-2xl overflow-x-auto scrollbar-none">
                        <div v-for="(value, index) in 4" :key="index" class="flex flex-col gap-2 rounded-2xl h-fit">
                            <div class="flex bg-[#4b1254] rounded-2xl w-[335px] h-[500px] relative overflow-hidden">
                                <a href="#"
                                    class="hover:bg-[#edaef777] flex justify-center items-center w-full h-full"></a>
                                <div
                                    class="absolute text-center bg-[#28002b] !w-7 !h-7 rounded-full !bottom-2 !right-2 flex justify-center items-center">
                                    <el-icon>
                                        <CaretRight class="text-white" />
                                    </el-icon>
                                </div>
                            </div>
                            <span class="text-white text-md font-bold text-wrap w-[300px]">Lorem ipsum dolor</span>
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
</style>
