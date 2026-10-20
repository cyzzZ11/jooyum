/**
 * 松江区 17 个街镇文旅指标 —— 统计周期：2026 年国庆假期（10.01 ~ 10.07，7 天）
 *
 * 闭合校验（改动数据后请保持成立）：
 *  - tourists   合计 146.40 万人次 = 全区假期接待游客（区文旅局通报）
 *  - revenue    合计 111000 万元  = 11.10 亿元（全区假期文旅综合营收）
 *  - spots      合计 31 个        = 「文旅资源统计」旅游景区
 *  - hotels     合计 464 家       = 「文旅资源统计」宾馆酒店
 *  - restaurants 合计 9306 家     = 吃卡片餐馆数量
 *  - cases      合计 286 次       = 管卡片文化执法检查次数
 *
 * 街镇分配规则：游客量按 2025 年各街镇客流权重分摊全区总量；
 * 营收按「游客量 × 街镇能级系数」分摊；执法次数按商户密度分摊。详见 docs/数据来源与生成规则.md
 */
export interface TownStat {
  /** 街镇名，需与 GeoJSON 中 properties.name 一致 */
  name: string
  type: '街道' | '镇'
  /** 假期接待游客（万人次） */
  tourists: number
  /** 景区景点（个） */
  spots: number
  /** 宾馆酒店（家） */
  hotels: number
  /** 餐馆（家） */
  restaurants: number
  /** 假期文旅综合营收（万元） */
  revenue: number
  /** 假期文化执法检查（次） */
  cases: number
  /** 假期文旅热度指数（0-100） */
  index: number
}

export const TOWN_STATS: TownStat[] = [
  { name: '佘山镇', type: '镇', tourists: 18.72, spots: 8, hotels: 42, restaurants: 386, revenue: 14626, cases: 22, index: 96.5 },
  { name: '方松街道', type: '街道', tourists: 13.58, spots: 3, hotels: 68, restaurants: 1120, revenue: 11971, cases: 38, index: 94.2 },
  { name: '广富林街道', type: '街道', tourists: 12.65, spots: 2, hotels: 36, restaurants: 720, revenue: 10102, cases: 28, index: 93.8 },
  { name: '中山街道', type: '街道', tourists: 11.41, spots: 2, hotels: 54, restaurants: 980, revenue: 8837, cases: 34, index: 92.6 },
  { name: '岳阳街道', type: '街道', tourists: 10.35, spots: 1, hotels: 46, restaurants: 1080, revenue: 7745, cases: 36, index: 91.4 },
  { name: '九亭镇', type: '镇', tourists: 9.48, spots: 1, hotels: 28, restaurants: 760, revenue: 6614, cases: 22, index: 90.1 },
  { name: '车墩镇', type: '镇', tourists: 9.19, spots: 3, hotels: 22, restaurants: 420, revenue: 7211, cases: 18, index: 89.7 },
  { name: '泗泾镇', type: '镇', tourists: 8.72, spots: 2, hotels: 31, restaurants: 680, revenue: 6787, cases: 26, index: 89.3 },
  { name: '新桥镇', type: '镇', tourists: 7.63, spots: 1, hotels: 24, restaurants: 540, revenue: 5640, cases: 13, index: 87.9 },
  { name: '洞泾镇', type: '镇', tourists: 7.18, spots: 1, hotels: 19, restaurants: 460, revenue: 4902, cases: 11, index: 86.8 },
  { name: '九里亭街道', type: '街道', tourists: 6.88, spots: 1, hotels: 17, restaurants: 420, revenue: 4697, cases: 6, index: 86.2 },
  { name: '永丰街道', type: '街道', tourists: 6.63, spots: 1, hotels: 21, restaurants: 510, revenue: 5279, cases: 16, index: 86.9 },
  { name: '小昆山镇', type: '镇', tourists: 5.72, spots: 1, hotels: 14, restaurants: 320, revenue: 4116, cases: 4, index: 84.6 },
  { name: '石湖荡镇', type: '镇', tourists: 5.11, spots: 1, hotels: 11, restaurants: 260, revenue: 3283, cases: 3, index: 83.2 },
  { name: '泖港镇', type: '镇', tourists: 4.87, spots: 1, hotels: 13, restaurants: 240, revenue: 3629, cases: 3, index: 83.7 },
  { name: '叶榭镇', type: '镇', tourists: 4.57, spots: 1, hotels: 10, restaurants: 230, revenue: 3111, cases: 3, index: 82.5 },
  { name: '新浜镇', type: '镇', tourists: 3.71, spots: 1, hotels: 8, restaurants: 180, revenue: 2450, cases: 3, index: 81.3 },
]

/** 地图可切换的指标维度 */
export interface MapMetric {
  key: keyof Omit<TownStat, 'name' | 'type'>
  label: string
  unit: string
  /** 分级色带（暗 → 亮），至少 2 段；4 段时层次最清晰 */
  ramp: string[]
}

export const MAP_METRICS: MapMetric[] = [
  { key: 'tourists', label: '接待游客', unit: '万人次', ramp: ['#062038', '#0d4a80', '#1f9fd8', '#6ff2ff'] },
  { key: 'revenue', label: '文旅营收', unit: '万元', ramp: ['#04241e', '#0d5c48', '#1fbf95', '#7cf5c8'] },
  { key: 'spots', label: '景区景点', unit: '个', ramp: ['#130d2e', '#3a2670', '#7d4fd6', '#c9a6ff'] },
  { key: 'hotels', label: '宾馆酒店', unit: '家', ramp: ['#241804', '#6b4708', '#c78f1e', '#ffd166'] },
  { key: 'index', label: '热度指数', unit: '', ramp: ['#2a0819', '#7a1f4d', '#d94a8c', '#ff9ad0'] }
]

/** 全区汇总（头部指标卡 / 中心区角标用） */
export const TOWN_SUMMARY = {
  tourists: TOWN_STATS.reduce((s, t) => s + t.tourists, 0),
  revenue: TOWN_STATS.reduce((s, t) => s + t.revenue, 0),
  spots: TOWN_STATS.reduce((s, t) => s + t.spots, 0),
  hotels: TOWN_STATS.reduce((s, t) => s + t.hotels, 0),
  restaurants: TOWN_STATS.reduce((s, t) => s + t.restaurants, 0),
  cases: TOWN_STATS.reduce((s, t) => s + t.cases, 0),
  index: 97,
}
