<template>
  <div class="trend-compare-outer-wrapper">
    <!-- 顶部参数区（实测 1880×30）：时间维度 + 日期区间 + 对比区域 -->
    <div class="params-panel bg-card">
      <div class="select-control-new">
        <div class="select-control-panel">
          <div class="select-city-btn">上海市 / 松江区</div>
        </div>
      </div>

      <div class="param-control">
        <div
          v-for="t in dateTypes"
          :key="t.value"
          class="param-btn"
          :class="{ 'parsm-btn-select': dateType === t.value, 'is-locked': filterLocked }"
          @click="changeDateType(t.value)"
        >
          {{ t.name }}
        </div>
      </div>

      <div class="control-panel">
        <el-date-picker
          v-if="dateType !== 'holiday'"
          v-model="dateRange"
          type="monthrange"
          range-separator="至"
          start-placeholder="开始月份"
          end-placeholder="结束月份"
          format="YYYY-MM"
          value-format="YYYY-MM"
          size="small"
          :disabled="filterLocked"
        />
        <span v-else class="holiday-period-text">{{ HOLIDAY_2026.periodText }}</span>
      </div>

      <div class="param-control param-control--compare">
        <label class="param-label">对比区域</label>
        <el-cascader
          v-model="compareAreas"
          :options="areaOptions"
          :props="{ multiple: true, emitPath: false }"
          collapse-tags
          collapse-tags-tooltip
          clearable
          size="small"
          class="area-cascader"
        />
        <div class="cascader-btn-panel" @click="resetAreas">重置对比</div>
      </div>
    </div>

    <!-- 选项卡（实测 1880×40，项 120×33） -->
    <div class="tab-outer-wrapper">
      <div
        v-for="tab in tabs"
        :key="tab.key"
        class="tab-item tab-wrapper"
        :class="{ 'tab-item-active': activeTab === tab.key }"
        @click="activeTab = tab.key"
      >
        {{ tab.name }}
      </div>
    </div>

    <!-- 大表格（实测 1880×820） -->
    <div class="table-out-wrapper">
      <el-table
        :data="tableRows"
        :height="tableHeight"
        class="compare-table"
        :header-cell-style="headerStyle"
        :cell-style="cellStyle"
        element-loading-background="rgba(3, 20, 35, .4)"
      >
        <el-table-column
          prop="region"
          :label="firstColumnLabel"
          min-width="200"
          fixed
          align="left"
        />
        <el-table-column
          v-for="col in columns"
          :key="col.prop"
          :prop="col.prop"
          :label="col.label"
          min-width="150"
          align="left"
        />
      </el-table>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { HOLIDAY_2026, HOLIDAY_CITY, HOLIDAY_FEE, HOLIDAY_RANK_CITY, HOLIDAY_RANK_FEE, HOLIDAY_TOTALS } from '@/mock/holiday2026'
import { towns } from '@/mock/songjiang'
import { isFilterLocked } from '@/utils/lock'

/**
 * 对比分析页 —— 版式 1:1 对齐参考站 `/main/trend/compare`（CDP 实测）：
 *   .params-panel.bg-card   1880×30  区域 + 时间维度(日度/月度/季度/假日) + 日期区间 + 对比区域级联
 *   .tab-outer-wrapper      1880×40  选项卡，项 120×33
 *   .table-out-wrapper      1880×820 表格
 *
 * 参考站表格列（实测）：
 *   对比区域/主要指标 ｜ 消费总额(元) ｜ 餐饮(元) ｜ 住宿(元) ｜ 交通(元) ｜ 旅游(元) ｜ 购物(元) ｜ 娱乐(元)
 * TAB（实测）：旅游消费 / 游客量 / 游客画像 / 出行方式 / 来源地
 *
 * 数据：2026 年国庆节假期（10 月 1 日 - 10 月 7 日）松江区口径，
 * 见 src/mock/holiday2026.js（来源与推演规则同文件 DATA_SOURCES）。
 */
const dateTypes = [
  { name: '日度', value: 'day' },
  { name: '月度', value: 'month' },
  { name: '季度', value: 'quarter' },
  { name: '假日', value: 'holiday' }
]
const dateType = ref('holiday')
const dateRange = ref(['2026-01', '2026-09'])
/** 区域 + 时间锁定（演示口径固定为 2026 年国庆节 / 松江区） */
const filterLocked = isFilterLocked()
const changeDateType = (v) => {
  if (filterLocked) return
  dateType.value = v
}

