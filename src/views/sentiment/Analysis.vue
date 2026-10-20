<template>
  <!-- 舆情分析：三栏等宽版式，实测 class 前缀 .sentiment-analysis-page -->
  <div class="sentiment-analysis-page">
    <div class="layout-wrapper">
      <!-- 左栏：舆情总览 + 情感倾向 + 渠道分布 -->
      <div class="left-part-wrapper">
        <ChartCard name="舆情总览">
          <div class="overview-wrapper">
            <div v-for="k in overviewKpis" :key="k.name" class="little-card-wrapper">
              <div class="each-overview-wrapper">
                <span class="overview-name">{{ k.name }}</span>
                <div class="overview-data-unit-wrapper">
                  <span class="overview-data sj-num">{{ k.value }}</span>
                  <span class="overview-unit-wrapper">{{ k.unit }}</span>
                </div>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard name="情感倾向">
          <div class="emotion-wrapper">
            <div class="emotion-pie">
              <BaseChart :option="emotionOption" height="100%" />
            </div>
            <div class="emotion-legend">
              <div v-for="e in emotions" :key="e.name" class="emotion-legend-item">
                <i class="legend-dot" :style="{ background: e.color }"></i>
                <span class="legend-name">{{ e.name }}</span>
                <span class="legend-percent sj-num">{{ e.pct }}%</span>
                <span class="legend-value sj-num">{{ e.value }}</span>
              </div>
            </div>
          </div>
        </ChartCard>

        <ChartCard name="渠道分布">
          <BaseChart :option="channelOption" height="100%" />
        </ChartCard>
      </div>

      <!-- 中栏：舆情趋势 + 热点话题 -->
      <div class="center-part-wrapper">
        <ChartCard name="舆情趋势">
          <template #toolbar>
            <span class="trend-tabs">
              <span
                v-for="t in trendTabs"
                :key="t.key"
                class="trend-tab"
                :class="{ 'is-active': trendTab === t.key }"
                @click="trendTab = t.key"
              >
                {{ t.name }}
              </span>
            </span>
          </template>
          <BaseChart :option="trendOption" height="100%" />
        </ChartCard>

        <ChartCard name="热点话题">
          <TableList :columns="topicColumns" :rows="topics" dom-id="sentiment-topics" />
        </ChartCard>
      </div>

      <!-- 右栏：区域分布 + 重点关注 -->
      <div class="right-part-wrapper">
        <ChartCard name="区域舆情分布">
          <BaseChart :option="areaOption" height="100%" />
        </ChartCard>

        <ChartCard name="重点关注">
          <TableList :columns="focusColumns" :rows="focusList" dom-id="sentiment-focus" />
        </ChartCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TableList from '@/components/TableList.vue'
import { SENTIMENT_CHANNEL, SENTIMENT_EMOTION, SENTIMENT_FOCUS, SENTIMENT_TOPICS, SENTIMENT_TREND } from '@/mock/realdata'

/**
 * 舆情分析页。
 *
 * 版式**从反编译的 CSS 还原**（`_ref/css/chunk-1ee8bc2e.css`）：
 *   .sentiment-analysis-page .layout-wrapper   { width:100%; height:100%; display:flex;
 *                                                justify-content:space-between; gap:30px }
 *   .left/center/right-part-wrapper            { width:calc(33.33333% - 6.66667px); height:100%;
 *                                                display:flex; flex-direction:column;
 *                                                justify-content:space-between; gap:30px }
 *   .overview-wrapper .little-card-wrapper     { width:calc(33% - 6px); height:calc(33% - 8px) }
 *   .emotion-wrapper .emotion-pie              { width:48% }  .emotion-legend { width:52% }
 *
 * 说明：本项目账号无「舆情监测」模块权限，参考站看不到渲染页，
 * 本页依据反编译的 CSS/模板结构重建；数据为松江区口径的合理示例。
 */
const overviewKpis = computed(() => [
  { name: '舆情总量', value: '12,846', unit: '条' },
  { name: '正面占比', value: '86.4', unit: '%' },
  { name: '今日新增', value: '428', unit: '条' }
])

const emotions = computed(() =>
  SENTIMENT_EMOTION.map((e) => ({ ...e, pct: (e.ratio * 100).toFixed(1), value: Math.round(12846 * e.ratio) }))
)

const emotionOption = computed(() => ({
  tooltip: { trigger: 'item', valueFormatter: (v) => v + '%' },
  color: SENTIMENT_EMOTION.map((e) => e.color),
  series: [
    {
      type: 'pie',
      radius: ['46%', '72%'],
      center: ['50%', '50%'],
      itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
      label: { color: 'rgba(220,238,255,.9)', fontSize: 11, formatter: '{d}%' },
      labelLine: { length: 6, length2: 6, lineStyle: { color: 'rgba(8,138,251,.6)' } },
      data: SENTIMENT_EMOTION.map((e) => ({ name: e.name, value: Number((e.ratio * 100).toFixed(1)) }))
    }
  ]
}))

const channelOption = computed(() => {
  const list = SENTIMENT_CHANNEL
  return {
    grid: { left: 10, right: 40, top: 8, bottom: 4, containLabel: true },
    tooltip: { trigger: 'axis', valueFormatter: (v) => v + '%' },
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
              { offset: 0, color: 'rgba(8,138,251,.45)' },
              { offset: 1, color: '#7ad4ff' }
            ]
          }
        },
        label: { show: true, position: 'right', color: '#ffd200', fontSize: 11, formatter: '{c}%' },
        data: list.map((c) => Number((c.ratio * 100).toFixed(1)))
      }
    ]
  }
})

