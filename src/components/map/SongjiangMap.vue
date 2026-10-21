<script setup lang="ts">
/**
 * 松江区街镇一张图
 * - 17 个街镇 choropleth（真实区界 + 真实街镇行政边界，GCJ-02，无缝拼接）
 * - 重点景区点位 effectScatter
 * - 伪 3D 立体底座（多层错位渲染）
 */
import { computed, reactive, ref, useTemplateRef } from 'vue'
import VChart from '@/components/common/VChart.vue'
import MapBackdrop from './MapBackdrop.vue'
import { type EChartsOption } from '@/utils/echarts'
import { MAP_NAME, DISTRICT_MAP_NAME } from '@/utils/mapRegister'
import { MAP_METRICS, TOWN_STATS, TOWN_SUMMARY } from '@/data/towns'
import { SCENIC_SPOTS } from '@/data/map'
import { rampColor, rankRatio } from '@/utils/color'

const metric = ref(MAP_METRICS[0].key)
const activeMetric = computed(
  () => MAP_METRICS.find((m) => m.key === metric.value) ?? MAP_METRICS[0]
)

/** 主图/底座的定位参数（两处必须一致） */
const CENTER_Y = 47.5
const CENTER: [string, string] = ['50%', `${CENTER_Y}%`]
const SIZE = '100%'
/**
 * 地图纵横比修正。
 * ECharts 默认 0.75，松江区按默认渲染出来的宽高比是 0.97（偏瘦），左右各留一大块空白。
 * 松江大致跨 lon 0.3471° / lat 0.2686°，在 31°N 处 1° 经度 ≈ 0.86 个纬度长度，
 * 因此地理上正确的比例约 1.11，反推 aspectScale ≈ 0.86。
 * 设置后地图变宽、左右留白收窄，也更接近真实形状。
 */
const ASPECT_SCALE = 0.86

const values = computed(() => TOWN_STATS.map((t) => t[metric.value]))
const minV = computed(() => Math.min(...values.value))
const maxV = computed(() => Math.max(...values.value))

/** 各街镇在色带上的位置：按名次铺开，避免离群值把其余街镇压成一团深色 */
const rankT = computed(() => rankRatio(values.value))

const mapData = computed(() =>
  TOWN_STATS.map((t, i) => ({
    name: t.name,
    value: t[metric.value],
    itemStyle: { areaColor: rampColor(activeMetric.value.ramp, rankT.value[i]) }
  }))
)

/** 用于渐变图例的 CSS 色带（多段分级） */
const rampCss = computed(
  () => `linear-gradient(90deg, ${activeMetric.value.ramp.join(', ')})`
)

/** 重点点位（带名称标签） */
const spotMain = computed(() =>
  SCENIC_SPOTS.filter((s) => s.showLabel).map((s) => ({
    name: s.name,
    value: [s.coord[0], s.coord[1], s.visitors],
    symbolSize: s.level === 3 ? 9 : 7,
    label: { position: s.dir ?? 'right' }
  }))
)

/** 其余点位（仅发光点，不带标签，避免密集区文字重叠） */
const spotMinor = computed(() =>
  SCENIC_SPOTS.filter((s) => !s.showLabel).map((s) => ({
    name: s.name,
    value: [s.coord[0], s.coord[1], s.visitors],
    symbolSize: s.level === 3 ? 7 : s.level === 2 ? 6 : 4
  }))
)

function baseSeries() {
  return {
    type: 'map' as const,
    map: MAP_NAME,
    layoutCenter: CENTER,
    layoutSize: SIZE,
    aspectScale: ASPECT_SCALE,
    roam: false,
    silent: true,
    tooltip: { show: false },
    label: { show: false },
    emphasis: { disabled: true },
    select: { disabled: true }
  }
}

