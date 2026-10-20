<template>
  <div class="table-list" :id="domId">
    <div class="table-list__head">
      <span class="table-list__cell table-list__head-rank" :style="headRankStyle">排名</span>
      <span
        v-for="col in columns"
        :key="col.prop"
        class="table-list__cell"
        :style="cellStyle(col)"
        :class="{ 'is-sortable': col.sortable }"
        @click="col.sortable && toggleSort(col.prop)"
      >
        {{ col.label }}
        <span v-if="col.unit" class="table-list__unit">({{ col.unit }})</span>
        <el-icon v-if="col.sortable && sortProp === col.prop" class="table-list__sort">
          <component :is="sortAsc ? 'Top' : 'Bottom'" />
        </el-icon>
      </span>
    </div>
    <div
      class="table-list__body"
      ref="bodyRef"
      @mouseenter="stopScroll"
      @mouseleave="startScroll"
    >
      <div class="table-list__track" :style="trackStyle" ref="trackRef">
        <div
          v-for="(row, index) in renderRows"
          :key="(row.region_name || '') + index"
          class="table-list__row"
          :class="{ 'is-top3': realIndex(index) < 3 }"
        >
          <!-- 排名列：序号 + 升降序三角（参考站实测列宽 48px） -->
          <span class="table-list__cell table-list__rank-cell" :style="headRankStyle">
            <i class="table-list__no" :class="`is-no${realIndex(index) + 1}`">{{ realIndex(index) + 1 }}</i>
            <i
              class="table-list__trend"
              :class="Number(row.tb_all_value) >= 0 ? 'is-up' : 'is-down'"
            ></i>
          </span>
          <span
            v-for="(col, ci) in columns"
            :key="col.prop"
            class="table-list__cell"
            :style="cellStyle(col)"
          >
            <template v-if="col.prop === 'tb_all_value'">
              <span class="sj-num" :class="Number(row[col.prop]) >= 0 ? 'is-up-text' : 'is-down-text'">
                {{ percent(asPercent(row[col.prop])) }}%
              </span>
            </template>
            <template v-else-if="isValueCol(col, ci)">
              <span class="sj-num table-list__value">{{ formatValue(row[col.prop], row) }}</span>
            </template>
            <template v-else>{{ row[col.prop] }}</template>
          </span>

          <!--
            行内进度条：对应参考站 `.el-table tr:after`
            `content:""; width: var(--process); transition: width .3s ease;
             background: var(--color); height:5px; border-radius:2px; left:10px`
            进度按该行数值占首行的比例给出。
          -->
          <i
            class="table-list__progress"
            :style="progressStyle(row, index)"
            aria-hidden="true"
          ></i>
        </div>
      </div>
      <div v-if="!rows || !rows.length" class="table-list__empty">暂无数据</div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { percent, thousands, autoUnit } from '@/utils/format'

/**
 * 排行榜表格：对应参考站 chartType="TableList" 的展示形态。
 * 列结构与列宽来自参考站渲染页实测：
 *   排名 48px（序号 + 升降序三角）/ 区域 122px / 累计值 69px / 同比 69px
 *
 * 动效（均取自参考站实现，见 README「动效对齐」）：
 *   1. **自动滚动**：列表复制一份 + `translate3d` 位移 + `0.45s ease-in-out` 过渡，
 *      滚过一份高度后无过渡复位，形成无缝循环；鼠标移入暂停、移出继续。
 *      参考站 `WarnList` 组件即此机制（`displayList` 为 `list.concat(list)`）。
 *   2. **行内进度条**：参考站 `.el-table tr:after` 用 CSS 变量画一条
 *      `height:5px; border-radius:2px; width: var(--process);
 *       background: var(--color); transition: width .3s ease`。
 */
const props = defineProps({
  columns: { type: Array, required: true },
  rows: { type: Array, default: () => [] },
  domId: { type: String, default: '' },
  /** 数值列是否需要按「万」换算展示（参考站显示 1909.48万） */
  valueInWan: { type: Boolean, default: false },
  /**
   * 是否自动滚动（跑马灯）。**默认关闭**。
   *
   * ⚠️ 实测澄清：参考站的排行榜**不滚动**——CDP 连续 5 次采样，首行始终在
   * `top:533`、`transform: none`、`scrollTop: 0`；容器是普通
   * `.el-table__body-wrapper{overflow:hidden auto}`，即可手动滚动而已。
   * 我最初把 `WarnList`（**天气预警条**）的跑马灯误当成了排行榜行为，
   * 导致总览页的「热门入境城市 / 热门景区」等榜单一直在快速滚动。
   * 现已改为默认关闭，仅在确实需要轮播的场景显式传 `auto-scroll`。
   */
  autoScroll: { type: Boolean, default: false }
})

