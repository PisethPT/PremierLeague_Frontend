<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';
import axios from 'axios';
import { useRoute, useRouter, RouterView } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useUserStore } from '@/stores';
import { googleSdkLoaded, decodeCredential } from 'vue3-google-login';
import ClubNews from './ClubNews.vue';
import BaseAIAgentPanel from './BaseAIAgentPanel.vue';
import { ArrowDown } from '@element-plus/icons-vue';

import logo from '@/assets/pl-main-logo.png';
import copilot from '@/assets/copilot-icon.png';

import { useApi } from '@/stores/api';
import { useI18n } from 'vue-i18n';

const apiConfig = useApi();

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const router = useRouter();
const route = useRoute();

const user = ref(null);
const userName = ref('');
const authStore = useAuthStore();
const userStore = useUserStore();

const showMobile = ref(false);
const activeIndex = ref('');
const isPLSetting = ref(false);
const isAIPanelOpen = ref(false);

const info = ref([]);
const matches = ref([]);
const followingClubs = ref([]);
const followingPlayers = ref([]);

const { t, locale, availableLocales } = useI18n();

let isGoogleInitialized = false;

onMounted(() => {
    authStore.checkGoogleAuth();
    if (authStore.isAuthenticated) {
        const storedProfile = localStorage.getItem('userProfile');
        if (storedProfile) {
            const p = JSON.parse(storedProfile);
            user.value = { picture: p.photoUrl };
            userName.value = p.firstName;
        }
    }

    updateActive();

    googleSdkLoaded(async (google) => {
        if (!isGoogleInitialized) {
            google.accounts.id.initialize({
                client_id: CLIENT_ID,
                callback: handleGoogleResponse,
                auto_select: true,
            });

            isGoogleInitialized = true;
        }

        if (!authStore.isAuthenticated) {
            google.accounts.id.prompt();
        }

        try {
            const email = localStorage.getItem("userEmail");
            if (email) {
                await checkUserFavorite(email);
            }
        } catch (error) {
            console.error("API returned isSuccess: false", error);
        }
    });

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    console.log("user from localStorage on mount:", user.value);
});

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
    document.removeEventListener('keydown', handleEsc);
});

watch(() => route.fullPath, updateActive);

async function checkUserFavorite(email) {
    if (email) {
        const response = await userStore.checkUserFavorite(email);
        if (response) {
            const res = await userStore.getmyPLSettings(email);
            info.value = JSON.parse(JSON.stringify(res.info));
            matches.value = JSON.parse(JSON.stringify(res.matches));
            followingClubs.value = JSON.parse(JSON.stringify(res.followingClubs));
            followingPlayers.value = JSON.parse(JSON.stringify(res.followingPlayers));
        } else {
            if (route.name !== 'favorite-clubs') {
                router.push({ name: 'favorite-clubs' }).catch(() => { });
            }
        }
    }
}

function updateActive() {
    activeIndex.value = route.name || 'home';
}

const handleSelect = (index) => {
    router.push({ name: index }).catch(() => { });
    showMobile.value = false;
};

