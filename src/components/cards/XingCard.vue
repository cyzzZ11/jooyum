<script setup lang="ts">
import { computed } from 'vue'
import VChart from '@/components/common/VChart.vue'
import StatBlock from '@/components/common/StatBlock.vue'
import { XING_BIG, XING_SMALL } from '@/data/panels'
import { barOption } from '@/utils/chartTheme'

/** 各交通方式客流分担（万人次） */
const MODES = [
  { name: '公交车', value: 78.5, color: '#5ef2a0' },
  { name: '轨交9号线', value: 42.6, color: '#2fd8ff' },
  { name: '铁路', value: 8.4, color: '#3f8cff' },
  { name: '长途客运', value: 3.2, color: '#a97bff' },
  { name: '有轨电车', value: 1.6, color: '#ffc94d' }
]

const option = computed(() =>
  barOption({
    categories: MODES.map((m) => m.name),
    values: MODES.map((m) => m.value),
    colors: ['rgba(63,140,255,0.10)', '#3f8cff'],
    unit: '万',
    max: 90
  })
)
</script>

<template>
  <div class="card">
    <div class="stat-row">
      <StatBlock v-for="s in XING_SMALL" :key="s.label" v-bind="s" size="sm" />
    </div>
    <div class="stat-row xing-big">
      <StatBlock v-for="s in XING_BIG" :key="s.label" v-bind="s" size="md" />
    </div>
    <div class="chart-title">
      交通方式客流分担
      <em>万人次</em>
    </div>
    <div class="chart-fill">
      <VChart :option="option" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.xing-big {
  padding: 4px 0 2px;
  border-top: 1px dashed rgba(94, 214, 255, 0.16);
  border-bottom: 1px dashed rgba(94, 214, 255, 0.16);
}
</style>
