<template>
  <div class="skeleton">
    <div class="skeleton__head">
      <div class="skeleton__title">
        <span class="skeleton__title-bar"></span>
        <h2>{{ cfg.title }}</h2>
        <span class="skeleton__badge">结构对齐参考站 · 数据待接入</span>
      </div>
      <p class="skeleton__desc">{{ cfg.desc }}</p>
    </div>

    <!-- 页面控制栏（参考站各子页面顶部的日期区间 + 时间维度 + 监测维度） -->
    <div v-if="cfg.controls" class="skeleton__controls">
      <PageControlBar :groups="cfg.controls" @change="onControlChange" />
    </div>

    <div class="skeleton__scroll">
      <!-- 指标卡 -->
      <div v-if="cfg.kpis && cfg.kpis.length" class="kpi-row">
        <div v-for="(k, i) in cfg.kpis" :key="k.label" class="kpi-card sj-panel sj-panel__corner">
          <div class="kpi-card__label">{{ k.label }}</div>
          <div class="kpi-card__value">
            <span class="sj-num">{{ k.value }}</span>
            <em>{{ k.unit }}</em>
          </div>
          <div class="kpi-card__tb" :class="Number(k.tb) >= 0 ? 'is-up' : 'is-down'">
            <el-icon><component :is="Number(k.tb) >= 0 ? 'Top' : 'Bottom'" /></el-icon>
            <span class="sj-num">同比 {{ percent(k.tb) }}%</span>
          </div>
          <span class="kpi-card__idx sj-num">{{ String(i + 1).padStart(2, '0') }}</span>
        </div>
      </div>

      <!-- 表格页（舆情列表等） -->
      <div v-if="cfg.table" class="table-panel sj-panel sj-panel__corner">
        <ChartCard name="舆情明细">
          <TableList :columns="tableColumns" :rows="tableRows" dom-id="skeleton-table" />
        </ChartCard>
      </div>

      <!-- 地图占位 -->
      <div v-if="cfg.map" class="map-panel sj-panel sj-panel__corner">
        <ChartCard name="资源空间分布">
          <div class="map-panel__inner">
            <el-icon class="map-panel__icon"><MapLocation /></el-icon>
            <div class="map-panel__text">
              已就绪 {{ pointCount }} 个文旅点位坐标数据，坐标拾取与底图服务接入后即可上图
            </div>
            <div class="map-panel__tags">
              <span v-for="t in topTowns" :key="t.name" class="map-panel__tag">
                {{ t.name }} · {{ t.count }} 个
              </span>
            </div>
          </div>
        </ChartCard>
      </div>

      <!-- 图表区 -->
      <div v-if="cfg.charts && cfg.charts.length" class="chart-grid">
        <div
          v-for="c in cfg.charts"
          :key="c.name"
          class="chart-grid__item"
          :class="{ 'is-wide': cfg.charts.length % 2 === 1 && c === cfg.charts[cfg.charts.length - 1] }"
        >
          <ChartCard :name="c.name">
            <template #titleAppend>
              <span class="title-extra">{{ unitOf(c.type) }}</span>
            </template>
            <BaseChart :option="optionOf(c)" height="100%" />
          </ChartCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import BaseChart from '@/components/BaseChart.vue'
import ChartCard from '@/components/ChartCard.vue'
import PageControlBar from '@/components/PageControlBar.vue'
import TableList from '@/components/TableList.vue'
import pageRegistry from '@/config/pages'
import { scenicSpots, towns } from '@/mock/songjiang'
import { buildBarRankOption, buildPieOption as pie, buildTrendOption as trend } from '@/utils/chart'
import { percent, recentMonths, seeded, thousands } from '@/utils/format'

/** 取当前路由对应的骨架配置 */
const route = useRoute()
const cfg = computed(() => pageRegistry[route.path] || { title: '功能建设中', desc: '', charts: [], kpis: [] })

const pointCount = computed(() => scenicSpots.length)
const topTowns = computed(() => {
  const map = {}
  scenicSpots.forEach((s) => {
    map[s.town] = (map[s.town] || 0) + 1
  })
  return Object.entries(map)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8)
})