const option = computed<EChartsOption>(
  () =>
    ({
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(6, 26, 54, 0.94)',
        borderColor: 'rgba(94, 214, 255, 0.5)',
        borderWidth: 1,
        padding: [8, 12],
        textStyle: { color: '#dcf0ff', fontSize: 12 },
        extraCssText: 'box-shadow:0 6px 22px rgba(0,0,0,.6);border-radius:4px;',
        formatter: (p: any) => {
          const name = p?.name
          const town = TOWN_STATS.find((t) => t.name === name)
          if (!town) {
            const spot = SCENIC_SPOTS.find((s) => s.name === name)
            return spot
              ? `<b>${spot.name}</b><br/>假期客流：${spot.visitors} 万人次`
              : name
          }
          return [
            `<b style="color:#2fd8ff">${town.name}</b>`,
            `接待游客：${town.tourists} 万人次`,
            `文旅营收：${town.revenue} 万元`,
            `景区景点：${town.spots} 个`,
            `宾馆酒店：${town.hotels} 家`,
            `文旅指数：${town.index}`
          ].join('<br/>')
        }
      },
      // 散点需要 geo 坐标系；与下面 map series 使用完全一致的位置参数保证对齐
      geo: {
        map: MAP_NAME,
        layoutCenter: CENTER,
        layoutSize: SIZE,
        aspectScale: ASPECT_SCALE,
        roam: false,
        silent: true,
        itemStyle: { areaColor: 'transparent', borderColor: 'transparent' },
        label: { show: false },
        z: 1
      },
      series: [
        // ---- 街镇面 ----
        {
          ...baseSeries(),
          name: 'towns',
          silent: false,
          data: mapData.value,
          // 街镇名放在这里（不能另开一个同 map 名的 series：ECharts 对同一张 map 只认
          // 第一个 series 的绘制上下文，第二个 series 的 label 会被置为 ignore 而全部消失）。
          // 「街镇名优先于景区名」不靠 z 分层，而靠 ECharts LabelManager 的全局重叠裁决：
          // hideOverlap 的优先级 = 宿主元素包围盒面积，街镇面远大于景区散点，
          // 因此重叠时景区名会被隐藏、街镇名保留。
          label: {
            show: true,
            color: '#eaf6ff',
            fontSize: 11,
            fontWeight: 'bold',
            fontFamily: 'PingFang SC, Microsoft YaHei',
            textShadowColor: 'rgba(0, 18, 36, 1)',
            textShadowBlur: 6,
            textBorderColor: 'rgba(2, 12, 26, 0.9)',
            textBorderWidth: 2.5
          },
          labelLayout: { hideOverlap: true },
          itemStyle: {
            borderColor: 'rgba(110, 208, 255, 0.55)',
            borderWidth: 1,
            shadowColor: 'rgba(47, 216, 255, 0.35)',
            shadowBlur: 12
          },
          emphasis: {
            disabled: false,
            label: {
              show: true,
              color: '#ffffff',
              fontSize: 11,
              fontWeight: 'bold'
            },
            itemStyle: {
              areaColor: '#7ceaff',
              borderColor: '#ffffff',
              borderWidth: 1.5,
              shadowColor: 'rgba(124, 234, 255, 0.95)',
              shadowBlur: 22
            }
          },
          tooltip: { show: true },
          z: 5
        },
        // ---- 区界高亮 ----
        {
          ...baseSeries(),
          name: 'district-outline',
          map: DISTRICT_MAP_NAME,
          itemStyle: {
            areaColor: 'transparent',
            borderColor: '#6fe3ff',
            borderWidth: 2,
            shadowColor: 'rgba(111, 227, 255, 0.95)',
            shadowBlur: 16
          },
          z: 6
        },
        // ---- 重点景区点位（带名称） ----
        {
          name: '景区点位',
          type: 'effectScatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          data: spotMain.value,
          symbol: 'circle',
          showEffectOn: 'render',
          rippleEffect: { brushType: 'stroke', scale: 3.2, period: 4 },
          itemStyle: {
            color: '#ffd76a',
            shadowBlur: 12,
            shadowColor: '#ffb020'
          },
          label: {
            show: true,
            position: 'right',
            distance: 3,
            color: '#ffe9a8',
            fontSize: 10,
            formatter: '{b}',
            textShadowColor: 'rgba(0,0,0,.95)',
            textShadowBlur: 5
          },
          labelLayout: { hideOverlap: true },
          tooltip: { show: true },
          z: 10
        },
        // ---- 一般点位（仅光点，防标签重叠） ----
        {
          name: '其他点位',
          type: 'scatter',
          coordinateSystem: 'geo',
          geoIndex: 0,
          data: spotMinor.value,
          symbol: 'circle',
          itemStyle: {
            color: '#9fe8ff',
            opacity: 0.9,
            shadowBlur: 10,
            shadowColor: '#2fd8ff'
          },
          tooltip: { show: true },
          z: 9
        }
      ]
    } as EChartsOption)
)

