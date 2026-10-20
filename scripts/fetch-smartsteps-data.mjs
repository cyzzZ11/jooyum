/**
 * 批量拉取「节假日游客大数据监测平台」松江区 / 上海市 2026 国庆节数据并归档。
 *
 * 前置：
 *   1. 调试 Chrome 已打开 `https://jice.smartsteps.com/travel/` 并已登录（端口 9222）；
 *   2. 已通过 `node scripts/capture-smartsteps.mjs start` 或手动登录建立会话。
 *
 * 用法：node scripts/fetch-smartsteps-data.mjs [输出目录]
 *
 * 输出：
 *   data-source/raw/<日期>/api/<name>.json      每个接口的原始返回（含查询条件，便于复现）
 *   data-source/raw/<日期>/manifest.json        接口清单（dataId / filter / 抓取时间 / 行数）
 *
 * 说明：接口鉴权用的是页面 localStorage 里的 `holiday_utoken`（`Authorization: Bearer <token>`），
 * 因此必须在已登录的页面上下文里发起请求。
 */
import { writeFileSync, mkdirSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const CDP = 'http://127.0.0.1:9222'
const day = new Date().toISOString().slice(0, 10)
const OUT_DIR = process.argv[2] || join('data-source', 'raw', day)
const API_DIR = join(OUT_DIR, 'api')

const YEAR = '2026'
const HOLIDAY = '国庆节'
const SJ = '310117' // 松江区
const SH = '310100' // 上海市
const SH_PROV = '310000'

const base = (fnid, extra = {}) => ({
  year: YEAR,
  holiday_name: HOLIDAY,
  fnid,
  sort: 'all_value',
  sequence: 'desc',
  scenic_code: 0,
  limitnum: 1000,
  ...extra
})

/** 采样点位：type=0 表示按累计口径 */
const span = { type: 0, time_start: 20261001, time_end: 20261007 }

const QUERIES = [
  /* ---------- 松江区 ---------- */
  {
    name: 'sj_grand_total',
    desc: '松江区·累计接待游客量 / 夜间游客量 / 同比',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_grand_total',
    filter: base(SJ)
  },
  {
    name: 'sj_year_compare',
    desc: '松江区·2025 与 2026 国庆假期接待量对比（含日均）',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_tourist_comparison',
    filter: base(SJ, { type: 0 })
  },
  {
    name: 'sj_daily',
    desc: '松江区·假日日度接待序列（平台口径）',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_receive_tourists',
    filter: base(SJ, { type: 0 })
  },
  {
    name: 'sj_daily_dated',
    desc: '松江区·假日日度接待序列（带真实日期 20261001…）',
    dataId: 'qgjjshfzldjsc_ykdb_csdb_receive_tourists',
    filter: { year: Number(YEAR), holiday_name: HOLIDAY, fnid: SJ, ...span }
  },
  {
    name: 'sj_profile',
    desc: '松江区·游客画像（本地/外地、居住时长、同比；性别年龄消费为区县级不提供）',
    dataId: 'qgjjshfzldjsc_ykdb_csdb_tourist',
    filter: { year: Number(YEAR), holiday_name: HOLIDAY, fnid: SJ, ...span }
  },
  {
    name: 'sj_scenic_total',
    desc: '松江区·重点景区累计接待 / 夜间 / 同比',
    dataId: 'jjrykdsjjcpt_jqyk_ykgm_grand_total_gather_v3',
    filter: base(SJ, { lv: 3 })
  },
  {
    name: 'sj_scenic_rank',
    desc: '松江区·景区接待排行（含占比、同比）',
    dataId: 'jjrykdsjjcpt_jqyk_ykgm_regional_reception_gather_v3',
    filter: base(SJ, { lv: 3, region_code: 0 })
  },
  {
    name: 'sj_scenic_daily',
    desc: '松江区·景区维度日度接待序列',
    dataId: 'jjrykdsjjcpt_jqyk_ykgm_receive_tourists_gather_v3',
    filter: base(SJ, { lv: 3, region_code: 0 })
  },
  {
    name: 'sj_scenic_year',
    desc: '松江区·景区维度 2025/2026 假期汇总',
    dataId: 'jjrykdsjjcpt_jqyk_ykgm_tourist_comparison_gather_v3',
    filter: base(SJ, { lv: 3, region_code: 0 })
  },
  {
    name: 'sj_business_total',
    desc: '松江区·重点商圈累计接待（平台无松江重点商圈时为空）',
    dataId: 'jjrykdsjjcpt_sqyk_ykgm_grand_total_gather_v3',
    filter: base(SJ, { lv: 3 })
  },
  {
    name: 'sj_business_rank',
    desc: '松江区·商圈接待排行',
    dataId: 'jjrykdsjjcpt_sqyk_ykgm_regional_reception_gather_v3',
    filter: base(SJ, { lv: 3, region_code: 0 })
  },
  {
    name: 'sj_map',
    desc: '松江区·地图打点数据',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_map',
    filter: { year: YEAR, holiday_name: HOLIDAY, code: Number(SJ) }
  },
  {
    name: 'ref_scenic_spots',
    desc: '景区点位名录（含所属区县、经纬度）',
    dataId: 'jjrykdsjjcpt_jqyk_scenic_spots',
    filter: { fnid: SH_PROV, lv: 1 }
  },
  {
    name: 'ref_business_spots',
    desc: '商圈点位名录',
    dataId: 'jjrykdsjjcpt_sqyk_scenic_spots',
    filter: { fnid: SH_PROV, lv: 1 }
  },

  /* ---------- 上海市（对比基准） ---------- */
  {
    name: 'sh_grand_total',
    desc: '上海市·累计接待游客量 / 夜间游客量 / 同比',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_grand_total',
    filter: base(SH)
  },
  {
    name: 'sh_year_compare',
    desc: '上海市·2025 与 2026 国庆假期接待量对比',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_tourist_comparison',
    filter: base(SH, { type: 0 })
  },
  {
    name: 'sh_daily',
    desc: '上海市·假日日度接待序列',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_receive_tourists',
    filter: base(SH, { type: 0 })
  },
  {
    name: 'sh_profile',
    desc: '上海市·游客画像（性别/年龄/消费能力/本地外地）',
    dataId: 'qgjjshfzldjsc_ykdb_csdb_tourist',
    filter: { year: Number(YEAR), holiday_name: HOLIDAY, fnid: SH_PROV, ...span }
  },
  {
    name: 'sh_districts',
    desc: '上海市·各区县接待排行（含松江区行）',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_regional_reception_city',
    filter: base(SH, { lv: 2 })
  },
  {
    name: 'sh_districts_night',
    desc: '上海市·各区县夜间游客排行（含松江区行）',
    dataId: 'jjrykdsjjcpt_csyk_ykgm_regional_reception_city_night',
    filter: base(SH, { lv: 2 })
  },
  {
    name: 'sh_scenic_total',
    desc: '上海市·重点景区累计接待 / 夜间 / 同比',
    dataId: 'jjrykdsjjcpt_jqyk_ykgm_grand_total_gather_v3',
    filter: base(SH, { lv: 2 })
  },
  {
    name: 'sh_scenic_rank',
    desc: '上海市·景区接待排行（含松江各景区行）',
    dataId: 'jjrykdsjjcpt_jqyk_ykgm_regional_reception_gather_v3',
    filter: base(SH, { lv: 2, region_code: 0 })
  },
  {
    name: 'sh_business_total',
    desc: '上海市·重点商圈累计接待',
    dataId: 'jjrykdsjjcpt_sqyk_ykgm_grand_total_gather_v3',
    filter: base(SH, { lv: 2 })
  },
  {
    name: 'sh_business_rank',
    desc: '上海市·商圈接待排行',
    dataId: 'jjrykdsjjcpt_sqyk_ykgm_regional_reception_gather_v3',
    filter: base(SH, { lv: 2, region_code: 0 })
  },

  /* ---------- 字典 / 参照 ---------- */
  { name: 'ref_region_dict', desc: '行政区划字典（id/name/pid/lv/经纬度）', dataId: 'jjrykdsjjcpt_region', filter: {} },
  { name: 'ref_years', desc: '平台可选年份', dataId: 'jjrykdsjjcpt_csyk_ykgm_year', filter: {} },
  { name: 'ref_boundary_sh', desc: '上海市边界 GeoJSON', dataId: 'jjrykdsjjcpt_map_boundary', filter: { code: Number(SH_PROV) } },
  { name: 'ref_boundary_sj', desc: '松江区边界 GeoJSON', dataId: 'jjrykdsjjcpt_map_boundary', filter: { code: Number(SJ) } }
]

/* ---------- 连接页面 ---------- */
const list = await (await fetch(CDP + '/json/list')).json()
const tab = list.filter((t) => t.type === 'page').find((t) => t.url.includes('smartsteps'))
if (!tab) {
  console.error('未找到 smartsteps 标签页，请先启动调试 Chrome 并登录')
  process.exit(1)
}
const ws = new WebSocket(tab.webSocketDebuggerUrl)
let id = 0
const pending = new Map()
ws.addEventListener('message', (e) => {
  const m = JSON.parse(e.data)
  if (m.id && pending.has(m.id)) {
    pending.get(m.id)(m)
    pending.delete(m.id)
  }
})
await new Promise((r) => ws.addEventListener('open', r))
const send = (method, params = {}) =>
  new Promise((r) => {
    const i = ++id
    pending.set(i, r)
    ws.send(JSON.stringify({ id: i, method, params }))
  })

async function evalInPage(expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, timeout: 60000 })
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 500))
  return r.result?.result?.value
}

