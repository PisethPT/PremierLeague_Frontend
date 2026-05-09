<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useUserStore } from '@/stores';
import { Search } from '@element-plus/icons-vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();

import logo from '@/assets/pl-main-logo.png';
const userStore = useUserStore();
const userName = ref('');
const userEmail = ref('');
const playerName = ref('');
const followedPlayerIds = ref([]);

const isFollowing = (playerId) => followedPlayerIds.value.includes(playerId);

const toggleFollow = (player) =>
{
    const id = player.playerId;
    const index = followedPlayerIds.value.indexOf(id);
    if (index > -1)
    {
        followedPlayerIds.value.splice(index, 1);
    } else
    {
        followedPlayerIds.value.push(id);
    }
};

const selectedPlayer = computed(() =>
{
    if (!userStore.players) return [];
    return userStore.players.filter(player => followedPlayerIds.value.includes(player.playerId));
});

const loadData = async (query = '') =>
{
    try
    {
        if (query == '')
            await userStore.getFavoritePlayers();
        else
            await userStore.getFavoritePlayers({ "playerName": query });
        if (userStore.players && followedPlayerIds.value.length === 0 && !query)
        {
            followedPlayerIds.value = userStore.players
                .filter(p => p.followStatus === true)
                .map(p => p.playerId);
        }
    } catch (error)
    {
        console.error("Failed to load players:", error);
    }
};

watch(playerName, (newVal) =>
{
    loadData(newVal);
});

onMounted(async () =>
{
    userName.value = localStorage.getItem("userName") ?? '';
    userEmail.value = localStorage.getItem("userEmail") ?? '';

    if (userEmail)
    {
        await userStore.getFavoriteSelectedClubs(userEmail.value);
        console.log(userStore.selectedClubs);
        await loadData();
    }
});

const saveSelectedFavPlayer = async () =>
{
    try
    {
        const idsOnly = selectedPlayer.value.map(c => c.playerId);
        console.log(idsOnly);
        // const response = await userStore.saveFavoriteSelectedPlayer({
        //     "email": userEmail.value,
        //     "jsonData": idsOnly
        // });
        // console.log(JSON.stringify(response));
        // if (response.statusCode !== 200) return;
        router.push({ name: 'home' }).catch(() => { });
    } catch (error)
    {
        console.error("Failed to save selected player:", error);
    }
}

const getInitials = (name) =>
{
    if (!name) return "PL";
    const parts = name.trim().split(' ');
    if (parts.length >= 2)
    {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return parts[0].substring(0, 2).toUpperCase();
};
</script>

<template>
    <router-link :to="{ name: 'home' }" class="flex items-center cursor-pointer mx-4 mt-4">
        <img :src="logo" class="h-14" />
        <div class="ml-2 text-white font-bold text-xl leading-none">
            Premier<br />League
        </div>
    </router-link>

    <div class="flex justify-center h-[calc(100vh-80px)] overflow-hidden">
        <div class="flex flex-col gap-2 w-full max-w-xl px-4">

            <div class="flex justify-between items-center my-4">
                <div class="flex items-center gap-3">
                    <router-link :to="{ name: 'favorite-clubs' }"
                        class="bg-[#37003c] hover:bg-[#4a0052] transition-transform flex items-center justify-center rounded-full w-8 h-8 cursor-pointer">
                        <i class="text-white fa-solid fa-arrow-left"></i>
                    </router-link>
                    <div class="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                        <div class="bg-gradient-to-r from-green-500 via-purple-500 to-pink-500 p-[2px] rounded-full">
                            <div class="bg-[#1e0021] w-9 h-9 flex justify-center items-center rounded-full">
                                <span class="text-white text-sm">{{ userName ? getInitials(userName) : 'PL' }}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex gap-1">
                    <div v-for="club in userStore.selectedClubs" :key="club.clubId"
                        class="flex justify-center items-center rounded-[10px] w-8 h-8 shrink-0"
                        :style="{ backgroundColor: club.clubTheme }">
                        <img :src="apiConfig.CLUB_DIR + club.clubCrest" class="w-auto h-8 p-1 object-contain mx-auto" />
                    </div>
                    <div v-if="userStore.selectedClubs > 3" class="text-white text-[10px] self-center ml-1">
                        +{{ userStore.selectedClubs - 3 }}
                    </div>

                    <div v-for="player in selectedPlayer.slice(0, 3)" :key="player.playerId"
                        class="flex justify-center items-center rounded-[10px] w-8 h-8 pt-1.5 shrink-0 overflow-hidden"
                        :style="{ backgroundColor: player.clubTheme }">
                        <img :src="player.photo" class="w-auto h-9 object-contain mx-auto" />
                    </div>
                    <div v-if="selectedPlayer.length > 3" class="text-white text-[10px] self-center ml-1">
                        +{{ selectedPlayer.length - 3 }}
                    </div>
                </div>
            </div>

            <h2 class="text-white text-3xl font-bold">My Players</h2>
            <span class="text-white/50 text-sm">
                Pick your current favorites. Change and update whenever you want.
            </span>

            <el-input v-model="playerName" placeholder="Search" class="search-input w-full my-2" size="large"
                :prefix-icon="Search" :clearable="true" />

            <div class="flex-1 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                <div v-for="player in userStore.players" :key="player.playerId"
                    class="flex justify-between items-center mt-4 w-full">
                    <div class="flex justify-start items-center gap-2">
                        <div class="flex justify-center items-center rounded-[14px] w-12 h-12 pt-1.5 shrink-0 overflow-hidden"
                            :style="{ backgroundColor: player.clubTheme }">
                            <img :src="apiConfig.PLAYER_DIR + player.photo"
                                class="w-auto h-13 object-contain mx-auto" />
                        </div>
                        <div class="flex flex-col justify-center items-start gap-1">
                            <h3 class="text-md font-bold text-white tracking-tight">
                                {{ player.playerName }}
                            </h3>
                            <div class="flex justify-start items-start gap-1">
                                <img :src="apiConfig.PLAYER_DIR + player.clubCrest"
                                    class="w-auto h-4 object-contain mx-auto" />
                                <h3 class="text-xs text-white/50 tracking-tight">
                                    {{ player.clubName }}
                                </h3>
                            </div>
                        </div>
                    </div>

                    <button @click="toggleFollow(player)"
                        class="text-xs w-fit rounded-3xl px-4 py-2.5 transition-colors border-white border-1 cursor-pointer text-center"
                        :class="isFollowing(player.playerId) ? 'bg-transparent text-white' : 'bg-white text-[#1e0021] hover:bg-gray-200'">
                        {{ isFollowing(player.playerId) ? 'Following' : 'Follow' }}
                    </button>
                </div>
            </div>

            <div class="pb-6">
                <button @click="saveSelectedFavPlayer"
                    class="block w-full py-2.5 px-6 rounded-3xl text-sm text-center transition-all" :class="[
                        selectedPlayer.length > 0
                            ? 'bg-white text-[#1e0021] cursor-pointer hover:bg-gray-200'
                            : 'bg-[#27012b] text-white/30 cursor-not-allowed'
                    ]" :disabled="selectedPlayer.length == 0">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
    width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
}

.search-input :deep(.el-input__wrapper) {
    background-color: transparent !important;
    border: 2px solid #624d64 !important;
    border-radius: 10px !important;
    box-shadow: none !important;
    font-size: 16px;
}

.search-input :deep(.el-input__inner) {
    color: white !important;
}

.search-input :deep(.el-input__prefix) {
    color: white !important;
}
</style>