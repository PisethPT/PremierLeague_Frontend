<script setup>
import { ref, defineProps, computed, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { usePlayerStore } from '@/stores/playerStore';
import PlayerDialog from './PlayerDialog.vue';
import nationalityData from '../assets/nationality.json';
import
{
    Search,
    EditPen,
    Delete,
    Link,
    Edit,
} from '@element-plus/icons-vue';


const props = defineProps({
    tableData: {
        type: Array,
        required: true,
    },
    totalPage: {
        type: Number,
        default: 0,
    },
    pageSize: {
        type: Number,
        default: 10,
    },
    currentPage: {
        type: Number,
        default: 1,
    },
});

const nationalities = ref([]);
const pageSize = ref(10);
const currentPage = ref(0);
const query = ref('');
const isOpenDialog = ref(false);
const dialogTitle = ref('Edit Player');
const loading = ref(false);
const form = ref({
    id: 0,
    firstName: '',
    lastName: '',
    nationality: '',
    preferredFoot: '',
    socialMedia: '',
    position: '',
    playerNumber: 0,
    teamId: null,
    photo: ''
});

const playerStore = usePlayerStore();
const PLAYER_LOGOS_DIR = playerStore.PLAYER_PHOTO_DIR;
const TEAM_LOGOS_DIR = playerStore.TEAM_LOGOS_DIR;

onMounted(() =>
{
    nationalities.value = nationalityData.nationalities.map((nat) => ({
        name: nat.name,
        icon: nat.icon,
        flag: nat.flag
    }));

    //console.log('Nationalities:', nationalities.value);
});

const filterDataTable = computed(() =>
{
    const q = query.value.toString().toLowerCase();
    return (
        props.tableData.filter((player) =>

            player.firstName.toString().toLowerCase().includes(q) ||
            player.lastName.toString().toLowerCase().includes(q) ||
            player.position.toString().toLowerCase().includes(q) ||
            player.playerNumber.toString().toLowerCase().includes(q) ||
            player.teamName.toString().toLowerCase().includes(q)
        )
    );
});

function editRow(row)
{
    console.log('edit: ' + row.id);
    if (row)
    {
        form.value = { ...row };
        form.value.teamId = row.teamId ? row.teamId : null;
        form.value.nationality = row.nationality ? row.nationality : '';
        form.value.photo = row.photo ? row.photo : '';
        if (form.value.photo && !form.value.photo.startsWith('http'))
        {
            form.value.photo = PLAYER_LOGOS_DIR + form.value.photo;
        }
    }
    else
    {
        form.value = {
            id: 0,
            firstName: '',
            lastName: '',
            nationality: '',
            preferredFoot: '',
            socialMedia: '',
            position: '',
            playerNumber: 0,
            teamId: null,
            photo: ''
        };
    }
    dialogTitle.value = 'Edit Player';
    isOpenDialog.value = true;
}

function deleteRow(row)
{
    console.log('Delete clicked', row.id);
    ElMessageBox.confirm(
        ` 
        <div class="flex justify-center items-center flex-col">
            <img src="${PLAYER_LOGOS_DIR + row.photo}" alt="${row.photo}" class="w-25 h-25 object-contain mx-auto border-2 border-gray-200 shadow-sm rounded-full"/>
            <span class="text-sm mb-2 font-mono">${row.firstName} ${row.lastName}</span>
        </div>
        Do you want to delete this player name <span class="font-bold text-indigo-500">${row.firstName} ${row.lastName}</span> ?
        `,
        {
            title: 'Delete Dialog',
            confirmButtonText: 'OK',
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

</script>

<template>
    <PlayerDialog v-model:modelValue="isOpenDialog" :title="dialogTitle" :form="form" />

    <el-table :data="filterDataTable" v-loading="loading" class="w-full" height="790" border>
        <el-table-column label="#" width="80" sortable prop="id" align="center" />
        <el-table-column label="Photo" width="120" align="center" prop="photo">
            <template #default="scope">
                <el-avatar :size="60" :src="PLAYER_LOGOS_DIR + scope.row.photo"
                    class="border-2 border-gray-200 shadow-sm" />
            </template>
        </el-table-column>
        <el-table-column label="First Name" sortable prop="firstName" min-width="210" />
        <el-table-column label="Last Name" sortable prop="lastName" min-width="210" />
        <el-table-column label="Nationality" width="150" align="center" prop="nationality">
            <template #default="scope">
                <img v-if="scope.row.nationality"
                    :src="nationalities.find((nat) => nat.name === scope.row.nationality)?.icon"
                    :alt="scope.row.nationality" class="w-8 h-8 object-contain mx-auto">
                <div class="text-xs text-gray-500 text-center">
                    {{ scope.row.nationality }}
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Position" sortable prop="position" width="150" />
        <el-table-column label="Shirt Number" sortable prop="playerNumber" width="150" align="center">
            <template #default="{ row }">
                <div class="flex justify-center items-center text-center">
                    <span
                        class="flex w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-bold text-xl items-center justify-center text-center shadow-md border-2 border-white"
                        :title="`Shirt Number: ${row.playerNumber}`">
                        {{ row.playerNumber }}
                    </span>
                </div>
            </template>
        </el-table-column>
        <el-table-column label="Preferred Foot" sortable prop="preferredFoot" width="150" align="center" />
        <el-table-column prop="socialMedia" label="Social Media" width="200" align="center" sortable>
            <template #default="{ row }">
                <el-link v-if="row.socialMedia" :underline="false" :href="row.socialMedia" target="_blank"
                    rel="noopener noreferrer" class="text-blue-500">
                    <div
                        class="bg-white text-xs rounded-2xl shadow-md hover:shadow-md transition-shadow px-3 py-2 mb-2">
                        Follow
                        <el-icon class="ml-1">
                            <Edit />
                        </el-icon>
                    </div>
                </el-link>
            </template>
        </el-table-column>
        <el-table-column label="Team Logo" width="150" align="center" prop="photo">
            <template #default="scope">
                <img :src="TEAM_LOGOS_DIR + scope.row.teamClubCrest" :alt="scope.row.teamClubCrest"
                    class="w-8 h-8 object-contain mx-auto">
                <div class="text-xs text-gray-500 text-center">
                    {{ scope.row.teamName }}
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="id" label="Actions" width="320" label-class-name="text-center" align="center"
            fixed="right">
            <template #header>
                <el-input v-model="query" size="normal" placeholder="Search ..." :prefix-icon="Search" clearable />
            </template>
            <template #default="scope">
                <el-space>
                    <el-button type="warning" plain @click="editRow(scope.row)" :icon="EditPen">Edit</el-button>
                    <el-button type="danger" plain @click="deleteRow(scope.row)" :icon="Delete">Delete</el-button>
                </el-space>
            </template>
        </el-table-column>
    </el-table>
    <el-pagination class="flex justify-center my-2" background layout="prev, pager, next" :total="props.totalPage"
        v-model:page-size="props.pageSize" v-model:current-page="props.currentPage" />
</template>
