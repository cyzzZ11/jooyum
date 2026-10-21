<script setup lang="ts">
/**
 * ECharts 容器：负责实例生命周期 + 容器尺寸自适应
 * option 请传 computed，避免每次渲染生成新对象导致无限 setOption。
 */
import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
  useTemplateRef,
  watch
} from 'vue'
import echarts, {
  type EChartsInstance,
  type EChartsOption
} from '@/utils/echarts'
import { useScreenStore } from '@/stores/screen'

const screen = useScreenStore()

const props = withDefaults(
  defineProps<{
    option: EChartsOption
    /** 是否在数据变化时完全替换（默认 true，避免残留旧 series） */
    notMerge?: boolean
  }>(),
  { notMerge: true }
)

const el = useTemplateRef<HTMLDivElement>('el')
const chart = shallowRef<EChartsInstance>()
let ro: ResizeObserver | undefined

/**
 * ECharts 的字号写死在 option 里，CSS 变量管不到，
 * 这里统一把 option 中所有 fontSize 乘上全局字号系数（含地图标签、tooltip、坐标轴）。
 * 每次都基于最新的 props.option 做深拷贝，不会叠加放大。
 */
function scaleFontSize<T>(node: T, k: number): T {
  if (k === 1) return node
  if (Array.isArray(node)) {
    return node.map((item) => scaleFontSize(item, k)) as unknown as T
  }
  if (node && typeof node === 'object') {
    const src = node as Record<string, unknown>
    const out: Record<string, unknown> = {}
    for (const key of Object.keys(src)) {
      const val = src[key]
      out[key] =
        key === 'fontSize' && typeof val === 'number' ? val * k : scaleFontSize(val, k)
    }
    return out as T
  }
  return node
}

function render() {
  if (!chart.value) return
  chart.value.setOption(scaleFontSize(props.option, screen.fontScale), props.notMerge)
}

onMounted(() => {
  if (!el.value) return
  chart.value = echarts.init(el.value, undefined, { renderer: 'canvas' })
  render()
  ro = new ResizeObserver(() => chart.value?.resize())
  ro.observe(el.value)
})

watch(() => [props.option, screen.fontScale], render)

onBeforeUnmount(() => {
  ro?.disconnect()
  chart.value?.dispose()
  chart.value = undefined
})

defineExpose({ chart })
</script>

<template>
  <div ref="el" class="v-chart" />
</template>

<style scoped lang="scss">
.v-chart {
  width: 100%;
  height: 100%;
}
</style>
