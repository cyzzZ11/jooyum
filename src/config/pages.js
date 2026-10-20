/**
 * 各子页面骨架配置。
 * 首期每个模块都具备与参考站一致的面板/图表结构，数据接入后逐页替换为专属实现。
 * 字段：title 页面标题，desc 口径说明，kpis 指标位，charts 图表位
 */
import {
  businessAreas,
  companies,
  hotels,
  holidayStatistics,
  scenicSpots,
  towns
} from '@/mock/songjiang'

const townNames = towns.map((t) => t.name)

export const pageRegistry = {
  /* ================= 文旅态势感知 ================= */
  '/main/trend/fee': {
    title: '旅游消费',
    desc: '按街镇、业态拆解松江区旅游消费规模与结构，口径：旅游收入 157.56 亿元（2025 年）',
    controls: [
      { key: 'monitor', label: '监测类型', options: [{ name: '游客监测', value: 'tourist' }, { name: '消费监测', value: 'consume' }] }
    ],
    kpis: [
      { label: '旅游收入', value: '157.56', unit: '亿元', tb: 5.0 },
      { label: '社会消费品零售总额', value: '854.67', unit: '亿元', tb: 11.8 },
      { label: '住宿餐饮业增加值', value: '28.45', unit: '亿元', tb: -0.3 },
      { label: '人均旅游消费', value: '713.9', unit: '元/人次', tb: -5.7 }
    ],
    charts: [
      { name: '旅游消费月度趋势', type: 'line' },
      { name: '消费业态结构', type: 'pie', cats: ['景区门票', '住宿', '餐饮', '购物', '交通', '文化娱乐'] },
      { name: '街镇消费排行', type: 'barRank', cats: townNames },
      { name: '重点商圈消费对比', type: 'bar', cats: businessAreas.slice(0, 8).map((b) => b.name) }
    ]
  },
  '/main/trend/city': {
    title: '国内旅游',
    desc: '国内游客来源地、出行方式与停留时长分析，口径：接待游客 2207 万人次（2025 年）',
    controls: [
      {
        key: 'visitorType',
        label: '游客类型',
        options: [
          { name: '国内游客', value: 'gn' },
          { name: '入境游客', value: 'rj' },
          { name: '中国港澳台游客', value: 'gat' },
          { name: '国际游客', value: 'gj' }
        ]
      },
      { key: 'monitor', label: '监测类型', options: [{ name: '游客监测', value: 'tourist' }, { name: '消费监测', value: 'consume' }] }
    ],
    kpis: [
      { label: '接待游客量', value: '2207', unit: '万人次', tb: 11.4 },
      { label: 'A级景区接待', value: '1496.77', unit: '万人次', tb: 9.2 },
      { label: '旅游饭店住宿接待', value: '164.44', unit: '万人次', tb: -5.8 },
      { label: '过夜游客占比', value: '38.6', unit: '%', tb: 2.4 }
    ],
    charts: [
      { name: '接待游客月度趋势', type: 'line' },
      {
        name: '客源地分布',
        type: 'pie',
        cats: ['本市（松江周边）', '江苏', '浙江', '安徽', '河南', '山东', '其他省市']
      },
      { name: '街镇客流排行', type: 'barRank', cats: townNames },
      { name: '重点景区客流排行', type: 'barRank', cats: scenicSpots.slice(0, 10).map((s) => s.name) }
    ]
  },
  '/main/trend/entry': {
    title: '入境旅游',
    desc: '入境客源结构与消费特征。注：松江区统计公报未单列入境游客指标，此处为测算值，待接入边检/运营商数据',
    kpis: [
      { label: '接待入境游客量', value: '33.11', unit: '万人次', tb: 8.6 },
      { label: '入境游客消费', value: '6.82', unit: '亿元', tb: 12.4 },
      { label: '入境过夜率', value: '64.2', unit: '%', tb: 3.1 },
      { label: '主要客源地数', value: '152', unit: '个', tb: 0 }
    ],
    charts: [
      { name: '入境游客月度趋势', type: 'line' },
      {
        name: '客源地结构',
        type: 'pie',
        cats: ['中国台湾', '中国香港', '美国', '日本', '韩国', '新加坡', '其他']
      },
      { name: '入境游热门景区', type: 'barRank', cats: scenicSpots.slice(0, 8).map((s) => s.name) },
      { name: '入境游客停留时长分布', type: 'bar', cats: ['1天', '2天', '3天', '4-7天', '8天以上'] }
    ]
  },
  '/main/trend/scenic': {
    title: '景区旅游',
    desc: '16 家 A 级景区客流监测，口径：1496.77 万人次（2025 年，松江区统计公报）',
    controls: [
      { key: 'scope', label: '景区范围', options: [{ name: '全部景区', value: 'all' }, { name: 'A级景区', value: 'a' }] }
    ],
    kpis: [
      { label: '景区累计接待', value: '1496.77', unit: '万人次', tb: 9.2 },
      { label: 'A级景区数量', value: '16', unit: '家', tb: 0 },
      { label: '4A级景区数量', value: '10', unit: '家', tb: 0 },
      { label: '单个景区均值', value: '93.55', unit: '万人次', tb: 9.2 }
    ],
    charts: [
      { name: '景区接待月度趋势', type: 'line' },
      { name: '景区等级结构', type: 'pie', cats: ['4A级景区', '3A级景区'] },
      { name: '景区接待量排行', type: 'barRank', cats: scenicSpots.slice(0, 12).map((s) => s.name) },
      {
        name: '景区所在街镇分布',
        type: 'bar',
        cats: ['佘山镇', '广富林街道', '中山街道', '岳阳街道', '车墩镇', '泗泾镇', '小昆山镇', '石湖荡镇']
      }
    ]
  },
  '/main/trend/business': {
    title: '商圈游客',
    desc: '重点商圈客流与消费联动监测，覆盖印象城、万达、开元地中海等 16 个重点商业场所',
    controls: [
      { key: 'scope', label: '商圈范围', options: [{ name: '全部商圈', value: 'all' }, { name: '重点商圈', value: 'key' }] }
    ],
    kpis: [
      { label: '商圈累计客流', value: '3250', unit: '万人次', tb: 6.8 },
      { label: '重点商圈数量', value: '16', unit: '个', tb: 0 },
      { label: '商圈夜间客流占比', value: '41.2', unit: '%', tb: 4.5 },
      { label: '客流转化率', value: '18.6', unit: '%', tb: 1.2 }
    ],
    charts: [
      { name: '商圈客流月度趋势', type: 'line' },
      { name: '商圈客流时段分布', type: 'bar', cats: Array.from({ length: 12 }, (_, i) => `${i * 2}:00`) },
      { name: '商圈客流排行', type: 'barRank', cats: businessAreas.slice(0, 10).map((b) => b.name) },
      { name: '商圈客流同比', type: 'bar', cats: businessAreas.slice(0, 6).map((b) => b.name) }
    ]
  },
  '/main/trend/real': {
    title: '实时客流',
    desc: '重点景区、商圈实时客流与承载率监测（数据刷新频率 5 分钟）',
    kpis: [
      { label: '当前在园人数', value: '3.86', unit: '万人', tb: 7.4 },
      { label: '今日累计客流', value: '12.4', unit: '万人次', tb: 9.1 },
      { label: '瞬时承载率', value: '62.8', unit: '%', tb: 5.2 },
      { label: '预警点位', value: '1', unit: '个', tb: 0 }
    ],
    charts: [
      { name: '24小时客流曲线', type: 'line' },
      { name: '点位实时承载率', type: 'barRank', cats: scenicSpots.slice(0, 8).map((s) => s.name) },
      { name: '重点点位实时人数', type: 'bar', cats: scenicSpots.slice(0, 6).map((s) => s.name) },
      { name: '实时客流构成', type: 'pie', cats: ['本地居民', '本市其他区', '外省市游客', '入境游客'] }
    ]
  },
  '/main/trend/compare': {
    title: '对比分析',
    desc: '支持街镇、景区、商圈、时段多维度对比，以及当年 / 去年同期对比',
    kpis: [
      { label: '本区接待游客', value: '2207', unit: '万人次', tb: 11.4 },
      { label: '去年同期', value: '1981.57', unit: '万人次', tb: -4.0 },
      { label: '本区旅游收入', value: '157.56', unit: '亿元', tb: 5.0 },
      { label: '去年同期', value: '150.01', unit: '亿元', tb: -5.3 }
    ],
    charts: [
      { name: '街镇客流对比', type: 'bar', cats: townNames.slice(0, 10) },
      { name: '景区接待对比', type: 'bar', cats: scenicSpots.slice(0, 8).map((s) => s.name) },
      { name: '三年旅游收入对比', type: 'bar', cats: ['2023年', '2024年', '2025年'] },
      { name: '三年接待游客对比', type: 'bar', cats: ['2023年', '2024年', '2025年'] }
    ]
  },

  /* ================= 文旅舆情监测 ================= */
  '/main/sentiment/analysis': {
    title: '舆情分析',
    desc: '全网文旅舆情总量、情感倾向与热词分析（演示数据，待接入舆情采集接口）',
    kpis: [
      { label: '舆情总量', value: '12,486', unit: '条', tb: 8.4 },
      { label: '正面占比', value: '78.6', unit: '%', tb: 3.2 },
      { label: '负面占比', value: '3.8', unit: '%', tb: -1.1 },
      { label: '活跃媒体数', value: '286', unit: '家', tb: 5.6 }
    ],
    charts: [
      { name: '舆情总量趋势', type: 'line' },
      {
        name: '情感倾向分布',
        type: 'pie',
        cats: ['正面', '中性', '负面', '其他']
      },
      {
        name: '热门话题排行',
        type: 'barRank',
        cats: ['上海之根·广富林', '佘山国家森林公园', '辰山植物园花展', '欢乐谷万圣季', '泗泾古镇', '云间粮仓', '醉白池菊花展', '泰晤士小镇', '浦江之首', '方塔园']
      },
      {
        name: '舆情来源渠道',
        type: 'pie',
        cats: ['新闻媒体', '微信公众号', '微博', '抖音短视频', '小红书', '论坛贴吧', '其他']
      }
    ]
  },
  '/main/sentiment/media': {
    title: '媒体分析',
    desc: '主流媒体与自媒体传播力分析',
    kpis: [
      { label: '媒体报道量', value: '3,542', unit: '篇', tb: 6.8 },
      { label: '传播触达量', value: '1,286', unit: '万次', tb: 12.6 },
      { label: '央媒报道量', value: '186', unit: '篇', tb: 9.4 },
      { label: '自媒体占比', value: '62.4', unit: '%', tb: 2.8 }
    ],
    charts: [
      { name: '媒体传播趋势', type: 'line' },
      { name: '媒体渠道分布', type: 'pie', cats: ['央媒', '市级媒体', '区级媒体', '商业门户', '自媒体'] },
      {
        name: '媒体影响力排行',
        type: 'barRank',
        cats: ['上观新闻', '新民晚报', '澎湃新闻', '乐游上海', '上海松江', '东方网', '文汇报', '新闻晨报']
      },
      { name: '传播区域分布', type: 'bar', cats: ['本市', '长三角', '国内其他', '港澳台', '境外'] }
    ]
  },
  '/main/sentiment/area': {
    title: '区域分析',
    desc: '按街镇拆解舆情分布与风险等级',
    kpis: [
      { label: '涉及街镇数', value: '17', unit: '个', tb: 0 },
      { label: '舆情最集中区域', value: '佘山镇', unit: '', tb: 0 },
      { label: '区域正面率', value: '76.2', unit: '%', tb: 2.1 },
      { label: '区域风险提示', value: '4', unit: '条', tb: -2 }
    ],
    charts: [
      { name: '街镇舆情量排行', type: 'barRank', cats: townNames },
      { name: '区域情感倾向', type: 'pie', cats: ['正面', '中性', '负面'] },
      { name: '街镇舆情趋势', type: 'line' },
      { name: '区域风险等级分布', type: 'bar', cats: ['低风险', '一般风险', '较大风险', '重大风险'] }
    ]
  },
  '/main/sentiment/list': {
    title: '舆情列表',
    desc: '原始舆情明细，支持按区域、情感、时间筛选',
    table: true,
    charts: []
  },
  '/main/sentiment/center': {
    title: '预警中心',
    desc: '风险预警规则与处置流程跟踪',
    kpis: [
      { label: '待处置预警', value: '3', unit: '条', tb: -1 },
      { label: '本月预警总数', value: '28', unit: '条', tb: 6.2 },
      { label: '平均处置时长', value: '4.2', unit: '小时', tb: -12.5 },
      { label: '处置完成率', value: '92.8', unit: '%', tb: 3.1 }
    ],
    charts: [
      { name: '预警数量趋势', type: 'line' },
      { name: '预警类型分布', type: 'pie', cats: ['客流拥挤', '服务投诉', '价格争议', '安全事件', '环境卫生', '舆情负面'] },
      { name: '预警等级分布', type: 'bar', cats: ['蓝色', '黄色', '橙色', '红色'] },
      { name: '各街镇处置效率', type: 'bar', cats: townNames.slice(0, 8) }
    ]
  },

  /* ================= 文旅产业洞察 ================= */
  '/main/industry/overview': {
    title: '产业总览',
    desc: '松江区文旅体量与市场主体概览，口径来源：2025 年松江区统计公报',
    kpis: [
      { label: '地区生产总值', value: '2375.42', unit: '亿元', tb: 5.2 },
      { label: '第三产业增加值', value: '1408.05', unit: '亿元', tb: 7.5 },
      { label: '住宿餐饮业增加值', value: '28.45', unit: '亿元', tb: -0.3 },
      { label: '文旅市场主体', value: '1,286', unit: '家', tb: 4.6 }
    ],
    charts: [
      { name: '文旅产业增加值趋势', type: 'line' },
      { name: '产业构成', type: 'pie', cats: ['景区运营', '住宿餐饮', '文化娱乐', '旅游购物', '交通服务', '文创产业'] },
      { name: '重点企业规模分布', type: 'bar', cats: ['大型', '中型', '小型', '微型'] },
      { name: '街镇市场主体分布', type: 'barRank', cats: townNames }
    ]
  },
  '/main/industry/map': {
    title: '产业图谱',
    desc: '以“吃住行游购娱”六要素串联的文旅产业链图谱',
    kpis: [
      { label: '产业链环节', value: '6', unit: '个', tb: 0 },
      { label: '重点企业', value: companies.length, unit: '家', tb: 0 },
      { label: '酒店宾馆', value: '532', unit: '家', tb: -3.2 },
      { label: 'A级景区', value: '16', unit: '家', tb: 0 }
    ],
    charts: [
      { name: '六要素企业数量', type: 'bar', cats: ['餐饮', '住宿', '交通', '游览', '购物', '娱乐'] },
      { name: '产业链结构', type: 'pie', cats: ['上游资源供应', '中游运营服务', '下游渠道分销', '配套支撑服务'] },
      { name: '重点企业排行', type: 'barRank', cats: companies.map((c) => c.name) },
      { name: '产业集聚度', type: 'bar', cats: townNames.slice(0, 8) }
    ]
  },
  '/main/industry/analysis': {
    title: '链数分析',
    desc: '产业链数据指标拆解与关联分析',
    kpis: [
      { label: '产业链完整度', value: '86.4', unit: '%', tb: 2.2 },
      { label: '龙头企业带动比', value: '42.6', unit: '%', tb: 3.4 },
      { label: '企业平均营收', value: '1,286', unit: '万元', tb: 5.1 },
      { label: '新增市场主体', value: '32,877', unit: '户', tb: -12.4 }
    ],
    charts: [
      { name: '产业链环节强度', type: 'bar', cats: ['上游供应商', '中游运营', '下游分销', '配套服务'] },
      { name: '企业营收分布', type: 'pie', cats: ['1000万以上', '500-1000万', '200-500万', '200万以下'] },
      { name: '链上企业增长趋势', type: 'line' },
      { name: '环节关联度', type: 'bar', cats: ['供应—运营', '运营—渠道', '渠道—配套', '供应—配套'] }
    ]
  },
  '/main/industry/company': {
    title: '企业监测',
    desc: '重点文旅企业运行监测（含住宿设施与景区运营主体）',
    kpis: [
      { label: '监测企业数', value: String(companies.length + hotels.length), unit: '家', tb: 2.4 },
      { label: '星级饭店', value: '2', unit: '家', tb: -33.3 },
      { label: '星级饭店客房数', value: '660', unit: '间', tb: 0 },
      { label: '星级饭店接待', value: '10.42', unit: '万人次', tb: 0 }
    ],
    charts: [
      { name: '重点企业营收趋势', type: 'line' },
      { name: '住宿设施等级结构', type: 'pie', cats: ['五星级', '四星级', '高端度假', '商务酒店', '民宿'] },
      { name: '企业监测排行', type: 'barRank', cats: [...companies.slice(0, 5), ...hotels.slice(0, 3)].map((c) => c.name) },
      { name: '企业经营指标对比', type: 'bar', cats: ['营收', '接待量', '客房出租率', '人均消费'] }
    ]
  },

  /* ================= 文旅资源图谱 ================= */
  '/main/source/tree': {
    title: '资源图谱',
    desc: `文旅资源分类分级目录，已归集 ${scenicSpots.length} 个文旅点位、${businessAreas.length} 个消费场所、${hotels.length} 处住宿设施`,
    kpis: [
      { label: '文旅资源总数', value: String(scenicSpots.length + businessAreas.length + hotels.length), unit: '个', tb: 3.6 },
      { label: 'A级景区', value: '16', unit: '个', tb: 0 },
      { label: '文博场馆', value: '6', unit: '个', tb: 0 },
      { label: '乡村文旅点位', value: '9', unit: '个', tb: 12.5 }
    ],
    charts: [
      { name: '资源类型分布', type: 'pie', cats: ['A级景区', '文博场馆', '特色街区', '郊野公园', '乡村文旅', '宗教场所', '商业文旅'] },
      { name: '街镇资源数量', type: 'barRank', cats: townNames },
      { name: '资源等级结构', type: 'bar', cats: ['4A级', '3A级', '无级别'] },
      {
        name: '资源类型明细',
        type: 'bar',
        cats: ['山体森林', '古典园林', '主题乐园', '文化遗址', '古镇街区', '农业观光']
      }
    ]
  },
  '/main/source/map': {
    title: '资源一张图',
    desc: '基于地理信息的文旅资源空间分布（底图待接入，点位数据已就绪）',
    map: true,
    kpis: [
      { label: '上图点位', value: String(scenicSpots.length), unit: '个', tb: 0 },
      { label: '覆盖街镇', value: '14', unit: '个', tb: 0 },
      { label: '山体资源', value: '5', unit: '处', tb: 0 },
      { label: '水系资源', value: '4', unit: '处', tb: 0 }
    ],
    charts: [
      { name: '点位分布密度', type: 'barRank', cats: townNames },
      { name: '资源类型分布', type: 'pie', cats: ['A级景区', '文博场馆', '特色街区', '郊野公园', '乡村文旅', '其他'] }
    ]
  },
  '/main/source/analysis': {
    title: '资源分析',
    desc: '资源与客流的匹配度、利用效率分析',
    kpis: [
      { label: '资源利用率', value: '72.4', unit: '%', tb: 3.6 },
      { label: '高客流资源占比', value: '31.2', unit: '%', tb: 2.4 },
      { label: '待提升资源', value: '8', unit: '个', tb: -2 },
      { label: '资源客流承载比', value: '1.47', unit: '万人次/个', tb: 9.2 }
    ],
    charts: [
      { name: '资源与客流匹配度', type: 'bar', cats: townNames.slice(0, 8) },
      { name: '资源利用效率分布', type: 'pie', cats: ['高效利用', '正常利用', '利用不足', '尚未开发'] },
      { name: '资源客流贡献趋势', type: 'line' },
      { name: '资源类型客流贡献', type: 'bar', cats: ['A级景区', '文博场馆', '特色街区', '郊野公园', '乡村文旅', '商业文旅'] }
    ]
  },

  /* ================= 假日客流分析 ================= */
  '/main/holiday/overview': {
    title: '假日总览',
    desc: '重点假日文旅接待实测数据（纳入监测景区点口径，来源：松江区政府官网 / 上海市政府官网）',
    kpis: holidayStatistics.slice(-4).map((h) => ({
      label: `${h.year}年${h.holiday}接待`,
      value: String(h.visitors),
      unit: '万人次',
      tb: 0
    })),
    charts: [
      { name: '假日接待量对比', type: 'bar', cats: holidayStatistics.map((h) => `${h.year}${h.holiday}`) },
      { name: '假日监测点数', type: 'bar', unit: '个', cats: holidayStatistics.map((h) => `${h.year}${h.holiday}`) },
      { name: '假日客流趋势', type: 'line' },
      { name: '假期营收情况', type: 'bar', unit: '万元', cats: holidayStatistics.filter((h) => h.revenue).map((h) => `${h.year}${h.holiday}`) }
    ]
  },
  '/main/holiday/city': {
    title: '城市客流',
    desc: '假日期间入松客流来源与出行方式分析',
    kpis: [
      { label: '2025国庆中秋接待', value: '96.59', unit: '万人次', tb: 62.6 },
      { label: '本市游客占比', value: '58.4', unit: '%', tb: 1.2 },
      { label: '外省市游客占比', value: '41.6', unit: '%', tb: 2.8 },
      { label: '自驾出行占比', value: '46.2', unit: '%', tb: 3.4 }
    ],
    charts: [
      { name: '假日客流日趋势', type: 'line' },
      { name: '客源地结构', type: 'pie', cats: ['本市', '江苏', '浙江', '安徽', '其他省市', '境外'] },
      { name: '出行方式分布', type: 'pie', cats: ['自驾', '轨交', '公交', '旅游大巴', '其他'] },
      { name: '入松通道客流', type: 'bar', cats: ['G60 高速', '轨交9号线', '沪松公路', '松江枢纽', '其他'] }
    ]
  },
  '/main/holiday/scenic': {
    title: '景区客流',
    desc: '假日重点景区客流与承载情况',
    kpis: [
      { label: '监测景区数', value: '20', unit: '个', tb: 11.1 },
      { label: '景区假日接待', value: '96.59', unit: '万人次', tb: 62.6 },
      { label: '单景区均值', value: '4.83', unit: '万人次', tb: 46.4 },
      { label: '峰值承载率', value: '78.6', unit: '%', tb: 4.2 }
    ],
    charts: [
      { name: '景区假日客流排行', type: 'barRank', cats: scenicSpots.slice(0, 10).map((s) => s.name) },
      { name: '景区日客流趋势', type: 'line' },
      { name: '景区承载率', type: 'bar', cats: scenicSpots.slice(0, 8).map((s) => s.name) },
      { name: '景区类型客流分布', type: 'pie', cats: ['主题乐园', '山体森林', '文化遗址', '古典园林', '古镇街区', '乡村文旅'] }
    ]
  },
  '/main/holiday/fee': {
    title: '门票收入',
    desc: '假日门票及二次消费收入监测（口径：有门票收入景区营业收入）',
    kpis: [
      { label: '2025五一门票收入', value: '2179.82', unit: '万元', tb: 5.3 },
      { label: '门票收入景区数', value: '11', unit: '个', tb: 0 },
      { label: '2024国庆营业收入', value: '2394', unit: '万元', tb: 0 },
      { label: '人均门票消费', value: '30.9', unit: '元', tb: -8.2 }
    ],
    charts: [
      { name: '假日门票收入对比', type: 'bar', cats: ['2024春节', '2024国庆', '2025五一', '2025端午'] },
      { name: '景区门票收入排行', type: 'barRank', cats: scenicSpots.slice(0, 8).map((s) => s.name) },
      { name: '门票与二次消费结构', type: 'pie', cats: ['门票收入', '餐饮', '购物', '娱乐', '住宿'] },
      { name: '门票收入趋势', type: 'line' }
    ]
  },

  /* ================= 特色业态专题 ================= */
  '/main/special/theme': {
    title: '特色业态',
    desc: '松江“一镇一品”文旅特色业态：影视文旅、古镇文旅、乡村文旅、研学旅游等',
    kpis: [
      { label: '特色业态类型', value: '6', unit: '类', tb: 0 },
      { label: '特色点位', value: '42', unit: '个', tb: 6.4 },
      { label: '乡村文旅点位', value: '9', unit: '个', tb: 12.5 },
      { label: '研学基地', value: '7', unit: '个', tb: 16.7 }
    ],
    charts: [
      { name: '特色业态客流趋势', type: 'line' },
      { name: '特色业态构成', type: 'pie', cats: ['影视文旅', '古镇文旅', '乡村文旅', '研学旅游', '康养度假', '夜间经济'] },
      { name: '街镇特色点位分布', type: 'barRank', cats: townNames },
      { name: '特色业态客流排行', type: 'barRank', cats: ['影视文旅', '古镇文旅', '乡村文旅', '研学旅游', '康养度假', '夜间经济'] }
    ]
  },
  '/main/special/night': {
    title: '夜间经济',
    desc: '夜间文旅消费集聚区客流与营业监测（18:00-24:00 口径）',
    kpis: [
      { label: '夜间客流', value: '1340', unit: '万人次', tb: 9.6 },
      { label: '夜间客流占比', value: '41.2', unit: '%', tb: 4.5 },
      { label: '夜间集聚区', value: '8', unit: '个', tb: 0 },
      { label: '夜间营业商户', value: '2,860', unit: '家', tb: 6.2 }
    ],
    charts: [
      { name: '夜间客流时段分布', type: 'bar', cats: ['18时', '19时', '20时', '21时', '22时', '23时', '24时'] },
      { name: '夜间客流趋势', type: 'line' },
      { name: '夜间集聚区客流排行', type: 'barRank', cats: businessAreas.slice(0, 8).map((b) => b.name) },
      { name: '夜间消费结构', type: 'pie', cats: ['餐饮', '购物', '文化娱乐', '景区夜游', '住宿', '其他'] }
    ]
  }
}

export default pageRegistry
