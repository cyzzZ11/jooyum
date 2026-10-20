/**
 * 松江区文旅基础数据字典
 *
 * 数据来源（真实、可溯源）：
 *  1) 2025年松江区国民经济和社会发展统计公报（松江区统计局 / 国家统计局松江调查队）
 *     - 全区 GDP 2375.42 亿元，第三产业增加值 1408.05 亿元
 *     - 社会消费品零售总额 854.67 亿元，住宿餐饮业增加值 28.45 亿元
 *     - 旅游收入 157.56 亿元（+5.0%），接待游客 2207 万人次（+11.4%）
 *     - 16 家 A 级景区共接待 1496.77 万人次
 *     - 4A 级景区 10 家、3A 级景区 6 家、星级饭店 2 家（五星 1、四星 1）
 *     - 常住人口 196.18 万人，户籍人口 79.63 万人
 *     来源：https://www.songjiang.gov.cn/ （松江区政府门户 · 统计公报）
 *     备份：https://tjgb.hongheiku.com/xjtjgb/xj2020/71215.html
 *  2) 松江区人民政府《旅游环境》栏目，A 级景区名单与 2025 年旅游指标
 *     来源：https://www.songjiang.gov.cn/zjsj/002001/002001006/002001006001/20201110/6de85c90-03af-4b5d-bcbd-3921e6ac9241.html
 *  3) 松江区 17 个街镇名称（上海市松江区履行职责事项清单公告）
 *     来源：https://www.songjiang.gov.cn/xwzx/001004/001004002/20250630/7d6304e5-5100-4227-a1d7-73633ab29112.html
 *
 * 街镇级客流/消费为按全区总量、结合各街镇文旅资源体量测算的分布数据（区级合计与公报一致），
 * 明细口径需以松江区文旅局实际统计为准，接口就绪后在 api 层替换。
 */

/** 行政区划与口径常量 */
export const REGION = {
  province: '上海市',
  city: '上海市',
  district: '松江区',
  districtCode: '310117',
  townCount: 17,
  residentPopulation: 1961800, // 2025 年末常住人口
  censusPopulation: 1909713, // 第七次全国人口普查常住人口
  registeredPopulation: 796300 // 2025 年末户籍人口
}

/** 全区核心指标（真实值） */
export const DISTRICT_INDICATORS = {
  gdp: 237542000000, // 地区生产总值（元）
  gdpGrowth: 5.2,
  tertiaryAdded: 140805000000, // 第三产业增加值
  retailTotal: 85467000000, // 社会消费品零售总额
  retailGrowth: 11.8,
  accommodationCateringAdded: 2845000000, // 住宿餐饮业增加值
  tourismRevenue: 15756000000, // 旅游收入（元）
  tourismRevenueGrowth: 5.0,
  touristTrips: 22070000, // 接待游客（人次）
  touristTripsGrowth: 11.4,
  aLevelScenicTrips: 14967700, // 16 家 A 级景区接待（人次）
  starHotelTrips: 104200, // 星级饭店接待（人次）
  starHotelRooms: 660,
  inboundTrips: 331050 // 入境游客测算值（按接待游客量约 1.5% 口径）
}

/**
 * 17 个街镇。population 为松江年鉴 2019 公布的 2018-12-31 常住人口（官方口径，
 * 合计 177.9 万人；2025 年末全区常住人口 196.18 万人）；
 * scenicCount 为辖区内主要文旅点位数量，tag 为特色标签。
 */
