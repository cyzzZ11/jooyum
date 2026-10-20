<template>
  <!--
    趋势图卡片：对应参考站 `.trend-chart-card-wrapper`（537×359，高频态势 6 张之一）。
    参考站真实内部结构（CDP 实测，chunk-1b0fcab6）：
      .chart-card-content
        .chart-panel
          .chart-title.title-with-bg.full-title-bg        537×37
          .content-wrapepr.trend-chart-panel.content-wrapepr--flex   537×312
            .trend-summary-bar    537×40   ← 摘要条在**标题之下、图表之上**
              i.el-icon-info      18×18
              span.trend-summary-text  491×26（内含多个 span.summary-chunk）
            .e-linechart          537×260  ← 折线图
    摘要条文案实测格式：
      「9月，上海市旅游消费累计1.04亿元，同比增长6.4%。」
  -->
  <div class="trend-chart-card">
    <div class="chart-card-content">
      <div class="chart-panel">
        <div class="chart-title title-with-bg full-title-bg">
          <i class="title-before-bar"></i>
          <label>{{ name }}</label>
          <div class="chart-title-right">
            <span class="title-extra-unit-wrapper">(单位:{{ unit }})</span>
          </div>
        </div>

        <div class="content-wrapepr trend-chart-panel content-wrapepr--flex">
          <div class="trend-summary-bar">
            <el-icon class="trend-summary-bar__icon"><InfoFilled /></el-icon>
            <span class="trend-summary-text">
              <template v-if="summary">
                <span class="summary-chunk">{{ summary.time }}，{{ summary.region }}{{ summary.label }}</span>
                <span class="summary-chunk summary-nowrap">
                  <span class="summary-highlight sj-num">{{ summary.value }}</span>{{ summary.unit }}
                </span>
                <span class="summary-chunk">，{{ summary.tbLabel }}</span>
                <span class="summary-chunk summary-nowrap">
                  <span class="summary-highlight sj-num">{{ percent(summary.tb) }}%</span>
                </span>
                <span class="summary-chunk">。</span>
              </template>
              <template v-else>暂无摘要数据</template>
            </span>
          </div>

          <div v-loading="loading" element-loading-background="rgba(3, 20, 35, .4)" class="e-linechart">
            <BaseChart :option="option" height="100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from './BaseChart.vue'
import { buildTrendOption } from '@/utils/chart'
import { percent } from '@/utils/format'

const props = defineProps({
  /** 参考站字段名：trendFeeData / trendCityData ... */
  data: { type: Object, default: null },
  name: { type: String, required: true },
  unit: { type: String, default: '万人次' },
  color: { type: String, default: '#088afb' },
  domId: { type: String, default: '' },
  loading: { type: Boolean, default: false }
})

const summary = computed(() => (props.data ? props.data.summary : null))

/**
 * 双系列折线：**当年 vs 去年同期**。
 *
 * 参考站实测（CDP 读取 SVG path）：
 *   每张趋势图为 **2 条折线**，均无区域填充（`fill="none"`）
 *     当年     stroke `#FCCE25`（金黄）
 *     去年同期 stroke `rgb(31,222,219)` ≈ `#1FDEDB`（青）
 *   X 轴为 **12 个月滚动窗口**（实测区间 2025-10 → 2026-09）
 *   图例文字：`当年` / `去年同期`
 */
const CURRENT_COLOR = '#FCCE25'
const LAST_COLOR = '#1FDEDB'

const option = computed(() => {
  const d = props.data
  if (!d) return {}
  const cur = d.dataDisp || d.data || []
  const last = d.lastDataDisp || d.lastData || []
  return buildTrendOption({
    xData: d.labels,
    series: [
      { name: '当年', data: cur, color: CURRENT_COLOR, type: 'line' },
      { name: '去年同期', data: last, color: LAST_COLOR, type: 'line' }
    ],
    unit: d.seriesUnit || props.unit,
    legend: true,
    showDataZoom: d.labels && d.labels.length > 16,
    yScale: 1,
    yUnit: ''
  })
})
</script>

<style scoped>
.trend-chart-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: linear-gradient(180deg, rgba(4, 30, 56, 0.92), rgba(2, 18, 36, 0.88));
  border: 1px solid rgba(8, 138, 251, 0.22);
  border-radius: 3px;
}

.chart-card-content,
.chart-panel {
  width: 100%;
  height: 100%;
}

.chart-panel {
  display: flex;
  flex-direction: column;
}

/* --- 标题：实测 537×37（full-title-bg 变体高度略小于普通卡） --- */
.chart-title {
  position: relative;
  width: 100%;
  height: 37px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  box-sizing: border-box;
}

.chart-title.title-with-bg {
  background: url('/img/s-menu.5e84380d.png') no-repeat;
  background-size: 100% 100%;
}

.chart-title .title-before-bar {
  width: 3px;
  height: 14px;
  background: #088afb;
  position: absolute;
  left: 10px;
  top: 11px;
}

.chart-title label {
  margin-left: 34px;
  line-height: 30px;
  font-size: 22px;
  font-family: titleText, 'Microsoft YaHei', sans-serif;
  color: #fff;
  letter-spacing: 1px;
  text-shadow: 0 0 6px #002b53;
  white-space: nowrap;
}

.chart-title-right {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.title-extra-unit-wrapper {
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.8);
  white-space: nowrap;
}

/* --- 内容区：实测 537×312，flex 列 --- */
.content-wrapepr {
  width: 100%;
  height: calc(100% - 37px);
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
}

.content-wrapepr--flex {
  display: flex;
  flex-direction: column;
}

/* --- 摘要条：实测 537×40，位于内容区顶部 --- */
.trend-summary-bar {
  width: 100%;
  height: 40px;
  flex-shrink: 0;
  padding: 0 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.trend-summary-bar__icon {
  color: #088afb;
  margin-right: 6px;
  font-size: 18px;
  flex-shrink: 0;
}

.trend-summary-text {
  flex: 1;
  min-width: 0;
  font-size: 14px;
  line-height: 1.3;
  color: hsla(0, 0%, 100%, 0.9);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary-chunk {
  display: inline;
}

.summary-nowrap {
  white-space: nowrap;
}

.summary-highlight {
  color: #ffd200;
  font-weight: 700;
}

/* --- 折线图：实测 537×260 --- */
.e-linechart {
  flex: 1;
  min-height: 0;
  position: relative;
}
</style>
