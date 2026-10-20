<template>
  <!-- 资源一张图（菜单版）：实测 .HYAnalysis 外壳 + 地图主体 -->
  <SideMenuLayout :menus="menus" source-text="数据来源：松江区文旅资源底数（示例数据）">
    <div class="map-page-wrapper">
      <div class="map-card-wrapper">
        <div class="map-container">
          <TiandituMap />
        </div>
        <div class="map-legend-mini">
          <div v-for="l in legends" :key="l.name" class="legend-part-wrapper">
            <span class="legend-color-wrapper">
              <i class="legend-color" :style="{ background: l.color }"></i>
            </span>
            {{ l.name }}
          </div>
        </div>
      </div>
    </div>
  </SideMenuLayout>
</template>

<script setup>
import SideMenuLayout from '@/views/common/SideMenuLayout.vue'
import TiandituMap from '@/components/TiandituMap.vue'

/**
 * 资源图谱 · 资源一张图（菜单外壳版）。
 * 参考站对应路由 `/main/source/poimap`（chunk-3e053266），本项目该页已由
 * `source/PoiMap.vue` 完整实现（含左树与参数条），此处为菜单导航目标页的
 * 轻量实现，保留同一套 .map-card-wrapper / .map-legend-mini 版式。
 *
 * ⚠️ 本账号无「资源图谱」模块权限，地图点位为松江区文旅资源的合理示例。
 */
const menus = [
  { key: 'tree', name: '资源图谱' },
  { key: 'map', name: '资源一张图' },
  { key: 'analysis', name: '资源分析' }
]

const legends = [
  { name: '景区', color: '#088afb' },
  { name: '文博场馆', color: '#ffd200' },
  { name: '文创空间', color: '#2fd27a' },
  { name: '住宿设施', color: '#ff8b4d' }
]
</script>

<style scoped>
.map-page-wrapper {
  width: 100%;
  height: 100%;
}

.map-card-wrapper {
  width: 100%;
  height: 100%;
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

.map-legend-mini {
  position: absolute;
  left: 12px;
  bottom: 20px;
  z-index: 500;
  pointer-events: none;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 6px 10px;
  border-radius: 3px;
  background: rgba(3, 20, 35, 0.66);
}

.map-legend-mini .legend-part-wrapper {
  display: flex;
  align-items: center;
  color: #fff;
  font-size: 12px;
}

.map-legend-mini .legend-color-wrapper {
  display: flex;
  align-items: center;
  margin-right: 5px;
}

.map-legend-mini .legend-color {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  display: inline-block;
}
</style>
