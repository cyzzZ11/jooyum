<script setup lang="ts">
/** 指标块：图标 + 滚动数字 + 单位 + 说明 */
import SvgIcon from './SvgIcon.vue'
import StatNumber from './StatNumber.vue'

withDefaults(
  defineProps<{
    label: string
    value: number
    unit?: string
    icon?: string
    color?: string
    decimals?: number
    size?: 'sm' | 'md' | 'lg'
    align?: 'left' | 'center'
  }>(),
  {
    unit: '',
    icon: '',
    color: '#2fd8ff',
    decimals: 0,
    size: 'md',
    align: 'left'
  }
)
</script>

<template>
  <div class="stat-block" :class="[`is-${size}`, `is-${align}`]">
    <div class="sb-main">
      <SvgIcon
        v-if="icon"
        :name="icon"
        :size="size === 'sm' ? 16 : 20"
        :color="color"
        class="sb-icon"
      />
      <div class="sb-text">
        <StatNumber :value="value" :decimals="decimals" />
        <span v-if="unit" class="sb-unit">{{ unit }}</span>
      </div>
    </div>
    <div class="sb-label">{{ label }}</div>
  </div>
</template>

<style scoped lang="scss">
.stat-block {
  @include flex(column, center, flex-start);
  gap: 2px;
  min-width: 0;

  &.is-center {
    align-items: center;

    .sb-label {
      text-align: center;
    }
  }

  .sb-main {
    @include flex(row, center, center);
    gap: 6px;
    min-width: 0;
  }

  .sb-icon {
    opacity: 0.8;
  }

  .sb-text {
    @include flex(row, flex-start, baseline);
    /* 字号放大后「数值 + 单位」可能放不下一行，允许单位换行兜底，
       而不是横向溢出压到相邻指标上 */
    flex-wrap: wrap;
    gap: 3px;
    min-width: 0;
  }

  .sb-unit {
    font-size: calc(11px * var(--fs, 1));
    color: $c-text-sub;
    flex: none;
  }

  .sb-label {
    font-size: calc(12px * var(--fs, 1));
    color: $c-text-sub;
    @include ellipsis(1);
    max-width: 100%;
  }

  &.is-lg {
    .stat-number {
      @include num-font(30px, $c-text);
    }
  }

  &.is-md {
    .stat-number {
      @include num-font(23px, $c-text);
    }
  }

  &.is-sm {
    .stat-number {
      @include num-font(17px, $c-text);
    }

    .sb-label {
      font-size: calc(11px * var(--fs, 1));
    }
  }

  .stat-number {
    @include glow-text($c-cyan, 10px);
  }
}
</style>
