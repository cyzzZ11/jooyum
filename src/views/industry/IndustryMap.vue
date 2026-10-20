<template>
  <!-- 产业图谱：实测 .HYAnalysis 外壳 + 地图/概览并排（.main-top-wrapper） -->
  <SideMenuLayout :menus="menus" source-text="数据来源：松江区文旅产业统计（示例数据）">
    <div class="main-top-wrapper">
      <div class="main-top-map-wrapper">
        <ChartCard name="产业空间分布">
          <div class="map-card-wrapper">
            <div class="map-container">
              <TiandituMap />
            </div>
          </div>
        </ChartCard>
      </div>

      <div class="main-top-overview-wrapper">
        <div class="overview-card-wrapper">
          <ChartCard name="产业环节占比">
            <BaseChart :option="pieOption" height="100%" />
          </ChartCard>
        </div>
        <div class="overview-card-wrapper">
          <ChartCard name="各街镇企业数">
            <BaseChart :option="barOption" height="100%" />
          </ChartCard>
        </div>
      </div>
    </div>
  </SideMenuLayout>
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TiandituMap from '@/components/TiandituMap.vue'
import SideMenuLayout from '@/views/common/SideMenuLayout.vue'

/**
 * 产业洞察 · 产业图谱（参考站 `/main/industry/industryMap`，chunk-b1784eb4）。
 *
 * 版式**从反编译 CSS 还原**：
 *   .content-main-wrapper .main-top-wrapper { height:calc(50% - 10px) }
 *   .main-top-wrapper .main-top-map-wrapper { width:calc(50% - 10px); height:100% }
 *   .main-top-wrapper .main-top-overview-wrapper { width:calc(50% - 10px); height:100%;
 *                                                  display:flex; justify-content:space-between }
 *
 * ⚠️ 本账号无「产业洞察」模块权限，数据为松江区文旅产业的合理示例（页面已标注）。
 */
const menus = [
  { key: 'overview', name: '产业总览' },
  { key: 'map', name: '产业图谱' },
  { key: 'analysis', name: '链数分析' },
  { key: 'company', name: '企业监测' }
]

const pieOption = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}<br/>{c} 家 ({d}%)' },
  legend: {
    orient: 'vertical',
    right: 6,
    top: 'center',
    textStyle: { color: 'rgba(180,220,255,.85)', fontSize: 12 },
    itemWidth: 10,
    itemHeight: 8
  },
  color: ['#088afb', '#ffd200', '#2fd27a', '#ff8b4d', '#7ad4ff', '#b47aff'],
  series: [
    {
      type: 'pie',
      radius: ['42%', '68%'],
      center: ['34%', '50%'],
      itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
      label: { show: false },
      data: [
        { name: '景区景点', value: 186 },
        { name: '住宿业', value: 642 },
        { name: '餐饮业', value: 1128 },
        { name: '旅行社', value: 168 },
        { name: '文化娱乐', value: 426 },
        { name: '文创企业', value: 214 }
      ]
    }
  ]
}))

const barOption = computed(() => {
  const list = [
    { name: '方松街道', v: 386 }, { name: '岳阳街道', v: 342 }, { name: '中山街道', v: 318 },
    { name: '佘山镇', v: 264 }, { name: '广富林街道', v: 248 }, { name: '九亭镇', v: 226 },
    { name: '泗泾镇', v: 208 }, { name: '车墩镇', v: 186 }
  ]
  return {
    grid: { left: 10, right: 40, top: 10, bottom: 6, containLabel: true },
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
        barMaxWidth: 13,
        itemStyle: {
          borderRadius: [0, 6, 6, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 1, y2: 0,
            colorStops: [
              { offset: 0, color: 'rgba(8,138,251,.45)' },
              { offset: 1, color: '#7ad4ff' }
            ]
          }
        },
        label: { show: true, position: 'right', color: '#ffd200', fontSize: 11 },
        data: list.map((c) => c.v)
      }
    ]
  }
})
</script>

<style scoped>
.main-top-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.main-top-map-wrapper {
  width: calc(50% - 10px);
  height: 100%;
}

.main-top-overview-wrapper {
  width: calc(50% - 10px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.overview-card-wrapper {
  width: calc(50% - 8px);
  height: 100%;
}

.map-card-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.map-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
