<template>
  <!-- 区域分析：实测根类名 .area-analysis-page（40% / 30%-20 / 30%-20，中栏含地图） -->
  <div class="area-analysis-page">
    <div class="layout-wrapper">
      <div class="left-part-wrapper">
        <ChartCard name="区域舆情排行">
          <TableList :columns="areaColumns" :rows="areaRank" dom-id="area-rank" />
        </ChartCard>

        <ChartCard name="区域舆情热力">
          <BaseChart :option="heatOption" height="100%" />
        </ChartCard>
      </div>

      <div class="center-part-wrapper">
        <ChartCard name="区域分布地图">
          <div class="map-card-wrapper">
            <div class="map-container">
              <TiandituMap />
            </div>
            <div class="map-legend-mini">
              <div class="legend-part-wrapper">
                <span class="legend-color-wrapper">
                  <i class="legend-color" style="background: #ff5b5b"></i>
                </span>
                高
              </div>
              <div class="legend-part-wrapper">
                <span class="legend-color-wrapper">
                  <i class="legend-color" style="background: #ffd200"></i>
                </span>
                中
              </div>
              <div class="legend-part-wrapper">
                <span class="legend-color-wrapper">
                  <i class="legend-color" style="background: #2fd27a"></i>
                </span>
                低
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      <div class="right-part-wrapper">
        <ChartCard name="区域情感构成">
          <BaseChart :option="emotionOption" height="100%" />
        </ChartCard>

        <ChartCard name="区域关注点">
          <TableList :columns="focusColumns" :rows="focusRows" dom-id="area-focus" />
        </ChartCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TableList from '@/components/TableList.vue'
import TiandituMap from '@/components/TiandituMap.vue'
import { SENTIMENT_AREA } from '@/mock/realdata'

/**
 * 区域分析页（参考站 `/main/sentiment/area`，chunk-446e0d04）。
 *
 * 版式**从反编译 CSS 还原**：
 *   .area-analysis-page .layout-wrapper    { gap:30px }
 *   .left-part-wrapper                     { width:40%; flex-column; gap:30px }
 *   .center-part-wrapper,.right-part-wrapper { width:calc(30% - 20px); flex-column; gap:30px }
 *   .map-card-wrapper                      { position:relative; overflow:hidden }
 *   .map-container                         { position:absolute; left:0; top:0 }
 *   .map-legend-mini                       { position:absolute; left:12px; bottom:36px; z-index:500 }
 *
 * 注意：参考站中栏是 **40% 左栏 + 地图**，与 /fee 的「中间地图铺满」不同。
 * ⚠️ 本账号无「舆情监测」模块权限，数据为松江区场景的合理示例（页面已标注）。
 */
const areaColumns = [
  { label: '区域', prop: 'region_name', align: 'left', width: 122 },
  { label: '舆情量', prop: 'all_value', width: 92, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]

const areaRank = computed(() => SENTIMENT_AREA.map((a) => ({ region_name: a.name, all_value: a.value, tb_all_value: a.tb })))

const heatOption = computed(() => {
  const list = [...SENTIMENT_AREA].slice(0, 8)
  return {
    grid: { left: 10, right: 46, top: 8, bottom: 4, containLabel: true },
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'value', axisLabel: { show: false }, splitLine: { show: false }, axisLine: { show: false } },
    yAxis: {
      type: 'category',
      inverse: true,
      data: list.map((c) => c.name),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.85)', fontSize: 12 }
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 12,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(255,91,91,.35)' },
              { offset: 1, color: '#ff8b4d' }
            ]
          }
        },
        label: { show: true, position: 'right', color: '#ffd200', fontSize: 11 },
        data: list.map((c) => c.value)
      }
    ]
  }
})

const emotionOption = computed(() => ({
  tooltip: { trigger: 'item', valueFormatter: (v) => v + '%' },
  legend: {
    bottom: 4,
    textStyle: { color: 'rgba(180,220,255,.85)', fontSize: 12 },
    itemWidth: 10,
    itemHeight: 8
  },
  color: ['#2fd27a', '#7ad4ff', '#ff5b5b'],
  series: [
    {
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['50%', '46%'],
      itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
      label: { color: 'rgba(220,238,255,.9)', fontSize: 12, formatter: '{b}\n{d}%' },
      labelLine: { length: 6, length2: 6, lineStyle: { color: 'rgba(8,138,251,.6)' } },
      data: [
        { name: '正面', value: 86.4 },
        { name: '中性', value: 9.2 },
        { name: '负面', value: 4.4 }
      ]
    }
  ]
}))

const focusColumns = [
  { label: '关注点', prop: 'region_name', align: 'left', width: 122 },
  { label: '提及量', prop: 'all_value', width: 92, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]
const focusRows = [
  { region_name: '客流与秩序', all_value: 1864, tb_all_value: 0.286 },
  { region_name: '交通与停车', all_value: 1428, tb_all_value: 0.412 },
  { region_name: '门票与价格', all_value: 1096, tb_all_value: -0.086 },
  { region_name: '餐饮与住宿', all_value: 962, tb_all_value: 0.174 },
  { region_name: '服务态度', all_value: 684, tb_all_value: 0.048 },
  { region_name: '环境卫生', all_value: 486, tb_all_value: -0.124 }
]
</script>

<style scoped>
/* 版式取自 _ref/css/chunk-446e0d04.css */
.area-analysis-page {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  color: #fff;
}

.area-analysis-page .layout-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  box-sizing: border-box;
}

.area-analysis-page .left-part-wrapper {
  width: 40%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
}

.area-analysis-page .center-part-wrapper,
.area-analysis-page .right-part-wrapper {
  width: calc(30% - 20px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
}

.map-card-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.map-legend-mini {
  position: absolute;
  left: 12px;
  bottom: 36px;
  z-index: 500;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 8px;
  border-radius: 3px;
  background: rgba(3, 20, 35, 0.6);
}

.map-legend-mini .legend-part-wrapper {
  pointer-events: auto;
  display: flex;
  align-items: center;
  color: #fff;
  cursor: pointer;
  font-size: 12px;
}

.map-legend-mini .legend-color-wrapper {
  display: flex;
  align-items: center;
  margin: 0 4px;
}

.map-legend-mini .legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  display: inline-block;
}
</style>
