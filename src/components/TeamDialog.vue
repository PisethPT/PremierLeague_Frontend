<script setup>
import { reactive, watch, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useTeamStore } from '@/stores/teamStore'
import { useApiConfig } from '@/stores/apiConfig'
import { Plus, ZoomIn, Delete, Link } from '@element-plus/icons-vue'

// Props
const props = defineProps({
    dialogTitle: {
        type: String,
        default: 'Add New Team',
    },
    isOpenDialog: {
        type: Boolean,
        required: true,
    },
    teamId: {
        type: Number,
        default: 0,
    },
    form: {
        type: Object,
        default: () => ({
            id: 0,
            name: '',
            city: '',
            founded: '',
            homeStadium: '',
            headCoach: '',
            clubCrest: '',
            websiteUrl: '',
            clubThemeColor: '',
        }),
    },
})

// Emit events
const emit = defineEmits(['update:isOpenDialog', 'update:form']);

const teamStore = useTeamStore();
const apiConfig = useApiConfig();
const formRef = ref();
const fileList = ref([]);
const uploading = ref(false);
const dialogImageUrl = ref('');
const dialogVisible = ref(false);

// Local reactive form copy with default values
const localForm = reactive({
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

watch(
    () => props.form?.id,
    () =>
    {
        if (props.form)
        {
            Object.assign(localForm, props.form);

            // Convert founded string → Date for date-picker
            if (props.form.founded)
            {
                localForm.founded = new Date(props.form.founded + '-01-01');
            }

            if (localForm.clubCrest)
            {
                fileList.value = [{
                    name: localForm.name,
                    url: apiConfig.TEAM_LOGOS_DIR + localForm.clubCrest,
                    raw: null, // raw is not used in this case
                    status: 'success'
                }];
            } else
            {
                fileList.value = [];
            }
        }
    },
    { immediate: true }
);

const rules = {
    name: [{ required: true, message: 'Please enter team name', trigger: 'blur' }],
    city: [{ required: true, message: 'Please enter city of the team', trigger: 'blur' }],
    founded: [{ required: true, message: 'Please enter founded year', trigger: 'blur' }],
    homeStadium: [{ required: true, message: 'Please enter stadium', trigger: 'blur' }],
    headCoach: [{ required: true, message: 'Please enter head coach', trigger: 'blur' }],
    clubCrest: [{ required: true, message: 'Please upload team logo', trigger: 'change' }],
    websiteUrl: [{ required: true, type: 'url', message: 'Please enter a valid URL', trigger: 'blur' }],
}

function closeDialog()
{
    emit('update:isOpenDialog', false);
    handleClear();
}

function handleFileChange(uploadFile, uploadFiles)
{
    fileList.value = uploadFiles.map((file) =>
    {
        if (file.raw)
        {
            file.url = URL.createObjectURL(file.raw)
        }
        return file
    })
}

function handleRemoveFile(file)
{
    const index = fileList.value.indexOf(file)
    if (index !== -1)
    {
        if (file.url && file.raw) URL.revokeObjectURL(file.url)
        fileList.value.splice(index, 1)
    }
}

function handlePreview(file)
{
    dialogImageUrl.value = file.url
    dialogVisible.value = true
}

async function onSubmit()
{
    formRef.value.validate(async (valid) =>
    {
        if (!valid)
        {
            ElMessage.error('Please fill in all required fields.')
            return
        }

        if (!fileList.value.length)
        {
            ElMessage.warning('Please select at least one file.')
            return
        }

        uploading.value = true

        try
        {
            if (localForm.id !== 0)
            {
                console.log('id: ' + JSON.stringify(localForm.id));
                const data = await teamStore.editTeamById({ ...localForm, founded: localForm.founded?.getFullYear().toString() ?? '' }, fileList, localForm.id);
                closeDialog();

                if (data == '200')
                {
                    ElMessage.success('Edit Team successful!');
                } else
                {
                    ElMessage.error('Error happened: ' + data);
                    console.log(JSON.stringify(data));

                }
            } else
            {
                console.log('id: ' + JSON.stringify(localForm.founded), ', logo: ' + localForm.clubCrest);
                const data = await teamStore.createTeam({ ...localForm, founded: localForm.founded?.getFullYear().toString() ?? '' }, fileList);
                closeDialog();

                if (data == '201')
                {
                    ElMessage.success('Create New Team successful!');
                } else
                {
                    ElMessage.error('Error happened: ' + data);
                }
            }

            emit('update:form', { ...localForm })
        } catch (error)
        {
            console.error('Upload error:', error)
            ElMessage.error(error.response?.data?.message || 'Upload failed')
        } finally
        {
            uploading.value = false
        }
    })
}

function handleClear()
{
    Object.assign(localForm, {
        id: 0,
        name: '',
        city: '',
        founded: '',
        homeStadium: '',
        headCoach: '',
        clubCrest: '',
        websiteUrl: '',
    })

    fileList.value.forEach((file) =>
    {
        if (file.url && file.raw) URL.revokeObjectURL(file.url)
    })

    fileList.value = []
    dialogImageUrl.value = ''
    dialogVisible.value = false
}
</script>

<template>
    <el-dialog class="max-w-[800px] w-full" :model-value="isOpenDialog" :title="dialogTitle" @close="closeDialog">
        <el-form class="w-full" :model="localForm" ref="formRef" :rules="rules" label-width="auto">
            <el-form-item label="Team name" prop="name">
                <el-input v-model="localForm.name" clearable />
            </el-form-item>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="City" prop="city">
                    <el-input v-model="localForm.city" clearable />
                </el-form-item>

                <el-form-item label="Founded" prop="founded">
                    <el-date-picker class="cursor-pointer" v-model="localForm.founded" type="year" />
                </el-form-item>
            </div>

            <el-form-item label="Stadium" prop="homeStadium">
                <el-input v-model="localForm.homeStadium" clearable />
            </el-form-item>

            <el-form-item label="Coach name" prop="headCoach">
                <el-input v-model="localForm.headCoach" clearable />
            </el-form-item>

            <el-form-item label="Official Website" prop="websiteUrl">
                <el-input v-model="localForm.websiteUrl" type="url" :prefix-icon="Link" clearable />
            </el-form-item>

            <div class="demo-color-block">
                <el-form-item label="Club Theme Color" prop="clubThemeColor">
                    <el-color-picker v-model="localForm.clubThemeColor" />
                </el-form-item>
            </div>

            <el-form-item label="Team logo">
                <el-upload action="#" :auto-upload="false" :file-list="fileList" :limit="1" list-type="picture-card"
                    :on-change="handleFileChange" accept="image/*">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    <template #file="{ file }">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePreview(file)">
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

            <el-form-item>
                <el-button type="info" plain @click="handleClear">Clear</el-button>
                <el-button type="primary" plain @click="onSubmit">
                    Save
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>

    <el-dialog style="width: 500px; height: 500px" v-model="dialogVisible">
        <img class="w-full" :src="dialogImageUrl" alt="Preview" />
    </el-dialog>
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
