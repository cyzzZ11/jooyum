<template>
  <!-- 产业分析：实测 .HYAnalysis 外壳（无侧栏时 content-wrapper 为 flex:1） -->
  <SideMenuLayout
    :menus="menus"
    source-text="数据来源：松江区文旅产业统计（示例数据）"
    back-text="产业分析报告"
  >
    <div class="analysis-main-wrapper">
      <div class="content-left-wrapper">
        <div class="summary-wrapper">
          松江区文旅产业 2025 年营业收入 <b class="sj-num">186.4</b> 亿元，同比增长
          <b class="sj-num">+8.2%</b>；规模以上企业 328 家。
        </div>

        <div class="chart-area-wrapper">
          <ChartCard name="产业链环节构成">
            <BaseChart :option="chainOption" height="100%" />
          </ChartCard>
        </div>
      </div>

      <div class="content-right-wrapper">
        <ChartCard name="营收与增速">
          <BaseChart :option="revenueOption" height="100%" />
        </ChartCard>
      </div>
    </div>
  </SideMenuLayout>
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import SideMenuLayout from '@/views/common/SideMenuLayout.vue'

/**
 * 产业洞察 · 产业分析（参考站 `/main/industry/industryAnalysis`，chunk-0b5357e0 / chunk-b1784eb4）。
 *
 * 版式**从反编译 CSS 还原**：
 *   .HYAnalysis .content-wrapper .content-top-wrapper { height:12px }
 *   .content-left-wrapper .summary-wrapper { height:32px; padding:0 8px;
 *                                            background:rgba(0,255,217,.16); color:#68befe }
 *   .extra-params-wrapper .extra-2-wrapper { width:162px; height:26px; border-radius:18px;
 *                                            box-shadow:inset 0 0 10px 0 rgba(8,138,251,.6) }
 *
 * ⚠️ 本账号无「产业洞察」模块权限，数据为松江区文旅产业的合理示例（页面已标注）。
 */
const menus = [
  { key: 'overview', name: '产业总览' },
  { key: 'map', name: '产业图谱' },
  { key: 'analysis', name: '链数分析' },
  { key: 'company', name: '企业监测' }
]

const chainOption = computed(() => {
  const list = [
    { name: '上游·资源供给', v: 18.6 },
    { name: '中游·产品运营', v: 42.4 },
    { name: '下游·渠道分销', v: 24.8 },
    { name: '配套·服务支撑', v: 14.2 }
  ]
  return {
    tooltip: { trigger: 'item', formatter: '{b}<br/>{c}%' },
    legend: {
      orient: 'vertical',
      right: 8,
      top: 'center',
      textStyle: { color: 'rgba(180,220,255,.85)', fontSize: 12 },
      itemWidth: 10,
      itemHeight: 8
    },
    color: ['#088afb', '#ffd200', '#2fd27a', '#ff8b4d'],
    series: [
      {
        type: 'pie',
        radius: ['42%', '70%'],
        center: ['36%', '50%'],
        itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
        label: { color: 'rgba(220,238,255,.9)', fontSize: 12, formatter: '{d}%' },
        labelLine: { length: 6, length2: 6, lineStyle: { color: 'rgba(8,138,251,.6)' } },
        data: list.map((c) => ({ name: c.name, value: c.v }))
      }
    ]
  }
})

const revenueOption = computed(() => {
  const labels = ['2021', '2022', '2023', '2024', '2025']
  const revenue = [142.6, 128.4, 156.8, 172.3, 186.4]
  const growth = [-8.6, -9.96, 22.12, 9.88, 8.18]
  return {
    grid: { left: 12, right: 44, top: 40, bottom: 22, containLabel: true },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['营业收入', '同比增速'],
      textStyle: { color: 'rgba(180,220,255,.85)', fontSize: 12 },
      itemWidth: 12,
      itemHeight: 8,
      top: 6
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: 'rgba(8,138,251,.45)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 }
    },
    yAxis: [
      {
        type: 'value',
        name: '亿元',
        nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 },
        splitLine: { lineStyle: { color: 'rgba(8,138,251,.14)', type: 'dashed' } }
      },
      {
        type: 'value',
        name: '%',
        nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 11 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '营业收入',
        type: 'bar',
        barMaxWidth: 26,
        itemStyle: {
          borderRadius: [3, 3, 0, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#ffd200' },
              { offset: 1, color: 'rgba(255,210,0,.22)' }
            ]
          }
        },
        data: revenue
      },
      {
        name: '同比增速',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#2fd27a', width: 2 },
        itemStyle: { color: '#2fd27a' },
        data: growth
      }
    ]
  }
})
</script>

<style scoped>
.analysis-main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.content-left-wrapper {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.content-right-wrapper {
  width: calc(50% - 16px);
  height: 100%;
  min-width: 0;
}

.summary-wrapper {
  width: 100%;
  height: 32px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  padding: 0 8px;
  background: rgba(0, 255, 217, 0.16);
  border: 1px solid rgba(0, 255, 217, 0.16);
  font-weight: 500;
  font-size: 14px;
  color: #68befe;
  line-height: 21px;
  box-sizing: border-box;
}

.summary-wrapper b {
  color: #ffd200;
  margin: 0 4px;
}

.chart-area-wrapper {
  flex: 1;
  min-height: 0;
  margin-top: 14px;
}
</style>
