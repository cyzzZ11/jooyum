<script setup lang="ts">
import { computed } from 'vue'
import VChart from '@/components/common/VChart.vue'
import { GOU_PIE, GOU_TOTAL } from '@/data/panels'
import { donutOption } from '@/utils/chartTheme'

const COLORS = [
  '#2fd8ff',
  '#3f8cff',
  '#a97bff',
  '#ffc94d',
  '#21e6c1',
  '#ff5f9e'
]
const TOTAL = GOU_PIE.reduce((s, d) => s + d.value, 0)

const option = computed(() =>
  donutOption({
    data: GOU_PIE,
    colors: COLORS,
    radius: ['54%', '80%'],
    showLabel: false,
    unit: '亿元'
  })
)
</script>

<template>
  <div class="card">
    <div class="chart-title">
      旅游购物消费结构
      <em>亿元</em>
    </div>
    <div class="donut-row">
      <div class="donut-wrap">
        <VChart :option="option" />
        <div class="donut-center">
          <span class="dc-value">
            {{ GOU_TOTAL.value }}
            <i>亿元</i>
          </span>
          <span class="dc-label">{{ GOU_TOTAL.label }}</span>
        </div>
      </div>
      <ul class="pie-legend">
        <li v-for="(d, i) in GOU_PIE" :key="d.name">
          <i :style="{ background: COLORS[i], color: COLORS[i] }" />
          <span class="pl-name">{{ d.name }}</span>
          <b class="pl-val">{{ d.value }}</b>
          <em class="pl-unit">亿元</em>
        </li>
        <li class="pl-total">
          <span class="pl-name">合计</span>
          <b class="pl-val">{{ TOTAL.toFixed(1) }}</b>
          <em class="pl-unit">亿元</em>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pl-total {
  margin-top: auto;
  padding-top: 6px;
  border-top: 1px dashed rgba(94, 214, 255, 0.22);

  .pl-name {
    color: $c-text-sub;
  }

  .pl-val {
    color: $c-cyan;
  }
}
</style>
