<template>
  <div
    ref="host"
    class="town-choropleth"
    :class="{ 'is-dragging': dragging }"
    @pointerdown="onDragStart"
    @pointermove="onDragMove"
    @pointerup="onDragEnd"
    @pointercancel="onDragEnd"
    @wheel.prevent="onWheel"
  >
    <!-- 天地图底图（纯 <img> 拼接，不依赖 Worker / WebGL，file:// 下同样可用） -->
    <div v-if="showBasemap" class="town-choropleth__basemap">
      <img
        v-for="t in tiles"
        :key="t.key"
        :src="t.url"
        class="town-choropleth__tile"
        :style="{ left: t.left + 'px', top: t.top + 'px' }"
        alt=""
        draggable="false"
        @error="onTileError"
      />
    </div>

    <!-- 街镇色块 + 名称（SVG，坐标与底图瓦片同一墨卡托坐标系） -->
    <svg class="town-choropleth__svg" :viewBox="`0 0 ${size.w} ${size.h}`" preserveAspectRatio="none">
      <g>
        <path
          v-for="t in shapes"
          :key="t.name"
          :d="t.d"
          :fill="t.color"
          :stroke="hover === t.name ? '#ffffff' : 'rgba(122,212,255,.85)'"
          :stroke-width="hover === t.name ? 2.4 : 1.1"
          fill-rule="evenodd"
          class="town-choropleth__area"
          @mouseenter="hover = t.name"
          @mousemove="onMove"
          @mouseleave="hover = ''"
        />
      </g>
      <g>
        <text
          v-for="t in labels"
          :key="t.name"
          :x="t.x"
          :y="t.y"
          class="town-choropleth__label"
          text-anchor="middle"
        >
          {{ t.name }}
        </text>
      </g>
    </svg>

    <!-- 底图切换：电子地图 / 影像图（与在线版一致的两项） -->
    <div v-if="hasKey" class="town-choropleth__switcher" @pointerdown.stop @wheel.stop>
      <span
        v-for="l in basemapOptions"
        :key="l.value"
        class="town-choropleth__layer"
        :class="{ 'is-active': basemap === l.value }"
        @click="switchBasemap(l.value)"
      >
        {{ l.name }}
      </span>
    </div>

    <!-- 缩放控件（滚轮/按钮均可） -->
    <div class="town-choropleth__zoom" @pointerdown.stop @wheel.stop>
      <span class="town-choropleth__zoom-btn" title="放大" @click="zoomCenter(1)">+</span>
      <span class="town-choropleth__zoom-btn" title="缩小" @click="zoomCenter(-1)">−</span>
      <span class="town-choropleth__zoom-btn is-text" title="复位" @click="resetView">复位</span>
    </div>

    <!-- 街镇着色图例 -->
    <div v-if="hasValues" class="town-choropleth__legend" @pointerdown.stop @wheel.stop>
      <span class="town-choropleth__legend-title">{{ legendTitle }}</span>
      <div class="town-choropleth__legend-bar"></div>
      <div class="town-choropleth__legend-scale">
        <span>{{ legendMin }}</span>
        <span>{{ legendMax }}</span>
      </div>
      <div v-if="missingCount" class="town-choropleth__legend-note">
        灰色：{{ emptyText }}（{{ missingCount }} 个街镇）
      </div>
    </div>

    <!-- 悬浮提示 -->
    <div
      v-if="hover && !dragging"
      class="town-choropleth__tip"
      :style="{ left: tip.x + 'px', top: tip.y + 'px' }"
    >
      <b>{{ hover }}</b>
      <span v-if="hoverValue !== ''"> {{ hoverValue }}{{ valueUnit }}</span>
      <span v-else> {{ emptyText }}</span>
    </div>

    <div class="town-choropleth__hint">{{ hintText }}</div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import townsGeoRaw from '@/assets/songjiang-towns.geojson?raw'

/**
 * 离线矢量地图（可叠加天地图底图瓦片）。
 *
 * 为什么不用 maplibre：
 *   `file://` 直开时浏览器会拦截 Worker（样式/瓦片解析在 Worker 内），
 *   表现为「只有图例、没有区域色块」。这里改为：
 *     · 底图 = 天地图 raster 瓦片，用普通 <img> 按墨卡托网格拼接（需联网）；
 *     · 着色 = 对街镇 GeoJSON 做 Web Mercator 投影后直接绘制 SVG 路径；
 *     · 不依赖 Worker / WebGL，任何浏览器双击打开都能渲染。
 *
 * 交互（自实现，等价于地图控件的拖拽/滚轮/底图切换）：
 *   · 视图状态为 {z, cx, cy}（整数层级 + 该层级下的世界像素中心）；
 *   · 拖拽平移只改 cx/cy，瓦片与 SVG 同步重排；
 *   · 滚轮/按钮缩放改 z，并保持光标（或中心）下的地理点不动。
 */
