<template>
  <MapPanelsLayout metric="scenic">
    <!-- 左栏：游客量卡 + 出行特征（饼图·三 TAB） + 人群画像（表格·三 TAB） -->
    <template #left>
      <IndexCard
        title="接待国内游客量(累计)"
        :value="totalValue"
        unit="万人次"
        :tb="tb"
      />

      <!-- 出行特征：饼图 + 「目的地偏好 / 驻留时长 / app偏好」（实测参考站如此） -->
      <TabChartCard name="出行特征" dom-id="scenic-travel-chart" :tabs="travelTabs">
        <template #default="{ active }">
          <BaseChart :option="travelOption(active)" height="100%" />
        </template>
      </TabChartCard>

      <!-- 人群画像：表格 + 「性别年龄 / 消费能力 / 来源占比」 -->
      <TabTableCard
        name="人群画像"
        dom-id="scenic-profile-chart"
        :tabs="profileTabs"
        :columns="profileColumns"
        :rows="profileRows"
        :bars="profileBars"
      />
    </template>

    <!-- 底部居中：游客趋势 -->
    <template #center>
      <ChartCard name="游客趋势">
        <BaseChart :option="trendOption" height="100%" />
      </ChartCard>
    </template>

    <!-- 右栏：热门排行（景区，表格） + 游客来源地（表格 + 外省说明） -->
    <template #right>
      <TabTableCard
        name="热门排行"
        dom-id="scenic-hot-rank"
        :columns="rankColumns"
        :rows="rankRows"
      />

      <TabTableCard
        name="游客来源地"
        dom-id="scenic-origin"
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
import {
  HOLIDAY_SCENIC,
  HOLIDAY_RANK_SCENIC,
  HOLIDAY_TOTALS,
  buildHolidaySeries
} from '@/mock/holiday2026'
import { TRAVEL_APP } from '@/mock/realdata'
import { percent } from '@/utils/format'

/**
 * 景区游客页 —— 卡片结构 1:1 对齐参考站 `/main/trend/scenic`（CDP 实测）：
 *   左栏：接待国内游客量(累计) ／ 出行特征（饼图 + 目的地偏好·驻留时长·app偏好）／
 *         人群画像（表格 + 性别年龄·消费能力·来源占比）
 *   中栏：游客趋势（假期 7 天，2026 vs 2025）
 *   右栏：热门排行（景区表格）／ 游客来源地（表格 + 外省规模与占比说明）
 *
 * 数据：2026 年国庆节假期（10 月 1 日 - 10 月 7 日）松江区口径，
 * 见 src/mock/holiday2026.js（来源与推演规则同文件 DATA_SOURCES）。
 */
const totalValue = computed(() => (HOLIDAY_TOTALS.scenic.value / 1e4).toFixed(2))
const tb = computed(() => HOLIDAY_TOTALS.scenic.tb)

/* ---------- 出行特征（三 TAB 饼图） ---------- */
const travelTabs = [
  { key: 'pref', name: '目的地偏好' },
  { key: 'dwell', name: '驻留时长' },
  { key: 'app', name: 'app偏好' }
]

const travelOption = (active) => {
  let list = HOLIDAY_SCENIC.preference
  if (active === 'dwell') list = HOLIDAY_SCENIC.dwell
  if (active === 'app') list = TRAVEL_APP
  return {
    tooltip: { trigger: 'item', valueFormatter: (v) => v + '%' },
    color: ['#088afb', '#ffd200', '#2fd27a', '#ff8b4d', '#7ad4ff', '#b47aff'],
    series: [
      {
        type: 'pie',
        radius: ['38%', '62%'],
        center: ['50%', '52%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
        label: { color: 'rgba(220,238,255,.92)', fontSize: 12, formatter: '{d}%\n{b}' },
        labelLine: { length: 8, length2: 8, lineStyle: { color: 'rgba(8,138,251,.6)' } },
        data: list.map((x) => ({ name: x.name, value: Number(x.pct) }))
      }
    ]
  }
}

/* ---------- 人群画像（三 TAB 表格） ---------- */
const profileTabs = [
  { key: 'gender', name: '性别年龄' },
  { key: 'power', name: '消费能力' },
  { key: 'origin', name: '来源占比' }
]
const profileActive = ref('gender')

const profileColumns = computed(() => [
  { label: profileActive.value === 'power' ? '消费能力' : '年龄段', prop: 'name', width: 110 },
  { label: '占比', prop: 'pct', align: 'right', width: 80 }
])

const profileRows = computed(() => {
  if (profileActive.value === 'power') {
    return HOLIDAY_SCENIC.consume.map((p) => ({ name: p.name, pct: `${p.pct}%` }))
  }
  return HOLIDAY_SCENIC.age.map((a) => ({ name: a.name, pct: `${a.pct}%` }))
})

const profileBars = computed(() => {
  if (profileActive.value === 'power') {
    return HOLIDAY_SCENIC.consume.map((p) => ({ name: p.name, pct: Number(p.pct) }))
  }
  if (profileActive.value === 'origin') {
    return HOLIDAY_SCENIC.origin.slice(0, 6).map((o) => ({ name: o.name, pct: Number(o.pct) }))
  }
  return [
    { name: '男性', pct: Number(HOLIDAY_SCENIC.gender.male.toFixed(2)) },
    { name: '女性', pct: Number(HOLIDAY_SCENIC.gender.female.toFixed(2)) }
  ]
})

/* ---------- 游客趋势（假期 7 天双折线） ---------- */
const trendOption = computed(() => {
  const series = buildHolidaySeries('scenic')
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

/* ---------- 热门排行（景区，假期口径） ---------- */
const rankColumns = [
  { label: '排名', prop: 'rank', width: 40 },
  { label: '景区', prop: 'name', width: 110 },
  { label: '累计客流', prop: 'value', align: 'right', width: 80 },
  { label: '同比', prop: 'tb', align: 'right', width: 66 }
]
const rankRows = computed(() =>
  HOLIDAY_RANK_SCENIC.map((d) => ({
    name: d.region_name,
    value: `${(d.all_value / 1e4).toFixed(2)}万`,
    tb: `${d.tb_all_value >= 0 ? '+' : ''}${(d.tb_all_value * 100).toFixed(2)}%`
  }))
)

/* ---------- 游客来源地（表格 + 外省说明） ---------- */
const originColumns = [
  { label: '排名', prop: 'rank', width: 40 },
  { label: '区域', prop: 'name', width: 110 },
  { label: '占比', prop: 'pct', align: 'right', width: 80 }
]
const originRows = computed(() => HOLIDAY_SCENIC.origin.map((o) => ({ name: o.name, pct: `${o.pct}%` })))

/** 表头补充说明：外地规模 = 假期景区客流 × 外地占比（平台实测 32.04%） */
const originCaption = computed(() => {
  const outside = HOLIDAY_TOTALS.scenic.value * HOLIDAY_SCENIC.outProvinceRatio
  return `外地规模：${(outside / 1e4).toFixed(2)} 万人次　占比：${(HOLIDAY_SCENIC.outProvinceRatio * 100).toFixed(2)}%`
})
</script>

<style scoped>
</style>
