<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  tableData: {
    type: Array,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  showIndex: {
    type: Boolean,
    default: false,
  },
  totalPage: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  currentPage: {
    type: Number,
    default: 1,
  },
})
</script>

<template>
  <el-table :data="tableData" v-loading="loading" border height="720" class="w-full min-h-5">
    <!--:header-cell-style="{ background: '#f5f7fa', fontWeight: 'bold' }"-->

    <!-- Optional index column -->
    <el-table-column v-if="showIndex" type="index" label="#" width="60" align="center" sortable />

    <!-- Dynamic columns -->
    <el-table-column v-for="col in columns" :key="col.prop" :prop="col.prop" :label="col.label" :width="col.width"
      :align="col.align || 'left'" :sortable="col.sortable || false" :class="col.class" :class-name="col.className"
      :min-width="col.minWidth">

      <!-- Slot-based rendering -->
      <template #default="scope">
        <slot :name="col.slot || col.prop" :row="scope.row" :column="col">
          {{ scope.row[col.prop] }}
        </slot>
      </template>
    </el-table-column>

    <!-- Optional actions column -->
    <slot name="actions" />
  </el-table>
  <el-pagination class="flex justify-center my-2" background layout="prev, pager, next" :total="props.totalPage"
    v-model:page-size="props.pageSize" v-model:current-page="props.currentPage" />
</template>


