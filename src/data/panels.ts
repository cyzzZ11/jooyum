/**
 * 大屏各卡片数据 —— 统计周期：2026 年国庆假期（10 月 1 日 ~ 10 月 7 日，共 7 天）
 *
 * 取数优先级（冲突时按此顺序覆盖），逐条来源见 docs/数据源清单.md：
 *  1. 数据源2 —— 节假日游客大数据监测平台存档 data-source/normalized/songjiang-2026-guojiaqing.json
 *  2. data-picture/ 平台截图（消费结构比例等）
 *  3. 官方公网口径（区文旅局通报、上海松江门户年鉴）
 *  4. 按公开口径与业务常识推算（推算规则逐项写在 docs/数据来源与生成规则.md）
 *
 *  - 全区接待游客 170.14 万人次（同比 +27.71%）、夜间 93.06 万、重点景区 9 家 43.37 万：数据源2 实测
 *  - 消费结构比例：平台截图；绝对量 = 170.14 万 × 758 元/人次（推算）
 */

export interface StatItem {
    label: string
    value: number
    unit: string
    icon: string
    color: string
    decimals?: number
}

export interface NamedValue {
    name: string
    value: number
    /** 图表窄轴上的短名（可选） */
    short?: string
}

export interface RankItem {
    name: string
    value: number
}

/* ============================ 游 ============================ */
/** 数据源2 实测：累计 1,701,400 人次 / 日均 243,057 / 重点景区 433,708 / 夜间 930,644 */
export const YOU_STATS: StatItem[] = [
    { label: '假期接待游客', value: 170.14, unit: '万人次', icon: 'users', color: '#2fd8ff', decimals: 2 },
    { label: '假期日均游客', value: 24.31, unit: '万人次', icon: 'calendar', color: '#21e6c1', decimals: 2 },
    { label: '重点景区（9 家）', value: 43.37, unit: '万人次', icon: 'mountain', color: '#a97bff', decimals: 2 },
    { label: '佘山度假区', value: 18.80, unit: '万人次', icon: 'flag', color: '#ffc94d', decimals: 2 },
]

/**
 * 重点景区假期客流（万人次）—— 数据源2 实测，9 家合计 43.37 万
 * 佘山度假区 = 佘山镇 4 家重点景区（欢乐谷 + 辰山 + 森林公园 + 月湖）合计 18.80 万
 */
export const YOU_BARS: NamedValue[] = [
    { name: '广富林文化遗址', short: '广富林', value: 13.28 },
    { name: '上海欢乐谷', short: '欢乐谷', value: 7.96 },
    { name: '上海影视乐园', short: '影视乐园', value: 6.42 },
    { name: '辰山植物园', short: '辰山', value: 4.51 },
    { name: '佘山国家森林公园', short: '佘山', value: 4.27 },
    { name: '方塔园', short: '方塔园', value: 2.61 },
]

/* ============================ 吃 ============================ */
export const CHI_STATS: StatItem[] = [
    { label: '餐馆数量', value: 9306, unit: '个', icon: 'utensil', color: '#ff9f43' },
    { label: '假期餐饮消费', value: 3.49, unit: '亿元', icon: 'coin', color: '#ffc94d', decimals: 2 },
]

export const CHI_RANK: RankItem[] = [
    { name: '松江万达广场', value: 5648 },
    { name: '开元地中海广场', value: 4556 },
    { name: '松江老城庙前街', value: 3696 },
    { name: '泰晤士小镇', value: 3068 },
    { name: '九亭 U 天地', value: 2499 },
]

/* ============================ 购 ============================ */
export const GOU_TOTAL = { label: '假期旅游购物总额', value: 3.09, unit: '亿元' }

export const GOU_PIE: NamedValue[] = [
    { name: '百货', value: 1.0 },
    { name: '其他', value: 0.72 },
    { name: '服饰', value: 0.64 },
    { name: '奢品', value: 0.33 },
    { name: '电子电器', value: 0.24 },
    { name: '化妆品', value: 0.16 },
]

/* ============================ 住 ============================ */
export const ZHU_STATS: StatItem[] = [
    { label: '住宿设施总数', value: 464, unit: '家', icon: 'hotel', color: '#21e6c1' },
    { label: '假期入住人次', value: 34.7, unit: '万人次', icon: 'bed', color: '#2fd8ff', decimals: 1 },
]

/** 住宿设施构成（家）—— 合计 464，与「文旅资源统计」宾馆酒店一致 */
export const ZHU_RING: NamedValue[] = [
    { name: '五星级/奢华酒店', value: 6 },
    { name: '四星级/高档酒店', value: 24 },
    { name: '三星及以下/商务', value: 316 },
    { name: '乡村民宿', value: 118 },
]

/* ============================ 娱 ============================ */
export const YU_STATS: StatItem[] = [
    { label: '假期演出票房', value: 1490.4, unit: '万元', icon: 'stage', color: '#ff5f9e', decimals: 1 },
    { label: '假期观演人次', value: 21.6, unit: '万人次', icon: 'ticket', color: '#a97bff', decimals: 1 },
]

/** 线上传播热度 TOP5（点击/曝光量，次）—— 均对应 2026 国庆期间松江实际活动 */
export const YU_RANK: RankItem[] = [
    { name: '第 37 届上海旅游节闭幕式 · 广富林光影秀', value: 286400 },
    { name: '泰晤士小镇 · 上海国际光影节主展区', value: 218700 },
    { name: '广富林国潮游园会 · 非遗美食市集', value: 176200 },
    { name: '仓城历史文化风貌区 · 光影夜游', value: 132500 },
    { name: '上海欢乐谷 · 国庆街头红人节', value: 98600 },
]

