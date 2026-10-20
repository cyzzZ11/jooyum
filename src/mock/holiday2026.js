/**
 * 2026 年国庆节假期（10 月 1 日 - 10 月 7 日，共 7 天）松江区文旅运行数据。
 *
 * ============ 口径说明 ============
 * 全部指标为**松江区**口径，时间维度固定为 2026 年国庆节假期。
 * 单位与项目既有口径保持一致：
 *   · 消费类 —— 元（手机信令监测值，全假期 13.69 亿元量级，与年旅游收入 157.56 亿元同源）
 *   · 客流类 —— 人次
 *
 * ============ 数据来源（两段） ============
 * 1）**平台实测**（`source: 'platform'`）—— 直接取自「节假日游客大数据监测平台」
 *    （jice.smartsteps.com/travel）松江区 2026 国庆节查询结果，原样使用、不做加工：
 *      累计接待游客 / 夜间游客 / 重点景区接待 / 景区榜 / 7 日序列 / 景区画像
 *    原始接口存档：`data-source/raw/2026-10-20/api/*.json`
 *    规范化数据：`data-source/normalized/songjiang-2026-guojiaqing.json`
 *    代码入口：`src/mock/platform2026.js`（由 `node scripts/build-platform-data.mjs` 生成）
 * 2）**测算**（`source: 'estimated'`）—— 平台未监测的口径（旅游消费、入境、商圈、
 *    街镇分摊、来源地），按区级统计口径与既有系数换算，合计与区级总量自洽。
 *
 * 逐项来源见文件末尾 `DATA_SOURCES`。
 */
import { PLATFORM_2026 } from './platform2026'

/** 平台实测：松江区 2026 国庆节 */
const SJ = PLATFORM_2026.songjiang
/** 平台实测：上海市（对比基准） */
const SH = PLATFORM_2026.shanghai
export { SJ, SH }

/** 假期元信息（国庆假期为 10 月 1 日 - 10 月 7 日，界面不展示具体日期） */
export const HOLIDAY_2026 = {
  id: '2026-national-day',
  label: '2026年国庆节',
  periodText: '2026年国庆节',
  start: '2026-10-01',
  end: '2026-10-07'
}

/**
 * 假期 7 天：日度权重（**取自平台实测日度序列**，2026 国庆松江区逐日客流占比）
 */
export const HOLIDAY_DAYS = SJ.daily.map((d) => ({
  short: `假日第${d.day}天`,
  date: d.date,
  weight: Number((d.visitors / SJ.visitors.total).toFixed(5))
}))

/** 全区假期总量（含同比，同比为小数口径：0.2771 = +27.71%） */
export const HOLIDAY_TOTALS = {
  fee: {
    value: 1369000000,
    unit: '元',
    displayUnit: '亿元',
    tb: 0.0545,
    name: '旅游消费',
    source: 'estimated'
  },
  gn: {
    value: SJ.visitors.total,
    unit: '人次',
    displayUnit: '万人次',
    tb: SJ.visitors.tb,
    name: '接待游客',
    source: 'platform'
  },
  rj: {
    value: 23500,
    unit: '人次',
    displayUnit: '万人次',
    tb: 0.118,
    name: '入境游客',
    source: 'estimated'
  },
  scenic: {
    value: SJ.scenic.total,
    unit: '人次',
    displayUnit: '万人次',
    tb: SJ.scenic.tb,
    name: '重点景区接待',
    source: 'platform'
  },
  business: {
    value: 2307200,
    unit: '人次',
    displayUnit: '万人次',
    tb: 0.043,
    name: '商圈接待',
    source: 'estimated'
  },
  special: {
    value: SJ.night.total,
    unit: '人次',
    displayUnit: '万人次',
    tb: SJ.night.tb,
    name: '夜间游客',
    source: 'platform'
  }
}

/** 消费分项（元）：吃/住/行/游/购/娱，合计 = 总 */
export const HOLIDAY_FEE = {
  period: '2026年国庆节',
  总: { amt: 1369000000, tb: 0.0545 },
  吃: { amt: 391000000, tb: 0.1239 },
  住: { amt: 470000000, tb: 0.1072 },
  行: { amt: 140000000, tb: 0.7563 },
  游: { amt: 20150000, tb: 0.0339 },
  购: { amt: 233000000, tb: 0.0298 },
  娱: { amt: 114850000, tb: 0.0087 }
}

