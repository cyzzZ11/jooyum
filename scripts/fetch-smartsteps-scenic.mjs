/**
 * 补充抓取：松江区 9 家重点景区的**逐景区画像**与**逐景区日度序列**。
 *
 * 依赖 `scripts/fetch-smartsteps-data.mjs` 已生成的 `sj_scenic_rank.json`（取景区编码）。
 * 用法：node scripts/fetch-smartsteps-scenic.mjs [归档目录]
 */
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const CDP = 'http://127.0.0.1:9222'
const day = new Date().toISOString().slice(0, 10)
const OUT_DIR = process.argv[2] || join('data-source', 'raw', day)
const API_DIR = join(OUT_DIR, 'api')

const rank = JSON.parse(readFileSync(join(API_DIR, 'sj_scenic_rank.json'), 'utf8')).response.data
const codes = rank.map((r) => r.region_code).join(',')
const span = { year: 2026, holiday_name: '国庆节', scenic_code: codes, type: 0, time_start: 20261001, time_end: 20261007 }

const list = await (await fetch(CDP + '/json/list')).json()
const tab = list.filter((t) => t.type === 'page').find((t) => t.url.includes('smartsteps'))
if (!tab) {
  console.error('未找到 smartsteps 标签页')
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

const evalInPage = async (expression) => {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true, timeout: 60000 })
  if (r.result?.exceptionDetails) throw new Error(JSON.stringify(r.result.exceptionDetails).slice(0, 400))
  return r.result?.result?.value
}

await evalInPage(`(() => {
  window.__q = async (dataId, filter) => {
    const tok = 'Bearer ' + localStorage.getItem('holiday_utoken')
    const body = { adcode: '110000', ext: { rest: { method: 'GET', url: '/api/v4/attr/query/list?dataId=' + dataId + '&filter=' + encodeURIComponent(JSON.stringify(filter)) } }, level: 'province', queryType: 'v4daasData', regionGroup: 'general', time: '2024' }
    const res = await fetch('/smart-decision/api/v2/nocache/data/json', { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: tok, smart_token_jwt: '806' }, body: JSON.stringify(body) })
    const json = await res.json()
    return json && json.data && json.data[0] ? json.data[0].body : json
  }
  return 'ok'
})()`)

mkdirSync(API_DIR, { recursive: true })
const manifestPath = join(OUT_DIR, 'manifest.json')
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))

const QUERIES = [
  {
    name: 'sj_scenic_profile',
    desc: '松江区·9 家重点景区游客画像（性别/年龄/消费等级/本地外地/停留时长）',
    dataId: 'qgjjshfzldjsc_ykdb_jqdb_tourist'
  },
  {
    name: 'sj_scenic_daily_dated',
    desc: '松江区·9 家重点景区日度接待序列（带真实日期）',
    dataId: 'qgjjshfzldjsc_ykdb_jqdb_receive_tourists'
  }
]

for (const q of QUERIES) {
  const body = JSON.parse(await evalInPage(`window.__q(${JSON.stringify(q.dataId)}, ${JSON.stringify(span)}).then(r => JSON.stringify(r))`))
  const rows = Array.isArray(body?.data) ? body.data.length : 0
  const record = {
    name: q.name,
    desc: q.desc,
    dataId: q.dataId,
    filter: span,
    app: {
      appCode: 'qgjjshfzldjsc',
      way: 'POST /smart-decision/api/v2/nocache/data/json',
      innerRequest: '/api/v4/attr/query/list?dataId=' + q.dataId + '&filter=' + encodeURIComponent(JSON.stringify(span))
    },
    fetchedAt: new Date().toISOString(),
    rows,
    error: null,
    file: `api/${q.name}.json`
  }
  writeFileSync(join(API_DIR, q.name + '.json'), JSON.stringify({ query: record, response: body }, null, 1), 'utf8')
  manifest.push(record)
  console.log(`${rows} 行  ${q.name}`)
}

writeFileSync(manifestPath, JSON.stringify(manifest, null, 1), 'utf8')
console.log(`\n已补抓 ${QUERIES.length} 个接口 → ${API_DIR}`)
ws.close()
process.exit(0)
