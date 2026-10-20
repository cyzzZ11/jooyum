<template>
  <div class="page-control">
    <!-- 日期区间（参考站 .picker-control：32px 高、#088afb 边框、内发光） -->
    <div class="picker-control">
      <el-icon class="picker-control__icon"><Calendar /></el-icon>
      <div class="picker-start-end">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          size="small"
          :clearable="false"
          @change="emitChange"
        />
      </div>
    </div>

    <!-- 时间维度（参考站 select-wrapper：全部 / 日度 / 月度 / 季度 / 假日） -->
    <div class="dimension-group">
      <span
        v-for="d in dimensions"
        :key="d.value"
        class="dimension-item"
        :class="{ 'is-active': dimension === d.value }"
        @click="changeDimension(d.value)"
      >
        {{ d.name }}
      </span>
    </div>

    <!-- 监测维度（参考站 params-panel 内的切换项） -->
    <div v-if="groups.length" class="monitor-group">
      <div v-for="g in groups" :key="g.key" class="monitor-group__item">
        <span class="monitor-group__label">{{ g.label }}</span>
        <span
          v-for="opt in g.options"
          :key="opt.value"
          class="monitor-group__opt"
          :class="{ 'is-active': selections[g.key] === opt.value }"
          @click="changeMonitor(g.key, opt.value)"
        >
          {{ opt.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'

/**
 * 页面控制栏：1:1 对齐参考站各子页面顶部的 .picker-control + 时间维度 + 监测维度。
 * 参考站实现见 chunk-181b8576（旅游消费）/ chunk-ab447fea（国内旅游）/
 * chunk-696d552c（景区旅游）/ chunk-719f8f18（商圈游客）。
 *
 * 尺寸/配色取自 _ref/css/chunk-181b8576.css：
 *   .picker-control { width:100%; height:32px; padding:0 10px; border:1px solid #088afb;
 *                     border-radius:2px; color:#fff }
 *   .select-wrapper { width:500px; background:rgba(17,34,102,.88);
 *                     border:1px solid rgba(72,170,255,.6) }
 *   .params-panel   { display:flex; gap:10px; align-items:center; z-index:1000 }
 */
const props = defineProps({
  /** 时间维度选项，默认与参考站一致 */
  dimensions: {
    type: Array,
    default: () => [
      { name: '全部', value: 'all' },
      { name: '日度', value: 'day' },
      { name: '月度', value: 'month' },
      { name: '季度', value: 'quarter' },
      { name: '假日', value: 'holiday' }
    ]
  },
  /** 监测维度分组：[{ key, label, options:[{name,value}] }] */
  groups: { type: Array, default: () => [] },
  defaultDimension: { type: String, default: 'all' }
})

const emit = defineEmits(['change'])

const dimension = ref(props.defaultDimension)
const selections = reactive({})
props.groups.forEach((g) => {
  selections[g.key] = g.options && g.options.length ? g.options[0].value : ''
})

const end = new Date()
const start = new Date(end.getTime() - 29 * 86400000)
const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
const dateRange = ref([fmt(start), fmt(end)])

const emitChange = () => {
  emit('change', { dimension: dimension.value, dateRange: dateRange.value, ...selections })
}

const changeDimension = (v) => {
  dimension.value = v
  emitChange()
}

const changeMonitor = (key, v) => {
  selections[key] = v
  emitChange()
}

watch(() => props.groups, (gs) => {
  gs.forEach((g) => {
    if (!selections[g.key]) selections[g.key] = g.options && g.options.length ? g.options[0].value : ''
  })
})
</script>

<style scoped>
.page-control {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

/* ---------- 日期区间 ---------- */
.picker-control {
  width: 320px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  color: #fff;
  border: 1px solid #088afb;
  border-radius: 2px;
  box-shadow: inset 0 0 0 0 rgba(8, 138, 251, 0.6);
  background: rgba(3, 28, 52, 0.5);
}

.picker-control__icon {
  color: #088afb;
  margin-right: 6px;
  flex-shrink: 0;
}

.picker-control .picker-start-end {
  width: calc(100% - 24px);
  display: flex;
  align-items: center;
}

.picker-control :deep(.el-date-editor) {
  width: 100%;
  background: transparent;
  box-shadow: none !important;
  padding: 0;
}

.picker-control :deep(.el-range-input) {
  color: #fff;
  background: transparent;
}

.picker-control :deep(.el-range-separator) {
  color: #7ad4ff;
  padding: 0 4px;
}

/* ---------- 时间维度 ---------- */
.dimension-group {
  display: flex;
  align-items: center;
  height: 32px;
  border-radius: 4px;
  background: rgba(17, 34, 102, 0.88);
  border: 1px solid rgba(72, 170, 255, 0.6);
  box-shadow: inset 0 1px 15px 0 rgba(8, 138, 251, 0.4);
  overflow: hidden;
}

.dimension-item {
  min-width: 62px;
  height: 100%;
  line-height: 30px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.dimension-item:hover {
  color: #fede48;
}

.dimension-item.is-active {
  background: linear-gradient(180deg, #2e81fa, #0a6dbe);
  font-weight: 700;
}

/* ---------- 监测维度 ---------- */
.monitor-group {
  display: flex;
  align-items: center;
  gap: 18px;
}

.monitor-group__item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.monitor-group__label {
  font-size: 13px;
  color: var(--sj-text-sub);
}

.monitor-group__opt {
  padding: 2px 10px;
  font-size: 13px;
  border-radius: 2px;
  cursor: pointer;
  color: #fff;
  border: 1px solid rgba(8, 138, 251, 0.5);
  background: rgba(10, 109, 190, 0.25);
  transition: all 0.2s ease;
}

.monitor-group__opt:hover {
  box-shadow: inset 0 1px 50px 0 rgba(17, 197, 245, 0.3);
}

.monitor-group__opt.is-active {
  color: #1a1408;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}
</style>
