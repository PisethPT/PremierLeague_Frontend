<script setup>
import { ref, reactive, onMounted, computed, defineEmits, watch } from 'vue';
import BaseDialogForm from '@/components/BaseDialogForm.vue';
import BaseTable from '@/components/BaseTable.vue';
import
{
    ZoomIn,
    EditPen,
    Delete,
    Search,
    Edit,
    Plus,
} from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useTeamStore } from '@/stores/teamStore';



// ref
const teamStore = useTeamStore();
const teams = ref([]);
const query = ref('');
const form = reactive({
    id: 0,
    name: '',
    city: '',
    founded: '',
    homeStadium: '',
    headCoach: '',
    clubCrest: '',
    websiteUrl: '',
    teamThemeColor: '',
});

const modelValue = ref(false);
const title = ref('Add New Team');
const width = ref('800px');
const loading = ref(false);
const submitLoading = ref(false);
const fileList = ref([]);
const previewVisible = ref(false);
const dialogImageUrl = ref('');
const TEAM_LOGOS_DIR = ref('');
const newSessionCount = ref(0);
const oldSessionCount = ref(0);
const rules = {
    name: [{ required: true, message: 'Please enter team name', trigger: 'blur' }],
    city: [{ required: true, message: 'Please enter team city', trigger: 'blur' }],
    founded: [{ required: true, message: 'Please enter team founded year', trigger: 'blur' }],
    homeStadium: [{ required: true, message: 'Please enter home stadium', trigger: 'blur' }],
    headCoach: [{ required: true, message: 'Please enter head coach name', trigger: 'blur' }],
    clubCrest: [{ required: true, message: 'Please upload club crest', trigger: 'blur' }],
    websiteUrl: [{ required: true, message: 'Please enter website URL', trigger: 'blur' }],
    teamThemeColor: [{ required: true, message: 'Please select club theme color', trigger: 'blur' }],
}
const columns = [
    { label: 'Club', prop: 'clubCrest', slot: 'club', width: 100, align: 'center', sortable: false },
    { label: 'Theme', prop: 'teamThemeColor', slot: 'teamThemeColor', width: 80, align: 'center', sortable: false },
    { label: 'Name', prop: 'name', slot: 'name', minWidth: 250, sortable: true },
    { label: 'Founded', prop: 'founded', minWidth: 120, align: 'center', sortable: true },
    { label: 'City', prop: 'city', width: 200, sortable: true },
    { label: 'Stadium', prop: 'homeStadium', width: 200, sortable: true },
    { label: 'Head Coach', prop: 'headCoach', width: 200, sortable: true },
    { label: 'Official Website', prop: 'websiteUrl', slot: 'websiteUrl', width: 200, align: 'center', sortable: true },
]

// emit
const emit = defineEmits(['update:modelValue', 'update:form', 'submit']);

watch(form, (val) =>
{
    if (val.clubCrest)
    {
        fileList.value = [{
            name: val.name,
            url: TEAM_LOGOS_DIR.value + val.clubCrest,
            raw: null,
            status: 'success'
        }];
    } else
    {
        fileList.value = [];
    }

    if (val.founded && typeof val.founded === 'string' && !isNaN(Date.parse(val.founded + '-01-01')))
    {
        form.founded = new Date(val.founded + '-01-01');
    }

    emit('update:modelValue', modelValue.value);
    emit('update:form', { ...form });
}, { immediate: true, deep: true });

onMounted(async () =>
{
    try
    {
        await teamStore.getTeams();
        teams.value = teamStore.teams;
        TEAM_LOGOS_DIR.value = teamStore.TEAM_LOGOS_DIR;
    } catch (error)
    {
        ElMessage.error('Error fetching seasons' + error);
        console.error('Error:', error);
    } finally
    {
        loading.value = false;
    }
})

const tableData = computed(() =>
{
    return teams.value.filter(team =>
        team.name.toString().toLowerCase().includes(query.value.toLowerCase()) ||
        team.city.toString().toLowerCase().includes(query.value.toLowerCase()) ||
        team.founded.toString().toLowerCase().includes(query.value.toLowerCase()) ||
        team.homeStadium.toString().toLowerCase().includes(query.value.toLowerCase()) ||
        team.headCoach.toString().toLowerCase().includes(query.value.toLowerCase())
    );
});

