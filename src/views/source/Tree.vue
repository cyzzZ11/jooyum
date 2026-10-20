<template>
  <!-- 资源图谱：实测根类名 .HYAnalysis（左侧 164px 菜单 + 内容区） -->
  <SideMenuLayout :menus="menus" source-text="数据来源：松江区文旅资源底数（示例数据）" back-text="资源底数清单">
    <div class="resource-tree-wrapper">
      <!-- 左侧：资源分类树 -->
      <div class="content-left-wrapper">
        <div class="normal-tree-wrapper">
          <ChartCard name="资源分类">
            <div class="el-tree-outer">
              <el-tree
                :data="treeData"
                node-key="id"
                default-expand-all
                :expand-on-click-node="false"
                highlight-current
                @node-click="onNodeClick"
              />
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

      <!-- 右侧：汇总 + 图表 -->
      <div class="content-right-wrapper">
        <div class="summary-wrapper">
          <span>松江区文旅资源共 <b class="sj-num">{{ total }}</b> 处，覆盖 9 大类、17 个街镇</span>
        </div>

        <div class="right-top-wrapper">
          <div class="right-top-chart-wrapper">
            <ChartCard name="资源类型占比">
              <BaseChart :option="pieOption" height="100%" />
            </ChartCard>
          </div>
          <div class="right-top-chart-wrapper">
            <ChartCard name="各街镇资源数量">
              <BaseChart :option="barOption" height="100%" />
            </ChartCard>
          </div>
        </div>

        <div class="right-bottom-wrapper">
          <ChartCard name="资源明细">
            <TableList :columns="columns" :rows="rows" dom-id="source-detail" />
          </ChartCard>
        </div>
      </div>
    </div>
  </SideMenuLayout>
</template>

<script setup>
import { computed, ref } from 'vue'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import TableList from '@/components/TableList.vue'
import SideMenuLayout from '@/views/common/SideMenuLayout.vue'
import { SOURCE_POIS, SOURCE_RESOURCES } from '@/mock/realdata'

/**
 * 资源图谱 · 资源图谱（参考站 `/main/source/tree`，chunk-27b0aac3）。
 *
 * 版式**从反编译 CSS 还原**（`_ref/css/chunk-0b5357e0.css` 等）：
 *   .HYAnalysis .menu-wrapper            { width:164px; padding:16px 22px }
 *   .HYAnalysis .content-wrapper         { flex:1; width:calc(100% - 164px) }
 *   .content-main-wrapper .content-left-wrapper  { width:270px; height:100% }
 *   .normal-tree-wrapper                 { height:calc(100% - 42px); flex-column }
 *   .el-tree-outer                       { height:calc(100% - 40px); overflow:auto }
 *   .tree-legend-wrapper .legend-box     { width:18px; height:18px; border-radius:5px }
 *
 * ⚠️ 本账号无「资源图谱」模块权限（平台 dataId wlcydcpt_qgwlzyfb_* 实测取不到数），
 *    数据为松江区文旅资源的合理示例（页面已标注）。
 */
const menus = [
  { key: 'tree', name: '资源图谱' },
  { key: 'map', name: '资源一张图' },
  { key: 'analysis', name: '资源分析' }
]

const total = SOURCE_RESOURCES.total

const legends = [
  { name: '景区', count: 186, color: 'rgba(8,138,251,.6)' },
  { name: '场馆', count: 68, color: 'rgba(255,210,0,.6)' },
  { name: '住宿', count: 642, color: 'rgba(47,210,122,.6)' },
  { name: '餐饮', count: 1128, color: 'rgba(255,139,77,.6)' }
]

const treeData = computed(() =>
  SOURCE_RESOURCES.categories.map((c) => ({
    id: c.name,
    label: `${c.name}（${c.value} ${c.unit}）`,
    children: c.children
      ? SOURCE_POIS.filter((p) => p.type === c.name)
          .slice(0, c.children)
          .map((p) => ({ id: p.name, label: p.name }))
      : undefined
  }))
)

const onNodeClick = () => {}

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

const barOption = computed(() => {
  const list = [
    { name: '方松街道', v: 186 }, { name: '岳阳街道', v: 164 }, { name: '中山街道', v: 152 },
    { name: '佘山镇', v: 142 }, { name: '广富林街道', v: 128 }, { name: '泗泾镇', v: 116 },
    { name: '九亭镇', v: 98 }, { name: '车墩镇', v: 86 }
  ]
  return {
    grid: { left: 10, right: 40, top: 8, bottom: 4, containLabel: true },
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
.resource-tree-wrapper {
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

.el-tree-outer :deep(.el-tree-node.is-current > .el-tree-node__content) {
  background: rgba(8, 138, 251, 0.24);
}

.tree-legend-wrapper {
  display: flex;
  align-items: center;
  padding: 8px;
}

.tree-legend-wrapper .each-legend {
  display: flex;
  align-items: center;
  margin-right: 14px;
}

.tree-legend-wrapper .legend-box {
  width: 18px;
  height: 18px;
  font-size: 11px;
  border-radius: 5px;
  margin-right: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.tree-legend-wrapper .legend-name {
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
  box-sizing: border-box;
}

.summary-wrapper b {
  color: #ffd200;
  margin: 0 4px;
}

.right-top-wrapper {
  width: 100%;
  height: 35%;
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  flex-shrink: 0;
  margin-top: 12px;
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
