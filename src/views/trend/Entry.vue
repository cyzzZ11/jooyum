<template>
  <MapPanelsLayout metric="entry">
    <!-- 左栏：游客量卡 + 入境游客分类 + 驻留时长（饼图） -->
    <template #left>
      <IndexCard
        title="接待游客量(累计)"
        :value="totalValue"
        unit="万人次"
        :tb="tb"
      />

      <!-- 入境游客分类：规模 / 占比 / 同比（实测参考站为三行明细，非图表） -->
      <ChartCard name="入境游客分类" dom-id="entry-category-chart">
        <div class="entry-category">
          <div v-for="c in categories" :key="c.name" class="category-item">
            <div class="category-head">
              <span class="category-name">{{ c.name }}</span>
            </div>
            <div class="category-line">
              <span class="category-label">规模</span>
              <span class="category-value sj-num">{{ c.value }}<em>万人次</em></span>
            </div>
            <div class="category-line">
              <span class="category-label">占比</span>
              <span class="category-pct sj-num">{{ c.pct }}%</span>
              <span class="category-tb sj-num" :class="c.tb >= 0 ? 'is-up' : 'is-down'">
                同比 {{ percent(c.tb * 100) }}%
              </span>
            </div>
          </div>
        </div>
      </ChartCard>

      <!-- 驻留时长：饼图（实测参考站为 PiePlaneChart，带旋转装饰环） -->
      <ChartCard name="驻留时长" dom-id="entry-dwell-chart">
        <div class="pie-spin-host">
          <img class="pie-spin-deco" src="/img/pie-center.42045c25.png" alt="" />
          <BaseChart :option="dwellPieOption" height="100%" />
        </div>
      </ChartCard>
    </template>

    <!-- 底部居中：游客趋势（柱状双系列 + 全部/中国港澳台/国际） -->
    <template #center>
      <ChartCard name="游客趋势">
        <template #toolbar>
          <span class="tab-btn-wrapper">
            <span
              v-for="t in trendTabs"
              :key="t.key"
              class="chart-btn"
              :class="{ 'chart-btn-select': trendActive === t.key }"
              @click="trendActive = t.key"
            >
              {{ t.name }}
            </span>
          </span>
        </template>
        <BaseChart :option="trendOption" height="100%" />
      </ChartCard>
    </template>

    <!-- 右栏：热门排行（表格） + 游客来源地（表格 + 全部/中国港澳台/国际） -->
    <template #right>
      <TabTableCard
        name="热门排行"
        dom-id="entry-hot-rank"
        :columns="rankColumns"
        :rows="rankRows"
      />

      <TabTableCard
        name="游客来源地"
        dom-id="entry-origin"
        :tabs="originTabs"
        :columns="originColumns"
        :rows="originRows"
      />
    </template>
  </MapPanelsLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TabTableCard from '@/components/TabTableCard.vue'
import MapPanelsLayout from '@/views/common/MapPanelsLayout.vue'
import IndexCard from '@/components/IndexCard.vue'
import { HOLIDAY_ENTRY, HOLIDAY_RANK_ENTRY, HOLIDAY_TOTALS, buildHolidaySeries } from '@/mock/holiday2026'
import { percent } from '@/utils/format'

/**
 * 入境旅游页 —— 卡片结构 1:1 对齐参考站 `/main/trend/entry`（CDP 实测）：
 *   左栏：接待游客量(累计) ／ 入境游客分类（规模·占比·同比 明细）／ 驻留时长（饼图）
 *   中栏：游客趋势（假期 7 天，2026 vs 2025）
 *   右栏：热门排行（表格）／ 游客来源地（表格 + 全部·中国港澳台·国际）
 *
 * 数据：2026 年国庆节假期（10 月 1 日 - 10 月 7 日）松江区口径，
 * 见 src/mock/holiday2026.js（来源与推演规则同文件 DATA_SOURCES）。
 */
const totalValue = computed(() => (HOLIDAY_TOTALS.rj.value / 1e4).toFixed(2))
const tb = computed(() => HOLIDAY_TOTALS.rj.tb)

/* ---------- 入境游客分类 ---------- */
/**
 * 参考站该卡为三行明细（规模 / 占比 / 同比），非图表。
 * 港澳台 / 国际占比与同比取自参考图（30.52% / 69.48%，同比 +15.43% / +33.98%）。
 */
const categories = computed(() =>
  HOLIDAY_ENTRY.category.map((c) => ({
    name: c.name,
    pct: (c.ratio * 100).toFixed(2),
    value: ((HOLIDAY_TOTALS.rj.value * c.ratio) / 1e4).toFixed(2),
    tb: c.tb
  }))
)

