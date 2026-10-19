/** 千分位 */
export function thousands(n: number | string, digits = 0): string {
    const num = Number(n)
    if (!Number.isFinite(num)) return String(n)
    const [int, dec] = num.toFixed(digits).split('.')
    let out = int.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    // 避免出现 "-0"
    if (/^-0$/.test(out)) out = '0'
    return dec ? `${out}.${dec}` : out
}

/** 大数简写：12800 -> 1.28万 */
export function compact(n: number, unit = '万'): string {
    if (!Number.isFinite(n)) return '-'
    if (Math.abs(n) >= 10000) return `${(n / 10000).toFixed(2)}${unit}`
    return thousands(n)
}

/** 百分比 */
export function percent(v: number, digits = 1): string {
    return `${(v * 100).toFixed(digits)}%`
}

/** 补零 */
export function pad2(n: number): string {
    return String(n).padStart(2, '0')
}
