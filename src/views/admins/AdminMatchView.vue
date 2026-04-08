<script setup>
import { ref, reactive, defineProps, onMounted, computed, defineEmits, watch } from 'vue'
import { useMatchStore } from '@/stores/matchStore';
import { usePlayerStore } from '@/stores/playerStore'
import
{
  EditPen,
  Delete,
  Search,
  Plus,
  StarFilled,
} from '@element-plus/icons-vue'
import BaseTable from '@/components/BaseTable.vue'
import BaseDialogForm from '@/components/BaseDialogForm.vue';
import BaseSelectWithIcon from '@/components/BaseSelectWithIcon.vue';
import { ElMessage, ElMessageBox } from 'element-plus';

const matchStore = useMatchStore();
const TEAM_LOGOS_DIR = matchStore.TEAM_LOGOS_DIR;
const playerStore = usePlayerStore();
const formRef = ref();
const modelValue = ref(false);
const selectedHomeTeam = ref(null);
const selectedAwayTeam = ref(null);
const title = ref('Add New Match');
const loading = ref(false);
const submitLoading = ref(false);
const width = ref('800px');
const query = ref('');
const teams = ref([]);
const teamItemSelect = ref([]);
const seasonItemSelect = ref([]);
const homeTeamPlaceholder = ref('Select Home Team');
const awayTeamPlaceholder = ref('Select Away Team');

const form = reactive({
  id: 0,
  seasonId: null,
  homeTeamId: null,
  awayTeamId: null,
  matchDate: null,
  matchTime: null,
  homeTeamScore: null,
  awayTeamScore: null,
  kickoffStatus: null,
  isHomeStadium: true,
  kickoffStadium: null,
  isGameFinish: null,
});

const rules = {
  seasonId: [{ required: true, message: 'Please select season', trigger: 'blur' }],
  homeTeamId: [{ required: true, message: 'Please select home team', trigger: 'change' }],
  awayTeamId: [{ required: true, message: 'Please select away team', trigger: 'change' }],
  matchDate: [{ required: true, message: 'Please select match date', trigger: 'blur' }],
  matchTime: [{ required: true, message: 'Please select match time', trigger: 'blur' }],
  homeTeamScore: [{ required: true, message: 'Please enter home team score', trigger: 'blur' }],
  awayTeamScore: [{ required: true, message: 'Please enter away team score', trigger: 'blur' }],
  isGameFinish: [{ required: true, message: 'Please select game finish status', trigger: 'blur' }],
  kickoffStatus: [{ required: true, message: 'Please select kickoff status', trigger: 'blur' }],
  kickoffStadium: [{ required: true, message: 'Please enter kickoff stadium', trigger: 'blur' }],
}

const columns = [
  { label: 'Stadium', prop: 'kickoffStadium', width: 200, align: 'center', sortable: true },
  { label: 'Home Team', prop: 'homeTeamName', align: 'right', minWidth: 140, sortable: true },
  { label: 'Home Team Logo', prop: 'homeTeamClubCrest', width: 150, slot: 'homeTeamClubCrest', align: 'center' },
  { label: 'Score', prop: 'homeTeamScore', width: 90, align: 'center', sortable: true },
  { label: 'Vs', prop: 'vs', width: 50, slot: 'vs', align: 'center' },
  { label: 'Score', prop: 'awayTeamScore', width: 90, align: 'center', sortable: true },
  { label: 'Away Team Logo', prop: 'awayTeamClubCrest', width: 150, slot: 'awayTeamClubCrest', align: 'center' },
  { label: 'Away Team', prop: 'awayTeamName', minWidth: 140, sortable: true },
  { label: 'Match Date', prop: 'matchDate', width: 185, slot: 'matchDate', align: 'center', sortable: true },
  { label: 'Kick Off', prop: 'matchTime', width: 150, slot: 'matchTime', align: 'center', sortable: true },
  { label: 'Finish', prop: 'isGameFinish', width: 150, slot: 'isGameFinish', align: 'center', sortable: true },
  { label: 'Status', prop: 'kickoffStatus', width: 150, align: 'center', slot: 'kickoffStatus', sortable: true },
]

const liveCount = ref(0);
const upComingCount = ref(2);
const finishedCount = ref(8)

const emit = defineEmits(['update:modelValue', 'update:form', 'submit']);

