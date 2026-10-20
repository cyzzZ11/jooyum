<template>
  <div class="tdt-map">
    <div v-if="!hasKey" class="tdt-map__placeholder">
      <el-icon class="tdt-map__icon"><MapLocation /></el-icon>
      <div class="tdt-map__title">天地图未配置</div>
      <div class="tdt-map__hint">
        请在 <code>public/config/appContext.js</code> 的 <code>tiandituKey</code> 填入天地图密钥
      </div>
    </div>
    <div v-else ref="el" class="tdt-map__canvas"></div>

    <!-- 底图切换：与参考站一致的两项（电子地图 / 影像图） -->
    <div v-if="hasKey" class="tdt-map__switcher">
      <span
        v-for="l in layers"
        :key="l.value"
        class="tdt-map__layer"
        :class="{ 'is-active': activeLayer === l.value }"
        @click="switchLayer(l.value)"
      >
        {{ l.name }}
      </span>
    </div>

    <!-- 街镇着色图例 -->
    <div v-if="hasKey && choroplethEnabled" class="tdt-map__legend">
      <span class="tdt-map__legend-title">{{ legendTitle }}</span>
      <div class="tdt-map__legend-bar"></div>
      <div class="tdt-map__legend-scale">
        <span>{{ legendMin }}</span>
        <span>{{ legendMax }}</span>
      </div>
      <div v-if="missingCount" class="tdt-map__legend-note">
        灰色：{{ emptyText }}（{{ missingCount }} 个街镇）
      </div>
    </div>

    <!-- 悬浮提示 -->
    <div
      v-if="hover"
      class="tdt-map__tip"
      :style="{ left: hover.x + 'px', top: hover.y + 'px' }"
    >
      <b>{{ hover.name }}</b>
      <span v-if="hover.text">{{ hover.text }}</span>
    </div>

    <!-- 底图/着色层加载失败提示（避免出现只有图例、地图空白的观感） -->
    <div v-if="mapError" class="tdt-map__error">{{ mapError }}</div>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
// maplibre-gl v6 使用具名导出（无 default），必须用命名空间导入
import * as maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
// v6 的 worker 是独立入口，需显式交给 Vite 打包成 worker 资源，
// 否则在构建/开发环境下会报 “Worker failed to load”
import MapWorker from 'maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'
import townsGeoRaw from '@/assets/songjiang-towns.geojson?raw'

maplibregl.setWorkerUrl(MapWorker)

/** 街道边界数据随包内置（避免 file:// 下 fetch 本地文件被拦截） */
const TOWNS_GEOJSON = JSON.parse(townsGeoRaw)
TOWNS_GEOJSON.features = (TOWNS_GEOJSON.features || []).map((f, i) => ({ ...f, id: i }))

/**
 * 天地图底图组件（标准 XYZ 瓦片，EPSG:3857，可直接被 MapLibre 作为 raster 源使用）。
 *
 * 底图切换（与参考站按钮文案一致）：
 *   `电子地图` → vec_w（矢量底图）+ cva_w（矢量注记）
 *   `影像图`   → img_w（影像底图）+ cia_w（影像注记）
 *
 * 街镇着色（choropleth）：加载 `public/geo/songjiang-towns.geojson`
 *   （松江区 16 个街镇真实行政边界），按传入的 `values` 为每个街镇填色，
 *   悬浮高亮并显示名称与数值。参考站对区县做同样处理，本项目下沉到街镇级。
 */
const props = defineProps({
  /** 覆盖 appContext 的中心点 */
  center: { type: Array, default: null },
  zoom: { type: Number, default: null },
  /**
   * 街镇着色数据：`{ 街镇名: 数值 }`。
   * 不传则不渲染着色层（如「资源一张图」这类只需底图的页面）。
   */
  values: { type: Object, default: null },
  /** 图例标题与数值单位 */
  legendTitle: { type: String, default: '' },
  valueUnit: { type: String, default: '' },
  /** 街镇无数据时的悬浮文案 */
  emptyText: { type: String, default: '暂无数据' }
})