const props = defineProps({
  /** `{ 街镇名: 数值 }` */
  values: { type: Object, default: null },
  legendTitle: { type: String, default: '' },
  valueUnit: { type: String, default: '' },
  /** 街镇无数据时的悬浮文案 */
  emptyText: { type: String, default: '暂无数据' }
})

const ctx = window.appContext || {}
const host = ref(null)
const size = ref({ w: 0, h: 0 })
const tileErrors = ref(0)
const hover = ref('')
const tip = ref({ x: 0, y: 0 })
const dragging = ref(false)

const townsGeo = JSON.parse(townsGeoRaw)
const features = townsGeo.features || []

/* ---------- 数值区间与配色（与天地图版同一色带） ---------- */
const hasValues = computed(() => Boolean(props.values && Object.keys(props.values).length))
const valueRange = computed(() => {
  const nums = Object.values(props.values || {}).map(Number).filter((n) => Number.isFinite(n))
  return nums.length ? { min: Math.min(...nums), max: Math.max(...nums) } : { min: 0, max: 1 }
})
const fmtNum = (v) => Number(v).toLocaleString('zh-CN', { maximumFractionDigits: 0 })
const legendMin = computed(() => (hasValues.value ? fmtNum(valueRange.value.min) + props.valueUnit : ''))
const legendMax = computed(() => (hasValues.value ? fmtNum(valueRange.value.max) + props.valueUnit : ''))
/** 无数据街镇数量：渲染为灰色并给出说明，避免透明空洞或哨兵值（如 1） */
const missingCount = computed(() => {
  if (!hasValues.value) return 0
  return features.filter((f) => !Number.isFinite(Number((props.values || {})[f.properties.name]))).length
})

