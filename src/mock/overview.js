/**
 * 态势总览页 Mock 数据生成器
 *
 * 口径约束（与松江区统计公报保持一致）：
 *  - 年度旅游消费合计 = 157.56 亿元（旅游收入）
 *  - 年度接待游客合计 = 2207 万人次
 *  - 年度入境游客合计 = 331.05 万人次（测算）
 *  - 年度景区接待合计 = 1496.77 万人次（16 家 A 级景区）
 *  - 年度商圈接待合计 = 3250 万人次（测算）
 * 街镇/景区明细为按资源体量测算的分布值，合计与上述全区值一致，便于校验。
 */
import {
  DISTRICT_INDICATORS,
  REGION,
  businessAreas,
  historyIndicators,
  holidayStatistics,
  holidays,
  scenicSpots,
  towns
} from './songjiang'
import { DATA_GRANULARITY, PLATFORM_TOTALS, REAL_STATISTICS } from './realdata'
import {
  RANK_ENTRY_CITY,
  RANK_FEE_CITY,
  RANK_SCENIC,
  RANK_TOURIST_CITY
} from './rankData'
import {
  HOLIDAY_2026,
  HOLIDAY_RANK_BUSINESS,
  HOLIDAY_RANK_CITY,
  HOLIDAY_RANK_ENTRY,
  HOLIDAY_RANK_FEE,
  HOLIDAY_RANK_SCENIC,
  buildHolidaySeries,
  buildHolidayStatistics
} from './holiday2026'
import { recentDays, recentMonths, seeded } from '@/utils/format'

/**
 * 是否请求「2026 年国庆节」假日口径。
 * 假日口径一律走 src/mock/holiday2026.js 的固化数据集；
 * 其他假期仍按区级年度总量折算，避免口径串用。
 */
export const isHoliday2026 = (params = {}) =>
  params.dateType === 'holiday' && String(params.holiday || '').includes(HOLIDAY_2026.id)

/** 指标口径定义 */
export const METRICS = {
  fee: {
    total: DISTRICT_INDICATORS.tourismRevenue,
    growth: DISTRICT_INDICATORS.tourismRevenueGrowth,
    unit: '元',
    name: '旅游消费'
  },
  city: {
    total: DISTRICT_INDICATORS.touristTrips,
    growth: DISTRICT_INDICATORS.touristTripsGrowth,
    unit: '人次',
    name: '接待游客'
  },
  entry: { total: DISTRICT_INDICATORS.inboundTrips, growth: 8.6, unit: '人次', name: '入境游客' },
  scenic: {
    total: DISTRICT_INDICATORS.aLevelScenicTrips,
    growth: 9.2,
    unit: '人次',
    name: '景区接待'
  },
  business: { total: 32500000, growth: 6.8, unit: '人次', name: '商圈接待' },
  /**
   * 参考站高频态势第 6 张卡为「冰雪运动」专题；
   * 松江区无冰雪资源，按本地实际替换为**夜间文旅**。
   * 645.95 万人次 = 平台实测夜间客流（SCENIC_METRICS.night / 1e4），占比 45.36%。
   */
  special: { total: 6659501, growth: 12.4, unit: '人次', name: '夜间文旅接待' }
}

/**
 * 各街镇在各指标上的占比权重（结合文旅资源体量与区位测算，合计 = 1）
 * 消费占比整体略低于客流占比（郊区客流以近程休闲为主，人均消费偏低）
 */
const TOWN_WEIGHTS = {
  fee: {
    岳阳街道: 0.095, 永丰街道: 0.062, 方松街道: 0.115, 中山街道: 0.088, 广富林街道: 0.072,
    九里亭街道: 0.045, 泗泾镇: 0.082, 佘山镇: 0.145, 车墩镇: 0.055, 新桥镇: 0.048,
    洞泾镇: 0.052, 九亭镇: 0.058, 石湖荡镇: 0.018, 新浜镇: 0.015, 泖港镇: 0.016,
    叶榭镇: 0.019, 小昆山镇: 0.015
  },
  city: {
    岳阳街道: 0.062, 永丰街道: 0.055, 方松街道: 0.098, 中山街道: 0.078, 广富林街道: 0.082,
    九里亭街道: 0.042, 泗泾镇: 0.088, 佘山镇: 0.178, 车墩镇: 0.068, 新桥镇: 0.038,
    洞泾镇: 0.045, 九亭镇: 0.062, 石湖荡镇: 0.028, 新浜镇: 0.021, 泖港镇: 0.019,
    叶榭镇: 0.019, 小昆山镇: 0.017
  },
  entry: {
    岳阳街道: 0.055, 永丰街道: 0.058, 方松街道: 0.102, 中山街道: 0.082, 广富林街道: 0.132,
    九里亭街道: 0.038, 泗泾镇: 0.078, 佘山镇: 0.198, 车墩镇: 0.062, 新桥镇: 0.045,
    洞泾镇: 0.042, 九亭镇: 0.052, 石湖荡镇: 0.018, 新浜镇: 0.012, 泖港镇: 0.012,
    叶榭镇: 0.014, 小昆山镇: 0.02
  }
}

