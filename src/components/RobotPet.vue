<template>
  <div
    ref="petEl"
    class="rp"
    :class="{ 'is-dragging': dragging, 'is-near': near, 'is-left': pos.x < 220 }"
    :style="{ left: `${pos.x}px`, top: `${pos.y}px` }"
    role="button"
    tabindex="0"
    aria-label="科创源桌宠小创，可拖动，点击打招呼"
    @pointerdown="onPointerDown"
    @keydown.enter.prevent="greet"
    @keydown.space.prevent="greet"
  >
    <transition name="rp-pop">
      <p v-if="bubble" class="rp__bubble">{{ bubble }}</p>
    </transition>

    <svg class="rp__stage" viewBox="0 0 80 94" aria-hidden="true">
      <defs>
        <linearGradient id="rp-head" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#1e3a6e" />
          <stop offset="1" stop-color="#0b1b33" />
        </linearGradient>
        <linearGradient id="rp-body" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#29abe2" />
          <stop offset="1" stop-color="#1f4e9c" />
        </linearGradient>
        <radialGradient id="rp-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stop-color="#29abe2" stop-opacity="0.42" />
          <stop offset="1" stop-color="#29abe2" stop-opacity="0" />
        </radialGradient>
      </defs>

      <ellipse class="rp__shadow" cx="40" cy="88" rx="19" ry="4.6" fill="#000" opacity="0.42" />
      <circle class="rp__aura" cx="40" cy="46" r="34" fill="url(#rp-glow)" />

      <!-- 天线：logo 黄色菱形 -->
      <g class="rp__antenna">
        <line x1="40" y1="20" x2="40" y2="8" stroke="#9fd6f5" stroke-width="2.2" stroke-linecap="round" />
        <path d="M40 1.5 44 8 40 14.5 36 8Z" fill="#ffc61a" />
      </g>

      <!-- 头部：跟随鼠标轻微转动 -->
      <g class="rp__head" :style="headStyle">
        <rect x="13" y="17" width="54" height="38" rx="15" fill="url(#rp-head)" stroke="#29abe2" stroke-width="1.6" />
        <rect x="17" y="21" width="46" height="26" rx="11" fill="#071426" opacity="0.72" />
        <!-- 眼睛：位移朝向鼠标 -->
        <g class="rp__eyes" :style="eyeStyle">
          <path d="M29 30 33 34 29 38 25 34Z" fill="#29abe2" />
          <path d="M51 30 55 34 51 38 47 34Z" fill="#ffc61a" />
        </g>
        <circle class="rp__blush" cx="23" cy="44" r="2.6" fill="#e8492b" opacity="0.5" />
        <circle class="rp__blush" cx="57" cy="44" r="2.6" fill="#e8492b" opacity="0.5" />
      </g>

      <!-- 身体：logo 菱形拼块 -->
      <g class="rp__torso">
        <rect x="21" y="58" width="38" height="24" rx="10" fill="url(#rp-body)" opacity="0.92" />
        <path d="M40 62 45 67 40 72 35 67Z" fill="#e8492b" />
        <path d="M30 68.5 33 71.5 30 74.5 27 71.5Z" fill="#ffc61a" />
        <path d="M50 68.5 53 71.5 50 74.5 47 71.5Z" fill="#9fd6f5" />
      </g>

      <!-- 浮空菱形手臂 -->
      <g class="rp__arm rp__arm--l">
        <path d="M10 55 14 60 10 65 6 60Z" fill="#29abe2" opacity="0.85" />
      </g>
      <g class="rp__arm rp__arm--r">
        <path d="M70 55 74 60 70 65 66 60Z" fill="#f5a623" opacity="0.85" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue'

const STORAGE_KEY = 'sckcy-pet-pos'
const PET_W = 84
const PET_H = 96
const NEAR_RADIUS = 320

const petEl = ref(null)
const pos = reactive({ x: 0, y: 0 })
const dragging = ref(false)
const near = ref(false)
const bubble = ref('')
const eyeX = ref(0)
const eyeY = ref(0)
const tilt = ref(0)

const headStyle = computed(() => ({
  transform: `rotate(${tilt.value}deg)`,
  transformOrigin: '40px 52px',
}))
const eyeStyle = computed(() => ({
  transform: `translate(${eyeX.value}px, ${eyeY.value}px)`,
}))

let dragStart = null
let moved = false
let bubbleTimer = null
let pointerMoveHandler = null
let pointerUpHandler = null

function clampPos (x, y) {
  const maxX = Math.max(8, window.innerWidth - PET_W - 8)
  const maxY = Math.max(8, window.innerHeight - PET_H - 8)
  return {
    x: Math.min(Math.max(8, x), maxX),
    y: Math.min(Math.max(8, y), maxY),
  }
}

function setPos (x, y) {
  const next = clampPos(x, y)
  pos.x = next.x
  pos.y = next.y
}

function finishDrag () {
  dragging.value = false
  dragStart = null
  if (pointerMoveHandler) window.removeEventListener('pointermove', pointerMoveHandler)
  if (pointerUpHandler) {
    window.removeEventListener('pointerup', pointerUpHandler)
    window.removeEventListener('pointercancel', pointerUpHandler)
  }
  pointerMoveHandler = null
  pointerUpHandler = null
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ x: pos.x, y: pos.y }))
  } catch (err) {
    /* localStorage 不可用时忽略 */
  }
}