/* ---------- 舆情趋势 ---------- */
const trendTabs = [
  { key: 'day', name: '日度' },
  { key: 'week', name: '周度' }
]
const trendTab = ref('day')

const trendOption = computed(() => {
  const labels =
    trendTab.value === 'day'
      ? Array.from({ length: 14 }, (_, i) => `10-${String(i + 1).padStart(2, '0')}`)
      : ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周']
  const pos = SENTIMENT_TREND.pos.slice(0, labels.length)
  const neu = SENTIMENT_TREND.neu.slice(0, labels.length)
  const neg = SENTIMENT_TREND.neg.slice(0, labels.length)
  return {
    grid: { left: 10, right: 20, top: 34, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['正面', '中性', '负面'],
      textStyle: { color: 'rgba(180,220,255,.85)', fontSize: 12 },
      itemWidth: 12,
      itemHeight: 8,
      top: 4
    },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: 'rgba(8,138,251,.45)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      name: '条',
      nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(8,138,251,.14)', type: 'dashed' } }
    },
    series: [
      { name: '正面', type: 'bar', stack: 'a', barMaxWidth: 18, itemStyle: { color: '#2fd27a' }, data: pos },
      { name: '中性', type: 'bar', stack: 'a', itemStyle: { color: '#7ad4ff' }, data: neu },
      { name: '负面', type: 'bar', stack: 'a', itemStyle: { color: '#ff5b5b', borderRadius: [2, 2, 0, 0] }, data: neg }
    ]
  }
})

/* ---------- 表格 ---------- */
const topicColumns = [
  { label: '话题', prop: 'region_name', align: 'left', width: 150 },
  { label: '热度', prop: 'all_value', width: 90, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]
const topics = computed(() => SENTIMENT_TOPICS.map((t) => ({ ...t })))

const focusColumns = [
  { label: '事件', prop: 'region_name', align: 'left', width: 150 },
  { label: '涉及量', prop: 'all_value', width: 90, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]
const focusList = computed(() => SENTIMENT_FOCUS.map((t) => ({ ...t })))

/* ---------- 区域分布 ---------- */
const areaOption = computed(() => {
  const list = [
    { name: '佘山镇', v: 18.6 }, { name: '方松街道', v: 15.2 }, { name: '岳阳街道', v: 12.4 },
    { name: '广富林街道', v: 11.8 }, { name: '中山街道', v: 9.6 }, { name: '泗泾镇', v: 8.9 },
    { name: '车墩镇', v: 7.2 }, { name: '九亭镇', v: 6.4 }, { name: '其他', v: 9.9 }
  ]
  return {
    grid: { left: 10, right: 40, top: 8, bottom: 4, containLabel: true },
    tooltip: { trigger: 'axis', valueFormatter: (v) => v + '%' },
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
              { offset: 0, color: 'rgba(255,210,0,.35)' },
              { offset: 1, color: '#ffd200' }
            ]
          }
        },
        label: { show: true, position: 'right', color: '#ffd200', fontSize: 11, formatter: '{c}%' },
        data: list.map((c) => c.v)
      }
    ]
  }
})
</script>

<style scoped>
/* 版式取自 _ref/css/chunk-1ee8bc2e.css（逐条对应该页的真实规则） */
.sentiment-analysis-page {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}

.sentiment-analysis-page .layout-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  box-sizing: border-box;
}

.sentiment-analysis-page .left-part-wrapper,
.sentiment-analysis-page .center-part-wrapper,
.sentiment-analysis-page .right-part-wrapper {
  width: calc(33.33333% - 6.66667px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
  box-sizing: border-box;
}

/* .overview-wrapper .little-card-wrapper：width calc(33% - 6px) */
.overview-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  gap: 10px;
  padding: 2px 4px 6px;
  box-sizing: border-box;
}

.little-card-wrapper {
  width: calc(33% - 6px);
  background: url('/img/entry-type-bg.b730a0bd.png') no-repeat;
  background-size: 100% 100%;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  color: #fff;
}

.each-overview-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.overview-name {
  font-size: 14px;
  color: rgba(201, 215, 239, 0.95);
}

.overview-data-unit-wrapper {
  display: flex;
  align-items: flex-end;
}

.overview-data {
  font-size: 22px;
  font-weight: 700;
  color: #ffd200;
}

.overview-unit-wrapper {
  margin-bottom: 3px;
  margin-left: 4px;
  font-size: 12px;
  opacity: 0.8;
}

/* .emotion-wrapper */
.emotion-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
}

.emotion-pie {
  width: 48%;
  height: 100%;
}

.emotion-legend {
  width: 52%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  padding-left: 8px;
  color: #fff;
}

.emotion-legend-item {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 1;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  margin-right: 8px;
  flex-shrink: 0;
}

.legend-name {
  width: 48px;
  color: rgba(201, 215, 239, 0.95);
}

.legend-percent {
  width: 62px;
  font-weight: 700;
  color: #fff;
}

.legend-value {
  flex: 1;
  text-align: right;
  color: rgba(165, 209, 255, 0.95);
}

/* 趋势切换 */
.trend-tabs {
  display: flex;
  align-items: center;
  gap: 4px;
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
</style>