/* ---------------- 演示数据生成（与页面 key 绑定，刷新不跳动） ---------------- */
/** 数值基准：取页面首个 KPI 的量级，保证图表与指标卡同一数量级 */
const baseValue = computed(() => {
  const k = (cfg.value.kpis || [])[0]
  if (!k) return 12000
  const n = Number(String(k.value).replace(/[^\d.]/g, ''))
  if (!Number.isFinite(n) || n === 0) return 12000
  return n
})

/** 图表单位：优先取图表自身配置，其次取页面首个 KPI 的单位 */
const unit = computed(() => {
  const k = (cfg.value.kpis || [])[0]
  return (k && k.unit) || '人次'
})

const unitOf = (type) => (type === 'pie' ? '(占比)' : `(单位:${unit.value})`)

/** 控制栏变化：把时间维度/日期/监测维度并入查询参数（接口接入后用于取数） */
const controlParams = ref({})
const onControlChange = (payload) => {
  controlParams.value = payload
}

const seriesOf = (key, size, total) => {
  const rnd = seeded(`${route.path}-${key}`)
  const raw = Array.from({ length: size }, () => 0.55 + rnd() * 0.9)
  const sum = raw.reduce((a, b) => a + b, 0)
  return raw.map((v) => Math.max(1, Math.round((v / sum) * total)))
}

const catsOf = (c) => c.cats || recentMonths(12)

const optionOf = (c) => {
  const cats = catsOf(c)
  const u = c.unit || unit.value
  // 折线/柱状覆盖全年合计；饼图与排行使用同一总量
  const total = Math.round(baseValue.value)
  const values = seriesOf(c.name, cats.length, total)
  if (c.type === 'pie') {
    // 饼图优先与指标卡的数值保持一致（如正面/负面占比），避免同一页数据互相矛盾
    const kpiValues = (cfg.value.kpis || [])
      .map((k) => Number(String(k.value).replace(/[^\d.]/g, '')))
      .filter((n) => Number.isFinite(n) && n > 0)
    const data =
      kpiValues.length >= cats.length
        ? cats.map((name, i) => ({ name, value: kpiValues[i] }))
        : cats.map((name, i) => ({ name, value: values[i] }))
    return pie({ data, unit: u, name: c.name })
  }
  if (c.type === 'barRank') {
    return buildBarRankOption({
      data: cats.map((name, i) => ({ name, value: values[i] })),
      unit: u
    })
  }
  const isYearBar = cats.length <= 6
  return trend({
    xData: cats,
    series: [
      {
        name: c.name,
        data: values,
        type: c.type === 'bar' || isYearBar ? 'bar' : 'line',
        color: '#088afb'
      }
    ],
    unit: u,
    legend: false,
    showDataZoom: cats.length > 16
  })
}

/* ---------------- 舆情列表演示表 ---------------- */
const tableColumns = [
  { label: '标题', prop: 'title', align: 'left', minWidth: 200 },
  { label: '来源', prop: 'source', width: 110 },
  { label: '区域', prop: 'region', width: 110 },
  { label: '情感', prop: 'sentiment', width: 90 },
  { label: '热度', prop: 'heat', width: 90, sortable: true },
  { label: '发布时间', prop: 'time', width: 150 }
]

const tableRows = computed(() => {
  const samples = [
    ['“上海之根”广富林文化遗址人气持续攀升', '上观新闻', '广富林街道', '正面', 9862],
    ['佘山国家森林公园秋季登山季启动', '乐游上海', '佘山镇', '正面', 7421],
    ['辰山植物园兰花展吸引众多游客打卡', '新民晚报', '佘山镇', '正面', 6380],
    ['泗泾古镇下塘老街客流创新高', '松江报', '泗泾镇', '正面', 5124],
    ['上海欢乐谷万圣季活动带动夜间消费', '澎湃新闻', '佘山镇', '中性', 4860],
    ['部分景区停车位紧张引发游客吐槽', '小红书', '佘山镇', '负面', 2360],
    ['云间粮仓文创市集周末人气旺', '松江发布', '中山街道', '正面', 3150],
    ['醉白池公园菊花展进入最佳观赏期', '上海松江', '岳阳街道', '正面', 2890],
    ['泰晤士小镇网红打卡点秩序良好', '抖音', '方松街道', '中性', 2140],
    ['浦江之首乡村旅游线路受青睐', '东方网', '石湖荡镇', '正面', 1960]
  ]
  return samples.map((s, i) => ({
    title: s[0],
    source: s[1],
    region: s[2],
    sentiment: s[3],
    heat: thousands(s[4]),
    time: `2025-1${(i % 2) + 1}-${String((i * 3) % 27 + 1).padStart(2, '0')} 10:${String((i * 7) % 60).padStart(2, '0')}`
  }))
})
</script>

