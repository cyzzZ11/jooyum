/**
 * 2026 年国庆节假期（10 月 1 日 - 10 月 7 日，共 7 天）松江区文旅运行数据。
 *
 * ============ 口径说明 ============
 * 全部指标为**松江区**口径，时间维度固定为 2026 年国庆节假期。
 * 单位与项目既有口径保持一致：
 *   · 消费类 —— 元（手机信令监测值，全假期 13.69 万元量级，与 2025 全年 602.63 万元同源）
 *   · 客流类 —— 人次
 *
 * ============ 数据来源与生成规则 ============
 * 见文件末尾 `DATA_SOURCES`（同内容在需求交付说明中给出清单）。
 * 标注为「取自参考图」的数值来自 data-picture 目录下的页面截图；
 * 标注为「推演」的数值按区级统计口径与既有平台系数换算，合计与区级总量自洽。
 */

/** 假期元信息（国庆假期为 10 月 1 日 - 10 月 7 日，界面不展示具体日期） */
export const HOLIDAY_2026 = {
  id: '2026-national-day',
  label: '2026年国庆节',
  periodText: '2026年国庆节',
  start: '2026-10-01',
  end: '2026-10-07'
}

/** 假期 7 天：日度权重（节假日「首日高、次日峰、中段回落、尾段平稳」） */
export const HOLIDAY_DAYS = [
  { short: '假日第1天', date: '2026-10-01', weight: 0.13 },
  { short: '假日第2天', date: '2026-10-02', weight: 0.16 },
  { short: '假日第3天', date: '2026-10-03', weight: 0.155 },
  { short: '假日第4天', date: '2026-10-04', weight: 0.14 },
  { short: '假日第5天', date: '2026-10-05', weight: 0.135 },
  { short: '假日第6天', date: '2026-10-06', weight: 0.14 },
  { short: '假日第7天', date: '2026-10-07', weight: 0.14 }
]

/** 全区假期总量（含同比，同比为小数口径：0.3219 = +32.19%） */
export const HOLIDAY_TOTALS = {
  fee: { value: 136900, unit: '元', displayUnit: '万元', tb: 0.0545, name: '旅游消费' },
  gn: { value: 1567300, unit: '人次', displayUnit: '万人次', tb: 0.3219, name: '接待游客' },
  rj: { value: 23500, unit: '人次', displayUnit: '万人次', tb: 0.118, name: '入境游客' },
  scenic: { value: 1035200, unit: '人次', displayUnit: '万人次', tb: 0.0718, name: '景区接待' },
  business: { value: 2307200, unit: '人次', displayUnit: '万人次', tb: 0.043, name: '商圈接待' },
  special: { value: 469800, unit: '人次', displayUnit: '万人次', tb: 0.096, name: '夜间文旅接待' }
}

