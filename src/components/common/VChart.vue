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

function render() {
  if (!chart.value) return
  chart.value.setOption(props.option, props.notMerge)
}

onMounted(() => {
  if (!el.value) return
  chart.value = echarts.init(el.value, undefined, { renderer: 'canvas' })
  render()
  ro = new ResizeObserver(() => chart.value?.resize())
  ro.observe(el.value)
})

watch(() => props.option, render)

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
