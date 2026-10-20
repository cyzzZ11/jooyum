/** 颜色工具：十六进制插值 / 色带取色 */
function hex2rgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  const v = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [parseInt(v.slice(0, 2), 16), parseInt(v.slice(2, 4), 16), parseInt(v.slice(4, 6), 16)]
}

/** 线性插值两个颜色，t ∈ [0,1] */
export function mixColor(from: string, to: string, t: number): string {
  const k = Math.min(1, Math.max(0, t))
  const [r1, g1, b1] = hex2rgb(from)
  const [r2, g2, b2] = hex2rgb(to)
  const r = Math.round(r1 + (r2 - r1) * k)
  const g = Math.round(g1 + (g2 - g1) * k)
  const b = Math.round(b1 + (b2 - b1) * k)
  return `rgb(${r}, ${g}, ${b})`
}

/** 带透明度的 rgba 字符串 */
export function rgba(hex: string, alpha: number): string {
  const [r, g, b] = hex2rgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
/**
 * 多段色带取色（分级配色）
 * @param stops 至少 2 个颜色，从暗到亮
 * @param t     0~1
 */
export function rampColor(stops: string[], t: number): string {
  if (!stops.length) return '#0d3d6b'
  if (stops.length === 1) return stops[0]
  const k = Math.min(1, Math.max(0, t))
  const seg = k * (stops.length - 1)
  const i = Math.min(stops.length - 2, Math.floor(seg))
  return mixColor(stops[i], stops[i + 1], seg - i)
}

/**
 * 秩次归一化：把一组数值映射到 [0,1] 的「等间距排名位置」。
 *
 * 为什么不用 (v-min)/(max-min)：当存在极端离群值时该公式会把绝大多数样本压到
 * 色带最暗的一端（例：佘山镇接待游客 486 万人次，是多数街镇的 4~5 倍，按数值
 * 归一化后 15 个街镇全挤在 0~0.3 区间，地图看上去「一个亮点 + 一片深蓝」）。
 * 按名次铺开可以保证 17 个街镇在色带上均匀分布、层次分明。
 *
 * 相同数值获得同一个 t（并列名次取平均），不会出现等值不同色。
 */
export function rankRatio(values: number[]): number[] {
  const n = values.length
  if (n <= 1) return values.map(() => 1)
  const sorted = [...values].sort((a, b) => a - b)
  return values.map((v) => {
    const lo = sorted.indexOf(v)
    const hi = sorted.lastIndexOf(v)
    return (lo + hi) / 2 / (n - 1)
  })
}