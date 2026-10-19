/** 大屏各卡片数据（模拟数据，口径参考上海市文旅大屏） */

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
}

export interface RankItem {
    name: string
    value: number
}

/* ============================ 游 ============================ */
export const YOU_STATS: StatItem[] = [
    { label: '全区接待游客', value: 128.5, unit: '万人次', icon: 'users', color: '#2fd8ff', decimals: 1 },
    { label: '今日景区游客', value: 1.17, unit: '万人次', icon: 'calendar', color: '#21e6c1', decimals: 2 },
    { label: '佘山度假区', value: 28.6, unit: '万人次', icon: 'mountain', color: '#a97bff', decimals: 1 },
    { label: '浦江之首板块', value: 12.4, unit: '万人次', icon: 'flag', color: '#ffc94d', decimals: 1 },
]

/** 开放式景区客流（万人次） */
export const YOU_BARS: NamedValue[] = [
    { name: '醉白池公园', value: 2.2 },
    { name: '方塔园', value: 4.7 },
    { name: '广富林遗址', value: 5.9 },
]

/* ============================ 吃 ============================ */
export const CHI_STATS: StatItem[] = [
    { label: '餐馆数量', value: 9306, unit: '个', icon: 'utensil', color: '#ff9f43' },
    { label: '消费金额', value: 3.6, unit: '亿元', icon: 'coin', color: '#ffc94d', decimals: 1 },
]

export const CHI_RANK: RankItem[] = [
    { name: '松江万达广场', value: 1862 },
    { name: '开元地中海广场', value: 1524 },
    { name: '松江老城庙前街', value: 1286 },
    { name: '泰晤士小镇', value: 968 },
    { name: '九亭 U 天地', value: 842 },
]

/* ============================ 购 ============================ */
export const GOU_TOTAL = { label: '旅游购物总额', value: 8.6, unit: '亿元' }

export const GOU_PIE: NamedValue[] = [
    { name: '百货', value: 2.8 },
    { name: '其他', value: 2.4 },
    { name: '服饰', value: 1.6 },
    { name: '奢品', value: 0.9 },
    { name: '电子电器', value: 0.6 },
    { name: '化妆品', value: 0.3 },
]

/* ============================ 住 ============================ */
export const ZHU_STATS: StatItem[] = [
    { label: '宾馆总数', value: 464, unit: '家', icon: 'hotel', color: '#21e6c1' },
    { label: '入住总数', value: 58.6, unit: '万人次', icon: 'bed', color: '#2fd8ff', decimals: 1 },
]

export const ZHU_RING: NamedValue[] = [
    { name: '五星级宾馆', value: 8 },
    { name: '四星级宾馆', value: 42 },
    { name: '三星及以下', value: 234 },
    { name: '乡村民宿', value: 180 },
]

/* ============================ 娱 ============================ */
export const YU_STATS: StatItem[] = [
    { label: '实际演出票房', value: 8620.5, unit: '万元', icon: 'stage', color: '#ff5f9e', decimals: 1 },
    { label: '观演人次', value: 42.6, unit: '万人次', icon: 'ticket', color: '#a97bff', decimals: 1 },
]

export const YU_RANK: RankItem[] = [
    { name: '仲夏夜之梦 · 佘山森林音乐会', value: 65902 },
    { name: '松江文化音乐节「云间之秋」', value: 52181 },
    { name: '广富林汉服文化周', value: 44920 },
    { name: '泗泾古镇夜市 · 非遗集市', value: 38764 },
    { name: '松江书画名家邀请展', value: 26513 },
]

/* ============================ 行 ============================ */
export const XING_SMALL: StatItem[] = [
    { label: '铁路松江站', value: 8.4, unit: '万人次', icon: 'train', color: '#3f8cff', decimals: 1 },
    { label: '长途客运', value: 3.2, unit: '万人次', icon: 'bus', color: '#21e6c1', decimals: 1 },
    { label: '有轨电车', value: 1.6, unit: '万人次', icon: 'tram', color: '#a97bff', decimals: 1 },
]

export const XING_BIG: StatItem[] = [
    { label: '轨交 9 号线客运量', value: 42.6, unit: '万人次', icon: 'subway', color: '#2fd8ff', decimals: 1 },
    { label: '公交客运量', value: 78.5, unit: '万人次', icon: 'bus', color: '#5ef2a0', decimals: 1 },
]

/* ============================ 放（简政放权） ============================ */
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

/* ============================ 管（行业监管） ============================ */
export const GUAN_STATS: StatItem[] = [
    { label: '文化执法次数', value: 3862, unit: '次', icon: 'shield', color: '#2fd8ff' },
    { label: '稽查场所数', value: 15924, unit: '次', icon: 'search', color: '#21e6c1' },
    { label: '立案数', value: 386, unit: '次', icon: 'gavel', color: '#ffc94d' },
    { label: '立案处罚数', value: 312, unit: '次', icon: 'alert', color: '#ff6b6b' },
]

export const GUAN_MONTHS = ['1月', '2月', '3月', '4月', '5月']

export const GUAN_LINE: { name: string; color: string; data: number[] }[] = [
    { name: '文化执法检查', color: '#2fd8ff', data: [268, 214, 342, 386, 425] },
    { name: '立案查处', color: '#ffc94d', data: [42, 36, 58, 71, 64] },
]

/* ============================ 服（公共服务） ============================ */
export const FU_STATS: StatItem[] = [
    { label: '12345 投诉 · 当月', value: 43, unit: '个', icon: 'phone', color: '#ff9f43' },
    { label: '12345 投诉 · 当日', value: 2, unit: '个', icon: 'phone-call', color: '#2fd8ff' },
]

export const FU_RANK: RankItem[] = [
    { name: '上海欢乐谷', value: 20 },
    { name: '佘山国家森林公园', value: 14 },
    { name: '辰山植物园', value: 9 },
    { name: '广富林文化遗址', value: 7 },
    { name: '泰晤士小镇', value: 4 },
]

/** 12345 投诉问题类型分布（%） */
export const FU_PIE: NamedValue[] = [
    { name: '景区服务', value: 34 },
    { name: '餐饮住宿', value: 26 },
    { name: '交通出行', value: 18 },
    { name: '导游服务', value: 14 },
    { name: '其他', value: 8 },
]

/* ============================ 中心区 ============================ */
/** 中心地图右上角的趋势小图（月度游客量，万人次） */
export const MONTH_TREND = {
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月'],
    tourists: [238, 286, 342, 398, 412, 386, 468, 512, 436],
}
