/**
 * 统一请求封装：mock 模式下由 src/mock/index.js 直接返回数据；
 * api 模式下按参考站的鉴权约定（Bearer token + smart_token_jwt）请求真实后端。
 */
import { getMock } from '@/mock'

const ctx = () => window.appContext || {}

export async function request(url, params = {}, options = {}) {
  const app = ctx()

  if ((app.dataMode || 'mock') === 'mock') {
    // 模拟网络延迟，便于观察 loading 态
    await new Promise((r) => setTimeout(r, options.delay ?? 160))
    return getMock(url, params)
  }

  const base = (app.baseUrl || '').replace(/\/?$/, '/')
  const query = new URLSearchParams(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== '')
  ).toString()
  const fullUrl = `${base}${url.replace(/^\//, '')}${query ? `?${query}` : ''}`

  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), app.timeout || 20000)

  try {
    const res = await fetch(fullUrl, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('songjiang_wenlv_token') || ''}`,
        smart_token_jwt: localStorage.getItem('songjiang_wenlv_userId') || ''
      },
      signal: controller.signal
    })
    if (!res.ok) throw new Error(`请求失败：${res.status} ${res.statusText}`)
    const data = await res.json()
    // 参考站约定：{ code, data, msg }
    if (data && typeof data === 'object' && 'data' in data) {
      if (data.code && data.code !== 200 && data.code !== 0) throw new Error(data.msg || '接口返回异常')
      return data.data
    }
    return data
  } finally {
    clearTimeout(timer)
  }
}

/** GET 简写 */
export const get = (url, params, options) => request(url, params, options)