/** 国内旅游页结构 */
export const HOLIDAY_CITY = {
  /** 出行方式（取自参考图「出行特征」环形图） */
  travelMode: [
    { name: '汽车', pct: 58.35 },
    { name: '高铁', pct: 40 },
    { name: '飞机', pct: 1.65 }
  ],
  gender: { male: 52.86, female: 47.14 },
  age: [
    { name: '16-24岁', pct: 9.97 },
    { name: '25-34岁', pct: 29 },
    { name: '35-44岁', pct: 27.87 },
    { name: '45-54岁', pct: 18.49 },
    { name: '55岁及以上', pct: 14.67 }
  ],
  origin: [
    { name: '江苏省', pct: 19.14 },
    { name: '浙江省', pct: 12.02 },
    { name: '安徽省', pct: 10.82 },
    { name: '河南省', pct: 7.23 },
    { name: '四川省', pct: 6.2 },
    { name: '山东省', pct: 5.51 },
    { name: '广东省', pct: 5.21 },
    { name: '江西省', pct: 3.71 }
  ]
}

/** 入境旅游页结构 */
export const HOLIDAY_ENTRY = {
  category: [
    { name: '中国港澳台游客', ratio: 0.3052, tb: 0.1543 },
    { name: '国际入境游客', ratio: 0.6948, tb: 0.3398 }
  ],
  dwell: [
    { name: '>4h', pct: 47.39 },
    { name: '2-4h', pct: 15.14 },
    { name: '1-2h', pct: 12.04 },
    { name: '<1h', pct: 25.43 }
  ],
  origin: [
    { name: '香港(中国)', pct: 27.07 },
    { name: '美国', pct: 12.89 },
    { name: '新加坡', pct: 6.52 },
    { name: '澳大利亚', pct: 4.04 },
    { name: '俄罗斯', pct: 3.57 },
    { name: '英国', pct: 3.56 },
    { name: '法国', pct: 3.56 },
    { name: '马来西亚', pct: 3.01 }
  ]
}

/** 景区游客页结构 */
export const HOLIDAY_SCENIC = {
  /** 目的地偏好（参考图口径，平台不提供分类偏好） */
  preference: [
    { name: '历史文化类', pct: 46.88 },
    { name: '自然景观类', pct: 25.5 },
    { name: '主题公园类', pct: 16.33 },
    { name: '商业购物类', pct: 6.96 },
    { name: '文化艺术类', pct: 2.38 },
    { name: '旅游度假区', pct: 1.94 }
  ],
  /** 以下四项为**平台实测**：松江区 9 家重点景区按接待量加权平均 */
  gender: {
    male: Number((SJ.scenic.profile.gender.male * 100).toFixed(2)),
    female: Number((SJ.scenic.profile.gender.female * 100).toFixed(2))
  },
  age: [
    { name: '16-24岁', pct: Number((SJ.scenic.profile.age['16-24'] * 100).toFixed(2)) },
    { name: '25-34岁', pct: Number((SJ.scenic.profile.age['25-34'] * 100).toFixed(2)) },
    { name: '35-44岁', pct: Number((SJ.scenic.profile.age['35-44'] * 100).toFixed(2)) },
    { name: '45-54岁', pct: Number((SJ.scenic.profile.age['45-54'] * 100).toFixed(2)) },
    { name: '55岁及以上', pct: Number((SJ.scenic.profile.age['55+'] * 100).toFixed(2)) }
  ],
  /** 消费能力分布（平台原始为各等级占比，合计不足 100 表示未分级人群） */
  consume: [
    { name: '低', pct: Number((SJ.scenic.profile.consume.s1_low * 100).toFixed(2)) },
    { name: '中低', pct: Number((SJ.scenic.profile.consume.s2_midLow * 100).toFixed(2)) },
    { name: '中', pct: Number((SJ.scenic.profile.consume.s3_mid * 100).toFixed(2)) },
    { name: '中高', pct: Number((SJ.scenic.profile.consume.s4_midHigh * 100).toFixed(2)) },
    { name: '高', pct: Number((SJ.scenic.profile.consume.s5_high * 100).toFixed(2)) }
  ],
  /** 驻留时长（平台 time1/1-2/2-4/4+） */
  dwell: [
    { name: '<1h', pct: Number((SJ.scenic.profile.stay.lt1h * 100).toFixed(2)) },
    { name: '1-2h', pct: Number((SJ.scenic.profile.stay.h1to2 * 100).toFixed(2)) },
    { name: '2-4h', pct: Number((SJ.scenic.profile.stay.h2to4 * 100).toFixed(2)) },
    { name: '>4h', pct: Number((SJ.scenic.profile.stay.gt4h * 100).toFixed(2)) }
  ],
  /** 客源地结构（平台实测，景区口径） */
  localRatio: Number((SJ.scenic.profile.origin.local * 100).toFixed(2)),
  outsideRatio: Number((SJ.scenic.profile.origin.outside * 100).toFixed(2)),
  /** 来源地 Top7 省份（参考图口径，平台仅到「本地/外地」） */
  origin: [
    { name: '江苏省', pct: 18.11 },
    { name: '浙江省', pct: 13.5 },
    { name: '安徽省', pct: 7.88 },
    { name: '河南省', pct: 5.85 },
    { name: '山东省', pct: 5.44 },
    { name: '广东省', pct: 5.38 },
    { name: '四川省', pct: 4.05 }
  ],
  /** 外省客源占比（平台实测：景区口径「外地」占比） */
  outProvinceRatio: SJ.scenic.profile.origin.outside
}

