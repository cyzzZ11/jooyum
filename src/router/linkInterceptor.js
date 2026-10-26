/**
 * 让模板中的普通 <a href="/..."> 走 vue-router 客户端跳转，
 * 同时保留外部链接、新窗口打开、下载与锚点滚动的原生行为。
 * 自动适配子目录部署（通过 import.meta.env.BASE_URL）。
 */
export function installLinkInterceptor (router) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '') // 如 /dxckcy

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button !== 0) return
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

    const anchor = event.target.closest('a')
    if (!anchor) return
    if (anchor.target && anchor.target !== '_self') return
    if (anchor.hasAttribute('download')) return

    const href = anchor.getAttribute('href')
    if (!href || href.startsWith('#')) return

    const url = new URL(anchor.href, window.location.href)
    if (url.origin !== window.location.origin) return
    if (url.pathname === window.location.pathname && url.search === window.location.search) return

    // 子目录部署：把 /dxckcy/company-index 归一为 /company-index，
    // 由 vue-router 的 base 统一拼接，避免出现 /dxckcy/dxckcy/...
    let targetPath = url.pathname
    if (basePath && (targetPath === basePath || targetPath.startsWith(basePath + '/'))) {
      targetPath = targetPath.slice(basePath.length) || '/'
    }

    event.preventDefault()
    router.push(targetPath + url.search + url.hash)
  })
}