const tabs = [
  { key: 'fee', name: '旅游消费' },
  { key: 'tourist', name: '游客量' },
  { key: 'profile', name: '游客画像' },
  { key: 'travel', name: '出行方式' },
  { key: 'origin', name: '来源地' }
]
const activeTab = ref('fee')

/**
 * 对比区域：**松江区 + 17 个街镇**（数据一律采用松江区口径）。
 * 平台区域维度只到区县，街镇值按各街镇文旅体量对区级假期总量做分布测算。
 * 用平铺列表（而非「松江区 → 街镇」两级），这样「松江区」可以和各街镇同时被选中。
 */
const SJ_TOWNS = towns.map((t) => t.name)
const areaOptions = [
  { value: '松江区', label: '松江区' },
  ...SJ_TOWNS.map((d) => ({ value: d, label: d }))
]
const compareAreas = ref(['松江区', '佘山镇', '方松街道', '岳阳街道', '中山街道', '广富林街道'])

/* ---------- 表格列定义：按 TAB 切换（与参考站一致的列） ---------- */
const FEE_KEYS = [
  { key: '吃', prop: 'food', label: '餐饮(亿元)' },
  { key: '住', prop: 'live', label: '住宿(亿元)' },
  { key: '行', prop: 'traffic', label: '交通(亿元)' },
  { key: '游', prop: 'travel', label: '旅游(亿元)' },
  { key: '购', prop: 'shopping', label: '购物(亿元)' },
  { key: '娱', prop: 'entertainment', label: '娱乐(亿元)' }
]

const columns = computed(() => {
  switch (activeTab.value) {
    case 'fee':
      return [{ prop: 'total', label: '消费总额(亿元)' }, ...FEE_KEYS.map((k) => ({ prop: k.prop, label: k.label }))]
    case 'tourist':
      return [
        { prop: 'total', label: '累计客流(人次)' },
        { prop: 'avg', label: '日均客流(人次)' },
        { prop: 'night', label: '夜间客流(人次)' },
        { prop: 'tb', label: '同比(%)' },
        { prop: 'nightRatio', label: '夜间占比(%)' }
      ]
    case 'profile':
      return [
        { prop: 'male', label: '男性占比(%)' },
        { prop: 'female', label: '女性占比(%)' },
        { prop: 'age2534', label: '25-34岁占比(%)' },
        { prop: 'age3544', label: '35-44岁占比(%)' },
        { prop: 'age55', label: '55岁以上占比(%)' }
      ]
    case 'travel':
      return [
        { prop: 'selfDrive', label: '自驾占比(%)' },
        { prop: 'rail', label: '轨道交通占比(%)' },
        { prop: 'bus', label: '公交占比(%)' },
        { prop: 'coach', label: '旅游大巴占比(%)' },
        { prop: 'other', label: '其他占比(%)' }
      ]
    default:
      return [
        { prop: 'local', label: '本市占比(%)' },
        { prop: 'jiangsu', label: '江苏占比(%)' },
        { prop: 'zhejiang', label: '浙江占比(%)' },
        { prop: 'anhui', label: '安徽占比(%)' },
        { prop: 'otherProv', label: '其他省市占比(%)' }
      ]
  }
})

const firstColumnLabel = computed(() =>
  activeTab.value === 'fee' ? '对比区域/主要指标' : '对比区域/主要指标'
)

/* ---------- 数据 ---------- */
/** 消费金额统一按亿元展示（与指标卡口径一致） */
const fmtYi = (v) => (Number(v) / 1e8).toFixed(2)
const fmtNum = (v) => (v >= 1e8 ? `${(v / 1e8).toFixed(2)}亿` : v >= 1e4 ? `${(v / 1e4).toFixed(2)}万` : String(Math.round(v)))

/** 松江区假期消费分项（2026 年国庆节） */
const SJ_FEE = HOLIDAY_FEE
const SJ_FEE_TOTAL = SJ_FEE['总'].amt

/**
 * 各街镇消费总额：按街镇消费体量对**松江区假期消费总额（13.69 万元）**分布测算
 * （数据源 `holiday2026.js`）。
 */
const AREA_FEE = Object.fromEntries(HOLIDAY_RANK_FEE.map((d) => [d.region_name, d.all_value]))
/** 区级行：直接把全区总额作为「松江区」一行 */
AREA_FEE['松江区'] = SJ_FEE_TOTAL

/** 各街镇客流（人次） */
const AREA_TRIPS = Object.fromEntries(HOLIDAY_RANK_CITY.map((d) => [d.region_name, d.all_value]))
AREA_TRIPS['松江区'] = HOLIDAY_TOTALS.gn.value

