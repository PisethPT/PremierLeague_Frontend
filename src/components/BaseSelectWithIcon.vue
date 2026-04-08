<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps({
    modelValue: Object,
    options: Array,
    label: String,
    prop: String,
    placeholder: { type: String, default: 'Choose' },
    valueKey: { type: String, default: 'id' },
    labelKey: { type: String, default: 'name' },
    iconKey: { type: String, default: 'logo' },
    width: { type: String, default: '26px' },
    height: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue']);

const internalValue = ref(props.modelValue);

// Sync from parent to internal
watch(
    () => props.modelValue,
    (val) =>
    {
        internalValue.value = val;
        // console.log('Model value changed:', val);
    },
    { immediate: true }
);

// Sync from internal to parent
watch(internalValue, (val) =>
{
    // console.log('select change: ' + val);
    emit('update:modelValue', val);
});
</script>

<template>
    <el-form-item :label="label" :prop="prop">
        <el-select v-model="internalValue" :placeholder="placeholder" class="w-full" :value-key="valueKey" filterable>
            <!-- Selected icon -->
            <template #prefix>
                <img v-if="internalValue && internalValue[iconKey]" :src="internalValue[iconKey]"
                    class="w-[26px] h-[26px] object-contain ml-2" :width="width" :height="height" />
            </template>

            <!-- Options -->
            <el-option v-for="item in options" :key="item[valueKey]" :label="item[labelKey]" :value="item">
                <div class="flex items-center gap-2">
                    <img :src="item[iconKey]" class="w-6 h-auto object-contain" :width="width" :height="height" />
                    <span>{{ item[labelKey] }}</span>
                </div>
            </el-option>
        </el-select>
    </el-form-item>
</template>


