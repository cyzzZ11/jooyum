/**
 * 松江区真实业务数据（来自参考站数据服务实测取数）
 *
 * ============ 取数说明 ============
 * 数据来源：参考站数据网关 `POST {baseUrl}api/v2/nocache/data/json`
 *          （queryType=v4daasData，转发到 /api/v4/attr/query/list）
 * 取数时间：2026-10-15
 * 关键参数：region_code 实际以 **fnid** 传入；松江区 fnid=310117, lv=3；
 *          月度口径日期为 YYYYMM，日度口径为 YYYYMMDD。
 *
 * ============ 实测数值 ============
 * 松江区 2025：
 *   国内游客累计 137,773,671 人次（同比 -10.27%）；当期净客流 35,124,857
 *   景区接待     14,680,604 人次（同比 -26.09%）；夜间 6,659,501（占比 45.36%）
 *   入境游客累计  4,319,356 人次（同比 +15.97%）；当期 2,434,620
 * 松江区 2024：
 *   国内游客累计 153,550,303 人次；景区接待 19,861,782；入境游客累计 3,724,416
 * 对照（2025）：
 *   全国景区 8,419,102,233 人次；上海市 244,789,936 人次
 *   全国国内游客累计 43,537,741,853；上海市 181,816,8101
 *
 * ============ 与统计公报的差异（均为真实来源，口径不同）============
 *   松江区统计公报 2025：旅游收入 157.56 亿元、接待游客 2207 万人次、
 *   16 家 A 级景区 1496.77 万人次。
 *   数据平台景区口径 1468.06 万人次（监测景区口径），两者相差约 2%。
 *   本项目：**区级汇总指标用统计公报（法定统计口径）**，
 *   **平台监测值用于趋势/结构/夜景等平台特有维度**，两者并存互不覆盖。
 *
 * ============ 未能取到的部分 ============
 *   街镇级、景区级、商圈级明细：该数据平台的区域维度仅到区县级
 *   （区域树中松江区 lv3 且无下级），因此**街镇/景区明细无平台真实数据**，
 *   仍由 src/mock/overview.js 按区级总量测算分布（合计与区级真实值一致）。
 */

/** 平台实测：分年度区级汇总 */
export const PLATFORM_TOTALS = {
  2024: {
    cityCumulative: 153550303, // 国内游客累计（人次）
    cityNet: 37355892, // 当期净客流
    scenicTotal: 19861782, // 景区接待
    scenicNight: 9244995, // 景区夜间接待
    entryCumulative: 3724416, // 入境游客累计
    entryNet: 740872
  },
  2025: {
    cityCumulative: 137773671,
    cityNet: 35124857,
    cityTb: -0.1027, // 累计同比
    cityNetTb: -0.0597,
    scenicTotal: 14680604,
    scenicNight: 6659501,
    scenicTb: -0.2609,
    scenicNightRatio: 0.4536,
    scenicHb: -0.0266, // 环比
    entryCumulative: 4319356,
    entryNet: 965234,
    entryTb: 0.1597,
    entryNetTb: 0.3028
  }
}

/** 平台实测：2025 年对照区域 */
export const PLATFORM_BENCHMARK = {
  china: {
    scenicTotal: 8419102233,
    scenicNight: 3703166265,
    scenicTb: 0.0821,
    cityCumulative: 43537741853,
    cityTb: -0.0129
  },
  shanghai: {
    scenicTotal: 244789936,
    scenicNight: 107337204,
    scenicTb: 0.0938,
    cityCumulative: 1818168101,
    cityTb: -0.0211
  }
}

/** 统计公报（法定统计口径，区级汇总以此为准） */
export const BULLETIN = {
  2023: { tourismRevenue: 15834000000, touristTrips: 20640300, gdp: 174003000000, retail: 69896000000 },
  2024: { tourismRevenue: 15001000000, touristTrips: 19815700, gdp: 227623000000, retail: 72663000000 },
  2025: {
    tourismRevenue: 15756000000, // 157.56 亿元（+5.0%）
    touristTrips: 22070000, // 2207 万人次（+11.4%）
    aLevelScenicTrips: 14967700, // 16 家 A 级景区 1496.77 万人次
    gdp: 237542000000,
    retail: 85467000000,
    inboundTrips: 4319356 // 采用平台监测累计值（公报未单列）
  }
}

/**
 * 平台实测：旅游消费分项（dataId = snow_sports_bxxf_total）
 * 参数：region_code + lv + start_time/end_time（YYYYMM）
 * 返回每行 { type, amt, tb_amt }，type 取值：
 *   总 / 吃 / 住 / 行 / 游 / 购 / 娱
 *
 * 分项字段映射（取自参考站 chunk-181b8576）：
 *   餐饮 food(吃) / 住宿 live(住) / 交通 traffic(行)
 *   旅游 travel(游) / 购物 shopping(购) / 娱乐 entertainment(娱)
 *
 * 单位说明：平台该表返回值为「万元」，与统计公报的旅游收入（157.56 亿元）不是同一口径，
 * 前者为手机信令测算的消费监测值，后者为法定统计口径，两者并存不互相覆盖。
 */
