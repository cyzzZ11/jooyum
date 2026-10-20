<template>
  <ChartCard :name="name" :dom-id="domId">
    <!-- 卡内 TAB 切换：对应参考站 `.table-tab-wrapper` / `.chart-btn` -->
    <template v-if="tabs.length > 1" #toolbar>
      <span class="tab-btn-wrapper">
        <span
          v-for="t in tabs"
          :key="t.key"
          class="chart-btn"
          :class="{ 'chart-btn-select': active === t.key }"
          @click="active = t.key"
        >
          {{ t.name }}
        </span>
      </span>
    </template>
    <div class="tab-chart-body">
      <!-- 参考站饼图背后的旋转装饰环（`.e-pie img`，10s 一圈） -->
      <img v-if="spinDeco" class="pie-spin-deco" src="/img/pie-center.42045c25.png" alt="" />
      <slot :active="active" />
    </div>
  </ChartCard>
</template>

<script setup>
import { ref, watch } from 'vue'
import ChartCard from './ChartCard.vue'

/**
 * 带 TAB 切换的图表卡。
 *
 * 参考站每张卡都有 `.table-tab-wrapper > .chart-btn`（实测：出行特征有
 * 「出行方式 / 出行APP偏好」，人群画像有「性别年龄 / 消费能力 / 来源占比」等）。
 * 本项目抽成组件，通过作用域插槽把当前 TAB 交给内容区。
 *
 * `spinDeco`：是否在图表背后叠加旋转装饰环 —— 对应参考站
 *   `.e-pie img { width:238px; height:238px; animation: rotate2 10s linear infinite }`
 *   该图 `pie-center.42045c25.png` 为 238×238 的线框球 + 弧线，转起来是明显的动效。
 */
const props = defineProps({
  name: { type: String, required: true },
  domId: { type: String, default: '' },
  tabs: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
  spinDeco: { type: Boolean, default: true }
})
const emit = defineEmits(['update:modelValue'])

const active = ref(props.modelValue || (props.tabs[0] ? props.tabs[0].key : ''))
watch(
  () => props.modelValue,
  (v) => {
    if (v) active.value = v
  }
)
watch(active, (v) => emit('update:modelValue', v))
</script>

<style scoped>
.tab-btn-wrapper {
  display: flex;
  align-items: center;
  gap: 5px;
  margin-right: 12px;
}

.chart-btn {
  height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  font-size: 13px;
  line-height: 18px;
  border-radius: 2px;
  cursor: pointer;
  color: #c9d7ef;
  box-shadow: inset 0 0 11px 0 rgba(8, 138, 251, 0.4);
  border: 1px solid rgba(8, 138, 251, 0.35);
  background: rgba(10, 109, 190, 0.22);
  white-space: nowrap;
  transition: all 0.2s ease;
}

.chart-btn:hover {
  border-color: rgba(8, 138, 251, 0.85);
}

.chart-btn.chart-btn-select {
  color: #1a1408;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}

/* 图表内容区：为旋转装饰环提供定位上下文 */
.tab-chart-body {
  position: relative;
  width: 100%;
  height: 100%;
}

/* 参考站原式：238×238 居中，10s 匀速旋转，不吃鼠标事件 */
.pie-spin-deco {
  position: absolute;
  width: 238px;
  height: 238px;
  top: calc(50% - 119px);
  left: calc(50% - 119px);
  pointer-events: none;
  animation: pie-rotate 10s linear infinite;
}

@keyframes pie-rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(1turn);
  }
}

/* 尊重系统「减少动态效果」偏好 */
@media (prefers-reduced-motion: reduce) {
  .pie-spin-deco {
    animation: none;
  }
}
</style>
