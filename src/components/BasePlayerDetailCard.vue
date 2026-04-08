<script setup>
import { ref, defineProps } from 'vue';
import { useApiConfig } from '@/stores/apiConfig';

const apiConfig = useApiConfig();
const props = defineProps({
    player: {
        type: Object,
        required: true,
    },
    club: {
        type: Object,
        required: true,
    }
})

</script>

<template>
    <div class="rounded-2xl h-[180px] w-full flex justify-between overflow-hidden relative"
        :style="{ backgroundColor: club?.teamThemeColor ? club.teamThemeColor : '#37003c' }">
        <div class="flex justify-start items-start gap-4">
            <div class="w-fit">
                <img :src="player?.photo ? apiConfig.PLAYER_LOGOS_DIR + player.photo : ''" alt="Club Crest"
                    class="w-auto h-42 mx-auto mt-4 ms-3" />
            </div>

            <div class="flex justify-end flex-col h-full text-start pb-4">
                <h3 class="md:text-2xl text-md"
                    :style="{ color: club?.teamThemeColor == '#ffffff' ? '#000' : '#ffffff' }">
                    {{
                        player?.firstName }}</h3>
                <h1 class="md:text-4xl text-2xl font-bold"
                    :style="{ color: club?.teamThemeColor == '#ffffff' ? '#000' : '#ffffff' }">{{
                        player?.lastName }}
                </h1>
                <div class="mt-2 flex items-center gap-2 flex-wrap">
                    <div class="flex items-center gap-1">
                        <div class="min-w-5 min-h-5 overflow-hidden">
                            <img :src="apiConfig.TEAM_LOGOS_DIR + club?.clubCrest" alt="Club Crest"
                                class="w-auto h-5 object-contain mx-auto pt-1" />
                        </div>
                        <span class="md:text-sm text-xs"
                            :style="{ color: club?.teamThemeColor == '#ffffff' ? '#000' : '#ffffff' }">{{ club?.name
                            }}</span>
                    </div>
                    <span class="tmd:text-sm text-xs"
                        :style="{ color: club?.teamThemeColor == '#ffffff' ? '#000' : '#ffffff' }"><b>• {{
                            player?.playerNumber }}</b> {{ player?.position }}</span>
                </div>
            </div>

        </div>
        <div class="absolute right-0 m-5">
            <el-link :underline="false" :href="club?.websiteUrl" target="_blank"
                class="text-xs bg-[#3d3c3c3f] rounded-3xl !py-2 !px-3 w-full text-center hover:cursor-pointer"
                :style="{ color: club?.teamThemeColor == '#ffffff' ? '#000' : '#ffffff' }">
                Follow
            </el-link>
        </div>
    </div>
</template>