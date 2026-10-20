<template>
  <MapPanelsLayout metric="fee">
    <!-- 左栏：总金额卡 + 消费金额 2×3 宫格 + 消费结构雷达 -->
    <template #left>
      <IndexCard
        :title="totalTitle"
        :value="totalValue"
        unit="亿元"
        :tb="totalTb"
      />

      <ChartCard name="消费金额" dom-id="fee-type-chart">
        <div class="entry-type-wrapper">
          <div
            v-for="t in feeTypes"
            :key="t.key"
            class="each-entry-type"
            :class="`type-${t.keyStr}`"
          >
            <div class="entry-icon">
              <el-icon><component :is="iconOf(t.keyStr)" /></el-icon>
            </div>
            <div class="entry-data">
              <div class="scale-wrapper sj-num">
                {{ wan(t.amt) }}<span class="unit-wrapper">亿元</span>
              </div>
              <div class="entry-bottom">
                <span class="entry-name">{{ t.name }}</span>
                <span class="yoy-ratio-name">同比</span>
                <span class="yoy-ratio-data sj-num" :class="t.tb >= 0 ? 'is-up' : 'is-down'">
                  {{ percent(Number(t.tb) * 100) }}%
                </span>
                <i class="ratio-arrow" :class="t.tb >= 0 ? 'is-up' : 'is-down'"></i>
              </div>
            </div>
          </div>
        </div>
      </ChartCard>

      <ChartCard name="消费结构">
        <BaseChart :option="radarOption" height="100%" />
      </ChartCard>
    </template>

    <!-- 底部居中：消费趋势 -->
    <template #center>
      <ChartCard name="消费趋势">
        <template #toolbar>
          <span class="trend-tabs">
            <span
              v-for="tab in trendTabs"
              :key="tab.key"
              class="trend-tab"
              :class="{ 'is-active': activeTrend === tab.key }"
              @click="activeTrend = tab.key"
            >
              {{ tab.short }}
            </span>
          </span>
        </template>
        <BaseChart :option="trendOption" height="100%" />
      </ChartCard>
    </template>

    <!-- 右栏：热门排行 + 分类消费排行 -->
    <template #right>
      <ChartCard name="热门排行">
        <template #toolbar>
          <span class="card-toolbar">
            <el-icon><Grid /></el-icon>
            <el-icon><FullScreen /></el-icon>
          </span>
        </template>
        <TableList
          :columns="rankColumns"
          :rows="hotRank"
          dom-id="fee-hot-rank"
          :value-in-wan="true"
        />
      </ChartCard>

      <ChartCard name="分类消费排行">
        <template #toolbar>
          <el-select v-model="rankType" size="small" class="rank-select">
            <el-option v-for="t in feeTypes" :key="t.key" :label="t.name" :value="t.key" />
          </el-select>
        </template>
        <TableList
          :columns="rankColumns"
          :rows="typeRank"
          dom-id="fee-type-rank"
          :value-in-wan="true"
        />
      </ChartCard>
    </template>
  </MapPanelsLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TableList from '@/components/TableList.vue'
import MapPanelsLayout from '@/views/common/MapPanelsLayout.vue'
import IndexCard from '@/components/IndexCard.vue'
import { FEE_TYPES } from '@/mock/realdata'
import { HOLIDAY_FEE, HOLIDAY_RANK_FEE, buildHolidaySeries } from '@/mock/holiday2026'
import { percent } from '@/utils/format'

/**
 * 旅游消费页 —— 版式 1:1 对齐参考站 `/main/trend/fee`（CDP 实测）：
 *   .main-outer            地图铺满 1920×980
 *   .layout-wrapper        绝对定位覆盖，flex 两端对齐，pointer-events:none
 *     .left-part-wrapper   24%    3 张卡各 ~33% 高
 *     .right-part-wrapper  24%    2 张卡各 ~50% 高
 *     .center-part-wrapper calc(52% - 40px)  底部居中
 * 数据：2026 年国庆节假期（10 月 1 日 - 10 月 7 日）松江区口径，
 * 见 src/mock/holiday2026.js（来源与推演规则同文件 DATA_SOURCES）。
 */
const breakdown = HOLIDAY_FEE

const totalTitle = computed(() => '旅游消费总金额(累计)')
const totalValue = computed(() => (breakdown['总'].amt / 1e8).toFixed(2))
const totalTb = computed(() => breakdown['总'].tb)

const feeTypes = computed(() =>
  FEE_TYPES.map((t) => ({
    ...t,
    amt: breakdown[t.key] ? breakdown[t.key].amt : 0,
    tb: breakdown[t.key] && breakdown[t.key].tb !== null ? breakdown[t.key].tb : 0
  }))
)