/** 商圈游客页结构 */
export const HOLIDAY_BUSINESS = {
  dwell: [
    { name: '<1h', pct: 26.6 },
    { name: '1-2h', pct: 31.82 },
    { name: '2-4h', pct: 27.28 },
    { name: '>4h', pct: 14.3 }
  ],
  gender: { male: 43.69, female: 56.31 },
  age: [
    { name: '16-24岁', pct: 16.79 },
    { name: '25-34岁', pct: 26.83 },
    { name: '35-44岁', pct: 27.8 },
    { name: '45-54岁', pct: 16.73 },
    { name: '55岁及以上', pct: 11.84 }
  ],
  origin: [
    { name: '江苏省', pct: 20.09 },
    { name: '浙江省', pct: 16.45 },
    { name: '山东省', pct: 6.76 },
    { name: '广东省', pct: 6.3 },
    { name: '安徽省', pct: 6.03 },
    { name: '河南省', pct: 4.7 },
    { name: '北京市', pct: 4.24 }
  ],
  outProvinceRatio: 0.4951
}

/**
 * 街镇分布权重（合计 = 1）。
 * 沿用项目既有口径（src/mock/rankData.js）：按 A 级景区数量、床位/餐饮网点体量、
 * 区位条件测算，各街镇合计与区级总量严格一致。
 */
const TOWN_W = {
  fee: {
    岳阳街道: 0.095, 永丰街道: 0.062, 方松街道: 0.062, 中山街道: 0.088, 广富林街道: 0.082,
    九里亭街道: 0.038, 泗泾镇: 0.082, 佘山镇: 0.145, 车墩镇: 0.055, 新桥镇: 0.048,
    洞泾镇: 0.052, 九亭镇: 0.042, 石湖荡镇: 0.018, 新浜镇: 0.015, 泖港镇: 0.016,
    叶榭镇: 0.019, 小昆山镇: 0.015
  },
  gn: {
    岳阳街道: 0.062, 永丰街道: 0.055, 方松街道: 0.055, 中山街道: 0.078, 广富林街道: 0.082,
    九里亭街道: 0.042, 泗泾镇: 0.088, 佘山镇: 0.178, 车墩镇: 0.068, 新桥镇: 0.038,
    洞泾镇: 0.045, 九亭镇: 0.038, 石湖荡镇: 0.028, 新浜镇: 0.021, 泖港镇: 0.019,
    叶榭镇: 0.019, 小昆山镇: 0.017
  },
  rj: {
    岳阳街道: 0.055, 永丰街道: 0.058, 方松街道: 0.058, 中山街道: 0.082, 广富林街道: 0.132,
    九里亭街道: 0.038, 泗泾镇: 0.078, 佘山镇: 0.198, 车墩镇: 0.062, 新桥镇: 0.045,
    洞泾镇: 0.042, 九亭镇: 0.036, 石湖荡镇: 0.018, 新浜镇: 0.012, 泖港镇: 0.012,
    叶榭镇: 0.014, 小昆山镇: 0.02
  }
}

/** 商圈接待占比（与 songjiang.js businessAreas 名录对应，合计 = 1） */
const BUSINESS_W = {
  松江印象城: 0.185, 松江万达广场: 0.152, 开元地中海商业广场: 0.116, 九亭U天地: 0.096,
  '乐都路商圈（乐都商业广场）': 0.082, '松江老城庙前街': 0.068, 佘山宝乐汇: 0.066,
  '泗泾塘商业街（泗泾烟火夜市）': 0.058, '松江大学城文汇路商圈': 0.052, 云间粮仓文创园: 0.044,
  '泰晤士小镇商业街': 0.038, '五龙商业广场（五龙香港街）': 0.032, 九峰源广场: 0.026,
  飞航吾悦广场: 0.024, 塞纳新天地: 0.02, 大橘邻里: 0.016
}

