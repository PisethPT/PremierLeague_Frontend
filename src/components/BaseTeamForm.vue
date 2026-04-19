<script setup>
const props = defineProps({
    data: Array,
    isPrevious: Boolean
});

const getBadgeClass = (match) =>
{
    if (!props.isPrevious) return "bg-[#4b1254]";

    if (match.matchResult === 'W') return "bg-green-600";
    if (match.matchResult === 'L') return "bg-red-600";
    return "bg-[#4b1254]";
};
</script>

<template>
    <div class="flex justify-start items-center gap-2 w-full overflow-x-auto scrollbar-none">
        <div class="flex flex-row gap-4 p-2">
            <router-link :to="{
                name: 'matches-detail',
                params: {
                    matchId: match.matchId,
                    matchTitle: `${match.homeClubName.toLowerCase().replace(/\s+/g, '-')}-vs-${match.awayClubName.toLowerCase().replace(/\s+/g, '-')}`
                },
                query: { tab: 'recap' }
            }" v-for="match in data" :key="match.matchId"
                class="flex justify-center items-center flex-col rounded-sm w-25 gap-1 shrink-0 cursor-pointer">
                <span class="text-gray-300 font-medium text-[10px] text-center uppercase">
                    {{ match.matchweek }}
                </span>

                <img :src="match.otherClubCrest" class="h-10 w-10 object-contain" />

                <span class="text-gray-300 font-medium text-[10px] text-center">
                    {{ match.otherClubName }} ({{ match.isHomeClub }})
                </span>

                <span class="text-white font-medium text-xs text-center w-full py-0.5 rounded-br-lg rounded-bl-lg"
                    :class="getBadgeClass(match)">
                    {{ isPrevious ? `${match.homeClubGoal} - ${match.otherClubGoal}` : match.matchDate }}
                </span>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.scrollbar-none::-webkit-scrollbar {
    display: none !important;
}

.scrollbar-none {
    -ms-overflow-style: none !important;
    scrollbar-width: none !important;
}
</style>