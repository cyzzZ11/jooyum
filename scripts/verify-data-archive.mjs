/**
 * 校验数据源2 存档的完整性与大屏取数的一致性（平台接口失效后也能确认数据没被破坏）。
 *
 * 用法：node scripts/verify-data-archive.mjs [raw 日期目录]
 *
 * 校验项：
 *   1. 原始接口文件齐全（manifest 里登记的每个接口都有对应文件）
 *   2. 松江区 7 日客流 / 夜间合计 = 区级累计
 *   3. 松江区 9 家景区合计 = 区级重点景区总量
 *   4. 9 家景区逐日合计 = 各景区累计
 *   5. 上海市各区排行中松江区行 = 松江区累计接待
 *   6. 大屏取数（src/data/panels.ts、towns.ts）与 normalized/*.json 一致
 */
import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const day = process.argv[2] || '2026-10-20'
const RAW = join('data-source', 'raw', day)
const API = join(RAW, 'api')
const NORM = join('data-source', 'normalized', 'songjiang-2026-guojiaqing.json')
const PANELS = join('src', 'data', 'panels.ts')
const TOWNS = join('src', 'data', 'towns.ts')

let pass = 0
let fail = 0
const ok = (name, detail) => {
  pass += 1
  console.log(`  ✓ ${name}${detail ? '  ' + detail : ''}`)
}
const bad = (name, detail) => {
  fail += 1
  console.log(`  ✗ ${name}${detail ? '  ' + detail : ''}`)
}
const near = (a, b, eps = 0.011) => Math.abs(a - b) <= eps

const readApi = (name) => {
  const p = join(API, name + '.json')
  if (!existsSync(p)) return null
  const j = JSON.parse(readFileSync(p, 'utf8'))
  return j.response?.data ?? j.response ?? null
}

console.log(`\n数据存档校验（${RAW}）`)

/* 1) 文件齐全 */
console.log('\n[1] 接口文件齐全性')
const manifest = JSON.parse(readFileSync(join(RAW, 'manifest.json'), 'utf8'))
let missing = 0
for (const m of manifest) if (!existsSync(join(RAW, m.file))) missing += 1
missing === 0 ? ok(`${manifest.length} 个接口文件全部存在`) : bad(`缺少 ${missing} 个接口文件`)

/* 2) 7 日合计 = 区级累计 */
console.log('\n[2] 松江区日度序列自洽')
const total = readApi('sj_grand_total')[0]
const daily = readApi('sj_daily').filter((d) => String(d.year) === '2026')
const sumDaily = daily.reduce((a, d) => a + d.all_value, 0)
sumDaily === total.all_value
  ? ok('7 日客流合计 = 累计接待', `${sumDaily}`)
  : bad('7 日客流合计与累计不符', `${sumDaily} vs ${total.all_value}`)
const nightSum = daily.reduce((a, d) => a + d.all_night, 0)
nightSum === total.all_night
  ? ok('7 日夜间合计 = 夜间游客', `${nightSum}`)
  : bad('7 日夜间合计不符', `${nightSum} vs ${total.all_night}`)

/* 3) 景区合计 */
console.log('\n[3] 景区口径自洽')
const scenicTotal = readApi('sj_scenic_total')[0]
const scenics = readApi('sj_scenic_rank')
const sumScenic = scenics.reduce((a, s) => a + s.all_value, 0)
sumScenic === scenicTotal.all_value
  ? ok(`${scenics.length} 家景区合计 = 重点景区总量`, `${sumScenic}`)
  : bad('景区合计不符', `${sumScenic} vs ${scenicTotal.all_value}`)

/* 4) 景区逐日合计 */
const scenicDaily = readApi('sj_scenic_daily_dated')
let dailyMismatch = 0
for (const s of scenics) {
  const rows = scenicDaily.filter((d) => String(d.scenic_code) === String(s.region_code))
  const sum = rows.reduce((a, d) => a + d.all_value, 0)
  if (rows.length !== 7 || sum !== s.all_value) {
    dailyMismatch += 1
    console.log(`     ! ${s.scenic_name}: 逐日 ${rows.length} 条 / 合计 ${sum} vs ${s.all_value}`)
  }
}
dailyMismatch === 0
  ? ok('9 家景区逐日序列均自洽（各 7 天，合计一致）')
  : bad(`${dailyMismatch} 家景区逐日序列不自洽`)

