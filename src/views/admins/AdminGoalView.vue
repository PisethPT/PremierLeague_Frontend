<script setup>
import { ref, onMounted, computed, watch, defineEmits } from 'vue';
import { useGoalStore, usePlayerStore, useMatchStore } from '@/stores';
import BaseTable from '@/components/BaseTable.vue';
import BaseDialogForm from '@/components/BaseDialogForm.vue';
import BaseSelectWithIcon from '@/components/BaseSelectWithIcon.vue';
import BaseMatchSelect from '@/components/BaseMatchSelect.vue';
import
{
    Plus,
    EditPen,
    Delete,
    Search,
} from '@element-plus/icons-vue';

const emit = defineEmits(['update:form', 'update:modelValue', 'submit']);

const goalStore = useGoalStore();
const playerStore = usePlayerStore();
const matchStore = useMatchStore();

const goals = ref([]);
const PLAYER_LOGOS_DIR = ref();
const TEAM_LOGOS_DIR = ref();
const query = ref('');

const form = reactive({
    id: 0,
    matchId: null,
    teamId: null,
    playerId: null,
    minutes: 0,
});
const modelValue = ref(false);
const loading = ref(false);
const submitLoading = ref(false);
const width = ref('800px');
const title = ref('Add New Goal');
const rules = {
    minutes: [
        { required: true, message: 'Enter minute of player giving card', trigger: 'blur' },
        { type: 'number', min: 1, max: 120, message: 'Minutes must be between 1 and 120', trigger: 'blur' }
    ],
    matchId: [{ required: true, message: 'Select current match', trigger: 'change' }],
    teamId: [{ required: true, message: 'Select player team', trigger: 'change' }],
    playerId: [{ required: true, message: 'Select player that giving card', trigger: 'change' }],
}
const columns = [
    { label: 'Player', prop: 'player', slot: 'player', minWidth: 220, align: 'center', sortable: true },
    { label: 'From Team', prop: 'team', slot: 'fromTeam', minWidth: 200, align: 'center', sortable: true },
    { label: 'On Match', prop: 'match', slot: 'match', minWidth: 350, align: 'center', sortable: true },
    { label: 'Goal', prop: 'goal', slot: 'goal', minWidth: 120, align: 'center', sortable: true },
    { label: 'Minutes', prop: 'minutes', slot: 'minutes', minWidth: 120, align: 'center', sortable: true },
]

const selectWidth = ref('26px');
const selectHeight = ref('26px');
const selectedMatch = ref(null);
const selectMatchPlaceholder = ref('Select Match');
const matchSelectLabel = ref('Current Match');

const selectedTeam = ref(null);
const teamItemSelect = ref([]);
const teamPlaceholder = ref('Select Team');

const selectedPlayer = ref(null);
const playerItemSelect = ref([]);
const playerPlaceholder = ref('Select Player');
const matchOptions = ref([]);

watch(() =>
{
    if (!form.playerId)
    {
        if (selectedPlayer.value)
            form.playerId = selectedPlayer.value.id;
        console.log('player assign id: ' + form.playerId);

    }
    emit('update:modelValue', modelValue.value);
    emit('update:form', { ...form });
}, { immediate: true });

watch(selectedMatch, (val) =>
{
    if (val)
    {
        // console.log('select match: ' + val.id);
        form.matchId = val.id ?? null;
    }
    form.teamId = null;
    form.playerId = null;
});

watch(selectedTeam, async (val) =>
{
    if (val)
    {
        form.teamId = val.id ?? null;
        if (val.id)
        {
            playerItemSelect.value = [];
            selectedPlayer.value = null;
            form.playerId = selectedPlayer.value;
            // console.log('team selected: ' + val.id);
            await playerStore.getPlayerSelectListItemByTeamId(val.id);
            playerItemSelect.value = playerStore.playerItemSelect;
        }
    }
    form.playerId = null;
});

watch(selectedPlayer, (val) =>
{
    if (val)
    {
        form.playerId = val.id ?? null
        // console.log('select player: ' + form.playerId);
    }
})

