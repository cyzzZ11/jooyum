<script setup lang="ts">
/** 横向排行条：序号 + 名称 + 数值 + 进度条 */
import { computed } from 'vue'
import StatNumber from './StatNumber.vue'

const props = withDefaults(
  defineProps<{
    items: { name: string; value: number }[]
    /** 进度条基准值，默认取最大值 */
    max?: number
    color?: string
    decimals?: number
    unit?: string
    showIndex?: boolean
    compact?: boolean
  }>(),
  { color: '#2fd8ff', decimals: 0, unit: '', showIndex: true, compact: false }
)

const base = computed(
  () => props.max ?? Math.max(...props.items.map((i) => i.value), 1)
)
const rows = computed(() =>
  props.items.map((i) => ({
    ...i,
    pct: Math.max(4, (i.value / base.value) * 100)
  }))
)
</script>

<template>
  <ul class="rank-bar" :class="{ 'is-compact': compact }">
    <li v-for="(row, i) in rows" :key="row.name" class="rb-row">
      <div class="rb-head">
        <span v-if="showIndex" class="rb-idx" :class="{ top: i < 3 }">{{ i + 1 }}</span>
        <span class="rb-name" :title="row.name">{{ row.name }}</span>
        <span class="rb-val">
          <StatNumber :value="row.value" :decimals="decimals" />
          <i v-if="unit">{{ unit }}</i>
        </span>
      </div>
      <div class="rb-track">
        <i class="rb-fill" :style="{ width: `${row.pct}%`, '--c': color }" />
      </div>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.rank-bar {
  @include flex(column, flex-start, stretch);
  gap: 9px;
  width: 100%;

  &.is-compact {
    gap: 6px;

    .rb-name {
      font-size: 11px;
    }
  }
}

.rb-row {
  min-width: 0;
}

.rb-head {
  @include flex(row, flex-start, center);
  gap: 6px;
  margin-bottom: 4px;
}

.rb-idx {
  flex: none;
  width: 15px;
  height: 15px;
  line-height: 15px;
  text-align: center;
  font-size: 10px;
  font-family: $font-num;
  color: $c-text-sub;
  border: 1px solid rgba(94, 214, 255, 0.3);
  border-radius: 2px;

  &.top {
    color: #04182f;
    background: linear-gradient(180deg, #8ef0ff, #2fd8ff);
    border-color: transparent;
    font-weight: 700;
  }
}

.rb-name {
  flex: 1;
  min-width: 0;
  font-size: 12px;
  color: $c-text;
  @include ellipsis(1);
}

.rb-val {
  flex: none;
  @include num-font(13px, $c-gold);
  @include flex(row, center, baseline);
  gap: 1px;

  i {
    font-style: normal;
    font-size: 10px;
    color: $c-text-sub;
    margin-left: 1px;
  }
}

.rb-track {
  position: relative;
  height: 5px;
  border-radius: 3px;
  background: rgba(64, 178, 255, 0.12);
  overflow: hidden;
}

.rb-fill {
  display: block;
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.05), var(--c));
  box-shadow: 0 0 8px var(--c);
  transition: width 0.9s cubic-bezier(0.22, 1, 0.36, 1);
}
</style>
