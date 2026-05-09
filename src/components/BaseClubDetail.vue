<script setup>
import { defineProps } from 'vue';
import { Edit } from '@element-plus/icons-vue';
import { useApi } from '@/stores/api';

const apiConfig = useApi();

const props = defineProps({
    club: {
        type: Object,
        required: true,
        default: () => ({
            clubId: '',
            clubName: '',
            clubCrest: '',
            clubTheme: '',
            est: 0,
            clubStadium: '',
            officialClubSite: '',

        })
    },
    socialMedias: {
        type: Array,
        required: false,
        default: () => ([
            {
                name: '',
                fontAwesome: '',
                socialMediaUrl: '',
            },
        ])
    }
});
</script>

<template>
    <div class="rounded-2xl h-[200px] w-full flex justify-between p-5 relative"
        :style="{ backgroundColor: club.clubTheme }">
        <div class="flex justify-start flex-col items-start gap-1">
            <div class="w-auto">
                <img :src="apiConfig.CLUB_DIR + club.clubCrest" class="!w-auto !h-14 mx-auto" />
            </div>
            <div class="text-start">
                <h1 class="md:text-4xl text-2xl font-bold"
                    :style="{ color: club.clubTheme == '#ffffff' ? '#000' : '#ffffff' }">{{ club.clubName }}</h1>
                <a :href="club.officialClubSite" target="_blank" :underline="false" class="!text-sm hover:underline"
                    :style="{ color: club.clubTheme == '#ffffff' ? '#000' : '#ffffff' }">
                    Official club site
                    <el-icon :size="20" class="ml-1">
                        <Edit />
                    </el-icon>
                </a>
                <div class="mt-2 flex items-center gap-2">
                    <a v-for="social in socialMedias" :key="social.name" :href="social.socialMediaUrl" target="_blank"
                        :underline="false" class="flex justify-center items-center rounded-full bg-[#3d3c3c3f] w-9 h-9">
                        <i class="hover:text-white"
                            :class="[social.fontAwesome, club.clubTheme == '#ffffff' ? 'text-[#000]' : 'text-[#ffffff]']"></i>
                    </a>

                </div>
            </div>
        </div>
        <div class="absolute right-0 me-5">
            <a :underline="false" :href="club.officialClubSite" target="_blank"
                class="text-xs bg-[#3d3c3c3f] rounded-3xl !py-2 !px-3 w-full text-center hover:cursor-pointer"
                :style="{ color: club.clubTheme == '#ffffff' ? '#000' : '#ffffff' }">
                Follow
            </a>
        </div>


    </div>
</template>