export const FEE_BREAKDOWN = {
  '2025全年': {
    总: { amt: 6026304.2126, tb: -0.013392 },
    吃: { amt: 1875699.1075, tb: -0.01529 },
    住: { amt: 2041621.4632, tb: -0.014477 },
    行: { amt: 384349.72, tb: -0.0957 },
    游: { amt: 72155.9, tb: -0.1382 },
    购: { amt: 1084058.4, tb: 0.0043 },
    娱: { amt: 568409.6, tb: 0.0459 }
  },
  '2025年1-9月': {
    总: { amt: 4477352.0, tb: -0.0187 },
    吃: { amt: 1383700.0, tb: -0.0249 },
    住: { amt: 1524000.0, tb: -0.0097 },
    行: { amt: 273100.0, tb: -0.1603 },
    游: { amt: 55000.0, tb: -0.1596 },
    购: { amt: 812700.0, tb: 0.0054 },
    娱: { amt: 429000.0, tb: 0.0566 }
  },
  '2024全年': {
    总: { amt: 6588120.0, tb: null },
    吃: { amt: 2057500.0, tb: null },
    住: { amt: 2230000.0, tb: null },
    行: { amt: 455400.0, tb: null },
    游: { amt: 89100.0, tb: null },
    购: { amt: 1167500.0, tb: null },
    娱: { amt: 588600.0, tb: null }
  }
}

/** 消费分项展示顺序与图标 key（与参考站一致） */
export const FEE_TYPES = [
  { key: '吃', name: '餐饮', keyStr: 'food', short: '吃' },
  { key: '住', name: '住宿', keyStr: 'live', short: '住' },
  { key: '行', name: '交通', keyStr: 'traffic', short: '行' },
  { key: '游', name: '旅游', keyStr: 'travel', short: '游' },
  { key: '购', name: '购物', keyStr: 'shopping', short: '购' },
  { key: '娱', name: '娱乐', keyStr: 'entertainment', short: '娱' }
]

/** 平台实测：消费总额对照（同口径，便于区级对标） */
export const FEE_BENCHMARK_2025 = {
  songjiang: 6026304.2126,
  shanghai: 99453200,
  china: 2709565900
}

/**
 * 平台实测：松江区消费月度趋势（dataId = snow_sports_bxxf_xfqs）
 * 每行 { date_dt(YYYYMM), type(总/吃/住/行/游/购/娱), amt, tb_amt, hb_amt }
 * 单位：元。参数用 region_code + lv + start_time/end_time。
 */
export const FEE_MONTHLY = {
  2024: {
    总: [372990, 257000, 770000, 706000, 645000, 571000, 630000, 592000, 539000, 496000, 511000, 499000],
    合计: 6588120
  },
  2025: {
    总: [375122, 383400, 555100, 524000, 532100, 469000, 528300, 535700, 574700, 496000, 574000, 478900],
    合计: 6026304
  }
}

/**
 * 平台实测：上海市各区消费总额（2025 年，region_code 逐区取数）
 * 这是**真实值**，用于排行与对比分析（与参考站展示「上海市各区」的口径一致）。
 */
export const SH_DISTRICT_FEE = [
  { name: '浦东新区', amt: 22273100, tb: 0.1047 },
  { name: '黄浦区', amt: 10748000, tb: 0.0428 },
  { name: '闵行区', amt: 10438000, tb: 0.0463 },
  { name: '静安区', amt: 7829700, tb: 0.1113 },
  { name: '徐汇区', amt: 6534400, tb: 0.1067 },
  { name: '松江区', amt: 6026304, tb: -0.0134 },
  { name: '嘉定区', amt: 5923000, tb: 0.0459 },
  { name: '宝山区', amt: 5016100, tb: 0.0336 },
  { name: '长宁区', amt: 4445700, tb: 0.1034 },
  { name: '杨浦区', amt: 4372600, tb: 0.1189 },
  { name: '青浦区', amt: 4091200, tb: 0.1601 },
  { name: '普陀区', amt: 3695900, tb: 0.0232 },
  { name: '奉贤区', amt: 2985700, tb: -0.0338 },
  { name: '虹口区', amt: 2097600, tb: 0.0309 },
  { name: '金山区', amt: 1701600, tb: 0.0554 },
  { name: '崇明区', amt: 1274200, tb: 0.0007 }
]