const topTowns = computed(() =>
  [...TOWN_STATS].sort((a, b) => b[metric.value] - a[metric.value]).slice(0, 5)
)

/* ------------------------------------------------------------------
 * 地图平移 / 缩放
 * 说明：立体底座与主图是两个独立 ECharts 实例，若各自开启 roam 会不同步；
 * 因此统一在一个容器上做 CSS 变换，两块画布天然保持对齐。
 * ---------------------------------------------------------------- */
const MIN_SCALE = 1
const MAX_SCALE = 3

const bodyRef = useTemplateRef<HTMLDivElement>('mapBody')
const view = reactive({ x: 0, y: 0, scale: 1 })
const dragging = ref(false)
/** 仅复位时播放过渡动画；拖拽/缩放必须瞬时跟随，否则会有"追帧"般的顿挫 */
const animating = ref(false)
const moved = computed(() => view.x !== 0 || view.y !== 0 || view.scale !== 1)

const innerStyle = computed(() => ({
  transform: `translate3d(${view.x}px, ${view.y}px, 0) scale(${view.scale})`,
  transition: animating.value
    ? 'transform 0.34s cubic-bezier(0.22, 1, 0.36, 1)'
    : 'none'
}))

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v))

/**
 * 整个大屏是等比缩放过的，鼠标位移要除以舞台缩放比才能换算成设计稿像素。
 */
function stageScale() {
  const stage = bodyRef.value?.closest('.adapter-stage')
  if (!stage) return 1
  return stage.getBoundingClientRect().width / 1920 || 1
}

/**
 * 拖拽范围限制：不允许把地图拖出视野太远。
 * 必须随缩放级别放宽，否则放大后仍然只能小幅平移。
 */
function panLimit() {
  const el = bodyRef.value
  if (!el) return 200
  const base = Math.min(el.clientWidth, el.clientHeight) * 0.75
  return base * (view.scale - 1) + 100
}

/**
 * 把 view 收敛到合法范围。
 * ⚠️ 拖拽、缩放两条路径都必须调用，否则越界的 view 会在下一次拖拽的
 * 第一帧被 clamp 猛拉回来，表现为"瞬移"。
 */
function boundView() {
  const limit = panLimit()
  view.x = clamp(view.x, -limit, limit)
  view.y = clamp(view.y, -limit, limit)
}

let startX = 0
let startY = 0
let originX = 0
let originY = 0
let animTimer: number | undefined

/** 立即结束复位动画（拖拽/缩放必须瞬时跟随） */
function stopAnimating() {
  if (animTimer !== undefined) {
    window.clearTimeout(animTimer)
    animTimer = undefined
  }
  animating.value = false
}

function onPointerDown(e: PointerEvent) {
  if (e.button !== 0) return
  // 保险：复位动画若因标签页节流未收尾，这里立刻结束，避免拖拽被过渡"追帧"
  stopAnimating()
  // 起点先收敛一次，保证拖拽全程 originX/originY 都在合法范围内
  boundView()
  dragging.value = true
  startX = e.clientX
  startY = e.clientY
  originX = view.x
  originY = view.y
  try {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  } catch {
    // 合成事件 / 指针已释放时 setPointerCapture 会抛错，忽略即可
  }
}

function onPointerMove(e: PointerEvent) {
  if (!dragging.value) return
  const s = stageScale()
  const limit = panLimit()
  view.x = clamp(originX + (e.clientX - startX) / s, -limit, limit)
  view.y = clamp(originY + (e.clientY - startY) / s, -limit, limit)
}

