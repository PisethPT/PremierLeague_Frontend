<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
    modelValue: Object,
    options: Array,
    label: String,
    prop: String,
    placeholder: { type: String, default: 'Choose' },
    width: { type: String, default: '26px' },
    height: { type: String, default: '26px' }
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (val) =>
{
    internalValue.value = val;
}, { immediate: true });

watch(internalValue, (val) =>
{
    emit('update:modelValue', val);
});
</script>

<template>
    <el-form-item :label="label" :prop="prop">
        <el-select v-model="internalValue" :placeholder="placeholder" class="w-full" filterable :value-key="'id'">
            <template #prefix>
                <div v-if="internalValue" class="w-full grid grid-cols-3 gap-4 items-center">
                    <!-- Home Team -->
                    <div class="flex items-center gap-2">
                        <img :src="internalValue.homeTeam.logo" :width="width" :height="height"
                            class="object-cover shrink-0" />
                        <span class="text-sm text-gray-600 truncate">{{ internalValue.homeTeam.name }}</span>
                    </div>

                    <!-- VS -->
                    <div class="flex items-center justify-center">

                        <span class="text-sm text-gray-500 whitespace-nowrap">Vs</span>
                    </div>

                    <!-- Away Team -->
                    <div class="flex items-center gap-2">
                        <img :src="internalValue.awayTeam.logo" :width="width" :height="height"
                            class="object-cover shrink-0" />
                        <span class="text-sm text-gray-600 truncate">{{ internalValue.awayTeam.name }}</span>
                    </div>
                </div>
            </template>


            <!-- Options -->
            <!-- :label="`${item.homeTeam.name} vs ${item.awayTeam.name}`" -->
            <el-option v-for="item in options" :key="item.id" :value="item">
                <div class="w-full px-2 py-1">
                    <div class="grid grid-cols-3 gap-2 items-center">
                        <!-- Home Team -->
                        <div class="flex items-center justify-center gap-2">
                            <img :src="item.homeTeam.logo" :width="width" :height="height" class="object-cover" />
                            <span class="text-sm block w-full">{{ item.homeTeam.name }}</span>
                        </div>

                        <!-- Vs -->
                        <div class="flex items-center justify-center">
                            <span class="text-sm text-gray-500">Vs</span>
                        </div>

                        <!-- Away Team -->
                        <div class="flex items-center justify-center gap-2">
                            <img :src="item.awayTeam.logo" :width="width" :height="height" class="object-cover" />
                            <span class="text-sm block w-full">{{ item.awayTeam.name }}</span>
                        </div>
                    </div>
                </div>
            </el-option>
        </el-select>
    </el-form-item>
</template>


