<template>
  <div class="module-layout" :class="{ 'visitor-wrapper': showMap }">
    <!-- 顶部渐隐遮罩（参考站 .top-bj：100px 高，覆盖在内容之上） -->
    <div class="top-bj"></div>

    <!-- 地图层（参考站 .map-wrapper，仅当路由 meta.useMap 为真时渲染） -->
    <div v-if="showMap" class="map-wrapper">
      <TiandituMap />
    </div>

    <!-- 子页面（参考站 <router-view> 携带区域/假日/时间参数） -->
    <div class="page-container">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="route.fullPath" />
      </RouterView>
    </div>

    <!-- 地图模式下的数据来源标注（参考站 .sourece-wrapper，绝对定位在左下角） -->
    <div v-show="showMap" class="map-source-wrapper">{{ dataSourceText }}</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import TiandituMap from '@/components/TiandituMap.vue'

/**
 * 模块容器：对齐参考站模块级包装组件（chunk-b753df26，name: Vistors）。
 *   .top-bj           100px 顶部渐隐遮罩（z-index:201, pointer-events:none）
 *   .visitor-wrapper  地图模式的底图容器（overflow:hidden）
 *   .map-wrapper      960px 宽、居中、高度 calc(100% - 340px)
 *   .sourece-wrapper  地图模式下的数据来源，绝对定位于左下
 * 页面本身在子路由中渲染。
 */
const route = useRoute()
/** 子路由显式声明 useMap 时以它为准，否则取模块默认值（参考站各模块 landing 页的实际表现） */
const showMap = computed(() => {
  const m = route.meta || {}
  if (typeof m.useMap === 'boolean') return m.useMap
  const matched = route.matched || []
  const parent = [...matched].reverse().find((r) => r.meta && typeof r.meta.defaultMap === 'boolean')
  return Boolean(parent && parent.meta.defaultMap)
})
const dataSourceText = window.appContext?.dataSourceText || '数据来源：手机信令大数据'
</script>

<style scoped>
/* 尺寸/配色取自参考站 chunk-b753df26.css。
   参考站该容器带 padding: 10px 0 20px 0，使页面可用高度为 1010 − 30 = 980px
   （实测：/fee 的 .layout-wrapper 为 1920×980 @(0,80)）。
   各页面按 980 布局：总览页用自适应高度、地图页用 24%/52% 百分比。 */
.module-layout {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 10px 0 20px 0;
  box-sizing: border-box;
  overflow: hidden;
}

.top-bj {
  position: absolute;
  width: 100%;
  height: 100px;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 201;
  background: linear-gradient(1turn, rgba(18, 36, 63, 0), rgba(13, 31, 59, 0.8) 36%);
}

.visitor-wrapper {
  position: relative;
  overflow: hidden;
  /* 参考站：world.jpg 世界地图底图 */
  background: url('/img/world.972752f4.jpg') no-repeat;
  background-size: 100% 100%;
}

/* 页面内容层：z-index 高于 .top-bj(201) 与 .map-wrapper(200)，
   与参考站一致——地图作为背景层，页面面板浮在其上 */
.page-container {
  position: relative;
  z-index: 300;
  width: 100%;
  height: 100%;
}

.map-wrapper {
  position: absolute;
  width: 960px;
  height: calc(100% - 340px);
  left: calc(50% - 480px);
  top: 0;
  z-index: 200;
  pointer-events: none;
}

.map-wrapper > * {
  pointer-events: auto;
}

.map-source-wrapper {
  position: absolute;
  bottom: 15px;
  left: 10px;
  z-index: 1000;
  color: hsla(0, 0%, 100%, 0.6);
  font-size: 14px;
}
</style>