function onPointerUp(e: PointerEvent) {
  if (!dragging.value) return
  dragging.value = false
  const el = e.currentTarget as HTMLElement
  try {
    if (el.hasPointerCapture?.(e.pointerId))
      el.releasePointerCapture(e.pointerId)
  } catch {
    /* noop */
  }
}

/** 滚轮以光标为锚点缩放 */
function onWheel(e: WheelEvent) {
  const el = bodyRef.value
  if (!el) return
  e.preventDefault()
  stopAnimating()

  const rect = el.getBoundingClientRect()
  const s = stageScale()
  const cx = (e.clientX - rect.left) / s
  const cy = (e.clientY - rect.top) / s

  const factor = e.deltaY < 0 ? 1.15 : 1 / 1.15
  const next = clamp(view.scale * factor, MIN_SCALE, MAX_SCALE)
  if (next === view.scale) return

  const k = next / view.scale
  view.x = cx - (cx - view.x) * k
  view.y = cy - (cy - view.y) * k
  view.scale = next

  // 缩放后立即收敛，与拖拽共用同一套边界
  boundView()
}

function resetView() {
  view.x = 0
  view.y = 0
  view.scale = 1
  animating.value = true
  if (animTimer !== undefined) window.clearTimeout(animTimer)
  // 兜底：即使 transitionend / 定时器被节流，下次交互也会通过 stopAnimating() 收尾
  animTimer = window.setTimeout(() => {
    animating.value = false
    animTimer = undefined
  }, 400)
}
</script>

<template>
  <section class="map-panel">
    <i class="map-corner tl" />
    <i class="map-corner tr" />
    <i class="map-corner bl" />
    <i class="map-corner br" />

    <header class="map-hd">
      <span class="mh-badge">图</span>
      <span class="mh-title">松江区文旅资源一张图 · 街镇分布</span>
      <span class="mh-line" />
      <nav class="mh-metrics">
        <button
          v-for="m in MAP_METRICS"
          :key="m.key"
          type="button"
          class="mh-metric"
          :class="{ active: m.key === metric }"
          @click="metric = m.key"
        >{{ m.label }}</button>
      </nav>
    </header>

    <div
      ref="mapBody"
      class="map-body"
      :class="{ 'is-dragging': dragging }"
      @pointerdown="onPointerDown"
      @pointermove="onPointerMove"
      @pointerup="onPointerUp"
      @pointercancel="onPointerUp"
      @wheel="onWheel"
      @dblclick="resetView"
    >
      <div class="map-inner" :style="innerStyle">
        <MapBackdrop
          class="map-backdrop"
          :center-y="CENTER_Y"
          :size="SIZE"
          :aspect-scale="ASPECT_SCALE"
        />
        <VChart :option="option" class="map-chart" />
      </div>

      <!-- 左上：全区汇总 -->
      <div class="map-total">
        <div class="mt-row">
          <span class="mt-label">假期接待游客</span>
          <b class="mt-value">
            {{ TOWN_SUMMARY.tourists.toFixed(2) }}
            <i>万人次</i>
          </b>
        </div>
        <div class="mt-row">
          <span class="mt-label">假期文旅营收</span>
          <b class="mt-value">
            {{ (TOWN_SUMMARY.revenue / 10000).toFixed(2) }}
            <i>亿元</i>
          </b>
        </div>
        <div class="mt-row">
          <span class="mt-label">景区景点</span>
          <b class="mt-value">
            {{ TOWN_SUMMARY.spots }}
            <i>个</i>
          </b>
        </div>
      </div>

      <!-- 右上：街镇排行 -->
      <div class="map-rank">
        <div class="mr-title">{{ activeMetric.label }} TOP5</div>
        <ul>
          <li v-for="(t, i) in topTowns" :key="t.name">
            <span class="mr-idx">{{ i + 1 }}</span>
            <span class="mr-name">{{ t.name }}</span>
            <b class="mr-val">{{ t[metric] }}</b>
          </li>
        </ul>
      </div>

      <!-- 左下：指标色带 -->
      <div class="map-scale">
        <span>{{ minV }}</span>
        <i :style="{ background: rampCss }" />
        <span>{{ maxV }}</span>
        <em>{{ activeMetric.unit || '指数' }}</em>
      </div>

      <!-- 左下：地图操作提示 / 复位 -->
      <div class="map-tools">
        <span class="mt-hint">拖拽平移 · 滚轮缩放 · 双击复位</span>
        <button v-if="moved" type="button" class="mt-reset" @click="resetView">复位</button>
      </div>

      <!-- 右下：发展指数 -->
      <div class="map-index">
        <span class="mi-label">假期文旅热度指数</span>
        <b class="mi-value">{{ TOWN_SUMMARY.index }}</b>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.map-panel {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
      ellipse 60% 60% at 50% 52%,
      rgba(20, 92, 170, 0.28),
      transparent 72%
    ),
    linear-gradient(180deg, rgba(9, 36, 72, 0.5), rgba(4, 14, 32, 0.3));
  border: 1px solid $c-border;
  border-radius: $r-panel;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
        rgba(64, 178, 255, 0.05) 1px,
        transparent 1px
      ),
      linear-gradient(90deg, rgba(64, 178, 255, 0.05) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: radial-gradient(
      ellipse 70% 70% at 50% 50%,
      #000 20%,
      transparent 78%
    );
    pointer-events: none;
  }
}

