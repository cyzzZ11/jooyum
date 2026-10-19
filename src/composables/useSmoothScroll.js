import { onBeforeUnmount, onMounted } from 'vue'

/**
 * 页内锚点平滑滚动（事件委托，路由切换自动解绑）。
 */
export function useSmoothScroll({ offset = 0, activeNavSelector = null, excludeSelector = null, onNavigate = null } = {}) {
  let handler = null

  onMounted(() => {
    handler = (event) => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor || event.defaultPrevented) return
      if (excludeSelector && anchor.matches(excludeSelector)) return

      const href = anchor.getAttribute('href')
      if (!href || href === '#') return

      let target = null
      try {
        target = document.querySelector(href)
      } catch {
        return
      }
      if (!target) return

      event.preventDefault()
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })

      if (activeNavSelector) {
        document.querySelectorAll(activeNavSelector).forEach((el) => {
          el.classList.toggle('active', el === anchor)
        })
      }

      onNavigate?.(anchor, target)
    }

    document.addEventListener('click', handler)
  })

  onBeforeUnmount(() => {
    if (handler) document.removeEventListener('click', handler)
  })
}
