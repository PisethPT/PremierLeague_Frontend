<script setup>
import { defineProps, defineEmits } from 'vue';
import { ArrowRight, ArrowLeft, CaretRight } from '@element-plus/icons-vue';

const emits = defineEmits(['viewAll', 'scrollAwards']);

const props = defineProps({
    title: { type: String, required: true },
    topics: {
        type: Array,
        required: true,
        default: () => []
    },
    allButtonTitle: { type: String, default: 'View more' },
    isAllButton: { type: Boolean, default: false },
    isPreviousAndNextButtons: { type: Boolean, default: false },
    isAtStart: { type: Boolean, default: false },
    isAtEnd: { type: Boolean, default: false }
});

const getSlug = (title) => (title || '').toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
</script>

<template>
    <div class="flex flex-col gap-5 bg-[#28002b] rounded-2xl w-full p-4">
        <div class="flex justify-between items-center">
            <span class="text-white text-2xl font-bold">{{ props.title }}</span>
            <div class="flex gap-2">
                <div v-if="props.isPreviousAndNextButtons" class="flex gap-2">
                    <button
                        class="flex items-center justify-center rounded-full w-8 h-8 transition disabled:cursor-not-allowed"
                        :class="[props.isAtStart ? 'bg-[#1d001f] opacity-40' : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer']"
                        :disabled="props.isAtStart" @click="emits('scrollAwards', 'left')">
                        <el-icon>
                            <ArrowLeft class="text-white" />
                        </el-icon>
                    </button>
                    <button
                        class="flex items-center justify-center rounded-full w-8 h-8 transition disabled:cursor-not-allowed"
                        :class="[props.isAtEnd ? 'bg-[#1d001f] opacity-40' : 'bg-[#3e003f] hover:bg-[#55005a] cursor-pointer']"
                        :disabled="props.isAtEnd" @click="emits('scrollAwards', 'right')">
                        <el-icon>
                            <ArrowRight class="text-white" />
                        </el-icon>
                    </button>
                </div>
                <button v-if="props.isAllButton && props.topics.length > 0" @click="emits('viewAll')"
                    class="flex items-center justify-start rounded-full bg-[#3e003f] text-xs text-white w-fit h-8 px-4 hover:underline cursor-pointer whitespace-nowrap">
                    {{ props.allButtonTitle }}
                    <el-icon class="ml-1">
                        <ArrowRight class="text-white" />
                    </el-icon>
                </button>
            </div>
        </div>

        <div class="w-full">
            <div class="flex items-start gap-4 w-full overflow-x-auto scrollbar-none pb-2">
                <div v-for="item in props.topics" :key="item.topicId"
                    class="flex flex-col gap-2 rounded-2xl h-fit flex-shrink-0 w-[300px]">

                    <div class="relative w-[300px] h-[160px] bg-[#4b1254] rounded-2xl overflow-hidden group">
                        <img :src="item.thumbnail || '/images/placeholder.jpg'"
                            class="absolute inset-0 w-full h-full object-cover" alt="thumbnail" />
                        <a v-if="item.topicUrl" :href="item.topicUrl" target="_blank"
                            class="absolute inset-0 block z-10 transition-colors cursor-pointer">
                        </a>
                        <router-link v-else :to="{
                            name: 'news-viewer',
                            params: {
                                newsId: String(item.topicId),
                                newsTitle: getSlug(item.title)
                            }
                        }" class="absolute inset-0 block z-10 transition-colors cursor-pointer">
                        </router-link>

                        <div v-if="item.isVideo"
                            class="absolute bottom-2 right-2 bg-[#28002b] w-7 h-7 rounded-full flex justify-center items-center z-10 pointer-events-none">
                            <el-icon>
                                <CaretRight class="text-white" />
                            </el-icon>
                        </div>
                    </div>

                    <div class="flex flex-col gap-1">
                        <span class="text-white text-md font-bold line-clamp-2">{{ item.title }}</span>
                        <span class="text-white text-xs mt-1">{{ item.topicTag }}</span>
                    </div>
                </div>
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