<script setup>
import { defineProps, ref, reactive, computed } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus';
import { useTeamStore } from '@/stores/teamStore';
import
{
    EditPen,
    Delete,
    Search,
    Link,
    ArrowRightBold,
    Edit,
} from '@element-plus/icons-vue'

const props = defineProps({
    tableData: {
        type: Array,
        required: true,
        default: () => [],
    }, totalPage: {
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
    index: {
        type: Number,
        required: true,
        default: 1,
    }
});
const query = ref('');
const pageSize = ref(10);
const currentPage = ref(1);
const teamStore = useTeamStore();
const dialogTitle = ref('Edit Team');
const isOpenDialog = ref(false);
const form = reactive({
    id: 0,
    name: '',
    city: '',
    founded: '',
    homeStadium: '',
    headCoach: '',
    clubCrest: '',
    websiteUrl: '',
    clubThemeColor: ''
});

const TEAM_LOGOS_DIR = teamStore.TEAM_LOGO_DIR;

const editRow = async (row) =>
{
    const team = await teamStore.getTeamById(row.id);
    if (!team)
    {
        console.warn('Team not found');
        return;
    }

    Object.assign(form, team);
    dialogTitle.value = 'Edit Team';
    isOpenDialog.value = true;
}

const deleteRow = (row) =>
{
    console.log('Delete clicked', row.id);
    ElMessageBox.confirm(
        `
        <div class="flex justify-center items-center flex-col mb-4">
            <div class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center p-2 shadow-inner" text-center>
                <img src="${teamStore.TEAM_LOGO_DIR + row.clubCrest}" alt="${row.name}">
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

};

const incrementIndex = (index) =>
{
    return (currentPage.value - 1) * pageSize.value + index + 1;
};

const filteredDataTable = computed(() =>
{
    console.log(props.tableData);

    const q = query.value.toString().toLowerCase();
    return props.tableData.filter((team) =>
        team.name.toString().toLowerCase().includes(q) ||
        team.city.toString().toLowerCase().includes(q) ||
        team.founded.toString().toLowerCase().includes(q) ||
        team.homeStadium.toString().toLowerCase().includes(q) ||
        team.headCoach.toString().toLowerCase().includes(q)
    );
});


</script>

<template>
    <!-- Dialog -->
    <TeamDialog :form="form" v-model:isOpenDialog="isOpenDialog" :dialogTitle="dialogTitle" />

    <el-table :data="filteredDataTable" height="740" style="width: 100%" border>
        <el-table-column label="#" width="80" align="center" sortable>
            <template #default="scope">
                {{ incrementIndex(scope.$index) }}
            </template>
        </el-table-column>
        <el-table-column prop="clubCrest" label="Logo" width="100" align="center">
            <template #default="scope">
                <div class="flex justify-center">
                    <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center p-2 shadow-inner">
                        <img :src="TEAM_LOGOS_DIR + scope.row.clubCrest" :alt="scope.row.name">
                    </div>
                </div>
            </template>
        </el-table-column>
        <el-table-column prop="clubThemeColor" label="Theme" width="80" align="center">
            <template #default="scope">
                <div class="rounded-2xl w-8 h-8 mx-auto shadow-sm"
                    :style="{ backgroundColor: scope.row.teamThemeColor }">
                </div>
                <span class="text-xs">{{ scope.row.teamThemeColor }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="Team Name" width="300" style="min-width: 300;" sortable />
        <el-table-column prop="founded" label="Founded" width="120" align="center" sortable />
        <el-table-column prop="city" label="City" min-width="200" sortable />
        <el-table-column prop="homeStadium" label="Stadium" width="200" sortable />
        <el-table-column prop="headCoach" label="Head Coach" width="200" sortable />
        <el-table-column prop="websiteUrl" label="Official Website" width="200" align="center" sortable>
            <template #default="{ row }">
                <el-link v-if="row.websiteUrl" :underline="false" :href="row.websiteUrl" target="_blank" rel="noopener noreferrer"
                    class="text-blue-500 ">
                    <div class="bg-white text-xs rounded-2xl shadow-md hover:shadow-md transition-shadow px-3 py-2 mb-2">
                        Visit Website
                        <el-icon class="ml-1">
                            <Edit />
                        </el-icon>
                    </div>
                </el-link>
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
    <el-pagination class="flex justify-center my-2" background layout="prev, pager, next" :total="totalPage"
        v-model:page-size="pageSize" v-model:current-page="currentPage" />
</template>