/** ready：底图与着色层就绪；fail：Worker/瓦片被拦截，交由父组件降级 */
const emit = defineEmits(['ready', 'fail'])

const ctx = window.appContext || {}
const el = ref(null)
let map = null

const hasKey = computed(() => Boolean(ctx.tiandituKey))
const subdomains = ctx.tiandituSubdomains || ['0', '1', '2', '3', '4', '5', '6', '7']

const layers = [
  { name: '电子地图', value: 'vec' },
  { name: '影像图', value: 'img' }
]
const activeLayer = ref('vec')

const SRC_ID = 'towns'
const FILL_ID = 'towns-fill'
const LINE_ID = 'towns-line'
/** 街镇边界 GeoJSON 缓存（面层与名称标注共用） */
let townsGeoJSON = null
/** 街镇名称的 HTML Marker（symbol 层需 glyphs 字体服务，故不用） */
let townMarkers = []

const choroplethEnabled = computed(() => Boolean(props.values && Object.keys(props.values).length))
const hover = ref(null)
/** 底图 10 秒内未就绪时给出提示（file:// 下 worker/瓦片被拦截时不会只剩空白） */
const mapError = ref('')

/** 数值 → 颜色：低值深蓝 → 高值金色（与平台配色一致） */
const RAMP = [
  [0.0, [10, 40, 80]],
  [0.3, [8, 138, 251]],
  [0.6, [47, 210, 180]],
  [0.85, [255, 210, 0]],
  [1.0, [255, 140, 60]]
]
const lerp = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))
const colorAt = (t) => {
  // 伽马校正：指标分布常呈「一镇独大」的长尾（如景区：佘山 791 万是次高值的 2.4 倍），
  // 线性映射会把其余 16 个街镇全部压到色带最左端而难以区分。
  // 取指数 0.62 抬高低值段，只影响**配色分布**，图例显示与悬浮数值仍为真实值。
  const GAMMA = 0.62
  const x = Math.max(0, Math.min(1, Math.pow(Math.max(0, Math.min(1, t)), GAMMA)))
  for (let i = 0; i < RAMP.length - 1; i++) {
    const [p0, c0] = RAMP[i]
    const [p1, c1] = RAMP[i + 1]
    if (x >= p0 && x <= p1) return `rgb(${lerp(c0, c1, (x - p0) / (p1 - p0)).join(',')})`
  }
  return `rgb(${RAMP[RAMP.length - 1][1].join(',')})`
}

const valueRange = computed(() => {
  const arr = Object.values(props.values || {}).map(Number).filter((n) => Number.isFinite(n))
  if (!arr.length) return { min: 0, max: 1 }
  return { min: Math.min(...arr), max: Math.max(...arr) }
})

const fmtNum = (n) => {
  const v = Number(n)
  if (!Number.isFinite(v)) return '-'
  if (Math.abs(v) >= 1e8) return (v / 1e8).toFixed(2) + '亿'
  if (Math.abs(v) >= 1e4) return (v / 1e4).toFixed(2) + '万'
  return v.toLocaleString()
}
const legendMin = computed(() => (choroplethEnabled.value ? fmtNum(valueRange.value.min) + props.valueUnit : ''))
const legendMax = computed(() => (choroplethEnabled.value ? fmtNum(valueRange.value.max) + props.valueUnit : ''))
/** 无数据街镇数量：填充灰色并给出说明，避免透明空洞 */
const missingCount = computed(() => {
  if (!choroplethEnabled.value) return 0
  return (TOWNS_GEOJSON.features || []).filter(
    (f) => !Number.isFinite(Number(props.values[f.properties.name]))
  ).length
})