const iconOf = (keyStr) =>
  ({
    food: 'Bowl',
    live: 'House',
    traffic: 'Van',
    travel: 'Suitcase',
    shopping: 'ShoppingCart',
    entertainment: 'MagicStick'
  })[keyStr] || 'DataLine'

const wan = (v) => (Number(v) / 1e8).toFixed(2)

/* ---------- 消费结构雷达 ---------- */
const radarOption = computed(() => {
  const items = feeTypes.value
  const data = items.map((t) => Number((t.amt / 1e8).toFixed(2)))
  const sum = data.reduce((a, b) => a + b, 0) || 1
  const max = Math.max(...data, 1)
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(3, 28, 52, 0.95)',
      borderColor: 'rgba(8, 138, 251, 0.6)',
      textStyle: { color: '#fff', fontSize: 13 }
    },
    radar: {
      center: ['50%', '55%'],
      radius: '66%',
      indicator: items.map((t) => ({ name: t.name, max: max * 1.15 })),
      axisName: {
        color: 'rgba(220,238,255,.92)',
        fontSize: 14,
        formatter: (name) => name
      },
      nameGap: 6,
      splitNumber: 4,
      splitLine: { lineStyle: { color: 'rgba(8,138,251,.28)' } },
      splitArea: { areaStyle: { color: ['rgba(8,138,251,.10)', 'rgba(8,138,251,.03)'] } },
      axisLine: { lineStyle: { color: 'rgba(8,138,251,.35)' } }
    },
    series: [
      {
        type: 'radar',
        symbolSize: 5,
        areaStyle: { color: 'rgba(8,138,251,.40)' },
        lineStyle: { color: '#7ad4ff', width: 2 },
        itemStyle: { color: '#ffd200' },
        label: {
          show: true,
          color: '#fff',
          fontSize: 12,
          // 参考站雷达标签显示占比（如 27.56%）
          formatter: ({ value }) => `${((value / sum) * 100).toFixed(2)}%`
        },
        data: [{ value: data, name: '消费结构' }]
      }
    ]
  }
})

/* ---------- 消费趋势（总体/吃/住/行/游/购/娱） ---------- */
const trendTabs = [
  { key: 'all', short: '总体' },
  { key: '吃', short: '吃' },
  { key: '住', short: '住' },
  { key: '行', short: '行' },
  { key: '游', short: '游' },
  { key: '购', short: '购' },
  { key: '娱', short: '娱' }
]
const activeTrend = ref('all')

const trendOption = computed(() => {
  // 总体 → 取「总」，其余取对应分项；序列为假期 7 天（2026 vs 2025 同期）
  const key = activeTrend.value === 'all' ? '总' : activeTrend.value
  const series = buildHolidaySeries('fee', key)
  const labels = series.labels
  const cur = series.dataDisp
  const last = series.lastDataDisp
  const tbLine = cur.map((v, i) => (last[i] ? Number(((v / last[i] - 1) * 100).toFixed(2)) : 0))

  const axisLabel = { color: 'rgba(180, 220, 255, 0.78)', fontSize: 12 }
  const splitLine = { lineStyle: { color: 'rgba(8, 138, 251, 0.14)', type: 'dashed' } }
  const axisLine = { lineStyle: { color: 'rgba(8, 138, 251, 0.45)' } }

  return {
    grid: { left: 14, right: 52, top: 46, bottom: 26, containLabel: true },
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(3, 28, 52, 0.95)',
      borderColor: 'rgba(8, 138, 251, 0.6)',
      textStyle: { color: '#fff', fontSize: 13 },
      valueFormatter: (v) => Number(v).toFixed(2)
    },
    legend: {
      data: ['2026年', '2025年', '同比'],
      textStyle: { color: 'rgba(180, 220, 255, 0.85)', fontSize: 13 },
      itemWidth: 12,
      itemHeight: 8,
      top: 6,
      right: 20
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine,
      axisTick: { show: false },
      axisLabel
    },
    yAxis: [
      {
        type: 'value',
        name: '亿元',
        nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 12 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel,
        splitLine
      },
      {
        type: 'value',
        name: '%',
        nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 12 },
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel,
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '2026年',
        type: 'bar',
        barMaxWidth: 18,
        barGap: '10%',
        itemStyle: { color: '#ffd200', borderRadius: [2, 2, 0, 0] },
        label: { show: true, position: 'top', color: '#ffd200', fontSize: 11, formatter: ({ value }) => Number(value).toFixed(1) },
        data: cur
      },
      {
        name: '2025年',
        type: 'bar',
        barMaxWidth: 18,
        itemStyle: { color: '#088afb', borderRadius: [2, 2, 0, 0] },
        data: last
      },
      {
        name: '同比',
        type: 'line',
        yAxisIndex: 1,
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#2fd27a', width: 2 },
        itemStyle: { color: '#2fd27a' },
        data: tbLine
      }
    ]
  }
})