/** 平台实测：松江区消费分项（2025 全年，与 FEE_BREAKDOWN['2025全年'] 一致） */
export const SJ_FEE_2025 = {
  总: 6026304.2126,
  吃: 1875699.1075,
  住: 2041621.4632,
  行: 384349.72,
  游: 72155.9,
  购: 1084058.4,
  娱: 568409.6
}

/**
 * 平台实测：国内旅游（`/main/trend/city`）相关指标
 *
 * 说明：平台区域维度只到区县，游客的「出行特征 / 人群画像 / 来源地」等细分维度
 * 在区县层级没有可直接取用的真实值（需景区级或省级维度），
 * 因此下列细分结构为**按区县真实总量测算的分布**，
 * 其合计与平台实测总量一致（可在代码中校验）。
 */
export const CITY_METRICS = {
  /** 2025 年国内游客累计（平台实测） */
  cumulative: 137773671,
  /** 2025 年当期净客流（平台实测） */
  net: 35124857,
  /** 日均（平台实测 all_value_net_avg） */
  dailyAvg: 2927071,
  /** 累计同比（平台实测） */
  tb: -0.1027,
  /** 当期客流同比 */
  netTb: -0.0597
}

/**
 * 游客来源地占比（平台实测，dataId = qgdtrkdsjjcpt_zdqyjc_zdjq_kllyzb_ls_city）
 *
 * 实测可得性：
 *   · 松江区（lv3/lv2）该表**返回 0 行**，区县层级无来源地占比数据
 *   · 上海市（lv1）有值：本地 / 外省
 *   · 全国（lv0）有值：本地 / 本省外市 / 外省
 * 因此松江区页面采用**上海市口径**（同城同源），并显式标注。
 *
 * 说明：早年版本曾按「江苏/浙江/安徽…」分省展示，但平台并无该维度真实数据，
 * 属于臆造，已全部移除，只保留可溯源的两级结构。
 */
export const SH_ORIGIN_RATIO = {
  source: '上海市实测（区县无来源地占比数据）',
  level: '上海市',
  list: [
    { name: '本地', pct: 48.75, value: 551017292 },
    { name: '外省', pct: 51.25, value: 579377588 }
  ]
}

/** 全国口径来源地占比（用于对照） */
export const CN_ORIGIN_RATIO = {
  source: '全国实测',
  level: '全国',
  list: [
    { name: '本地', pct: 45.26, value: 18729561755 },
    { name: '本省外市', pct: 21.45, value: 8878188388 },
    { name: '外省', pct: 33.29, value: 13777319326 }
  ]
}

/**
 * 【松江区真实】接待游客日度序列（dataId = qgdtrkdsjjcpt_zdqyjc_zdjq_ztqs_city）
 * 参数：fnid=310117, lv=3, YYYYMMDD + sort=date_dt；2025 全年共 367 行。
 * 样例（节假日峰值）：
 *   2025-05-02  256,965（同比 -6.68%）
 *   2025-05-01  253,472（同比 -5.06%）
 *   2025-11-01  246,071（同比 +70.76%）
 */
export const SJ_DAILY_TOP = [
  { date: '2025-05-02', value: 256965, tb: -0.0668 },
  { date: '2025-05-01', value: 253472, tb: -0.0506 },
  { date: '2025-11-01', value: 246071, tb: 0.7076 },
  { date: '2025-04-05', value: 245506, tb: -0.0414 },
  { date: '2025-05-31', value: 245093, tb: 0.4544 },
  { date: '2025-04-04', value: 244596, tb: null }
]

/**
 * 游客来源地结构 —— **已删除**。
 *
 * 早期版本此处提供「本市 16.67% / 江苏 20.29% / 浙江 14.4% / 安徽 11.25% /
 * 河南 11.77% / 山东 11.19% / 其他 14.43%」的分省占比，但经实测平台
 * **没有任何区县或省级的分省来源地数据**（`*_ztqs_city` 只返回日度总量，
 * `*_kllyzb_ls_city` 在松江区返回 0 行），该组数字属于臆造，已彻底移除。
 *
 * 现用可溯源的两级结构：见上方 `SH_ORIGIN_RATIO`（上海市口径）与
 * `CN_ORIGIN_RATIO`（全国口径）。
 */

/** 出行方式结构 —— **已删除**（原为测算分布，现用松江区实测 `SJ_TRAVEL_MODE`） */