.map-corner {
  position: absolute;
  width: 13px;
  height: 13px;
  border: 2px solid $c-cyan;
  z-index: 3;
  pointer-events: none;

  &.tl {
    left: -1px;
    top: -1px;
    border-right: 0;
    border-bottom: 0;
  }

  &.tr {
    right: -1px;
    top: -1px;
    border-left: 0;
    border-bottom: 0;
  }

  &.bl {
    left: -1px;
    bottom: -1px;
    border-right: 0;
    border-top: 0;
  }

  &.br {
    right: -1px;
    bottom: -1px;
    border-left: 0;
    border-top: 0;
  }
}

.map-hd {
  position: relative;
  z-index: 3;
  flex: none;
  @include flex(row, flex-start, center);
  gap: 8px;
  height: 40px;
  padding: 0 14px;
  background: linear-gradient(
    90deg,
    rgba(20, 86, 160, 0.45),
    rgba(20, 86, 160, 0)
  );
  border-bottom: 1px solid rgba(64, 178, 255, 0.16);
}

.mh-badge {
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: calc(13px * var(--fs, 1));
  font-weight: 700;
  color: #04182f;
  background: linear-gradient(160deg, #a6f2ff, #2fd8ff 70%);
  clip-path: polygon(24% 0, 100% 0, 76% 100%, 0 100%);
  box-shadow: 0 0 10px rgba(47, 216, 255, 0.55);
}

.mh-title {
  font-size: calc(17px * var(--fs, 1));
  font-weight: 700;
  letter-spacing: 2px;
  @include grad-text($c-cyan, #ffffff);
}

.mh-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgba(94, 214, 255, 0.45), transparent);
}

.mh-metrics {
  @include flex(row, flex-end, center);
  gap: 5px;
}