// functions
async function handleSubmit()
{
    submitLoading.value = true;
    try
    {
        if (!fileList.value.length)
        {
            ElMessage.warning('Please select a club crest photo')
            return
        }

        if (form.id !== 0)
        {
            console.log('form: ', form, 'fileList: ', fileList.value);
            const data = await teamStore.editTeamById({ ...form, founded: new Date(form.founded).getFullYear().toString() ?? '' }, fileList, form.id);
            if (data === 200)
            {
                ElMessage.success('Edit Team Successfully');
                modelValue.value = false;
                closeDialog();
            } else
            {
                ElMessage.error('Error happened: ' + data);
            }
        } else
        {
            //console.log('form: ', form, 'fileList: ', fileList.value);
            const data = await teamStore.createTeam({ ...form, founded: new Date(form.founded).getFullYear().toString() ?? '' }, fileList);
            if (data === 201)
            {
                ElMessage.success('Create Team Successfully');
                modelValue.value = false;
                closeDialog();
            } else
            {
                ElMessage.error('Error happened: ' + data);
            }
        }
        emit('update:form', { ...form });
        emit('submit', { ...form.value, fileList: fileList.value });
    } catch (error)
    {
        console.error('Submit error:', error);
        ElMessage.error(error.response?.data?.message || 'Submit failed');
    } finally
    {
        submitLoading.value = false;
    }
}

function handleOpenDialog()
{
    title.value = 'Add New Team';
    Object.assign(form, {
        id: 0,
        name: '',
        city: '',
        founded: '',
        homeStadium: '',
        headCoach: '',
        clubCrest: '',
        websiteUrl: '',
        teamThemeColor: '',
    });
    fileList.value.length = 0;
    dialogImageUrl.value = '';
    previewVisible.value = false;

    modelValue.value = true;
    loading.value = false;
    submitLoading.value = false;
    emit('update:modelValue', true);
    emit('update:form', { ...form });
}

async function handleEdit(row)
{
    console.log('edit by id: ' + row.id);

    try
    {
        title.value = 'Edit Team';
        modelValue.value = true;

        const team = await teamStore.getTeamById(row.id);
        if (!team)
        {
            ElMessage.error('Team not found');
        }

        Object.assign(form, team);
    } catch (error)
    {
        ElMessage.error('Error fetching team:', error);
        console.log('error: ', error);

    }
}

async function handleDelete(row)
{
    console.log('Delete clicked', row.id);
    ElMessageBox.confirm(
        `
        <div class="flex justify-center items-center flex-col mb-4">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center p-2 shadow-inner" text-center>
                <img src="${TEAM_LOGOS_DIR.value + row.clubCrest}" alt="${row.name}">
            </div>
            <span class="font-mono text-sm">${row.name}</span>
        </div>
        
        Do you want to delete <span class="font-bold text-indigo-500">${row.name}</span>  team?
        `,
        {
            title: 'Delete Team Confirmation',
            confirmButtonText: 'OK, Yes',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true,
            dangerouslyUseHTMLString: true,
        }
    )
        .then(async () =>
        {
            const data = await teamStore.deleteTeamById(row.id);
            console.log(data);

            if (data == '200')
            {
                ElMessage({
                    type: 'success',
                    message: 'Delete completed',
                });
            } else
            {
                ElMessage({
                    type: 'error',
                    message: 'Error happened: ' + data,
                });
            }
        })
        .catch(() =>
        {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            });
        })
}

function handleFileChange(uploadFile, uploadFiles)
{
    fileList.value = uploadFiles.map(file =>
    {
        if (file.raw) file.url = URL.createObjectURL(file.raw)
        return file
    })
}

function handleRemoveFile(file)
{
    const index = fileList.value.indexOf(file)
    if (index !== -1)
    {
        if (file.raw && file.url) URL.revokeObjectURL(file.url)
        fileList.value.splice(index, 1)
    }
}

function handlePreviewFile(file)
{
    dialogImageUrl.value = file.url
    previewVisible.value = true
}