const sortProp = ref('')
const sortAsc = ref(false)

const toggleSort = (prop) => {
  if (sortProp.value === prop) {
    sortAsc.value = !sortAsc.value
  } else {
    sortProp.value = prop
    sortAsc.value = false
  }
}

/** 排名列固定 48px（实测） */
const headRankStyle = { flex: '0 0 48px', minWidth: '48px', textAlign: 'left' }

/**
 * 同比值归一化：数据源中同比一律存**小数**（0.1047 = +10.47%），
 * 而 `percent()` 期望百分数，故此处统一 ×100。
 * 若某行误存为百分数（绝对值 > 1.5），则原样返回，避免出现 1047% 这类异常。
 */
const asPercent = (v) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return v
  return Math.abs(n) > 1.5 ? n : n * 100
}

const sortedRows = computed(() => {
  const list = [...(props.rows || [])]
  if (!sortProp.value) return list
  const dir = sortAsc.value ? 1 : -1
  return list.sort((a, b) => (Number(a[sortProp.value]) - Number(b[sortProp.value])) * dir)
})

/**
 * 列宽策略：**grow 而非固定宽**。
 * 参考站列宽为 122/80/69，合计 319，而卡片内可用宽约 448 —— 若用 `0 0 Npx`
 * 会留下 100+px 空隙把数值挤在一起（曾出现「2452.37万-10.27%」贴死）。
 * 因此这里以实测宽度为 `flex-basis`，再按比例 grow 填满容器。
 */
const cellStyle = (col) => {
  const w = col.width || col.minWidth || 100
  const basis = Math.max(56, Math.round(w))
  return {
    flex: `1 1 ${basis}px`,
    minWidth: `${basis}px`,
    textAlign: col.align === 'right' ? 'right' : col.align === 'center' ? 'center' : 'left'
  }
}

/** 数值列：区级值较大时按「万」换算（与参考站 1909.48万 的展示一致） */
const isValueCol = (col, ci) => col.prop === 'all_value' || (ci === 0 && col.prop === 'region_name' && false)

const formatValue = (v, row) => {
  const n = Number(v)
  if (!Number.isFinite(n)) return '-'
  if (props.valueInWan) {
    const a = autoUnit(n, 2)
    return a.unit ? `${a.value}${a.unit}` : a.value
  }
  return thousands(n)
}

/* ==================== 自动滚动（跑马灯） ==================== */
const bodyRef = ref(null)
const trackRef = ref(null)
/** 单份列表的高度（px），即每次循环的位移量 */
const loopHeight = ref(0)
const scrollOffset = ref(0)
/** 复位瞬间关闭过渡，避免出现「倒着滚回去」 */
const disableTransition = ref(false)
let timer = null
let animateTimer = null

/** 渲染列表：滚动时把列表复制一份，实现无缝衔接（参考站同做法） */
const renderRows = computed(() => {
  const list = sortedRows.value
  if (!props.autoScroll || list.length <= 4) return list
  return [...list, ...list]
})

/** 复制后，后半段下标需映射回原始序号 */
const realIndex = (index) => {
  const n = sortedRows.value.length
  return n ? index % n : index
}

const trackStyle = computed(() =>
  props.autoScroll
    ? {
        transform: `translate3d(0, -${scrollOffset.value}px, 0)`,
        transition: disableTransition.value ? 'none' : 'transform 0.45s ease-in-out'
      }
    : {}
)

/** 量测单份高度：第二份第一行的 offsetTop 即一份的高度 */
const measure = () => {
  nextTick(() => {
    const track = trackRef.value
    if (!track) return
    const n = sortedRows.value.length
    const kids = track.children
    loopHeight.value = n > 1 && kids[n] ? kids[n].offsetTop : 0
  })
}

const canScroll = () => props.autoScroll && sortedRows.value.length > 4 && loopHeight.value > 0

function step() {
  if (!canScroll()) return
  scrollOffset.value += loopHeight.value
  timer = setTimeout(() => {
    // 位移结束后无过渡复位（此时画面与初始一致），再继续下一步
    disableTransition.value = true
    scrollOffset.value = 0
    animateTimer = setTimeout(() => {
      disableTransition.value = false
      step()
    }, 40)
  }, 480)
}

