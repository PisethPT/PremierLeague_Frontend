<script setup>
import { defineProps } from 'vue';
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
            clubId: 0,
            clubName: '',
            clubCrest: '',
            clubTheme: '',
            clubStadium: '',
            clubOfficialWebsite: '',
        })
    }
});
</script>

<template>
    <el-card
        class="!bg-gradient-to-br from-[#28002b] to-[#330d36] !border-0 !rounded-2xl w-[90vw] sm:w-[45vw]  md:w-[45vw] lg:w-[30vw] xl:w-[24vw]">
        <div class="flex items-center gap-4">
            <div class="flex justify-center items-center rounded-[14px] mt-2 px-1 w-14 h-12"
                :style="{ backgroundColor: club.clubTheme }">
                <img :src="club.clubCrest" alt="Club Crest"
                    class="w-auto h-10 object-contain mx-auto" />
            </div>
            <div class="flex justify-between items-center w-full">
                <RouterLink
                    :to="{ name: 'clubs-overview', params: { clubId: club.clubId, clubName: club.clubName.toString().toLowerCase().replace(/\s+/g, '-') } }">
                    <h3 class="text-lg font-bold text-center text-white text-wrap hover:underline">{{ club.clubName }}</h3>
                </RouterLink>
                <RouterLink
                    :to="{ name: 'clubs-overview', params: { clubId: club.clubId, clubName: club.clubName.toString().toLowerCase().replace(/\s+/g, '-') } }">
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
            <a v-if="club.clubOfficialWebsite !== ''" :href="club.clubOfficialWebsite" target="_blank"
                class="!bg-[#4b1254] text-white rounded-3xl text-xs py-2 px-6 hover:!bg-[#1e0021b9] w-full text-center hover:cursor-pointer">
                Visit website
                <el-icon>
                    <Edit />
                </el-icon>
            </a>
        </div>
    </el-card>


</template>