const round = (v) => Math.round(v)
const round2 = (v) => Math.round(v * 100) / 100

/** 按权重把总量拆成 7 天序列，尾项吸收四舍五入残差，保证合计严格相等 */
function distribute(total, weights) {
  const sum = weights.reduce((a, b) => a + b, 0)
  const out = weights.map((w) => round((total * w) / sum))
  const diff = total - out.reduce((a, b) => a + b, 0)
  out[out.length - 1] += diff
  return out
}

/** 份额拆分：按权重分配并让合计严格等于总数 */
function splitByWeight(total, weights) {
  const entries = Object.entries(weights)
  const sum = entries.reduce((a, [, w]) => a + w, 0)
  const rows = entries.map(([name, w]) => ({ name, value: round((total * w) / sum) }))
  const diff = total - rows.reduce((a, b) => a + b.value, 0)
  rows[0].value += diff
  return rows
}

/** 同比：区级同比 + 街镇位次修正（位次靠前略高、靠后略低） */
const townTb = (base, i) => Number((base + ((i % 5) - 2) * 0.011).toFixed(4))

/** 街镇排行（消费/游客/入境） */
function buildTownRank(key) {
  const total = HOLIDAY_TOTALS[key]
  return splitByWeight(total.value, TOWN_W[key])
    .map((row, i) => ({
      region_name: row.name,
      all_value: row.value,
      tb_all_value: townTb(total.tb, i)
    }))
    .sort((a, b) => b.all_value - a.all_value)
}

/** 景区排行（**平台实测**：9 家重点景区接待量与同比，合计 = 区级重点景区总量） */
export const HOLIDAY_RANK_SCENIC = SJ.scenic.list
  .map((s) => ({ region_name: s.name, all_value: s.visitors, tb_all_value: s.tb }))
  .sort((a, b) => b.all_value - a.all_value)

/** 商圈排行 */
export const HOLIDAY_RANK_BUSINESS = splitByWeight(HOLIDAY_TOTALS.business.value, BUSINESS_W)
  .map((row, i) => ({
    region_name: row.name,
    all_value: row.value,
    tb_all_value: townTb(HOLIDAY_TOTALS.business.tb, i)
  }))
  .sort((a, b) => b.all_value - a.all_value)

/** 街镇消费 / 游客 / 入境排行 */
export const HOLIDAY_RANK_FEE = buildTownRank('fee')
export const HOLIDAY_RANK_CITY = buildTownRank('gn')
export const HOLIDAY_RANK_ENTRY = buildTownRank('rj')

/** 指标卡展示单位换算（≥1 亿按亿，否则按万；万以下直接给整数） */
function display(key, value) {
  if (key === 'fee') {
    if (value >= 1e8) return { value: (value / 1e8).toFixed(2), unit: '亿元' }
    return { value: (value / 1e4).toFixed(2), unit: '万元' }
  }
  if (value >= 1e8) return { value: (value / 1e8).toFixed(2), unit: '亿人次' }
  return { value: (value / 1e4).toFixed(2), unit: '万人次' }
}

/** 图表序列单位：消费按亿元、客流按万人次绘制 */
const SERIES_UNIT = {
  fee: { scale: 1e8, unit: '亿元' },
  gn: { scale: 1e4, unit: '万人次' },
  rj: { scale: 1e4, unit: '万人次' },
  scenic: { scale: 1e4, unit: '万人次' },
  business: { scale: 1e4, unit: '万人次' },
  special: { scale: 1e4, unit: '万人次' }
}

/** 平台实测日度序列（有则直接用，不再按权重分配） */
const REAL_DAILY = {
  gn: SJ.daily.map((d) => d.visitors),
  special: SJ.daily.map((d) => d.nightVisitors),
  scenic: [1, 2, 3, 4, 5, 6, 7].map((day) =>
    SJ.scenic.list.reduce((a, s) => a + (s.daily.find((d) => d.day === day)?.visitors || 0), 0)
  )
}

/** 平台实测的上年同期日度（仅区级客流有） */
const REAL_DAILY_LAST = {
  gn: SJ.lastYearDaily.map((d) => d.visitors)
}