watch(() =>
{
  //console.log('Form props changed:', form);

  form.awayTeamId = selectedAwayTeam.value ? selectedAwayTeam.value.id : null;
  form.homeTeamId = selectedHomeTeam.value ? selectedHomeTeam.value.id : null;
  if (form.isHomeStadium === true)
  {
    form.kickoffStadium = selectedHomeTeam.value ? selectedHomeTeam.value.name : null;
  } else
  {
    form.kickoffStadium = selectedAwayTeam.value ? selectedAwayTeam.value.name : null;
  }
  // Reset form when dialog is closed
  if (!modelValue.value)
  {
    form.id = 0;
    form.seasonId = null;
    form.matchDate = null;
    form.matchTime = null;
    form.homeTeamId = null;
    form.awayTeamId = null;
    form.homeTeamScore = null;
    form.awayTeamScore = null;
    form.isGameFinish = null;
    form.kickoffStatus = null;
    form.kickoffStadium = null;
    form.isHomeStadium = true;
    selectedHomeTeam.value = null;
    selectedAwayTeam.value = null;
  }

  emit('update:modelValue', modelValue.value);
  emit('update:form', { ...form });
}, { immediate: true });

watch(selectedHomeTeam, (val) =>
{
  if (val)
  {
    console.log('select home team:' + val.id);
    form.homeTeamId = val.id ?? null;
  }
  form.awayTeamId = null;
});

onMounted(async () =>
{
  loading.value = true;
  try
  {
    const data = await matchStore.getMatches();
    teams.value = data;
    seasonItemSelect.value = await matchStore.getSeasonSelectListItem();

    await playerStore.getTeamSelectListItem()
    teamItemSelect.value = playerStore.teamItemSelect;

    //console.log('Matches fetched:', data);
  } catch (error)
  {
    console.error('Error fetching matches:', error);
  } finally
  {
    loading.value = false;
  }
});

const tableData = computed(() =>
{
  return teams.value.filter((item) =>
  {
    return (
      item.homeTeamName.toLowerCase().includes(query.value.toLowerCase()) ||
      item.awayTeamName.toLowerCase().includes(query.value.toLowerCase()) ||
      item.homeTeamScore.toString().includes(query.value) ||
      item.awayTeamScore.toString().includes(query.value)
    );
  });
});

function handleOpenDialog()
{
  form.seasonId = null;
  form.matchDate = null;
  form.matchTime = null;
  form.homeTeamId = null;
  form.awayTeamId = null;
  form.homeTeamScore = null;
  form.awayTeamScore = null;
  form.isGameFinish = null;
  form.kickoffStatus = null;
  form.kickoffStadium = null;
  form.isHomeStadium = true;
  selectedHomeTeam.value = null;
  selectedAwayTeam.value = null;
  formRef.value = {};


  modelValue.value = true;
  title.value = 'Add New Match';
  loading.value = false;
  // console.log('Dialog opened with form:', modelValue.value);
}

const handleEdit = (row) =>
{
  form.id = row.matchId;
  form.seasonId = row.id;
  form.matchDate = row.matchDate;
  form.matchTime = row.matchTime;
  form.homeTeamId = row.homeTeamId;
  form.awayTeamId = row.awayTeamId;
  form.homeTeamScore = row.homeTeamScore;
  form.awayTeamScore = row.awayTeamScore;
  form.isGameFinish = row.isGameFinish;
  form.kickoffStatus = row.kickoffStatus;
  form.kickoffStadium = row.kickoffStadium;
  form.isHomeStadium = row.isHomeStadium;

  selectedHomeTeam.value = teamItemSelect.value.find(team => team.id === row.homeTeamId) || null;
  selectedAwayTeam.value = teamItemSelect.value.find(team => team.id === row.awayTeamId) || null;

  modelValue.value = true;
  title.value = 'Edit Match';
  console.log('Dialog opened with form:', form);
  // console.log('Edit:', row);
}