/** 景区接待量权重（合计 = 1，对应 1496.77 万人次） */
const SCENIC_WEIGHTS = {
  上海欢乐谷: 0.185, 佘山国家森林公园: 0.142, 上海辰山植物园: 0.118, 广富林文化遗址: 0.098,
  上海影视乐园: 0.086, 月湖雕塑公园: 0.062, 醉白池公园: 0.052, 方塔园: 0.048,
  蓝精灵主题乐园: 0.044, 云堡未来市: 0.032, 泗泾古镇: 0.038, 佘山精灵之城主题乐园: 0.026,
  浦江之首: 0.018, 云间粮仓文创园: 0.022, 上海广富林奇石馆: 0.014, 江南水稻艺术观光园: 0.015
}

/** 商圈接待量权重（与 songjiang.js businessAreas 名录对应） */
const BUSINESS_WEIGHTS = {
  松江印象城: 0.185, 松江万达广场: 0.152, 开元地中海商业广场: 0.116, 九亭U天地: 0.096,
  '乐都路商圈（乐都商业广场）': 0.082, '松江老城庙前街': 0.068, 佘山宝乐汇: 0.066,
  '泗泾塘商业街（泗泾烟火夜市）': 0.058, '松江大学城文汇路商圈': 0.052, '云间粮仓文创园': 0.044,
  '泰晤士小镇商业街': 0.038, '五龙商业广场（五龙香港街）': 0.032, 九峰源广场: 0.026,
  飞航吾悦广场: 0.024, 塞纳新天地: 0.02, 大橘邻里: 0.016
}

/** 入境客源地结构（港澳台 + 主要客源国） */
const ENTRY_SOURCES = [
  { name: '中国台湾', ratio: 0.212 },
  { name: '中国香港', ratio: 0.186 },
  { name: '美国', ratio: 0.128 },
  { name: '日本', ratio: 0.114 },
  { name: '韩国', ratio: 0.098 },
  { name: '新加坡', ratio: 0.072 },
  { name: '德国', ratio: 0.056 },
  { name: '澳大利亚', ratio: 0.048 },
  { name: '中国澳门', ratio: 0.046 },
  { name: '其他', ratio: 0.04 }
]

const round = (v) => Math.round(v)
const round2 = (v) => Math.round(v * 100) / 100

/** 生成“同比”值：以目标增速为中心小幅波动，保证整体增速与公报一致 */
function growthFor(key, base) {
  const rnd = seeded(`tb-${key}`)
  const delta = (rnd() - 0.45) * 12
  return round2(base + delta)
}

/** 生成街镇排行数据 */
function buildTownRank(metricKey, limit) {
  const metric = METRICS[metricKey]
  const weights = TOWN_WEIGHTS[metricKey]
  const list = towns.map((t) => {
    const ratio = weights[t.name] || 0.01
    const all = round(metric.total * ratio)
    return {
      region_name: t.name,
      region_proname: REGION.district,
      region_type: t.type,
      all_value: all,
      tb_all_value: growthFor(`${metricKey}-${t.name}`, metric.growth),
      eachData: all
    }
  })
  list.sort((a, b) => b.all_value - a.all_value)
  return limit ? list.slice(0, limit) : list
}

