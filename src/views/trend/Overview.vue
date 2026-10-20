<template>
  <div class="holiday-main-outer-wrapper">
    <!-- ===== 顶部：排行类型切换 + 参数区（区域 / 时间类型 / 时间选择） ===== -->
    <div class="top-part-wrapper">
      <div class="rank-type-wrapper">
        <div class="rank-type-switch">
          <div
            v-for="(item, i) in rankTypeList"
            :key="item.value"
            class="rank-type-item-wrapper"
            :class="[rankType === item.value ? 'active' : '', i === 0 ? 'icon-left' : 'icon-right']"
            @click="changeRankType(item.value)"
          >
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.name }}</span>
          </div>
        </div>
      </div>

      <div class="top-params-wrapper" :class="{ 'is-locked': filterLocked }">
        <div class="param-wrapper param-wrapper--area">
          <AreaSelect v-model="currentArea" :disabled="filterLocked" @changeArea="changeArea" />
        </div>
        <div class="param-wrapper">
          <el-select
            v-model="dateType"
            popper-class="custom-select-popper"
            placeholder="请选择"
            filterable
            :disabled="filterLocked"
            :popper-append-to-body="true"
            @change="changeDateType"
          >
            <el-option v-for="t in dateTypeList" :key="t.value" :label="t.name" :value="t.value" />
          </el-select>
        </div>
        <div class="param-wrapper param-wrapper--date">
          <el-date-picker
            v-if="dateType === 'year'"
            v-model="currentYear"
            type="year"
            format="YYYY"
            value-format="YYYY"
            :clearable="false"
            :disabled="filterLocked"
            :append-to-body="false"
            style="width: 100%"
            @change="loadAll"
          />
          <el-cascader
            v-else-if="dateType === 'holiday'"
            v-model="currentHoliday"
            :options="holidayData"
            :props="{ expandTrigger: 'hover' }"
            :show-all-levels="false"
            :disabled="filterLocked"
            :append-to-body="false"
            style="width: 100%"
            @change="loadAll"
          />
          <el-date-picker
            v-else
            v-model="currentDay"
            type="date"
            format="YYYY-MM-DD"
            :clearable="false"
            :disabled="filterLocked"
            :append-to-body="false"
            style="width: 100%"
            @change="loadAll"
          />
        </div>
      </div>
    </div>

    <!-- ===== 热门排行：四张指标卡 ===== -->
    <div v-if="rankType === 'hot'" class="index-card-wrapper">
      <div v-for="item in statisticsList" :key="item.value" class="statistics-card-wrapper">
        <div class="left-part-wrapper">
          <div class="statistics-name-wrapper">
            <span class="stat-icon" :class="`stat-icon--${item.icon}`">
              <el-icon><component :is="iconOf(item.icon)" /></el-icon>
            </span>
            <span class="stat-name">{{ item.name }}</span>
            <span class="stat-range">({{ statistics.timeRange[`${item.dataIndex}Range`] || '' }})</span>
          </div>
          <div class="statistics-data-unit-wrapper">
            <div class="statistics-data-wrapper sj-num">{{ statistics[item.dataIndex] || '-' }}</div>
            <div class="statistics-unit-wrapper">
              {{ statistics[`${item.dataIndex}_unit`] || '' }}{{ item.unit === '元' ? '' : '' }}
            </div>
          </div>
          <div class="statistics-percent-wrapper">
            <div class="percent-name-wrapper">同比</div>
            <div class="percent-wrapper sj-num">{{ percent(statistics[`${item.dataIndex}_tb`]) }}%</div>
            <el-icon
              class="percent-arrow"
              :class="Number(statistics[`${item.dataIndex}_tb`]) >= 0 ? 'is-up' : 'is-down'"
            >
              <component :is="Number(statistics[`${item.dataIndex}_tb`]) >= 0 ? 'Top' : 'Bottom'" />
            </el-icon>
          </div>
        </div>
      </div>
    </div>

    <!-- ===== 热门排行：四张排行榜 ===== -->
    <div v-if="rankType === 'hot'" class="rank-part-wrapper">
      <div class="rank-detail-wrapper">
        <div
          v-for="cfg in hotTableConfig"
          :key="cfg.key"
          v-loading="tableLoading.hot[cfg.key]"
          element-loading-background="rgba(3, 20, 35, .4)"
          class="rank-card-item"
        >
          <ChartCard :name="cfg.title" :dom-id="cfg.domId">
            <template #titleAppend>
              <span class="title-extra-unit-wrapper">{{ cfg.unit }}</span>
            </template>
            <TableList
              :columns="columnsOf(cfg.key)"
              :rows="hotRank[cfg.key] || []"
              :dom-id="cfg.domId"
              :value-in-wan="true"
            />
          </ChartCard>
        </div>
      </div>
    </div>

    <!--
      ===== 高频态势：6 张「摘要条 + 折线图」卡片 =====
      参考站实测（CDP）：该 TAB **不是排行榜**，而是 6 张趋势卡，
      布局 .chart-part-wrapper 1680×753 内 3 列 × 2 行，每张 .trend-chart-card-wrapper 537×359。
      卡片依次为：旅游消费 / 国内旅游 / 入境旅游 / 景区游客 / 商圈游客 / 夜间文旅。
    -->
    <div v-if="rankType === 'break'" class="chart-part-wrapper">
      <div
        v-for="cfg in trendChartConfig"
        :key="cfg.key"
        v-loading="trendLoading[cfg.loadingKey] && !trendData[cfg.key]"
        element-loading-background="rgba(3, 20, 35, .4)"
        class="trend-chart-card-wrapper"
      >
        <TrendChart
          :data="trendData[cfg.key]"
          :name="cfg.name"
          :unit="cfg.unit"
          :color="cfg.color"
          :dom-id="`trend-${cfg.loadingKey}`"
        />
      </div>
    </div>

    <!-- ===== 数据来源 ===== -->
    <div class="sourece-wrapper">{{ dataSourceText }}</div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import AreaSelect from '@/components/AreaSelect.vue'