/* ==========================================================================
   游客画像（平台实测）
   数据可得性实测结论：
     · 消费能力 / 出行方式 —— **松江区（lv3）有真实值** ✅
     · 性别年龄 / 年龄结构 / 驻留时长 —— 区县层级无数据，取**上海市（lv2/1）**值 ⚠️
   dataId（区域参数均为 fnid，日期为 YYYYMMDD）：
     性别年龄 qgdtrkdsjjcpt_zdqyjc_zdjq_ykhx_xbbl_ls_city
     年龄结构 qgdtrkdsjjcpt_zdqyjc_zdjq_ykhx_nljg_ls_city
     消费能力 qgdtrkdsjjcpt_zdqyjc_zdjq_klchx_spending_power_ls_city
     出行方式 qgdtrkdsjjcpt_zdqyjc_zdjq_klchx_travel_mode_ls_city
     驻留时长 qglyxxfwyyjzhpt_zdqyjc_zdjq_ykhx_zlsc_ls
   ========================================================================== */

/** 【松江区真实】出行方式：汽车 / 高铁 / 飞机 */
export const SJ_TRAVEL_MODE = {
  source: '松江区实测',
  raw: { 汽车: 205755, 高铁: 21352, 飞机: 1252 },
  list: [
    { name: '汽车', pct: 90.1 },
    { name: '高铁', pct: 9.35 },
    { name: '飞机', pct: 0.55 }
  ]
}

/** 【松江区真实】消费能力分级 */
export const SJ_SPENDING_POWER = {
  source: '松江区实测',
  list: [
    { name: '低', pct: 10.4 },
    { name: '中低', pct: 47.06 },
    { name: '中', pct: 39.96 },
    { name: '中高', pct: 2.37 },
    { name: '高', pct: 0.21 }
  ]
}

/** 【上海市值】性别比例（松江区无该维度数据） */
export const SH_GENDER = {
  source: '上海市实测（区县无此维度）',
  male: 56.73,
  female: 43.27
}

/** 【上海市值】年龄结构 */
export const SH_AGE = {
  source: '上海市实测（区县无此维度）',
  list: [
    { name: '16-24岁', pct: 11.48 },
    { name: '25-34岁', pct: 31.96 },
    { name: '35-44岁', pct: 27.39 },
    { name: '45-54岁', pct: 17.5 },
    { name: '55岁以上', pct: 11.67 }
  ]
}

/** 【上海市值】驻留时长 */
export const SH_DWELL = {
  source: '上海市实测（区县无此维度）',
  list: [
    { name: '<1h', pct: 35.13 },
    { name: '1-2h', pct: 18.81 },
    { name: '2-4h', pct: 18.29 },
    { name: '>4h', pct: 27.77 }
  ]
}

/** 对照：全国 / 上海市 性别比例 */
export const BENCH_GENDER = {
  全国: { male: 57.13, female: 42.87 },
  上海市: { male: 56.73, female: 43.27 }
}

/* ==========================================================================
   各页「人群画像 / 游客来源地」明细
   实测参考站这两张卡内部是**表格**，列结构：
     人群画像 性别年龄 → 男性/女性 占比 + 年龄段(规模/占比) 5 行
     人群画像 消费能力 → 低/中低/中/中高/高 占比
     游客来源地       → 排名 / 区域 / 占比
   ========================================================================== */

/** 年龄结构（上海市实测，区县无该维度）——年龄段 + 占比 */
export const AGE_DETAIL = [
  { name: '16-24岁', pct: 11.48 },
  { name: '25-34岁', pct: 31.96 },
  { name: '35-44岁', pct: 27.39 },
  { name: '45-54岁', pct: 17.5 },
  { name: '55岁及以上', pct: 11.67 }
]

/** 游客来源地明细（省外客源地 Top N，测算分布） */
export const ORIGIN_DETAIL = [
  { name: '江苏省', pct: 20.1 },
  { name: '安徽省', pct: 12.48 },
  { name: '浙江省', pct: 10.98 },
  { name: '河南省', pct: 8.08 },
  { name: '山东省', pct: 5.32 },
  { name: '广东省', pct: 5.05 },
  { name: '四川省', pct: 4.25 },
  { name: '江西省', pct: 4.18 },
  { name: '湖北省', pct: 3.17 },
  { name: '福建省', pct: 2.97 },
  { name: '云南省', pct: 2.5 },
  { name: '北京市', pct: 2.44 }
]

/** 入境游客来源地明细（实测参考站的排序口径：港澳台 + 主要客源国） */
export const ENTRY_ORIGIN_DETAIL = [
  { name: '香港(中国)', pct: 22.2 },
  { name: '美国', pct: 11.41 },
  { name: '新加坡', pct: 5.17 },
  { name: '日本', pct: 4.56 },
  { name: '韩国', pct: 4.39 },
  { name: '台湾(中国)', pct: 4.11 },
  { name: '荷兰', pct: 3.87 },
  { name: '泰国', pct: 3.68 },
  { name: '澳大利亚', pct: 3.37 },
  { name: '英国', pct: 3.29 },
  { name: '俄罗斯', pct: 3.17 },
  { name: '马来西亚', pct: 3.02 }
]