/** 各街镇同比（区级同比 + 位次修正） */
const AREA_TB = Object.fromEntries(HOLIDAY_RANK_FEE.map((d) => [d.region_name, d.tb_all_value]))
AREA_TB['松江区'] = HOLIDAY_TOTALS.fee.tb

/** 各街镇客流同比（与消费同比分开取，避免口径串用） */
const AREA_TRIPS_TB = Object.fromEntries(HOLIDAY_RANK_CITY.map((d) => [d.region_name, d.tb_all_value]))
AREA_TRIPS_TB['松江区'] = HOLIDAY_TOTALS.gn.tb

/** 分项占比（用松江区假期分项占比，作为各街镇结构的近似） */
const FEE_RATIO = Object.fromEntries(
  FEE_KEYS.map((k) => [k.key, SJ_FEE[k.key].amt / SJ_FEE_TOTAL])
)

/** 假期天数（日均客流 = 累计 / 7） */
const HOLIDAY_DAYS = 7

const tableRows = computed(() => {
  const names = compareAreas.value.length ? compareAreas.value : SJ_TOWNS
  return names.map((name) => {
    const total = AREA_FEE[name] || 0
    const row = { region: name }
    switch (activeTab.value) {
      case 'fee': {
        row.total = fmtYi(total)
        // 分项 = 该街镇总额 × 该分类结构占比（结构取松江区假期分项占比）
        FEE_KEYS.forEach((k) => {
          row[k.prop] = fmtYi(total * FEE_RATIO[k.key])
        })
        break
      }
      case 'tourist': {
        const trips = AREA_TRIPS[name] || 0
        row.total = fmtNum(trips)
        row.avg = fmtNum(Math.round(trips / HOLIDAY_DAYS))
        row.night = fmtNum(Math.round(trips * 0.4536))
        row.tb = AREA_TRIPS_TB[name] !== undefined ? Number((AREA_TRIPS_TB[name] * 100).toFixed(2)) : 32.19
        row.nightRatio = 45.36
        break
      }
      case 'profile': {
        row.male = HOLIDAY_CITY.gender.male
        row.female = HOLIDAY_CITY.gender.female
        row.age2534 = HOLIDAY_CITY.age[1].pct
        row.age3544 = HOLIDAY_CITY.age[2].pct
        row.age55 = HOLIDAY_CITY.age[4].pct
        break
      }
      case 'travel': {
        // 假期出行方式：汽车 / 高铁 / 飞机（映射为 自驾 / 轨道交通 / 其他）
        row.selfDrive = HOLIDAY_CITY.travelMode[0].pct
        row.rail = HOLIDAY_CITY.travelMode[1].pct
        row.bus = 0
        row.coach = 0
        row.other = HOLIDAY_CITY.travelMode[2].pct
        break
      }
      default: {
        // 来源地：本市占比取上海市口径（48.75%），分省结构取假期参考图
        const province = Object.fromEntries(HOLIDAY_CITY.origin.map((o) => [o.name, o.pct]))
        row.local = 48.75
        row.jiangsu = province['江苏省']
        row.zhejiang = province['浙江省']
        row.anhui = province['安徽省']
        row.otherProv = Number((51.25 - row.jiangsu - row.zhejiang - row.anhui).toFixed(2))
      }
    }
    return row
  })
})

/* ---------- 表格样式（深色） ---------- */
const headerStyle = {
  background: 'rgba(8, 138, 251, 0.22)',
  color: '#fff',
  fontSize: '14px',
  fontWeight: '700',
  borderColor: 'rgba(8, 138, 251, 0.25)'
}
const cellStyle = {
  background: 'transparent',
  color: '#e6f2ff',
  fontSize: '14px',
  borderColor: 'rgba(8, 138, 251, 0.12)'
}

const resetAreas = () => {
  compareAreas.value = ['松江区']
}

/** 表格高度：参考站实测 820px（内容区 980 − 参数 30 − 选项卡 40 − 间距） */
const tableHeight = 820

void reactive
void towns
</script>

<style scoped>
/* 实测自参考站对比页容器与渲染页 CDP：
   外层 1920×980（内容区 1010 减去模块容器内边距）
   .params-panel 1880×30 ／ .tab-outer-wrapper 1880×40 ／ .table-out-wrapper 1880×820 */
