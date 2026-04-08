<script setup>
import { ref, computed, onMounted, onBeforeUnmount, defineEmits } from 'vue'
import { useAuthStore } from '@/stores/auth';
import { useFunctionsStore } from '@/stores/function';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
import Empty from './Empty.vue';
import
{
    SwitchButton,
    User,
    SetUp,
    Menu as IconMenu,
    Setting,
    Expand,
    Fold,
    Football,
    Plus,
    Calendar,
    Star,
    Timer,
    MessageBox,
    CopyDocument,
    Place,
    Guide,
    GoldMedal,
    Odometer,
    MoreFilled,
    ArrowRightBold,
} from '@element-plus/icons-vue';
import router from '@/router';
import TeamDialog from './TeamDialog.vue';
import PlayerDialog from './PlayerDialog.vue';

const form = ref({
    id: 0,
    name: '',
    city: '',
    founded: '',
    homeStadium: '',
    headCoach: '',
    clubCrest: '',
});

const isMobile = computed(() => window.innerWidth <= 768)
const route = useRoute();
const isExpand = ref(false);
const userName = ref('');
const authStore = useAuthStore();
const functionStore = useFunctionsStore();
const activeIndex = ref('1');
const isCollapse = ref(true);
const dialogTitle = ref('Add New Team');
const isTeamOpenDialog = ref(false);
const contentTitle = ref('Dashboard');
const subTitle = ref("");
const isCreate = ref(false);


// players
const isPlayerDialogOpen = ref(false);
const playerDialogTitle = ref('Add New Player');
const width = ref('800px');

function openDialogs()
{
    if (isCreate && contentTitle.value === 'Teams')
    {
        isTeamOpenDialog.value = true;
    } else if (isCreate && contentTitle.value === 'Players')
    {
        isPlayerDialogOpen.value = true;
    }
}


// Collapse if screen is small
const handleResize = () =>
{
    if (window.innerWidth <= 768)
    {
        isCollapse.value = true
    } else
    {
        isCollapse.value = false
    }
}

// Debounced resize to prevent jitter
let resizeTimeout
const onResize = () =>
{
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() =>
    {
        handleResize()
    }, 100) // 100ms debounce
}

onBeforeUnmount(() =>
{
    window.removeEventListener('resize', onResize)
})

onMounted(() =>
{
    userName.value = localStorage.getItem('userName');
    authStore.checkAuth();
    handleResize()
    window.addEventListener('resize', () =>
    {
        isMobile.value = window.innerWidth <= 768;
        onResize();
    })
});


const handleOpen = (key, keyPath) =>
{
    console.log(key, keyPath)
}

const handleClose = (key, keyPath) =>
{
    console.log(key, keyPath)
}

const handleSelect = (key, keyPath) =>
{
    if (key == 'logout')
    {
        functionStore.logout();
        authStore.isLogin = false;
        return;
    }
    console.log(key, keyPath)

    function expand()
    {
        isExpand.value = !isExpand.value;
    }

    checkoutSelectedMenu(key);

    if (router.hasRoute(key))
    {
        router.push({ name: key });
    } else
    {
        router.push({ name: 'admin-not-found' });
    }
}

