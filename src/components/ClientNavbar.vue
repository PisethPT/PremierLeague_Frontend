<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import axios from 'axios';
import { useRoute, useRouter, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useFunctionsStore } from '@/stores/function';
import { googleSdkLoaded, decodeCredential } from 'vue3-google-login';
import ClubNews from './ClubNews.vue';

import { ArrowDown } from '@element-plus/icons-vue';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const router = useRouter();
const route = useRoute();

const user = ref(null);
const userName = ref('');
const authStore = useAuthStore();
const functionStore = useFunctionsStore();

const showMobile = ref(false);
const activeIndex = ref('');

onMounted(() =>
{
    userName.value = localStorage.getItem('userName') || '';
    authStore.checkAuth();
    updateActive();

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEsc);
});

onUnmounted(() =>
{
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEsc);
});

watch(() => route.fullPath, updateActive);

function updateActive()
{
    activeIndex.value = route.name || 'home';
}

const handleSelect = (index) =>
{
    router.push({ name: index }).catch(() => { });
    showMobile.value = false;
};

const handleClickOutside = (e) =>
{
    const menu = document.querySelector('.mobile-menu');
    const button = document.querySelector('.mobile-toggle');

    if (!menu || !button) return;

    if (!menu.contains(e.target) && !button.contains(e.target))
    {
        showMobile.value = false;
    }
};

const handleEsc = (e) =>
{
    if (e.key === 'Escape')
    {
        showMobile.value = false;
    }
};

const menus = [
    { index: 'matches-index', label: 'Matches' },
    { index: 'tables-index', label: 'Table' },
    { index: 'statistics-index', label: 'Statistics' },
    { index: 'news-index', label: 'News' },
    { index: 'transfers-index', label: 'Transfers' },
    { index: 'players-index', label: 'Players' },
    { index: 'clubs-index', label: 'Clubs' },
    { index: 'video', label: 'Videos' },
];

const fantasyMenus = [
    { index: 'fantasyPremierLeague-index', label: 'Fantasy Premier League' },
    { index: 'fantasyDraft-index', label: 'Fantasy Draft' },
    { index: 'fantasyChallenge-index', label: 'Fantasy Challenge' },
];

const menuClass = (index) =>
{
    return [
        'cursor-pointer px-2 py-1 flex items-center',
        activeIndex.value === index ? 'is-active' : ''
    ];
};

const login = () =>
{
    googleSdkLoaded((google) =>
    {
        google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: async (response) =>
            {
                const res = await axios.post(
                    "https://localhost:44363/api/auth/signin-google",
                    { credential: response.credential }
                );
                if (res.status === 200)
                {
                    user.value = decodeCredential(response.credential);
                }
            }
        });
        google.accounts.id.prompt();
    });
};

const logoutGoogleAccount = () =>
{
    user.value = null;
};
</script>

<template>
    <nav class="bg-[#1e0021] fixed top-0 left-0 right-0 z-50 px-5 h-[70px] flex items-center justify-between">

        <div class="flex items-center gap-2">

            <div class="lg:hidden cursor-pointer mobile-toggle" @click="showMobile = !showMobile">
                <i class="fa-solid fa-bars text-white text-xl"></i>
            </div>

            <RouterLink :to="{ name: 'home' }" class="flex items-center cursor-pointer mr-3">
                <img src="/src/assets/pl-main-logo.png" class="h-12" />
                <div class="ml-2 text-white font-bold text-xl leading-none">
                    Premier<br />League
                </div>
            </RouterLink>

            <div class="hidden lg:flex items-center">

                <div v-for="item in menus" :key="item.index" @click="handleSelect(item.index)"
                    :class="menuClass(item.index)">
                    <span class="menu-title">{{ item.label }}</span>
                </div>

                <div class="relative group">
                    <div class="cursor-pointer px-2 py-1">
                        <span class="menu-title flex text-center items-center justify-center">Fantasy <el-icon
                                class="ml-1">
                                <ArrowDown class="text-white" />
                            </el-icon></span>
                    </div>

                    <div
                        class="absolute top-full left-0 mt-0 bg-[#37003c] rounded-2xl shadow-lg w-60 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none group-hover:pointer-events-auto">
                        <div v-for="sub in fantasyMenus" :key="sub.index" @click="handleSelect(sub.index)"
                            class="px-4 py-2 sub-menu-title text-white cursor-pointer">
                            {{ sub.label }}
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="flex items-center gap-2">
            <div class="hidden lg:block text-white">{{ userName }}</div>
            <div class="bg-[#28002b] w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                <img src="/src/assets/copilot-icon.png" alt="Copilot" class="w-5 h-5" />
            </div>

            <div class="bg-[#28002b] w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                <i class="fa-solid fa-magnifying-glass text-white"></i>
            </div>

            <div v-if="user">
                <button @click="logoutGoogleAccount">
                    <img :src="user.picture" class="w-8 h-8 rounded-full" />
                </button>
            </div>

            <button v-else @click="login"
                class="bg-gradient-to-r from-green-500 via-purple-500 to-pink-500 p-[2px] rounded-full">
                <div class="bg-[#1e0021] px-4 h-9 flex items-center rounded-full">
                    <span class="text-white text-[10px] sm:text-sm md:text-md lg:text-md xl:text-md">Sign in</span>
                </div>
            </button>

        </div>
    </nav>

    <div v-if="showMobile" class="fixed top-[70px] left-0 right-0 bg-[#1e0021] z-40 p-4 lg:hidden mobile-menu">

        <div v-for="item in menus" :key="item.index" @click="handleSelect(item.index)"
            class="text-white py-3 border-b border-white/10">
            {{ item.label }}
        </div>

        <div class="mt-3 text-white font-bold">Fantasy</div>

        <div v-for="sub in fantasyMenus" :key="sub.index" @click="handleSelect(sub.index)"
            class="text-gray-300 py-2 pl-3">
            {{ sub.label }}
        </div>

    </div>

    <main class="pt-[70px]">
        <ClubNews />
        <RouterView />
    </main>
</template>

<style scoped>
.menu-title {
    padding: 0 14px;
    font-size: 16px;
    color: white;
    font-weight: bold;
}

.is-active .menu-title {
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    height: 40px;
    display: flex;
    align-items: center;
}

.menu-title:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 20px;
    height: 40px;
    display: flex;
    align-items: center;
}

.sub-menu-title {
    margin: 5px 5px;
}

.sub-menu-title:hover {
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 13px;
    height: 40px;
    display: flex;
    align-items: center;
}
</style>