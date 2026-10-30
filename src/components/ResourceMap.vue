<template>
  <div class="rmap" :class="{ 'is-light': !isDark, 'rmap--compact': compact }">
    <div ref="hostRef" class="rmap__host"></div>

    <div v-if="state !== 'ready'" class="rmap__state" :class="`is-${state}`">
      {{ state === 'error' ? '地图加载失败' : '地图加载中' }}
    </div>

    <template v-if="!compact">
      <div class="rmap__ctrl">
        <button type="button" aria-label="放大" @click="zoomIn">+</button>
        <button type="button" aria-label="缩小" @click="zoomOut">−</button>
        <button type="button" class="rmap__ctrl-reset" aria-label="复位" @click="reset">复</button>
      </div>

      <div class="rmap__legend">
        <span v-for="item in legendItems" :key="item.kind" class="rmap__legend-item">
          <img :src="ICONS[item.kind]" alt="" />
          {{ item.label }}
        </span>
      </div>
    </template>

    <p v-if="compact && compactLabel" class="rmap__mini-mark">{{ compactLabel }}</p>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { geoRing } from '@/data/resource'

const props = defineProps({
  // [{ id, kind: 'park' | 'incubator' | 'uni', name, longitude, latitude, source }]
  points: { type: Array, default: () => [] },
  activeId: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  compactLabel: { type: String, default: '' },
})

const emit = defineEmits(['select'])

const { isDark } = useTheme()

// 沿用老站的高德 JSAPI 2.0 key 与点位图标（ztyq / fhq / gx）
const AMAP_KEY = '4dfb52433270e1e4e6503ae9628642fd'
const ICONS = {
  park: 'https://www.sjdxckcy.com/assets/ztyq-B5YSNbmB.png',
  incubator: 'https://www.sjdxckcy.com/assets/fhq-DvAPNN7K.png',
  uni: 'https://www.sjdxckcy.com/assets/gx-BStPVZpR.png',
}
const MAIN_CENTER = [121.125543, 31.03047]
const MAIN_ZOOM = 11.5
// 明色沿用老站默认彩色底图；暗色用深蓝样式，保留水系/绿地的色调
const MAP_STYLE = { dark: 'amap://styles/darkblue', light: 'amap://styles/normal' }

const legendItems = [
  { kind: 'park', label: '载体园区' },
  { kind: 'incubator', label: '孵化器' },
  { kind: 'uni', label: '高校' },
]

const hostRef = ref(null)
const state = ref('loading')

let map = null
let AMapLib = null
let polygon = null
let resizeObserver = null
const markers = new Map()

let loaderPromise = null

function loadAmapLib() {
  if (window.AMap) return Promise.resolve(window.AMap)
  if (loaderPromise) return loaderPromise

  loaderPromise = new Promise((resolve, reject) => {
    const boot = () => {
      window.AMapLoader.load({ key: AMAP_KEY, version: '2.0' }).then(resolve, reject)
    }
    if (window.AMapLoader) {
      boot()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://webapi.amap.com/loader.js'
    script.async = true
    script.onload = boot
    script.onerror = () => {
      loaderPromise = null
      reject(new Error('AMap loader 加载失败'))
    }
    document.head.appendChild(script)
  })

  return loaderPromise
}

function escapeHtml(text) {
  return String(text).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  })[c])
}

function markerHtml(point, active) {
  const kind = ICONS[point.kind] ? point.kind : 'park'
  const name = escapeHtml(point.name)
  return `<div class="arc-marker arc-marker--${kind}${active ? ' is-active' : ''}" role="button" aria-label="${name}">
    <span class="arc-marker__tip">${name}</span>
    <img class="arc-marker__img" src="${ICONS[kind]}" alt="" draggable="false" />
  </div>`
}

const keyOf = (point) => `${point.kind}-${point.id}`

const validPoints = () =>
  props.points.filter((p) => Number.isFinite(p.longitude) && Number.isFinite(p.latitude))

function drawBoundary() {
  if (!map) return
  polygon?.setMap(null)
  const dark = isDark.value
  polygon = new AMapLib.Polygon({
    path: geoRing,
    strokeColor: dark ? '#38bdf8' : '#0284c7',
    strokeWeight: 2,
    strokeOpacity: dark ? 0.85 : 0.7,
    strokeStyle: 'dashed',
    strokeDasharray: [4, 4, 4],
    fillColor: dark ? '#0ea5e9' : '#0284c7',
    fillOpacity: dark ? 0.08 : 0.05,
    zIndex: 10,
  })
  map.add(polygon)
}

