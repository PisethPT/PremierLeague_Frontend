<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    player: {
        type: Object,
        required: true,
    }
})

</script>

<template>
    <div class="rounded-2xl h-[180px] w-full flex justify-between overflow-hidden relative"
        :style="{ backgroundColor: player?.clubTheme }">
        <div class="flex justify-start items-start gap-4">
            <div class="w-fit">
                <img :src="player?.photo" class="w-auto h-42 mx-auto mt-4 ms-3" />
            </div>

            <div class="flex justify-end flex-col h-full text-start pb-4">
                <h3 class="md:text-2xl text-md" :style="{ color: player?.clubTheme == '#ffffff' ? '#000' : '#ffffff' }">
                    {{ player?.firstName }}</h3>
                <h1 class="md:text-4xl text-2xl font-bold"
                    :style="{ color: player?.clubTheme == '#ffffff' ? '#000' : '#ffffff' }">{{ player?.lastName }}
                </h1>
                <div class="mt-2 flex items-center gap-2 flex-wrap">
                    <div class="flex items-center gap-1">
                        <div class="min-w-5 min-h-5 overflow-hidden">
                            <img :src="player?.clubCrest" class="w-auto h-5 object-contain mx-auto pt-1" />
                        </div>
                        <router-link class="md:text-sm text-xs hover:underline"
                            :style="{ color: player?.clubTheme == '#ffffff' ? '#000' : '#ffffff' }"
                            :to="{ name: 'clubs-overview', params: { clubId: player?.clubId ?? 1, clubName: player?.clubName.toLowerCase().replace(/\s+/g, '-') ?? 'arsenal' } }">
                            {{ player?.clubShortName }}
                        </router-link>
                    </div>
                    <span class="tmd:text-sm text-xs"
                        :style="{ color: player?.clubTheme == '#ffffff' ? '#000' : '#ffffff' }"><b>• {{
                            player?.playerNumber }}</b> {{ player?.position }}</span>
                </div>
            </div>

        </div>
        <div class="absolute right-0 m-5">
            <div class="text-xs bg-[#3d3c3c3f] rounded-3xl !py-2 !px-3 w-full text-center hover:cursor-pointer"
                :style="{ color: player?.clubTheme == '#ffffff' ? '#000' : '#ffffff' }">
                Follow
            </div>
        </div>
    </div>
</template>