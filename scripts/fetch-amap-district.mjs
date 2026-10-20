/**
 * 【可选】用高德行政区划 API 拉取松江区 17 个街镇的真实边界
 * ---------------------------------------------------------------
 * 当前项目已使用**真实街镇行政边界**（src/assets/geo/songjiang-towns.json），
 * 不需要任何 Key。本脚本用于「换一份官方来源的边界」：
 *
 *   1. 到 https://console.amap.com/dev/key/app 免费申请一个「Web 服务」类型的 Key
 *   2. 运行：
 *        AMAP_KEY=你的Key node scripts/fetch-amap-district.mjs
 *      （Windows PowerShell： $env:AMAP_KEY="你的Key"; node scripts/fetch-amap-district.mjs）
 *   3. 脚本会覆盖 src/assets/geo/songjiang-towns.json，重启 dev 即可生效
 *
 * 说明：高德返回的是 GCJ-02 坐标系、polyline 字符串（"lon,lat;lon,lat;..." 以 "|" 分隔多段）。
 *      DataV 的区界同样是 GCJ-02，两者可以直接混用，无需纠偏。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_FILE = path.join(ROOT, 'src', 'assets', 'geo', 'songjiang-towns.json')

const KEY = process.env.AMAP_KEY
if (!KEY) {
    console.error('✗ 缺少环境变量 AMAP_KEY。用法： AMAP_KEY=xxx node scripts/fetch-amap-district.mjs')
    process.exit(1)
}

/** 高德 polyline -> [[ring], ...]；polyline 中 "|" 分隔多个环 */
function parsePolyline (polyline = '') {
    return polyline
        .split('|')
        .filter(Boolean)
        .map((seg) => seg.split(';').filter(Boolean).map((p) => p.split(',').map(Number)))
}

const url =
    `https://restapi.amap.com/v3/config/district` +
    `?keywords=${encodeURIComponent('松江区')}&subdistrict=1&extensions=all&key=${KEY}`

const res = await fetch(url)
const json = await res.json()

if (json.status !== '1') {
    console.error('✗ 高德接口返回错误：', json.info)
    process.exit(1)
}

const district = json.districts?.[0]
const children = district?.districts ?? []
if (!children.length) {
    console.error('✗ 没有取到下级街镇数据')
    process.exit(1)
}

const features = []
for (const child of children) {
    const rings = parsePolyline(child.polyline)
    if (!rings.length) {
        console.warn(`⚠ ${child.name} 无边界数据，已跳过`)
        continue
    }
    const center = (child.center || '').split(',').map(Number)
    features.push({
        type: 'Feature',
        properties: {
            name: child.name,
            type: child.name.endsWith('街道') ? '街道' : '镇',
            center,
            area: Number(child.area) || 0,
        },
        geometry: { type: 'MultiPolygon', coordinates: rings.map((r) => [r]) },
    })
}

fs.writeFileSync(OUT_FILE, JSON.stringify({ type: 'FeatureCollection', features }))
console.log(`✓ 已写入 ${features.length} 个街镇真实边界 → ${path.relative(ROOT, OUT_FILE)}`)
console.log(`  ${features.map((f) => f.properties.name).join('、')}`)