/* ---------- 排行 ---------- */
/** 与参考站一致：排名(48) / 区域(122) / 消费金额(80) / 同比(69) */
const rankColumns = [
  { label: '区域', prop: 'region_name', align: 'left', width: 122 },
  { label: '消费金额', prop: 'all_value', width: 92, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]

/**
 * 热门排行 = **松江区 17 个街镇** 2026 年国庆节假期消费排行。
 * 口径说明：平台区域维度只到区县，街镇无独立监测值，
 * 故按街镇文旅消费体量对假期区级消费总额（13.69 亿元）做分布测算，
 * 合计与区级值严格一致（src/mock/holiday2026.js）。
 */
const hotRank = computed(() => HOLIDAY_RANK_FEE.map((d) => ({ ...d })))

const rankType = ref('吃')

/**
 * 分类消费排行：该分类在**松江区的假期总额** × 各街镇消费占比。
 * 假期分项取自 data-picture 参考图（如餐饮 3.91 亿元），街镇按消费体量占比分配。
 */
const typeRank = computed(() => {
  const key = rankType.value
  const sjAmt = breakdown[key] ? breakdown[key].amt : 0
  const ratio = sjAmt / breakdown['总'].amt
  return HOLIDAY_RANK_FEE.map((d) => ({
    region_name: d.region_name,
    all_value: Math.round(d.all_value * ratio),
    tb_all_value: d.tb_all_value
  })).sort((a, b) => b.all_value - a.all_value)
})
</script>

<style scoped>
.ratio-value.is-up,
.yoy-ratio-data.is-up {
  color: #ff5b5b;
}

.ratio-value.is-down,
.yoy-ratio-data.is-down {
  color: #2fd27a;
}

/* ---------- 消费金额 2×3 宫格 ---------- */
.entry-type-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: 4px 6px;
  box-sizing: border-box;
  gap: 6px;
}

.entry-type-wrapper .each-entry-type {
  width: calc(50% - 3px);
  height: calc(33.33% - 4px);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  box-sizing: border-box;
  border-radius: 3px;
  background: linear-gradient(180deg, rgba(10, 109, 190, 0.42), rgba(4, 30, 56, 0.3));
  border: 1px solid rgba(8, 138, 251, 0.25);
}

.entry-icon {
  width: 26px;
  height: 26px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 15px;
  color: #04121f;
  background: linear-gradient(180deg, #7ad4ff, #088afb);
}

.type-live .entry-icon {
  background: linear-gradient(180deg, #a5ffd6, #2fd27a);
}
.type-traffic .entry-icon {
  background: linear-gradient(180deg, #ffd9a3, #ff8b4d);
}
.type-travel .entry-icon {
  background: linear-gradient(180deg, #f6d76a, #d8b048);
}
.type-shopping .entry-icon {
  background: linear-gradient(180deg, #d8b4ff, #b47aff);
}
.type-entertainment .entry-icon {
  background: linear-gradient(180deg, #ffb4c8, #ff5b8b);
}

.entry-data {
  flex: 1;
  min-width: 0;
}

.scale-wrapper {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  white-space: nowrap;
}

.scale-wrapper .unit-wrapper {
  font-size: 12px;
  font-weight: 400;
  color: #cfe6ff;
  margin-left: 3px;
}

.entry-bottom {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #cfe6ff;
  white-space: nowrap;
}

.yoy-ratio-name {
  color: #7ad4ff;
}

.yoy-ratio-data {
  font-weight: 700;
}

/* ---------- 趋势切换 ---------- */
.trend-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 14px;
}

.trend-tab {
  padding: 1px 9px;
  font-size: 13px;
  border-radius: 2px;
  cursor: pointer;
  color: #cfe6ff;
  border: 1px solid rgba(8, 138, 251, 0.4);
  background: rgba(10, 109, 190, 0.25);
}

.trend-tab.is-active {
  color: #1a1408;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}

.card-toolbar {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 14px;
  color: #7ad4ff;
  font-size: 16px;
}

.rank-select {
  width: 96px;
  margin-right: 10px;
}
</style>