/** 生成景区排行数据 */
function buildScenicRank(limit) {
  const metric = METRICS.scenic
  const list = Object.entries(SCENIC_WEIGHTS).map(([name, ratio]) => {
    const spot = scenicSpots.find((s) => s.name === name) || { town: REGION.district, level: '—' }
    const all = round(metric.total * ratio)
    return {
      region_name: name,
      region_proname: spot.town,
      region_level: spot.level,
      all_value: all,
      tb_all_value: growthFor(`scenic-${name}`, metric.growth),
      eachData: all
    }
  })
  list.sort((a, b) => b.all_value - a.all_value)
  return limit ? list.slice(0, limit) : list
}

/** 生成商圈排行数据 */
function buildBusinessRank(limit) {
  const metric = METRICS.business
  const list = Object.entries(BUSINESS_WEIGHTS).map(([name, ratio]) => {
    const area = businessAreas.find((b) => b.name === name) || { town: REGION.district }
    const all = round(metric.total * ratio)
    return {
      region_name: name,
      region_proname: area.town,
      all_value: all,
      tb_all_value: growthFor(`business-${name}`, metric.growth),
      eachData: all
    }
  })
  list.sort((a, b) => b.all_value - a.all_value)
  return limit ? list.slice(0, limit) : list
}

/** 展示单位换算：原始值统一为「元 / 人次」，按业务习惯换算为亿元、万人次展示 */
export function displayUnit(metricKey, total) {
  if (metricKey === 'fee') {
    if (total >= 1e8) return { value: (total / 1e8).toFixed(2), unit: '亿元' }
    return { value: (total / 1e4).toFixed(2), unit: '万元' }
  }
  if (total >= 1e8) return { value: (total / 1e8).toFixed(2), unit: '亿人次' }
  return { value: (total / 1e4).toFixed(2), unit: '万人次' }
}

/** 图表序列单位：统一按「万元 / 万人次」绘制，避免轴标签出现 250000万 之类的量级 */
export const SERIES_UNIT = {
  fee: { scale: 1e4, unit: '万元' },
  city: { scale: 1e4, unit: '万人次' },
  entry: { scale: 1e4, unit: '万人次' },
  scenic: { scale: 1e4, unit: '万人次' },
  business: { scale: 1e4, unit: '万人次' },
  special: { scale: 1e4, unit: '万人次' }
}

/**
 * 趋势序列：先生成季节权重，再按目标合计归一化，保证各周期合计与口径一致。
 * @param {string} metricKey fee/city/entry/scenic/business/special
 * @param {'year'|'day'|'holiday'} dateType
 */
export function buildTrend(metricKey, dateType = 'year', extra = {}) {
  const metric = METRICS[metricKey]
  const rnd = seeded(`trend-${metricKey}-${dateType}-${extra.area || REGION.district}-${extra.year || ''}`)

  let labels = []
  if (dateType === 'year') {
    labels = recentMonths(12)
  } else if (dateType === 'day') {
    labels = recentDays(30)
  } else {
    labels = ['假日第1天', '假日第2天', '假日第3天', '假日第4天', '假日第5天', '假日第6天', '假日第7天', '假日第8天']
  }

  // 季节权重：假日/日度呈现“中间高峰”，月度呈现“春秋双峰”
  const raw = labels.map((_, i) => {
    const n = labels.length
    let base
    if (dateType === 'holiday') {
      const mid = (n - 1) / 2
      base = 1 - Math.abs(i - mid) / (mid + 1) * 0.55
    } else if (dateType === 'day') {
      base = 0.72 + 0.5 * Math.sin((i / n) * Math.PI * 2 - 1.1)
    } else {
      // 月度：3-5 月、9-11 月为旺季
      base = 0.78 + 0.42 * Math.sin(((i + 1) / 12) * Math.PI * 2 - 1.5)
    }
    return Math.max(0.35, base * (0.9 + rnd() * 0.2))
  })

  const sum = raw.reduce((a, b) => a + b, 0)
  // 假日序列只覆盖全年约 4.2% 的客流；日度序列约覆盖 1 个月的量
  const ratio = dateType === 'holiday' ? 0.042 : dateType === 'day' ? 0.086 : 1
  const target = metric.total * ratio

  const data = raw.map((v) => round((v / sum) * target))

  // 同比序列：围绕目标增速波动
  const compare = data.map((v) => {
    const g = metric.growth + (rnd() - 0.45) * 10
    return { value: v, lastValue: round(v / (1 + g / 100)), growth: round2(g) }
  })

  const total = data.reduce((a, b) => a + b, 0)
  const tb = round2((total / compare.reduce((a, b) => a + b.lastValue, 0) - 1) * 100)
  const disp = displayUnit(metricKey, total)
  const su = SERIES_UNIT[metricKey]

  // 序列值按展示单位换算（万元 / 万人次），轴与 tooltip 保持一致
  const dataDisp = data.map((v) => round2(v / su.scale))
  const lastDisp = compare.map((c) => round2(c.lastValue / su.scale))

  return {
    labels,
    data,
    lastData: compare.map((c) => c.lastValue),
    /** 已换算为展示单位的序列，供图表直接使用 */
    dataDisp,
    lastDataDisp: lastDisp,
    total,
    unit: disp.unit,
    seriesUnit: su.unit,
    seriesScale: su.scale,
    tb,
    summary: {
      time:
        dateType === 'year'
          ? `${extra.year || new Date().getFullYear()}年`
          : dateType === 'day'
            ? '近30天'
            : extra.holidayLabel || '本假期',
      region: extra.area || REGION.district,
      label: metric.name,
      value: disp.value,
      unit: disp.unit,
      tbLabel: '同比',
      tb
    }
  }
}

