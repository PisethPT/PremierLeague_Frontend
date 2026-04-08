<script setup>
import { ref, defineProps, watch, onMounted, defineEmits } from 'vue'
import BaseDialogForm from '@/components/BaseDialogForm.vue'
import BaseSelectWithIcon from './BaseSelectWithIcon.vue'
import { usePlayerStore } from '@/stores/playerStore'
import nationalityData from '../assets/nationality.json'
import { ElMessage } from 'element-plus'
import { Plus, ZoomIn, Delete, Link } from '@element-plus/icons-vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false,
    },
    form: Object,
    title: String,
    loading: Boolean,
    width: {
        type: String,
        default: '800px',
    }
})

const emit = defineEmits(['update:modelValue', 'submit', 'update:form'])

const playerStore = usePlayerStore()

const fileList = ref([])
const selectedTeam = ref(null)
const selectTeamPlaceholder = ref('Select a Team');
const selectedNationality = ref(null)
const selectNationalityPlaceholder = ref('Select a Nationality');
const teams = ref([])
const dialogImageUrl = ref('')
const previewVisible = ref(false)
const nationalities = ref([]);

const localForm = ref({
    id: 0,
    firstName: '',
    lastName: '',
    nationality: null,
    preferredFoot: '',
    socialMedia: '',
    position: '',
    playerNumber: 0,
    teamId: null,
    photo: '',
    dateOfBirth: '',
    placeOfBirth: '',
    joinedClub: '',
    height: '',
})

const formRules = {
    firstName: [{ required: true, message: 'Required', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Required', trigger: 'blur' }],
    nationality: [{ required: true, message: 'Please select a nationality of player', trigger: 'blur' }],
    preferredFoot: [{ required: true, message: 'Required', trigger: 'blur' }],
    socialMedia: [{ required: true, message: 'Required', trigger: 'blur' }],
    position: [{ required: true, message: 'Required', trigger: 'blur' }],
    playerNumber: [{ required: true, message: 'Required', trigger: 'blur' }],
    teamId: [{ required: true, message: 'Please select a team', trigger: 'change' }],
}

onMounted(async () =>
{
    await playerStore.getTeamSelectListItem()
    teams.value = playerStore.teamItemSelect;

    nationalities.value = nationalityData.nationalities.map(nat => ({
        id: nat.name,
        name: nat.name,
        logo: nat.icon
    }));
})

watch(() => props.form, (val) =>
{
    console.log('Form props changed:', val);

    if (val)
    {
        Object.assign(localForm.value, val);

        selectedTeam.value = teams.value.find(t => t.id === val.teamId) || null;
        selectedNationality.value = nationalities.value.find(n => n.name === val.nationality) || null;

        fileList.value = val.photo ? [{
            name: `${val.firstName} ${val.lastName}`,
            url: val.photo,
            raw: null,
            status: 'success'
        }] : [];
    }
}, { immediate: true, deep: true });


watch(selectedTeam, (team) =>
{
    localForm.value.teamId = team?.id ?? null
})

watch(selectedNationality, (nationality) =>
{
    localForm.value.nationality = nationality?.name ?? null
    console.log(nationality.name, 'selected');

})

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

function onSubmit()
{
    props.loading = true;
    console.log('Submitting form:', localForm.value);

    if (!fileList.value.length)
    {
        ElMessage.warning('Please select a player photo')
        return
    }

    try
    {
        localForm.value.photo = fileList.value[0].url

        localForm.value.teamId = selectedTeam.value ? selectedTeam.value.id : null
        localForm.value.nationality = selectedNationality.value ? selectedNationality.value.name : null
        console.log(localForm.value.nationality, ', ', selectedNationality.value.name);

        if (!localForm.value.nationality)
        {
            ElMessage.error('Please select a nationality')
            return
        }
        if (!localForm.value.teamId)
        {
            ElMessage.error('Please select a team')
            return
        }
        if (localForm.value.id === 0)
        {
            // Create new player
            playerStore.createPlayer({ ...localForm.value }, fileList.value)
                .then(() =>
                {
                    emit('submit', { ...localForm.value, fileList: fileList.value })
                    ElMessage.success('Player created successfully!')
                    emit('update:modelValue', false)
                })
                .catch(error =>
                {
                    console.error('Error creating player:', error)
                    ElMessage.error('Failed to create player')
                })
        } else
        {
            playerStore.editPlayerById(localForm.value.id, { ...localForm.value }, fileList.value)
                .then(() =>
                {
                    emit('submit', { ...localForm.value, fileList: fileList.value })
                    ElMessage.success('Player updated successfully!')
                    emit('update:modelValue', false)
                })
                .catch(error =>
                {
                    console.error('Error updating player:', error)
                    ElMessage.error('Failed to update player')
                })
        }

    } catch (error)
    {
        console.error('Error during form submission:', error);
        ElMessage.error('An error occurred while submitting the form.')
        return;
    } finally
    {
        localForm.value.photo = fileList.value[0].url;
        props.loading = false;
    }

    emit('submit', {
        ...localForm.value,
        fileList: fileList.value
    })
}
</script>

<template>
    <BaseDialogForm :model-value="modelValue" :title="title" :form="localForm" :rules="formRules" :width="width"
        :disabled="!fileList.length" :loading="loading" @submit="onSubmit"
        @update:modelValue="emit('update:modelValue', $event)" @update:form="emit('update:form', $event)">
        <template #form>
            <!-- First / Last Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="First Name" prop="firstName">
                    <el-input v-model="localForm.firstName" clearable />
                </el-form-item>
                <el-form-item label="Last Name" prop="lastName">
                    <el-input v-model="localForm.lastName" clearable />
                </el-form-item>
            </div>

            <!-- Position / Number -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="Position" prop="position">
                    <el-input v-model="localForm.position" clearable />
                </el-form-item>

                <el-form-item label="Player Number" prop="playerNumber">
                    <el-input-number v-model.number="localForm.playerNumber" type="number" min="1" />
                </el-form-item>
            </div>

            <!-- National / Preferred Foot -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseSelectWithIcon v-model="selectedNationality" :options="nationalities" label="Nationality"
                    prop="nationality" :placeholder="selectNationalityPlaceholder" />

                <el-form-item label="Preferred Foot" prop="preferredFoot">
                    <el-input v-model="localForm.preferredFoot" type="text" clearable />
                </el-form-item>
            </div>

            <!-- Social Media -->
            <el-form-item label="Social Media" prop="socialMedia">
                <el-input v-model="localForm.socialMedia" type="url" :prefix-icon="Link" clearable />
            </el-form-item>

            <!-- Team -->
            <BaseSelectWithIcon v-model="selectedTeam" :options="teams" label="Team" prop="teamId"
                :placeholder="selectTeamPlaceholder" />

            <!-- Upload -->
            <el-form-item label="Player Photo">
                <el-upload action="#" :auto-upload="false" list-type="picture-card" :limit="1" :file-list="fileList"
                    :on-change="handleFileChange">
                    <el-icon>
                        <Plus />
                    </el-icon>

                    <template #file="{ file }">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" />
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

    <!-- Preview Dialog -->
    <el-dialog v-model="previewVisible" width="500px">
        <img class="w-full" :src="dialogImageUrl" alt="Preview" />
    </el-dialog>
</template>