/* ---------- 驻留时长（饼图） ---------- */
const dwellPieOption = computed(() => {
  const data = HOLIDAY_ENTRY.dwell.map((d) => ({ name: d.name, value: Number(d.pct) }))
  return {
    tooltip: { trigger: 'item', valueFormatter: (v) => v + '%' },
    color: ['#088afb', '#ffd200', '#2fd27a', '#7ad4ff'],
    series: [
      {
        type: 'pie',
        radius: ['38%', '62%'],
        center: ['50%', '52%'],
        avoidLabelOverlap: true,
        itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
        label: { color: 'rgba(220,238,255,.92)', fontSize: 12, formatter: '{d}%\n{b}' },
        labelLine: { length: 8, length2: 8, lineStyle: { color: 'rgba(8,138,251,.6)' } },
        data
      }
    ]
  }
})

/* ---------- 游客趋势（假期 7 天双折线 + 三 TAB） ---------- */
const trendTabs = [
  { key: 'all', name: '全部' },
  { key: 'hmt', name: '中国港澳台' },
  { key: 'intl', name: '国际' }
]
const trendActive = ref('all')

const trendOption = computed(() => {
  const ratio = trendActive.value === 'hmt' ? 0.3052 : trendActive.value === 'intl' ? 0.6948 : 1
  const series = buildHolidaySeries('rj')
  const cur = series.dataDisp.map((v) => Number((v * ratio).toFixed(2)))
  const last = series.lastDataDisp.map((v) => Number((v * ratio).toFixed(2)))
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
        data: cur
      },
      {
        name: '2025年',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        lineStyle: { color: '#1FDEDB', width: 2 },
        itemStyle: { color: '#1FDEDB' },
        data: last
      }
    ]
  }
})

/* ---------- 热门排行 ---------- */
const rankColumns = [
  { label: '排名', prop: 'rank', width: 40 },
  { label: '区域', prop: 'name', width: 110 },
  { label: '累计客流', prop: 'value', align: 'right', width: 80 },
  { label: '同比', prop: 'tb', align: 'right', width: 66 }
]
const rankRows = computed(() =>
  HOLIDAY_RANK_ENTRY.map((d) => ({
    name: d.region_name,
    value: `${(d.all_value / 1e4).toFixed(2)}万`,
    tb: `${d.tb_all_value >= 0 ? '+' : ''}${(d.tb_all_value * 100).toFixed(2)}%`
  }))
)

/* ---------- 游客来源地（三 TAB 表格） ---------- */
const originTabs = [
  { key: 'all', name: '全部' },
  { key: 'hmt', name: '中国港澳台' },
  { key: 'intl', name: '国际' }
]
const originColumns = [
  { label: '排名', prop: 'rank', width: 40 },
  { label: '区域', prop: 'name', width: 110 },
  { label: '占比', prop: 'pct', align: 'right', width: 80 }
]
const originRows = computed(() =>
  HOLIDAY_ENTRY.origin.map((o) => ({ name: o.name, pct: `${o.pct}%` }))
)
</script>

<style scoped>
.ratio-value.is-up,
.category-tb.is-up {
  color: #ff5b5b;
}

.ratio-value.is-down,
.category-tb.is-down {
  color: #2fd27a;
}

/* ---------- 入境游客分类（规模/占比/同比 明细行） ---------- */
.entry-category {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  padding: 4px 16px;
  box-sizing: border-box;
}

.category-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(8, 138, 251, 0.2);
}

.category-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.category-name {
  font-size: 15px;
  color: #7ad4ff;
}

.category-line {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

.category-label {
  font-size: 13px;
  color: #9fc4e8;
  width: 34px;
  flex-shrink: 0;
}

.category-value {
  font-size: 22px;
  font-weight: 700;
  color: #ffd200;
}

.category-value em {
  font-style: normal;
  font-size: 12px;
  font-weight: 400;
  color: #cfe6ff;
  margin-left: 4px;
}

.category-pct {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.category-tb {
  font-size: 13px;
  margin-left: auto;
}

/* ---------- 饼图旋转装饰环（参考站 `.e-pie img`，10s 一圈） ---------- */
.pie-spin-host {
  position: relative;
  width: 100%;
  height: 100%;
}

.pie-spin-deco {
  position: absolute;
  width: 238px;
  height: 238px;
  top: calc(50% - 119px);
  left: calc(50% - 119px);
  pointer-events: none;
  animation: pie-rotate 10s linear infinite;
}

@keyframes pie-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pie-spin-deco {
    animation: none;
  }
}

/* ---------- 卡内 TAB（与 TabChartCard 同款样式） ---------- */
.tab-btn-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 12px;
}

.chart-btn {
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 13px;
  line-height: 18px;
  border-radius: 2px;
  cursor: pointer;
  color: #c9d7ef;
  box-shadow: inset 0 0 11px 0 rgba(8, 138, 251, 0.4);
  border: 1px solid rgba(8, 138, 251, 0.35);
  background: rgba(10, 109, 190, 0.22);
  white-space: nowrap;
  transition: all 0.2s ease;
}

.chart-btn.chart-btn-select {
  color: #1a1408;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}
</style>