const checkoutSelectedMenu = (key) =>
{
    switch (key)
    {
        case 'admin-dashboard':
            {
                contentTitle.value = 'Dashboard';
                subTitle.value = '';
                isCreate.value = false;
                break;
            }
        case 'admin-news-index':
            {
                contentTitle.value = 'News';
                subTitle.value = 'Daily news feed for this session';
                isCreate.value = false;
                break;
            }
        case 'admin-teams-index':
            {
                contentTitle.value = 'Clubs';
                subTitle.value = 'All club football on session 2025/2026';
                isCreate.value = true;
                break;
            }
        case 'admin-players-index':
            {
                contentTitle.value = 'Players';
                subTitle.value = 'All club\'s players';
                isCreate.value = true;
                break;
            }
        case 'admin-matches-index':
            {
                contentTitle.value = 'Matches';
                subTitle.value = 'Daily matches on session 2024/2026';
                isCreate.value = false;
                break;
            }
        case 'admin-seasons-index':
            {
                contentTitle.value = 'Seasons';
                subTitle.value = 'English Premier League 2025/2026';
                isCreate.value = false;
                break;
            }
        case 'admin-top-scorer-index':
            {
                contentTitle.value = 'Top Scorer';
                subTitle.value = '';
                isCreate.value = true;
                break;
            }
        case 'admin-cards-index':
            {
                contentTitle.value = 'Player Cards';
                subTitle.value = 'Disciplinary records for matches';
                isCreate.value = false;
                break;
            }
        case 'admin-goals-index':
            {
                contentTitle.value = 'Goals';
                subTitle.value = 'Disciplinary records for matches';
                isCreate.value = false;
                break;
            }
        case 'admin-assists-index':
            {
                contentTitle.value = 'Assists';
                subTitle.value = 'Disciplinary records for matches';
                isCreate.value = true;
                break;
            }
        case 'admin-user-manage':
            {
                contentTitle.value = 'User Manage';
                subTitle.value = '';
                isCreate.value = false;
                break;
            }
        case 'admin-issues-index':
            {
                contentTitle.value = 'Issues';
                subTitle.value = 'System issues and updates';
                isCreate.value = false;
                break;
            }
        default:
            {
                contentTitle.value = 'Dashboard';
                subTitle.value = '';
                isCreate.value = false;
                break;
            }
    }
}

</script>