function syncMarkers() {
  if (!map) return
  markers.forEach((marker) => marker.setMap(null))
  markers.clear()

  const list = validPoints()
  list.forEach((point) => {
    const key = keyOf(point)
    const active = key === props.activeId
    const marker = new AMapLib.Marker({
      position: [point.longitude, point.latitude],
      content: markerHtml(point, active),
      offset: new AMapLib.Pixel(-25, -56),
      zIndex: active ? 120 : 100,
    })
    marker.on('click', () => emit('select', point.source))
    marker.setMap(map)
    markers.set(key, marker)
  })

  if (props.compact && list.length) {
    const first = list[0]
    map.setZoomAndCenter(14, [first.longitude, first.latitude])
  }
}

function syncActive(next, prev) {
  ;[prev, next].forEach((key) => {
    if (!key) return
    const marker = markers.get(key)
    const point = props.points.find((p) => keyOf(p) === key)
    if (!marker || !point) return
    marker.setContent(markerHtml(point, key === next))
    marker.setzIndex(key === next ? 120 : 100)
  })
}

function fitDistrict() {
  if (!map) return
  map.setFitView(polygon ? [polygon] : [], false, [28, 28, 28, 28])
}

function zoomIn() {
  map?.zoomIn()
}

function zoomOut() {
  map?.zoomOut()
}

function reset() {
  if (!map) return
  if (props.compact) {
    const first = validPoints()[0]
    if (first) map.setZoomAndCenter(14, [first.longitude, first.latitude])
    return
  }
  fitDistrict()
}

onMounted(async () => {
  try {
    AMapLib = await loadAmapLib()
    const first = validPoints()[0]
    map = new AMapLib.Map(hostRef.value, {
      viewMode: '2D',
      zoom: props.compact ? 14 : MAIN_ZOOM,
      center: props.compact && first ? [first.longitude, first.latitude] : MAIN_CENTER,
      mapStyle: isDark.value ? MAP_STYLE.dark : MAP_STYLE.light,
      zooms: [8, 18],
      scrollWheel: !props.compact,
      dragEnable: !props.compact,
      doubleClickZoom: !props.compact,
      resizeEnable: true,
    })

    map.on('complete', () => {
      state.value = 'ready'
      if (!props.compact) fitDistrict()
    })

    drawBoundary()
    if (!props.compact) fitDistrict()
    syncMarkers()
    state.value = 'ready'

    resizeObserver = new ResizeObserver(() => map?.resize())
    resizeObserver.observe(hostRef.value)
  } catch (e) {
    state.value = 'error'
  }
})

watch(
  () => props.points,
  () => {
    if (map) syncMarkers()
  }
)

watch(
  () => props.activeId,
  (next, prev) => {
    if (map) syncActive(next, prev)
  }
)

watch(isDark, (dark) => {
  if (!map) return
  map.setMapStyle(dark ? MAP_STYLE.dark : MAP_STYLE.light)
  drawBoundary()
  if (!props.compact) fitDistrict()
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  resizeObserver = null
  markers.forEach((marker) => marker.setMap(null))
  markers.clear()
  map?.destroy()
  map = null
})
</script>

<style scoped>
.rmap {
  position: relative;
  height: 100%;
  min-height: 320px;
  overflow: hidden;
  border-radius: 18px;
  background: #040b16;
}
.rmap.is-light {
  background: #eef4fb;
}

.rmap__host {
  position: absolute;
  inset: 0;
  /* 独立堆叠上下文，避免高德点位图标盖住图例与缩放按钮 */
  z-index: 0;
}

.rmap__state {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 13px;
  letter-spacing: 2px;
  color: rgba(148, 190, 226, 0.75);
  background: rgba(4, 11, 22, 0.6);
  pointer-events: none;
  z-index: 5;
}
.rmap.is-light .rmap__state {
  color: #5a7189;
  background: rgba(243, 248, 253, 0.7);
}

