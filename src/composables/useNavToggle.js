/**
 * 移动端导航开合（就业服务页使用）。
 */
export function useNavToggle(navSelector = '#mainNav', buttonSelector = '.mobile-toggle') {
  const getElements = () => ({
    nav: document.querySelector(navSelector),
    button: document.querySelector(buttonSelector),
  })

  const closeNav = () => {
    const { nav, button } = getElements()
    nav?.classList.remove('is-open')
    button?.setAttribute('aria-expanded', 'false')
  }

  const toggleNav = () => {
    const { nav, button } = getElements()
    if (!nav) return
    const isOpen = nav.classList.toggle('is-open')
    button?.setAttribute('aria-expanded', String(isOpen))
  }

  return { toggleNav, closeNav }
}