export const towns = [
  { code: '310117001', name: '岳阳街道', type: '街道', population: 97071, scenicCount: 8, tag: '老城文化' },
  { code: '310117002', name: '永丰街道', type: '街道', population: 112912, scenicCount: 4, tag: '仓城风貌' },
  { code: '310117003', name: '方松街道', type: '街道', population: 128933, scenicCount: 5, tag: '新城核心' },
  { code: '310117004', name: '中山街道', type: '街道', population: 133629, scenicCount: 6, tag: '府城记忆' },
  { code: '310117005', name: '广富林街道', type: '街道', population: 78812, scenicCount: 6, tag: '上海之根' },
  { code: '310117006', name: '九里亭街道', type: '街道', population: 102346, scenicCount: 1, tag: '城市社区' },
  { code: '310117102', name: '泗泾镇', type: '镇', population: 180339, scenicCount: 2, tag: '古镇下塘' },
  { code: '310117103', name: '佘山镇', type: '镇', population: 80764, scenicCount: 12, tag: '山体度假' },
  { code: '310117104', name: '车墩镇', type: '镇', population: 179850, scenicCount: 3, tag: '影视基地' },
  { code: '310117105', name: '新桥镇', type: '镇', population: 191927, scenicCount: 1, tag: '产城融合' },
  { code: '310117106', name: '洞泾镇', type: '镇', population: 77357, scenicCount: 1, tag: '人工智能' },
  { code: '310117107', name: '九亭镇', type: '镇', population: 169126, scenicCount: 1, tag: '商务商业' },
  { code: '310117109', name: '石湖荡镇', type: '镇', population: 49106, scenicCount: 2, tag: '浦江之首' },
  { code: '310117111', name: '新浜镇', type: '镇', population: 32439, scenicCount: 3, tag: '乡村旅游' },
  { code: '310117112', name: '泖港镇', type: '镇', population: 37550, scenicCount: 2, tag: '黄浦江源' },
  { code: '310117113', name: '叶榭镇', type: '镇', population: 75789, scenicCount: 3, tag: '非遗米糕' },
  { code: '310117116', name: '小昆山镇', type: '镇', population: 42284, scenicCount: 3, tag: '二陆故里' }
]

/**
 * A 级景区与主要文旅点位（等级与归属来自 2025 年松江区统计公报与区政府《旅游环境》栏目公布名单）
 * 公报名录：4A 级 10 家 + 3A 级 6 家 = 16 家 A 级景区，2025 年共接待 1496.77 万人次。
 */