/* ============================ 行 ============================ */
export const XING_SMALL: StatItem[] = [
    { label: '铁路松江站', value: 14.6, unit: '万人次', icon: 'train', color: '#3f8cff', decimals: 1 },
    { label: '长途客运', value: 6.7, unit: '万人次', icon: 'bus', color: '#21e6c1', decimals: 1 },
    { label: '有轨电车', value: 26.0, unit: '万人次', icon: 'tram', color: '#a97bff', decimals: 1 },
]

export const XING_BIG: StatItem[] = [
    { label: '轨交 9 号线（松江段）', value: 112.5, unit: '万人次', icon: 'subway', color: '#2fd8ff', decimals: 1 },
    { label: '公交客运量', value: 179.2, unit: '万人次', icon: 'bus', color: '#5ef2a0', decimals: 1 },
]

/** 各交通方式假期客流分担（万人次） */
export const XING_MODES: { name: string; value: number; color: string }[] = [
    { name: '公交车', value: 179.2, color: '#5ef2a0' },
    { name: '轨交9号线', value: 112.5, color: '#2fd8ff' },
    { name: '有轨电车', value: 26.0, color: '#ffc94d' },
    { name: '铁路', value: 14.6, color: '#3f8cff' },
    { name: '长途客运', value: 6.7, color: '#a97bff' },
]

/* ============================ 放（简政放权，存量口径） ============================ */
/** 审批改革成效为年度累计存量指标，不随假期变化 */
export const FANG_STATS: StatItem[] = [
    { label: '取消审批', value: 26, unit: '项', icon: 'cancel', color: '#2fd8ff' },
    { label: '取消收费', value: 4, unit: '项', icon: 'coin', color: '#ffc94d' },
    { label: '下放审批', value: 18, unit: '项', icon: 'share', color: '#21e6c1' },
    { label: '调整审批权限', value: 6, unit: '项', icon: 'lock', color: '#a97bff' },
    { label: '调整审批层级', value: 4, unit: '项', icon: 'layers', color: '#3f8cff' },
    { label: '实行告知承诺', value: 9, unit: '项', icon: 'check', color: '#5ef2a0' },
    { label: '减材料', value: 32, unit: '项', icon: 'file-minus', color: '#2fd8ff' },
    { label: '减时限', value: 41, unit: '项', icon: 'clock', color: '#ff9f43' },
    { label: '其他调整', value: 17, unit: '项', icon: 'edit', color: '#7fb3ff' },
]

export const FANG_RING: NamedValue[] = [
    { name: '新增', value: 58 },
    { name: '延续、年检', value: 24 },
    { name: '变更', value: 13 },
    { name: '注销', value: 5 },
]

/* ============================ 管（行业监管，假期口径） ============================ */
export const GUAN_STATS: StatItem[] = [
    { label: '文化执法检查', value: 286, unit: '次', icon: 'shield', color: '#2fd8ff' },
    { label: '稽查场所', value: 1842, unit: '家次', icon: 'search', color: '#21e6c1' },
    { label: '立案数', value: 12, unit: '件', icon: 'gavel', color: '#ffc94d' },
    { label: '立案处罚数', value: 9, unit: '件', icon: 'alert', color: '#ff6b6b' },
]

export const GUAN_DAYS = ['10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7']

/** 假期每日执法检查 / 立案查处（次 / 件） */
export const GUAN_LINE: { name: string; color: string; data: number[] }[] = [
    { name: '文化执法检查', color: '#2fd8ff', data: [38, 36, 34, 41, 44, 46, 47] },
    { name: '立案查处', color: '#ffc94d', data: [2, 1, 2, 2, 2, 2, 1] },
]

/* ============================ 服（公共服务，假期口径） ============================ */
export const FU_STATS: StatItem[] = [
    { label: '12345 投诉 · 假期累计', value: 50, unit: '件', icon: 'phone', color: '#ff9f43' },
    { label: '12345 投诉 · 单日峰值', value: 10, unit: '件', icon: 'phone-call', color: '#2fd8ff' },
]

/** 服务效能补充指标 —— 假期内重大旅游投诉 0 起，投诉全部按期办结 */
export const FU_EXTRA = [
    { label: '投诉办结率', value: '100', unit: '%' },
    { label: '平均响应时长', value: '1.8', unit: '小时' },
    { label: '游客满意度', value: '4.8', unit: '分' }
]

/** OTA / 社交平台热议景区（讨论量，百条） */
export const FU_RANK: RankItem[] = [
    { name: '广富林文化遗址', value: 42 },
    { name: '上海欢乐谷', value: 31 },
    { name: '佘山国家森林公园', value: 24 },
    { name: '泰晤士小镇', value: 18 },
    { name: '辰山植物园', value: 11 },
    { name: '醉白池公园', value: 7 },
]

/** 12345 投诉问题类型分布（%） */
export const FU_PIE: NamedValue[] = [
    { name: '景区服务', value: 32 },
    { name: '餐饮住宿', value: 27 },
    { name: '交通出行', value: 17 },
    { name: '导游服务', value: 14 },
    { name: '其他', value: 10 },
]

/* ============================ 中心区 ============================ */
/** 国庆假期日度客流趋势（万人次）—— 数据源2 实测，合计 = 170.14 */
export const HOLIDAY_TREND = {
    days: ['10.1', '10.2', '10.3', '10.4', '10.5', '10.6', '10.7'],
    tourists: [25.75, 25.93, 21.58, 21.56, 24.94, 25.38, 25.0],
    nightTourists: [14.26, 14.31, 11.78, 12.33, 13.51, 13.75, 13.14],
}