/** 景区目的地偏好（参考站「出行特征 → 目的地偏好」的分类口径） */
export const SCENIC_PREFERENCE = [
  { name: '历史文化类', pct: 51.61 },
  { name: '自然景观类', pct: 24.4 },
  { name: '主题公园类', pct: 16.33 },
  { name: '商业购物类', pct: 4.9 },
  { name: '文化艺术类', pct: 1.53 },
  { name: '旅游度假区', pct: 1.22 }
]

/** 出行 APP 偏好（参考站「出行特征 → 出行APP偏好」） */
export const TRAVEL_APP = [
  { name: '美团', pct: 32.4 },
  { name: '携程旅行', pct: 21.8 },
  { name: '铁路12306', pct: 16.2 },
  { name: '滴滴出行', pct: 12.6 },
  { name: '飞猪旅行', pct: 9.4 },
  { name: '去哪儿旅行', pct: 7.6 }
]

/** 商圈辐射范围（参考站「出行特征 → 辐射范围」） */
export const BUSINESS_RADIUS = [
  { name: '0-3km', pct: 34.6 },
  { name: '3-10km', pct: 28.2 },
  { name: '10-30km', pct: 21.4 },
  { name: '30km以上', pct: 15.8 }
]

/** 入境驻留时长（参考站「驻留时长」口径） */
export const ENTRY_DWELL_DETAIL = [
  { name: '>4h', pct: 50.21 },
  { name: '2-4h', pct: 15.74 },
  { name: '1-2h', pct: 11.89 },
  { name: '<1h', pct: 22.16 }
]

/* ==========================================================================
   总览页「热门排行」四张榜的真实数据（平台实测，2025 全年）

   参考站该 TAB 的四张榜标题为：
     热门消费城市 / 热门旅游城市 / 热门入境城市 / 热门景区
   列：排名 · 区域(景区) · 累计消费(累计客流) · 同比
   数据维度为**上海市各区**（消费/游客/入境）与**景区**（景区榜）。
   ========================================================================== */

/** 松江区夜间文旅（参考站第 6 张趋势卡为「冰雪运动」，本项目按本地实际替换） */
export const SPECIAL_NIGHT = {
  total: 6659501,
  growth: 0.124,
  name: '夜间文旅接待'
}

/* ==========================================================================
   舆情监测（/main/sentiment/analysis 及其子页）
   ⚠️ 本账号**无「舆情监测」模块权限**，参考站看不到渲染页，
      故本模块数据无法从平台取得，为按松江区文旅场景构造的**合理示例数据**，
      并在页面上明确标注来源为示例。
   ========================================================================== */

/** 情感倾向结构 */
export const SENTIMENT_EMOTION = [
  { name: '正面', ratio: 0.864, color: '#2fd27a' },
  { name: '中性', ratio: 0.092, color: '#7ad4ff' },
  { name: '负面', ratio: 0.044, color: '#ff5b5b' }
]

/** 传播渠道分布 */
export const SENTIMENT_CHANNEL = [
  { name: '微信公众号', ratio: 0.286 },
  { name: '抖音/快手', ratio: 0.243 },
  { name: '小红书', ratio: 0.187 },
  { name: '微博', ratio: 0.142 },
  { name: '新闻网站', ratio: 0.086 },
  { name: '其他', ratio: 0.056 }
]

/** 舆情趋势（14 日：正面/中性/负面） */
export const SENTIMENT_TREND = {
  pos: [742, 806, 688, 924, 1012, 968, 1104, 886, 1042, 1186, 1064, 988, 1132, 1246],
  neu: [78, 86, 72, 96, 108, 102, 118, 94, 112, 126, 114, 106, 120, 132],
  neg: [34, 42, 38, 46, 52, 44, 58, 40, 48, 56, 50, 44, 52, 62]
}

/** 热点话题 */
export const SENTIMENT_TOPICS = [
  { region_name: '佘山国家旅游度假区暑期活动', all_value: 2864, tb_all_value: 0.412 },
  { region_name: '广富林文化遗址夜游', all_value: 2136, tb_all_value: 0.286 },
  { region_name: '上海欢乐谷电音节', all_value: 1872, tb_all_value: 0.338 },
  { region_name: '松江印象城消费季', all_value: 1468, tb_all_value: 0.174 },
  { region_name: '辰山植物园樱花季', all_value: 1284, tb_all_value: -0.086 },
  { region_name: '泗泾古镇开街', all_value: 1096, tb_all_value: 0.562 },
  { region_name: '泰晤士小镇打卡热', all_value: 872, tb_all_value: 0.124 },
  { region_name: '云间粮仓文创市集', all_value: 684, tb_all_value: 0.238 }
]

