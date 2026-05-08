<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores';

const router = useRouter();
const userStore = useUserStore();
const userName = ref('');
const userEmail = ref('');
const isShowPreviousPLClubs = ref(false);

const followedClubIds = ref([]);

const isFollowing = (clubId) => followedClubIds.value.includes(clubId);

const toggleFollow = (club) =>
{
    const id = club.clubId || club.id;
    const index = followedClubIds.value.indexOf(id);
    if (index > -1)
    {
        followedClubIds.value.splice(index, 1);
    } else
    {
        followedClubIds.value.push(id);
    }
};

const selectedClubs = computed(() =>
{
    if (!userStore.clubs) return [];
    const allClubs = userStore.clubs.flatMap(category => category.clubs);
    return allClubs.filter(club => followedClubIds.value.includes(club.clubId || club.id));
});

onMounted(async () =>
{
    userName.value = localStorage.getItem("userName") ?? '';
    userEmail.value = localStorage.getItem("userEmail") ?? '';
    try
    {
        if (userEmail)
        {
            await userStore.getFavoriteClubs(userEmail.value);

            if (userStore.clubs)
            {
                const initialFollowed = userStore.clubs
                    .flatMap(category => category.clubs)
                    .filter(club => club.followStatus === true)
                    .map(club => club.clubId || club.id);

                followedClubIds.value = initialFollowed;
            }
        }

    } catch (error)
    {
        console.error("Failed to load clubs:", error);
    }
});

const saveSelectedFavClub = async () =>
{
    try
    {
        const idsOnly = selectedClubs.value.map(c => c.clubId);
        console.log(idsOnly);
        // const response = await userStore.saveFavoriteSelectedClubs({
        //     "email": userEmail.value,
        //     "jsonData": idsOnly
        // });
        // console.log(JSON.stringify(response));
        // if (response.statusCode !== 200) return;
        router.push({ name: 'favorite-players' }).catch(() => { });
    } catch (error)
    {
        console.error("Failed to save selected clubs:", error);
    }
}

const getInitials = (name) =>
{
    if (!name) return "";
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
        <img src="/src/assets/pl-main-logo.png" class="h-14" />
        <div class="ml-2 text-white font-bold text-xl leading-none">
            Premier<br />League
        </div>
    </router-link>

    <div class="flex justify-center h-[calc(100vh-80px)] overflow-hidden">
        <div class="flex flex-col gap-2 w-full max-w-xl px-4">

            <div class="flex justify-between items-center my-4">
                <div class="w-10 h-10 flex justify-center items-center rounded-full cursor-pointer">
                    <div class="bg-gradient-to-r from-green-500 via-purple-500 to-pink-500 p-[2px] rounded-full">
                        <div class="bg-[#1e0021] w-9 h-9 flex justify-center items-center rounded-full">
                            <span class="text-white text-sm">{{ userName ? getInitials(userName) : 'PL' }}</span>
                        </div>
                    </div>
                </div>

                <div class="flex gap-1">
                    <div v-for="club in selectedClubs.slice(0, 3)" :key="club.clubId"
                        class="flex justify-center items-center rounded-[10px] w-8 h-8 shrink-0"
                        :style="{ backgroundColor: club.clubTheme }">
                        <img :src="club.clubCrest" class="w-auto h-8 p-1 object-contain mx-auto" />
                    </div>
                    <div v-if="selectedClubs.length > 3" class="text-white text-[10px] self-center ml-1">
                        +{{ selectedClubs.length - 3 }}
                    </div>
                </div>
            </div>

            <h2 class="text-white text-3xl font-bold">My Clubs</h2>
            <span class="text-white/50 text-sm">
                Which Clubs do you like? You can change and update them at any time.
            </span>

            <div class="flex-1 overflow-y-auto my-6 pr-2 custom-scrollbar">
                <div v-for="category in userStore.clubs" :key="category.myClubLabel">

                    <div v-if="category.myClubLabel !== 'PL Clubs'" class="flex justify-between items-center my-6">
                        <span class="text-white text-xl font-bold">{{ category.myClubLabel }}</span>

                        <button @click="isShowPreviousPLClubs = !isShowPreviousPLClubs"
                            class="bg-[#37003c] hover:bg-[#4a0052] transition-transform flex items-center justify-center rounded-full w-8 h-8 cursor-pointer"
                            :class="{ 'transform -rotate-180': isShowPreviousPLClubs }">
                            <i class="text-white fa-solid fa-angle-down"></i>
                        </button>
                    </div>

                    <div v-show="category.myClubLabel === 'PL Clubs' || isShowPreviousPLClubs">
                        <div v-for="club in category.clubs" :key="club.clubId"
                            class="flex justify-between items-center mt-4 w-full">
                            <div class="flex items-center gap-3">
                                <div class="flex justify-center items-center rounded-[14px] w-12 h-12 shrink-0"
                                    :style="{ backgroundColor: club.clubTheme }">
                                    <img :src="club.clubCrest" alt="Club Crest"
                                        class="w-auto h-11 p-1 object-contain mx-auto" />
                                </div>
                                <h3 class="text-md font-bold text-white tracking-tight">
                                    {{ club.clubName }}
                                </h3>
                            </div>

                            <button @click="toggleFollow(club)"
                                class="text-xs w-fit rounded-3xl px-4 py-2.5 transition-colors border-white border-1 cursor-pointer text-center"
                                :class="isFollowing(club.clubId || club.id) ? 'bg-transparent text-white' : 'bg-white text-[#1e0021] hover:bg-gray-200'">
                                {{ isFollowing(club.clubId || club.id) ? 'Following' : 'Follow' }}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="pb-6">
                <button @click="saveSelectedFavClub"
                    class=" w-full py-2.5 px-6 rounded-3xl text-sm text-center transition-all" :class="[
                        selectedClubs.length > 0
                            ? 'bg-white text-[#1e0021] cursor-pointer hover:bg-gray-200'
                            : 'bg-[#27012b] text-white/30 cursor-not-allowed'
                    ]" :disabled="selectedClubs.length == 0">
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

.rotate-180 {
    transform: rotate(180deg);
}
</style>