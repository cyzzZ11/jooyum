/**
 * 生成松江区街镇级 GeoJSON
 * ---------------------------------------------------------------
 * 思路：
 *   1. 从阿里云 DataV 拉取「松江区」真实行政轮廓（adcode = 310117）。
 *      —— DataV 只提供到区县级，没有街镇边界，所以街镇部分需要自己剖分。
 *   2. 以 17 个街镇的真实近似中心点为种子，做 Voronoi 剖分。
 *   3. 用 polygon-clipping 把每个 Voronoi 单元与松江区轮廓求交，
 *      得到「贴合真实区界、内部按街镇示意分区」的 GeoJSON。
 *
 * 产物：
 *   src/assets/geo/songjiang-district.json  松江区整体轮廓
 *   src/assets/geo/songjiang-towns.json     17 个街镇面
 *
 * ⚠️ 街镇内部边界为示意（Voronoi 剖分），非官方测绘边界。
 *    若后续拿到高德 Key，可用 tools/fetch-amap-district.mjs 替换为真实边界。
 *
 * 运行： npm run gen:geo
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Delaunay } from 'd3-delaunay'
import polygonClipping from 'polygon-clipping'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const CACHE_DIR = path.join(ROOT, '.cache')
const OUT_DIR = path.join(ROOT, 'src', 'assets', 'geo')

const ADC = '310117' // 松江区
const SOURCE_URL = `https://geo.datav.aliyun.com/areas_v3/bound/${ADC}.json`

/** 松江区 17 个街镇（6 街道 + 11 镇）及近似中心点 [经度, 纬度] */
const TOWNS = [
    { name: '九里亭街道', type: '街道', center: [121.3370, 31.1255] },
    { name: '九亭镇', type: '镇', center: [121.3170, 31.1120] },
    { name: '泗泾镇', type: '镇', center: [121.2740, 31.1105] },
    { name: '洞泾镇', type: '镇', center: [121.2470, 31.0860] },
    { name: '佘山镇', type: '镇', center: [121.1830, 31.0970] },
    { name: '新桥镇', type: '镇', center: [121.3160, 31.0440] },
    { name: '广富林街道', type: '街道', center: [121.2110, 31.0620] },
    { name: '方松街道', type: '街道', center: [121.2300, 31.0410] },
    { name: '中山街道', type: '街道', center: [121.2600, 31.0350] },
    { name: '小昆山镇', type: '镇', center: [121.1580, 31.0330] },
    { name: '岳阳街道', type: '街道', center: [121.2270, 31.0090] },
    { name: '永丰街道', type: '街道', center: [121.1960, 30.9960] },
    { name: '车墩镇', type: '镇', center: [121.3040, 30.9890] },
    { name: '石湖荡镇', type: '镇', center: [121.1700, 30.9690] },
    { name: '叶榭镇', type: '镇', center: [121.2810, 30.9240] },
    { name: '泖港镇', type: '镇', center: [121.1990, 30.9190] },
    { name: '新浜镇', type: '镇', center: [121.1230, 30.8990] },
]

async function loadDistrict () {
    fs.mkdirSync(CACHE_DIR, { recursive: true })
    const cacheFile = path.join(CACHE_DIR, `datav-${ADC}.json`)

    if (fs.existsSync(cacheFile)) {
        console.log(`· 使用缓存 ${path.relative(ROOT, cacheFile)}`)
        return JSON.parse(fs.readFileSync(cacheFile, 'utf8'))
    }

    console.log(`· 拉取 ${SOURCE_URL}`)
    const res = await fetch(SOURCE_URL, {
        headers: { 'User-Agent': 'Mozilla/5.0 (songjiang-screen-geo-builder)' },
    })
    if (!res.ok) throw new Error(`下载失败：HTTP ${res.status} ${res.statusText}`)
    const json = await res.json()
    fs.writeFileSync(cacheFile, JSON.stringify(json))
    return json
}

/** 统一成 MultiPolygon 数组形式： [ [ring, ...holes], ... ] */
function toMultiPoly (geometry) {
    if (geometry.type === 'Polygon') return [geometry.coordinates]
    if (geometry.type === 'MultiPolygon') return geometry.coordinates
    throw new Error(`不支持的几何类型：${geometry.type}`)
}

