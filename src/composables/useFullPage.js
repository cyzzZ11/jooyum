import { onBeforeUnmount, onMounted, ref } from 'vue'

const WHEEL_THRESHOLD = 42
const WHEEL_IDLE_RESET = 220
const TRANSITION_LOCK = 820
const TOUCH_THRESHOLD = 56

/**
 * 整屏滚动（full-page scroll）：滚轮 / 键盘 / 触控一次切换一整屏，
 * 仅在匹配 enabledQuery 的视口下启用，否则回退为普通滚动。
 */
export function useFullPage({
  viewportSelector = '.fp-viewport',
  sectionSelector = '.fp-section',
  enabledQuery = '(min-width: 900px) and (min-height: 560px)',
} = {}) {
  const index = ref(0)
  const count = ref(0)
  const enabled = ref(false)
  const animating = ref(false)
  // 过渡结束瞬间关闭过渡，强制落到最终位置（防止动画被浏览器节流时停在中间）
  const settling = ref(false)

  let sections = []
  let viewportEl = null
  let media = null
  let lockTimer = null
  let wheelAccum = 0
  let wheelIdleTimer = null
  let touchStartY = null
  let touchStartTime = 0
  let settleTimer = null

  function goTo(target) {
    const next = Math.min(Math.max(target, 0), Math.max(sections.length - 1, 0))
    if (!sections.length || next === index.value) return

    index.value = next
    const section = sections[next]
    if (section) section.scrollTop = 0

    // 后台标签页里过渡动画会被暂停，直接跳到目标位置
    if (document.hidden) {
      settling.value = true
      return
    }

    settling.value = false
    animating.value = true
    clearTimeout(lockTimer)
    lockTimer = setTimeout(() => {
      animating.value = false
      settling.value = true
      clearTimeout(settleTimer)
      settleTimer = setTimeout(() => {
        settling.value = false
      }, 80)
    }, TRANSITION_LOCK)
  }

  const next = () => goTo(index.value + 1)
  const prev = () => goTo(index.value - 1)

  /** 当前屏内容超出可视高度时，先让内部滚动消费滚轮 */
  function isInnerScrollable(section, delta) {
    if (!section || section.scrollHeight <= section.clientHeight + 1) return false
    const atTop = section.scrollTop <= 0
    const atBottom = section.scrollTop + section.clientHeight >= section.scrollHeight - 1
    return delta > 0 ? !atBottom : !atTop
  }

  function onWheel(event) {
    if (!enabled.value || event.ctrlKey) return
    if (document.body.style.overflow === 'hidden') return

    const delta = wheelAccum + event.deltaY
    if (isInnerScrollable(sections[index.value], event.deltaY)) {
      wheelAccum = 0
      return
    }

    event.preventDefault()
    if (animating.value) return

    wheelAccum = delta
    clearTimeout(wheelIdleTimer)
    wheelIdleTimer = setTimeout(() => {
      wheelAccum = 0
    }, WHEEL_IDLE_RESET)

    if (Math.abs(wheelAccum) < WHEEL_THRESHOLD) return

    const step = wheelAccum
    wheelAccum = 0
    if (step > 0) next()
    else prev()
  }

  function onKeydown(event) {
    if (!enabled.value) return
    const active = document.activeElement
    const tag = active?.tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || active?.isContentEditable) return

    switch (event.key) {
      case 'ArrowDown':
      case 'PageDown':
        event.preventDefault()
        next()
        break
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault()
        prev()
        break
      case 'Home':
        event.preventDefault()
        goTo(0)
        break
      case 'End':
        event.preventDefault()
        goTo(sections.length - 1)
        break
      default:
        break
    }
  }

  function onTouchStart(event) {
    if (!enabled.value || event.touches.length !== 1) return
    touchStartY = event.touches[0].clientY
    touchStartTime = Date.now()
  }

  function onTouchEnd(event) {
    if (!enabled.value || touchStartY === null || animating.value) return
    const endY = event.changedTouches[0]?.clientY ?? touchStartY
    const delta = touchStartY - endY
    const elapsed = Date.now() - touchStartTime
    touchStartY = null
    if (elapsed > 800) return
    if (Math.abs(delta) < TOUCH_THRESHOLD) return
    if (isInnerScrollable(sections[index.value], delta)) return
    if (delta > 0) next()
    else prev()
  }

  /** 页内锚点（页脚快速链接等）直接切屏 */
  function onClick(event) {
    if (!enabled.value) return
    const link = event.target.closest('a[href^="#"]')
    if (!link) return
    const id = link.getAttribute('href').slice(1)
    if (!id) return
    const target = sections.findIndex((el) => el.id === id)
    if (target < 0) return
    event.preventDefault()
    goTo(target)
  }

  function onVisibilityChange() {
    if (!document.hidden) settling.value = false
  }

  function applyMode() {
    enabled.value = Boolean(media?.matches)
    if (!enabled.value) {
      index.value = 0
      animating.value = false
      settling.value = false
      clearTimeout(lockTimer)
      clearTimeout(settleTimer)
    }
  }

  onMounted(() => {
    viewportEl = document.querySelector(viewportSelector)
    sections = Array.from(document.querySelectorAll(sectionSelector))
    count.value = sections.length

    media = window.matchMedia(enabledQuery)
    applyMode()
    media.addEventListener('change', applyMode)
    document.addEventListener('visibilitychange', onVisibilityChange)

    if (!viewportEl) return
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('keydown', onKeydown)
    window.addEventListener('click', onClick)
    viewportEl.addEventListener('touchstart', onTouchStart, { passive: true })
    viewportEl.addEventListener('touchend', onTouchEnd, { passive: true })
  })

  onBeforeUnmount(() => {
    clearTimeout(lockTimer)
    clearTimeout(settleTimer)
    clearTimeout(wheelIdleTimer)
    media?.removeEventListener('change', applyMode)
    document.removeEventListener('visibilitychange', onVisibilityChange)
    window.removeEventListener('wheel', onWheel)
    window.removeEventListener('keydown', onKeydown)
    window.removeEventListener('click', onClick)
    viewportEl?.removeEventListener('touchstart', onTouchStart)
    viewportEl?.removeEventListener('touchend', onTouchEnd)
    viewportEl = null
    sections = []
  })

  return { index, count, enabled, animating, settling, goTo }
}
