<template>
  <div ref="el" class="base-chart" :style="{ height: height }"></div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'

/**
 * ECharts 通用封装：统一深色大屏主题、自适应与销毁。
 */
const props = defineProps({
  option: { type: Object, default: () => ({}) },
  height: { type: String, default: '100%' }
})

const el = ref(null)
let chart = null
let observer = null

const render = () => {
  if (!chart) return
  chart.setOption(props.option || {}, true)
}

onMounted(() => {
  chart = echarts.init(el.value, null, { renderer: 'canvas' })
  render()
  observer = new ResizeObserver(() => chart && chart.resize())
  observer.observe(el.value)
})

watch(() => props.option, render, { deep: true })

onBeforeUnmount(() => {
  if (observer) observer.disconnect()
  if (chart) {
    chart.dispose()
    chart = null
  }
})

defineExpose({ getChart: () => chart })
</script>

<style scoped>
.base-chart {
  width: 100%;
}
</style>
