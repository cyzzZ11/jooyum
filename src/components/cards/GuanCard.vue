<script setup lang="ts">
import { computed } from 'vue'
import VChart from '@/components/common/VChart.vue'
import StatBlock from '@/components/common/StatBlock.vue'
import { GUAN_DAYS, GUAN_LINE, GUAN_STATS } from '@/data/panels'
import { lineOption } from '@/utils/chartTheme'

const option = computed(() =>
  lineOption({
    categories: GUAN_DAYS,
    series: GUAN_LINE,
    area: true,
    unit: '次'
  })
)
</script>

<template>
  <div class="card">
    <div class="stat-grid cols-2">
      <StatBlock v-for="s in GUAN_STATS" :key="s.label" v-bind="s" size="sm" />
    </div>
    <div class="chart-title">
      文化执法 / 稽查日度趋势
      <em>次</em>
    </div>
    <div class="chart-fill">
      <VChart :option="option" />
    </div>
  </div>
</template>
