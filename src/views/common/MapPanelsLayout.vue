<template>
  <div class="main-outer">
    <!--
      地图层：**必须内缩，不能铺满**。
      实测参考站 `.map-wrapper`：
        position: absolute; inset: 0px 480px 340px; z-index: 200
        → 实际盒子 [540, 61, 840, 586]（在 1920×980 内）
      即左右各让出 480px、底部让出 340px，把地图限制在中间区域。
      先前写成 `inset: 0` 铺满全屏，导致左上角指标卡（参考站该卡
      `background: transparent`）背后透出地图，看起来像「卡片没了」。
      地图与三栏浮层之间夹一层**不透底**（background 覆盖全尺寸），
      使浮层区域呈现页面背景而不是地图。
    -->
    <div class="map-layer">
      <div class="map-wrapper">
        <!--
          地图：在线版（http/https）用天地图 maplibre（支持缩放/拖拽/底图切换）；
          单文件版（file:// 打开）用静态拼接图，避免浏览器拦截 Worker 导致无区域色块。
        -->
        <TownChoropleth
          v-if="useStaticMap"
          :values="choropleth"
          :legend-title="choroplethTitle"
          :empty-text="choroplethEmptyText"
          value-unit=""
        />
        <TiandituMap
          v-else
          :values="choropleth"
          :legend-title="choroplethTitle"
          :empty-text="choroplethEmptyText"
          value-unit=""
        />
      </div>
    </div>

    <!-- 三栏浮层：实测 .layout-wrapper 1920×980，padding 0 5px，指针事件穿透 -->
    <div class="layout-wrapper">
      <div class="left-part-wrapper">
        <slot name="left" />
      </div>

      <div class="center-part-wrapper">
        <slot name="center" />
      </div>

      <div class="right-part-wrapper">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import TiandituMap from '@/components/TiandituMap.vue'
import TownChoropleth from '@/components/TownChoropleth.vue'
import { SJ_TOWN_CHOROPLETH } from '@/mock/rankData'

/**
 * 子页面通用版式：**地图打底 + 三栏浮层**。
 *
 * 实测自参考站（CDP，1920×1080 设计单位）：
 *   /main/trend/fee 与 /main/trend/city 使用完全相同的骨架：
 *     .layout-wrapper      1920×980 @(0,0)，display:flex，pointer-events:none，padding 0 5px
 *     .left-part-wrapper    458×980  3 张卡各 458×323（leftCards 实测）
 *     .right-part-wrapper   458×980  2 张卡各 458×487（rightCards 实测）
 *     .center-part-wrapper  958×323  底部居中 @(480,657)
 *
 * 地图按**松江区 17 个街镇**做分色渲染（参考站是对区县分色，本项目下沉到街镇级）。
 * 插槽：left / center / right，各放 ChartCard。
 */
const props = defineProps({
  /** 地图着色的指标口径（用于图例标题），默认按客流 */
  metric: { type: String, default: 'city' }
})

/**
 * 单文件版（file:// 直开）使用静态拼接地图：
 * 浏览器会拦截 maplibre 的 Worker，导致「有底图无区域色块」。
 * 在线版（http/https）保持原有天地图交互地图，不做改动。
 */
const useStaticMap =
  typeof window !== 'undefined' && (location.protocol === 'file:' || window.__STATIC_MAP__ === true)

const choropleth = computed(() => SJ_TOWN_CHOROPLETH[props.metric] || SJ_TOWN_CHOROPLETH.city)
const choroplethTitle = computed(
  () =>
    ({
      fee: '街镇消费热度',
      city: '街镇客流热度',
      entry: '街镇入境热度',
      scenic: '街镇景区热度'
    })[props.metric] || '街镇热度'
)
/** 无数据街镇的口径说明：景区指标下即「无景区点位」 */
const choroplethEmptyText = computed(() => (props.metric === 'scenic' ? '无景区点位' : '暂无数据'))
</script>

<style scoped>
.main-outer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

/*
  地图层容器：不透明页面背景铺满整个模块区。
  这样三栏浮层所在的区域呈现的是**页面背景**，而不是身后的地图 ——
  与参考站观感一致（参考站地图本来就内缩在中间，左右下三块不是地图）。
*/
.map-layer {
  position: absolute;
  inset: 0;
  z-index: 1;
  background: var(--sj-bg-deep, #041426);
}

/* 实测参考站 `.map-wrapper`：inset 0 480px 340px（1920×980 内） */
.map-wrapper {
  position: absolute;
  inset: 0 25% 34.7%;
  z-index: 200;
}

.layout-wrapper {
  position: absolute;
  inset: 0;
  z-index: 1100;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 5px;
  pointer-events: none;
}

.left-part-wrapper,
.right-part-wrapper {
  width: 24%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 5px;
  pointer-events: auto;
  position: relative;
}

.center-part-wrapper {
  width: calc(52% - 40px);
  height: calc(35% - 20px);
  position: absolute;
  bottom: 0;
  left: calc(24% + 20px);
  pointer-events: auto;
  z-index: 1000;
}

/* 左栏 3 张等分卡，右栏 2 张等分卡（实测 323 / 487） */
.left-part-wrapper :deep(> *) {
  flex: 1 1 0;
  min-height: 0;
}

.right-part-wrapper :deep(> *) {
  flex: 1 1 0;
  min-height: 0;
}
</style>