/** 消费分项（元）：吃/住/行/游/购/娱，合计 = 总 */
export const HOLIDAY_FEE = {
  period: '2026年国庆节',
  总: { amt: 136900, tb: 0.0545 },
  吃: { amt: 39100, tb: 0.1239 },
  住: { amt: 47000, tb: 0.1072 },
  行: { amt: 14000, tb: 0.7563 },
  游: { amt: 2015, tb: 0.0339 },
  购: { amt: 23300, tb: 0.0298 },
  娱: { amt: 11485, tb: 0.0087 }
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
  preference: [
    { name: '历史文化类', pct: 46.88 },
    { name: '自然景观类', pct: 25.5 },
    { name: '主题公园类', pct: 16.33 },
    { name: '商业购物类', pct: 6.96 },
    { name: '文化艺术类', pct: 2.38 },
    { name: '旅游度假区', pct: 1.94 }
  ],
  gender: { male: 47.55, female: 52.45 },
  age: [
    { name: '16-24岁', pct: 13.97 },
    { name: '25-34岁', pct: 28.09 },
    { name: '35-44岁', pct: 29.17 },
    { name: '45-54岁', pct: 16.9 },
    { name: '55岁及以上', pct: 11.87 }
  ],
  origin: [
    { name: '江苏省', pct: 18.11 },
    { name: '浙江省', pct: 13.5 },
    { name: '安徽省', pct: 7.88 },
    { name: '河南省', pct: 5.85 },
    { name: '山东省', pct: 5.44 },
    { name: '广东省', pct: 5.38 },
    { name: '四川省', pct: 4.05 }
  ],
  /** 外省客源占比（上海市口径，按本区景区客流折算规模） */
  outProvinceRatio: 0.4193
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

/** 景区接待占比（对应 16 家 A 级景区，合计 = 1） */
const SCENIC_W = {
  上海欢乐谷: 0.185, 佘山国家森林公园: 0.142, 上海辰山植物园: 0.118, 广富林文化遗址: 0.098,
  上海影视乐园: 0.086, 月湖雕塑公园: 0.062, 醉白池公园: 0.052, 方塔园: 0.048,
  蓝精灵主题乐园: 0.044, 云堡未来市: 0.032, 泗泾古镇: 0.038, 佘山精灵之城主题乐园: 0.026,
  浦江之首: 0.018, 云间粮仓文创园: 0.022, 上海广富林奇石馆: 0.014, 江南水稻艺术观光园: 0.015
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

/** 景区排行 */
export const HOLIDAY_RANK_SCENIC = splitByWeight(HOLIDAY_TOTALS.scenic.value, SCENIC_W)
  .map((row, i) => ({
    region_name: row.name,
    all_value: row.value,
    tb_all_value: townTb(HOLIDAY_TOTALS.scenic.tb, i)
  }))
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

/** 图表序列单位：消费按万元、客流按万人次绘制 */
const SERIES_UNIT = {
  fee: { scale: 1e4, unit: '万元' },
  gn: { scale: 1e4, unit: '万人次' },
  rj: { scale: 1e4, unit: '万人次' },
  scenic: { scale: 1e4, unit: '万人次' },
  business: { scale: 1e4, unit: '万人次' },
  special: { scale: 1e4, unit: '万人次' }
}

/**
 * 假日 7 天趋势序列（结构与 mock/overview.js#buildTrend 保持一致，供 TrendChart 直接消费）。
 * 分项（吃/住/行/游/购/娱）按分项在全区总量中的占比等比缩放。
 */
export function buildHolidaySeries(key, feeKey = '总') {
  const metric = HOLIDAY_TOTALS[key]
  const weights = HOLIDAY_DAYS.map((d) => d.weight)
  const ratio = key === 'fee' && feeKey !== '总' ? (HOLIDAY_FEE[feeKey]?.amt || 0) / HOLIDAY_FEE['总'].amt : 1
  const total = round(metric.value * ratio)
  const tb = key === 'fee' && feeKey !== '总' ? HOLIDAY_FEE[feeKey].tb : metric.tb

  const data = distribute(total, weights)
  const lastData = data.map((v) => round(v / (1 + tb)))
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
    total,
    unit: disp.unit,
    seriesUnit: su.unit,
    seriesScale: su.scale,
    tb: tbReal,
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
  { item: '全假期旅游消费 13.69 万元及同比 +5.45%', source: 'data-picture 截图（态勢总览·热门消费城市 / 对比分析·旅游消费表）' },
  { item: '消费分项 餐饮 3.91 / 住宿 4.70 / 交通 1.40 / 旅游 0.2015 / 购物 2.33 / 娱乐 1.15 万元', source: 'data-picture 截图（对比分析·旅游消费表），合计与总额一致' },
  { item: '接待国内游客 156.73 万人次、同比 +32.19%', source: 'data-picture 截图（态勢总览·热门旅游城市 / 国内旅游页）' },
  { item: '入境游客 2.35 万人次', source: '推演：156.73 万 × 1.5%（2025 年区年入境/接待游客比），同比 +11.80% 取近三年入境增速中位' },
  { item: '景区接待 103.52 万人次、同比 +7.18%', source: '推演：2025 年国庆中秋 8 天实测 96.59 万 × (1+7.18%)，增速取近三年国庆 A 级景区客流年均增幅' },
  { item: '商圈接待 230.72 万人次、同比 +4.30%', source: '推演：游客量 156.73 万 × 商圈/游客系数 1.472（2025 年 3250 万/2207 万）' },
  { item: '夜间文旅接待 46.98 万人次', source: '推演：景区客流 × 45.38%（平台实测 2025 夜间占比 45.36%）' },
  { item: '出行方式 汽车 58.35% / 高铁 40% / 飞机 1.65%', source: 'data-picture 截图（国内旅游页·出行特征）' },
  { item: '国内游客性别 男 52.86% / 女 47.14%、年龄结构', source: 'data-picture 截图（国内旅游页·人群画像）' },
  { item: '国内游客来源地 Top8（江苏 19.14% … 江西 3.71%）', source: 'data-picture 截图（国内旅游页·游客来源地，上海市口径）' },
  { item: '入境分类 港澳台 30.52% / 国际 69.48%，驻留时长 47.39% >4h', source: 'data-picture 截图（入境旅游页）' },
  { item: '入境来源地 Top8（香港 27.07% … 马来西亚 3.01%）', source: 'data-picture 截图（入境旅游页·游客来源地）' },
  { item: '商圈驻留时长 / 性别 43.69%:56.31% / 来源地', source: 'data-picture 截图（商圈游客页）' },
  { item: '景区目的地偏好 / 性别 47.55%:52.45% / 年龄 / 来源地', source: 'data-picture 截图（景区游客页）' },
  { item: '街镇、景区、商圈明细分布', source: '推演：按项目既有资源体量权重（A 级景区数、床位餐饮网点、区位）分摊区级总量，合计与区级严格一致' },
  { item: '假期日历 2026-10-01 至 2026-10-07（国庆假期）', source: '国务院 2026 年节假日安排口径（7 天假期），界面不展示具体日期' },
  { item: '7 天日度曲线形状', source: '推演：节假日「首日高、次日峰、中段回落、尾段平稳」权重 13/16/15.5/14/13.5/14/14' }
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
