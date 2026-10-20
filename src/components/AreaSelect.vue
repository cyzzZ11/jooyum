<template>
  <div class="area-select" :class="{ 'is-locked': disabled }">
    <div class="area-select__trigger" @click="toggle">
      <el-icon class="area-select__icon"><Location /></el-icon>
      <span class="area-select__text">{{ displayText }}</span>
      <el-icon v-if="disabled" class="area-select__lock"><Lock /></el-icon>
      <el-icon v-else class="area-select__arrow" :class="{ 'is-open': visible }"><ArrowDown /></el-icon>
    </div>

    <transition name="el-zoom-in-top">
      <div v-show="visible" class="area-select__panel">
        <div class="area-select__head">
          <span>区域选择</span>
          <el-icon class="area-select__close" @click="visible = false"><Close /></el-icon>
        </div>
        <div class="area-select__tabs">
          <span
            v-for="(lv, i) in levels"
            :key="lv.key"
            class="area-select__tab"
            :class="{ 'is-active': activeLevel === lv.key }"
            @click="switchLevel(lv.key)"
          >
            {{ lv.name }}
            <em v-if="selected[i]">· {{ selected[i].name }}</em>
          </span>
        </div>
        <div class="area-select__search">
          <el-input v-model="keyword" placeholder="搜索区域名称" clearable size="default" />
        </div>
        <ul class="area-select__list">
          <li
            v-for="item in filteredList"
            :key="item.code"
            class="area-select__item"
            :class="{ 'is-active': isSelected(item) }"
            @click="pick(item)"
          >
            <span>{{ item.name }}</span>
            <span v-if="item.extra" class="area-select__extra">{{ item.extra }}</span>
          </li>
          <li v-if="!filteredList.length" class="area-select__empty">无匹配区域</li>
        </ul>
        <div class="area-select__foot">
          <el-button size="small" text @click="reset">重置</el-button>
          <el-button size="small" type="primary" @click="confirm">确认</el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

/**
 * 区域选择控件：对应参考站 SelectControl（attrs: areaRange / proWidth，event: changeArea）。
 * 层级：全国 → 上海市 → 松江区 → 街镇，默认落在「松江区」，选中后向父组件抛出 changeArea。
 */