const handleDelete = (row) =>
{
  //console.log('Delete:', row);

  ElMessageBox.confirm(
    `
    <div class="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
      <div class="flex justify-center items-center flex-col">
        <img src="${TEAM_LOGOS_DIR + row.homeTeamClubCrest}" alt="${row.homeTeamName}" class="w-20 h-20 object-contain mx-auto"/>
        <div class="text-gray-500 text-center mt-1 text-wrap">${row.homeTeamName}</div>
      </div>
      <div class="flex justify-center items-center">
        <span class="text-2xl text-gray-500 text-center align-middle">Vs</span>  
      </div>
      <div class="flex justify-center flex-col">
        <img src="${TEAM_LOGOS_DIR + row.awayTeamClubCrest}" alt="${row.awayTeamName}" class="w-20 h-20 object-contain mx-auto"/>
        <div class="text-gray-500 text-center mt-1 text-wrap">${row.awayTeamName}</div>
      </div>
    </div>
    <h3 class="mt-2 text-center">Do you want to delete this match ?</h3>
    `
    , {
      type: 'info',
      title: 'Delete Match Dialog',
      confirmButtonText: 'Ok',
      cancelButtonText: 'Cancel',
      center: true,
      dangerouslyUseHTMLString: true,
    }).then(async () =>
    {
      try
      {
        if (row.matchId)
        {
          const data = await matchStore.deleteByMatch(row.matchId);
          if (data === 200)
            ElMessage.success({
              type: 'success',
              message: 'Delete Match Successfully',
            })
          else
            ElMessage.error({
              type: 'danger',
              message: 'Error When Delete Match' + error,
            })
        } else
          ElMessage.error({
            type: 'danger',
            message: 'Match Id not found: ' + row.matchId,
          })
      } catch (error)
      {
        ElMessage.error({
          type: 'danger',
          message: 'Error' + error,
        });
      }
    }).catch(() =>
    {
      ElMessage.info({
        type: 'info',
        message: 'Delete Match Canceled',
      });
    });
}