function bboxOf (multiPoly) {
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const poly of multiPoly) {
        for (const [x, y] of poly[0]) {
            if (x < minX) minX = x
            if (y < minY) minY = y
            if (x > maxX) maxX = x
            if (y > maxY) maxY = y
        }
    }
    return [minX, minY, maxX, maxY]
}

/** 按环计算面积（鞋带公式，忽略投影误差，仅用于相对权重） */
function ringArea (ring) {
    let sum = 0
    for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
        sum += (ring[j][0] + ring[i][0]) * (ring[j][1] - ring[i][1])
    }
    return Math.abs(sum / 2)
}

async function main () {
    const district = await loadDistrict()
    const feature = district.features?.[0] ?? district
    const districtMulti = toMultiPoly(feature.geometry)

    const [minX, minY, maxX, maxY] = bboxOf(districtMulti)
    console.log(
        `· 松江区范围 lon[${minX.toFixed(4)}, ${maxX.toFixed(4)}] lat[${minY.toFixed(4)}, ${maxY.toFixed(4)}]`,
    )

    // Voronoi 外框外扩，保证每个单元都能完整覆盖到区界之外再被裁掉
    const pad = 0.5
    const vbox = [minX - pad, minY - pad, maxX + pad, maxY + pad]

    const points = TOWNS.map((t) => t.center)
    const delaunay = Delaunay.from(points)
    const voronoi = delaunay.voronoi(vbox)

    const features = []
    const failures = []

    TOWNS.forEach((town, i) => {
        const cell = voronoi.cellPolygon(i)
        if (!cell) {
            failures.push(town.name)
            return
        }
        const clipped = polygonClipping.intersection([cell], districtMulti)
        if (!clipped.length) {
            failures.push(town.name)
            return
        }

        let area = 0
        for (const poly of clipped) for (const ring of poly) area += ringArea(ring)

        features.push({
            type: 'Feature',
            properties: {
                name: town.name,
                type: town.type,
                center: town.center,
                area,
            },
            geometry: { type: 'MultiPolygon', coordinates: clipped },
        })
    })

    if (failures.length) {
        console.warn(`⚠ 剖分失败：${failures.join('、')}`)
    }

    // 面积归一化：areaRatio 相对最大街镇（0~1），areaShare 占全区比重
    const areas = features.map((f) => f.properties.area)
    const maxArea = Math.max(...areas)
    const totalArea = areas.reduce((a, b) => a + b, 0)
    features.forEach((f) => {
        f.properties.areaRatio = Number((f.properties.area / maxArea).toFixed(4))
        f.properties.areaShare = Number((f.properties.area / totalArea).toFixed(4))
    })
    features.sort((a, b) => b.properties.area - a.properties.area)

    fs.mkdirSync(OUT_DIR, { recursive: true })
    fs.writeFileSync(
        path.join(OUT_DIR, 'songjiang-district.json'),
        JSON.stringify({ type: 'Feature', properties: { name: '松江区', adcode: ADC }, geometry: feature.geometry }),
    )

    // ⚠️ songjiang-towns.json 现在是**真实街镇边界**（由外部数据替换），
    //    本脚本只能生成 Voronoi 示意分区，默认不覆盖。确需回退请加 --force。
    const townsFile = path.join(OUT_DIR, 'songjiang-towns.json')
    const force = process.argv.includes('--force')

    if (fs.existsSync(townsFile) && !force) {
        console.log('⚠ 跳过 songjiang-towns.json（已存在，可能为真实边界数据）')
        console.log('  如需用 Voronoi 示意分区覆盖它，请运行:  npm run gen:geo -- --force')
    } else {
        fs.writeFileSync(townsFile, JSON.stringify({ type: 'FeatureCollection', features }))
        console.log(`✓ 生成 ${features.length} 个街镇 → src/assets/geo/songjiang-towns.json`)
        console.log(`  ${features.map((f) => f.properties.name).join('、')}`)
    }
}

main().catch((err) => {
    console.error('✗ 生成失败：', err.message)
    process.exit(1)
})