/**
 * 组装天地图瓦片地址模板。
 * 使用标准 XYZ 形式（`?T=...&x={x}&y={y}&l={z}`），
 * 不能带 `{}` 之外的 WMTS 花括号参数，否则 maplibre 无法解析模板。
 * 子域 {s} 由 transformRequest 替换。
 */
const tileUrl = (type) => {
  const kind = type === 'img' ? 'img_w' : 'vec_w'
  return `https://t{s}.tianditu.gov.cn/DataServer?T=${kind}&x={x}&y={y}&l={z}&tk=${ctx.tiandituKey}`
}

const labelUrl = (type) => {
  const kind = type === 'img' ? 'cia_w' : 'cva_w'
  return `https://t{s}.tianditu.gov.cn/DataServer?T=${kind}&x={x}&y={y}&l={z}&tk=${ctx.tiandituKey}`
}

const styleOf = (type) => ({
  version: 8,
  sources: {
    base: { type: 'raster', tiles: [tileUrl(type)], tileSize: 256, scheme: 'xyz', maxzoom: 18 },
    label: { type: 'raster', tiles: [labelUrl(type)], tileSize: 256, scheme: 'xyz', maxzoom: 18 }
  },
  layers: [
    { id: 'base', type: 'raster', source: 'base' },
    { id: 'label', type: 'raster', source: 'label' }
  ]
})

/** 把街镇面层加到当前样式（每次 setStyle 后都要重新加） */
async function addTownsLayer() {
  if (!map || !choroplethEnabled.value) return
  try {
    // 边界数据随包内置（模块作用域缓存），面层与标注共用
    if (!townsGeoJSON) {
      townsGeoJSON = TOWNS_GEOJSON
    }
    if (!map.getSource(SRC_ID)) {
      map.addSource(SRC_ID, { type: 'geojson', data: townsGeoJSON })
    }
    // ---- 街镇面层（按数值着色） ----
    // 边界已在预处理阶段做到**无缝铺满全区**（见 `_probe/rebuild-towns-shapely.py`：
    // 未归属区域按最近街镇归属后与街镇多边形合并，覆盖率 100%），
    // 因此**不需要**任何兜底图层或补丁图层，只有一层，不会出现叠层痕迹与条纹。
    const { min, max } = valueRange.value
    const span = max - min || 1
    /** 生成「按名称取色」的 match 表达式；未命中（无数据街镇）为灰色 */
    const buildMatch = (getter) => {
      const expr = ['match', getter]
      Object.entries(props.values).forEach(([name, val]) => {
        expr.push(name, colorAt((Number(val) - min) / span))
      })
      expr.push('rgba(150,170,190,0.42)')
      return expr
    }

    if (!map.getLayer(FILL_ID)) {
      map.addLayer({
        id: FILL_ID,
        type: 'fill',
        source: SRC_ID,
        paint: {
          'fill-color': buildMatch(['get', 'name']),
          'fill-opacity': 0.55
        }
      })
    }
    if (!map.getLayer(LINE_ID)) {
      map.addLayer({
        id: LINE_ID,
        type: 'line',
        source: SRC_ID,
        paint: {
          'line-color': 'rgba(122,212,255,.9)',
          'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 2.6, 1.2],
          'line-opacity': 0.95
        }
      })
    }

    // 街镇名称标注：用 **HTML Marker** 而非 symbol 层。
    // 原因：symbol 层需要 style.glyphs 字体端点，而本组件的 style 是纯栅格底图
    // （只有 raster source），没有 glyphs 配置 → 文字不会渲染。
    // HTML Marker 无需字体服务，且样式可控。
    clearTownLabels()
    for (const f of townsGeoJSON.features || []) {
      const c = f.properties && f.properties.center
      if (!Array.isArray(c)) continue
      const node = document.createElement('div')
      node.className = 'tdt-map__town-label'
      node.textContent = f.properties.name
      const marker = new maplibregl.Marker({ element: node, anchor: 'center' })
        .setLngLat(c)
        .addTo(map)
      townMarkers.push(marker)
    }
  } catch (e) {
    // 边界数据缺失时不阻塞底图
    console.warn('[tdt-map] 街镇边界加载失败', e)
  }
}