<template>

    <!-- Dialog -->
    <TeamDialog :form="form" v-model:isOpenDialog="isTeamOpenDialog" :dialogTitle="dialogTitle" />
    <PlayerDialog v-model:modelValue="isPlayerDialogOpen" :title="playerDialogTitle" :width="width" />

    <el-container class="flex w-full h-screen">
        <!-- Sidebar -->
        <el-aside :width="isCollapse ? '65px' : '285px'" class="shadow transition-[width] ease-in-out duration-200"
            style="height: 100vh;">
            <el-scrollbar>
                <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" default-active="2" style="height: 100vh;"
                    @open="handleOpen" @close="handleClose" @select="handleSelect">
                    <!-- Toggle Button -->
                    <el-radio-group v-model="isCollapse" class="float-end">
                        <el-radio-button :value="false" v-if="isCollapse" class="!border-none rounded-full p-2">
                            <el-icon size="small">
                                <Expand />
                            </el-icon>
                        </el-radio-button>
                        <el-radio-button :value="true" v-else class="!border-none rounded-full p-2">
                            <el-icon size="small">
                                <Fold />
                            </el-icon>
                        </el-radio-button>
                    </el-radio-group>

                    <el-menu-item index="0" class="flex justify-evenly align-middle items-center gap-2 mr-2 p-2"
                        readonly>
                        <img style="width: 20px;" src="/src/assets/pl-main-logo.png" alt="epl-logo" />
                        <template #title>English Premier League</template>
                    </el-menu-item>

                    <el-menu-item index="admin-dashboard">
                        <el-icon>
                            <Odometer />
                        </el-icon>
                        <template #title>
                            <span>Dashboard</span>
                        </template>
                    </el-menu-item>

                    <el-menu-item index="admin-news-index">
                        <el-icon>
                            <MessageBox />
                        </el-icon>
                        <template #title>News</template>
                    </el-menu-item>

                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon>
                                <Star />
                            </el-icon>
                            <span>Clubs</span>
                        </template>
                        <el-menu-item index="admin-teams-index">
                            <el-icon>
                                <Football />
                            </el-icon>
                            All Clubs
                        </el-menu-item>

                        <el-menu-item index="admin-top-scorer-index">
                            <el-icon>
                                <GoldMedal />
                            </el-icon>
                            <template #title>
                                Top Scorer
                            </template>
                        </el-menu-item>
                        <el-menu-item index="admin-cards-index">
                            <el-icon>
                                <CopyDocument />
                            </el-icon>
                            <template #title>
                                Cards
                            </template>
                        </el-menu-item>

                        <el-menu-item index="admin-goals-index">
                            <el-icon>
                                <Place />
                            </el-icon>
                            <template #title>
                                Goals
                            </template>
                        </el-menu-item>

                        <el-menu-item index="admin-assists-index">
                            <el-icon>
                                <Guide />
                            </el-icon>
                            <template #title>
                                Assists
                            </template>
                        </el-menu-item>

                        <el-sub-menu index="2-4">
                            <template #title>
                                <el-icon>
                                    <MoreFilled />
                                </el-icon>
                                <span>Fantasy</span>
                            </template>
                            <el-menu-item index="2-4-1">
                                <template #title>
                                    <el-icon size="small">
                                        <ArrowRightBold />
                                    </el-icon>
                                    <span>Fantasy Premier League</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="2-4-2">
                                <template #title>
                                    <el-icon size="small">
                                        <ArrowRightBold />
                                    </el-icon>
                                    <span>Fantasy Draft</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="2-4-3">
                                <template #title>
                                    <el-icon size="small">
                                        <ArrowRightBold />
                                    </el-icon>
                                    <span>Fantasy Challenge</span>
                                </template>
                            </el-menu-item>
                        </el-sub-menu>
                    </el-sub-menu>

                    <el-menu-item index="admin-players-index">
                        <el-icon>
                            <User />
                        </el-icon>
                        <template #title>Players</template>
                    </el-menu-item>

                    <el-menu-item index="admin-matches-index">
                        <el-icon>
                            <Calendar />
                        </el-icon>
                        <template #title>Matches</template>
                    </el-menu-item>

                    <el-menu-item index="admin-seasons-index">
                        <el-icon>
                            <Timer />
                        </el-icon>
                        <template #title>Seasons</template>
                    </el-menu-item>

                    <el-menu-item index="admin-user-manage">
                        <el-icon>
                            <SetUp />
                        </el-icon>
                        <template #title>Users Manage</template>
                    </el-menu-item>

                    <el-sub-menu index="5">
                        <template #title>
                            <el-icon>
                                <setting />
                            </el-icon>
                            <span>Settings</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="admin-issues-index">
                                <template #title>
                                    <el-icon>
                                        <user />
                                    </el-icon>
                                    <span>About Me</span>
                                </template>
                            </el-menu-item>
                            <el-menu-item index="logout">
                                <template #title>
                                    <el-icon>
                                        <switch-button />
                                    </el-icon>
                                    <span>Logout</span>
                                </template>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </el-aside>

        <!-- Main Content -->
        <el-container class="transition-all ease-in-out duration-200">
            <el-header class="text-end shadow transition-all ease-in-out duration-200 text-sm z-10">
                <div class="toolbar">
                    <el-icon>
                        <User />
                    </el-icon>
                    <span class="ml-2">{{ userName }}</span>
                    <el-dropdown class="ml-10">
                        <el-icon class="text-center mr-2" size="large">
                            <setting />
                        </el-icon>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>View</el-dropdown-item>
                                <el-dropdown-item>Add</el-dropdown-item>
                                <el-dropdown-item>Delete</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </el-header>

            <el-main class="transition-all ease-in-out duration-200">
                <div class="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
                    <!-- Table Header -->
                    <div
                        class="p-4 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h2 class="text-xl font-bold text-gray-800">{{ contentTitle }}</h2>
                            <p class="text-sm text-gray-600">{{ subTitle }}</p>
                        </div>
                    </div>
                    <Empty v-if="route.name === 'admin-not-found'" />
                    <RouterView v-else />
                </div>
            </el-main>

        </el-container>
    </el-container>
</template>

<style>
html,
body {
    background: white !important;
}

.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

:deep(.el-menu-item:hover) {
    background-color: transparent !important;
    color: inherit !important;
    /* keep same text color */
}
</style>
