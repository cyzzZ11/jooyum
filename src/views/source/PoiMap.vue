<template>
  <!-- 资源一张图：实测 .source-poi-map（左侧 270px 资源树 + 右侧地图，顶部参数条） -->
  <div class="source-poi-map">
    <div class="content-main-wrapper">
      <div class="content-left-wrapper">
        <div class="normal-tree-wrapper">
          <ChartCard name="资源筛选">
            <div class="el-tree-outer">
              <el-tree :data="treeData" node-key="id" default-expand-all highlight-current />
            </div>
          </ChartCard>
          <div class="tree-legend-wrapper">
            <div v-for="l in legends" :key="l.name" class="each-legend">
              <span class="legend-box" :style="{ background: l.color }"></span>
              <span class="legend-name">{{ l.name }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="content-right-wrapper">
        <div class="poi-params-wrapper">
          <div class="param-control query-mode-control">
            <div class="mode-group">
              <div
                v-for="m in modes"
                :key="m"
                class="mode-item"
                :class="{ 'is-active': mode === m }"
                @click="mode = m"
              >
                {{ m }}
              </div>
            </div>
          </div>
          <div class="param-control scenic-type-control">
            <label>资源类型</label>
            <el-select v-model="typeFilter" size="small" style="width: 150px" clearable placeholder="全部">
              <el-option v-for="t in types" :key="t" :label="t" :value="t" />
            </el-select>
          </div>
          <div class="param-control distance-control">
            <label>半径</label>
            <el-input v-model="radius" size="small" style="width: 110px">
              <template #suffix><span class="distance-unit">km</span></template>
            </el-input>
          </div>
        </div>

        <div class="map-card-wrapper">
          <div class="map-container">
            <TiandituMap />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import ChartCard from '@/components/ChartCard.vue'
import TiandituMap from '@/components/TiandituMap.vue'
import { SOURCE_POIS, SOURCE_RESOURCES } from '@/mock/realdata'

/**
 * 资源图谱 · 资源一张图（参考站 `/main/source/poimap`，chunk-3e053266）。
 *
 * 版式**从反编译 CSS 还原**：
 *   .source-poi-map .poi-params-wrapper { position:absolute; top:-43px; right:0;
 *                                         width:calc(100% - 185px); height:36px; z-index:1200;
 *                                         display:flex; align-items:center; gap:24px }
 *   .source-poi-map .content-main-wrapper { display:flex; justify-content:space-between }
 *   .source-poi-map .content-left-wrapper { width:270px; height:100% }
 *   .mode-item { height:28px; padding:0 12px; color:#9fd2ff; font-size:14px;
 *                border:1px solid rgba(8,138,251,.45); background:rgba(8,138,251,.08) }
 *
 * ⚠️ 本账号无「资源图谱」模块权限，数据为松江区文旅资源的合理示例（页面已标注）。
 */
const modes = ['按行政区', '按资源类型', '按半径']
const mode = ref('按行政区')
const typeFilter = ref('')
const radius = ref('5')

const types = [...new Set(SOURCE_POIS.map((p) => p.type))]

const legends = [
  { name: '景区', color: '#088afb' },
  { name: '场馆', color: '#ffd200' },
  { name: '文创', color: '#2fd27a' }
]

const treeData = computed(() =>
  SOURCE_RESOURCES.categories.map((c) => ({
    id: c.name,
    label: `${c.name}（${c.value} ${c.unit}）`,
    children: SOURCE_POIS.filter((p) => p.type === c.name).map((p) => ({ id: p.name, label: p.name }))
  }))
)
</script>

<style scoped>
.source-poi-map {
  width: 100%;
  height: 100%;
  position: relative;
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
  flex-shrink: 0;
}

.normal-tree-wrapper {
  width: 100%;
  height: 100%;
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
  flex-shrink: 0;
}

.each-legend {
  display: flex;
  align-items: center;
  margin-right: 14px;
}

.legend-box {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  margin-right: 6px;
}

.legend-name {
  font-size: 13px;
  color: rgba(201, 215, 239, 0.9);
}

.content-right-wrapper {
  width: calc(100% - 290px);
  height: 100%;
  margin-left: 20px;
  position: relative;
  min-width: 0;
}

/* 参数条：实测绝对定位在内容区上方 -43px，这里改为置于地图上方并保持同高 */
.poi-params-wrapper {
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  gap: 24px;
  margin-bottom: 8px;
}

.poi-params-wrapper .param-control {
  width: auto;
  height: 100%;
  display: flex;
  gap: 8px;
  align-items: center;
  flex-shrink: 0;
}

.poi-params-wrapper .param-control label {
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  white-space: nowrap;
}

.mode-group {
  display: flex;
  border-radius: 2px;
  gap: 8px;
  overflow: hidden;
}

.mode-item {
  height: 28px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  color: #9fd2ff;
  font-size: 14px;
  cursor: pointer;
  white-space: nowrap;
  user-select: none;
  box-sizing: border-box;
  border: 1px solid rgba(8, 138, 251, 0.45);
  background: rgba(8, 138, 251, 0.08);
  border-radius: 2px;
}

.mode-item.is-active {
  color: #1a1408;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}

.distance-unit {
  font-size: 12px;
  color: rgba(180, 220, 255, 0.8);
}

.map-card-wrapper {
  width: 100%;
  height: calc(100% - 44px);
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}

.map-container {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
