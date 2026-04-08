<script setup>
import { defineProps, defineEmits, toRef } from 'vue'

const props = defineProps({
    modelValue: Boolean,
    title: {
        type: String,
        default: 'Dialog',
    },
    width: {
        type: String,
        default: '600px',
    },
})

const emit = defineEmits(['update:modelValue', 'submit'])

const handleClose = () =>
{
    emit('update:modelValue', false)
}

const handleSubmit = () =>
{
    emit('submit')
}
</script>

<template>
    <el-dialog v-model="modelValue" :title="title" :width="width" :destroy-on-close="true" @close="handleClose">
        <slot></slot>

        <template #footer>
            <slot name="footer">
                <div class="dialog-footer">
                    <el-button @click="handleClose">Cancel</el-button>
                    <el-button type="primary" @click="handleSubmit">Save</el-button>
                </div>
            </slot>
        </template>
    </el-dialog>
</template>