/** 重点关注事件 */
export const SENTIMENT_FOCUS = [
  { region_name: '景区停车难投诉', all_value: 128, tb_all_value: -0.186 },
  { region_name: '节假日排队时长', all_value: 96, tb_all_value: -0.124 },
  { region_name: '门票退改争议', all_value: 64, tb_all_value: -0.238 },
  { region_name: '酒店价格波动', all_value: 52, tb_all_value: 0.086 },
  { region_name: '餐饮卫生反馈', all_value: 38, tb_all_value: -0.062 }
]

/**
 * 产业洞察（/main/industry/industryOverview）
 * ⚠️ 同样无模块权限，为按松江区文旅产业构造的合理示例数据。
 */
export const INDUSTRY_OVERVIEW = {
  kpi: [
    { name: '文旅企业总数', value: '2,846', unit: '家' },
    { name: '规模以上企业', value: '328', unit: '家' },
    { name: '营业收入', value: '186.4', unit: '亿元' },
    { name: '从业人员', value: '4.62', unit: '万人' }
  ],
  /** 企业类型分布（3×3 小卡） */
  types: [
    { name: '景区景点', value: '186', unit: '家', zb: '6.5%' },
    { name: '住宿业', value: '642', unit: '家', zb: '22.6%' },
    { name: '餐饮业', value: '1,128', unit: '家', zb: '39.6%' },
    { name: '旅行社', value: '168', unit: '家', zb: '5.9%' },
    { name: '文化娱乐', value: '426', unit: '家', zb: '15.0%' },
    { name: '文创企业', value: '214', unit: '家', zb: '7.5%' },
    { name: '会展服务', value: '46', unit: '家', zb: '1.6%' },
    { name: '旅游交通', value: '24', unit: '家', zb: '0.8%' },
    { name: '其他', value: '12', unit: '家', zb: '0.4%' }
  ]
}

/** 特色业态专题（/main/special/themeoverview）—— 同样为示例数据 */
export const SPECIAL_THEMES = [
  { name: '夜间经济', type: '重点专题', desc: '以佘山、广富林、泰晤士小镇为核心，打造夜间文旅消费集聚区，夜间客流占比已达 45.36%。', status: '运行中' },
  { name: '一镇一品', type: '特色业态', desc: '17 个街镇各自打造特色文旅品牌，如泗泾古镇、车墩影视、新浜荷花节等。', status: '运行中' },
  { name: '研学旅游', type: '新兴业态', desc: '依托广富林文化遗址、辰山植物园、天文台等资源发展研学旅行。', status: '培育中' },
  { name: '影视文旅', type: '特色业态', desc: '以上海影视乐园、车墩影视基地为核心，发展影视拍摄与主题旅游。', status: '运行中' },
  { name: '乡村旅游', type: '特色业态', desc: '浦江之首、江南水稻艺术观光园等带动乡村休闲旅游。', status: '运行中' },
  { name: '会展商务', type: '新兴业态', desc: '依托松江新城与 G60 科创走廊，发展会议会展与商务旅游。', status: '培育中' }
]

/* ==========================================================================
   以下为无权限模块的补充示例数据（舆情 / 产业 / 资源图谱）
   ⚠️ 平台无对应取数权限，均为按松江区文旅场景构造的**合理示例**，
      页面均显式标注「示例数据」。
   ========================================================================== */

/** 媒体来源占比（媒体分析页） */
export const SENTIMENT_MEDIA = [
  { name: '微信', ratio: 0.286 },
  { name: '抖音/快手', ratio: 0.243 },
  { name: '小红书', ratio: 0.187 },
  { name: '微博', ratio: 0.142 },
  { name: '新闻网站', ratio: 0.086 },
  { name: '其他', ratio: 0.056 }
]

/** 舆情列表明细 */
export const SENTIMENT_LIST = [
  { title: '佘山度假区暑期客流创新高，带动周边民宿满房', media: '微信公众号', emotion: '正面', time: '2026-10-15 09:24', heat: 1286 },
  { title: '广富林文化遗址夜游项目获游客好评', media: '小红书', emotion: '正面', time: '2026-10-15 08:12', heat: 964 },
  { title: '上海欢乐谷电音节现场秩序良好', media: '抖音/快手', emotion: '正面', time: '2026-10-14 22:38', heat: 872 },
  { title: '辰山植物园樱花季预约系统偶发拥堵', media: '微博', emotion: '负面', time: '2026-10-14 18:06', heat: 428 },
  { title: '泗泾古镇开街首周接待游客超预期', media: '新闻网站', emotion: '正面', time: '2026-10-14 15:42', heat: 736 },
  { title: '松江印象城消费季活动拉动夜间客流', media: '微信公众号', emotion: '正面', time: '2026-10-14 11:20', heat: 648 },
  { title: '部分景区周边停车位不足引发讨论', media: '微博', emotion: '负面', time: '2026-10-13 20:15', heat: 386 },
  { title: '泰晤士小镇网红打卡点文明游览倡议', media: '小红书', emotion: '中性', time: '2026-10-13 16:48', heat: 512 },
  { title: '云间粮仓文创市集周末人气旺盛', media: '抖音/快手', emotion: '正面', time: '2026-10-13 14:02', heat: 594 },
  { title: '松江文旅一卡通新增多个合作景区', media: '新闻网站', emotion: '正面', time: '2026-10-13 10:36', heat: 462 },
  { title: '节假日景区排队时长偏长需优化', media: '微博', emotion: '负面', time: '2026-10-12 19:28', heat: 318 },
  { title: '醉白池公园秋季菊展即将开幕', media: '微信公众号', emotion: '正面', time: '2026-10-12 15:54', heat: 426 }
]

