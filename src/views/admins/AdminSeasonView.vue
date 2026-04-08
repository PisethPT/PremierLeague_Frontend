<script setup>
import { ref, reactive, onMounted, computed, defineEmits, watch } from 'vue';
import BaseDialogForm from '@/components/BaseDialogForm.vue';
import BaseTable from '@/components/BaseTable.vue';
import { useSeasonStore } from '@/stores/seasonStore';
import
{
    // Plus,
    EditPen,
    Delete,
    Search,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';

// emit
const emit = defineEmits(['update:modelValue', 'update:form', 'submit']);

// ref
const seasons = ref([]);
const seasonStore = useSeasonStore();
const query = ref('');
const form = reactive({
    id: 0,
    name: '',
    startDate: null,
    endDate: null,
});
const modelValue = ref(false);
const title = ref('Add New Season');
const width = ref('800px');
const loading = ref(false);
const submitLoading = ref(false);
const rules = {
    name: [{ required: true, message: 'Please enter season name', trigger: 'blur' }],
    startDate: [{ required: true, message: 'Select season start date', trigger: 'blur' }],
    endDate: [{ required: true, message: 'Select season end date', trigger: 'blur' }],
}
const columns = [
    { label: 'Season Name', prop: 'name', minWidth: 200, sortable: true },
    { label: 'Start Date', prop: 'startDate', slot: 'startDate', minWidth: 150, sortable: true },
    { label: 'End Date', prop: 'endDate', slot: 'endDate', minWidth: 150, sortable: true },
]

const newSessionCount = ref(1);
const oldSessionCount = ref(1);

// watch

watch(() =>
{
    console.log('watching data: ', form);
    emit('update:modelValue', modelValue.value);
    emit('update:form', { ...form });
}, { immediate: true })

onMounted(async () =>
{
    loading.value = true;
    try
    {
        const data = await seasonStore.getSeasons();
        seasons.value = data;
    } catch (error)
    {
        ElMessage.error('Error fetching seasons' + error);
        console.error('Error:', error);
    } finally
    {
        loading.value = false;
    }
});
const tableData = computed(() =>
{
    return seasons.value.filter((season) =>
    {
        return (
            season.name.toString().toLowerCase().includes(query.value.toString().toLowerCase()) ||
            season.startDate.toString().toLowerCase().includes(query.value.toString().toLowerCase()) ||
            season.endDate.toString().toLowerCase().includes(query.value.toString().toLowerCase())
        )
    })
});


function handleOpenDialog()
{
    modelValue.value = true;
    loading.value = false;
}

async function handleSubmit()
{
    submitLoading.value = true;
    try
    {
        if (form.id !== 0)
        {
            console.log('edit form id: ' + form.id);
            const data = await seasonStore.editSeason({ ...form }, form.id);
            if (data === 200)
            {
                ElMessage.success('Edit Season Successfully');
                modelValue.value = false;
            } else
                ElMessage.error('Edit Season happened: ' + data);
        } else
        {
            const data = await seasonStore.createSeason({ ...form });
            if (data === 201)
            {
                ElMessage.success('Create New Season Successfully');
                modelValue.value = false;
            }
            else
                ElMessage.error('Create Error happened: ' + data);
        }
        emit('update:form', { ...form });
    } catch (error)
    {
        console.error('Submit error:', error);
        ElMessage.error(error.response?.data?.message || 'Submit failed');
    } finally
    {
        submitLoading.value = false;
    }
}

function handleEdit(row)
{
    console.log('edit: ' + row.id);

    form.id = row.id;
    form.name = row.name;
    form.startDate = row.startDate;
    form.endDate = row.endDate;

    modelValue.value = true;
    title.value = 'Edit Season';
    loading.value = false;
    submitLoading.value = false;
}

function handleDelete(row)
{
    console.log('delete: ' + row.id);
    ElMessageBox.confirm(
        `Do you want to delete this season name<br> <span class="font-bold text-indigo-500">${row.name}</span> ?`,
        {
            type: 'warning',
            title: 'Delete Season Dialog',
            confirmButtonText: 'Ok',
            cancelButtonText: 'Cancel',
            center: true,
            dangerouslyUseHTMLString: true,
        }
    ).then(async () =>
    {
        try
        {
            if (row.id)
            {
                const data = await seasonStore.deleteSeason(row.id);
                if (data === 200)
                    ElMessage.success({
                        type: 'success',
                        message: 'Delete Season Successfully',
                    })
                else
                    ElMessage.error({
                        type: 'danger',
                        message: 'Error When Delete Season' + error,
                    })
            } else
                ElMessage.error({
                    type: 'danger',
                    message: 'Season Id not found: ' + row.id,
                })
        } catch (error)
        {
            ElMessage.error({
                type: 'danger',
                message: 'Error' + error,
            })
        }
    }).catch(() =>
    {
        ElMessage.info({
            type: 'info',
            message: 'Delete Season Canceled',
        })
    })
}
</script>

<template>
    <BaseDialogForm v-model="modelValue" :form="form" :rules="rules" :title="title" :width="width"
        :loading="submitLoading" @update:modelValue="emit('update:modelValue', $event)"
        @update:form="emit('update:form', $event)" @submit="handleSubmit">
        <template #form>
            <el-form-item label="Season Name" prop="name">
                <el-input v-model="form.name" clearable />
            </el-form-item>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="Start Date" prop="startDate">
                    <el-date-picker v-model="form.startDate" />
                </el-form-item>
                <el-form-item label="End Date" prop="endDate">
                    <el-date-picker v-model="form.endDate" />
                </el-form-item>
            </div>


        </template>
    </BaseDialogForm>

    <BaseTable :table-data="tableData" :columns="columns" :loading="loading" :show-index="true">
        <template #startDate="{ row }">
            <span>{{ row.startDate }}</span>
        </template>
        <template #endDate="{ row }">
            <span>{{ row.endDate }}</span>
        </template>

        <template #actions>
            <el-table-column label="Actions" width="420" label-class-name="text-center" align="center" fixed="right">
                <template #header>
                    <div class="flex justify-between gap-2">
                        <el-input v-model="query" size="normal" placeholder="Search ..." :prefix-icon="Search"
                            clearable />
                        <el-button type="info" @click="handleOpenDialog" :icon="Plus" plain>Add New</el-button>
                    </div>
                </template>
                <template #default="{ row }">
                    <el-button type="warning" @click="handleEdit(row)" :icon="EditPen" plain
                        class="shadow-sm hover:shadow-md transition-shadow">Edit</el-button>
                    <el-button type="danger" @click="handleDelete(row)" :icon="Delete" plain
                        class="shadow-sm hover:shadow-md transition-shadow">Delete</el-button>
                </template>
            </el-table-column>
        </template>
    </BaseTable>

    <!-- table footer-->
    <div
        class="px-4 py-3 border-t border-gray-200 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="text-sm text-gray-600">
            Showing <span class="font-medium">{{ tableData.length }}</span> disciplinary records
        </div>
        <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Sessions:</span>
            <span class="inline-flex items-center gap-1 text-sm font-medium">
                <span class="w-3 h-3 bg-green-600 rounded-full"></span>
                {{ newSessionCount }} New
            </span>
            <span class="inline-flex items-center gap-1 text-sm font-medium">
                <span class="w-3 h-3 bg-black rounded-full"></span>
                {{ oldSessionCount }} Old
            </span>
        </div>
    </div>
</template>
<style>
.demo-color-block {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
}

.demo-color-block .demonstration {
    margin-right: 16px;
}
</style>