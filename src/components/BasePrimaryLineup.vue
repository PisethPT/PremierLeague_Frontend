<script setup>
import { computed } from 'vue';
import BasePrimaryFormationPlayer from './BasePrimaryFormationPlayer.vue';

const props = defineProps({
  formations: { type: Array, required: true },
  formationId: { type: Number, required: true },
  players: { type: Array, required: true }
});

// Helper to parse strings like "4-3-3" into [1, 4, 3, 3]
const getFormationSchema = (formationString) =>
{
  if (!formationString) return [1, 4, 4, 2];
  const parts = formationString.split('-').map(Number);
  return [1, ...parts]; // Always add GK (1)
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

const formationRows = computed(() =>
{
  const rows = [];
  let playerIndex = 0;
  const schema = activeSchema.value;

  schema.forEach(count =>
  {
    rows.push(sortedStartingXI.value.slice(playerIndex, playerIndex + count));
    playerIndex += count;
  });

   return rows;
});
</script>

<template>
  <div class="flex flex-col justify-around items-center w-full h-full py-2">
    <div v-if="sortedStartingXI.length === 0" class="flex justify-center items-center h-full">
      <span class="text-white text-center opacity-30 ">No players found for this formation</span>
    </div>

    <div v-for="(rowPlayers, rowIndex) in formationRows" :key="rowIndex"
      class="flex justify-around items-center w-full">
      <div v-for="player in rowPlayers" :key="player.playerId">
        <BasePrimaryFormationPlayer :player="player" />
      </div>
    </div>
  </div>
</template>