<script setup>
import { ref, reactive, onMounted, computed, defineEmits, watch } from 'vue';
import { usePlayerStore } from '@/stores';
import BaseDialogForm from '@/components/BaseDialogForm.vue';
import BaseTable from '@/components/BaseTable.vue';
import nationalityData from '@/assets/nationality.json';
import
{
    Search,
    EditPen,
    Delete,
    Link,
    Edit,
    Plus,
    ZoomIn,
} from '@element-plus/icons-vue';
import BaseSelectWithIcon from '@/components/BaseSelectWithIcon.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const playerStore = usePlayerStore();
const players = ref([]);
const teams = ref([]);
const selectedTeam = ref(null);
const placeOfBirths = ref([]);
const nationalities = ref([]);
const selectTeamPlaceholder = ref('Select a Team');
const selectedPlaceOfBirth = ref(null);
const selectedNationality = ref(null);
const selectPlaceOfBirthPlaceholder = ref('Select a Place of Birth');
const selectNationalityPlaceholder = ref('Select a Nationality');
const TEAM_LOGOS_DIR = ref('');
const PLAYER_PHOTOS_DIR = ref('');
const newTransferPlayer = ref(0);
const oldTransferPlayer = ref(0);

const query = ref('');
const modelValue = ref(false);
const title = ref('Add New Player');
const width = ref('800px');
const loading = ref(false);
const submitLoading = ref(false);
const fileList = ref([]);
const previewVisible = ref(false);
const dialogImageUrl = ref('');

const joinedClubSelectListItem = ref([
    { label: '2016/17', value: '2016/17' },
    { label: '2017/18', value: '2017/18' },
    { label: '2018/19', value: '2018/19' },
    { label: '2019/20', value: '2019/20' },
    { label: '2020/21', value: '2020/21' },
    { label: '2021/22', value: '2021/22' },
    { label: '2022/23', value: '2022/23' },
    { label: '2023/24', value: '2023/24' },
    { label: '2024/25', value: '2024/25' },
    { label: '2025/26', value: '2025/26' },
]);


const positionSelectListItem = ref([
    {
        label: 'Goalkeeper',
        value: 'Goalkeeper',
    },
    {
        label: 'Defender',
        value: 'Defender',
    },
    {
        label: 'Midfielder',
        value: 'Midfielder',
    },
    {
        label: 'Forward',
        value: 'Forward',
    },
])
const preferredFootSelectListItem = ref([
    {
        label: 'Right',
        value: 'Right',
    },
    {
        label: 'Left',
        value: 'Left',
    },
    {
        label: 'Both',
        value: 'Both',
    },
])


const form = reactive({
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
    placeOfBirth: null,
    joinedClub: '',
    height: '',
});

const columns = [
    { label: 'Photo', prop: 'photo', slot: 'photo', width: '100px', align: 'center', sortable: false },
    { label: 'First Name', prop: 'firstName', minWidth: 210, sortable: true },
    { label: 'Last Name', prop: 'lastName', minWidth: 210, sortable: true },
    { label: 'Date of Birth', prop: 'dateOfBirth', minWidth: 210, align: 'center', sortable: true },
    { label: 'Nationality', prop: 'nationality', slot: 'nationality', width: 150, align: 'center', sortable: true },
    { label: 'Place of Birth', prop: 'placeOfBirth', slot: 'placeOfBirth', width: 150, align: 'center', sortable: true },
    { label: 'Position', prop: 'position', width: 150, sortable: true },
    { label: 'Player Number', prop: 'playerNumber', width: 150, align: 'center', sortable: true },
    { label: 'Preferred Foot', prop: 'preferredFoot', width: 150, align: 'center', sortable: true },
    { label: 'Social Media', prop: 'socialMedia', slot: 'socialMedia', width: 150, align: 'center' },
    { label: 'Club', prop: 'club', slot: 'club', width: 150, align: 'center' },
];

