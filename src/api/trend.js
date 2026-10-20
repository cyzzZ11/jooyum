/**
 * 接口定义层（松江区口径）。
 * 命名对齐参考站 smart-decision 服务的业务分组，便于后续直接替换 baseUrl 联调。
 */
import { get } from '@/utils/request'

/** 四大指标卡统计值 */
export const fetchStatistics = (params) =>
  get('/travel/statistics', { ...params }, { delay: 200 })

/** 热门排行（消费街镇 / 旅游街镇 / 入境街镇 / 景区） */
export const fetchHotRank = (params) => get('/travel/rank/hot', { ...params })

/** 高频态势（突破榜 + 趋势） */
export const fetchBreakRank = (params) => get('/travel/rank/break', { ...params })

/** 趋势序列（按指标分别取） */
export const fetchTrend = (metric, params) => get('/travel/trend', { metric, ...params })

/** 区域/街镇基础列表 */
export const fetchAreaTree = (params) => get('/travel/area/tree', { ...params }, { delay: 80 })

/** 假日日历（供 el-cascader 使用） */
export const fetchHolidays = (params) => get('/travel/holiday/list', { ...params }, { delay: 60 })

/** 聚合加载：态势总览页一次性取数 */
export async function fetchOverview(params) {
  const [statistics, hot, breakData] = await Promise.all([
    fetchStatistics(params),
    fetchHotRank(params),
    fetchBreakRank(params)
  ])
  return { statistics, hot, break: breakData }
}
