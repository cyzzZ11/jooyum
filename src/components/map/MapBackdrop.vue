<script setup lang="ts">
/**
 * 地图立体底座（独立画布，置于主地图之下）
 * 同一 ECharts 实例中多个 map series 使用不同 layoutCenter 会互相干扰，
 * 因此把"错位描边层"单独渲染成一个实例，再叠在主地图下面，形成伪 3D 立体感。
 * 位置参数必须与 SongjiangMap 保持一致。
 */
import { computed } from 'vue'
import VChart from '@/components/common/VChart.vue'
import { type EChartsOption } from '@/utils/echarts'
import { MAP_NAME } from '@/utils/mapRegister'

const props = withDefaults(
  defineProps<{
    /** 主图中心 Y（%），需与 SongjiangMap 的 CENTER 一致 */
    centerY?: number
    size?: string
    /** 纵横比修正，必须与 SongjiangMap 的 ASPECT_SCALE 一致，否则底座会错位 */
    aspectScale?: number
  }>(),
  { centerY: 47.5, size: '100%', aspectScale: 0.86 }
)

/** [相对主图的下偏移(%), 颜色] —— 越靠下越暗 */
const LAYERS: [number, string][] = [
  [3.0, '#020a16'],
  [2.0, '#04182e'],
  [1.0, '#082747']
]

const option = computed<EChartsOption>(() => ({
  animation: false,
  series: LAYERS.map(([offset, color], i) => ({
    type: 'map' as const,
    map: MAP_NAME,
    layoutCenter: ['50%', `${props.centerY + offset}%`],
    layoutSize: props.size,
    aspectScale: props.aspectScale,
    roam: false,
    silent: true,
    tooltip: { show: false },
    label: { show: false },
    emphasis: { disabled: true },
    select: { disabled: true },
    itemStyle: { areaColor: color, borderColor: color, borderWidth: 1.5 },
    z: i + 1
  }))
}))
</script>

<template>
  <VChart :option="option" class="map-backdrop" />
</template>

<style scoped lang="scss">
.map-backdrop {
  pointer-events: none;
  filter: drop-shadow(0 0 14px rgba(10, 60, 120, 0.9));
}
</style>
