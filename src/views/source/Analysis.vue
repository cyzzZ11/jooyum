<template>
  <!-- 资源分析：实测 .source-resource-analysis（左 270px 树 + 右侧 35% 图区 + 表格） -->
  <div class="source-resource-analysis">
    <div class="content-main-wrapper">
      <div class="content-left-wrapper">
        <div class="normal-tree-wrapper">
          <ChartCard name="资源分类">
            <div class="el-tree-outer">
              <el-tree :data="treeData" node-key="id" default-expand-all highlight-current />
            </div>
          </ChartCard>
          <div class="tree-legend-wrapper">
            <div v-for="l in legends" :key="l.name" class="each-legend">
              <span class="legend-box" :style="{ background: l.color }">{{ l.count }}</span>
              <span class="legend-name">{{ l.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content-right-wrapper">
        <div class="right-top-wrapper">
          <div class="right-top-chart-wrapper">
            <ChartCard name="资源结构">
              <BaseChart :option="pieOption" height="100%" />
            </ChartCard>
          </div>
          <div class="right-top-chart-wrapper">
            <ChartCard name="等级构成">
              <BaseChart :option="levelOption" height="100%" />
            </ChartCard>
          </div>
        </div>

        <div class="right-bottom-wrapper">
          <ChartCard name="资源分析明细">
            <TableList :columns="columns" :rows="rows" dom-id="source-analysis" />
          </ChartCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TableList from '@/components/TableList.vue'
import { SOURCE_POIS, SOURCE_RESOURCES } from '@/mock/realdata'

/**
 * 资源图谱 · 资源分析（参考站 `/main/source/analysis`，chunk-c2afd794）。
 *
 * 版式**从反编译 CSS 还原**：
 *   .source-resource-analysis .content-left-wrapper  { width:270px; height:100% }
 *   .source-resource-analysis .content-right-wrapper { width:calc(100% - 290px); margin-left:20px;
 *                                                      flex-column }
 *   .source-resource-analysis .right-top-wrapper     { height:35%; margin-bottom:20px; display:flex }
 *   .normal-tree-wrapper .el-tree-outer              { height:calc(100% - 40px); overflow:auto }
 *
 * ⚠️ 本账号无「资源图谱」模块权限，数据为松江区文旅资源的合理示例（页面已标注）。
 */
const legends = [
  { name: '景区', count: 186, color: 'rgba(8,138,251,.6)' },
  { name: '场馆', count: 68, color: 'rgba(255,210,0,.6)' },
  { name: '住宿', count: 642, color: 'rgba(47,210,122,.6)' }
]

const treeData = computed(() =>
  SOURCE_RESOURCES.categories.map((c) => ({
    id: c.name,
    label: `${c.name}（${c.value} ${c.unit}）`,
    children: SOURCE_POIS.filter((p) => p.type === c.name).map((p) => ({ id: p.name, label: p.name }))
  }))
)

const pieOption = computed(() => ({
  tooltip: { trigger: 'item', formatter: '{b}<br/>{c} ({d}%)' },
  legend: {
    orient: 'vertical',
    right: 6,
    top: 'center',
    textStyle: { color: 'rgba(180,220,255,.85)', fontSize: 12 },
    itemWidth: 10,
    itemHeight: 8
  },
  color: ['#088afb', '#ffd200', '#2fd27a', '#ff8b4d', '#7ad4ff', '#b47aff', '#ff5b8b', '#5bffd4', '#9fb6d4'],
  series: [
    {
      type: 'pie',
      radius: ['40%', '66%'],
      center: ['34%', '50%'],
      itemStyle: { borderColor: 'rgba(3,20,35,.9)', borderWidth: 2 },
      label: { show: false },
      data: SOURCE_RESOURCES.categories.map((c) => ({ name: c.name, value: c.value }))
    }
  ]
}))

const levelOption = computed(() => {
  const list = [
    { name: '4A 级', v: 10 },
    { name: '3A 级', v: 6 },
    { name: '星级酒店', v: 2 },
    { name: '其他', v: 46 }
  ]
  return {
    grid: { left: 10, right: 44, top: 10, bottom: 6, containLabel: true },
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
        barMaxWidth: 14,
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
        label: { show: true, position: 'right', color: '#ffd200', fontSize: 11 },
        data: list.map((c) => c.v)
      }
    ]
  }
})

const columns = [
  { label: '资源名称', prop: 'region_name', align: 'left', width: 180 },
  { label: '类型', prop: 'type', width: 110 },
  { label: '等级', prop: 'level', width: 80 },
  { label: '接待量', prop: 'all_value', width: 110, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]

const rows = computed(() =>
  SOURCE_POIS.map((p, i) => ({
    region_name: p.name,
    type: p.type,
    level: p.level,
    all_value: p.visitors,
    tb_all_value: Number((((i % 5) - 2) * 0.08 + 0.12).toFixed(4))
  }))
)
</script>

<style scoped>
/* 版式取自 _ref/css/chunk-c2afd794.css */
.source-resource-analysis {
  width: 100%;
  height: 100%;
  color: #fff;
  box-sizing: border-box;
}

.content-main-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
}

.content-left-wrapper {
  width: 270px;
  height: 100%;
  position: relative;
  flex-shrink: 0;
}

.normal-tree-wrapper {
  width: 100%;
  height: calc(100% - 42px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.el-tree-outer {
  height: calc(100% - 40px);
  overflow: auto;
  padding: 4px 6px;
}

.el-tree-outer :deep(.el-tree) {
  background: transparent;
  color: #cfe6ff;
  font-size: 14px;
}

.el-tree-outer :deep(.el-tree-node__content) {
  height: 28px;
}

.el-tree-outer :deep(.el-tree-node__content:hover) {
  background: rgba(8, 138, 251, 0.16);
}

.tree-legend-wrapper {
  display: flex;
  align-items: center;
  padding: 8px;
}

.each-legend {
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.legend-box {
  width: 18px;
  height: 18px;
  font-size: 12px;
  border-radius: 5px;
  margin-right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.legend-name {
  font-size: 13px;
  color: rgba(201, 215, 239, 0.9);
}

.content-right-wrapper {
  width: calc(100% - 290px);
  height: 100%;
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.right-top-wrapper {
  width: 100%;
  height: 35%;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
}

.right-top-chart-wrapper {
  width: calc(50% - 8px);
  height: 100%;
}

.right-bottom-wrapper {
  flex: 1;
  min-height: 0;
}
</style>
