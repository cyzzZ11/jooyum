<template>
  <!--
    带 TAB 的表格卡：对应参考站「人群画像 / 游客来源地」。
    实测参考站这两张卡内部是**表格**（`.el-table`）而非图表，且带顶部 TAB：
      人群画像   → 性别年龄 / 消费能力 / 来源占比
      游客来源地 → （入境页）全部 / 中国港澳台 / 国际
    表格列：排名 / 区域(年龄段) / 规模 / 占比（视 TAB 而定）
  -->
  <ChartCard :name="name" :dom-id="domId">
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

    <div class="tab-table-wrapper">
      <!-- 表头上的补充说明（参考站如「外省规模：5637.95 万人次 占比：31.57%」） -->
      <div v-if="caption" class="tab-table-caption">{{ caption }}</div>

      <!-- 双列指标（性别等）用条状展示 -->
      <div v-if="bars && bars.length" class="tab-bars">
        <div v-for="b in bars" :key="b.name" class="tab-bar-item">
          <span class="tab-bar-name">{{ b.name }}</span>
          <div class="tab-bar-track">
            <div class="tab-bar-fill" :style="{ width: b.pct + '%' }"></div>
          </div>
          <span class="tab-bar-pct sj-num">{{ b.pct }}%</span>
        </div>
      </div>

      <!-- 明细表 -->
      <div class="tab-table-body">
        <div class="tab-table-head">
          <span v-for="c in columns" :key="c.prop" class="tab-cell" :style="cellStyle(c)">{{ c.label }}</span>
        </div>
        <div class="tab-table-rows">
          <div v-for="(row, i) in rows" :key="i" class="tab-table-row">
            <span v-for="(c, ci) in columns" :key="c.prop" class="tab-cell" :style="cellStyle(c)">
              <template v-if="c.prop === 'rank'">
                <i class="tab-no" :class="`is-no${i + 1}`">{{ i + 1 }}</i>
              </template>
              <template v-else-if="c.prop === 'value'">
                <span class="sj-num tab-value">{{ row[c.prop] }}</span>
              </template>
              <template v-else-if="c.prop === 'pct'">
                <span class="sj-num tab-pct">{{ row[c.prop] }}</span>
              </template>
              <template v-else>{{ row[c.prop] }}</template>
            </span>
          </div>
        </div>
      </div>
    </div>
  </ChartCard>
</template>

<script setup>
import { ref, watch } from 'vue'
import ChartCard from './ChartCard.vue'

const props = defineProps({
  name: { type: String, required: true },
  domId: { type: String, default: '' },
  tabs: { type: Array, default: () => [] },
  modelValue: { type: String, default: '' },
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  /** 顶部补充说明文字 */
  caption: { type: String, default: '' },
  /** 性别等双列指标：`[{ name, pct }]` */
  bars: { type: Array, default: () => [] }
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

const cellStyle = (c) => ({
  flex: c.width ? `1 1 ${c.width}px` : '1 1 auto',
  minWidth: c.width ? `${c.width}px` : 'auto',
  textAlign: c.align || 'left'
})
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

.tab-table-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 10px 6px;
  box-sizing: border-box;
}

.tab-table-caption {
  flex-shrink: 0;
  padding: 2px 0 4px;
  font-size: 12px;
  color: #7ad4ff;
}

.tab-bars {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 4px 2px 8px;
}

.tab-bar-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-bar-name {
  width: 46px;
  font-size: 13px;
  color: #cfe6ff;
  flex-shrink: 0;
}

.tab-bar-track {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: rgba(8, 138, 251, 0.16);
  overflow: hidden;
}

.tab-bar-fill {
  height: 100%;
  border-radius: 4px;
  background: linear-gradient(90deg, rgba(8, 138, 251, 0.6), #7ad4ff);
}

.tab-bar-pct {
  width: 52px;
  text-align: right;
  font-size: 13px;
  font-weight: 700;
  color: #ffd200;
  flex-shrink: 0;
}

.tab-table-body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tab-table-head {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 32px;
  border-bottom: 1px solid rgba(8, 138, 251, 0.28);
  font-size: 13px;
  font-weight: 700;
  color: #fff;
}

.tab-table-rows {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.tab-table-row {
  display: flex;
  align-items: center;
  height: 26px;
  border-bottom: 1px dashed rgba(8, 138, 251, 0.14);
}

.tab-table-row:hover {
  background: rgba(8, 138, 251, 0.12);
}

.tab-cell {
  font-size: 13px;
  color: #cfe6ff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-right: 6px;
  box-sizing: border-box;
}

.tab-no {
  font-style: normal;
  font-size: 12px;
  min-width: 14px;
  display: inline-block;
  color: #7ad4ff;
}

.tab-no.is-no1 {
  color: #ffd200;
}
.tab-no.is-no2 {
  color: #e8f2ff;
}
.tab-no.is-no3 {
  color: #f0c194;
}

.tab-value {
  color: #e6f2ff;
}

.tab-pct {
  color: #ffd200;
  font-weight: 700;
}
</style>