.trend-compare-outer-wrapper {
  width: calc(100% - 40px);
  height: 100%;
  margin: 0 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 4px 0 10px;
}

/* ---------- 参数区 ---------- */
.params-panel {
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  z-index: 1000;
}

.select-control-new {
  width: 110px;
  height: 30px;
  flex-shrink: 0;
}

.select-control-panel .select-city-btn {
  width: 100%;
  height: 100%;
  overflow: hidden;
  color: #fff;
  line-height: 28px;
  border: 1px solid #0091ff;
  background: linear-gradient(175deg, rgba(10, 109, 190, 0.3), rgba(17, 197, 245, 0.3));
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  font-size: 12px;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.param-control {
  display: flex;
  align-items: center;
  gap: 0;
  flex-shrink: 0;
}

/* 假日维度：以文本形式展示当前统计周期（2026 年国庆节） */
.holiday-period-text {
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border: 1px solid #0091ff;
  border-radius: 4px;
  background: linear-gradient(175deg, rgba(10, 109, 190, 0.3), rgba(17, 197, 245, 0.3));
  color: #fff;
  font-size: 12px;
  white-space: nowrap;
}

.param-btn {
  width: 56px;
  height: 29px;
  line-height: 27px;
  text-align: center;
  font-size: 13px;
  color: #cfe6ff;
  cursor: pointer;
  border: 1px solid rgba(72, 170, 255, 0.6);
  background: rgba(10, 109, 190, 0.25);
  margin-left: -1px;
  transition: all 0.2s ease;
}

.param-btn:first-child {
  border-radius: 3px 0 0 3px;
  margin-left: 0;
}

.param-btn:last-child {
  border-radius: 0 3px 3px 0;
}

/* 锁定态：保留选中样式，但不响应点击 */
.param-btn.is-locked {
  cursor: default;
}

.param-btn.is-locked:not(.parsm-btn-select):hover {
  color: #cfe6ff;
}

.param-btn.parsm-btn-select {
  color: #1a1408;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}

.control-panel {
  width: 230px;
  height: 30px;
  flex-shrink: 0;
}

.control-panel :deep(.el-date-editor) {
  width: 100%;
  height: 30px;
}

.param-control--compare {
  flex: 1;
  min-width: 0;
  gap: 10px;
  display: flex;
}

.param-label {
  font-size: 13px;
  color: #cfe6ff;
  flex-shrink: 0;
}

.area-cascader {
  flex: 1;
  min-width: 0;
}

.cascader-btn-panel {
  width: 120px;
  height: 28px;
  line-height: 26px;
  text-align: center;
  font-size: 13px;
  color: #fff;
  flex-shrink: 0;
  border: 1px solid rgba(8, 138, 251, 0.5);
  border-radius: 3px;
  cursor: pointer;
  background: rgba(10, 109, 190, 0.25);
}

.cascader-btn-panel:hover {
  box-shadow: inset 0 1px 50px 0 rgba(17, 197, 245, 0.3);
}

/* ---------- 选项卡 ---------- */
.tab-outer-wrapper {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  flex-shrink: 0;
  border-bottom: 1px solid rgba(8, 138, 251, 0.25);
}

.tab-item {
  width: 120px;
  height: 33px;
  line-height: 33px;
  text-align: center;
  font-size: 15px;
  color: #cfe6ff;
  cursor: pointer;
  border-radius: 3px 3px 0 0;
  transition: all 0.2s ease;
}

.tab-item:hover {
  color: #fff;
  background: rgba(8, 138, 251, 0.18);
}

.tab-item-active {
  color: #1a1408;
  font-weight: 700;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}

/* ---------- 表格 ---------- */
.table-out-wrapper {
  width: 100%;
  margin-top: 6px;
  flex-shrink: 0;
}

.compare-table {
  width: 100%;
  background: transparent;
}

/* 深色表格：覆盖 Element Plus 默认背景与边框（参考站 .el-table 亦为深色） */
.compare-table :deep(.el-table__inner-wrapper::before) {
  display: none;
}

.compare-table :deep(.el-table__header-wrapper th.el-table__cell) {
  background: rgba(8, 138, 251, 0.22) !important;
}

.compare-table :deep(.el-table__body tr > td.el-table__cell) {
  background: rgba(4, 30, 56, 0.6);
  color: #e6f2ff;
}

.compare-table :deep(.el-table__body tr:hover > td.el-table__cell) {
  background: rgba(8, 138, 251, 0.16) !important;
}

.compare-table :deep(.el-table__empty-block) {
  background: transparent;
}
</style>
