<script setup>
import { defineProps, computed } from 'vue';
import { CaretRight } from '@element-plus/icons-vue';

const props = defineProps({
    isVideo: {
        type: Boolean,
        default: false,
    },
    related: {
        type: Object,
        required: false,
        default: () => ({
            relatedId: 0,
            title: '',
            tagName: '',
            thumbnail: '',
            referenceUrl: '',
            isVideo: false,
        })
    },
});

const getSlug = (title) =>
    (title || '')
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

const linkTo = computed(() =>
{
    if (props.related.referenceUrl) return null;

    if (props.isVideo)
    {
        return {
            name: 'video-viewer',
            params: {
                videoId: String(props.related.relatedId),
                videoTitle: getSlug(props.related.title),
            },
        };
    }

    return {
        name: 'news-viewer',
        params: {
            newsId: String(props.related.relatedId),
            newsTitle: getSlug(props.related.title),
        },
    };
});
</script>

<template>
    <div class="flex justify-between gap-4 relative">
        <div class="flex flex-col justify-between">
            <span class="text-white sm:text-xs xl:text-sm font-bold">
                {{ related.title }}
            </span>
            <span class="text-white sm:text-md text-xs">
                {{ related.tagName }}
            </span>
        </div>

        <img :src="related.thumbnail" alt="" class="bg-[#37003c] w-[120px] h-[70px] rounded-2xl object-cover" />
        <a v-if="related.referenceUrl" :href="related.referenceUrl" target="_blank"
            class="absolute inset-0 z-10 block cursor-pointer"></a>

        <router-link v-else-if="linkTo" :to="linkTo" class="absolute inset-0 z-10 block cursor-pointer"></router-link>

        <div v-if="related.isVideo"
            class="absolute bg-[#28002b] w-7 h-7 rounded-full bottom-2 right-2 flex justify-center items-center z-20 pointer-events-none">
            <el-icon>
                <CaretRight class="text-white" />
            </el-icon>
        </div>
    </div>
</template>