<script setup lang="ts">
/**
 * 大屏面板容器
 * - 统一边框 / 四角装饰 / 标题栏
 * - 内置多卡片「左右切换」：自动轮播 + 点击标签切换 + 悬停暂停
 */
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useScreenStore } from '@/stores/screen'
import type { PanelTab } from '@/types/ui'

const props = withDefaults(
  defineProps<{
    /** 标题前的单字徽标，如「游」 */
    badge?: string
    title?: string
    tabs?: PanelTab[]
    modelValue?: string
    autoplay?: boolean
    /** 轮播间隔(ms)，默认取全局配置 */
    interval?: number
  }>(),
  {
    badge: '',
    title: '',
    tabs: () => [],
    modelValue: undefined,
    autoplay: true,
    interval: undefined
  }
)

const emit = defineEmits<{ 'update:modelValue': [key: string] }>()

const screen = useScreenStore()
const innerIndex = ref(0)
const direction = ref<1 | -1>(1)
const paused = ref(false)

const activeIndex = computed(() => {
  const list = props.tabs
  if (!list.length) return 0
  if (props.modelValue != null) {
    const i = list.findIndex((t) => t.key === props.modelValue)
    return i < 0 ? 0 : i
  }
  return innerIndex.value
})

const activeKey = computed(
  () => props.tabs[activeIndex.value]?.key ?? 'default'
)
const transName = computed(() =>
  direction.value === 1 ? 'sw-next' : 'sw-prev'
)

function go(target: number) {
  const len = props.tabs.length
  if (len < 2) return
  const cur = activeIndex.value
  const next = ((target % len) + len) % len
  if (next === cur) return
  direction.value = next > cur || (cur === len - 1 && next === 0) ? 1 : -1
  if (props.modelValue == null) innerIndex.value = next
  emit('update:modelValue', props.tabs[next].key)
}

let timer: number | undefined

function stop() {
  if (timer !== undefined) {
    window.clearInterval(timer)
    timer = undefined
  }
}

function start() {
  stop()
  if (
    !props.autoplay ||
    props.tabs.length < 2 ||
    paused.value ||
    !screen.autoPlay
  )
    return
  timer = window.setInterval(
    () => go(activeIndex.value + 1),
    props.interval ?? screen.interval
  )
}

onMounted(start)
onBeforeUnmount(stop)
watch(
  () => [props.tabs.length, props.interval, paused.value, screen.autoPlay],
  start
)

defineExpose({ go, activeKey })
</script>

<template>
  <section class="pb" @mouseenter="paused = true" @mouseleave="paused = false">
    <i class="pb-corner tl" />
    <i class="pb-corner tr" />
    <i class="pb-corner bl" />
    <i class="pb-corner br" />

    <header class="pb-hd">
      <span v-if="badge" class="pb-badge">{{ badge }}</span>
      <span v-if="title" class="pb-title">{{ title }}</span>
      <span class="pb-line" />
      <nav v-if="tabs.length > 1" class="pb-tabs">
        <button
          v-for="(t, i) in tabs"
          :key="t.key"
          type="button"
          class="pb-tab"
          :class="{ active: i === activeIndex }"
          @click="go(i)"
        >{{ t.label }}</button>
      </nav>
      <slot name="extra" />
    </header>

    <div class="pb-body">
      <Transition :name="transName" mode="out-in">
        <div :key="activeKey" class="pb-page">
          <slot :active="activeKey" />
        </div>
      </Transition>
    </div>

    <i v-if="tabs.length > 1" class="pb-progress">
      <b :style="{ width: `${((activeIndex + 1) / tabs.length) * 100}%` }" />
    </i>
  </section>
</template>

<style scoped lang="scss">
.pb {
  position: relative;
  height: 100%;
  min-height: 0;
  @include flex(column, flex-start, stretch);
  padding: 6px 12px 8px;
  background: linear-gradient(
    180deg,
    rgba(16, 62, 122, 0.42) 0%,
    rgba(6, 22, 48, 0.3) 60%,
    rgba(6, 22, 48, 0.18) 100%
  );
  border: 1px solid $c-border;
  border-radius: $r-panel;
  overflow: hidden;

  &::after {
    // 顶部高光
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(94, 214, 255, 0.7),
      transparent
    );
  }
}

.pb-corner {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid $c-cyan;
  opacity: 0.85;
  pointer-events: none;

  &.tl {
    left: -1px;
    top: -1px;
    border-right: 0;
    border-bottom: 0;
  }

  &.tr {
    right: -1px;
    top: -1px;
    border-left: 0;
    border-bottom: 0;
  }

  &.bl {
    left: -1px;
    bottom: -1px;
    border-right: 0;
    border-top: 0;
  }

  &.br {
    right: -1px;
    bottom: -1px;
    border-left: 0;
    border-top: 0;
  }
}

.pb-hd {
  flex: none;
  @include flex(row, flex-start, center);
  gap: 7px;
  height: 26px;
  margin-bottom: 4px;
}

.pb-badge {
  flex: none;
  width: 22px;
  height: 22px;
  line-height: 22px;
  text-align: center;
  font-size: calc(13px * var(--fs, 1));
  font-weight: 700;
  color: #04182f;
  background: linear-gradient(160deg, #a6f2ff, #2fd8ff 70%);
  clip-path: polygon(24% 0, 100% 0, 76% 100%, 0 100%);
  box-shadow: 0 0 10px rgba(47, 216, 255, 0.55);
}

.pb-title {
  flex: none;
  font-size: calc(14px * var(--fs, 1));
  font-weight: 600;
  letter-spacing: 1px;
  @include grad-text($c-cyan, #ffffff);
}

.pb-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    rgba(94, 214, 255, 0.5),
    rgba(94, 214, 255, 0)
  );
}

.pb-tabs {
  flex: none;
  @include flex(row, flex-end, center);
  gap: 4px;
}

.pb-tab {
  padding: 2px 10px;
  font-size: calc(12px * var(--fs, 1));
  font-family: inherit;
  color: $c-text-dim;
  background: rgba(64, 178, 255, 0.06);
  border: 1px solid rgba(64, 178, 255, 0.22);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s;
  white-space: nowrap;

  &:hover {
    color: $c-text;
    border-color: rgba(94, 214, 255, 0.6);
  }

  &.active {
    color: #04182f;
    font-weight: 700;
    background: linear-gradient(180deg, #9ceaff, #2fd8ff);
    border-color: transparent;
    box-shadow: 0 0 10px rgba(47, 216, 255, 0.6);
  }
}

.pb-body {
  flex: 1;
  min-height: 0;
  position: relative;
}

.pb-page {
  height: 100%;
  min-height: 0;
}

.pb-progress {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: rgba(64, 178, 255, 0.12);

  b {
    display: block;
    height: 100%;
    background: linear-gradient(90deg, $c-blue, $c-cyan);
    box-shadow: 0 0 8px rgba(47, 216, 255, 0.8);
    transition: width 0.5s ease;
  }
}

/* 左右切换过渡 */
.sw-next-enter-active,
.sw-next-leave-active,
.sw-prev-enter-active,
.sw-prev-leave-active {
  transition: opacity 0.32s ease, transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.sw-next-enter-from {
  opacity: 0;
  transform: translateX(36px);
}

.sw-next-leave-to {
  opacity: 0;
  transform: translateX(-36px);
}

.sw-prev-enter-from {
  opacity: 0;
  transform: translateX(-36px);
}

.sw-prev-leave-to {
  opacity: 0;
  transform: translateX(36px);
}
</style>
