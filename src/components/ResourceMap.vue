<template>
  <div class="rmap" :class="{ 'is-light': !isDark, 'rmap--compact': compact }">
    <svg
      ref="svgRef"
      class="rmap__svg"
      :viewBox="viewBox"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="松江区载体资源分布地图"
      @wheel.prevent="onWheel"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointerleave="onUp"
    >
      <defs>
        <linearGradient id="rmap-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="var(--rmap-bg-a)" />
          <stop offset="100%" stop-color="var(--rmap-bg-b)" />
        </linearGradient>
        <linearGradient id="rmap-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="var(--rmap-area-a)" />
          <stop offset="100%" stop-color="var(--rmap-area-b)" />
        </linearGradient>
        <filter id="rmap-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect x="0" y="0" :width="1000" :height="mapH" fill="url(#rmap-bg)" />
      <g class="rmap__grid" aria-hidden="true">
        <line
          v-for="n in 12"
          :key="`h${n}`"
          x1="0"
          :y1="(mapH / 12) * n"
          x2="1000"
          :y2="(mapH / 12) * n"
        />
        <line
          v-for="n in 8"
          :key="`v${n}`"
          :x1="(1000 / 8) * n"
          y1="0"
          :x2="(1000 / 8) * n"
          :y2="mapH"
        />
      </g>

      <g :transform="transform">
        <path class="rmap__area-glow" :d="boundaryPath" filter="url(#rmap-glow)" />
        <path class="rmap__area" :d="boundaryPath" fill="url(#rmap-area)" />
        <path class="rmap__boundary" :d="boundaryPath" />

        <text class="rmap__watermark" x="500" :y="mapH * 0.72" text-anchor="middle">SONGJIANG</text>

        <g
          v-for="t in townLabels"
          :key="t.name"
          class="rmap__town"
          :transform="`translate(${t.x},${t.y})`"
        >
          <text text-anchor="middle">{{ t.name }}</text>
        </g>

        <g
          v-for="p in markers"
          :key="`${p.kind}-${p.id}`"
          class="rmap__pin"
          :class="[`is-${p.kind}`, { 'is-active': activeId === `${p.kind}-${p.id}` }]"
          :transform="`translate(${p.x},${p.y})`"
          role="button"
          tabindex="0"
          :aria-label="p.name"
          @click.stop="$emit('select', p.source)"
          @mouseenter="hoverKey = `${p.kind}-${p.id}`"
          @mouseleave="hoverKey = ''"
          @keydown.enter.prevent="$emit('select', p.source)"
        >
          <circle class="rmap__pin-halo" r="15" />
          <circle class="rmap__pin-ring" r="9.5" />
          <circle class="rmap__pin-core" r="4.4" />
          <g v-if="hoverKey === `${p.kind}-${p.id}` || activeId === `${p.kind}-${p.id}`" class="rmap__tip">
            <rect :x="-labelWidth(p.name) / 2" y="-36" :width="labelWidth(p.name)" height="20" rx="6" />
            <text y="-22" text-anchor="middle">{{ p.name }}</text>
          </g>
        </g>
      </g>
    </svg>

    <div v-if="!compact" class="rmap__ctrl" aria-hidden="false">
      <button type="button" aria-label="放大" @click="zoomBy(1.35)">+</button>
      <button type="button" aria-label="缩小" @click="zoomBy(1 / 1.35)">−</button>
      <button type="button" class="rmap__ctrl-reset" aria-label="复位" @click="reset">复</button>
    </div>

    <div class="rmap__legend">
      <span class="rmap__legend-item rmap__legend-item--park">载体园区</span>
      <span class="rmap__legend-item rmap__legend-item--incubator">孵化器</span>
      <span class="rmap__legend-item rmap__legend-item--uni">高校</span>
    </div>

    <p v-if="compact" class="rmap__mini-mark" aria-hidden="true">{{ compactLabel }}</p>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { boundaryPath, project, viewBox } from '@/utils/resourceGeo'

const props = defineProps({
  // [{ id, kind: 'park' | 'uni', name, longitude, latitude, parkType, source }]
  points: { type: Array, default: () => [] },
  activeId: { type: String, default: '' },
  compact: { type: Boolean, default: false },
  compactLabel: { type: String, default: '' },
})

defineEmits(['select'])

const { isDark } = useTheme()

const mapH = Number(viewBox.split(' ')[3])
const svgRef = ref(null)
const hoverKey = ref('')
const scale = ref(1)
const offset = ref({ x: 0, y: 0 })
const dragging = ref(false)
let dragStart = null

const markers = computed(() =>
  props.points
    .filter((p) => Number.isFinite(p.longitude) && Number.isFinite(p.latitude))
    .map((p) => ({ ...p, ...project(p.longitude, p.latitude) }))
)

// 各乡镇点位质心，作为地图上的地名标注
const townLabels = computed(() => {
  const groups = {}
  props.points
    .filter((p) => p.kind === 'park' && p.town)
    .forEach((p) => {
      const g = (groups[p.town] = groups[p.town] || { x: 0, y: 0, n: 0 })
      const { x, y } = project(p.longitude, p.latitude)
      g.x += x
      g.y += y
      g.n += 1
    })
  return Object.entries(groups)
    .filter(([, g]) => g.n >= 2)
    .map(([name, g]) => ({ name: name.replace(/(街道|镇)$/, ''), x: g.x / g.n, y: g.y / g.n }))
})

const transform = computed(() => {
  const cx = 500
  const cy = mapH / 2
  const s = scale.value
  const o = offset.value
  return `translate(${cx + o.x} ${cy + o.y}) scale(${s}) translate(${-cx} ${-cy})`
})

function labelWidth(text) {
  return Math.max(52, text.length * 12 + 20)
}

function zoomBy(factor) {
  const next = Math.min(5, Math.max(1, scale.value * factor))
  if (next === 1) offset.value = { x: 0, y: 0 }
  scale.value = next
}

function reset() {
  scale.value = 1
  offset.value = { x: 0, y: 0 }
}

function onWheel(event) {
  if (props.compact) return
  zoomBy(event.deltaY < 0 ? 1.12 : 1 / 1.12)
}

function onDown(event) {
  if (props.compact || scale.value === 1) return
  dragging.value = true
  dragStart = { x: event.clientX, y: event.clientY, ox: offset.value.x, oy: offset.value.y }
  event.currentTarget.setPointerCapture?.(event.pointerId)
}

function onMove(event) {
  if (!dragging.value || !dragStart) return
  const ratio = 1000 / (svgRef.value?.clientWidth || 1000)
  offset.value = {
    x: dragStart.ox + (event.clientX - dragStart.x) * ratio,
    y: dragStart.oy + (event.clientY - dragStart.y) * ratio,
  }
}

function onUp() {
  dragging.value = false
  dragStart = null
}
</script>

<style scoped>
.rmap {
  --rmap-bg-a: #040b16;
  --rmap-bg-b: #071a30;
  --rmap-area-a: rgba(37, 99, 235, 0.2);
  --rmap-area-b: rgba(8, 145, 178, 0.06);
  --rmap-line: rgba(56, 189, 248, 0.55);
  --rmap-grid: rgba(56, 189, 248, 0.07);
  --rmap-town: rgba(148, 190, 226, 0.55);
  --rmap-park: #38bdf8;
  --rmap-incubator: #34d399;
  --rmap-uni: #fbbf24;
  --rmap-tip-bg: rgba(4, 12, 24, 0.92);
  --rmap-tip-text: #dff4ff;
  position: relative;
  height: 100%;
  min-height: 320px;
  overflow: hidden;
  border-radius: 18px;
  background: var(--rmap-bg-a);
}
.rmap.is-light {
  --rmap-bg-a: #eef4fb;
  --rmap-bg-b: #dceaf7;
  --rmap-area-a: rgba(14, 165, 233, 0.22);
  --rmap-area-b: rgba(14, 165, 233, 0.06);
  --rmap-line: rgba(2, 132, 199, 0.62);
  --rmap-grid: rgba(2, 132, 199, 0.09);
  --rmap-town: rgba(51, 84, 116, 0.62);
  --rmap-park: #0284c7;
  --rmap-incubator: #059669;
  --rmap-uni: #d97706;
  --rmap-tip-bg: rgba(255, 255, 255, 0.96);
  --rmap-tip-text: #0f2233;
}

.rmap__svg {
  display: block;
  width: 100%;
  height: 100%;
  cursor: grab;
}
.rmap__svg:active {
  cursor: grabbing;
}

.rmap__grid line {
  stroke: var(--rmap-grid);
  stroke-width: 1;
}

.rmap__area {
  stroke: none;
}
.rmap__area-glow {
  fill: rgba(56, 189, 248, 0.06);
}
.is-light .rmap__area-glow {
  fill: rgba(2, 132, 199, 0.05);
}
.rmap__boundary {
  fill: none;
  stroke: var(--rmap-line);
  stroke-width: 2;
  stroke-dasharray: 7 4;
  stroke-linejoin: round;
}

.rmap__watermark {
  font-family: "Inter", system-ui, sans-serif;
  font-size: 76px;
  font-weight: 700;
  letter-spacing: 10px;
  fill: var(--rmap-grid);
}

.rmap__town text {
  font-size: 13px;
  letter-spacing: 2px;
  fill: var(--rmap-town);
}

.rmap__pin {
  cursor: pointer;
  outline: none;
}
.rmap__pin-halo {
  fill: transparent;
  transition: fill 0.25s ease;
}
.rmap__pin-ring {
  fill: rgba(4, 12, 24, 0.55);
  stroke: var(--rmap-park);
  stroke-width: 2;
  transition: stroke 0.25s ease;
}
.rmap__pin-core {
  fill: var(--rmap-park);
  transition: fill 0.25s ease;
}
.rmap__pin.is-incubator .rmap__pin-ring {
  stroke: var(--rmap-incubator);
}
.rmap__pin.is-incubator .rmap__pin-core {
  fill: var(--rmap-incubator);
}
.rmap__pin.is-uni .rmap__pin-ring {
  stroke: var(--rmap-uni);
}
.rmap__pin.is-uni .rmap__pin-core {
  fill: var(--rmap-uni);
}
.rmap__pin:hover .rmap__pin-halo,
.rmap__pin.is-active .rmap__pin-halo {
  fill: rgba(56, 189, 248, 0.18);
}
.rmap__pin.is-active .rmap__pin-ring {
  stroke-width: 3;
  animation: rmap-pulse 1.8s ease-in-out infinite;
}

.rmap__tip rect {
  fill: var(--rmap-tip-bg);
  stroke: var(--rmap-line);
  stroke-width: 1;
}
.rmap__tip text {
  font-size: 11px;
  fill: var(--rmap-tip-text);
  letter-spacing: 0.5px;
}

.rmap__ctrl {
  position: absolute;
  right: 14px;
  top: 14px;
  display: grid;
  gap: 6px;
}
.rmap__ctrl button {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  border: 1px solid var(--rmap-line);
  background: var(--rmap-tip-bg);
  color: var(--rmap-tip-text);
  font-size: 16px;
  line-height: 1;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;
}
.rmap__ctrl button:hover {
  background: rgba(56, 189, 248, 0.2);
}
.rmap__ctrl-reset {
  font-size: 11px !important;
}

.rmap__legend {
  position: absolute;
  left: 16px;
  bottom: 14px;
  display: flex;
  gap: 14px;
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid var(--rmap-grid);
  background: color-mix(in srgb, var(--rmap-tip-bg) 82%, transparent);
  backdrop-filter: blur(8px);
  font-size: 11px;
  color: var(--rmap-tip-text);
  letter-spacing: 1px;
}
.rmap__legend-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.rmap__legend-item::before {
  content: "";
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--rmap-park);
  box-shadow: 0 0 8px var(--rmap-park);
}
.rmap__legend-item--incubator::before {
  background: var(--rmap-incubator);
  box-shadow: 0 0 8px var(--rmap-incubator);
}
.rmap__legend-item--uni::before {
  background: var(--rmap-uni);
  box-shadow: 0 0 8px var(--rmap-uni);
}

.rmap__mini-mark {
  position: absolute;
  right: 14px;
  bottom: 14px;
  margin: 0;
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid var(--rmap-line);
  background: var(--rmap-tip-bg);
  color: var(--rmap-tip-text);
  font-size: 12px;
}

.rmap--compact .rmap__legend {
  display: none;
}

@keyframes rmap-pulse {
  0%,
  100% {
    stroke-opacity: 1;
  }
  50% {
    stroke-opacity: 0.35;
  }
}

@media (max-width: 900px) {
  .rmap {
    min-height: 300px;
  }
}
</style>