async function onSubmit()
{
  console.log('Form submitted:', form);
  submitLoading.value = true;

  try
  {
    if (form.id !== 0)
    {
      //console.log('Editing match with form:', form);
      const data = await matchStore.editMatchById({ ...form }, form.id);
      // const data = await matchStore.editMatchById({ ...form, seasonId: form.seasonId }, form.id);

      if (data === 200)
      {
        ElMessage.success('Edit Match successful!');
        modelValue.value = false;
      } else
      {
        ElMessage.error('Edit Error happened: ' + data);
      }
    } else
    {
      //console.log('Creating new match with form:', form);
      const data = await matchStore.createMatch({ ...form, seasonId: form.seasonId });

      if (data === 201)
      {
        ElMessage.success('Create New Match successful!');
        modelValue.value = false;
      } else
      {
        ElMessage.error('Create Error happened: ' + data);
      }
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
  <BaseDialogForm v-model="modelValue" :form="form" :rules="rules" :title="title" :width="width"
    :loading="submitLoading" @update:modelValue="emit('update:modelValue', $event)"
    @update:form="emit('update:form', $event)" @submit="onSubmit">
    <template #form>
      <el-form-item label="Season" prop="SeasonId">
        <el-select v-model="form.seasonId" placeholder="Select season" filterable>
          <el-option v-for="season in seasonItemSelect" :key="season.value" :label="season.label"
            :value="season.value" />
        </el-select>
      </el-form-item>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <BaseSelectWithIcon v-model="selectedHomeTeam" :options="teamItemSelect" label="Home Team"
          :placeholder="homeTeamPlaceholder" prop="homeTeamId" />
        <BaseSelectWithIcon v-model="selectedAwayTeam" :options="teamItemSelect" label="Away Team"
          :placeholder="awayTeamPlaceholder" prop="awayTeamId" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <el-form-item label="Match Date" prop="matchDate">
          <el-date-picker v-model="form.matchDate" type="date" placeholder="Select date" />
        </el-form-item>
        <el-form-item label="Match Time" prop="matchTime">
          <el-time-picker v-model="form.matchTime" format="HH:mm:ss" value-format="HH:mm:ss"
            placeholder="Select time" />
        </el-form-item>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <el-form-item label="Home Score" prop="homeTeamScore">
          <el-input-number v-model="form.homeTeamScore" :min="0" placeholder="Score" />
        </el-form-item>
        <el-form-item label="Away Score" prop="awayTeamScore">
          <el-input-number v-model="form.awayTeamScore" :min="0" placeholder="Score" />
        </el-form-item>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <el-form-item label="Game Finish" prop="isGameFinish">
          <el-select v-model="form.isGameFinish" placeholder="Select game finish status">
            <el-option label="Finished" :value="true" />
            <el-option label="Ongoing" :value="false" />
          </el-select>
        </el-form-item>
        <el-form-item label="Kickoff Status" prop="kickoffStatus">
          <el-select v-model="form.kickoffStatus" placeholder="Select kickoff status">
            <el-option label="Live" :value="0" />
            <el-option label="Upcoming" :value="1" />
            <el-option label="Finished" :value="2" />
          </el-select>
        </el-form-item>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <el-form-item label="(Home/Away)" prop="isHomeStadium">
          <el-switch v-model="form.isHomeStadium" />
        </el-form-item>
        <el-form-item label="Stadium" prop="kickoffStadium">
          <el-input v-model="form.kickoffStadium" placeholder="Enter kickoff stadium" :prefix-icon="StarFilled" />
        </el-form-item>
      </div>
    </template>
  </BaseDialogForm>

  <BaseTable :table-data="tableData" :columns="columns" :loading="loading" :show-index="true">
    <!-- Custom render for logo -->
    <template #homeTeamClubCrest="{ row }">
      <img :src="row.homeTeamClubCrest ? TEAM_LOGOS_DIR + row.homeTeamClubCrest : ''" alt="logo" width="40"
        class="w-14 h-14 object-contain mx-auto" />
    </template>

    <template #vs>
      <span>vs</span>
    </template>

    <template #awayTeamClubCrest="{ row }">
      <img :src="row.awayTeamClubCrest ? TEAM_LOGOS_DIR + row.awayTeamClubCrest : ''" alt="logo" width="40"
        class="w-14 h-14 object-contain mx-auto" />
    </template>

    <template #isGameFinish="{ row }">
      <div class="flex justify-center items-center w-full">
        <div v-if="row.isGameFinish == 1"
          class="py-1 px-4 w-fit rounded-full text-xs text-center bg-green-800 text-white hover:bg-transparent hover:border-1 hover:border-green-800 hover:text-green-800 cursor-pointer">
          Finished
        </div>
        <div v-else-if="row.isGameFinish == false"
          class="py-1 px-4 w-fit rounded-full text-xs text-center bg-amber-500 text-white hover:bg-transparent hover:border-1 hover:border-amber-500 hover:text-amber-500 cursor-pointer">
          Ongoing
        </div>
      </div>
    </template>

    <template #matchDate="{ row }">
      <span>{{ formatDate(row.matchDate) }}</span>
    </template>

    <template #matchTime="{ row }">
      <span>{{ formatTime(row.matchTime) }}</span>
    </template>

    <template #kickoffStatus="{ row }">
      <div class="flex justify-center item-center w-full">
        <div v-if="row.kickoffStatus == 0"
          class="py-1 px-4 w-fit rounded-full text-xs text-center border-1 border-red-600 text-red-600 hover:bg-red-600 hover:text-white cursor-pointer">
          Live
        </div>
        <div v-else-if="row.kickoffStatus == 1"
          class="py-1 px-4 w-fit rounded-full text-xs text-center border-1 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white cursor-pointer">
          Upcoming
        </div>
        <div v-else-if="row.kickoffStatus == 2"
          class="py-1 px-4 w-fit rounded-full text-xs text-center border-1 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white cursor-pointer">
          Finished
        </div>
      </div>
    </template>

    <template #actions>
      <el-table-column label="Actions" width="420" label-class-name="text-center" align="center" fixed="right">
        <template #header>
          <div class="flex justify-between gap-2">
            <el-input v-model="query" size="normal" placeholder="Search ..." :prefix-icon="Search" clearable />
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
      <span class="text-sm text-gray-600">Matches status:</span>
      <span class="inline-flex items-center gap-1 text-sm font-medium">
        <span class="w-3 h-3 bg-red-600 rounded-full"></span>
        {{ liveCount }} Live
      </span>
      <span class="inline-flex items-center gap-1 text-sm font-medium">
        <span class="w-3 h-3 bg-blue-600 rounded-full"></span>
        {{ upComingCount }} Upcoming
      </span>
      <span class="inline-flex items-center gap-1 text-sm font-medium">
        <span class="w-3 h-3 bg-gray-600 rounded-full"></span>
        {{ finishedCount }} Finished
      </span>
    </div>
  </div>
</template>