.mh-metric {
  padding: 3px 11px;
  font-size: calc(12px * var(--fs, 1));
  font-family: inherit;
  color: $c-text-dim;
  background: rgba(64, 178, 255, 0.06);
  border: 1px solid rgba(64, 178, 255, 0.22);
  border-radius: 11px;
  cursor: pointer;
  transition: all 0.25s;

  &:hover {
    color: $c-text;
    border-color: rgba(94, 214, 255, 0.6);
  }

  &.active {
    color: #04182f;
    font-weight: 700;
    background: linear-gradient(180deg, #9ceaff, #2fd8ff);
    border-color: transparent;
    box-shadow: 0 0 10px rgba(47, 216, 255, 0.6);
  }
}

.map-body {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
  cursor: grab;
  touch-action: none;

  &.is-dragging {
    cursor: grabbing;
  }
}

/* 立体底座 + 主图一起变换，保证两张画布永远对齐 */
.map-inner {
  position: absolute;
  inset: 0;
  transform-origin: 0 0;
  will-change: transform;
}

.map-chart,
.map-backdrop {
  position: absolute;
  inset: 0;
}

.map-backdrop {
  z-index: 1;
}

.map-chart {
  z-index: 2;
}

/* ---- 浮层 ---- */
.map-total,
.map-rank,
.map-scale,
.map-index {
  position: absolute;
  z-index: 4;
  pointer-events: none;
}

.map-total {
  left: 16px;
  top: 14px;
  display: flex;
  flex-direction: column;
  gap: 7px;

  .mt-row {
    display: flex;
    align-items: baseline;
    gap: 8px;
  }

  .mt-label {
    font-size: calc(11px * var(--fs, 1));
    color: $c-text-dim;
    width: 72px;
  }

  .mt-value {
    font-family: $font-num;
    font-size: calc(17px * var(--fs, 1));
    color: $c-cyan;
    @include glow-text($c-cyan, 10px);

    i {
      font-style: normal;
      font-size: calc(10px * var(--fs, 1));
      color: $c-text-sub;
      margin-left: 3px;
    }
  }
}

.map-rank {
  right: 16px;
  top: 14px;
  width: 150px;

  .mr-title {
    font-size: calc(11px * var(--fs, 1));
    color: $c-text-dim;
    margin-bottom: 6px;
    padding-left: 8px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 3px;
      height: 10px;
      background: $c-cyan;
      box-shadow: 0 0 6px $c-cyan;
    }
  }

  li {
    display: flex;
    align-items: center;
    gap: 6px;
    height: 20px;
    font-size: calc(11px * var(--fs, 1));
  }

  .mr-idx {
    width: 14px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    font-family: $font-num;
    font-size: calc(10px * var(--fs, 1));
    color: #04182f;
    background: linear-gradient(180deg, #9ceaff, #2fd8ff);
    border-radius: 2px;
  }

  .mr-name {
    flex: 1;
    color: $c-text;
    @include ellipsis(1);
  }

  .mr-val {
    font-family: $font-num;
    font-size: calc(13px * var(--fs, 1));
    color: $c-gold;
  }
}

.map-scale {
  left: 16px;
  bottom: 14px;
  @include flex(row, flex-start, center);
  gap: 6px;
  font-family: $font-num;
  font-size: calc(11px * var(--fs, 1));
  color: $c-text-sub;

  i {
    display: block;
    width: 90px;
    height: 7px;
    border-radius: 4px;
    box-shadow: 0 0 8px rgba(47, 216, 255, 0.4);
  }

  em {
    font-style: normal;
    font-size: calc(10px * var(--fs, 1));
    color: $c-text-dim;
    margin-left: 2px;
  }
}

.map-index {
  right: 16px;
  bottom: 14px;
  @include flex(row, flex-end, baseline);
  gap: 8px;

  .mi-label {
    font-size: calc(12px * var(--fs, 1));
    color: $c-text-sub;
  }

  .mi-value {
    font-family: $font-num;
    font-size: calc(34px * var(--fs, 1));
    font-weight: 700;
    color: $c-cyan;
    @include glow-text($c-cyan, 18px);
  }
}

/* ---- 地图操作区 ---- */
.map-tools {
  position: absolute;
  left: 16px;
  bottom: 34px;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}

.mt-hint {
  font-size: calc(10px * var(--fs, 1));
  letter-spacing: 0.5px;
  color: $c-text-dim;
  opacity: 0.85;
}

.mt-reset {
  pointer-events: auto;
  padding: 2px 10px;
  font-size: calc(11px * var(--fs, 1));
  font-family: inherit;
  color: $c-cyan;
  background: rgba(47, 216, 255, 0.12);
  border: 1px solid rgba(47, 216, 255, 0.45);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.22s;

  &:hover {
    color: #04182f;
    background: $c-cyan;
    border-color: transparent;
    box-shadow: 0 0 10px rgba(47, 216, 255, 0.7);
  }
}
</style>