const RAMP = [
  [0.0, [10, 40, 80]],
  [0.3, [8, 138, 251]],
  [0.6, [47, 210, 180]],
  [0.85, [255, 210, 0]],
  [1.0, [255, 140, 60]]
]
const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
function colorAt(t) {
  const x = Math.max(0, Math.min(1, t)) ** 0.62
  for (let i = 1; i < RAMP.length; i += 1) {
    if (x <= RAMP[i][0]) {
      const [x0, c0] = RAMP[i - 1]
      const [x1, c1] = RAMP[i]
      const rgb = lerp(c0, c1, (x - x0) / (x1 - x0 || 1))
      return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`
    }
  }
  const last = RAMP[RAMP.length - 1][1]
  return `rgb(${last[0]},${last[1]},${last[2]})`
}

/* ---------- 边界包围盒 ---------- */
const coords = []
const collect = (arr) => {
  if (typeof arr[0] === 'number') coords.push(arr)
  else arr.forEach(collect)
}
features.forEach((f) => collect(f.geometry.coordinates))
const minLon = Math.min(...coords.map((c) => c[0]))
const maxLon = Math.max(...coords.map((c) => c[0]))
const minLat = Math.min(...coords.map((c) => c[1]))
const maxLat = Math.max(...coords.map((c) => c[1]))

/* ---------- Web Mercator 投影 ---------- */
const TILE = 256
const MIN_Z = 8
const MAX_Z = 16
const worldSize = (z) => TILE * 2 ** z
const mercX = (lon, z) => ((lon + 180) / 360) * worldSize(z)
const mercY = (lat, z) => {
  const s = Math.sin((lat * Math.PI) / 180)
  return (0.5 - Math.log((1 + s) / (1 - s)) / (4 * Math.PI)) * worldSize(z)
}

/** 初始视图：让全区边界铺满可视区（留 6% 边距） */
const fitView = computed(() => {
  const { w, h } = size.value
  if (!w || !h) return null
  let z = MIN_Z
  for (let cand = 14; cand >= MIN_Z; cand -= 1) {
    const bw = mercX(maxLon, cand) - mercX(minLon, cand)
    const bh = mercY(minLat, cand) - mercY(maxLat, cand)
    if (bw <= w * 0.94 && bh <= h * 0.94) {
      z = cand
      break
    }
  }
  return {
    z,
    cx: (mercX(minLon, z) + mercX(maxLon, z)) / 2,
    cy: (mercY(minLat, z) + mercY(maxLat, z)) / 2
  }
})

/** 视图：z = 层级，cx/cy = 该层级下屏幕中心对应的世界像素坐标 */
const view = ref(null)

/** 限制中心点：保证至少还能看到部分辖区，避免拖出视野后找不回来 */
const clampView = (next) => {
  const { w, h } = size.value
  if (!w || !h) return next
  const { z } = next
  const padX = Math.max(0, w / 2 - 40)
  const padY = Math.max(0, h / 2 - 40)
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v))
  return {
    z,
    cx: clamp(next.cx, mercX(minLon, z) - padX, mercX(maxLon, z) + padX),
    cy: clamp(next.cy, mercY(maxLat, z) - padY, mercY(minLat, z) + padY)
  }
}

const layout = computed(() => {
  const v = view.value
  const { w, h } = size.value
  if (!v || !w || !h) return null
  return { z: v.z, left: v.cx - w / 2, top: v.cy - h / 2 }
})

const project = (lon, lat) => {
  const l = layout.value
  if (!l) return [0, 0]
  return [mercX(lon, l.z) - l.left, mercY(lat, l.z) - l.top]
}

/* ---------- 底图瓦片 ---------- */
const hasKey = Boolean(ctx.tiandituKey)
const showBasemap = computed(() => hasKey && tileErrors.value < 3 && Boolean(layout.value))

const basemapOptions = [
  { name: '电子地图', value: 'vec' },
  { name: '影像图', value: 'img' }
]
/** 底图 + 对应注记层（天地图矢量注记 cva / 影像注记 cia） */
const BASEMAP_LAYERS = {
  vec: ['vec_w', 'cva_w'],
  img: ['img_w', 'cia_w']
}
const basemap = ref('vec')
const switchBasemap = (type) => {
  basemap.value = type
}

const tiles = computed(() => {
  const l = layout.value
  if (!l || !showBasemap.value) return []
  const { w, h } = size.value
  const x0 = Math.floor(l.left / TILE)
  const x1 = Math.floor((l.left + w) / TILE)
  const y0 = Math.floor(l.top / TILE)
  const y1 = Math.floor((l.top + h) / TILE)
  const out = []
  for (const type of BASEMAP_LAYERS[basemap.value] || BASEMAP_LAYERS.vec) {
    for (let x = x0; x <= x1; x += 1) {
      for (let y = y0; y <= y1; y += 1) {
        const s = (x + y) % 8
        out.push({
          key: `${type}-${l.z}-${x}-${y}`,
          url: `https://t${s}.tianditu.gov.cn/DataServer?T=${type}&x=${x}&y=${y}&l=${l.z}&tk=${ctx.tiandituKey}`,
          left: Math.round(x * TILE - l.left),
          top: Math.round(y * TILE - l.top)
        })
      }
    }
  }
  return out
})

const onTileError = () => {
  tileErrors.value += 1
}

/* ---------- 交互：拖拽平移 ---------- */
/** 大屏用 transform: scale() 缩放，需要把屏幕像素换算回元素布局像素 */
const screenScale = () => {
  const el = host.value
  const rect = el.getBoundingClientRect()
  return rect.width ? el.clientWidth / rect.width : 1
}

let drag = null
const onDragStart = (e) => {
  const v = view.value
  if (!v || (e.pointerType === 'mouse' && e.button !== 0)) return
  drag = { sx: e.clientX, sy: e.clientY, cx: v.cx, cy: v.cy, moved: false, id: e.pointerId }
  dragging.value = true
  try {
    host.value.setPointerCapture(e.pointerId)
  } catch {
    /* 部分浏览器不支持指针捕获，忽略即可 */
  }
}