/** 清除已添加的街镇标注 */
function clearTownLabels() {
  while (townMarkers.length) {
    const m = townMarkers.pop()
    try { m.remove() } catch {}
  }
}

let hoveredId = null

function bindTownsEvents() {
  if (!map || !choroplethEnabled.value) return
  map.on('mousemove', FILL_ID, (e) => {
    if (!e.features || !e.features.length) return
    map.getCanvas().style.cursor = 'pointer'
    const f = e.features[0]
    const name = f.properties.name
    if (hoveredId !== null) map.setFeatureState({ source: SRC_ID, id: hoveredId }, { hover: false })
    hoveredId = f.id
    map.setFeatureState({ source: SRC_ID, id: hoveredId }, { hover: true })
    const v = props.values[name]
    hover.value = {
      x: e.point.x + 12,
      y: e.point.y + 12,
      name,
      text: v === undefined ? props.emptyText : fmtNum(v) + props.valueUnit
    }
  })
  map.on('mouseleave', FILL_ID, () => {
    map.getCanvas().style.cursor = ''
    if (hoveredId !== null) map.setFeatureState({ source: SRC_ID, id: hoveredId }, { hover: false })
    hoveredId = null
    hover.value = null
  })
}

function createMap() {
  if (!el.value || map) return
  map = new maplibregl.Map({
    container: el.value,
    style: styleOf(activeLayer.value),
    center: props.center || ctx.mapCenter || [121.223543, 31.03047],
    zoom: props.zoom || ctx.mapZoom || 11,
    attributionControl: false,
    transformRequest: (url) => ({
      url: url.replace(/\{s\}/g, subdomains[Math.floor(Math.random() * subdomains.length)])
    })
  })
  map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right')
  // 调试钩子：把实例挂到 window，便于在控制台/CDP 里检查图层与几何（对功能无影响）
  if (typeof window !== 'undefined') window.__tdtMap = map
  map.on('load', () => {
    mapError.value = ''
    emit('ready')
    addTownsLayer().then(bindTownsEvents)
  })
  // 兜底提示：8 秒内样式仍未就绪，说明 Worker/瓦片被环境拦截 → 通知父组件降级为离线矢量图
  setTimeout(() => {
    if (map && !map.isStyleLoaded()) {
      mapError.value = '底图加载失败：请检查网络，或使用离线矢量地图'
      emit('fail')
    }
  }, 8000)
  new ResizeObserver(() => map && map.resize()).observe(el.value)
}

const switchLayer = (type) => {
  activeLayer.value = type
  if (map) {
    map.setStyle(styleOf(type))
    // setStyle 会清空自定义图层，需在其后重新添加
    map.once('styledata', () => {
      addTownsLayer().then(bindTownsEvents)
    })
  }
}

onMounted(() => {
  if (hasKey.value) createMap()
})

watch(hasKey, (v) => {
  if (v) createMap()
})

// 着色数据变化时刷新配色（重建面层与线层）
watch(
  () => props.values,
  () => {
    if (!map) return
    for (const id of [FILL_ID, LINE_ID]) {
      if (map.getLayer(id)) map.removeLayer(id)
    }
    addTownsLayer().then(bindTownsEvents)
  },
  { deep: true }
)

onBeforeUnmount(() => {
  clearTownLabels()
  if (map) {
    map.remove()
    map = null
  }
})

defineExpose({ getMap: () => map })
</script>

<style scoped>
.tdt-map {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid rgba(8, 138, 251, 0.35);
  border-radius: 4px;
}

.tdt-map__canvas {
  width: 100%;
  height: 100%;
}

.tdt-map__placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background: radial-gradient(ellipse at center, rgba(8, 138, 251, 0.12), transparent 70%);
}

