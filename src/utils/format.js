/**
 * 数值格式化：中文大屏口径（万 / 亿 分级），与参考站展示习惯一致。
 */

/** 保留 n 位小数并去掉多余的 0 */
export function fixed(num, n = 2) {
  if (num === null || num === undefined || Number.isNaN(Number(num))) return '-'
  const v = Number(num)
  return v.toFixed(n).replace(/\.?0+$/, '')
}

/** 千分位 */
export function thousands(num) {
  if (num === null || num === undefined || Number.isNaN(Number(num))) return '-'
  return String(Math.round(Number(num))).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 自动分级：>=1亿 显示 x.xx亿；>=1万 显示 x.xx万；否则原值
 * @param {number} num
 * @param {number} digit 小数位
 */
export function autoUnit(num, digit = 2) {
  const v = Number(num)
  if (num === null || num === undefined || Number.isNaN(v)) return { value: '-', unit: '' }
  if (Math.abs(v) >= 1e8) return { value: fixed(v / 1e8, digit), unit: '亿' }
  if (Math.abs(v) >= 1e4) return { value: fixed(v / 1e4, digit), unit: '万' }
  return { value: thousands(v), unit: '' }
}

/** 同比展示：正数带 + 号 */
export function percent(num, digit = 2) {
  if (num === null || num === undefined || Number.isNaN(Number(num))) return '-'
  const v = Number(num)
  return `${v > 0 ? '+' : ''}${fixed(v, digit)}`
}

/** 金额（元）转亿元/万元 */
export function money(num) {
  const v = Number(num)
  if (Number.isNaN(v)) return { value: '-', unit: '' }
  if (Math.abs(v) >= 1e8) return { value: fixed(v / 1e8, 2), unit: '亿元' }
  if (Math.abs(v) >= 1e4) return { value: fixed(v / 1e4, 1), unit: '万元' }
  return { value: thousands(v), unit: '元' }
}

/** 生成 [start, end] 之间的整数随机数（含端点） */
export function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/** 生成带种子的稳定伪随机数，保证同一区域/指标下数据不跳动 */
export function seeded(seed) {
  let h = 2166136261
  const str = String(seed)
  for (let i = 0; i < str.length; i += 1) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** 最近 n 个月的 'M月' 标签 */
export function recentMonths(n = 12, endDate = new Date()) {
  const list = []
  const d = new Date(endDate.getFullYear(), endDate.getMonth(), 1)
  for (let i = n - 1; i >= 0; i -= 1) {
    const t = new Date(d.getFullYear(), d.getMonth() - i, 1)
    list.push(`${t.getMonth() + 1}月`)
  }
  return list
}

/** 最近 n 天的 'M/D' 标签 */
export function recentDays(n = 30, endDate = new Date()) {
  const list = []
  for (let i = n - 1; i >= 0; i -= 1) {
    const t = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() - i)
    list.push(`${t.getMonth() + 1}/${t.getDate()}`)
  }
  return list
}