const onDragMove = (e) => {
  if (!drag) return
  const k = screenScale()
  const dx = (e.clientX - drag.sx) * k
  const dy = (e.clientY - drag.sy) * k
  if (!drag.moved && Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true
  view.value = clampView({ z: view.value.z, cx: drag.cx - dx, cy: drag.cy - dy })
}

const onDragEnd = () => {
  if (!drag) return
  if (drag.id !== undefined && host.value) {
    try {
      host.value.releasePointerCapture(drag.id)
    } catch {
      /* 指针已释放 */
    }
  }
  drag = null
  dragging.value = false
}

/* ---------- 交互：缩放 ---------- */
/** 以 (lx, ly) 这条屏幕点为锚点缩放到指定层级，锚点下的地理点保持不动 */
const zoomAt = (targetZ, lx, ly) => {
  const v = view.value
  const { w, h } = size.value
  if (!v || !w || !h) return
  const z = Math.min(MAX_Z, Math.max(MIN_Z, targetZ))
  if (z === v.z) return
  const s = 2 ** (z - v.z)
  const wx = (v.cx - w / 2 + lx) * s
  const wy = (v.cy - h / 2 + ly) * s
  view.value = clampView({ z, cx: wx - lx + w / 2, cy: wy - ly + h / 2 })
}

const zoomCenter = (delta) => {
  const { w, h } = size.value
  zoomAt((view.value ? view.value.z : MIN_Z) + delta, w / 2, h / 2)
}

let lastWheel = 0
const onWheel = (e) => {
  const v = view.value
  if (!v) return
  // 触控板会连发事件，做个节流，避免一次滚动跨好几级
  const now = Date.now()
  if (now - lastWheel < 140) return
  lastWheel = now
  const el = host.value
  const rect = el.getBoundingClientRect()
  const k = screenScale()
  const lx = (e.clientX - rect.left) * k
  const ly = (e.clientY - rect.top) * k
  zoomAt(v.z + (e.deltaY > 0 ? -1 : 1), lx, ly)
}

const resetView = () => {
  if (fitView.value) view.value = clampView(fitView.value)
}

/* ---------- 色块与标注 ---------- */
const shapes = computed(() => {
  const { min, max } = valueRange.value
  const span = max - min || 1
  return features.map((f) => {
    const polys = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]
    const d = polys
      .map((poly) =>
        poly
          .map((ring) => {
            let path = ''
            ring.forEach((c, i) => {
              const [x, y] = project(c[0], c[1])
              path += `${i === 0 ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)}`
            })
            return `${path}Z`
          })
          .join(' ')
      )
      .join(' ')
    const val = Number((props.values || {})[f.properties.name])
    const color = Number.isFinite(val) ? colorAt((val - min) / span) : 'rgba(150,170,190,0.42)'
    return { name: f.properties.name, d, color }
  })
})

const labels = computed(() =>
  features
    .filter((f) => Array.isArray(f.properties.center))
    .map((f) => {
      const [x, y] = project(f.properties.center[0], f.properties.center[1])
      return { name: f.properties.name, x, y }
    })
)

/* ---------- 悬浮 ---------- */
const onMove = (e) => {
  const el = host.value
  const rect = el.getBoundingClientRect()
  // 大屏采用 transform: scale() 缩放，getBoundingClientRect 是缩放后的屏幕坐标，
  // 这里换算回元素内部布局坐标，避免提示框偏移
  const k = rect.width ? el.clientWidth / rect.width : 1
  tip.value = { x: (e.clientX - rect.left) * k + 12, y: (e.clientY - rect.top) * k + 12 }
}
const hoverValue = computed(() => {
  if (!hover.value || !props.values) return ''
  const v = props.values[hover.value]
  return v === undefined ? '' : fmtNum(v)
})

const hintText = computed(() =>
  showBasemap.value
    ? '数据来源：天地图 · 手机信令大数据 · 可拖拽平移 / 滚轮缩放'
    : '离线矢量示意图（底图未加载）· 可拖拽平移 / 滚轮缩放'
)

/* ---------- 尺寸监听 ---------- */
let ro = null
watch(
  size,
  () => {
    if (!view.value) view.value = fitView.value
    else if (fitView.value) view.value = clampView(view.value)
  },
  { immediate: true }
)

onMounted(() => {
  const el = host.value
  if (!el) return
  const update = () => {
    // 用 clientWidth/clientHeight 取**布局尺寸**：大屏用 transform: scale() 缩放，
    // getBoundingClientRect 得到的是缩放后的屏幕尺寸，会导致底图与色块错位。
    size.value = { w: el.clientWidth, h: el.clientHeight }
  }
  update()
  ro = new ResizeObserver(update)
  ro.observe(el)
})
onBeforeUnmount(() => ro && ro.disconnect())
</script>

<style scoped>
.town-choropleth {
  position: absolute;
  inset: 0;
  overflow: hidden;
  background: #041426;
  cursor: grab;
  touch-action: none;
  user-select: none;
}

.town-choropleth.is-dragging {
  cursor: grabbing;
}

.town-choropleth__basemap {
  position: absolute;
  inset: 0;
  overflow: hidden;
}

