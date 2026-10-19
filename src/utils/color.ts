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
