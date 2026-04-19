<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useClubStore } from '@/stores';
import nationalityData from '@/assets/nationality.json';
import BasePlayerPositionCard from '../../components/BasePlayerPositionCard.vue';
import
{
    ArrowDown,
} from '@element-plus/icons-vue';

const route = useRoute();
const clubId = ref(route.params.clubId);
const clubStore = useClubStore();
const squadData = ref([]);

onMounted(async () =>
{
    try
    {
        const response = await clubStore.getClubSquad({ clubId: clubId.value });
        squadData.value = JSON.parse(JSON.stringify(response));
    } catch (error)
    {
        console.error('Error fetching ', error);
    }
});

</script>

<template>
    <button
        class="bg-transparent text-center text-sm text-white px-3 py-2 rounded-md border-2 border-[#3e003f] w-fit cursor-pointer">2025/26
        <el-icon>
            <ArrowDown />
        </el-icon>
    </button>
    <div class="columns-1 md:columns-2 gap-4 mt-4">
        <BasePlayerPositionCard v-if="squadData.length > 0" v-for="(group, index) in squadData" :key="index"
            :position-label="group.positionLabel" :players="group.players" :nationality-data="nationalityData"
            class="mb-4 break-inside-avoid" />
    </div>
</template>