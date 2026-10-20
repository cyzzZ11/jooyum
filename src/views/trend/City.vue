<template>
  <MapPanelsLayout metric="city">
    <!-- 左栏：游客量卡 + 出行特征（饼图·双 TAB） + 人群画像（表格·三 TAB） -->
    <template #left>
      <IndexCard
        title="接待国内游客量(累计)"
        :value="totalValue"
        unit="万人次"
        :tb="tb"
      />

      <!-- 出行特征：饼图 + 「出行方式 / 出行APP偏好」双 TAB（实测参考站如此） -->
      <TabChartCard name="出行特征" dom-id="city-travel-chart" :tabs="travelTabs">
        <template #default="{ active }">
          <BaseChart :option="active === 'mode' ? modePieOption : appPieOption" height="100%" />
        </template>
      </TabChartCard>

      <!-- 人群画像：表格 + 「性别年龄 / 消费能力 / 来源占比」三 TAB -->
      <TabTableCard
        name="人群画像"
        dom-id="city-profile-chart"
        :tabs="profileTabs"
        :columns="profileColumns"
        :rows="profileRows"
        :bars="profileBars"
      />
    </template>

    <!-- 底部居中：游客趋势（当年 / 去年同期 双柱） -->
    <template #center>
      <ChartCard name="游客趋势">
        <BaseChart :option="trendOption" height="100%" />
      </ChartCard>
    </template>

    <!-- 右栏：热门排行（区县/景区 双 TAB 表格） + 游客来源地（表格） -->
    <template #right>
      <TabTableCard
        name="热门排行"
        dom-id="city-hot-rank"
        :tabs="rankTabs"
        :columns="rankColumns"
        :rows="rankRows"
      />

      <TabTableCard
        name="游客来源地"
        dom-id="city-origin"
        :columns="originColumns"
        :rows="originRows"
        :caption="originCaption"
      />
    </template>
  </MapPanelsLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TabChartCard from '@/components/TabChartCard.vue'
import TabTableCard from '@/components/TabTableCard.vue'
import MapPanelsLayout from '@/views/common/MapPanelsLayout.vue'
import IndexCard from '@/components/IndexCard.vue'
import { HOLIDAY_CITY, HOLIDAY_RANK_CITY, HOLIDAY_RANK_SCENIC, HOLIDAY_TOTALS, buildHolidaySeries } from '@/mock/holiday2026'
import { TRAVEL_APP } from '@/mock/realdata'
import { percent } from '@/utils/format'

/**
 * 国内旅游页 —— 版式与卡片结构 **1:1 对齐参考站** `/main/trend/city`（CDP 实测）：
 *   左栏：接待国内游客量(累计) ／ 出行特征（饼图 + 出行方式·出行APP偏好）／
 *         人群画像（表格 + 性别年龄·消费能力·来源占比）
 *   中栏：游客趋势（折线，当年 vs 去年同期）
 *   右栏：热门排行（表格 + 区县·景区）／ 游客来源地（表格）
 *
 * 数据：2026 年国庆节假期（10 月 1 日 - 10 月 7 日）松江区口径，
 * 见 src/mock/holiday2026.js（来源与推演规则同文件 DATA_SOURCES）。
 */
const totalValue = computed(() => (HOLIDAY_TOTALS.gn.value / 1e4).toFixed(2))
const tb = computed(() => HOLIDAY_TOTALS.gn.tb)

/* ---------- 出行特征（双 TAB 饼图） ---------- */
const travelTabs = [
  { key: 'mode', name: '出行方式' },
  { key: 'app', name: '出行APP偏好' }
]

/** 通用饼图（参考站 PiePlaneChart：环形 + 外圈标注百分比 + 名称） */
const pieOption = (list, colors) => ({
  tooltip: { trigger: 'item', valueFormatter: (v) => v + '%' },
  color: colors,
  series: [
    {
      type: 'pie',
      radius: ['38%', '62%'],
      center: ['50%', '52%'],
      avoidLabelOverlap: true,
      itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
      label: {
        color: 'rgba(220,238,255,.92)',
        fontSize: 12,
        formatter: '{d}%\n{c}'.replace('{c}', '{b}')
      },
      labelLine: { length: 8, length2: 8, lineStyle: { color: 'rgba(8,138,251,.6)' } },
      data: list.map((x) => ({ name: x.name, value: Number(x.pct) }))
    }
  ]
})

const modePieOption = computed(() =>
  pieOption(
    HOLIDAY_CITY.travelMode.map((m) => ({ name: m.name, pct: m.pct })),
    ['#088afb', '#ffd200', '#2fd27a']
  )
)
const appPieOption = computed(() =>
  pieOption(
    TRAVEL_APP.map((m) => ({ name: m.name, pct: m.pct })),
    ['#ffd200', '#088afb', '#2fd27a', '#ff8b4d', '#7ad4ff', '#b47aff']
  )
)

