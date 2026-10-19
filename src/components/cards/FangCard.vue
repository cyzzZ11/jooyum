<script setup lang="ts">
import { computed } from 'vue'
import VChart from '@/components/common/VChart.vue'
import StatBlock from '@/components/common/StatBlock.vue'
import { FANG_RING, FANG_STATS } from '@/data/panels'
import { donutOption } from '@/utils/chartTheme'

const COLORS = ['#3f8cff', '#21e6c1', '#ff5f9e', '#ffc94d']
const TOTAL = FANG_STATS.reduce((s, i) => s + i.value, 0)

const option = computed(() =>
  donutOption({
    data: FANG_RING,
    colors: COLORS,
    radius: ['52%', '78%'],
    showLabel: false,
    unit: '%'
  })
)
</script>

<template>
  <div class="card">
    <div class="chart-title">
      审批事项精简成效
      <em>项</em>
    </div>
    <div class="stat-grid cols-3">
      <StatBlock v-for="s in FANG_STATS" :key="s.label" v-bind="s" size="sm" align="center" />
    </div>
    <div class="chart-title">
      审批事项办理类型占比
      <em>%</em>
    </div>
    <div class="donut-row">
      <div class="donut-wrap">
        <VChart :option="option" />
        <div class="donut-center">
          <span class="dc-value">
            {{ TOTAL }}
            <i>项</i>
          </span>
          <span class="dc-label">精简调整合计</span>
        </div>
      </div>
      <ul class="pie-legend">
        <li v-for="(d, i) in FANG_RING" :key="d.name">
          <i :style="{ background: COLORS[i], color: COLORS[i] }" />
          <span class="pl-name">{{ d.name }}</span>
          <b class="pl-val">{{ d.value }}</b>
          <em class="pl-unit">%</em>
        </li>
      </ul>
    </div>
  </div>
</template>
