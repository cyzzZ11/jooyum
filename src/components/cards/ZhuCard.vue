<script setup lang="ts">
import { computed } from 'vue'
import VChart from '@/components/common/VChart.vue'
import StatBlock from '@/components/common/StatBlock.vue'
import { ZHU_RING, ZHU_STATS } from '@/data/panels'
import { donutOption } from '@/utils/chartTheme'

const COLORS = ['#ffc94d', '#2fd8ff', '#21e6c1', '#5ef2a0']

const option = computed(() =>
  donutOption({
    data: ZHU_RING,
    colors: COLORS,
    radius: ['52%', '78%'],
    showLabel: false,
    unit: '家'
  })
)
</script>

<template>
  <div class="card">
    <div class="stat-row">
      <StatBlock v-for="s in ZHU_STATS" :key="s.label" v-bind="s" size="sm" />
    </div>
    <div class="chart-title">
      住宿设施构成
      <em>家</em>
    </div>
    <div class="donut-row">
      <div class="donut-wrap">
        <VChart :option="option" />
        <div class="donut-center">
          <span class="dc-value">
            464
            <i>家</i>
          </span>
          <span class="dc-label">住宿设施存量</span>
        </div>
      </div>
      <ul class="pie-legend">
        <li v-for="(d, i) in ZHU_RING" :key="d.name">
          <i :style="{ background: COLORS[i], color: COLORS[i] }" />
          <span class="pl-name">{{ d.name }}</span>
          <b class="pl-val">{{ d.value }}</b>
          <em class="pl-unit">家</em>
        </li>
      </ul>
    </div>
  </div>
</template>