const handleGoogleResponse = async (response) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/signin-google`,
            { credential: response.credential }
        );
        if (res.data && res.data.isSuccess === true) {
            const data = res.data.contents;

            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            const decoded = decodeCredential(response.credential);

            const profile = {
                firstName: decoded.given_name,
                photoUrl: decoded.picture
            };
            localStorage.setItem('userProfile', JSON.stringify(profile));
            localStorage.setItem('userName', decoded.given_name);
            localStorage.setItem('userEmail', decoded.email);

            user.value = decoded;
            userName.value = decoded.given_name;

            authStore.checkGoogleAuth();

            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

            await checkUserFavorite(decoded.email);

            console.log("Success! Your account info is now in Local Storage.");
        } else {
            console.error("API returned isSuccess: false", res.data.message);
        }
    } catch (error) {
        console.error("Connection error to API:", error);
    }
};

const handleClickOutside = (e) => {
    const menu = document.querySelector('.mobile-menu');
    const button = document.querySelector('.mobile-toggle');

    if (!menu || !button) return;

    if (!menu.contains(e.target) && !button.contains(e.target)) {
        showMobile.value = false;
    }
};

const handleEsc = (e) => {
    if (e.key === 'Escape') {
        showMobile.value = false;
    }
};

const menus = computed(() => [
    { index: 'matches-index', label: t('homeMenu.matches') },
    { index: 'tables-index', label: t('homeMenu.table') },
    { index: 'statistics-index', label: t('homeMenu.statistics') },
    { index: 'news-index', label: t('homeMenu.news') },
    { index: 'transfers-index', label: t('homeMenu.transfers') },
    { index: 'players-index', label: t('homeMenu.players') },
    { index: 'clubs-index', label: t('homeMenu.clubs') },
    { index: 'video', label: t('homeMenu.videos') },
]);

const fantasyMenus = computed(() => [
    { index: 'fantasyPremierLeague-index', label: t('fantasySubMenu.fantasyPremierLeague') },
    { index: 'fantasyDraft-index', label: t('fantasySubMenu.fantasyDraft') },
    { index: 'fantasyChallenge-index', label: t('fantasySubMenu.fantasyChallenge') },
]);

const menuClass = (index) => {
    return [
        'cursor-pointer px-2 py-1 flex items-center',
        activeIndex.value === index ? 'is-active' : ''
    ];
};

const login = () => {
    googleSdkLoaded((google) => {
        google.accounts.id.cancel();
        google.accounts.id.prompt();
    });
};

const logoutGoogleAccount = () => {
    user.value = null;
    userName.value = '';

    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userProfile');
    localStorage.removeItem('userEmail');

    if (window.google && window.google.accounts) {
        window.google.accounts.id.disableAutoSelect();
    }

    window.location.reload();
};

const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
};

const handleImageError = (event) => {
    event.target.style.display = 'none';
};

function viewAllMatches() {
    isPLSetting.value = false;
    router.push({ name: 'matches-index' });
}
</script>

<template>
    <nav class="bg-[#1e0021] fixed top-0 left-0 right-0 z-50 px-5 h-[70px] flex items-center justify-between">

        <div class="flex items-center gap-2">

            <div class="lg:hidden cursor-pointer mobile-toggle" @click="showMobile = !showMobile">
                <i class="fa-solid fa-bars text-white text-xl"></i>
            </div>

            <RouterLink :to="{ name: 'home' }" class="flex items-center cursor-pointer mr-3">
                <img :src="logo" class="h-12" />
                <div class="ml-2 text-white font-bold text-xl leading-none"
                    :style="{ lineHeight: availableLocales.find((t) => t.indexOf('KH') !== -1) ? 'unset' : '' }">
                    {{ t('homeMenu.premier') }}<br />{{ t('homeMenu.league') }}
                </div>
            </RouterLink>

            <div class="hidden lg:flex items-center">

                <div v-for="item in menus" :key="item.index" @click="handleSelect(item.index)"
                    :class="menuClass(item.index)">
                    <span class="menu-title">{{ item.label }}</span>
                </div>

                <div class="relative group">
                    <div class="cursor-pointer px-2 py-1">
                        <span class="menu-title flex text-center items-center justify-center">{{ t('fantasyMenu')
                        }}<el-icon class="ml-1">
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
            <div class="locale-changer">
                <select class="bg-[#28002b] text-white cursor-pointer" v-model="locale">
                    <option v-for="lang in availableLocales" :key="`locale-${lang}`" :value="lang">
                        {{ lang }}
                    </option>
                </select>
            </div>
            <button @click="isAIPanelOpen = !isAIPanelOpen"
                class="bg-[#28002b] w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                <img :src="copilot" alt="Copilot" class="w-5 h-5" />
            </button>

            <div class="bg-[#28002b] w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                <i class="fa-solid fa-magnifying-glass text-white"></i>
            </div>

            <div v-if="user">
                <button @click="isPLSetting = true"
                    class="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                    <!-- <img :src="user.picture" class="w-10 h-10 rounded-full" /> -->
                    <div
                        class="bg-gradient-to-r from-green-500 via-purple-500 to-pink-500 p-[2px] rounded-full cursor-pointer">
                        <div class="bg-[#1e0021] w-9 h-9 flex justify-center items-center rounded-full">
                            <span class="text-white text-sm">{{ userName
                                ? getInitials(userName) : '' }}</span>
                        </div>
                    </div>
                </button>
            </div>

            <button v-else @click="login"
                class="bg-gradient-to-r from-green-500 via-purple-500 to-pink-500 p-[2px] rounded-full cursor-pointer">
                <div class="bg-[#1e0021] px-4 h-9 flex items-center rounded-full">
                    <span class="text-white text-[10px] sm:text-sm md:text-sm lg:text-sm xl:text-sm">Sign in</span>
                </div>
            </button>

        </div>
    </nav>

    <div v-if="showMobile" class="fixed top-[70px] left-0 right-0 bg-[#1e0021] z-40 p-4 lg:hidden mobile-menu">
        <div class="locale-changer">
            <select class="bg-[#28002b] text-white cursor-pointer" v-model="locale">
                <option v-for="lang in availableLocales" :key="`locale-${lang}`" :value="lang">
                    {{ lang }}
                </option>
            </select>
        </div>
        <div v-for="item in menus" :key="item.index" @click="handleSelect(item.index)"
            class="text-white py-3 border-b border-white/10">
            {{ item.label }}
        </div>

        <div class="mt-3 text-white font-bold">{{ t('fantasyMenu') }}</div>

        <div v-for="sub in fantasyMenus" :key="sub.index" @click="handleSelect(sub.index)"
            class="text-gray-300 py-2 pl-3">
            {{ sub.label }}
        </div>

    </div>

    <main class="pt-[70px]">
        <ClubNews />
        <RouterView />

        <!-- <button @click="isAIPanelOpen = !isAIPanelOpen"
            class="fixed bottom-6 right-6 z-40 bg-[#3d195d] hover:bg-[#4a0055] text-white py-4 px-3.5 rounded-full shadow-lg flex items-center justify-center transition-all group border border-white/10 cursor-pointer">
            <i class="fa-solid fa-robot text-lg group-hover:scale-110 transition-transform"></i>
        </button> -->

        <BaseAIAgentPanel :visible="isAIPanelOpen" @close="isAIPanelOpen = false" />

        <el-drawer v-model="isPLSetting" direction="rtl" size="450px" :with-header="false"
            class="custom-pl-drawer !bg-[#1a011d]">
            <div
                class="relative p-6 pt-10 rounded-b-[2rem] bg-gradient-to-br from-[#3d195d0c] via-[#1a011d] to-[#02afb89d]">
                <button @click="isPLSetting = false"
                    class="absolute top-4 right-4 text-white/70 hover:text-white cursor-pointer">
                    <i class="fa-solid fa-xmark"></i>
                </button>

                <h2 class="text-white text-4xl font-bold mb-2">{{ info[0].hello }}</h2>
                <div v-for="(v, i) in info" :key="i" class="flex items-center gap-2 mb-2">
                    <img :src="apiConfig.CLUB_DIR + v.clubCrest" class="w-5 h-5" alt="" />
                    <span class="text-white text-sm">{{ v.favoriteClub }}</span>
                </div>

                <button
                    class="w-full py-3 px-4 rounded-full bg-white/5 hover:bg-white/10 text-white flex items-center justify-center gap-2 mt-4 transition-all cursor-pointer">
                    <i class="fa-solid fa-gear"></i>
                    <span class="text-sm font-semibold">myPL Settings</span>
                </button>
            </div>

            <div class="p-4 flex flex-col gap-4 overflow-y-auto">
                <div v-if="matches.length > 0" class="bg-[#2b0030] rounded-2xl p-5">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-white font-bold text-lg">Matches</h3>
                        <button @click="viewAllMatches"
                            class="bg-[#4a0055] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer">
                            View all <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                    <div v-for="match in matches" ::key="match.matchId" class="flex flex-col gap-0 mb-2">
                        <div class="grid grid-cols-[1fr_80px_1fr] py-2">
                            <div class="flex justify-end items-center gap-1">
                                <span class="text-white font-bold text-sm">{{ match.homeClubName }}</span>
                                <div class="w-7 h-7 flex items-center justify-center overflow-hidden">
                                    <img :src="apiConfig.CLUB_DIR + match.homeClubCrest" @error="handleImageError"
                                        class="w-full h-full object-contain p-0.5">
                                </div>
                            </div>

                            <div class="text-center">
                                <span v-if="match.isGameFinished === 'Ongoing'"
                                    class="text-white text-center font-bold text-md">
                                    {{ match.kickoffTime }}
                                </span>

                                <div v-else-if="match.isGameFinished === 'Finished'"
                                    class="flex flex-col items-center justify-start gap-2">
                                    <span
                                        class="bg-[#1e0021] text-white text-md font-bold px-2 py-[2px] rounded-md text-center">
                                        {{ match.homeClubGoal }} : {{ match.awayClubGoal }}
                                    </span>
                                </div>
                                <div class="text-white/60 text-[10px] tracking-wider">{{ match.matchDate }}</div>
                            </div>

                            <div class="flex justify-start items-center gap-1">
                                <div class="w-7 h-7 flex items-center justify-center overflow-hidden">
                                    <img :src="apiConfig.CLUB_DIR + match.awayClubCrest" @error="handleImageError"
                                        class="w-full h-full object-contain p-0.5">
                                </div>
                                <span class="text-white font-bold text-sm">{{ match.awayClubName }}</span>
                            </div>
                        </div>

                        <div v-if="match.isGameFinished === 'Ongoing'" class="flex justify-center">
                            <div class="bg-white px-4 py-1 rounded-md text-black font-black text-xs">MAX</div>
                        </div>
                    </div>
                </div>

                <div class="bg-[#2b0030] rounded-2xl p-5">
                    <div class="flex justify-between items-center mb-4">
                        <h3 class="text-white font-bold text-lg">Following</h3>
                        <button
                            class="bg-[#4a0055] text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 cursor-pointer">
                            Manage <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                    <div class="flex flex-col gap-4">
                        <div v-for="(club, i) in followingClubs" :key="i"
                            class="flex items-center gap-3 cursor-pointer group">
                            <div class="w-12 h-12 rounded-[14px] flex items-center justify-center"
                                :style="{ backgroundColor: club.clubTheme }">
                                <img :src="apiConfig.CLUB_DIR + club.clubCrest"
                                    class="w-auto h-11 p-1 object-contain mx-auto" />
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-bold">{{ club.clubName }}</div>
                                <div class="text-white/50 text-xs flex items-center gap-1">
                                    <i class="fa-solid fa-star text-white text-[9px]"></i> Favourite Club
                                </div>
                            </div>
                            <i class="fa-solid fa-chevron-right text-white"></i>
                        </div>

                        <div v-for="(player, i) in followingPlayers" :key="i"
                            class="flex items-center gap-3 cursor-pointer group">
                            <div class="w-12 h-12 rounded-[14px] overflow-hidden pt-1.5"
                                :style="{ backgroundColor: player.clubTheme }">
                                <img :src="apiConfig.PLAYER_DIR + player.photo"
                                    class="w-auto h-13 object-contain mx-auto" />
                            </div>
                            <div class="flex-1">
                                <div class="text-white font-bold">{{ player.playerName }}</div>
                                <div class="text-white/50 text-xs flex items-center gap-1">
                                    <img :src="apiConfig.CLUB_DIR + player.clubCrest" class="w-3 h-3" /> {{
                                        player.clubName }}
                                </div>
                            </div>
                            <i class="fa-solid fa-chevron-right text-white"></i>
                        </div>
                    </div>
                </div>

            </div>
        </el-drawer>
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

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
}

.avatar {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-profile {
    display: flex;
    align-items: center;
}

.btn-logout {
    margin-left: 15px;
    background: #3d195d;
    color: white;
    border: none;
    padding: 5px 10px;
    cursor: pointer;
    border-radius: 4px;
}

.initials-avatar {
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 14px;
    border-radius: 50%;
    background-color: transparent;
    position: relative;
    border: 2px solid transparent;
    /* background-image: linear-gradient(#1e0021, #1e0021),
        linear-gradient(to right, #00ffcc, #ff0066, #ffcc00); */
    background-origin: border-box;
    background-clip: content-box, border-box;
}

.custom-pl-drawer {
    background-color: #1a011d !important;
}

.custom-pl-drawer .el-drawer__body {
    padding: 0 !important;
    background-color: #1a011d;
    display: flex;
    flex-direction: column;
}

.custom-pl-drawer .el-drawer__body::-webkit-scrollbar {
    width: 6px;
}

.custom-pl-drawer .el-drawer__body::-webkit-scrollbar-thumb {
    background: #4a0055;
    border-radius: 10px;
}
</style>