<script setup>
import { defineProps } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';
import { RouterLink } from 'vue-router';
import 
{
    ArrowRightBold,
    Edit,
    Plus,
} from '@element-plus/icons-vue'

const props = defineProps({
    club: {
        type: Object,
        required: true,
        default: () => ({
            id: 0,
            name: '',
            clubCrest: '',
            city: '',
            founded: 0,
            homeStadium: '',
            headCoach: '',
            teamThemeColor: '',
            websiteUrl: '',
        })
    }
});
const apiConfigStore = useApiConfig();
const TEAM_LOGOS_DIR = apiConfigStore.TEAM_LOGOS_DIR;
</script>

<template>
    <el-card
        class="!bg-gradient-to-br from-[#28002b] to-[#330d36] !border-0 !rounded-2xl w-[90vw] sm:w-[45vw]  md:w-[45vw] lg:w-[30vw] xl:w-[24vw]">
        <div class="flex items-center gap-4">
            <div class="flex justify-center items-center rounded-[14px] mt-2 px-1 w-14 h-12"
                :style="{ backgroundColor: club.teamThemeColor }">
                <img :src="TEAM_LOGOS_DIR + club.clubCrest" alt="Club Crest"
                    class="w-auto h-10 object-contain mx-auto" />
            </div>
            <div class="flex justify-between items-center w-full">
                <RouterLink
                    :to="{ name: 'clubs-overview', params: { clubId: club.id, clubName: club.name.toString().toLowerCase() } }">
                    <h3 class="text-lg font-bold text-center text-white text-wrap hover:underline">{{ club.name }}</h3>
                </RouterLink>
                <RouterLink
                    :to="{ name: 'clubs-overview', params: { clubId: club.id, clubName: club.name.toString().toLowerCase() } }">
                    <el-icon>
                        <ArrowRightBold class="text-white text-xs hover:cursor-pointer" />
                    </el-icon>
                </RouterLink>
            </div>
        </div>

        <div class="flex justify-between gap-3 mt-4 ">
            <a href="#"
                class="!bg-[#4b1254] text-white rounded-3xl text-xs py-2 px-6 hover:!bg-[#1e0021b9] w-full text-center hover:cursor-pointer">
                Follow
            </a>
            <a v-if="club.websiteUrl !== ''" :href="club.websiteUrl" target="_blank"
                class="!bg-[#4b1254] text-white rounded-3xl text-xs py-2 px-6 hover:!bg-[#1e0021b9] w-full text-center hover:cursor-pointer">
                Visit website
                <el-icon>
                    <Edit />
                </el-icon>
            </a>
        </div>
    </el-card>


</template>