/* ---------- 人群画像（三 TAB 表格） ---------- */
const profileTabs = [
  { key: 'gender', name: '性别年龄' },
  { key: 'power', name: '消费能力' },
  { key: 'origin', name: '来源占比' }
]
const profileActive = ref('gender')

const profileColumns = computed(() => {
  if (profileActive.value === 'power') {
    return [
      { label: '消费能力', prop: 'name', width: 110 },
      { label: '占比', prop: 'pct', align: 'right', width: 80 }
    ]
  }
  return [
    { label: '年龄段', prop: 'name', width: 110 },
    { label: '占比', prop: 'pct', align: 'right', width: 80 }
  ]
})

const profileRows = computed(() => {
  if (profileActive.value === 'power') {
    return SJ_SPENDING_POWER.list.map((p) => ({ name: p.name, pct: `${p.pct}%` }))
  }
  return HOLIDAY_CITY.age.map((a) => ({ name: a.name, pct: `${a.pct}%` }))
})

/** 性别用条状展示（参考站为「男性 52.86% 女性 47.14%」并列表述） */
const profileBars = computed(() => {
  const base = [
    { name: '男性', pct: Number(HOLIDAY_CITY.gender.male.toFixed(2)) },
    { name: '女性', pct: Number(HOLIDAY_CITY.gender.female.toFixed(2)) }
  ]
  // 仅在「性别年龄」TAB 显示；其余 TAB 展示对应结构
  if (profileActive.value === 'power') {
    return SJ_SPENDING_POWER.list.slice(0, 6).map((p) => ({ name: p.name, pct: Number(p.pct) }))
  }
  if (profileActive.value === 'origin') {
    return HOLIDAY_CITY.origin.slice(0, 6).map((o) => ({ name: o.name, pct: Number(o.pct) }))
  }
  return base
})

/* ---------- 游客趋势（假期 7 天双折线） ---------- */
const trendOption = computed(() => {
  const series = buildHolidaySeries('gn')
  return {
    grid: { left: 12, right: 24, top: 34, bottom: 22, containLabel: true },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['2026年', '2025年'],
      textStyle: { color: 'rgba(180,220,255,.85)', fontSize: 13 },
      itemWidth: 12,
      itemHeight: 8,
      top: 4
    },
    xAxis: {
      type: 'category',
      data: series.labels,
      axisLine: { lineStyle: { color: 'rgba(8,138,251,.45)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11, hideOverlap: true }
    },
    yAxis: {
      type: 'value',
      name: '单位:万人次',
      nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 12 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(8,138,251,.14)', type: 'dashed' } }
    },
    series: [
      {
        name: '2026年',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: '#ffd200', width: 2 },
        itemStyle: { color: '#ffd200' },
        data: series.dataDisp
      },
      {
        name: '2025年',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: '#1FDEDB', width: 2 },
        itemStyle: { color: '#1FDEDB' },
        data: series.lastDataDisp
      }
    ]
  }
})

/* ---------- 热门排行（街镇 / 景区 双 TAB） ---------- */
const rankTabs = [
  { key: 'district', name: '街镇' },
  { key: 'scenic', name: '景区' }
]
const rankActive = ref('district')

const rankColumns = [
  { label: '排名', prop: 'rank', width: 40 },
  { label: '区域', prop: 'name', width: 110 },
  { label: '累计客流', prop: 'value', align: 'right', width: 80 },
  { label: '同比', prop: 'tb', align: 'right', width: 66 }
]

const fmtWan = (v) => `${(Number(v) / 1e4).toFixed(2)}万`
const fmtTb = (v) => `${Number(v) >= 0 ? '+' : ''}${(Number(v) * 100).toFixed(2)}%`

const rankRows = computed(() => {
  if (rankActive.value === 'scenic') {
    return HOLIDAY_RANK_SCENIC.map((d) => ({ name: d.region_name, value: fmtWan(d.all_value), tb: fmtTb(d.tb_all_value) }))
  }
  return HOLIDAY_RANK_CITY.slice(0, 16).map((d) => ({
    name: d.region_name,
    value: fmtWan(d.all_value),
    tb: fmtTb(d.tb_all_value)
  }))
})

/* ---------- 游客来源地（表格） ---------- */
const originColumns = [
  { label: '排名', prop: 'rank', width: 40 },
  { label: '区域', prop: 'name', width: 110 },
  { label: '占比', prop: 'pct', align: 'right', width: 80 }
]
const originRows = computed(() => HOLIDAY_CITY.origin.map((o) => ({ name: o.name, pct: `${o.pct}%` })))
const originCaption = ''
</script>

<style scoped>
</style>