import ChartCard from '@/components/ChartCard.vue'
import TableList from '@/components/TableList.vue'
import TrendChart from '@/components/TrendChart.vue'
import {
  configMap,
  dateTypeList,
  hotTableConfig,
  rankTypeList,
  statisticsList,
  trendChartConfig
} from '@/config/overview'
import { fetchBreakRank, fetchHotRank, fetchStatistics } from '@/api/trend'
import { fetchHolidays } from '@/api/trend'
import { percent } from '@/utils/format'
import { isFilterLocked } from '@/utils/lock'

/** 指标卡图标（用 Element Plus 图标替代参考站的 PNG，避免外部图片依赖） */
const iconOf = (key) =>
  ({
    fee: 'Money',
    tourist: 'User',
    entry: 'Promotion',
    scenic: 'Picture'
  }[key] || 'DataLine')

const rankType = ref('hot')
// 演示口径：默认落在 2026 年国庆节假期（10 月 1 日 - 10 月 7 日）
const dateType = ref('holiday')
/** 区域 + 时间是否锁定（演示时固定口径，避免误操作） */
const filterLocked = isFilterLocked()
// 默认落在最近一个有完整年度数据的年份（松江区统计公报最新为 2025 年）
const latestCompleteYear = new Date().getMonth() >= 3 ? new Date().getFullYear() - 1 : new Date().getFullYear() - 2
const currentYear = ref(String(latestCompleteYear))
const currentDay = ref(new Date())
const currentHoliday = ref([])
const holidayData = ref([])
const currentArea = ref({ code: '310117', name: '松江区' })
const dataSourceText = window.appContext?.dataSourceText || '数据来源：手机信令大数据'

const statistics = reactive({
  timeRange: {},
  fee: '-',
  gn: '-',
  rj: '-',
  scenic: '-',
  fee_tb: 0,
  gn_tb: 0,
  rj_tb: 0,
  scenic_tb: 0
})