const props = defineProps({
  modelValue: { type: Object, default: null },
  /** 可选层级：national / province / city / district / town */
  areaRange: { type: String, default: 'all' },
  /** 锁定后仅展示当前区域，无法打开选择面板 */
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue', 'changeArea'])

const levels = [
  { key: 'province', name: '省级' },
  { key: 'city', name: '市级' },
  { key: 'district', name: '区县' },
  { key: 'town', name: '街镇' }
]

const visible = ref(false)
const activeLevel = ref('district')
const keyword = ref('')

/** 区域树：全国 → 上海 → 松江 → 17 个街镇 */
const tree = {
  province: [{ code: '310000', name: '上海市', extra: '直辖市' }],
  city: [{ code: '310100', name: '上海市', extra: '16个区' }],
  district: [{ code: '310117', name: '松江区', extra: '17个街镇' }],
  town: []
}

const selected = ref([tree.province[0], tree.city[0], tree.district[0], null])

const filteredList = computed(() => {
  const list = tree[activeLevel.value] || []
  const kw = keyword.value.trim()
  return kw ? list.filter((i) => i.name.includes(kw)) : list
})

const displayText = computed(() => {
  const current = props.modelValue || { name: '松江区' }
  return current.name === '松江区' ? '上海市 / 松江区' : `上海市 / ${current.name}`
})

const isSelected = (item) => {
  const current = selected.value[levels.findIndex((l) => l.key === activeLevel.value)]
  return current && current.code === item.code
}

const switchLevel = (key) => {
  activeLevel.value = key
  keyword.value = ''
}

const pick = (item) => {
  const idx = levels.findIndex((l) => l.key === activeLevel.value)
  selected.value[idx] = item
  if (activeLevel.value === 'province' || activeLevel.value === 'city' || activeLevel.value === 'district') {
    selected.value[3] = null
  }
  visible.value = false
  const target = activeLevel.value === 'town' ? item : item
  emit('update:modelValue', target)
  emit('changeArea', target)
}

const reset = () => {
  selected.value = [tree.province[0], tree.city[0], tree.district[0], null]
  activeLevel.value = 'district'
  keyword.value = ''
  emit('update:modelValue', tree.district[0])
  emit('changeArea', tree.district[0])
}

const confirm = () => {
  visible.value = false
}

const toggle = () => {
  if (props.disabled) return
  visible.value = !visible.value
}

/* 点击外部关闭 */
const onDocClick = (e) => {
  if (!e.target.closest('.area-select')) visible.value = false
}
onMounted(async () => {
  document.addEventListener('click', onDocClick)
  const { towns } = await import('@/mock/songjiang')
  tree.town = towns.map((t) => ({ code: t.code, name: t.name, extra: t.type }))
})
onUnmounted(() => document.removeEventListener('click', onDocClick))

defineExpose({ reset })
</script>

<style scoped>
.area-select {
  position: relative;
  width: 100%;
}

.area-select__trigger {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 34px;
  padding: 0 10px;
  cursor: pointer;
  border-radius: 4px;
  background: rgba(3, 28, 52, 0.75);
  border: 1px solid var(--sj-border-soft);
  color: #fff;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.area-select__trigger:hover {
  border-color: var(--sj-primary);
}

.area-select__icon {
  color: var(--sj-primary-light);
}

.area-select__text {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.area-select__arrow {
  transition: transform 0.2s ease;
  font-size: 12px;
}

.area-select__arrow.is-open {
  transform: rotate(180deg);
}

/* 锁定态：仅展示，不响应点击 */
.area-select.is-locked .area-select__trigger {
  cursor: default;
}

.area-select__lock {
  font-size: 12px;
  color: rgba(200, 226, 255, 0.6);
}

.area-select__panel {
  position: absolute;
  right: 0;
  top: 42px;
  width: 360px;
  z-index: 3000;
  background: #06263f;
  border: 1px solid var(--sj-border);
  border-radius: 6px;
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.55);
  padding: 10px;
}

.area-select__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 700;
  color: var(--sj-gold);
  padding-bottom: 8px;
  border-bottom: 1px solid var(--sj-border-soft);
}

.area-select__close {
  cursor: pointer;
  color: var(--sj-text-sub);
}

.area-select__tabs {
  display: flex;
  gap: 6px;
  margin: 8px 0;
  flex-wrap: wrap;
}

.area-select__tab {
  padding: 3px 10px;
  border-radius: 3px;
  font-size: 13px;
  cursor: pointer;
  color: var(--sj-text-sub);
  border: 1px solid transparent;
}

.area-select__tab em {
  font-style: normal;
  color: var(--sj-gold);
}

.area-select__tab.is-active {
  color: #fff;
  background: rgba(8, 138, 251, 0.35);
  border-color: var(--sj-border);
}

.area-select__list {
  max-height: 260px;
  overflow-y: auto;
  margin-top: 8px;
}

.area-select__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 32px;
  padding: 0 10px;
  border-radius: 3px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
}

.area-select__item:hover {
  background: rgba(8, 138, 251, 0.2);
}

.area-select__item.is-active {
  color: var(--sj-gold);
  background: rgba(8, 138, 251, 0.28);
}

.area-select__extra {
  font-size: 12px;
  color: var(--sj-text-weak);
}

.area-select__empty {
  padding: 16px 0;
  text-align: center;
  color: var(--sj-text-weak);
  font-size: 13px;
}

.area-select__foot {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  padding-top: 8px;
  border-top: 1px solid var(--sj-border-soft);
}
</style>