<style scoped>
/* 页面内容铺满；背景保持半透明，与参考站一致 ——
   面板之间可透出模块级地图，面板自身由 .sj-panel 提供深色底 */
.skeleton {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.skeleton__head {
  flex-shrink: 0;
  padding: 16px 24px 12px;
  border-bottom: 1px solid var(--sj-border-soft);
}

.skeleton__title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.skeleton__title-bar {
  width: 4px;
  height: 20px;
  border-radius: 2px;
  background: linear-gradient(180deg, var(--sj-gold-light), var(--sj-gold-dark));
}

.skeleton__title h2 {
  margin: 0;
  font-size: 22px;
  letter-spacing: 2px;
  color: #fff;
}

.skeleton__badge {
  font-size: 12px;
  padding: 2px 8px;
  border-radius: 10px;
  color: var(--sj-primary-light);
  border: 1px solid var(--sj-border-soft);
  background: rgba(8, 138, 251, 0.14);
}

.skeleton__desc {
  margin: 8px 0 0;
  font-size: 13px;
  color: var(--sj-text-weak);
  line-height: 1.6;
}

.skeleton__scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding: 16px 24px 24px;
}

/* 控制栏：与参考站一致紧贴标题下方，右侧留白对齐内容区 */
.skeleton__controls {
  flex-shrink: 0;
  padding: 10px 24px 0;
}

/* ---------------- 指标卡 ---------------- */
.kpi-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.kpi-card {
  flex: 1 1 220px;
  min-width: 200px;
  padding: 14px 18px;
  position: relative;
}

.kpi-card__label {
  font-size: 14px;
  color: var(--sj-text-sub);
}

.kpi-card__value {
  margin-top: 8px;
  display: flex;
  align-items: baseline;
  gap: 6px;
}

.kpi-card__value span {
  font-size: 30px;
  font-weight: 700;
  color: var(--sj-gold);
  line-height: 1.1;
}

.kpi-card__value em {
  font-style: normal;
  font-size: 13px;
  color: var(--sj-text-sub);
}

.kpi-card__tb {
  margin-top: 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 13px;
}

.kpi-card__tb.is-up {
  color: var(--sj-up);
}

.kpi-card__tb.is-down {
  color: var(--sj-down);
}

.kpi-card__idx {
  position: absolute;
  right: 12px;
  top: 10px;
  font-size: 22px;
  font-weight: 700;
  color: rgba(8, 138, 251, 0.28);
}

/* ---------------- 图表区 ---------------- */
.chart-grid {
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.chart-grid__item {
  width: calc(50% - 8px);
  height: 300px;
}

.chart-grid__item.is-wide {
  width: 100%;
}

/* ---------------- 表格 / 地图 ---------------- */
.table-panel,
.map-panel {
  height: 460px;
  margin-top: 4px;
}

.map-panel__inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background: radial-gradient(ellipse at center, rgba(8, 138, 251, 0.14), transparent 70%);
}

.map-panel__icon {
  font-size: 46px;
  color: var(--sj-primary);
}

.map-panel__text {
  font-size: 14px;
  color: var(--sj-text-sub);
}

.map-panel__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  max-width: 70%;
}

.map-panel__tag {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 10px;
  color: var(--sj-gold);
  border: 1px solid var(--sj-border-soft);
  background: rgba(8, 138, 251, 0.12);
}

.title-extra {
  font-size: 13px;
  color: var(--sj-text-weak);
}
</style>
