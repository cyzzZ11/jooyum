import { geoRing } from '@/data/resource'

const PAD = 26
const W = 1000

// 经纬度 -> SVG 坐标（等距圆柱投影 + 纬度余弦修正，保证形状不变形）
const lons = geoRing.map((p) => p[0])
const lats = geoRing.map((p) => p[1])
const minLon = Math.min(...lons)
const maxLon = Math.max(...lons)
const minLat = Math.min(...lats)
const maxLat = Math.max(...lats)
const midLat = (minLat + maxLat) / 2
const kx = Math.cos((midLat * Math.PI) / 180)

const rawW = (maxLon - minLon) * kx
const rawH = maxLat - minLat
const scale = (W - PAD * 2) / rawW
const H = Math.round(rawH * scale + PAD * 2)

export function project(lon, lat) {
  const x = PAD + (lon - minLon) * kx * scale
  const y = PAD + (maxLat - lat) * scale
  return { x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10 }
}

export const boundaryPath = geoRing
  .map(([lon, lat], i) => {
    const { x, y } = project(lon, lat)
    return `${i === 0 ? 'M' : 'L'}${x} ${y}`
  })
  .join(' ')
  .concat(' Z')

export const viewBox = `0 0 ${W} ${H}`