onMounted(async () =>
{
    loading.value = true
    try
    {
        await goalStore.getGoals();
        goals.value = goalStore.goals;
        //console.log('goal data: ' + JSON.stringify(goals.value));

        PLAYER_LOGOS_DIR.value = goalStore.PLAYER_LOGOS_DIR;
        TEAM_LOGOS_DIR.value = goalStore.TEAM_LOGOS_DIR;

        await playerStore.getTeamSelectListItem();
        teamItemSelect.value = playerStore.teamItemSelect;

        const currentlyMatches = await matchStore.filteringMatches(2) ?? [];
        if (currentlyMatches.length > 0)
        {
            matchOptions.value.length = 0;
            currentlyMatches.map((match) =>
            {
                matchOptions.value.push({
                    id: match.matchId,
                    homeTeam: {
                        id: match.homeTeamId,
                        name: match.homeTeamName,
                        logo: TEAM_LOGOS_DIR.value + match.homeTeamClubCrest,
                    },
                    awayTeam: {
                        id: match.awayTeamId,
                        name: match.awayTeamName,
                        logo: TEAM_LOGOS_DIR.value + match.awayTeamClubCrest,
                    },
                })
            })
        }
    } catch (error)
    {
        console.log('error: ' + error);
        ElMessage.error('error on mount: ' + error);
    }
    finally
    {
        loading.value = false;
    }
});

const tableData = computed(() =>
{
    return goals.value.filter((goal) =>
    {
        return (
            goal.team.name.toLowerCase().includes(query.value.toLowerCase())
        )
    })
})

// functions
function handleOpenDialog()
{
    title.value = 'Create New Goal';
    // Reset form fields
    form.id = 0;
    form.matchId = null;
    form.teamId = null;
    form.playerId = null;
    form.minutes = 0;

    // Reset selection fields
    selectedMatch.value = null;
    selectedTeam.value = null;
    selectedPlayer.value = null;

    // Open dialog
    modelValue.value = true;
    submitLoading.value = false;

    // Reset form validation (important!)
    nextTick(() =>
    {
        formRef.value?.resetFields();
    });
}

async function handleSubmit()
{
    try
    {
        submitLoading.value = true;
        if (form.id != 0)
        {
            console.log('edit goal: ' + form.id, ', form:' + form);
            const data = await goalStore.editGoalById({ ...form }, form.id);
            if (data === 200)
            {
                ElMessage.success('Edit Goal Successfully');
                modelValue.value = false;
            } else
            {
                ElMessage.error('Error happened: ' + data);
            }
        } else
        {
            console.log('create goal: ' + form);
            const data = await goalStore.createGoal({ ...form });
            if (data === 201)
            {
                ElMessage.success('Create Goal Successfully');
                modelValue.value = false;
            } else
            {
                ElMessage.error('Error happened: ' + data);
            }
        }
        emit('update:form', { ...form });
        emit('submit', { ...form });
    } catch (error)
    {
        console.error('Submit error:', error);
        ElMessage.error(error.response?.data?.message || 'Submit failed');
    } finally
    {
        submitLoading.value = false;
    }
}

async function handleEdit(row)
{
    console.log('edit on id: ' + row.id);
    title.value = 'Edit Goal'
    selectedMatch.value = matchOptions.value.find((match) => match.id === row.matchId);
    selectedTeam.value = teamItemSelect.value.find((team) => team.id === row.team.id);

    await playerStore.getPlayerSelectListItemByTeamId(row.team.id);
    playerItemSelect.value = playerStore.playerItemSelect;
    selectedPlayer.value = playerItemSelect.value.find((player) => player.id === row.player.id);

    form.id = row.id;
    form.matchId = row.matchId;
    form.teamId = row.team.id;
    form.playerId = selectedPlayer.value ?? row.player.id;
    form.minutes = row.minutes;

    modelValue.value = true;
    submitLoading.value = false;
}

