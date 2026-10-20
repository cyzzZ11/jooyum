/**
 * 街镇边界清理
 *
 * 原始 `songjiang-towns.json` 是「栅格矢量化」产物：坐标全部落在 0.0008° 的规则网格上
 * （≈75m ≈ 2 个设计像素），直接渲染有两个问题：
 *
 * 1) **同一街镇被拆成多个互相贴合的多边形**（方松街道 3 个、永丰街道 2 个、石湖荡镇 2 个……）。
 *    贴合处会各画一条描边，而这些多边形有的只有 3px 多宽（永丰街道有一块
 *    3.46 × 34.16px 的竖条），两条挨着的描边加上 12px 辉光会糊成一条明显偏亮的竖线，
 *    看上去就像凭空多出来的一条线。
 *    → 先把同一街镇的多边形做 union，消掉内部接缝。**面积不变**，只是不再画内部那条描边。
 *
 * 2) 夹带了大量**退化环**：29 个零面积洞环（首尾共线，鞋带公式算出的面积恰好为 0），
 *    以及叶榭镇 / 新桥镇 / 小昆山镇几个亚像素大小的孤立小块。
 *    它们只有描边、没有填充，是纯粹的多余线条。
 *    → 面积小于 MIN_AREA 的环 / 多边形直接剔除。
 *
 * ⚠️ 注意：**不要**改成按「包围盒最短边」剔除窄条带。实测这类条带是真实几何
 * （点覆盖分析显示采样区内每个点恰好被覆盖 1 次，既无缝隙也无重叠），
 * 删掉它会在原地留下一条近黑的裂缝，比原来的亮线更难看。正确做法是 union 进主体。
 */
import { union } from 'polygon-clipping'

type Pos = [number, number]
type Ring = Pos[]
type PolygonCoords = Ring[]
type MultiPolygonCoords = PolygonCoords[]

/**
 * 环 / 多边形面积小于该值（单位：平方度）即视为退化。
 * 1e-6 deg² ≈ 5 个设计像素的面积，小到肉眼不可见；
 * 而正式的街镇主体最小也有 5.3e-4 deg²，两者差三个数量级，阈值很好取。
 */
export const MIN_AREA = 1e-6

interface GeoGeometryLike {
  type: string
  coordinates: unknown
}

interface GeoFeatureLike {
  type: string
  properties?: unknown
  geometry?: GeoGeometryLike | null
}

interface GeoLike {
  type: string
  properties?: unknown
  geometry?: GeoGeometryLike | null
  features?: GeoFeatureLike[]
}

/** 环的绝对面积（鞋带公式，单位：平方度） */
function ringArea(ring: Ring): number {
  let a = 0
  for (let i = 0, n = ring.length; i < n; i++) {
    const p1 = ring[i]
    const p2 = ring[(i + 1) % n]
    a += p1[0] * p2[1] - p2[0] * p1[1]
  }
  return Math.abs(a / 2)
}

function toMultiPolygon(geom: GeoGeometryLike): MultiPolygonCoords {
  const coords = geom.type === 'Polygon' ? [geom.coordinates] : geom.coordinates
  return coords as MultiPolygonCoords
}

/** 丢弃退化的洞环；外环退化则整个多边形丢弃 */
function prune(polys: MultiPolygonCoords, minArea: number): MultiPolygonCoords {
  const out: MultiPolygonCoords = []
  for (const poly of polys) {
    if (!poly.length || ringArea(poly[0]) < minArea) continue
    out.push([poly[0], ...poly.slice(1).filter((hole) => ringArea(hole) >= minArea)])
  }
  return out
}

function cleanGeometry(geom: GeoGeometryLike, minArea: number): GeoGeometryLike {
  let polys = prune(toMultiPolygon(geom), minArea)
  // 全被清掉就保留原样，避免把整个街镇弄丢
  if (!polys.length) return geom

  if (polys.length > 1) {
    try {
      const merged = union(...polys) as unknown as MultiPolygonCoords
      const cleaned = prune(merged, minArea)
      if (cleaned.length) polys = cleaned
    } catch {
      // union 失败就退回「只剔除退化环」的结果，不影响渲染
    }
  }

  return polys.length === 1
    ? { type: 'Polygon', coordinates: polys[0] }
    : { type: 'MultiPolygon', coordinates: polys }
}

/**
 * 清理边界 GeoJSON（union 消内部接缝 + 剔除退化环），返回新对象，原对象不变。
 * 同时支持 FeatureCollection（街镇）与单个 Feature（区界）。
 */
export function cleanGeoJSON<T extends GeoLike>(geo: T, minArea = MIN_AREA): T {
  if (Array.isArray(geo.features)) {
    return {
      ...geo,
      features: geo.features.map((f) =>
        f.geometry ? { ...f, geometry: cleanGeometry(f.geometry, minArea) } : f
      )
    } as T
  }
  if (geo.geometry) {
    return { ...geo, geometry: cleanGeometry(geo.geometry, minArea) } as T
  }
  return geo
}