/** 大数展示：≥1 亿显示亿元/亿，≥1 万显示万 */
export function formatTotal(v, unit) {
  if (unit === '元') {
    if (v >= 1e8) return round2(v / 1e8).toFixed(2)
    if (v >= 1e4) return round2(v / 1e4).toFixed(1)
    return String(v)
  }
  if (v >= 1e8) return round2(v / 1e8).toFixed(2)
  if (v >= 1e4) return round2(v / 1e4).toFixed(2)
  return String(v)
}

/** 指标卡数据：与参考站 statisticsData 字段命名保持一致（含 _unit / _tb 后缀） */
export function buildStatistics(params = {}) {
  // 2026 年国庆节：直接返回假期固化口径（区级总量 + 假日时间范围）
  if (isHoliday2026(params)) return buildHolidayStatistics(params.area || REGION.district)

  const area = params.area || REGION.district
  const scale = area === REGION.district ? 1 : 0.055 // 单个街镇约为全区的 5.5%
  const year = Number(params.year) || new Date().getFullYear()

  // 时间范围文案：当年为进行中（截至上月），往年/未来年份按完整年度展示
  const now = new Date()
  const isCurrentYear = year === now.getFullYear()
  const endMonth = isCurrentYear ? Math.max(1, now.getMonth()) : 12
  const rangeText = `${year}年1月-${endMonth}月`

  const out = {
    year,
    area,
    timeRange: {
      feeRange: rangeText,
      gnRange: rangeText,
      rjRange: rangeText,
      scenicRange: rangeText
    }
  }

  const iconUnits = {
    fee: DISTRICT_INDICATORS.tourismRevenue,
    gn: DISTRICT_INDICATORS.touristTrips,
    rj: DISTRICT_INDICATORS.inboundTrips,
    scenic: DISTRICT_INDICATORS.aLevelScenicTrips
  }
  const growths = {
    fee: DISTRICT_INDICATORS.tourismRevenueGrowth,
    gn: DISTRICT_INDICATORS.touristTripsGrowth,
    rj: 8.6,
    scenic: 9.2
  }
  const units = { fee: '亿元', gn: '万人次', rj: '万人次', scenic: '万人次' }

  /**
   * 区级汇总优先使用真实值：
   *  - 2025 年：统计公报（旅游收入/接待游客）+ 数据平台实测（入境、景区）
   *  - 其他年份：统计公报实测值（historyIndicators）
   * 街镇口径（area !== 松江区）无平台真实数据，仍按比例测算。
   */
  const isDistrict = area === REGION.district
  const real = isDistrict && year === 2025 ? REAL_STATISTICS : null

  const realYear = isDistrict ? historyIndicators.find((h) => h.year === year) : null

  Object.entries(iconUnits).forEach(([key, total]) => {
    let value = total * scale
    let tb = growths[key]

    if (real) {
      if (key === 'fee') {
        value = real.fee
        tb = real.feeTb
      } else if (key === 'gn') {
        value = real.gn
        tb = real.gnTb
      } else if (key === 'rj') {
        value = real.rj
        tb = real.rjTb
      } else if (key === 'scenic') {
        value = real.scenic
        tb = real.scenicTb
      }
    } else if (realYear) {
      if (key === 'fee') value = realYear.tourismRevenue
      else if (key === 'gn') value = realYear.touristTrips
      else if (key === 'scenic' && realYear.year === 2025) value = realYear.aLevelScenicTrips
    }

    out[key] = formatTotal(value, key === 'fee' ? '元' : '人次')
    out[`${key}_unit`] = units[key]
    out[`${key}_tb`] = tb
  })

  // 数据来源标注：区分真实值 / 测算值，供前端展示
  out.granularity = DATA_GRANULARITY
  out.platformTotals = isDistrict ? PLATFORM_TOTALS[year] || null : null

  // 近三年接待游客量 / 旅游收入：直接使用统计公报实测值
  out.history = historyIndicators.map((h) => ({
    year: h.year,
    tourists: h.touristTrips,
    revenue: h.tourismRevenue,
    retail: h.retailTotal
  }))

  // 重点假日实测数据（纳入监测景区点口径）
  out.holidays = holidayStatistics

  return out
}

