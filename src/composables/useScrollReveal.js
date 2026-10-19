import { onBeforeUnmount, onMounted } from 'vue'

/**
 * 滚动进入视口时添加动画类名。
 */
export function useScrollReveal(selector, options = {}) {
  const {
    className = 'visible',
    threshold = 0.1,
    rootMargin = '0px',
    initialOpacity = null,
    transitionDelay = false,
  } = options

  let observer = null

  onMounted(() => {
    const elements = Array.from(document.querySelectorAll(selector))
    if (!elements.length) return

    if (initialOpacity !== null || transitionDelay) {
      elements.forEach((el, index) => {
        if (initialOpacity !== null) el.style.opacity = String(initialOpacity)
        if (transitionDelay) el.classList.add(`delay-${(index % 4) + 1}`)
      })
    }

    if (typeof IntersectionObserver === 'undefined') {
      elements.forEach((el) => className && el.classList.add(className))
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        if (className) entry.target.classList.add(className)
        observer.unobserve(entry.target)
      })
    }, { threshold, rootMargin })

    elements.forEach((el) => observer.observe(el))
  })

  onBeforeUnmount(() => observer?.disconnect())
}
