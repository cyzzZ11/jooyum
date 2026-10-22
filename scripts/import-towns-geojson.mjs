/**
 * 导入街镇边界 GeoJSON
 * ---------------------------------------------------------------
 * 把一份「17 个街镇」的 GeoJSON 转成项目使用的两份资产：
 *   src/assets/geo/songjiang-towns.json     街镇面（FeatureCollection）
 *   src/assets/geo/songjiang-district.json  区界轮廓（由 17 个街镇 union 得到）
 *
 * 区界不再单独依赖 DataV：街镇换边界后，区界必须跟着重算，
 * 否则「区界高亮」描边会和街镇外缘错位，出现双线。
 *
 * 用法：
 *   npm run import:geo                 # 读取根目录 songjiang-towns.geojson
 *   npm run import:geo -- 其他文件.geojson
 *
 * 要求：FeatureCollection；每个 feature 的 properties.name 与 src/data/towns.ts 一致；
 *      坐标系与项目其余数据一致（GCJ-02）。
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import polygonClipping from 'polygon-clipping'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUT_DIR = path.join(ROOT, 'src', 'assets', 'geo')
const DEFAULT_SRC = path.join(ROOT, 'songjiang-towns.geojson')
const SRC = process.argv[2] ? path.resolve(process.cwd(), process.argv[2]) : DEFAULT_SRC

/** 小于该面积（平方度）的孤立多边形 / 洞环视为数值噪声 */
const MIN_AREA = 1e-6

function toMultiPolygon (geometry) {
    if (geometry.type === 'Polygon') return [geometry.coordinates]
    if (geometry.type === 'MultiPolygon') return geometry.coordinates
    throw new Error(`不支持的几何类型：${geometry.type}`)
}

function ringArea (ring) {
    let sum = 0
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        sum += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1])
    }
    return Math.abs(sum / 2)
}

function multiPolygonArea (multiPoly) {
    let area = 0
    for (const poly of multiPoly) for (const ring of poly) area += ringArea(ring)
    return area
}

function prune (multiPoly) {
    return multiPoly
        .filter((poly) => poly.length && ringArea(poly[0]) >= MIN_AREA)
        .map((poly) => [poly[0], ...poly.slice(1).filter((hole) => ringArea(hole) >= MIN_AREA)])
}

const geo = JSON.parse(fs.readFileSync(SRC, 'utf8'))
if (geo.type !== 'FeatureCollection' || !Array.isArray(geo.features)) {
    throw new Error(`${SRC} 不是 FeatureCollection`)
}
if (!geo.features.length) throw new Error(`${SRC} 没有 feature`)

const names = new Set()
const features = geo.features.map((feature) => {
    const name = feature.properties?.name
    if (!name) throw new Error('存在缺少 properties.name 的 feature')
    if (names.has(name)) throw new Error(`街镇名重复：${name}`)
    names.add(name)

    const geometry = feature.geometry
    if (!geometry) throw new Error(`${name} 缺少 geometry`)

    return {
        type: 'Feature',
        properties: {
            name,
            center: feature.properties?.center
        },
        geometry
    }
})

const townMultiPolys = features.map((feature) => toMultiPolygon(feature.geometry))
const townArea = townMultiPolys.reduce((sum, multiPoly) => sum + multiPolygonArea(multiPoly), 0)

const district = prune(polygonClipping.union(...townMultiPolys))
if (!district.length) throw new Error('街镇 union 后为空，无法生成区界')

const districtArea = multiPolygonArea(district)
const overlapRatio = townArea ? (townArea - districtArea) / townArea : 0

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.writeFileSync(
    path.join(OUT_DIR, 'songjiang-towns.json'),
    JSON.stringify({ type: 'FeatureCollection', features })
)
fs.writeFileSync(
    path.join(OUT_DIR, 'songjiang-district.json'),
    JSON.stringify({
        type: 'Feature',
        properties: { name: '松江区', adcode: '310117' },
        geometry: { type: 'MultiPolygon', coordinates: district }
    })
)

const bbox = district.reduce(
    (box, poly) =>
        poly[0].reduce(
            (inner, [x, y]) => [
                Math.min(inner[0], x),
                Math.min(inner[1], y),
                Math.max(inner[2], x),
                Math.max(inner[3], y)
            ],
            box
        ),
    [Infinity, Infinity, -Infinity, -Infinity]
)

console.log(`✓ 已导入 ${features.length} 个街镇 ← ${path.relative(ROOT, SRC) || SRC}`)
console.log(`  ${features.map((f) => f.properties.name).join('、')}`)
console.log(`· 街镇面积合计 ${townArea.toFixed(6)} deg²，区界 ${districtArea.toFixed(6)} deg²`)
console.log(`· 街镇间重叠 ${(overlapRatio * 100).toFixed(2)}%`)
console.log(
    `· 区界范围 lon[${bbox[0].toFixed(4)}, ${bbox[2].toFixed(4)}] lat[${bbox[1].toFixed(4)}, ${bbox[3].toFixed(4)}]`
)