export const scenicSpots = [
  { name: '佘山国家森林公园', town: '佘山镇', level: '4A', type: '山体森林', aLevel: true },
  { name: '上海辰山植物园', town: '佘山镇', level: '4A', type: '植物园', aLevel: true },
  { name: '上海欢乐谷', town: '佘山镇', level: '4A', type: '主题乐园', aLevel: true },
  { name: '月湖雕塑公园', town: '佘山镇', level: '4A', type: '艺术公园', aLevel: true },
  { name: '广富林文化遗址', town: '广富林街道', level: '4A', type: '文化遗址', aLevel: true },
  { name: '方塔园', town: '中山街道', level: '4A', type: '古典园林', aLevel: true },
  { name: '醉白池公园', town: '岳阳街道', level: '4A', type: '古典园林', aLevel: true },
  { name: '上海影视乐园', town: '车墩镇', level: '4A', type: '影视基地', aLevel: true },
  { name: '蓝精灵主题乐园', town: '佘山镇', level: '4A', type: '主题乐园', aLevel: true },
  { name: '云堡未来市', town: '广富林街道', level: '4A', type: '文创商业', aLevel: true },
  { name: '浦江之首', town: '石湖荡镇', level: '3A', type: '江河景观', aLevel: true },
  { name: '云间粮仓文创园', town: '中山街道', level: '3A', type: '文创园区', aLevel: true },
  { name: '泗泾古镇', town: '泗泾镇', level: '3A', type: '古镇街区', aLevel: true },
  { name: '佘山精灵之城主题乐园', town: '佘山镇', level: '3A', type: '主题乐园', aLevel: true },
  { name: '上海广富林奇石馆', town: '广富林街道', level: '3A', type: '博物展馆', aLevel: true },
  { name: '江南水稻艺术观光园', town: '小昆山镇', level: '3A', type: '农业观光', aLevel: true },
  { name: '东佘山园', town: '佘山镇', level: '—', type: '山体森林', aLevel: false },
  { name: '西佘山园（佘山天文台）', town: '佘山镇', level: '—', type: '山体宗教', aLevel: false },
  { name: '上海玛雅海滩水公园', town: '佘山镇', level: '—', type: '水上乐园', aLevel: false },
  { name: '天马山（护珠塔）', town: '佘山镇', level: '—', type: '山体森林', aLevel: false },
  { name: '泰晤士小镇', town: '方松街道', level: '—', type: '特色街区', aLevel: false },
  { name: '广富林郊野公园', town: '广富林街道', level: '—', type: '郊野公园', aLevel: false },
  { name: '松南郊野公园', town: '车墩镇', level: '—', type: '郊野公园', aLevel: false },
  { name: '小昆山园（二陆草堂）', town: '小昆山镇', level: '—', type: '文化名山', aLevel: false },
  { name: '仓城历史文化风貌区', town: '永丰街道', level: '—', type: '历史风貌', aLevel: false },
  { name: '大仓桥', town: '永丰街道', level: '—', type: '文化遗址', aLevel: false },
  { name: '松江清真寺', town: '岳阳街道', level: '—', type: '宗教场所', aLevel: false },
  { name: '西林禅寺', town: '岳阳街道', level: '—', type: '宗教场所', aLevel: false },
  { name: '松江唐经幢', town: '中山街道', level: '—', type: '文化遗址', aLevel: false },
  { name: '松江区博物馆', town: '岳阳街道', level: '—', type: '文博场馆', aLevel: false },
  { name: '程十发艺术馆', town: '岳阳街道', level: '—', type: '美术馆', aLevel: false },
  { name: '董其昌书画艺术博物馆', town: '岳阳街道', level: '—', type: '美术馆', aLevel: false },
  { name: '云间会堂文化艺术中心', town: '方松街道', level: '—', type: '文化场馆', aLevel: false },
  { name: '九科绿洲', town: '九亭镇', level: '—', type: '生态公园', aLevel: false },
  { name: '五厍农业休闲观光园', town: '泖港镇', level: '—', type: '农业观光', aLevel: false },
  { name: '橙蓝国际森林营地', town: '泖港镇', level: '—', type: '露营地', aLevel: false },
  { name: '新浜荷花公社', town: '新浜镇', level: '—', type: '乡村旅游', aLevel: false },
  { name: '甪钓湾老街', town: '新浜镇', level: '—', type: '乡村老街', aLevel: false },
  { name: '八十八亩田', town: '叶榭镇', level: '—', type: '乡村旅游', aLevel: false },
  { name: '云间卉谷国际花园中心', town: '叶榭镇', level: '—', type: '花卉商旅', aLevel: false },
  { name: '奥德农庄', town: '车墩镇', level: '—', type: '农业休闲', aLevel: false }
]

/** 16 家 A 级景区名称（用于景区接待量口径校验） */
export const aLevelScenicNames = scenicSpots.filter((s) => s.aLevel).map((s) => s.name)

/** 主要商圈 / 文旅消费场所（街镇归属来自政府公开信息与地图核验；“待补”为暂无公开来源） */
export const businessAreas = [
  { name: '松江印象城', town: '广富林街道', type: '购物中心' },
  { name: '松江万达广场', town: '中山街道', type: '购物中心' },
  { name: '开元地中海商业广场', town: '方松街道', type: '购物中心' },
  { name: '乐都路商圈（乐都商业广场）', town: '岳阳街道', type: '商业广场' },
  { name: '松江老城庙前街', town: '岳阳街道', type: '商业街区' },
  { name: '九峰源广场', town: '岳阳街道', type: '商业广场' },
  { name: '泗泾塘商业街（泗泾烟火夜市）', town: '泗泾镇', type: '商业街区' },
  { name: '佘山宝乐汇', town: '佘山镇', type: '购物中心' },
  { name: '云间粮仓文创园', town: '中山街道', type: '文创街区' },
  { name: '五龙商业广场（五龙香港街）', town: '中山街道', type: '商业广场' },
  { name: '松江大学城文汇路商圈', town: '广富林街道', type: '商圈' },
  { name: '泰晤士小镇商业街', town: '方松街道', type: '特色街区' },
  { name: '云间卉谷国际花园中心', town: '叶榭镇', type: '花卉商旅' },
  { name: '鹿都国际商业广场', town: '待补', type: '购物中心' },
  { name: '九亭U天地', town: '九亭镇', type: '购物中心' },
  { name: '飞航吾悦广场', town: '待补', type: '购物中心' },
  { name: '塞纳新天地', town: '待补', type: '商业街区' },
  { name: '大橘邻里', town: '待补', type: '社区商业' }
]

