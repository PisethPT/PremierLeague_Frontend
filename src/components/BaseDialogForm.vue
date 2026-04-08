<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';
import { ElDialog, ElForm, ElButton, ElMessage } from 'element-plus';

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    form: {
        type: Object,
        default: () => ({}),
    },
    formRef: {
        type: Object,
        default: false,
    },
    title: {
        type: String,
        default: 'Dialog',
    },
    width: {
        type: String,
        default: '600px',
    },
    rules: {
        type: Object,
        default: () => ({}),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    loading: {
        type: Boolean,
        default: false,
    },
});

watch(() => props.modelValue, (val) =>
{
    // console.log('Dialog visibility changed:', val);
    if (!val)
    {
        emit('update:modelValue', false);
        emit('update:form', {});
    }
});

const emit = defineEmits(['update:modelValue', 'submit']);
const formRef = ref();

const handleSubmit = () =>
{
    console.log('Submitting form:', props.form);

    formRef.value.validate((valid) =>
    {
        if (!valid)
        {
            console.error('Form validation failed');
            ElMessage.error('Please fill in all required fields.');
            return;
        }
        if (valid) emit('submit', props.form);
    })
}

const handleClose = () =>
{
    emit('update:modelValue', false);
}

const handleClear = () =>
{
    formRef.value.resetFields();
    handleClose();
    // Emit an event to clear the form data
    emit('update:form', {});
}

</script>

<template>
    <el-dialog :model-value="modelValue" @update:modelValue="emit('update:modelValue', $event)" :title="title"
        :width="width" @close="handleClose">
        <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
            <slot name="form" :form="form" :formRef="formRef"></slot>
        </el-form>

        <template #footer>
            <div class="dialog-footer">
                <el-button @click="handleClear" type="info" plain>Cancel</el-button>
                <el-button type="primary" @click="handleSubmit" :loading="loading" :disabled="disabled">Save</el-button>
            </div>
        </template>

    </el-dialog>
</template>