/* 蓝色压暗层：把天地图浅色底图调成大屏深蓝风格 */
.town-choropleth__basemap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(3, 26, 48, 0.45), rgba(2, 14, 28, 0.55));
}

.town-choropleth__tile {
  position: absolute;
  width: 256px;
  height: 256px;
  user-select: none;
  -webkit-user-drag: none;
  /* 适度压暗底图，保留道路与地名细节 */
  filter: brightness(0.8) saturate(0.95) contrast(1.05) hue-rotate(-8deg);
}

.town-choropleth__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.town-choropleth__area {
  transition: stroke 0.15s ease, stroke-width 0.15s ease;
  fill-opacity: 0.62;
}

.town-choropleth__label {
  fill: rgba(230, 244, 255, 0.95);
  font-size: 12px;
  font-weight: 600;
  paint-order: stroke;
  stroke: rgba(2, 14, 28, 0.9);
  stroke-width: 3px;
  stroke-linejoin: round;
  pointer-events: none;
}

/* 底图切换（样式对齐在线版 tdt-map 的切换条） */
.town-choropleth__switcher {
  position: absolute;
  left: 50%;
  top: 8px;
  transform: translateX(-50%);
  z-index: 40;
  display: flex;
  gap: 6px;
  padding: 5px 8px;
  border-radius: 4px;
  background: rgba(3, 20, 35, 0.82);
  border: 1px solid rgba(8, 138, 251, 0.5);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.town-choropleth__layer {
  padding: 3px 14px;
  font-size: 13px;
  border-radius: 3px;
  cursor: pointer;
  color: #cfe6ff;
  border: 1px solid rgba(8, 138, 251, 0.5);
  background: rgba(10, 109, 190, 0.35);
  transition: all 0.2s ease;
}

.town-choropleth__layer:hover {
  border-color: rgba(8, 138, 251, 0.95);
}

.town-choropleth__layer.is-active {
  color: #1a1408;
  font-weight: 700;
  background: linear-gradient(180deg, var(--sj-gold-light, #ffe9a8), var(--sj-gold-dark, #d9a441));
  border-color: transparent;
}

/* 缩放控件 */
.town-choropleth__zoom {
  position: absolute;
  right: 10px;
  top: 56px;
  z-index: 40;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 4px;
  border-radius: 4px;
  background: rgba(3, 20, 35, 0.82);
  border: 1px solid rgba(8, 138, 251, 0.5);
}

.town-choropleth__zoom-btn {
  width: 26px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  font-size: 15px;
  line-height: 1;
  color: #cfe6ff;
  cursor: pointer;
  background: rgba(10, 109, 190, 0.35);
  border: 1px solid rgba(8, 138, 251, 0.45);
  transition: all 0.2s ease;
}

.town-choropleth__zoom-btn:hover {
  border-color: rgba(8, 138, 251, 0.95);
  color: #fff;
}

.town-choropleth__zoom-btn.is-text {
  width: 26px;
  font-size: 11px;
}

.town-choropleth__legend {
  position: absolute;
  left: 18px;
  bottom: 16px;
  width: 190px;
  padding: 8px 10px;
  border-radius: 4px;
  background: rgba(3, 20, 35, 0.78);
  border: 1px solid rgba(8, 138, 251, 0.35);
  color: rgba(220, 238, 255, 0.9);
  font-size: 12px;
}

.town-choropleth__legend-title {
  display: block;
  margin-bottom: 6px;
  color: #fff;
  font-weight: 700;
}

.town-choropleth__legend-bar {
  height: 8px;
  border-radius: 2px;
  background: linear-gradient(90deg, #0a2850, #088afb, #2fd2b4, #ffd200, #ff8c3c);
}

.town-choropleth__legend-scale {
  display: flex;
  justify-content: space-between;
  margin-top: 4px;
  font-size: 11px;
  color: rgba(200, 226, 255, 0.75);
}

.town-choropleth__legend-note {
  margin-top: 6px;
  font-size: 11px;
  color: rgba(190, 205, 220, 0.7);
}

.town-choropleth__tip {
  position: absolute;
  z-index: 20;
  padding: 4px 8px;
  border-radius: 3px;
  background: rgba(3, 28, 52, 0.94);
  border: 1px solid rgba(8, 138, 251, 0.5);
  color: #fff;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
}

.town-choropleth__hint {
  position: absolute;
  right: 10px;
  bottom: 8px;
  font-size: 11px;
  color: rgba(160, 200, 235, 0.55);
  pointer-events: none;
}
</style>