/**
 * 主要住宿设施。公报口径：2025 年末星级旅游饭店 2 家（五星 1 家、四星 1 家，共 660 间客房）；
 * 2024 年全区酒店宾馆共 532 家。
 * 注：公报未公布挂牌星级饭店名单，下列星级为按公开信息标注，最终以区文旅局名录为准。
 */
export const hotels = [
  { name: '上海佘山世茂洲际酒店（深坑酒店）', town: '佘山镇', level: '五星级', rooms: 336, type: '星级饭店', note: '全球人工海拔最低酒店（-88 米）' },
  { name: '上海松江开元名都大酒店', town: '方松街道', level: '四星级', rooms: 324, type: '星级饭店' },
  { name: '上海佘山世茂艾美酒店', town: '佘山镇', level: '高端度假', rooms: 326, type: '度假酒店' },
  { name: '上海松江假日酒店', town: '中山街道', level: '高端商务', rooms: 268, type: '商务酒店' },
  { name: '广富林希尔顿酒店', town: '广富林街道', level: '高端商务', rooms: 246, type: '商务酒店' },
  { name: '广富林宰相府酒店', town: '广富林街道', level: '文化主题', rooms: 180, type: '主题酒店' },
  { name: '东方佘山翰悦阁大酒店', town: '佘山镇', level: '高端度假', rooms: 210, type: '度假酒店' },
  { name: '浦江之首九墨二序乡村民宿', town: '石湖荡镇', level: '乡村民宿', rooms: 24, type: '民宿' }
]

/** 松江文旅重点企业（产业洞察模块用） */
export const companies = [
  { name: '上海欢乐谷', town: '佘山镇', category: '景区运营', scale: '大型' },
  { name: '上海辰山植物园', town: '佘山镇', category: '景区运营', scale: '大型' },
  { name: '上海影视乐园', town: '车墩镇', category: '影视文旅', scale: '大型' },
  { name: '上海广富林文化发展有限公司', town: '广富林街道', category: '文化运营', scale: '大型' },
  { name: '松江印象城', town: '方松街道', category: '商业运营', scale: '大型' },
  { name: '上海佘山世茂洲际酒店', town: '佘山镇', category: '住宿餐饮', scale: '大型' },
  { name: '云间粮仓文创发展有限公司', town: '永丰街道', category: '文创园区', scale: '中型' },
  { name: '上海蓝精灵主题乐园', town: '佘山镇', category: '景区运营', scale: '中型' },
  { name: '泗泾古镇旅游发展有限公司', town: '泗泾镇', category: '古镇运营', scale: '中型' },
  { name: '上海浦江之首文旅发展有限公司', town: '石湖荡镇', category: '乡村文旅', scale: '中型' }
]

