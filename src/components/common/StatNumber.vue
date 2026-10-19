<script setup lang="ts">
/** 数字滚动（进入视口 / 数值变化时动画到目标值） */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { thousands } from '@/utils/format'

const props = withDefaults(
  defineProps<{
    value: number
    decimals?: number
    duration?: number
  }>(),
  { decimals: 0, duration: 900 }
)

const display = ref('0')
let raf = 0

function animate(to: number) {
  cancelAnimationFrame(raf)
  const from = Number(display.value.replace(/,/g, '')) || 0
  const start = performance.now()
  const step = (now: number) => {
    // 注意：rAF 时间戳可能早于注册时的 performance.now()，必须夹紧到 [0,1]，
    // 否则缓动值会变成负数，数字会瞬间显示为负值。
    const t = Math.min(1, Math.max(0, (now - start) / props.duration))
    const eased = 1 - Math.pow(1 - t, 3)
    display.value = thousands(from + (to - from) * eased, props.decimals)
    if (t < 1) raf = requestAnimationFrame(step)
  }
  raf = requestAnimationFrame(step)
}

onMounted(() => animate(props.value))
watch(
  () => props.value,
  (v) => animate(v)
)
onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <span class="stat-number">{{ display }}</span>
</template>

<style scoped lang="scss">
.stat-number {
  font-family: $font-num;
  font-variant-numeric: tabular-nums;
}
</style>