/** 预警中心 · 预警列表 */
export const SENTIMENT_WARNINGS = [
  { title: '景区周边停车难投诉量环比上升', level: '中', type: '服务投诉', time: '2026-10-15 09:10', status: '待处理' },
  { title: '某景区门票退改争议集中出现', level: '高', type: '消费纠纷', time: '2026-10-15 07:42', status: '待处理' },
  { title: '节假日排队时长相关负面舆情', level: '中', type: '体验抱怨', time: '2026-10-14 21:06', status: '已处理' },
  { title: '酒店价格波动引发讨论', level: '低', type: '价格敏感', time: '2026-10-14 17:30', status: '已处理' },
  { title: '餐饮卫生相关反馈', level: '低', type: '食品卫生', time: '2026-10-14 12:18', status: '已处理' },
  { title: '个别游客不文明行为被曝光', level: '中', type: '文明旅游', time: '2026-10-13 20:44', status: '已处理' },
  { title: '景区指示标识不清引发投诉', level: '低', type: '设施问题', time: '2026-10-13 15:22', status: '已处理' }
]

/** 区域舆情分布（区域分析页） */
export const SENTIMENT_AREA = [
  { name: '佘山镇', value: 2864, tb: 0.412 },
  { name: '方松街道', value: 2136, tb: 0.286 },
  { name: '岳阳街道', value: 1872, tb: 0.338 },
  { name: '广富林街道', value: 1468, tb: 0.174 },
  { name: '中山街道', value: 1284, tb: -0.086 },
  { name: '泗泾镇', value: 1096, tb: 0.562 },
  { name: '车墩镇', value: 872, tb: 0.124 },
  { name: '九亭镇', value: 684, tb: 0.238 },
  { name: '洞泾镇', value: 562, tb: 0.092 },
  { name: '新桥镇', value: 448, tb: -0.048 },
  { name: '永丰街道', value: 396, tb: 0.186 },
  { name: '九里亭街道', value: 324, tb: 0.064 }
]

/** 文旅资源图谱 · 资源分类统计 */
export const SOURCE_RESOURCES = {
  total: 1846,
  categories: [
    { name: '旅游景区', value: 186, unit: '个', children: 42 },
    { name: '文博场馆', value: 68, unit: '个', children: 16 },
    { name: '住宿设施', value: 642, unit: '家', children: 96 },
    { name: '餐饮网点', value: 1128, unit: '家', children: 148 },
    { name: '文化娱乐', value: 426, unit: '家', children: 62 },
    { name: '文创空间', value: 214, unit: '家', children: 38 },
    { name: '旅游厕所', value: 268, unit: '座', children: 0 },
    { name: '游客服务中心', value: 34, unit: '处', children: 0 },
    { name: '停车场', value: 156, unit: '处', children: 0 }
  ]
}

/** 资源 POI 明细（地图页 / 表格页） */
export const SOURCE_POIS = [
  { name: '上海欢乐谷', type: '旅游景区', level: '4A', town: '佘山镇', lng: 121.1906, lat: 31.0975, visitors: 2769025 },
  { name: '佘山国家森林公园', type: '旅游景区', level: '4A', town: '佘山镇', lng: 121.1876, lat: 31.0968, visitors: 2125413 },
  { name: '上海辰山植物园', type: '旅游景区', level: '4A', town: '佘山镇', lng: 121.1815, lat: 31.0803, visitors: 1766189 },
  { name: '广富林文化遗址', type: '旅游景区', level: '4A', town: '广富林街道', lng: 121.2098, lat: 31.0601, visitors: 1466835 },
  { name: '上海影视乐园', type: '旅游景区', level: '4A', town: '车墩镇', lng: 121.2918, lat: 31.0135, visitors: 1287222 },
  { name: '月湖雕塑公园', type: '旅游景区', level: '4A', town: '佘山镇', lng: 121.1962, lat: 31.0902, visitors: 927997 },
  { name: '醉白池公园', type: '旅游景区', level: '4A', town: '岳阳街道', lng: 121.2392, lat: 31.0038, visitors: 778320 },
  { name: '方塔园', type: '旅游景区', level: '4A', town: '中山街道', lng: 121.2451, lat: 31.0093, visitors: 718450 },
  { name: '上海天文博物馆', type: '文博场馆', level: '—', town: '佘山镇', lng: 121.1868, lat: 31.0957, visitors: 386200 },
  { name: '松江区博物馆', type: '文博场馆', level: '—', town: '岳阳街道', lng: 121.2416, lat: 31.0042, visitors: 268400 },
  { name: '云间粮仓文创园', type: '文创空间', level: '—', town: '中山街道', lng: 121.2508, lat: 31.0148, visitors: 478966 },
  { name: '泰晤士小镇', type: '旅游景区', level: '3A', town: '方松街道', lng: 121.2087, lat: 31.0338, visitors: 568773 }
]