function startScroll() {
  stopScroll()
  if (!canScroll()) return
  step()
}

function stopScroll() {
  if (timer) clearTimeout(timer)
  if (animateTimer) clearTimeout(animateTimer)
  timer = null
  animateTimer = null
}

onMounted(() => {
  measure()
  startScroll()
  window.addEventListener('resize', measure)
})

onBeforeUnmount(() => {
  stopScroll()
  window.removeEventListener('resize', measure)
})

watch(
  () => props.rows,
  () => {
    stopScroll()
    scrollOffset.value = 0
    disableTransition.value = false
    measure()
    startScroll()
  },
  { deep: true }
)

/* ==================== 行内进度条 ==================== */
/** 进度 = 本行数值 / 首行数值（最高者 100%）；前三名配色与地图一致 */
const progressStyle = (row, index) => {
  const list = sortedRows.value
  const max = Number(list[0] && list[0].all_value) || 0
  const v = Number(row.all_value) || 0
  const pct = max > 0 ? Math.max(3, Math.min(100, (v / max) * 100)) : 0
  const rank = realIndex(index)
  const color =
    rank === 0
      ? 'linear-gradient(90deg, rgba(255,210,0,.25), #ffd200)'
      : rank === 1
        ? 'linear-gradient(90deg, rgba(122,212,255,.22), #7ad4ff)'
        : rank === 2
          ? 'linear-gradient(90deg, rgba(47,210,122,.22), #2fd27a)'
          : 'linear-gradient(90deg, rgba(8,138,251,.2), rgba(8,138,251,.75))'
  return { width: pct + '%', background: color }
}
</script>

<style scoped>
/* 关键：作为弹性子项时必须能被压缩（min-height:0），
   否则 height:100% 会退化为内容高，表格行顶出卡片（曾导致总览页溢出 17px）。
   实测参考站图表卡内容区 450×467 内表格可滚动。 */
.table-list {
  width: 100%;
  height: 100%;
  min-height: 0;
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-size: 15px;
}

.table-list__head {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  height: 47px;
  padding: 0 10px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid rgba(8, 138, 251, 0.28);
}

.table-list__unit {
  font-size: 12px;
  font-weight: 400;
  color: var(--sj-text-weak);
}

.table-list__sort {
  margin-left: 2px;
  font-size: 12px;
}

.table-list__cell.is-sortable {
  cursor: pointer;
  user-select: none;
}

.table-list__body {
  flex: 1;
  min-height: 0;
  /* 参考站实测 `.el-table__body-wrapper{overflow:hidden auto}`：可手动滚动，不自动滚 */
  overflow: hidden auto;
}

/* 跑马灯轨道：位移由 JS 驱动（参考站同机制） */
.table-list__track {
  will-change: transform;
}

.table-list__row {
  position: relative;
  display: flex;
  align-items: center;
  height: 34px;
  padding: 0 10px;
  border-bottom: 1px dashed rgba(8, 138, 251, 0.14);
  transition: background 0.2s ease;
}

.table-list__row:hover {
  background: rgba(8, 138, 251, 0.14);
}

.table-list__row.is-top3 {
  background: rgba(255, 210, 0, 0.06);
}

/*
  行内进度条：对应参考站 `.el-table tr:after`
  （`height:5px; border-radius:2px; left:10px; width:var(--process);
    background:var(--color); transition: width .3s ease`）
*/
.table-list__progress {
  position: absolute;
  left: 10px;
  bottom: 3px;
  height: 4px;
  border-radius: 2px;
  transition: width 0.3s ease;
  pointer-events: none;
  opacity: 0.85;
}

/* 排名列：序号 + 升降序三角（参考站实测 48px 列宽） */
.table-list__rank-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}

.table-list__trend {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

.table-list__trend.is-up {
  border-bottom: 7px solid #ff5b5b;
}

.table-list__trend.is-down {
  border-top: 7px solid #2fd27a;
}

.table-list__no {
  flex-shrink: 0;
  min-width: 16px;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  color: #7ad4ff;
}

.table-list__no.is-no1 {
  color: #ffd200;
}
.table-list__no.is-no2 {
  color: #e8f2ff;
}
.table-list__no.is-no3 {
  color: #f0c194;
}

.table-list__value {
  color: var(--sj-gold);
  font-weight: 700;
}

.is-up-text {
  color: #ff5b5b;
}

.is-down-text {
  color: #2fd27a;
}

.table-list__empty {
  padding: 20px 0;
  text-align: center;
  color: var(--sj-text-weak);
}
</style>