async function handleDelete(row)
{
    console.log('delete on id: ' + row.id);
    const playerPhoto = PLAYER_LOGOS_DIR.value + row.player.photo;
    const playerName = row.player.firstName + ' ' + row.player.lastName;
    const playerNumber = row.player.playerNumber;
    const teamLogo = TEAM_LOGOS_DIR.value + row.team.clubCrest; // player’s team
    const homeLogo = TEAM_LOGOS_DIR.value + row.match.homeTeamClubCrest;
    const awayLogo = TEAM_LOGOS_DIR.value + row.match.awayTeamClubCrest;
    const minutes = row.minutes;

    const htmlContent = `
  <style>
    .relative-container { position: relative; width: 100px; height: 100px; }
    .player-photo { width: 100%; height: 100%; object-fit: contain; border-radius: 50%; border: 1px solid #e5e7eb; }
    .goal { position: absolute; top: 4px; right: 4px; width: 22px; height: 22px; border-radius: 50%; border: 1px solid #ccc; }
    .team-logo { position: absolute; bottom: 2px; right: 2px; width: 30px; height: 30px; border-radius: 50%; border: 1px solid #e5e7eb; background: white; object-fit: contain; }
  </style>

  <div class="flex flex-col items-center space-y-4">
    <div class="relative-container">
      <img src="${playerPhoto}" alt="Player Photo" class="player-photo" />
      <div class="goal text-center flex justify-center items-center bg-white text-black text-sm font-bold">
        ⚽
      </div>
      <img src="${teamLogo}" alt="Team Logo" class="team-logo" />
    </div>
    <div class="text-center mt-2">
  <div class="text-base font-semibold text-gray-800">${playerName}</div>
  <div class="text-sm text-gray-500">#${playerNumber}</div>
</div>
    <div class="mt-1">
  <span class="inline-block bg-gray-100 text-gray-800 text-xl font-bold px-3 py-1 rounded-full shadow">
    ${minutes}&rsquo;
  </span>
</div>
    <div class="grid grid-cols-3 gap-4 items-center text-center bg-amber-50 shadow-sm border-0 rounded-sm px-1 py-2 w-full">
      <div>
        <img src="${homeLogo}" alt="${row.match.homeTeamName}" class="w-10 h-10 object-contain mx-auto" />
        <div class="text-sm text-gray-600 mt-1">${row.match.homeTeamName}</div>
      </div>
      <div class="text-xl font-semibold text-gray-700">VS</div>
      <div>
        <img src="${awayLogo}" alt="${row.match.awayTeamName}" class="w-10 h-10 object-contain mx-auto" />
        <div class="text-sm text-gray-600 mt-1">${row.match.awayTeamName}</div>
      </div>
    </div>

    <p class="text-base text-center text-gray-700 font-medium mt-2">
      Are you sure you want to delete this goal?
    </p>
  </div>
`;
    ElMessageBox.confirm(htmlContent, {
        title: 'Delete Goal Confirmation',
        confirmButtonText: 'Yes, Delete',
        cancelButtonText: 'Cancel',
        type: 'warning',
        center: true,
        dangerouslyUseHTMLString: true,
    })
        .then(async () =>
        {
            try
            {
                if (row.matchId)
                {
                    const data = await goalStore.deleteGoalById(row.id);
                    if (data === 200)
                    {
                        ElMessage.success({
                            type: 'success',
                            message: 'Goal deleted successfully',
                        });
                    } else
                    {
                        ElMessage.error({
                            type: 'error',
                            message: 'Failed to delete goal. Please try again.',
                        });
                    }
                } else
                {
                    ElMessage.error({
                        type: 'error',
                        message: 'Goal ID not found: ' + row.id,
                    });
                }
            } catch (error)
            {
                ElMessage.error({
                    type: 'error',
                    message: 'Error: ' + error,
                });
            }
        })
        .catch(() =>
        {
            ElMessage.info({
                type: 'info',
                message: 'Delete canceled',
            });
        });
}

const formatDate = (dateString) =>
{
    const date = new Date(dateString)
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
        'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    return `${weekdays[date.getDay()]}, ${String(date.getDate()).padStart(2, '0')}-${months[date.getMonth()]}-${date.getFullYear()}`
}

const formatTime = (timeString) =>
{
    const date = new Date(`1970-01-01T${timeString}`) // base date to parse time only
    return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    })
}
</script>