const hotRank = reactive({ fee: [], city: [], entry: [], scenic: [] })
const breakRank = reactive({ fee: [], city: [], entry: [], scenic: [] })
const trendData = reactive({
  trendFeeData: null,
  trendCityData: null,
  trendEntryData: null,
  trendScenicData: null,
  trendBusinessData: null,
  trendSpecialData: null
})

const tableLoading = reactive({
  hot: { fee: false, city: false, entry: false, scenic: false },
  breakData: { fee: false, city: false, entry: false, scenic: false }
})
const trendLoading = reactive({ fee: false, city: false, entry: false, scenic: false, business: false, special: false })

const columnsOf = (key) => (configMap[key] ? configMap[key].columns : [])

/**
 * 年份归一化为 4 位数字字符串。
 * 坑：`el-date-picker type="year"` 在部分 Element Plus 版本下 v-model 绑定的仍是
 * **Date 对象**，直接透传会让摘要条渲染成
 * `Thu Jan 01 2026 00:00:00 GMT+0800 (中国标准时间)年，松江区旅游消费…`。
 * 模板已加 `value-format="YYYY"`，此处再做一层兜底，兼容 Date / number / string。
 */
const normalizeYear = (v) => {
  if (v === null || v === undefined || v === '') return ''
  if (v instanceof Date) return String(v.getFullYear())
  const s = String(v)
  const m = s.match(/\d{4}/)
  return m ? m[0] : s
}

/** 组装查询参数 */
const baseParams = () => ({
  area: currentArea.value?.name || '松江区',
  areaCode: currentArea.value?.code || '310117',
  dateType: dateType.value,
  year: normalizeYear(currentYear.value),
  day: currentDay.value ? new Date(currentDay.value).toISOString().slice(0, 10) : '',
  holiday: Array.isArray(currentHoliday.value) ? currentHoliday.value.join('/') : ''
})

/** 指标卡 + 热门排行 */
async function loadStatisticsAndHot() {
  Object.keys(tableLoading.hot).forEach((k) => (tableLoading.hot[k] = true))
  try {
    const [stat, hot] = await Promise.all([fetchStatistics(baseParams()), fetchHotRank({ ...baseParams(), limit: 15 })])
    Object.assign(statistics, stat)
    Object.keys(hotRank).forEach((k) => (hotRank[k] = hot[k] || []))
  } finally {
    Object.keys(tableLoading.hot).forEach((k) => (tableLoading.hot[k] = false))
  }
}

/** 高频态势：突破榜 + 趋势 */
async function loadBreak() {
  Object.keys(tableLoading.breakData).forEach((k) => (tableLoading.breakData[k] = true))
  Object.keys(trendLoading).forEach((k) => (trendLoading[k] = true))
  try {
    const data = await fetchBreakRank(baseParams())
    Object.keys(breakRank).forEach((k) => (breakRank[k] = data[k] || []))
    trendData.trendFeeData = data.trend.fee
    trendData.trendCityData = data.trend.city
    trendData.trendEntryData = data.trend.entry
    trendData.trendScenicData = data.trend.scenic
    trendData.trendBusinessData = data.trend.business
    trendData.trendSpecialData = data.trend.special
  } finally {
    Object.keys(tableLoading.breakData).forEach((k) => (tableLoading.breakData[k] = false))
    Object.keys(trendLoading).forEach((k) => (trendLoading[k] = false))
  }
}

async function loadAll() {
  await loadStatisticsAndHot()
  if (rankType.value === 'break') await loadBreak()
}

const changeRankType = (val) => {
  rankType.value = val
  if (val === 'break' && !trendData.trendCityData) loadBreak()
}

const changeDateType = () => {
  loadAll()
}

const changeArea = () => {
  loadAll()
}

onMounted(async () => {
  holidayData.value = await fetchHolidays()
  if (holidayData.value && holidayData.value.length) {
    currentHoliday.value = [holidayData.value[0].value, holidayData.value[0].children[0].value]
  }
  await loadAll()
})

