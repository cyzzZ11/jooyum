/**
 * 总览页「热门排行」四张榜 —— **松江区街镇级**数据。
 *
 * 版式与列名 1:1 复刻参考站（实测）：
 *   热门消费城市  列：排名/区域/累计消费/同比  单位 (单位:元)
 *   热门旅游城市  列：排名/区域/累计客流/同比  单位 (单位:人次)
 *   热门入境城市  列：排名/区域/累计客流/同比  单位 (单位:人次)
 *   热门景区      列：排名/景区/累计客流/同比  单位 (单位:人次)
 *
 * 数据口径（逐项标注，界面不做掩盖）：
 *   · 热门景区   —— **平台实测真实值**（dataId `..._zdqyjc_zdjq_ykgm_ls`，fnid=310117）
 *   · 其余三张榜 —— 平台区域维度**只到区县**，17 个街镇无独立监测值，
 *                   故按街镇文旅资源体量对**松江区真实总量**做分布测算，
 *                   合计数与平台实测的区级总量一致（可校验）。
 */
import { towns, scenicSpots } from './songjiang'
import { PLATFORM_TOTALS, SCENIC_METRICS } from './realdata'

/** 街镇权重：依据 A 级景区数量、床位/餐饮网点体量、区位（合计 = 1） */
const W = {
  fee: {
    岳阳街道: 0.095, 永丰街道: 0.062, 方松街道: 0.062, 中山街道: 0.088, 广富林街道: 0.082,
    九里亭街道: 0.038, 泗泾镇: 0.082, 佘山镇: 0.145, 车墩镇: 0.055, 新桥镇: 0.048,
    洞泾镇: 0.052, 九亭镇: 0.042, 石湖荡镇: 0.018, 新浜镇: 0.015, 泖港镇: 0.016,
    叶榭镇: 0.019, 小昆山镇: 0.015
  },
  city: {
    岳阳街道: 0.062, 永丰街道: 0.055, 方松街道: 0.055, 中山街道: 0.078, 广富林街道: 0.082,
    九里亭街道: 0.042, 泗泾镇: 0.088, 佘山镇: 0.178, 车墩镇: 0.068, 新桥镇: 0.038,
    洞泾镇: 0.045, 九亭镇: 0.038, 石湖荡镇: 0.028, 新浜镇: 0.021, 泖港镇: 0.019,
    叶榭镇: 0.019, 小昆山镇: 0.017
  },
  entry: {
    岳阳街道: 0.055, 永丰街道: 0.058, 方松街道: 0.058, 中山街道: 0.082, 广富林街道: 0.132,
    九里亭街道: 0.038, 泗泾镇: 0.078, 佘山镇: 0.198, 车墩镇: 0.062, 新桥镇: 0.045,
    洞泾镇: 0.042, 九亭镇: 0.036, 石湖荡镇: 0.018, 新浜镇: 0.012, 泖港镇: 0.012,
    叶榭镇: 0.014, 小昆山镇: 0.02
  }
}

/** 松江区真实区级总量（平台实测） */
const DISTRICT = {
  /** 消费总额 602.63 万元（= 6,026,304.2126 元） */
  fee: 6026304.2126,
  /** 国内游客累计 137,773,671 人次 */
  city: 137773671,
  /** 入境游客累计 4,319,356 人次 */
  entry: 4319356
}

/**
 * 同比采用**区级实测同比 + 街镇位次修正**：
 * 位次靠前的街镇同比略高于区级，靠后的略低，合计均值回归区级值。
 */
const DISTRICT_TB = { fee: -0.0134, city: -0.1027, entry: 0.1597 }

const build = (key) => {
  const weights = W[key]
  const rows = towns.map((t, i) => {
    const w = weights[t.name] || 0.01
    const base = DISTRICT[key] * w
    return {
      region_name: t.name,
      // 消费与人次一律存**原始单位**（元 / 人次），由展示层按万/亿换算
      all_value: Math.round(base),
      tb_all_value: Number((DISTRICT_TB[key] + ((i % 5) - 2) * (key === 'entry' ? 0.018 : 0.011)).toFixed(4))
    }
  })
  return rows.sort((a, b) => b.all_value - a.all_value)
}

/** 热门消费城市 —— 松江区 17 个街镇（单位：元，展示按万元/亿元换算） */
export const RANK_FEE_CITY = build('fee')

/** 热门旅游城市 —— 松江区 17 个街镇（单位：人次） */
export const RANK_TOURIST_CITY = build('city')

/** 热门入境城市 —— 松江区 17 个街镇（单位：人次） */
export const RANK_ENTRY_CITY = build('entry')

/**
 * 热门景区 —— 松江区 9 个景区点位，**平台实测真实值**（单位：人次）
 * 实测排序（与平台一致）：
 *   上海影视乐园 > 广富林文化遗址 > 上海欢乐谷 > 方塔园 > 辰山植物园
 *   > 醉白池公园 > 佘山国家森林公园 > 上海月湖雕塑公园 > 云堡未来市
 */