function onPointerDown (e) {
  if (e.pointerType === 'mouse' && e.button !== 0) return
  e.preventDefault()
  dragging.value = true
  moved = false
  dragStart = { x: e.clientX, y: e.clientY, ox: pos.x, oy: pos.y }

  pointerMoveHandler = (ev) => {
    if (!dragStart) return
    const dx = ev.clientX - dragStart.x
    const dy = ev.clientY - dragStart.y
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) moved = true
    setPos(dragStart.ox + dx, dragStart.oy + dy)
  }
  pointerUpHandler = () => {
    finishDrag()
    if (!moved) greet()
  }
  window.addEventListener('pointermove', pointerMoveHandler)
  window.addEventListener('pointerup', pointerUpHandler)
  window.addEventListener('pointercancel', pointerUpHandler)
}

function greet () {
  bubble.value = '你好，我是小创，带你逛科创源'
  clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => {
    bubble.value = ''
  }, 2600)
}

function onMouseMove (e) {
  if (dragging.value) {
    near.value = false
    return
  }
  const cx = pos.x + PET_W / 2
  const cy = pos.y + PET_H / 2 - 8
  const dx = e.clientX - cx
  const dy = e.clientY - cy
  const dist = Math.hypot(dx, dy)
  const active = dist < NEAR_RADIUS
  near.value = active
  if (!active) {
    eyeX.value = 0
    eyeY.value = 0
    tilt.value = 0
    return
  }
  const nx = dx / (dist || 1)
  const ny = dy / (dist || 1)
  const strength = Math.min(1, 0.45 + (NEAR_RADIUS - dist) / NEAR_RADIUS)
  eyeX.value = nx * 3.4 * strength
  eyeY.value = ny * 2.6 * strength
  tilt.value = Math.max(-9, Math.min(9, nx * 11 * strength))
}

function onResize () {
  setPos(pos.x, pos.y)
}

onMounted(() => {
  let saved = null
  try {
    saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
  } catch (err) {
    saved = null
  }
  if (saved && Number.isFinite(saved.x) && Number.isFinite(saved.y)) {
    setPos(saved.x, saved.y)
  } else {
    setPos(window.innerWidth - PET_W - 26, window.innerHeight - PET_H - 40)
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
  finishDrag()
  clearTimeout(bubbleTimer)
})
</script>

<style scoped>
.rp {
  position: fixed;
  z-index: 400;
  width: 84px;
  height: 96px;
  cursor: default;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
  filter: drop-shadow(0 10px 18px rgba(3, 12, 24, 0.34));
  transition: filter 0.25s ease;
}
.rp.is-dragging {
  filter: drop-shadow(0 16px 26px rgba(3, 12, 24, 0.44));
}
.rp:focus-visible {
  filter: drop-shadow(0 0 0.5px #29abe2) drop-shadow(0 0 12px rgba(41, 171, 226, 0.7));
}

.rp__stage {
  display: block;
  width: 84px;
  height: 96px;
  overflow: visible;
  animation: rp-float 3.4s ease-in-out infinite;
}
.rp.is-dragging .rp__stage {
  animation: none;
}

.rp__head,
.rp__eyes {
  transition: transform 0.16s ease-out;
}

.rp__antenna {
  transform-origin: 40px 20px;
  animation: rp-antenna 2.8s ease-in-out infinite;
}
.rp__arm--l {
  animation: rp-arm-l 2.6s ease-in-out infinite;
}
.rp__arm--r {
  animation: rp-arm-r 2.6s ease-in-out infinite;
}
.rp__aura {
  animation: rp-pulse 2.6s ease-in-out infinite;
}
.rp.is-near .rp__aura {
  animation-duration: 1.4s;
}

@keyframes rp-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
@keyframes rp-antenna {
  0%, 100% { transform: rotate(-4deg); }
  50% { transform: rotate(5deg); }
}
@keyframes rp-arm-l {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}
@keyframes rp-arm-r {
  0%, 100% { transform: translateY(-1px); }
  50% { transform: translateY(2px); }
}
@keyframes rp-pulse {
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
}

/* 气泡 */
.rp__bubble {
  position: absolute;
  right: 78px;
  top: 2px;
  width: max-content;
  max-width: 200px;
  margin: 0;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(41, 171, 226, 0.42);
  background: rgba(8, 20, 36, 0.94);
  color: #dff1ff;
  font-size: 13px;
  line-height: 1.5;
  letter-spacing: 0.5px;
  box-shadow: 0 8px 22px rgba(2, 10, 20, 0.36);
  pointer-events: none;
}
.rp__bubble::after {
  content: "";
  position: absolute;
  right: -6px;
  top: 18px;
  width: 10px;
  height: 10px;
  background: rgba(8, 20, 36, 0.94);
  border-right: 1px solid rgba(41, 171, 226, 0.42);
  border-bottom: 1px solid rgba(41, 171, 226, 0.42);
  transform: rotate(-45deg);
}
.rp.is-left .rp__bubble {
  right: auto;
  left: 78px;
}
.rp.is-left .rp__bubble::after {
  right: auto;
  left: -6px;
  transform: rotate(135deg);
}

.rp-pop-enter-active,
.rp-pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.rp-pop-enter-from,
.rp-pop-leave-to {
  opacity: 0;
  transform: translateY(4px) scale(0.96);
}

@media (prefers-reduced-motion: reduce) {
  .rp__stage,
  .rp__antenna,
  .rp__arm--l,
  .rp__arm--r,
  .rp__aura {
    animation: none;
  }
}

@media (max-width: 768px) {
  .rp {
    width: 68px;
    height: 78px;
  }
  .rp__stage {
    width: 68px;
    height: 78px;
  }
  .rp__bubble {
    max-width: 160px;
    font-size: 12px;
  }
}
</style>