defineExpose({ loadAll })
</script>

<style scoped>
/* ==========================================================================
   以下样式尺寸/配色 1:1 取自参考站 chunk-1b0fcab6.css（scoped: data-v-4ef8da64）
   ========================================================================== */

.holiday-main-outer-wrapper {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* 模块容器已提供 10px 上 / 20px 下内边距（实测参考站如此），
     本页可用高度即 980px，与参考站 .holiday-main-outer-wrapper 一致 */
}

.holiday-main-outer-wrapper div,
.holiday-main-outer-wrapper span {
  box-sizing: border-box;
}

/* ---------- 顶部 ---------- */
/* 实测：.top-part-wrapper 1920×70 @(0,0)，.top-params-wrapper 500×40 靠右（右边缘=1920） */
.top-part-wrapper {
  width: 100%;
  height: 70px;
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 2000;
  position: relative;
}

.rank-type-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.rank-type-wrapper .rank-type-switch {
  display: inline-flex;
  align-items: center;
  padding: 4px;
  border-radius: 8px;
  background: rgba(3, 28, 52, 0.75);
  border: 1px solid rgba(8, 138, 251, 0.45);
  box-shadow: inset 0 0 12px rgba(8, 138, 251, 0.12);
}

.rank-type-wrapper .rank-type-item-wrapper {
  min-width: 240px;
  height: 48px;
  padding: 0 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  font-size: 24px;
  letter-spacing: 2px;
  color: rgba(180, 220, 255, 0.78);
  background: transparent;
  border: 1px solid transparent;
  transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  user-select: none;
}

.rank-type-wrapper .rank-type-item-wrapper i {
  font-size: 26px;
  line-height: 1;
  color: rgba(8, 178, 255, 0.85);
  transition: color 0.2s ease;
}

.rank-type-wrapper .rank-type-item-wrapper.icon-right {
  flex-direction: row-reverse;
}

.rank-type-wrapper .rank-type-item-wrapper.active {
  color: #1a1408;
  font-weight: 700;
  background: linear-gradient(180deg, #f6d76a, #d8b048);
  border-color: transparent;
  box-shadow: 0 2px 8px rgba(216, 176, 72, 0.45);
}

.rank-type-wrapper .rank-type-item-wrapper.active i {
  color: #1a1408;
}

.rank-type-wrapper .rank-type-item-wrapper:hover:not(.active) {
  color: #fff;
  background: rgba(8, 138, 251, 0.22);
  border-color: rgba(8, 178, 255, 0.35);
}

.top-params-wrapper {
  width: 500px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1010;
  flex-shrink: 0;
}

.top-params-wrapper .param-wrapper {
  width: 140px;
  margin: 0 10px;
}

.top-params-wrapper .param-wrapper--area {
  width: 220px;
}

.top-params-wrapper .param-wrapper--date {
  width: 160px;
}

/* ---------- 四张指标卡 ---------- */
/* 实测：1760×260 @(80,100→200)，margin 30px 80px 0，padding 0 40px */
.index-card-wrapper {
  width: calc(100% - 160px);
  height: 260px;
  flex-shrink: 0;
  margin: 30px 80px 0;
  position: relative;
  z-index: 1008;
  display: flex;
  align-items: center;
  justify-content: space-around;
  color: #fff;
  padding: 0 40px;
  /* 参考站：index-card-bg.png 四指标卡底图 */
  background: url('/img/index-card-bg.1c858903.png') no-repeat;
  background-size: 100% 100%;
}

.index-card-wrapper .statistics-card-wrapper {
  padding: 5px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  min-width: 0;
}

.index-card-wrapper .left-part-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  font-size: 22px;
}

.statistics-name-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
}

.stat-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #04121f;
  background: linear-gradient(180deg, #f6d76a, #d8b048);
  box-shadow: 0 0 10px rgba(255, 210, 0, 0.35);
}