/* 5) 全市排行中的松江行 */
console.log('\n[4] 上海市排行交叉校验')
const districts = readApi('sh_districts')
const sjRow = districts.find((d) => d.region_name === '松江区')
sjRow && sjRow.all_value === total.all_value
  ? ok(`松江区行 = 区级累计接待（第 ${districts.indexOf(sjRow) + 1} / ${districts.length}）`)
  : bad('松江区行与区级累计不符', sjRow ? `${sjRow.all_value} vs ${total.all_value}` : '未找到')

/* 6) 大屏取数一致 */
console.log('\n[5] 大屏取数与规范化数据一致性')
const norm = JSON.parse(readFileSync(NORM, 'utf8'))
const sj = norm.songjiang
const panels = readFileSync(PANELS, 'utf8')
const towns = readFileSync(TOWNS, 'utf8')

const num = (src, re, label) => {
  const m = src.match(re)
  if (!m) {
    bad(`未在代码中找到「${label}」`)
    return null
  }
  return Number(m[1])
}

const totalWan = sj.visitors.total / 1e4
const vTotal = num(panels, /label: '假期接待游客', value: ([\d.]+)/, '假期接待游客')
if (vTotal !== null) {
  near(vTotal, totalWan)
    ? ok(`假期接待游客 ${vTotal} 万 = 存档 ${totalWan.toFixed(2)} 万`)
    : bad('假期接待游客与存档不符', `${vTotal} vs ${totalWan.toFixed(2)}`)
}

const vScenic = num(panels, /label: '重点景区（9 家）', value: ([\d.]+)/, '重点景区')
const scenicWan = sj.scenic.total / 1e4
if (vScenic !== null) {
  near(vScenic, scenicWan)
    ? ok(`重点景区 ${vScenic} 万 = 存档 ${scenicWan.toFixed(2)} 万`)
    : bad('重点景区与存档不符', `${vScenic} vs ${scenicWan.toFixed(2)}`)
}

// YOU_BARS 每一条都要与存档同名景区一致
const barsBlock = panels.slice(panels.indexOf('YOU_BARS'), panels.indexOf('/* ============================ 吃'))
const bars = [...barsBlock.matchAll(/\{ name: '([^']+)'(?:, short: '[^']*')?, value: ([\d.]+) \}/g)].map((m) => ({
  name: m[1],
  value: Number(m[2]),
}))
let barBad = 0
for (const b of bars) {
  const hit = sj.scenic.list.find((s) => s.name === b.name)
  if (!hit || !near(b.value, hit.visitors / 1e4)) {
    barBad += 1
    console.log(`     ! ${b.name}: 大屏 ${b.value} vs 存档 ${hit ? (hit.visitors / 1e4).toFixed(2) : '未找到'}`)
  }
}
bars.length && barBad === 0
  ? ok(`重点景区柱状图 ${bars.length} 家均与存档一致`)
  : bad(`${barBad} 家景区客流与存档不一致`)

// 日度趋势合计 = 存档累计
const trendBlock = panels.slice(panels.indexOf('HOLIDAY_TREND'))
const trend = trendBlock
  .slice(trendBlock.indexOf('tourists: ['), trendBlock.indexOf(']', trendBlock.indexOf('tourists: [')))
  .replace(/^tourists: \[/, '')
  .split(',')
  .map((x) => Number(x.trim()))
const trendSum = trend.reduce((a, b) => a + b, 0)
near(trendSum, totalWan)
  ? ok(`日度趋势合计 ${trendSum.toFixed(2)} 万 = 存档 ${totalWan.toFixed(2)} 万`)
  : bad('日度趋势合计与存档不符', `${trendSum.toFixed(2)} vs ${totalWan.toFixed(2)}`)

// 街镇游客合计 = 存档累计
const townTourists = [...towns.matchAll(/tourists: ([\d.]+)/g)].map((m) => Number(m[1]))
const townSum = townTourists.reduce((a, b) => a + b, 0)
near(townSum, totalWan)
  ? ok(`17 街镇游客合计 ${townSum.toFixed(2)} 万 = 存档 ${totalWan.toFixed(2)} 万`)
  : bad('街镇游客合计与存档不符', `${townSum.toFixed(2)} vs ${totalWan.toFixed(2)}`)

console.log(`\n结果：${pass} 项通过，${fail} 项失败\n`)
process.exit(fail ? 1 : 0)