const rules = {
    firstName: [{ required: true, message: 'Please enter the first name', trigger: 'blur' }],
    lastName: [{ required: true, message: 'Please enter the last name', trigger: 'blur' }],
    placeOfBirth: [{ required: true, message: 'Please select a country of player', trigger: 'change' }],
    nationality: [{ required: true, message: 'Please select a nationality of player', trigger: 'change' }],
    preferredFoot: [{ required: true, message: 'Please select a preferred foot', trigger: 'blur' }],
    socialMedia: [{ required: true, message: 'Please enter social media links', trigger: 'blur' }],
    position: [{ required: true, message: 'Please enter the position', trigger: 'blur' }],
    playerNumber: [{ required: true, message: 'Please enter the player number', trigger: 'blur' }],
    teamId: [{ required: true, message: 'Please select a team', trigger: 'change' }],
}

const emit = defineEmits(['update:modelValue', 'update:form', 'submit']);


watch(form, (val) =>
{
    if (!val) return

    selectedTeam.value = teams.value.find(t => t.id === val.teamId) || null
    selectedPlaceOfBirth.value = placeOfBirths.value.find(p => p.name === val.placeOfBirth) || null
    selectedNationality.value = nationalities.value.find(n => n.name === val.nationality) || null

    // file list from photo URL
    fileList.value = val.photo ? [{
        name: `${val.firstName} ${val.lastName}`.trim(),
        url: val.photo,
        raw: null,
        status: 'success'
    }] : []

    // emit updates
    if (typeof modelValue !== 'undefined') emit('update:modelValue', modelValue.value)
    emit('update:form', { ...form })
}, { immediate: true, deep: true })

watch(selectedTeam, (team) =>
{
    form.teamId = team?.id ?? null
})

watch(selectedNationality, (nationality) =>
{
    // console.log(nationality.name, 'selected');
    form.nationality = nationality?.name ?? null
})

watch(selectedPlaceOfBirth, (country) =>
{
    form.placeOfBirth = country?.name ?? null
})

onMounted(async () =>
{
    loading.value = true;
    try
    {
        await playerStore.getPlayers();
        await playerStore.getTeamSelectListItem();

        players.value = playerStore.players;
        teams.value = playerStore.teamItemSelect;

        TEAM_LOGOS_DIR.value = playerStore.TEAM_LOGOS_DIR
        PLAYER_PHOTOS_DIR.value = playerStore.PLAYER_PHOTO_DIR;

        placeOfBirths.value = nationalityData.nationalities.map(country => ({
            id: country.name,
            name: country.name,
            logo: country.icon
        }));

        nationalities.value = nationalityData.nationalities.map(n => ({
            id: n.nationality,
            name: n.nationality,
            logo: n.icon
        }));

    } catch (error)
    {
        ElMessage.error('Error fetching:' + error);
    } finally
    {
        loading.value = false;
    }
})

const tableData = computed(() =>
{
    return (
        players.value.filter((player) =>

            player.firstName.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            player.lastName.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            player.position.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            player.playerNumber.toString().toLowerCase().includes(query.value.toLowerCase()) ||
            player.teamName.toString().toLowerCase().includes(query.value.toLowerCase())
        )
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
            ElMessage.warning('Please select a player photo')
            return;
        }
        form.photo = fileList.value[0].url

        form.teamId = selectedTeam.value ? selectedTeam.value.id : null;
        form.placeOfBirth = selectedPlaceOfBirth.value ? selectedPlaceOfBirth.value.name : null;
        form.nationality = selectedNationality.value ? selectedNationality.value.name : null;

        console.log(form.placeOfBirth, ', ', selectedPlaceOfBirth.value.name);
        console.log(form.nationality, ', ', selectedNationality.value.name);

        if (!form.placeOfBirth)
        {
            ElMessage.error('Please select a place of birth')
            return
        }
        if (!form.nationality)
        {
            ElMessage.error('Please select a nationality')
            return
        }
        if (!form.teamId)
        {
            ElMessage.error('Please select a team')
            return
        }

        if (form.id === 0)
        {
            // Create new player
            const data = await playerStore.createPlayer({ ...form }, fileList)
            if (data === 201)
            {
                ElMessage.success('Player created successfully!');
                modelValue.value = false;
                closeDialog();
            }
            else
            {
                ElMessage.error('Failed to create player');
            }
        } else
        {
            const data = await playerStore.editPlayerById(form.id, { ...form }, fileList)
            if (data === 200)
            {
                ElMessage.success('Player updated successfully!');
                modelValue.value = false;
                closeDialog();
            }
            else
            {
                ElMessage.error('Error: ' + data);
            }
        }
        emit('update:modelValue', false);
        emit('update:form', { ...form });
        emit('submit', { ...form.value, fileList: fileList.value });
    } catch (error)
    {
        ElMessage.error('Error submitting:' + error);
    } finally
    {
        submitLoading.value = false;
    }
}

