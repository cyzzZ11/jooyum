<script setup lang="ts">
import { computed } from 'vue'
import VChart from '@/components/common/VChart.vue'
import RankBar from '@/components/common/RankBar.vue'
import StatBlock from '@/components/common/StatBlock.vue'
import { FU_EXTRA, FU_PIE, FU_RANK, FU_STATS } from '@/data/panels'
import { donutOption } from '@/utils/chartTheme'

const COLORS = ['#2fd8ff', '#ff9f43', '#a97bff', '#21e6c1', '#7fb3ff']

/** 服务效能补充指标 */
const EXTRA = FU_EXTRA

const option = computed(() =>
  donutOption({
    data: FU_PIE,
    colors: COLORS,
    radius: ['50%', '78%'],
    showLabel: false,
    unit: '%'
  })
)
</script>

<template>
  <div class="card">
    <div class="stat-row">
      <StatBlock v-for="s in FU_STATS" :key="s.label" v-bind="s" size="sm" />
    </div>
    <div class="stat-row fu-extra">
      <div v-for="e in EXTRA" :key="e.label" class="fu-extra-item">
        <span class="fe-val">
          {{ e.value }}
          <i>{{ e.unit }}</i>
        </span>
        <span class="fe-label">{{ e.label }}</span>
      </div>
    </div>
    <div class="chart-title">
      12345 投诉问题类型
      <em>%</em>
    </div>
    <div class="donut-row fu-pie-row">
      <div class="donut-wrap">
        <VChart :option="option" />
        <div class="donut-center">
          <span class="dc-value">
            {{ FU_STATS[0].value }}
            <i>件</i>
          </span>
          <span class="dc-label">假期受理</span>
        </div>
      </div>
      <ul class="pie-legend">
        <li v-for="(d, i) in FU_PIE" :key="d.name">
          <i :style="{ background: COLORS[i], color: COLORS[i] }" />
          <span class="pl-name">{{ d.name }}</span>
          <b class="pl-val">{{ d.value }}</b>
          <em class="pl-unit">%</em>
        </li>
      </ul>
    </div>

    <div class="chart-title">
      OTA 热议景区排行
      <em>讨论量（百条）</em>
      <b class="scroll-hint">可滚动 ▼</b>
    </div>
    <div class="chart-fill scroll-area">
      <RankBar :items="FU_RANK" color="#ff9f43" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.fu-extra {
  justify-content: space-around;
  padding: 8px 0;
  border-top: 1px dashed rgba(94, 214, 255, 0.16);
  border-bottom: 1px dashed rgba(94, 214, 255, 0.16);
}

.fu-extra-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;

  .fe-val {
    font-family: $font-num;
    font-size: 20px;
    font-weight: 700;
    color: $c-teal;
    @include glow-text($c-teal, 12px);

    i {
      font-style: normal;
      font-size: 10px;
      color: $c-text-sub;
      margin-left: 2px;
    }
  }

  .fe-label {
    font-size: 11px;
    color: $c-text-sub;
  }
}

.fu-pie-row {
  flex: none;
  height: 136px;
}
</style>