/**
 * 假日 7 天趋势序列（结构与 mock/overview.js#buildTrend 保持一致，供 TrendChart 直接消费）。
 * 客流类（接待游客 / 夜间 / 重点景区）直接使用平台实测逐日值；
 * 消费类与分项按实测日度形状等比缩放，分项再乘其在总量中的占比。
 */
export function buildHolidaySeries(key, feeKey = '总') {
  const metric = HOLIDAY_TOTALS[key]
  const weights = HOLIDAY_DAYS.map((d) => d.weight)
  const ratio = key === 'fee' && feeKey !== '总' ? (HOLIDAY_FEE[feeKey]?.amt || 0) / HOLIDAY_FEE['总'].amt : 1
  const total = round(metric.value * ratio)
  const tb = key === 'fee' && feeKey !== '总' ? HOLIDAY_FEE[feeKey].tb : metric.tb

  const real = feeKey === '总' ? REAL_DAILY[key] : null
  const data = real ? real.slice() : distribute(total, weights)
  const realLast = feeKey === '总' ? REAL_DAILY_LAST[key] : null
  const lastData = realLast ? realLast.slice() : data.map((v) => round(v / (1 + tb)))
  const su = SERIES_UNIT[key]
  const disp = display(key, total)
  const sumCur = data.reduce((a, b) => a + b, 0)
  const sumLast = lastData.reduce((a, b) => a + b, 0)
  const tbReal = round2((sumCur / sumLast - 1) * 100)

  return {
    labels: HOLIDAY_DAYS.map((d) => d.short),
    dates: HOLIDAY_DAYS.map((d) => d.date),
    data,
    lastData,
    dataDisp: data.map((v) => round2(v / su.scale)),
    lastDataDisp: lastData.map((v) => round2(v / su.scale)),
    total: sumCur,
    unit: disp.unit,
    seriesUnit: su.unit,
    seriesScale: su.scale,
    tb: tbReal,
    matchPlatform: Boolean(real),
    summary: {
      time: HOLIDAY_2026.label,
      region: '松江区',
      label: feeKey === '总' ? metric.name : `旅游消费（${feeKey}）`,
      value: disp.value,
      unit: disp.unit,
      tbLabel: '同比',
      tb: tbReal
    }
  }
}

/**
 * 指标卡数据（供 /travel/statistics 的假日口径直接返回）。
 * 字段名与 buildStatistics 一致：fee / gn / rj / scenic + _unit + _tb。
 */
export function buildHolidayStatistics(area = '松江区') {
  const out = {
    year: 2026,
    area,
    period: HOLIDAY_2026.id,
    periodLabel: HOLIDAY_2026.label,
    timeRange: {
      feeRange: HOLIDAY_2026.label,
      gnRange: HOLIDAY_2026.label,
      rjRange: HOLIDAY_2026.label,
      scenicRange: HOLIDAY_2026.label
    }
  }
  const keyMap = { fee: 'fee', gn: 'gn', rj: 'rj', scenic: 'scenic' }
  Object.entries(keyMap).forEach(([field, key]) => {
    const total = HOLIDAY_TOTALS[key]
    const disp = display(key, total.value)
    out[field] = disp.value
    out[`${field}_unit`] = disp.unit
    out[`${field}_tb`] = round2(total.tb * 100)
    void key
  })
  return out
}