<template>
    <!-- dialog -->
    <BaseDialogForm v-model="modelValue" :form="form" :formRef="formRef" :rules="rules" :title="title" :width="width"
        :loading="submitLoading" @update:form="emit('update:form', $event)"
        @update:modelValue="emit('update:modelValue', $event)" @submit="handleSubmit">
        <template #form>
            <BaseMatchSelect v-model="selectedMatch" :options="matchOptions" prop="matchId" :label="matchSelectLabel"
                :placeholder="selectMatchPlaceholder" :width="selectWidth" />

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <BaseSelectWithIcon v-model="selectedTeam" :options="teamItemSelect" label="Team"
                    :placeholder="teamPlaceholder" prop="teamId" :width="selectWidth" :height="selectHeight" />
                <BaseSelectWithIcon v-model="selectedPlayer" :options="playerItemSelect" label="Player"
                    :placeholder="playerPlaceholder" prop="playerId" />
            </div>

            <el-form-item label="Minutes" prop="minutes">
                <el-input-number v-model.number="form.minutes" type="number" :min="0.01" />
            </el-form-item>
        </template>
    </BaseDialogForm>

    <!-- table -->
    <div class="overflow-x-auto">
        <BaseTable :table-data="tableData" :columns="columns" :loading="loading" :show-index="true" class="min-w-full">
            <template #player="{ row }">
                <div class="flex items-center gap-3">
                    <el-avatar :size="60" :src="row.player.photo ? PLAYER_LOGOS_DIR + row.player.photo : ''"
                        class="border-2 border-gray-200 shadow-sm">
                        {{ row.player.firstName.charAt(0) }}{{ row.player.lastName.charAt(0) }}
                    </el-avatar>
                    <div class="flex flex-col">
                        <span class="font-medium text-gray-800">{{ row.player.firstName }} {{ row.player.lastName
                        }}</span>
                        <span class="text-xs text-gray-500">#{{ row.player.playerNumber }}</span>
                        <span class="text-xs text-blue-600 font-medium">{{ row.player.position }}</span>
                    </div>
                </div>
            </template>

            <template #fromTeam="{ row }">
                <div class="flex flex-col items-center gap-1 min-w-[120px]">
                    <div class="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center p-1 shadow-inner">
                        <img :src="row.team.clubCrest ? TEAM_LOGOS_DIR + row.team.clubCrest : ''"
                            :alt="row.team.clubCrest" class="w-10 h-10 object-contain">
                    </div>
                    <span class="text-sm font-medium text-gray-700 text-center">{{ row.team.shortName ||
                        row.team.name }}</span>
                    <span class="text-xs text-gray-500">{{ row.team.league }}</span>
                </div>
            </template>

            <template #match="{ row }">
                <div class="bg-gray-50 rounded-lg p-2 border border-gray-200">
                    <div class="grid grid-cols-3 gap-2 items-center">
                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow">
                                <img :src="row.match.homeTeamClubCrest ? TEAM_LOGOS_DIR + row.match.homeTeamClubCrest : ''"
                                    class="w-8 h-8 object-contain" />
                            </div>
                            <div class="text-xs font-medium text-gray-700 mt-1 text-center line-clamp-2">
                                {{ row.match.homeTeamShortName || row.match.homeTeamName }}
                            </div>
                        </div>

                        <div class="flex flex-col items-center">
                            <span class="text-xs font-bold bg-gray-200 px-2 py-1 rounded-full">VS</span>
                            <span class="text-xs font-bold text-gray-600 mt-1">
                                {{ row.match.homeTeamScore }} - {{ row.match.awayTeamScore }}
                            </span>
                        </div>

                        <div class="flex flex-col items-center">
                            <div class="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 shadow">
                                <img :src="row.match.awayTeamClubCrest ? TEAM_LOGOS_DIR + row.match.awayTeamClubCrest : ''"
                                    class="w-8 h-8 object-contain" />
                            </div>
                            <div class="text-xs font-medium text-gray-700 mt-1 text-center line-clamp-2">
                                {{ row.match.awayTeamShortName || row.match.awayTeamName }}
                            </div>
                        </div>
                    </div>

                    <div class="text-center text-xs mt-2 bg-gray-100 rounded py-1 font-medium text-gray-600">
                        {{ formatDate(row.match.matchDate) }} • {{ formatTime(row.match.matchTime) }}
                    </div>
                </div>
            </template>

            <template #goal="{ row }">
                <div class="flex justify-center">
                    <div class="bg-gray-100 w-10 h-10 rounded-full flex items-center justify-center shadow-inner">
                        <span class="text-xl">⚽</span>
                    </div>
                </div>
            </template>

            <template #minutes="{ row }">
                <div class="flex justify-center">
                    <span
                        class="inline-flex items-center justify-center bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full shadow-sm w-16">
                        {{ row.minutes }}'
                    </span>
                </div>
            </template>

            <template #actions>
                <el-table-column label="Actions" width="420" label-class-name="text-center" align="center"
                    fixed="right">
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
    </div>

    <!-- table footer -->
    <div
        class="px-4 py-3 border-t border-gray-200 bg-gray-50 flex flex-col md:flex-row items-center justify-between gap-3">
        <div class="text-sm text-gray-600">
            Showing <span class="font-medium">{{ tableData.length }}</span> disciplinary records
        </div>
        <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">Goals:</span>
            <span class="inline-flex items-center gap-1 text-sm font-medium">
                <span class="w-3 h-3 bg-blue-400 rounded-full"></span>
                {{ yellowCardCount }} Goal
            </span>
            <span class="inline-flex items-center gap-1 text-sm font-medium">
                <span class="w-3 h-3 bg-gray-500 rounded-full"></span>
                {{ redCardCount }} Own Goal
            </span>
        </div>
    </div>

</template>