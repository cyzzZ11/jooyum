/** 松江区重点景区 / 文旅点位（坐标与 GeoJSON 同坐标系） */
export interface ScenicSpot {
    name: string
    coord: [number, number]
    /** 热度等级 1-3，用于散点大小 */
    level: 1 | 2 | 3
    /** 假期客流（万人次，2026.10.01~10.07） */
    visitors: number
    /** 是否在地图上显示名称 */
    showLabel?: boolean
    /** 名称相对点的方位，用于错开密集区 */
    dir?: 'left' | 'right' | 'top' | 'bottom'
}

export const SCENIC_SPOTS: ScenicSpot[] = [
    { name: '佘山国家森林公园', coord: [121.1934, 31.0934], level: 3, visitors: 8.6, showLabel: true, dir: 'left' },
    { name: '上海欢乐谷', coord: [121.2075, 31.0862], level: 3, visitors: 9.8, showLabel: true, dir: 'right' },
    { name: '辰山植物园', coord: [121.1876, 31.0772], level: 3, visitors: 5.4, showLabel: true, dir: 'left' },
    // dir 用 top：bottom 会正好压在「广富林街道」的街镇名上（街镇名优先级更高）
    { name: '广富林文化遗址', coord: [121.2087, 31.0652], level: 3, visitors: 14.4, showLabel: true, dir: 'top' },
    { name: '上海影视乐园', coord: [121.3052, 30.9826], level: 2, visitors: 3.2, showLabel: true, dir: 'right' },
    { name: '月湖雕塑公园', coord: [121.2012, 31.0966], level: 2, visitors: 1.9 },
    { name: '泰晤士小镇', coord: [121.2205, 31.0625], level: 2, visitors: 6.8, showLabel: true, dir: 'right' },
    { name: '醉白池公园', coord: [121.2352, 31.0021], level: 2, visitors: 2.8, showLabel: true, dir: 'right' },
    { name: '方塔园', coord: [121.2455, 31.0106], level: 2, visitors: 6.4 },
    { name: '天马山', coord: [121.1612, 31.0804], level: 1, visitors: 0.9 },
    { name: '松江区博物馆', coord: [121.2305, 31.0108], level: 1, visitors: 0.6 },
    { name: '云间粮仓', coord: [121.2413, 31.0215], level: 1, visitors: 1.4 },
    { name: '五厍农业休闲观光园', coord: [121.1601, 30.9705], level: 1, visitors: 0.8 },
    { name: '雪浪湖生态园', coord: [121.1902, 30.9128], level: 1, visitors: 0.5 },
    { name: '新浜荷花公社', coord: [121.1246, 30.9042], level: 1, visitors: 0.4 },
    { name: '浦江之首', coord: [121.1512, 30.9412], level: 2, visitors: 3.5 },
]

/** 中心地图底部「文旅资源一张图」图例 —— 存量口径（截至 2026 年 9 月末行业台账），不随假期变化 */
export interface ResourceItem {
    label: string
    value: number
    icon: string
    color: string
}

export const RESOURCE_LEGEND: ResourceItem[] = [
    { label: '旅游景区', value: 31, icon: 'mountain', color: '#2fd8ff' },
    { label: '爱国主义教育基地', value: 14, icon: 'flag', color: '#ff6b6b' },
    { label: '公共文化服务场馆', value: 47, icon: 'culture', color: '#ffc94d' },
    { label: '博物馆', value: 9, icon: 'museum', color: '#a97bff' },
    { label: '宾馆酒店', value: 464, icon: 'hotel', color: '#21e6c1' },
    { label: '上网服务场所', value: 61, icon: 'net', color: '#3f8cff' },
    { label: '剧场', value: 8, icon: 'theater', color: '#ff5f9e' },
    { label: '旅行社', value: 62, icon: 'travel', color: '#5ef2a0' },
    { label: '美术馆', value: 5, icon: 'art', color: '#ff9f43' },
    { label: '棋牌室', value: 210, icon: 'chess', color: '#7fb3ff' },
    { label: '乡村民宿', value: 118, icon: 'homestay', color: '#5ef2a0' },
    { label: '艺术考级', value: 26, icon: 'cert', color: '#ffc94d' },
    { label: '娱乐场所', value: 97, icon: 'ktv', color: '#ff5f9e' },
    { label: '电影院', value: 22, icon: 'film', color: '#2fd8ff' },
]
