<script setup>
import { defineProps, defineEmits } from 'vue';
import
{
    ArrowDown,
    Search,
    RefreshLeft,
    Operation,
} from '@element-plus/icons-vue';

const props = defineProps({
    filters: {
        type: Array,
        default: () => [],
    },
    query: {
        type: String,
        default: '',
    },
    isSearch: {
        type: Boolean,
        default: false,
    },
    isReset: {
        type: Boolean,
        default: false,
    },
    activeFilterId: {
        type: Number,
        default: null,
    }
});

const emits = defineEmits([
    'update:query',
    'filter-click',
    'reset',
    'open-filter-panel'
]);

const onSearch = (val) =>
{
    emits('update:query', val);
};

const onFilterClick = (filter) =>
{
    emits('filter-click', filter);
    emits('update:activeFilterId', filter.id);

    // // using func
    // if (typeof filter.func === 'function')
    // {
    //     filter.func(filter);
    // }
};

const onReset = () =>
{
    emits('reset');
};

const openFilterClick = () =>
{
    emits('open-filter-panel');
    emits('update:activeFilterId', null);
}
</script>

<template>
    <div class="flex items-center w-full mt-6 my-4 px-3 gap-4">
        <el-input v-if="isSearch" :model-value="query" @input="onSearch" placeholder="Search"
            class="search-input text-sm w-full max-w-[500px]" size="large" :prefix-icon="Search" :clearable="true" />

        <div class="w-full overflow-x-auto scrollbar-hide">
            <div class="flex items-center gap-2 min-w-max">
                <div @click="openFilterClick"
                    class="flex items-center justify-center text-white text-sm px-3 py-2 rounded-[10px] border border-[#624d64] hover:bg-[#654c6818] cursor-pointer transition whitespace-nowrap">
                    <el-icon>
                        <Operation />
                    </el-icon>
                </div>

                <div v-for="filter in filters" :key="filter.id" @click="onFilterClick(filter)" :class="[
                    'flex items-center gap-1 text-sm px-3 py-[6px] rounded-[10px] border cursor-pointer transition whitespace-nowrap',
                    activeFilterId === filter.id
                        ? 'bg-[#37003c] text-white border-[#624d64]'
                        : 'text-white border-[#624d64] hover:bg-[#654c6818]'
                ]">
                    {{ filter.label }}
                    <el-icon>
                        <ArrowDown />
                    </el-icon>
                </div>

                <div v-if="isReset" @click="onReset"
                    class="flex items-center gap-1 text-gray-400 text-sm px-3 py-[6px] rounded-[10px] border border-[#624d64] hover:bg-[#654c6818] cursor-pointer transition whitespace-nowrap">
                    Reset
                    <el-icon>
                        <RefreshLeft class="text-gray-500" />
                    </el-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.search-input ::v-deep(.el-input__wrapper) {
    background-color: transparent !important;
    border: 2px solid #624d64 !important;
    border-radius: 10px !important;
    box-shadow: none !important;
}

.search-input ::v-deep(.el-input__inner) {
    color: white !important;
}

.search-input ::v-deep(.el-input__prefix) {
    color: white !important;
}

.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>