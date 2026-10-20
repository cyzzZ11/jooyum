/**
 * 调试版 Chrome（CDP 9222）操作小工具 —— 用于抓取 smartsteps 平台数据。
 *
 *   node scripts/smartsteps.mjs eval "<js 表达式>"      # 在页面里执行，打印 JSON 结果
 *   node scripts/smartsteps.mjs goto <url>              # 导航
 *   node scripts/smartsteps.mjs shot <文件名>            # 截图到 _shots/
 *   node scripts/smartsteps.mjs info                    # 当前页面信息
 */
import { writeFileSync, mkdirSync } from 'node:fs'

const CDP = 'http://127.0.0.1:9222'
const [cmd, ...rest] = process.argv.slice(2)

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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

if (cmd === 'info') {
  console.log(JSON.stringify({ url: tab.url, title: tab.title }, null, 1))
} else if (cmd === 'goto') {
  await send('Page.enable')
  await send('Page.navigate', { url: rest[0] })
  await sleep(Number(process.env.WAIT || 4000))
  const r = await send('Runtime.evaluate', { expression: 'location.href', returnByValue: true })
  console.log(r.result?.result?.value)
} else if (cmd === 'eval') {
  const expr = rest.join(' ')
  const r = await send('Runtime.evaluate', {
    expression: expr,
    returnByValue: true,
    awaitPromise: true,
    timeout: 240000
  })
  if (r.result?.exceptionDetails) {
    console.error('EXCEPTION:', JSON.stringify(r.result.exceptionDetails).slice(0, 800))
  }
  const v = r.result?.result?.value
  console.log(typeof v === 'string' ? v : JSON.stringify(v, null, 1))
} else if (cmd === 'shot') {
  await send('Page.enable')
  const s = await send('Page.captureScreenshot', { format: 'png' })
  mkdirSync('_shots', { recursive: true })
  const name = rest[0] || 'shot'
  writeFileSync(`_shots/${name}.png`, Buffer.from(s.result.data, 'base64'))
  console.log(`_shots/${name}.png`)
} else {
  console.log('用法: node scripts/smartsteps.mjs info|goto|eval|shot')
}

ws.close()
process.exit(0)
