/**
 * 界面文案与结构定义（松江区口径）。
 * 参考站同位置定义见 chunk-1b0fcab6：statisticsList / dateTypeList / rankTypeList / listTabList。
 */

/** 四张核心指标卡：与参考站一一对应，仅把“全国”口径换成“松江区”口径 */
export const statisticsList = [
  { name: '累计旅游消费', value: 'fee', dataIndex: 'fee', unit: '元', icon: 'fee' },
  { name: '累计接待游客量', value: 'city', dataIndex: 'gn', unit: '人次', icon: 'tourist' },
  { name: '累计接待入境游客量', value: 'entry', dataIndex: 'rj', unit: '人次', icon: 'entry' },
  { name: '景区累计接待游客量', value: 'scenic', dataIndex: 'scenic', unit: '人次', icon: 'scenic' }
]

/** 时间类型：月度 / 日度 / 假日（参考站 dateTypeList） */
export const dateTypeList = [
  { name: '月度', value: 'year' },
  { name: '日度', value: 'day' },
  { name: '假日', value: 'holiday' }
]

/** 排行类型切换：热门排行 / 高频态势（参考站 rankTypeList） */
export const rankTypeList = [
  { name: '热门排行', value: 'hot', icon: 'el-icon-s-data' },
  { name: '高频态势', value: 'break', icon: 'el-icon-data-line' }
]

/**
 * 热门排行四张表。
 *
 * 标题与列名**取自参考站渲染页实测**（CDP 读取 `.rank-card-item`）：
 *   热门消费城市  列：排名/区域/累计消费/同比  单位 (单位:元)
 *   热门旅游城市  列：排名/区域/累计客流/同比  单位 (单位:人次)
 *   热门入境城市  列：排名/区域/累计客流/同比  单位 (单位:人次)
 *   热门景区      列：排名/景区/累计客流/同比  单位 (单位:人次)
 * 卡片尺寸实测 394×455（四张并列）。
 */
export const hotTableConfig = [
  { key: 'fee', title: '热门消费城市', unit: '(单位:元)', domId: 'table-data-fee' },
  { key: 'city', title: '热门旅游城市', unit: '(单位:人次)', domId: 'table-data-city' },
  { key: 'entry', title: '热门入境城市', unit: '(单位:人次)', domId: 'table-data-entry' },
  { key: 'scenic', title: '热门景区', unit: '(单位:人次)', domId: 'table-data-scenic' }
]

/**
 * 高频态势的趋势图卡片。
 *
 * 参考站实测（CDP）：该 TAB **不是排行榜**，而是 6 张「摘要条 + 折线图」卡片，
 * 布局 `.chart-part-wrapper` 1680×753 内 3 列 × 2 行，每张 `.trend-chart-card-wrapper` 537×359。
 * 卡片内部结构：
 *   .chart-title (537×37)
 *   .content-wrapepr.trend-chart-panel.content-wrapepr--flex (537×312)
 *     .trend-summary-bar   (537×40)   ← 文案：「9月，上海市旅游消费累计1.04亿元，同比增长6.4%。」
 *     .e-linechart         (537×260)  ← 折线图
 * 标题依次为：上海市旅游消费 / 上海市国内旅游 / 上海市入境旅游 /
 *             上海市景区游客 / 上海市商圈游客 / 上海市冰雪运动
 * 本项目按松江区口径替换为对应 6 项。
 */
export const breakTableConfig = []

export const trendChartConfig = [
  { key: 'trendFeeData', loadingKey: 'fee', name: '松江区旅游消费', unit: '亿元', color: '#ffd200' },
  { key: 'trendCityData', loadingKey: 'city', name: '松江区国内旅游', unit: '万人次', color: '#088afb' },
  { key: 'trendEntryData', loadingKey: 'entry', name: '松江区入境旅游', unit: '万人次', color: '#7ad4ff' },
  { key: 'trendScenicData', loadingKey: 'scenic', name: '松江区景区游客', unit: '万人次', color: '#2fd27a' },
  { key: 'trendBusinessData', loadingKey: 'business', name: '松江区商圈游客', unit: '万人次', color: '#ff8b4d' },
  { key: 'trendSpecialData', loadingKey: 'special', name: '松江区夜间文旅', unit: '万人次', color: '#b47aff' }
]

/** 对比分析的维度 Tab（对应参考站 /main/trend/compare） */
export const compareTabList = [
  { name: '街镇对比', value: 'town' },
  { name: '景区对比', value: 'scenic' },
  { name: '商圈对比', value: 'business' },
  { name: '时段对比', value: 'period' }
]

/**
 * 排行表列定义。
 *
 * 列名实测自参考站渲染页（CDP 读取各卡片的 `th`）：
 *   热门消费城市 → 排名 / 区域 / **累计消费** / 同比
 *   热门旅游城市 → 排名 / 区域 / **累计客流** / 同比
 *   热门入境城市 → 排名 / 区域 / **累计客流** / 同比
 *   热门景区     → 排名 / **景区** / **累计客流** / 同比
 * 排名列 48px 由 TableList 自动渲染；实测无「归属」列。
 */
export const townTableColumns = [
  { label: '区域', prop: 'region_name', align: 'left', width: 122 },
  { label: '累计客流', prop: 'all_value', width: 80, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]

export const scenicTableColumns = [
  { label: '景区', prop: 'region_name', align: 'left', width: 122 },
  { label: '累计客流', prop: 'all_value', width: 80, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]

export const feeTableColumns = [
  { label: '区域', prop: 'region_name', align: 'left', width: 122 },
  { label: '累计消费', prop: 'all_value', width: 80, sortable: true },
  { label: '同比', prop: 'tb_all_value', width: 69, unit: '%', sortable: true }
]

export const configMap = {
  fee: { table: hotTableConfig[0], columns: feeTableColumns },
  city: { table: hotTableConfig[1], columns: townTableColumns },
  entry: { table: hotTableConfig[2], columns: townTableColumns },
  scenic: { table: hotTableConfig[3], columns: scenicTableColumns }
}