.tdt-map__icon {
  font-size: 42px;
  color: #088afb;
}

.tdt-map__title {
  font-size: 16px;
  color: #fff;
}

.tdt-map__hint {
  font-size: 13px;
  color: var(--sj-text-weak);
}

.tdt-map__hint code {
  color: var(--sj-gold);
}

/* 底图切换：文案与参考站一致（电子地图 / 影像图）。
   位置取「地图顶部中间」——地图左右两侧被三栏浮层覆盖（面板 z-index 1100），
   只有中间 x≈700–1250 这一段没被遮挡，按钮放这里才看得到、点得到。 */
.tdt-map__switcher {
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

.tdt-map__layer {
  padding: 3px 14px;
  font-size: 13px;
  border-radius: 3px;
  cursor: pointer;
  color: #cfe6ff;
  border: 1px solid rgba(8, 138, 251, 0.5);
  background: rgba(10, 109, 190, 0.35);
  transition: all 0.2s ease;
}

.tdt-map__layer:hover {
  border-color: rgba(8, 138, 251, 0.95);
}

.tdt-map__layer.is-active {
  color: #1a1408;
  font-weight: 700;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
  border-color: transparent;
}

/* 街镇着色图例：放在切换按钮正下方，避免压到右栏面板 */
.tdt-map__legend {
  position: absolute;
  left: 50%;
  top: 52px;
  transform: translateX(-50%);
  z-index: 40;
  padding: 5px 10px 6px;
  border-radius: 3px;
  background: rgba(3, 20, 35, 0.82);
  border: 1px solid rgba(8, 138, 251, 0.35);
  color: #cfe6ff;
  font-size: 12px;
  pointer-events: none;
}

.tdt-map__legend-title {
  display: block;
  margin-bottom: 3px;
  color: #fff;
  text-align: center;
}

.tdt-map__legend-bar {
  width: 150px;
  height: 7px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgb(10, 40, 80) 0%,
    rgb(8, 138, 251) 30%,
    rgb(47, 210, 180) 60%,
    rgb(255, 210, 0) 85%,
    rgb(255, 140, 60) 100%
  );
}

.tdt-map__legend-scale {
  display: flex;
  justify-content: space-between;
  margin-top: 3px;
  font-size: 11px;
  color: rgba(180, 220, 255, 0.85);
}

.tdt-map__legend-note {
  margin-top: 5px;
  font-size: 11px;
  color: rgba(190, 205, 220, 0.7);
}

/* 悬浮提示 */
.tdt-map__tip {
  position: absolute;
  z-index: 6;
  padding: 4px 8px;
  border-radius: 3px;
  background: rgba(3, 20, 35, 0.88);
  border: 1px solid rgba(8, 138, 251, 0.45);
  color: #e6f2ff;
  font-size: 12px;
  pointer-events: none;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.tdt-map__tip b {
  color: #fff;
}

.tdt-map__tip span {
  color: #ffd200;
}

/* 底图加载失败提示 */
.tdt-map__error {
  position: absolute;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  z-index: 8;
  padding: 6px 14px;
  border-radius: 4px;
  background: rgba(120, 30, 30, 0.85);
  border: 1px solid rgba(255, 120, 120, 0.5);
  color: #ffe9e9;
  font-size: 12px;
  white-space: nowrap;
}

/* 街镇名称标注（HTML Marker）：深色描边保证在电子地图与影像图上都能读清 */
:deep(.tdt-map__town-label) {
  font-size: 12px;
  line-height: 1;
  color: #fff;
  white-space: nowrap;
  pointer-events: none;
  text-shadow: 0 0 3px rgba(2, 16, 30, 0.95), 0 0 6px rgba(2, 16, 30, 0.8),
    1px 1px 0 rgba(2, 16, 30, 0.9), -1px -1px 0 rgba(2, 16, 30, 0.9);
}
</style>
