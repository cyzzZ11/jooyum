/**
 * 让模板中的普通 <a href="/..."> 走 vue-router 客户端跳转，
 * 同时保留外部链接、新窗口打开、下载与锚点滚动的原生行为。
 */
export function installLinkInterceptor(router) {
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

    event.preventDefault()
    router.push(url.pathname + url.search + url.hash)
  })
}
