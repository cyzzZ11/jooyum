<script setup lang="ts">
/**
 * 大屏适配容器
 * 设计稿固定 1920x1080，整体等比缩放居中，保证任何分辨率下版式不变形。
 */
import { onBeforeUnmount, onMounted, ref } from 'vue'

const DESIGN_W = 1920
const DESIGN_H = 1080

const scale = ref(1)

function resize() {
  scale.value = Math.min(
    window.innerWidth / DESIGN_W,
    window.innerHeight / DESIGN_H
  )
}

onMounted(() => {
  resize()
  window.addEventListener('resize', resize)
})

onBeforeUnmount(() => window.removeEventListener('resize', resize))
</script>

<template>
  <div class="adapter">
    <div class="adapter-stage" :style="{ '--s': scale }">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
.adapter {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $c-bg-deep;

  &::before {
    // 整体氛围光
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(
        ellipse 70% 55% at 50% 0%,
        rgba(31, 120, 220, 0.22),
        transparent 70%
      ),
      radial-gradient(
        ellipse 60% 50% at 50% 110%,
        rgba(18, 88, 170, 0.18),
        transparent 70%
      ),
      linear-gradient(180deg, #030a1a 0%, #02060f 100%);
  }

  &-stage {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    transform: translate(-50%, -50%) scale(var(--s));
    transform-origin: center center;
    overflow: hidden;
  }
}
</style>