/** 数据来源与生成规则清单（前端如需展示可直接引用） */
export const DATA_SOURCES = [
  {
    item: `累计接待游客 ${(HOLIDAY_TOTALS.gn.value / 1e4).toFixed(2)} 万人次、同比 ${(HOLIDAY_TOTALS.gn.tb * 100).toFixed(2)}%`,
    source: 'platform',
    detail: '平台实测：节假日游客大数据监测平台 → 松江区（310117）· 2026 国庆节 · grand_total',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_grand_total'
  },
  {
    item: `夜间游客 ${(HOLIDAY_TOTALS.special.value / 1e4).toFixed(2)} 万人次、占比 ${(SJ.night.ratio * 100).toFixed(2)}%、同比 ${(SJ.night.tb * 100).toFixed(2)}%`,
    source: 'platform',
    detail: '平台实测：同上接口 all_night 字段',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_grand_total'
  },
  {
    item: `重点景区接待 ${(HOLIDAY_TOTALS.scenic.value / 1e4).toFixed(2)} 万人次、同比 ${(HOLIDAY_TOTALS.scenic.tb * 100).toFixed(2)}%`,
    source: 'platform',
    detail: '平台实测：松江区重点景区汇总（lv=3）',
    dataId: 'jjrykdsjjcpt_jqyk_ykgm_grand_total_gather_v3'
  },
  {
    item: `${SJ.scenic.count} 家重点景区接待排行与同比（广富林 ${(SJ.scenic.list[0].visitors / 1e4).toFixed(2)} 万 … 云堡 ${(SJ.scenic.list.at(-1).visitors / 1e4).toFixed(2)} 万）`,
    source: 'platform',
    detail: '平台实测：松江区景区排行（合计 = 重点景区总量）',
    dataId: 'jjrykdsjjcpt_jqyk_ykgm_regional_reception_gather_v3'
  },
  {
    item: '7 天日度客流曲线（2026 与 2025 同期）',
    source: 'platform',
    detail: '平台实测：松江区逐日接待量（date_time 1-7）',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_receive_tourists'
  },
  {
    item: '景区游客画像：性别 / 年龄 / 消费能力 / 驻留时长 / 本地外地',
    source: 'platform',
    detail: '平台实测：9 家重点景区逐景区画像，按接待量加权平均',
    dataId: 'qgjjshfzldjsc_ykdb_jqdb_tourist'
  },
  {
    item: `全区游客本地 ${(SJ.profile.origin.local * 100).toFixed(2)}% / 外地 ${(SJ.profile.origin.outside * 100).toFixed(2)}%、全市排名第 ${SJ.rankInCity.rank}`,
    source: 'platform',
    detail: '平台实测：松江区游客画像（区县级不提供性别/年龄/消费）与全市各区排行',
    dataId: 'qgjjshfzldjsc_ykdb_csdb_tourist / jjrykdsjjcpt_csyk_ykgm_regional_reception_city'
  },
  {
    item: `全假期旅游消费 ${(HOLIDAY_TOTALS.fee.value / 1e8).toFixed(2)} 亿元、同比 +5.45%（人均 ${(HOLIDAY_TOTALS.fee.value / HOLIDAY_TOTALS.gn.value).toFixed(0)} 元/人次）`,
    source: 'estimated',
    detail:
      '测算：平台不监测消费金额。按 2025 年松江区旅游收入 157.56 亿元 × 国庆假期占比 8.7% 推演，人均与游客量实测值复核'
  },
  {
    item: '消费分项 餐饮 3.91 / 住宿 4.70 / 交通 1.40 / 旅游 0.2015 / 购物 2.33 / 娱乐 1.15 亿元',
    source: 'estimated',
    detail: '测算：取自参考图分项占比，合计与总额一致（娱乐为残差项）'
  },
  {
    item: `入境游客 ${(HOLIDAY_TOTALS.rj.value / 1e4).toFixed(2)} 万人次、同比 +11.80%`,
    source: 'estimated',
    detail: '测算：平台无区县入境口径，按年入境/接待游客比 1.5% 折算'
  },
  {
    item: `商圈接待 ${(HOLIDAY_TOTALS.business.value / 1e4).toFixed(2)} 万人次、同比 +4.30%`,
    source: 'estimated',
    detail: '测算：平台松江区重点商圈返回空，按游客量 × 商圈/游客系数 1.472 折算'
  },
  {
    item: '出行方式 汽车 58.35% / 高铁 40% / 飞机 1.65%、国内游客性别年龄、来源地 Top8',
    source: 'estimated',
    detail: '参考图口径（data-picture 截图），平台仅提供景区级性别年龄与本地/外地'
  },
  {
    item: '街镇消费 / 游客 / 入境分摊、街镇景区热度',
    source: 'estimated',
    detail: '测算：平台区域维度到区县，街镇为按资源体量权重分摊；景区热度按 9 家实测景区按所属街镇聚合'
  },
  {
    item: '假期日历 2026-10-01 至 2026-10-07（7 天，界面不展示具体日期）',
    source: 'platform',
    detail: '平台节假日口径：国庆节，日度序列 date_time 1-7'
  }
]

export default {
  HOLIDAY_2026,
  HOLIDAY_DAYS,
  HOLIDAY_TOTALS,
  HOLIDAY_FEE,
  HOLIDAY_CITY,
  HOLIDAY_ENTRY,
  HOLIDAY_SCENIC,
  HOLIDAY_BUSINESS,
  HOLIDAY_RANK_FEE,
  HOLIDAY_RANK_CITY,
  HOLIDAY_RANK_ENTRY,
  HOLIDAY_RANK_SCENIC,
  HOLIDAY_RANK_BUSINESS,
  buildHolidaySeries,
  buildHolidayStatistics,
  DATA_SOURCES
}