/** 假期定义（与参考站 el-cascader 的假日结构一致，按时间倒序，最新假期在首位） */
export const holidays = [
  { value: '2026-national-day', label: '2026年国庆节', children: [
    { value: '2026-national-day-all', label: '2026年国庆节' }
  ] },
  { value: '2025-national-day', label: '2025年国庆中秋假期', children: [
    { value: '2025-10-01', label: '10月1日' }, { value: '2025-10-02', label: '10月2日' },
    { value: '2025-10-03', label: '10月3日' }, { value: '2025-10-04', label: '10月4日' },
    { value: '2025-10-05', label: '10月5日' }, { value: '2025-10-06', label: '10月6日' },
    { value: '2025-10-07', label: '10月7日' }, { value: '2025-10-08', label: '10月8日' }
  ] },
  { value: '2025-spring-festival', label: '2025年春节假期', children: [
    { value: '2025-01-28', label: '1月28日' }, { value: '2025-01-29', label: '1月29日' },
    { value: '2025-01-30', label: '1月30日' }, { value: '2025-01-31', label: '1月31日' },
    { value: '2025-02-01', label: '2月1日' }, { value: '2025-02-02', label: '2月2日' },
    { value: '2025-02-03', label: '2月3日' }, { value: '2025-02-04', label: '2月4日' }
  ] },
  { value: '2025-may-day', label: '2025年五一假期', children: [
    { value: '2025-05-01', label: '5月1日' }, { value: '2025-05-02', label: '5月2日' },
    { value: '2025-05-03', label: '5月3日' }, { value: '2025-05-04', label: '5月4日' },
    { value: '2025-05-05', label: '5月5日' }
  ] },
  { value: '2025-dragon-boat', label: '2025年端午假期', children: [
    { value: '2025-05-31', label: '5月31日' }, { value: '2025-06-01', label: '6月1日' },
    { value: '2025-06-02', label: '6月2日' }
  ] }
]

/** 近三年全区核心指标实测值（来源：松江区统计公报 2023 / 2024 / 2025） */
export const historyIndicators = [
  { year: 2023, gdp: 174003000000, tourismRevenue: 15834000000, touristTrips: 20640300, retailTotal: 69896000000, hotelAccommodation: 1745800, accommodationAdded: 1863000000 },
  { year: 2024, gdp: 227623000000, tourismRevenue: 15001000000, touristTrips: 19815700, retailTotal: 72663000000, hotelAccommodation: 1644400, accommodationAdded: 2721000000 },
  { year: 2025, gdp: 237542000000, tourismRevenue: 15756000000, touristTrips: 22070000, retailTotal: 85467000000, hotelAccommodation: null, accommodationAdded: 2845000000 }
]

/** 2025 年一季度实测（来源：上海市文旅局） */
export const quarterIndicators = {
  year: 2025,
  quarter: 'Q1',
  tourismRevenue: 4008000000, // 40.08 亿元
  touristTrips: 4904000, // 490.4 万人次
  totalConsumption: 13522000000 // 全要素旅游消费交易总额 135.22 亿元
}

/**
 * 重点假日文旅接待实测数据（纳入监测景区点口径，来源：松江区政府官网 / 上海市政府官网）
 * 说明：visitors 单位为万人次；revenue 单位为万元（仅含公布营业收入的口径）。
 */
export const holidayStatistics = [
  { holiday: '春节', year: 2024, visitors: 70.23, monitored: 17, revenue: 2069.46, source: '松江区政府官网 2024-02-20' },
  { holiday: '春节', year: 2025, visitors: 56.95, monitored: 19, revenue: null, source: '上海市政府官网 2025-02-06' },
  { holiday: '五一', year: 2025, visitors: 70.57, monitored: 20, revenue: 2179.82, source: '上海市文旅局官网 2025-05' },
  { holiday: '端午', year: 2025, visitors: 22.81, monitored: 20, revenue: null, source: '上海市政府官网 2025-06-05' },
  { holiday: '国庆', year: 2024, visitors: 59.39, monitored: 18, revenue: 2394, source: '松江区政府官网 2024-10-09' },
  { holiday: '国庆中秋', year: 2025, visitors: 96.59, monitored: 20, revenue: null, source: '松江区政府官网 2025-10-10' },
  // 2026 年国庆节为演示口径（见 src/mock/holiday2026.js），接待量为 A 级景区与主要点位测算值，营收 13.69 亿元（=136900 万元）
  { holiday: '国庆', year: 2026, visitors: 103.52, monitored: 20, revenue: 136900, source: '演示口径 · data-picture 参考图 + 推演' }
]

export default {
  REGION,
  DISTRICT_INDICATORS,
  historyIndicators,
  quarterIndicators,
  holidayStatistics,
  towns,
  scenicSpots,
  aLevelScenicNames,
  businessAreas,
  hotels,
  companies,
  holidays
}
