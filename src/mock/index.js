/**
 * Mock 数据路由表：与 src/utils/request.js 中的接口路径一一对应。
 * dataMode = 'api' 时该文件不参与运行。
 */
import {
  buildBreakRank,
  buildEntrySources,
  buildHotRank,
  buildHourlyFlow,
  buildStatistics,
  buildTrend
} from './overview'
import { REGION, holidays, scenicSpots, towns } from './songjiang'

const handlers = {
  '/travel/statistics': (p) => buildStatistics(p),
  '/travel/rank/hot': (p) => buildHotRank(p),
  '/travel/rank/break': (p) => buildBreakRank(p),
  '/travel/trend': (p) => buildTrend(p.metric || 'city', p.dateType || 'year', p),
  '/travel/area/tree': () => ({
    province: [{ code: '310000', name: '上海市' }],
    city: [{ code: '310100', name: '上海市' }],
    district: [{ code: REGION.districtCode, name: REGION.district }],
    town: towns.map((t) => ({ code: t.code, name: t.name, type: t.type }))
  }),
  '/travel/holiday/list': () => holidays,
  '/travel/entry/source': () => buildEntrySources(),
  '/travel/flow/hourly': (p) => buildHourlyFlow(p.seed || 'hourly'),
  '/travel/scenic/list': () => scenicSpots,
  '/travel/town/list': () => towns
}

/** 统一 mock 入口：未命中路径返回空对象并给出提示，避免页面白屏 */
export function getMock(url, params = {}) {
  const key = String(url).split('?')[0]
  const handler = handlers[key]
  if (!handler) {
    // eslint-disable-next-line no-console
    console.warn(`[mock] 未定义的接口：${key}，请在 src/mock/index.js 中补充`)
    return {}
  }
  return handler(params)
}

export default handlers