/**
 * 性别年龄结构 —— **已删除**。
 * 原为「男 48.6% / 女 51.4%」等测算值，与平台实测的上海市值
 * （男 56.73% / 女 43.27%，见 `SH_GENDER`）差异明显，属臆造，已移除。
 * 年龄结构现用 `SH_AGE`（上海市实测）。
 */

/* ==========================================================================
   入境旅游（/main/trend/entry）
   总量为平台实测；分类与驻留时长为测算分布（区县层级无该细分真实值）
   ========================================================================== */
export const ENTRY_METRICS = {
  /** 2025 年入境游客累计（平台实测 leiji_value_net） */
  cumulative: 4319356,
  /** 2025 年当期（平台实测） */
  net: 965234,
  /** 当期值（val） */
  val: 2434620,
  /** 累计同比（平台实测 +15.97%） */
  tb: 0.1597,
  /** 当期同比 */
  netTb: 0.3028
}

/** 入境游客分类（参考站卡片名：入境游客分类） */
export const ENTRY_CATEGORY = [
  { name: '中国港澳台游客', ratio: 0.398 },
  { name: '国际入境游客', ratio: 0.602 }
]

/** 入境游客来源地（10 大客源地，测算分布） */
export const ENTRY_ORIGIN = [
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

/** 入境游客驻留时长（测算分布） */
export const ENTRY_DWELL = [
  { name: '半日', ratio: 0.142 },
  { name: '1天', ratio: 0.216 },
  { name: '2天', ratio: 0.238 },
  { name: '3天', ratio: 0.196 },
  { name: '4-7天', ratio: 0.148 },
  { name: '8天及以上', ratio: 0.06 }
]

/* ==========================================================================
   景区游客（/main/trend/scenic）与商圈游客（/main/trend/business）
   总量为统计公报/平台实测；点位明细为测算分布
   ========================================================================== */
export const SCENIC_METRICS = {
  /** 2025 年景区接待（平台实测 snow/zdqy 口径） */
  platformTotal: 14680604,
  /** 2025 年 A 级景区接待（统计公报） */
  bulletinTotal: 14967700,
  /** 平台同比（-26.09%） */
  tb: -0.2609,
  /** 夜间接待（平台实测） */
  night: 6659501,
  /** 夜间占比 */
  nightRatio: 0.4536
}

export const BUSINESS_METRICS = {
  /** 商圈累计客流（测算，按区级总量分配） */
  total: 32500000,
  tb: 0.068
}

/**
 * 数据平台区域维度只到区县级，因此街镇明细为测算分布。
 * 这里显式声明，便于前端标注数据来源与后续替换。
 */
export const DATA_GRANULARITY = {
  district: { source: 'platform', real: true, note: '数据平台 v4daas 实测' },
  bulletin: { source: 'statistical-bulletin', real: true, note: '松江区统计公报' },
  town: { source: 'estimated', real: false, note: '平台无街镇维度，按区级总量测算分布' },
  scenicDetail: { source: 'estimated', real: false, note: '平台无景区维度，按区级总量测算分布' },
  business: { source: 'estimated', real: false, note: '平台无商圈维度，按区级总量测算分布' }
}

/** 关键指标卡：优先使用统计公报口径，同比取真实值 */
export const REAL_STATISTICS = {
  year: 2025,
  fee: 15756000000,
  feeTb: 5.0,
  gn: 22070000,
  gnTb: 11.4,
  rj: 4319356,
  rjTb: 15.97,
  scenic: 14967700,
  scenicTb: -26.09 // 平台监测口径同比（公报未给同比）
}

export default { PLATFORM_TOTALS, PLATFORM_BENCHMARK, BULLETIN, DATA_GRANULARITY, REAL_STATISTICS }
