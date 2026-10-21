<script setup lang="ts">
import { computed } from 'vue'
import VChart from '@/components/common/VChart.vue'
import StatBlock from '@/components/common/StatBlock.vue'
import { YOU_BARS, YOU_STATS } from '@/data/panels'
import { barOption } from '@/utils/chartTheme'

const option = computed(() =>
  barOption({
    categories: YOU_BARS.map((b) => b.short ?? b.name),
    values: YOU_BARS.map((b) => b.value),
    colors: ['rgba(47,216,255,0.10)', '#2fd8ff'],
    max: 16
  })
)
</script>

<template>
  <div class="card">
    <div class="stat-row">
      <StatBlock v-for="s in YOU_STATS" :key="s.label" v-bind="s" size="sm" />
    </div>
    <div class="chart-title">
      重点景区假期客流 TOP6
      <em>万人次</em>
    </div>
    <div class="chart-fill">
      <VChart :option="option" />
    </div>
  </div>
</template>