function handleEdit(row)
{
    console.log('Edit clicked', row.id);
    Object.assign(form, { ...row });

    if (form.photo)
    {
        if (!form.photo.startsWith(PLAYER_PHOTOS_DIR.value))
        {
            form.photo = PLAYER_PHOTOS_DIR.value + form.photo;
        }
    } else
    {
        form.photo = '';
    }

    title.value = 'Edit Player';
    modelValue.value = true;
    submitLoading.value = false;
    emit('update:modelValue', modelValue.value);
    emit('update:form', { ...form });
}

function handleDelete(row)
{
    console.log('Delete clicked', row.id);
    ElMessageBox.confirm(
        ` 
        <div class="flex justify-center items-center flex-col">
            <img src="${PLAYER_PHOTOS_DIR.value + row.photo}" alt="${row.photo}" class="w-25 h-25 object-contain mx-auto border-2 border-gray-200 shadow-sm rounded-full"/>
            <span class="text-sm mb-2 font-mono">${row.firstName} ${row.lastName}</span>
        </div>
        Do you want to delete this player name <span class="font-bold text-indigo-500">${row.firstName} ${row.lastName}</span> ?
        `,
        {
            title: 'Delete Dialog',
            confirmButtonText: 'Yes, OK',
            cancelButtonText: 'Cancel',
            type: 'warning',
            center: true,
            dangerouslyUseHTMLString: true,
        }
    )
        .then(async () =>
        {
            const data = await playerStore.deletePlayerById(row.id);
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

function handleOpenDialog()
{
    title.value = 'Add New Player';
    Object.assign(form, {
        id: 0,
        firstName: '',
        lastName: '',
        placeOfBirth: null,
        nationality: null,
        preferredFoot: '',
        socialMedia: '',
        position: '',
        playerNumber: null,
        teamId: null,
        photo: null,
        dateOfBirth: '',
        joinedClub: '',
        height: '',
    });

    modelValue.value = true;
    fileList.value = [];
    loading.value = false;
    submitLoading.value = false;
    dialogImageUrl.value = '';
    previewVisible.value = false;

    emit('update:modelValue', modelValue.value);
    emit('update:form', { ...form });
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
    dialogImageUrl.value = file.url;
    previewVisible.value = true;
}

function handleClear()
{
    Object.assign(form, {
        id: 0,
        firstName: '',
        lastName: '',
        placeOfBirth: null,
        nationality: null,
        preferredFoot: '',
        socialMedia: '',
        position: '',
        playerNumber: null,
        teamId: null,
        photo: null,
        dateOfBirth: '',
        joinedClub: '',
        height: '',
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
    emit('update:modelValue', modelValue.value);
}
</script>

<template>
    <!-- dialog -->
    <BaseDialogForm v-model="modelValue" :form="form" :rules="rules" :title="title" :width="width"
        :loading="submitLoading" @update:modelValue="emit('update:modelValue', $event)"
        @update:form="emit('update:form', $event)" @submit="handleSubmit">
        <template #form>
            <!-- First / Last Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="First Name" prop="firstName">
                    <el-input v-model="form.firstName" clearable />
                </el-form-item>
                <el-form-item label="Last Name" prop="lastName">
                    <el-input v-model="form.lastName" clearable />
                </el-form-item>
            </div>

            <!-- Date of Birth / Hight -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="Match Date" prop="dateOfBirth">
                    <el-date-picker v-model="form.dateOfBirth" type="date" placeholder="Player Date of Birth" />
                </el-form-item>

                <el-form-item label="Hight" prop="hight">
                    <el-input v-model="form.height" clearable />
                </el-form-item>
            </div>

            <!-- Place of Birth /  Nationality-->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseSelectWithIcon v-model="selectedPlaceOfBirth" :options="placeOfBirths" label="Place of Birth"
                    prop="placeOfBirth" :placeholder="selectPlaceOfBirthPlaceholder" />

                <BaseSelectWithIcon v-model="selectedNationality" :options="nationalities" label="Nationality"
                    prop="nationality" :placeholder="selectNationalityPlaceholder" />
            </div>


            <!-- Preferred Foot / Joined Club -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="Preferred Foot" prop="preferredFoot">
                    <el-select v-model="form.preferredFoot" placeholder="Select Preferred Foot" filterable>
                        <el-option v-for="foot in preferredFootSelectListItem" :key="foot.value" :label="foot.label"
                            :value="foot.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="Joined Club" prop="joinedClub">
                    <el-select v-model="form.joinedClub" placeholder="Select Joined Club" filterable>
                        <el-option v-for="joinedClub in joinedClubSelectListItem" :key="joinedClub.value"
                            :label="joinedClub.label" :value="joinedClub.value" />
                    </el-select>
                </el-form-item>
            </div>

            <!-- Position / Number -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <el-form-item label="Position" prop="position">
                    <el-select v-model="form.position" placeholder="Select position" filterable>
                        <el-option v-for="position in positionSelectListItem" :key="position.value"
                            :label="position.label" :value="position.value" />
                    </el-select>
                </el-form-item>

                <el-form-item label="Player Number" prop="playerNumber">
                    <el-input-number v-model.number="form.playerNumber" type="number" :min="1" />
                </el-form-item>
            </div>

            <!-- Social Media -->
            <el-form-item label="Social Media" prop="socialMedia">
                <el-input v-model="form.socialMedia" type="url" :prefix-icon="Link" clearable />
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
        <template #photo="{ row }">
            <el-avatar :size="60" :src="row.photo ? PLAYER_PHOTOS_DIR + row.photo : ''"
                class="border-2 border-gray-200 shadow-sm overflow-hidden" />
        </template>

        <template #nationality="{ row }">
            <img v-if="row.nationality" :src="placeOfBirths.find((nat) => nat.name === row.placeOfBirth)?.logo"
                :alt="row.placeOfBirth" class="w-8 h-8 object-contain mx-auto">
            <div class="text-xs text-gray-500 text-center">
                {{ row.placeOfBirth }}
            </div>
        </template>

        <template #dateOfBirth="{ row }">
            <div class="text-sm text-gray-500 text-center">
                {{ row.dateOfBirth }}
            </div>
        </template>

        <template #placeOfBirth="{ row }">
            <div class="text-sm text-gray-500 text-center">
                {{ row.nationality }}
            </div>
        </template>

        <template #socialMedia="{ row }">
            <el-link v-if="row.socialMedia" :underline="false" :href="row.socialMedia" target="_blank"
                rel="noopener noreferrer" class="text-blue-500">
                <div class="bg-white text-xs rounded-2xl shadow-md hover:shadow-md transition-shadow px-3 py-2 mb-2">
                    Follow
                    <el-icon class="ml-1">
                        <Edit />
                    </el-icon>
                </div>
            </el-link>
        </template>

        <template #club="{ row }">
            <img :src="row.teamClubCrest ? TEAM_LOGOS_DIR + row.teamClubCrest : ''" :alt="row.teamName"
                class="w-8 h-8 object-contain mx-auto">
            <div class="text-xs text-gray-500 text-center">
                {{ row.teamName }}
            </div>
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
                {{ newTransferPlayer }} New Session
            </span>
            <span class="inline-flex items-center gap-1 text-sm font-medium">
                <span class="w-3 h-3 bg-black rounded-full"></span>
                {{ oldTransferPlayer }} Old Session
            </span>
        </div>
    </div>

    <!-- image preview -->
    <el-dialog v-model="previewVisible" width="500px">
        <img class="w-full" :src="dialogImageUrl" alt="Preview" />
    </el-dialog>
</template>