/* 页面内查询助手：带上 Authorization 头 */
await evalInPage(`(() => {
  window.__q = async (dataId, filter) => {
    const tok = 'Bearer ' + localStorage.getItem('holiday_utoken')
    const body = {
      adcode: '110000',
      ext: { rest: { method: 'GET', url: '/api/v4/attr/query/list?dataId=' + dataId + '&filter=' + encodeURIComponent(JSON.stringify(filter)) } },
      level: 'province',
      queryType: 'v4daasData',
      regionGroup: 'general',
      time: '2024'
    }
    const res = await fetch('/smart-decision/api/v2/nocache/data/json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: tok, smart_token_jwt: '806' },
      body: JSON.stringify(body)
    })
    const json = await res.json()
    return json && json.data && json.data[0] ? json.data[0].body : json
  }
  return 'ok'
})()`)

mkdirSync(API_DIR, { recursive: true })

const manifest = []
for (const q of QUERIES) {
  let body = null
  let error = null
  try {
    const raw = await evalInPage(`window.__q(${JSON.stringify(q.dataId)}, ${JSON.stringify(q.filter)}).then(r => JSON.stringify(r))`)
    body = JSON.parse(raw)
  } catch (e) {
    error = String(e).slice(0, 300)
  }
  const rows = Array.isArray(body?.data) ? body.data.length : body?.data ? 1 : 0
  const record = {
    name: q.name,
    desc: q.desc,
    dataId: q.dataId,
    filter: q.filter,
    app: {
      appCode: 'jjrykdsjjcpt',
      way: 'POST /smart-decision/api/v2/nocache/data/json',
      innerRequest: '/api/v4/attr/query/list?dataId=' + q.dataId + '&filter=' + encodeURIComponent(JSON.stringify(q.filter))
    },
    fetchedAt: new Date().toISOString(),
    rows,
    error,
    file: `api/${q.name}.json`
  }
  writeFileSync(join(API_DIR, q.name + '.json'), JSON.stringify({ query: record, response: body }, null, 1), 'utf8')
  manifest.push(record)
  console.log(`${String(rows).padStart(4)} 行  ${q.name}  ${error ? 'ERROR ' + error : ''}`)
}

writeFileSync(join(OUT_DIR, 'manifest.json'), JSON.stringify(manifest, null, 1), 'utf8')
console.log(`\n已归档 ${manifest.length} 个接口 → ${OUT_DIR}`)

// 保留一份抓取时页面上的原始录制（若存在）
const cap = join(OUT_DIR, 'api-capture.jsonl')
if (existsSync(cap)) {
  const n = readFileSync(cap, 'utf8').split('\n').filter(Boolean).length
  console.log(`原始请求录制：${cap}（${n} 条）`)
}

ws.close()
process.exit(0)
