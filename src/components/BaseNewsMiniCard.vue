<script setup>
import { defineProps, computed } from 'vue';
import { CaretRight } from '@element-plus/icons-vue';
import { sk } from 'element-plus/es/locales.mjs';

const props = defineProps({
    isVideo: {
        type: Boolean,
        default: false,
    },
    isLoading: {
        type: Boolean,
        default: false
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
    skeleton: {
        type: Number,
        required: false,
        default: 6,
    }
});

const getSlug = (title) =>
    (title || '')
        .toString()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

const handleImageError = (event) =>
{
    event.target.style.display = 'none';
};

const linkTo = computed(() =>
{
    if (props.related.referenceUrl) return null;

    if (props.isVideo || props.related.isVideo)
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
    <div v-if="props.isLoading" class="flex justify-between gap-4 relative animate-pulse">
        <div class="flex flex-col justify-between py-1 flex-1">
            <div class="h-3 bg-[#4b1254] rounded w-full mb-2"></div>
            <div class="h-3 bg-[#4b1254] rounded w-3/4"></div>
        </div>
        <div v-for="skeleton in props.skeleton" :key="'skeleton-' + skeleton" class="bg-[#4b1254] w-[120px] h-[70px] rounded-2xl shrink-0 shimmer-bg"></div>
    </div>

    <div v-else class="flex justify-between gap-4 relative group">
        <div class="flex flex-col justify-between py-1 flex-1">
            <span
                class="text-white sm:text-xs xl:text-sm font-bold line-clamp-2 leading-tight group-hover:text-purple-200 transition-colors">
                {{ related.title }}
            </span>
            <span class="text-white text-[10px] opacity-60 uppercase font-medium tracking-wide">
                {{ related.tagName }}
            </span>
        </div>

        <div class="relative w-[120px] h-[70px] shrink-0 overflow-hidden rounded-2xl bg-[#37003c] shimmer-bg">
            <img :src="related.thumbnail" @error="handleImageError" alt=""
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

            <div v-if="related.isVideo || props.isVideo"
                class="absolute bg-[#28002b]/80 backdrop-blur-sm w-6 h-6 rounded-full bottom-1.5 right-1.5 flex justify-center items-center z-20 pointer-events-none border border-white/10">
                <el-icon size="12">
                    <CaretRight class="text-white" />
                </el-icon>
            </div>
        </div>

        <a v-if="related.referenceUrl" :href="related.referenceUrl" target="_blank"
            class="absolute inset-0 z-10 block cursor-pointer"></a>

        <router-link v-else-if="linkTo" :to="linkTo" class="absolute inset-0 z-10 block cursor-pointer"></router-link>
    </div>
</template>

<style scoped>
@keyframes shimmer {
    0% {
        background-position: 200% 0;
    }

    100% {
        background-position: -200% 0;
    }
}

.shimmer-bg {
    background: linear-gradient(90deg,
            #37003c 25%,
            #4b1254 50%,
            #37003c 75%);
    background-size: 200% 100%;
    animation: shimmer 2.5s infinite linear;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>