function handleClear()
{
    Object.assign(form, {
        id: 0,
        name: '',
        city: '',
        founded: '',
        homeStadium: '',
        headCoach: '',
        clubCrest: '',
        websiteUrl: '',
        clubThemeColor: '',
    })

    fileList.value.forEach((file) =>
    {
        if (file.url && file.raw) URL.revokeObjectURL(file.url);
    })

    fileList.value = [];
    dialogImageUrl.value = '';
}

function closeDialog()
{
    handleClear();
    emit('update:modelValue', false);
}
</script>

<template>
    <!-- dialog -->
    <BaseDialogForm v-model="modelValue" :form="form" :rules="rules" :title="title" :width="width"
        :loading="submitLoading" @update:modelValue="emit('update:modelValue', $event)"
        @update:form="emit('update:form', $event)" @submit="handleSubmit">
        <template #form>

            <el-form-item label="Club" prop="name">
                <el-input v-model="form.name" clearable />
            </el-form-item>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="City" prop="city">
                    <el-input v-model="form.city" clearable />
                </el-form-item>

                <el-form-item label="Founded" prop="founded">
                    <el-date-picker class="cursor-pointer" v-model="form.founded" type="year" />
                </el-form-item>
            </div>

            <el-form-item label="Stadium" prop="homeStadium">
                <el-input v-model="form.homeStadium" clearable />
            </el-form-item>

            <el-form-item label="Manager" prop="headCoach">
                <el-input v-model="form.headCoach" clearable />
            </el-form-item>

            <el-form-item label="Website" prop="websiteUrl">
                <el-input v-model="form.websiteUrl" type="url" :prefix-icon="Link" clearable />
            </el-form-item>

            <div class="flex items-center gap-4">
                <el-form-item label="Theme" prop="clubThemeColor">
                    <el-color-picker v-model="form.teamThemeColor" />
                </el-form-item>
            </div>

            <el-form-item label="Club Crest">
                <el-upload action="#" :auto-upload="false" list-type="picture-card" :limit="1" :file-list="fileList"
                    :on-change="handleFileChange">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <template #file="{ file }">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" :alt="file.name" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePreviewFile(file)">
                                <el-icon>
                                    <ZoomIn />
                                </el-icon>
                            </span>
                            <span class="el-upload-list__item-delete" @click="handleRemoveFile(file)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </template>
                </el-upload>
            </el-form-item>
        </template>
    </BaseDialogForm>

    <!-- table -->
    <BaseTable :table-data="tableData" :columns="columns" :loading="loading" :show-index="true">
        <template #club="{ row }">
            <div class="flex justify-center">
                <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center p-2 shadow-inner">
                    <img :src="row.clubCrest ? TEAM_LOGOS_DIR + row.clubCrest : ''" :alt="row.name"
                        class="w-auto h-12 object-contain">
                </div>
            </div>
        </template>
        <template #teamThemeColor="{ row }">
            <div class="rounded-2xl w-8 h-8 mx-auto shadow-sm" :style="{ backgroundColor: row.teamThemeColor }">
            </div>
            <span class="text-xs">{{ row.teamThemeColor }}</span>
        </template>
        <template #websiteUrl="{ row }">
            <el-link v-if="row.websiteUrl" :underline="false" :href="row.websiteUrl" target="_blank"
                rel="noopener noreferrer" class="text-blue-500 ">
                <div class="bg-white text-xs rounded-2xl shadow-md hover:shadow-md transition-shadow px-3 py-2 mb-2">
                    Visit Website
                    <el-icon class="ml-1">
                        <Edit />
                    </el-icon>
                </div>
            </el-link>
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
                {{ newSessionCount }} New Session
            </span>
            <span class="inline-flex items-center gap-1 text-sm font-medium">
                <span class="w-3 h-3 bg-black rounded-full"></span>
                {{ oldSessionCount }} Old Session
            </span>
        </div>
    </div>

    <!-- image preview -->
    <el-dialog v-model="previewVisible" width="500px">
        <img class="w-full" :src="dialogImageUrl" alt="Preview" />
    </el-dialog>
</template>

<style>
.demo-color-block .demonstration {
    margin-right: 16px;
}
</style>