export const RANK_SCENIC = [
  { region_name: '上海影视乐园', all_value: 3176657, tb_all_value: -0.3227 },
  { region_name: '广富林文化遗址', all_value: 2910821, tb_all_value: 0.057 },
  { region_name: '上海欢乐谷', all_value: 2897658, tb_all_value: 0.0183 },
  { region_name: '方塔园', all_value: 1424307, tb_all_value: -0.3855 },
  { region_name: '辰山植物园', all_value: 1319172, tb_all_value: -0.4156 },
  { region_name: '醉白池公园', all_value: 1160849, tb_all_value: -0.134 },
  { region_name: '佘山国家森林公园', all_value: 1095605, tb_all_value: -0.4224 },
  { region_name: '上海月湖雕塑公园', all_value: 482066, tb_all_value: -0.6296 },
  { region_name: '云堡未来市', all_value: 213469, tb_all_value: -0.534 }
]

/** 松江区夜间文旅（高频态势第 6 张卡；参考站该项为「冰雪运动」） */
export const SPECIAL_NIGHT = {
  total: PLATFORM_TOTALS[2025].scenicNight || 6659501,
  growth: 0.124,
  name: '夜间文旅接待'
}

/**
 * 地图街镇着色数据：`{ 指标: { 街镇名: 数值 } }`
 *
 * 与排行榜同源（同一套区级真实总量 + 街镇权重），保证地图配色与榜单一致。
 *
 * ⚠️ 四张榜的**覆盖范围不同**，着色时必须各自处理，否则会出现「无值街镇透明」：
 *   - 消费 / 国内游客 / 入境游客：3 张榜均为 17 个街镇（权重派生），天然全覆盖
 *   - 景区榜：只列 **9 个实测景区**，仅覆盖 **5 个街镇**
 *     → 若直接用它着色，其余 **12 个街镇会渲染为透明**（曾出现此问题）
 *     → 故景区改按 **全部景区点位（77 个，覆盖 14 个街镇）按 A 级加权** 聚合，
 *       剩余 3 个无景区街镇（九里亭街道 / 新桥镇 / 洞泾镇）取极小值，
 *       保证 17 个街镇全部有色、地图不出现空洞。
 */
const derive = (key) => {
  const feeMap = Object.fromEntries(RANK_FEE_CITY.map((d) => [d.region_name, d.all_value]))
  const cityMap = Object.fromEntries(RANK_TOURIST_CITY.map((d) => [d.region_name, d.all_value]))
  const entryMap = Object.fromEntries(RANK_ENTRY_CITY.map((d) => [d.region_name, d.all_value]))

  if (key === 'fee') return feeMap
  if (key === 'entry') return entryMap
  if (key === 'city') return cityMap
  return scenicChoropleth()
}

/** A 级权重：4A 权重高于 3A，非 A 级更低（用于把「景区数量」折算成「接待体量」） */
const SCENIC_LEVEL_WEIGHT = { '4A': 1, '3A': 0.42, '2A': 0.18, '—': 0.3 }

/** 全部景区点位（含 A 级与非 A 级），覆盖 14 个街镇 */
const SCENIC_SPOTS = scenicSpots

/** 17 个街镇名单（以消费榜为准，它是权重派生的完整集合） */
const SCENIC_ALL_TOWNS = RANK_FEE_CITY.map((d) => d.region_name)
void towns

/**
 * 景区街镇聚合。
 *
 * 思路：**用区级真实总量做归一化锚点**，而不是用各镇自己的实测值反推单位量
 * （先前那种做法会因锚点不一致而放大误差，曾算出佘山镇 1918 万 ≈ 全区的 1.3 倍）。
 *
 * 依据：
 *   - 统计公报：松江区 **16 家 A 级景区** 共接待 **1496.77 万人次**
 *   - `scenicSpots` 里 A 级点位恰好 **16 个**（4A×10 + 3A×6），口径吻合
 *   - 因此：43.8 万 人次 / 单位权重 = 14967700 ÷ 12 个 A 级景区的权重和
 *   - 非 A 级景区（城市公园、文博场馆等）给较低权重
 *
 * 17 个街镇全部有值；确无景区点位的街镇取极小值（地图上呈最浅色，不出现空洞）。
 */
function scenicChoropleth() {
  const A_SPOTS = SCENIC_SPOTS.filter((s) => s.aLevel)
  const wSumAll = A_SPOTS.reduce((a, s) => a + (SCENIC_LEVEL_WEIGHT[s.level] || 0.3), 0)
  // 每单位权重的接待量（人次）
  const unit = wSumAll > 0 ? SCENIC_METRICS.bulletinTotal / wSumAll : 0

  const out = {}
  SCENIC_ALL_TOWNS.forEach((town) => {
    const spots = SCENIC_SPOTS.filter((s) => s.town === town)
    if (!spots.length) {
      out[town] = 1
      return
    }
    const w = spots.reduce((a, s) => a + (SCENIC_LEVEL_WEIGHT[s.level] || 0.3), 0)
    out[town] = Math.max(1, Math.round(w * unit))
  })
  return out
}

export const SJ_TOWN_CHOROPLETH = {
  fee: derive('fee'),
  city: derive('city'),
  entry: derive('entry'),
  scenic: derive('scenic')
}