.stat-icon--tourist {
  background: linear-gradient(180deg, #7ad4ff, #088afb);
  color: #04121f;
}
.stat-icon--entry {
  background: linear-gradient(180deg, #a5ffd6, #2fd27a);
}
.stat-icon--scenic {
  background: linear-gradient(180deg, #ffc9a3, #ff8b4d);
}

.stat-name {
  font-weight: bolder;
  font-size: 20px;
}

.stat-range {
  font-size: 15px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.78);
}

.statistics-data-unit-wrapper {
  width: 100%;
  display: flex;
  align-items: baseline;
  margin-top: 0;
  font-size: 28px;
  padding-left: 50px;
}

.statistics-data-wrapper {
  color: #ffd200;
  font-weight: 700;
  font-size: 34px;
  line-height: 1.2;
}

.statistics-unit-wrapper {
  margin-left: 10px;
  font-size: 16px;
  margin-bottom: -6px;
}

.statistics-percent-wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 6px;
  padding-left: 50px;
}

.percent-name-wrapper {
  color: #68befe;
  font-size: 18px;
}

.percent-wrapper {
  font-size: 22px;
  margin-left: 10px;
  font-weight: 700;
}

.percent-arrow {
  margin-left: 8px;
  font-size: 18px;
}

.percent-arrow.is-up {
  color: #ff5b5b;
}

.percent-arrow.is-down {
  color: #2fd27a;
}

/* ---------- 排行区 ---------- */
/* 实测：.rank-part-wrapper 1920×570，.rank-detail-wrapper 1920×560 @(0,10)，
   .rank-card-item 450×520 ×4（间距 ~27px） */
/* 实测（直接量参考站渲染页，换算 1920 设计单位）：
     .rank-part-wrapper   1920×570
     .rank-detail-wrapper 1920×560 @(0,10)
     .rank-card-item       450×520 ×4
     .chart-title          450×42
     .content-wrapepr      450×467
   竖直合计：top70 + (indexCard 30margin+260) + rank570 + (source 4+20+6) = 960，
   在 1010 内留 50px 余量。此前用 flex:1 会把卡片撑到 541 → 整体溢出 17px。 */
.rank-part-wrapper {
  width: 100%;
  height: 570px;
  flex-shrink: 0;
  position: relative;
  padding-top: 10px;
  box-sizing: border-box;
}

.rank-part-wrapper.is-break {
  height: 570px;
}

.rank-part-wrapper .rank-detail-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 40px 20px 0 20px;
  display: flex;
  justify-content: space-between;
  gap: 27px;
}

.rank-part-wrapper .rank-detail-wrapper .rank-card-item {
  flex: 1 1 0;
  min-width: 0;
  height: 100%;
  position: relative;
}

.title-extra-unit-wrapper {
  font-size: 16px;
  margin-top: 6px;
  color: hsla(0, 0%, 100%, 0.8);
}

/* ---------- 趋势区（高频态势）----------
   实测参考站：.chart-part-wrapper 1680×753（页面还含指标卡的布局）。
   本项目在「高频态势」下**隐藏了指标卡**，因此这里让趋势区**弹性撑满**
   剩余高度，避免底部留白（曾固定 753px 导致下方空 124px）。 */
.chart-part-wrapper {
  width: 100%;
  flex: 1;
  min-height: 0;
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 16px;
  padding: 6px 0 0;
  box-sizing: border-box;
  overflow: hidden;
}

.trend-chart-card-wrapper {
  min-height: 0;
  position: relative;
}

/* 窄屏降级为两列 */
@media (max-width: 1500px) {
  .chart-part-wrapper {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: none;
    grid-auto-rows: 320px;
    overflow-y: auto;
  }
}

/* ---------- 数据来源 ---------- */
.sourece-wrapper {
  flex-shrink: 0;
  font-size: 14px;
  color: hsla(0, 0%, 100%, 0.6);
  margin: 4px 0 6px 26px;
}
</style>
