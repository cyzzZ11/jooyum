<template>
  <!-- 企业监测：实测 .HYAnalysis 外壳 + 上方卡片区 / 下方列表 -->
  <SideMenuLayout :menus="menus" source-text="数据来源：松江区文旅企业名录（示例数据）" back-text="企业名录">
    <div class="company-main-wrapper">
      <div class="main-top-wrapper">
        <div class="w-1-2">
          <ChartCard name="企业规模分布">
            <BaseChart :option="scaleOption" height="100%" />
          </ChartCard>
        </div>
        <div class="w-1-4">
          <ChartCard name="监测状态">
            <div class="status-list">
              <div v-for="s in statusList" :key="s.name" class="status-item">
                <span class="status-dot" :style="{ background: s.color }"></span>
                <span class="status-name">{{ s.name }}</span>
                <span class="status-value sj-num">{{ s.value }}</span>
                <span class="status-unit">家</span>
              </div>
            </div>
          </ChartCard>
        </div>
        <div class="w-1-4">
          <ChartCard name="异常预警">
            <div class="status-list">
              <div v-for="a in alerts" :key="a.name" class="status-item">
                <span class="status-dot" :style="{ background: a.color }"></span>
                <span class="status-name">{{ a.name }}</span>
                <span class="status-value sj-num">{{ a.value }}</span>
                <span class="status-unit">家</span>
              </div>
            </div>
          </ChartCard>
        </div>
      </div>

      <div class="main-bottom-wrapper">
        <ListPage
          title="企业监测列表"
          :columns="columns"
          :rows="rows"
          search-prop="name"
          search-placeholder="搜索企业名称"
          :page-size="8"
        />
      </div>
    </div>
  </SideMenuLayout>
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import ListPage from '@/views/common/ListPage.vue'
import SideMenuLayout from '@/views/common/SideMenuLayout.vue'

/**
 * 产业洞察 · 企业监测（参考站 `/main/industry/CompanyMonitor`，chunk-1b2c6391）。
 *
 * 版式**从反编译 CSS 还原**：
 *   .content-main-wrapper .main-top-wrapper { height:calc(50% - 10px) }（含 .w-1/2、.w-1/4 分栏）
 *   .content-top-wrapper.justify-end / .area-select-wrapper { position:absolute; top:-30px; left:22px }
 *   .card-list-outer { display:flex; justify-content:space-between }
 *
 * ⚠️ 本账号无「产业洞察」模块权限，数据为松江区文旅企业的合理示例（页面已标注）。
 */
const menus = [
  { key: 'overview', name: '产业总览' },
  { key: 'map', name: '产业图谱' },
  { key: 'analysis', name: '链数分析' },
  { key: 'company', name: '企业监测' }
]

const scaleOption = computed(() => {
  const labels = ['大型', '中型', '小型', '微型']
  const data = [12, 68, 248, 362]
  return {
    grid: { left: 12, right: 24, top: 20, bottom: 22, containLabel: true },
    tooltip: { trigger: 'axis' },
    xAxis: {
      type: 'category',
      data: labels,
      axisLine: { lineStyle: { color: 'rgba(8,138,251,.45)' } },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 12 }
    },
    yAxis: {
      type: 'value',
      name: '家',
      nameTextStyle: { color: 'rgba(180,220,255,.8)', fontSize: 11 },
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: 'rgba(180,220,255,.78)', fontSize: 11 },
      splitLine: { lineStyle: { color: 'rgba(8,138,251,.14)', type: 'dashed' } }
    },
    series: [
      {
        type: 'bar',
        barMaxWidth: 34,
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: {
            type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: '#7ad4ff' },
              { offset: 1, color: 'rgba(8,138,251,.25)' }
            ]
          }
        },
        label: { show: true, position: 'top', color: '#ffd200', fontSize: 12 },
        data
      }
    ]
  }
})

const statusList = [
  { name: '正常运营', value: 642, color: '#2fd27a' },
  { name: '重点关注', value: 48, color: '#ffd200' },
  { name: '暂停营业', value: 26, color: '#ff8b4d' },
  { name: '已注销', value: 14, color: '#9fb6d4' }
]

const alerts = [
  { name: '营收异常下滑', value: 18, color: '#ff5b5b' },
  { name: '客流明显减少', value: 12, color: '#ff8b4d' },
  { name: '证照即将到期', value: 26, color: '#ffd200' },
  { name: '投诉集中出现', value: 8, color: '#b47aff' }
]

const columns = [
  { label: '企业名称', prop: 'name', minWidth: 260 },
  { label: '类型', prop: 'type', width: 120 },
  { label: '街镇', prop: 'town', width: 120 },
  { label: '营收(万元)', prop: 'revenue', width: 120, align: 'right' },
  { label: '同比', prop: 'tb', width: 100, align: 'right' },
  { label: '状态', prop: 'status', width: 110, tag: true }
]

const NAMES = [
  ['上海佘山国家旅游度假区', '景区景点', '佘山镇', 286400, '+18.6%', '正常运营'],
  ['上海欢乐谷', '景区景点', '佘山镇', 214600, '+12.8%', '正常运营'],
  ['广富林文化发展有限公司', '文创企业', '广富林街道', 128400, '+26.4%', '正常运营'],
  ['上海辰山植物园', '景区景点', '佘山镇', 96200, '+8.6%', '正常运营'],
  ['松江印象城', '餐饮业', '方松街道', 88600, '+14.2%', '正常运营'],
  ['上海影视乐园', '景区景点', '车墩镇', 64200, '-6.2%', '重点关注'],
  ['开元地中海商业广场', '餐饮业', '中山街道', 52800, '+4.8%', '正常运营'],
  ['云间粮仓文创园', '文创空间', '中山街道', 42600, '+31.8%', '正常运营'],
  ['泗泾古镇旅游发展公司', '景区景点', '泗泾镇', 36800, '+42.6%', '正常运营'],
  ['上海天文博物馆', '文博场馆', '佘山镇', 28400, '+6.4%', '正常运营'],
  ['松江区博物馆', '文博场馆', '岳阳街道', 18600, '+2.8%', '正常运营'],
  ['泰晤士小镇运营管理公司', '景区景点', '方松街道', 24800, '-3.4%', '重点关注'],
  ['九亭U天地', '餐饮业', '九亭镇', 32400, '+9.6%', '正常运营'],
  ['醉白池公园管理处', '景区景点', '岳阳街道', 21600, '+4.2%', '正常运营'],
  ['方塔园管理处', '景区景点', '中山街道', 19800, '+1.6%', '正常运营'],
  ['月湖雕塑公园', '景区景点', '佘山镇', 26400, '-4.8%', '暂停营业']
]

const rows = NAMES.map(([name, type, town, revenue, tb, status]) => ({ name, type, town, revenue, tb, status }))
</script>

<style scoped>
.company-main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-top-wrapper {
  width: 100%;
  height: calc(50% - 8px);
  display: flex;
  gap: 16px;
  flex-shrink: 0;
}

.w-1-2 {
  width: calc(50% - 11px);
  height: 100%;
}

.w-1-4 {
  width: calc(25% - 12px);
  height: 100%;
}

.main-bottom-wrapper {
  flex: 1;
  min-height: 0;
}

.status-list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 12px;
  padding: 4px 14px;
  box-sizing: border-box;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  flex-shrink: 0;
}

.status-name {
  flex: 1;
  font-size: 14px;
  color: #cfe6ff;
}

.status-value {
  font-size: 20px;
  font-weight: 700;
  color: #ffd200;
}

.status-unit {
  font-size: 12px;
  color: rgba(201, 215, 239, 0.85);
}
</style>
