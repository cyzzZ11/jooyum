<template>
  <div
    ref="petEl"
    class="rp"
    :class="{ 'is-near': near, 'is-peek': peekOut, 'is-hover': hover }"
    :style="{ top: `${pos.y}px`, right: `${posRight}px` }"
    role="button"
    tabindex="0"
    aria-label="科创源桌宠小创，鼠标悬停探出，点击打招呼"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @click="togglePeek"
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
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'

const PET_W = 84
const PET_H = 96
const NEAR_RADIUS = 280
const PEEK_VISIBLE = 18 // 默认只露出 18px（探头）
const PEEK_OUT = 24    // 完全滑出时距右边缘 24px
const AVOID_TOP_BTN = 180 // 避开右下角"返回顶部"按钮的距离

const petEl = ref(null)
const pos = reactive({ y: 0 })
const hover = ref(false)
const peekOut = ref(false) // 点击锁定滑出
const near = ref(false)
const bubble = ref('')
const eyeX = ref(0)
const eyeY = ref(0)
const tilt = ref(0)

const peekTimer = ref(null)
let bubbleTimer = null

const headStyle = computed(() => ({
  transform: `rotate(${tilt.value}deg)`,
  transformOrigin: '40px 52px',
}))
const eyeStyle = computed(() => ({
  transform: `translate(${eyeX.value}px, ${eyeY.value}px)`,
}))

// 固定在右侧，不探头
const posRight = computed(() => PEEK_OUT)

function clampY (y) {
  const maxY = Math.max(8, window.innerHeight - PET_H - 8)
  return Math.min(Math.max(8, y), maxY)
}

function placePet () {
  // 避开右下角返回顶部按钮：从底部上移 AVOID_TOP_BTN 像素
  pos.y = clampY(window.innerHeight - PET_H - AVOID_TOP_BTN)
}

function onPointerEnter () {
  hover.value = true
  clearTimeout(peekTimer.value)
}
function onPointerLeave () {
  hover.value = false
  // 如果没有点击锁定，离手后 1.2s 自动缩回
  if (!peekOut.value) {
    peekTimer.value = setTimeout(() => {
      // 自然缩回（transition 会处理）
    }, 1200)
  }
}

function togglePeek () {
  peekOut.value = !peekOut.value
  if (peekOut.value) {
    greet()
  }
}

function greet () {
  bubble.value = '你好，我是小创，带你逛科创源'
  clearTimeout(bubbleTimer)
  bubbleTimer = setTimeout(() => {
    bubble.value = ''
  }, 2600)
}

function onMouseMove (e) {
  if (!hover.value && !peekOut.value) {
    // 缩着的时候只在非常靠近右边缘时才动眼睛（小互动感）
    if (e.clientX > window.innerWidth - 120) {
      const cx = window.innerWidth - PET_W / 2
      const cy = pos.y + PET_H / 2 - 8
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.hypot(dx, dy)
      if (dist < NEAR_RADIUS) {
        const nx = dx / (dist || 1)
        const ny = dy / (dist || 1)
        const strength = Math.min(0.7, 0.3 + (NEAR_RADIUS - dist) / NEAR_RADIUS * 0.4)
        eyeX.value = nx * 3.4 * strength
        eyeY.value = ny * 2.6 * strength
        tilt.value = Math.max(-7, Math.min(7, nx * 9 * strength))
        near.value = true
        return
      }
    }
    near.value = false
    eyeX.value = 0
    eyeY.value = 0
    tilt.value = 0
    return
  }
  const cx = window.innerWidth - PET_W / 2
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
  placePet()
}

onMounted(() => {
  placePet()
  window.addEventListener('mousemove', onMouseMove, { passive: true })
  window.addEventListener('resize', onResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize', onResize)
  clearTimeout(bubbleTimer)
  clearTimeout(peekTimer.value)
})
</script>

<style scoped>
.rp {
  position: fixed;
  z-index: 400;
  width: 84px;
  height: 96px;
  cursor: pointer;
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  outline: none;
  filter: drop-shadow(0 10px 18px rgba(3, 12, 24, 0.34));
  /* 滑出动画：右侧定位 + 流畅 ease-out */
  transition:
    right 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.25s ease;
}
.rp.is-hover,
.rp.is-peek {
  filter: drop-shadow(0 14px 24px rgba(3, 12, 24, 0.44)) drop-shadow(-2px 0 10px rgba(41, 171, 226, 0.18));
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
.rp.is-hover .rp__stage,
.rp.is-peek .rp__stage {
  animation-duration: 2.2s;
  animation-timing-function: ease-in-out;
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
  .rp {
    transition: none;
  }
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
