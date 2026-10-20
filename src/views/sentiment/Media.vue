<template>
  <!-- 媒体分析：实测根类名 .media-analysis-page（三栏等宽，同舆情分析） -->
  <div class="media-analysis-page">
    <div class="layout-wrapper">
      <div class="left-part-wrapper">
        <ChartCard name="媒体来源占比">
          <div class="media-ratio-wrapper">
            <BaseChart :option="ratioOption" height="100%" />
            <div class="media-ratio-center">
              <div class="center-label">媒体总量</div>
              <div class="center-value sj-num">12,846</div>
            </div>
          </div>
        </ChartCard>

        <ChartCard name="媒体类型分布">
          <BaseChart :option="typeOption" height="100%" />
        </ChartCard>
      </div>

      <div class="center-part-wrapper">
        <ChartCard name="媒体报道趋势">
          <template #toolbar>
            <span class="trend-tabs">
              <span
                v-for="t in tabs"
                :key="t.key"
                class="trend-tab"
                :class="{ 'is-active': tab === t.key }"
                @click="tab = t.key"
              >
                {{ t.name }}
              </span>
            </span>
          </template>
          <BaseChart :option="trendOption" height="100%" />
        </ChartCard>

        <ChartCard name="媒体传播力排行">
          <TableList :columns="mediaColumns" :rows="mediaRank" dom-id="media-rank" />
        </ChartCard>
      </div>

      <div class="right-part-wrapper">
        <ChartCard name="热门报道">
          <TableList :columns="reportColumns" :rows="reports" dom-id="media-reports" />
        </ChartCard>

        <ChartCard name="媒体活跃度">
          <BaseChart :option="activeOption" height="100%" />
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
import { SENTIMENT_MEDIA } from '@/mock/realdata'

/**
 * 媒体分析页（参考站 `/main/sentiment/media`，chunk-48777a58）。
 *
 * 版式**从反编译 CSS 还原**：
 *   .media-analysis-page .layout-wrapper { gap:30px }
 *   .left/center/right-part-wrapper      { width:calc(33.33333% - 6.66667px); flex-column; gap:30px }
 *   .media-ratio-wrapper / .media-ratio-pie { width:100%; height:100%; position:relative }
 *   .media-ratio-center { position:absolute; left:50%; top:50%; transform:translate(-50%,-50%) }
 *
 * ⚠️ 本账号无「舆情监测」模块权限，数据为松江区场景的合理示例（页面已标注）。
 */
const tabs = [
  { key: 'day', name: '日度' },
  { key: 'week', name: '周度' }
]
const tab = ref('day')

const total = 12846

const ratioOption = computed(() => ({
  tooltip: { trigger: 'item', valueFormatter: (v) => v + '%' },
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
      radius: ['52%', '76%'],
      center: ['36%', '50%'],
      itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
      label: { show: false },
      data: SENTIMENT_MEDIA.map((m) => ({ name: m.name, value: Number((m.ratio * 100).toFixed(1)) }))
    }
  ]
}))

const typeOption = computed(() => {
  const list = [
    { name: '图文报道', v: 42.6 },
    { name: '短视频', v: 31.4 },
    { name: '直播', v: 12.8 },
    { name: '长视频', v: 8.6 },
    { name: '其他', v: 4.6 }
  ]
  return {
    grid: { left: 10, right: 44, top: 8, bottom: 4, containLabel: true },
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
        data: list.map((c) => c.v)
      }
    ]
  }
})

const trendOption = computed(() => {
  const labels =
    tab.value === 'day'
      ? Array.from({ length: 14 }, (_, i) => `10-${String(i + 1).padStart(2, '0')}`)
      : ['第1周', '第2周', '第3周', '第4周', '第5周', '第6周']
  const base = [268, 312, 246, 358, 402, 376, 448, 362, 428, 486, 442, 398, 462, 512]
  const data = base.slice(0, labels.length)
  return {
    grid: { left: 12, right: 20, top: 34, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis' },
    legend: {
      data: ['报道量'],
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
      name: '篇',
      nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(8,138,251,.14)', type: 'dashed' } }
    },
    series: [
      {
        name: '报道量',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 5,
        itemStyle: { color: '#7ad4ff' },
        lineStyle: { color: '#088afb', width: 2 },
        areaStyle: {
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(8,138,251,.45)' },
              { offset: 1, color: 'rgba(8,138,251,.03)' }
            ]
          }
        },
        data
      }
    ]
  }
})

const mediaColumns = [
  { label: '媒体', prop: 'region_name', align: 'left', width: 130 },
  { label: '传播力', prop: 'all_value', width: 92, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]
const mediaRank = [
  { region_name: '微信公众号', all_value: 3674, tb_all_value: 0.286 },
  { region_name: '抖音/快手', all_value: 3122, tb_all_value: 0.418 },
  { region_name: '小红书', all_value: 2402, tb_all_value: 0.562 },
  { region_name: '微博', all_value: 1824, tb_all_value: 0.124 },
  { region_name: '新闻网站', all_value: 1104, tb_all_value: -0.086 },
  { region_name: '其他', all_value: 720, tb_all_value: 0.048 }
]

const reportColumns = [
  { label: '报道', prop: 'region_name', align: 'left', width: 150 },
  { label: '阅读量', prop: 'all_value', width: 92, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]
const reports = [
  { region_name: '佘山度假区暑期客流创新高', all_value: 128600, tb_all_value: 0.412 },
  { region_name: '广富林夜游获游客好评', all_value: 96400, tb_all_value: 0.286 },
  { region_name: '欢乐谷电音节现场秩序良好', all_value: 87200, tb_all_value: 0.338 },
  { region_name: '泗泾古镇开街首周超预期', all_value: 73600, tb_all_value: 0.562 },
  { region_name: '松江印象城消费季拉动夜客流', all_value: 64800, tb_all_value: 0.174 },
  { region_name: '云间粮仓文创市集人气旺盛', all_value: 59400, tb_all_value: 0.238 }
]

const activeOption = computed(() => {
  const labels = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  const data = [168, 182, 176, 194, 246, 386, 342]
  return {
    grid: { left: 10, right: 20, top: 16, bottom: 20, containLabel: true },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: 'rgba(8,138,251,.45)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 }
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(8,138,251,.14)', type: 'dashed' } }
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 22,
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
        data
      }
    ]
  }
})
</script>

<style scoped>
/* 版式取自 _ref/css/chunk-48777a58.css */
.media-analysis-page {
  width: 100%;
  height: 100%;
  position: relative;
  box-sizing: border-box;
  color: #fff;
}

.media-analysis-page .layout-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 30px;
  box-sizing: border-box;
}

.media-analysis-page .left-part-wrapper,
.media-analysis-page .center-part-wrapper,
.media-analysis-page .right-part-wrapper {
  width: calc(33.33333% - 6.66667px);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 30px;
}

.media-ratio-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

.media-ratio-center {
  position: absolute;
  left: 36%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  pointer-events: none;
  z-index: 2;
}

.media-ratio-center .center-label {
  font-size: 14px;
  color: rgba(201, 215, 239, 0.95);
  margin-bottom: 4px;
}

.media-ratio-center .center-value {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 0 6px #007eff, 0 0 3px #007eff;
  line-height: 1.2;
}

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
