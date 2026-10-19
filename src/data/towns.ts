/** 松江区 17 个街镇文旅指标（模拟数据，结构对齐真实业务口径） */
export interface TownStat {
    /** 街镇名，需与 GeoJSON 中 properties.name 一致 */
    name: string
    type: '街道' | '镇'
    /** 接待游客（万人次） */
    tourists: number
    /** 景区景点（个） */
    spots: number
    /** 宾馆酒店（家） */
    hotels: number
    /** 餐馆（家） */
    restaurants: number
    /** 文旅综合营收（万元） */
    revenue: number
    /** 文化执法检查（次） */
    cases: number
    /** 文旅发展指数（0-100） */
    index: number
}

export const TOWN_STATS: TownStat[] = [
    { name: '佘山镇', type: '镇', tourists: 486.2, spots: 8, hotels: 42, restaurants: 386, revenue: 18620, cases: 412, index: 96.5 },
    { name: '方松街道', type: '街道', tourists: 352.7, spots: 4, hotels: 68, restaurants: 1120, revenue: 15240, cases: 986, index: 94.2 },
    { name: '广富林街道', type: '街道', tourists: 328.5, spots: 3, hotels: 36, restaurants: 720, revenue: 12860, cases: 743, index: 93.8 },
    { name: '中山街道', type: '街道', tourists: 296.4, spots: 2, hotels: 54, restaurants: 980, revenue: 11250, cases: 892, index: 92.6 },
    { name: '岳阳街道', type: '街道', tourists: 268.9, spots: 2, hotels: 46, restaurants: 1080, revenue: 9860, cases: 964, index: 91.4 },
    { name: '九亭镇', type: '镇', tourists: 246.3, spots: 1, hotels: 28, restaurants: 760, revenue: 8420, cases: 712, index: 90.1 },
    { name: '车墩镇', type: '镇', tourists: 238.7, spots: 2, hotels: 22, restaurants: 420, revenue: 9180, cases: 486, index: 89.7 },
    { name: '泗泾镇', type: '镇', tourists: 226.5, spots: 2, hotels: 31, restaurants: 680, revenue: 8640, cases: 623, index: 89.3 },
    { name: '新桥镇', type: '镇', tourists: 198.2, spots: 1, hotels: 24, restaurants: 540, revenue: 7180, cases: 458, index: 87.9 },
    { name: '洞泾镇', type: '镇', tourists: 186.4, spots: 1, hotels: 19, restaurants: 460, revenue: 6240, cases: 395, index: 86.8 },
    { name: '九里亭街道', type: '街道', tourists: 178.6, spots: 1, hotels: 17, restaurants: 420, revenue: 5980, cases: 372, index: 86.2 },
    { name: '永丰街道', type: '街道', tourists: 172.3, spots: 2, hotels: 21, restaurants: 510, revenue: 6720, cases: 431, index: 86.9 },
    { name: '小昆山镇', type: '镇', tourists: 148.5, spots: 2, hotels: 14, restaurants: 320, revenue: 5240, cases: 318, index: 84.6 },
    { name: '石湖荡镇', type: '镇', tourists: 132.8, spots: 2, hotels: 11, restaurants: 260, revenue: 4180, cases: 276, index: 83.2 },
    { name: '泖港镇', type: '镇', tourists: 126.4, spots: 3, hotels: 13, restaurants: 240, revenue: 4620, cases: 254, index: 83.7 },
    { name: '叶榭镇', type: '镇', tourists: 118.7, spots: 2, hotels: 10, restaurants: 230, revenue: 3960, cases: 241, index: 82.5 },
    { name: '新浜镇', type: '镇', tourists: 96.2, spots: 1, hotels: 8, restaurants: 180, revenue: 3120, cases: 198, index: 81.3 },
]

/** 地图可切换的指标维度 */
export interface MapMetric {
    key: keyof Omit<TownStat, 'name' | 'type'>
    label: string
    unit: string
    /** 颜色渐变（低 → 高） */
    ramp: [string, string]
}

export const MAP_METRICS: MapMetric[] = [
    { key: 'tourists', label: '接待游客', unit: '万人次', ramp: ['#0a2a4d', '#38e8ff'] },
    { key: 'revenue', label: '文旅营收', unit: '万元', ramp: ['#0b2b45', '#6ff2c0'] },
    { key: 'spots', label: '景区景点', unit: '个', ramp: ['#122a4c', '#b98cff'] },
    { key: 'hotels', label: '宾馆酒店', unit: '家', ramp: ['#0b2b45', '#ffd166'] },
    { key: 'index', label: '发展指数', unit: '', ramp: ['#0a2a4d', '#ff86c2'] },
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