/**
 * 热门排行：四张表。
 *
 * **数据维度与参考站一致**（参考站该 TAB 展示上海市各区与景区）：
 *   热门消费城市 / 热门旅游城市 / 热门入境城市 → 上海市 16 区，**平台实测真实值**
 *   热门景区 → 松江区 9 个景区点位，**平台实测真实值**
 * 真实数据固化在 `src/mock/rankData.js`。
 */
export function buildHotRank(params = {}) {
  if (isHoliday2026(params)) {
    return {
      fee: [...HOLIDAY_RANK_FEE],
      city: [...HOLIDAY_RANK_CITY],
      entry: [...HOLIDAY_RANK_ENTRY],
      scenic: [...HOLIDAY_RANK_SCENIC]
    }
  }
  return {
    fee: [...RANK_FEE_CITY],
    city: [...RANK_TOURIST_CITY],
    entry: [...RANK_ENTRY_CITY],
    scenic: [...RANK_SCENIC]
  }
}

/**
 * 高频态势：6 项趋势（消费 / 国内旅游 / 入境旅游 / 景区游客 / 商圈游客 / 夜间文旅）。
 * ⚠️ 参考站该 TAB **不是排行榜**，而是 6 张「摘要条 + 折线图」卡片（实测）。
 * 因此这里只返回趋势序列，不再返回突破榜。
 */
export function buildBreakRank(params = {}) {
  const dateType = params.dateType || 'year'

  // 2026 年国庆节：6 项趋势统一走假期 7 天序列
  if (isHoliday2026(params)) {
    return {
      townRank: HOLIDAY_RANK_CITY,
      scenicRank: HOLIDAY_RANK_SCENIC,
      businessRank: HOLIDAY_RANK_BUSINESS,
      trend: {
        fee: buildHolidaySeries('fee'),
        city: buildHolidaySeries('gn'),
        entry: buildHolidaySeries('rj'),
        scenic: buildHolidaySeries('scenic'),
        business: buildHolidaySeries('business'),
        special: buildHolidaySeries('special')
      }
    }
  }

  return {
    townRank: buildTownRank('city'),
    scenicRank: buildScenicRank(),
    businessRank: buildBusinessRank(),
    trend: {
      fee: buildTrend('fee', dateType, params),
      city: buildTrend('city', dateType, params),
      entry: buildTrend('entry', dateType, params),
      scenic: buildTrend('scenic', dateType, params),
      business: buildTrend('business', dateType, params),
      special: buildTrend('special', dateType, params)
    }
  }
}

/** 入境客源地结构 */
export function buildEntrySources() {
  return ENTRY_SOURCES.map((s) => ({
    name: s.name,
    value: round(METRICS.entry.total * s.ratio)
  }))
}

/** 客流时段分布（0-23 时）：用于实时客流、商圈客流 */
export function buildHourlyFlow(seedKey = 'hourly') {
  const rnd = seeded(seedKey)
  return Array.from({ length: 24 }, (_, h) => {
    const base =
      8 + 92 * Math.exp(-Math.pow(h - 14, 2) / 26) + 34 * Math.exp(-Math.pow(h - 19.5, 2) / 8)
    return { hour: `${h}:00`, value: round(base * (0.9 + rnd() * 0.2)) }
  })
}

export { buildTownRank, buildScenicRank, buildBusinessRank, holidays }
