/**
 * 抓取「节假日游客大数据监测平台」（jice.smartsteps.com）的数据接口。
 *
 * 前置：Chrome 已用 --remote-debugging-port=9222 打开目标站点（见 `启动抓取.cmd`）。
 *
 *   node scripts/capture-smartsteps.mjs start [标签页关键字]   # 开始录制（保持运行）
 *   node scripts/capture-smartsteps.mjs dump                  # 汇总已录到的接口
 *   node scripts/capture-smartsteps.mjs list                  # 列出可录制的标签页
 *
 * 录制结果：`data-source/raw/<日期>/api-capture.jsonl`，每行一条
 *   { t, method, url, status, postData, body }
 * 只保留 XHR / Fetch 的 JSON 响应，过滤静态资源。
 */
import { appendFileSync, existsSync, readFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'

const CDP = 'http://127.0.0.1:9222'
const mode = process.argv[2] || 'start'
const tabKey = process.argv[3] || 'smartsteps'

const day = new Date().toISOString().slice(0, 10)
const OUT_DIR = join('data-source', 'raw', day)
const OUT = join(OUT_DIR, 'api-capture.jsonl')

async function pickTab(key) {
  const list = await (await fetch(CDP + '/json/list')).json()
  const pages = list.filter((x) => x.type === 'page')
  if (mode === 'list') {
    console.log('可录制的标签页：')
    for (const p of pages) console.log(`  [${p.id}] ${p.title}  ${p.url}`)
    process.exit(0)
  }
  const t = pages.find((x) => x.url.includes(key)) || pages[0]
  if (!t) throw new Error('没有可用标签页，请先启动调试 Chrome')
  return t
}

async function connect(tab) {
  const ws = new WebSocket(tab.webSocketDebuggerUrl)
  let id = 0
  const pending = new Map()
  const handlers = []
  ws.addEventListener('message', (e) => {
    const m = JSON.parse(e.data)
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m)
      pending.delete(m.id)
    } else if (m.method) handlers.forEach((h) => h(m))
  })
  await new Promise((r) => ws.addEventListener('open', r))
  const send = (method, params = {}) =>
    new Promise((r) => {
      const i = ++id
      pending.set(i, r)
      ws.send(JSON.stringify({ id: i, method, params }))
    })
  return { ws, send, handlers }
}

if (mode === 'dump') {
  if (!existsSync(OUT)) {
    console.log('还没有录到数据（' + OUT + ' 不存在）')
    process.exit(0)
  }
  const lines = readFileSync(OUT, 'utf8').split('\n').filter(Boolean)
  const byUrl = new Map()
  for (const ln of lines) {
    let rec
    try {
      rec = JSON.parse(ln)
    } catch {
      continue
    }
    const key = rec.url.split('?')[0]
    if (!byUrl.has(key)) byUrl.set(key, [])
    byUrl.get(key).push(rec)
  }
  console.log(`共 ${lines.length} 条记录，${byUrl.size} 个不同接口\n`)
  for (const [url, recs] of [...byUrl.entries()].sort()) {
    const last = recs[recs.length - 1]
    const size = typeof last.body === 'string' ? last.body.length : 0
    console.log(`● ${url}`)
    console.log(`  次数=${recs.length}  ${last.method}  status=${last.status}  bodyLen=${size}`)
    if (last.postData) console.log(`  POST: ${String(last.postData).slice(0, 400)}`)
    if (last.body) console.log(`  RESP: ${String(last.body).replace(/\s+/g, ' ').slice(0, 500)}`)
    console.log('')
  }
  process.exit(0)
}

if (mode === 'list') {
  await pickTab(tabKey)
}

const tab = await pickTab(tabKey)
mkdirSync(OUT_DIR, { recursive: true })

const { send, handlers } = await connect(tab)
/** requestId -> 请求信息（requestWillBeSent 时写入，早于 responseReceived） */
const reqInfo = new Map()
/** requestId -> 响应信息（responseReceived 时写入） */
const respInfo = new Map()

const SKIP = /\.(png|jpe?g|gif|svg|css|woff2?|ttf|eot|ico|map|webp)(\?|$)/i

handlers.push(async (m) => {
  if (m.method === 'Network.requestWillBeSent') {
    const r = m.params.request
    if (SKIP.test(r.url)) return
    reqInfo.set(m.params.requestId, {
      t: new Date().toISOString(),
      method: r.method,
      url: r.url,
      headers: r.headers,
      postData: r.postData ? String(r.postData).slice(0, 50000) : undefined
    })
    return
  }
  if (m.method === 'Network.responseReceived') {
    const r = m.params.response
    if (!['XHR', 'Fetch'].includes(m.params.type)) return
    if (SKIP.test(r.url)) return
    const mime = (r.mimeType || '').toLowerCase()
    if (!mime.includes('json')) return
    respInfo.set(m.params.requestId, { status: r.status, mime })
    return
  }
  if (m.method === 'Network.loadingFinished') {
    const resp = respInfo.get(m.params.requestId)
    if (!resp) return
    const req = reqInfo.get(m.params.requestId) || { url: '', method: '', headers: {} }
    respInfo.delete(m.params.requestId)
    reqInfo.delete(m.params.requestId)
    try {
      const res = await send('Network.getResponseBody', { requestId: m.params.requestId })
      const body = res.result?.body || ''
      if (!body) return
      appendFileSync(
        OUT,
        JSON.stringify({ ...req, status: resp.status, mime: resp.mime, body: body.slice(0, 2_000_000) }) + '\n',
        'utf8'
      )
      const short = req.url.split('?')[0].split('/').slice(-3).join('/')
      console.log(`  + ${resp.status} ${req.method} ${short}  ${body.length}B`)
    } catch {
      /* 二进制或缓冲区已释放，忽略 */
    }
  }
})

await send('Network.enable', { maxTotalBufferSize: 500_000_000, maxResourceBufferSize: 100_000_000 })
console.log('● 录制已开始，标签页：' + tab.url)
console.log('● 输出：' + OUT)
console.log('● 汇总：node scripts/capture-smartsteps.mjs dump\n')

process.on('SIGINT', () => process.exit(0))
setInterval(() => {}, 1 << 30)
