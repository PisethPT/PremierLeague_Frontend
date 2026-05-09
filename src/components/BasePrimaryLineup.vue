<script setup>
import { computed } from 'vue';
import BasePrimaryFormationPlayer from './BasePrimaryFormationPlayer.vue';
const props = defineProps({
  formations: { type: Array, required: true },
  formationId: { type: Number, required: true },
  players: { type: Array, required: true },
  layoutMode: { type: String, default: 'default' }
});

// Helper to parse strings like "4-3-3" into [1, 4, 3, 3]
const getFormationSchema = (formationString) =>
{
  if (!formationString) return [1, 4, 4, 2];
  const parts = formationString.split('-').map(Number);
  return [1, ...parts]; // GK always first
};

const activeSchema = computed(() =>
{
  const found = props.formations.find(f => f.formationId === props.formationId);
  return getFormationSchema(found ? found.formation : '');
});

const sortedStartingXI = computed(() =>
{
  return [...props.players]
    .filter(p => p.isStarting === true)
    .sort((a, b) => a.formationSlot - b.formationSlot);
});

const formationGroups = computed(() =>
{
  const groups = [];
  let playerIndex = 0;
  const schema = activeSchema.value;

  schema.forEach(count =>
  {
    groups.push(sortedStartingXI.value.slice(playerIndex, playerIndex + count));
    playerIndex += count;
  });

  return groups;
});
</script>

<template>
  <div class="w-full h-full">

    <div v-if="layoutMode === 'default'" class="flex flex-col justify-around items-center w-full h-full py-2">

      <div v-if="sortedStartingXI.length === 0" class="flex justify-center items-center h-full">
        <span class="text-white text-center opacity-30">No players found</span>
      </div>

      <div v-for="(rowPlayers, rowIndex) in formationGroups" :key="'row-' + rowIndex"
        class="flex justify-around items-center w-full">
        <div v-for="player in rowPlayers" :key="player.playerId">
          <BasePrimaryFormationPlayer :player="player" />
        </div>
      </div>
    </div>

    <div v-else class="flex h-full w-full py-2"
      :class="[$attrs.class?.includes('away-side-layout') ? 'flex-row-reverse' : 'flex-row']">

      <div v-if="sortedStartingXI.length === 0" class="flex justify-center items-center w-full">
        <span class="text-white opacity-30">No players found</span>
      </div>

      <div v-for="(colPlayers, colIndex) in formationGroups" :key="'col-' + colIndex"
        class="flex flex-col justify-around items-center h-full flex-1">
        <div v-for="player in colPlayers" :key="player.playerId">
          <BasePrimaryFormationPlayer :player="player" />
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.flex-1 {
  min-width: 0;
}

.flex-row-reverse :deep(.flex-col) {
  direction: ltr;
}
</style>