.rmap__ctrl {
  position: absolute;
  right: 14px;
  top: 14px;
  display: grid;
  gap: 6px;
  z-index: 20;
}
.rmap__ctrl button {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid rgba(56, 189, 248, 0.55);
  background: rgba(4, 12, 24, 0.9);
  color: #dff4ff;
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease;
}
.rmap__ctrl button:hover {
  background: rgba(56, 189, 248, 0.24);
}
.rmap.is-light .rmap__ctrl button {
  border-color: rgba(2, 132, 199, 0.55);
  background: rgba(255, 255, 255, 0.94);
  color: #0f2233;
}
.rmap.is-light .rmap__ctrl button:hover {
  background: rgba(14, 165, 233, 0.16);
}
.rmap__ctrl-reset {
  font-size: 11px !important;
}

.rmap__legend {
  position: absolute;
  left: 14px;
  top: 14px;
  display: flex;
  gap: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(56, 189, 248, 0.18);
  background: rgba(4, 12, 24, 0.82);
  backdrop-filter: blur(8px);
  font-size: 11px;
  color: #dff4ff;
  letter-spacing: 1px;
  z-index: 20;
}
.rmap.is-light .rmap__legend {
  border-color: rgba(14, 116, 178, 0.18);
  background: rgba(255, 255, 255, 0.9);
  color: #0f2233;
}
.rmap__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
/* 图例使用与地图点位一致的旧站图标 */
.rmap__legend-item img {
  display: block;
  width: 15px;
  height: 17px;
  object-fit: contain;
}

.rmap__mini-mark {
  position: absolute;
  right: 14px;
  top: 14px;
  margin: 0;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(56, 189, 248, 0.55);
  background: rgba(4, 12, 24, 0.86);
  color: #dff4ff;
  font-size: 12px;
  z-index: 20;
}
.rmap.is-light .rmap__mini-mark {
  border-color: rgba(2, 132, 199, 0.5);
  background: rgba(255, 255, 255, 0.94);
  color: #0f2233;
}

@media (max-width: 900px) {
  .rmap {
    min-height: 300px;
  }
}
</style>

<style>
/* 点位图标由高德 Marker 动态生成，样式需全局生效 */
.arc-marker {
  --arc-accent: #38bdf8;
  position: relative;
  width: 50px;
  height: 56px;
  cursor: pointer;
}
.arc-marker--incubator {
  --arc-accent: #34d399;
}
.arc-marker--uni {
  --arc-accent: #fbbf24;
}
.rmap.is-light .arc-marker--park {
  --arc-accent: #0284c7;
}
.rmap.is-light .arc-marker--incubator {
  --arc-accent: #059669;
}
.rmap.is-light .arc-marker--uni {
  --arc-accent: #d97706;
}

.arc-marker__img {
  display: block;
  width: 50px;
  height: 56px;
  transition: transform 0.2s ease;
  filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.45));
}
.rmap.is-light .arc-marker__img {
  filter: drop-shadow(0 6px 12px rgba(15, 34, 51, 0.28));
}
.arc-marker:hover .arc-marker__img {
  transform: translateY(-3px);
}

.arc-marker__tip {
  position: absolute;
  left: 50%;
  bottom: calc(100% - 2px);
  transform: translate(-50%, 4px);
  padding: 3px 9px;
  border-radius: 6px;
  border: 1px solid rgba(56, 189, 248, 0.55);
  background: rgba(4, 12, 24, 0.92);
  color: #dff4ff;
  font-size: 11px;
  line-height: 1.5;
  letter-spacing: 0.4px;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.18s ease, transform 0.18s ease;
  z-index: 5;
}
.rmap.is-light .arc-marker__tip {
  border-color: rgba(2, 132, 199, 0.5);
  background: rgba(255, 255, 255, 0.96);
  color: #0f2233;
}
.arc-marker:hover .arc-marker__tip {
  opacity: 1;
  transform: translate(-50%, 0);
}

.arc-marker.is-active::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 18px;
  height: 18px;
  margin: -9px 0 0 -9px;
  border-radius: 50%;
  border: 2px solid var(--arc-accent);
  box-shadow: 0 0 12px var(--arc-accent);
  animation: arc-pulse 1.8s ease-out infinite;
}

@keyframes arc-pulse {
  0% {
    transform: scale(0.7);
    opacity: 0.9;
  }
  100% {
    transform: scale(2.1);
    opacity: 0;
  }
}
</style>
