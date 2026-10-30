import { onBeforeUnmount, onMounted, ref } from 'vue'

const SPLASH_AUTO_HIDE = 3000
const SPLASH_COUNTDOWN_TICK = 50
const CAROUSEL_DELAY = 5000

/**
 * 首页交互：首屏弹窗、轮播、下拉导航、移动端导航、平滑滚动、数字滚动与渐显动画。
 */
export function useHomePage () {
  const splashVisible = ref(true)
  const appVisible = ref(false)
  const splashSeconds = ref(Math.ceil(SPLASH_AUTO_HIDE / 1000))
  const splashProgress = ref(0)
  const scrollProgress = ref(0)

  let scrollFrame = null
  let countdownTimer = null
  let revealTimer = null
  let hideDisplayTimer = null
  let carouselTimer = null
  let carouselAnimTimer = null
  let isCarouselPaused = false
  let isCarouselAnimating = false
  let carouselIndex = 0
  let carousel = null
  let carouselSlides = []
  let carouselDots = []
  let touchStartX = 0
  let scrollObserver = null
  let countObserver = null
  let revealObserver = null
  const listeners = []

  const on = (target, type, handler, options) => {
    if (!target) return
    target.addEventListener(type, handler, options)
    listeners.push([target, type, handler, options])
  }

  function hideSplash () {
    if (!splashVisible.value) return
    if (countdownTimer) {
      clearInterval(countdownTimer)
      countdownTimer = null
    }
    splashProgress.value = 1
    splashVisible.value = false

    revealTimer = setTimeout(() => {
      appVisible.value = true
      initScrollAnim()
    }, 200)

    hideDisplayTimer = setTimeout(() => {
      const modal = document.getElementById('splashModal')
      if (modal) modal.style.display = 'none'
    }, 800)
  }

  // ===== 轮播 =====
  function goTo (index, direction = 'next') {
    if (isCarouselAnimating || index === carouselIndex) return
    isCarouselAnimating = true

    const currentSlide = carouselSlides[carouselIndex]
    const nextSlide = carouselSlides[index]

    nextSlide.style.transform = direction === 'next' ? 'translateX(30px)' : 'translateX(-30px)'
    void nextSlide.offsetWidth

    currentSlide.classList.remove('carousel__slide--active')
    currentSlide.style.transform = direction === 'next' ? 'translateX(-30px)' : 'translateX(30px)'

    nextSlide.classList.add('carousel__slide--active')
    nextSlide.style.transform = 'translateX(0)'

    carouselDots[carouselIndex]?.classList.remove('carousel__dot--active')
    carouselDots[index]?.classList.add('carousel__dot--active')

    carouselIndex = index
    resetAutoPlay()

    carouselAnimTimer = setTimeout(() => {
      isCarouselAnimating = false
      currentSlide.classList.remove('carousel__slide--prev')
      currentSlide.style.transform = ''
    }, 500)
  }

  const next = () => {
    if (isCarouselAnimating) return
    goTo((carouselIndex + 1) % carouselSlides.length, 'next')
  }

  const prev = () => {
    if (isCarouselAnimating) return
    goTo((carouselIndex - 1 + carouselSlides.length) % carouselSlides.length, 'prev')
  }

  function resetAutoPlay () {
    const activeDot = carouselDots[carouselIndex]
    if (!activeDot) return
    activeDot.classList.remove('carousel__dot--active')
    void activeDot.offsetWidth
    activeDot.classList.add('carousel__dot--active')
  }

  function initCarousel () {
    carousel = document.getElementById('carousel')
    if (!carousel) return

    carouselSlides = Array.from(carousel.querySelectorAll('.carousel__slide'))
    carouselDots = Array.from(carousel.querySelectorAll('.carousel__dot'))
    if (carouselSlides.length <= 1) return

    on(document.getElementById('carouselPrev'), 'click', prev)
    on(document.getElementById('carouselNext'), 'click', next)
    carouselDots.forEach((dot, index) => on(dot, 'click', () => goTo(index)))
    on(carousel, 'mouseenter', () => { isCarouselPaused = true })
    on(carousel, 'mouseleave', () => { isCarouselPaused = false })
    on(carousel, 'touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX
      isCarouselPaused = true
    }, { passive: true })
    on(carousel, 'touchend', (event) => {
      const diff = touchStartX - event.changedTouches[0].screenX
      if (Math.abs(diff) > 50) {
        if (diff > 0) next()
        else prev()
      }
      isCarouselPaused = false
    }, { passive: true })

    on(document, 'visibilitychange', () => {
      isCarouselPaused = document.hidden
    })

    carouselTimer = setInterval(() => {
      if (!isCarouselPaused) next()
    }, CAROUSEL_DELAY)
  }

  // ===== 滚动动画 =====
  function initScrollAnim () {
    const elements = Array.from(document.querySelectorAll(
      '.section-header, .activity-card, .activity-tabs, .footer__grid > *'
    ))
    if (!elements.length) return

    elements.forEach((el) => el.classList.add('fade-in-up'))

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'))
      return
    }

    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          scrollObserver.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' })

    elements.forEach((el, index) => {
      if (el.classList.contains('activity-card')) {
        el.style.transitionDelay = `${(index % 2) * 80}ms`
      }
      scrollObserver.observe(el)
    })
  }

  // ===== 数字滚动计数 =====
  function initCountUp () {
    const numbers = Array.from(document.querySelectorAll('.stat-number'))
    if (!numbers.length || typeof IntersectionObserver === 'undefined') return

    countObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const target = Number.parseInt(el.getAttribute('data-target'), 10) || 0
        const label = el.nextElementSibling
        const suffix = label && label.textContent.includes('万') ? '+' : ''
        const duration = 2000
        let startTime = null

        const animate = (currentTime) => {
          if (!startTime) startTime = currentTime
          const progress = Math.min((currentTime - startTime) / duration, 1)
          const eased = 1 - Math.pow(1 - progress, 4)
          el.textContent = Math.floor(eased * target).toLocaleString() + suffix
          if (progress < 1) {
            requestAnimationFrame(animate)
          } else {
            el.textContent = target.toLocaleString() + suffix
          }
        }

        requestAnimationFrame(animate)
        countObserver.unobserve(el)
      })
    }, { threshold: 0.3 })

    numbers.forEach((el) => countObserver.observe(el))
  }

  // ===== 渐显动画 =====
  function initScrollReveal () {
    const elements = Array.from(document.querySelectorAll('.stat-card, .partner-logo'))
    if (!elements.length || !('IntersectionObserver' in window)) return

    elements.forEach((el) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
    })

    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        const delay = Array.from(el.parentNode.children).indexOf(el) * 60
        setTimeout(() => {
          el.style.opacity = '1'
          el.style.transform = 'translateY(0)'
        }, delay)
        revealObserver.unobserve(el)
      })
    }, { threshold: 0.1 })

    elements.forEach((el) => revealObserver.observe(el))
  }

  // ===== 鼠标视差 + 光斑跟随（仅首页首屏） =====
  let mouseFrame = null
  let mouseVarTarget = null
  function initMouseParallax () {
    // 尊重用户偏好：关闭动画时只写入 0，避免所有 transform
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // 这些变量只在首屏背景内部被消费，写到 .tech-backdrop 上，
    // 避免每帧修改根元素自定义属性触发整页样式重算（会拖慢光标跟手）
    const root = document.querySelector('.tech-backdrop') || document.documentElement
    mouseVarTarget = root
    root.style.setProperty('--mouse-x', '50%')
    root.style.setProperty('--mouse-y', '50%')
    root.style.setProperty('--mouse-rx', '0')
    root.style.setProperty('--mouse-ry', '0')
    root.style.setProperty('--mouse-active', prefersReduced ? '0' : '1')

    if (prefersReduced) return

    const targets = [document, window]
    let pending = false
    const onMove = (e) => {
      if (pending) return
      pending = true
      mouseFrame = requestAnimationFrame(() => {
        pending = false
        const w = window.innerWidth || 1
        const h = window.innerHeight || 1
        const x = e.clientX / w // 0..1
        const y = e.clientY / h
        root.style.setProperty('--mouse-x', (x * 100).toFixed(2) + '%')
        root.style.setProperty('--mouse-y', (y * 100).toFixed(2) + '%')
        // 归一化到 -0.5 .. 0.5
        root.style.setProperty('--mouse-rx', (x - 0.5).toFixed(3))
        root.style.setProperty('--mouse-ry', (y - 0.5).toFixed(3))
      })
    }
    const reset = () => {
      if (pending) cancelAnimationFrame(mouseFrame)
      root.style.setProperty('--mouse-rx', '0')
      root.style.setProperty('--mouse-ry', '0')
      root.style.setProperty('--mouse-active', '0')
    }
    const enter = () => root.style.setProperty('--mouse-active', '1')

    on(document, 'mousemove', onMove, { passive: true })
    on(document, 'mouseleave', reset)
    on(document, 'mouseenter', enter)
    on(window, 'blur', reset)
  }

  // ===== 自定义科技感双层光标（主图形箭头 + 发光小点，JS 惯性跟随） =====
  let cursorFrame = null
  function initCustomCursor() {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isIE = !!document.documentMode
    if (isTouch || noMotion || isIE) return

    const arrow = document.querySelector('.cursor-arrow')
    if (!arrow) return

    document.body.classList.add('has-custom-cursor', 'cursor-visible')

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2

    const interactiveSelector = [
      'a', 'button', '[role="button"]',
      'input', 'textarea', 'select',
      '.nav__link', '.carousel__dot', '.news-list__item',
      '.card', '.activity-card', '.stat-card', '.carousel',
      '[data-cursor="hover"]',
    ].join(',')

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY
    }
    const onOver = (e) => {
      const t = e.target.closest(interactiveSelector)
      document.body.classList.toggle('cursor-hover', !!t)
    }
    const onDown = () => document.body.classList.add('cursor-press')
    const onUp = () => document.body.classList.remove('cursor-press')
    const onLeave = () => document.body.classList.remove('cursor-visible')
    const onEnter = () => document.body.classList.add('cursor-visible')

    on(document, 'mousemove', onMove, { passive: true })
    on(document, 'mouseover', onOver, { passive: true })
    on(document, 'mousedown', onDown)
    on(document, 'mouseup', onUp)
    on(document, 'mouseleave', onLeave)
    on(document, 'mouseenter', onEnter)

    let lastX = null
    let lastY = null

    function loop() {
      // 位置一变就直接跟上，不做插值，避免任何可感知的延迟
      if (mx !== lastX || my !== lastY) {
        lastX = mx
        lastY = my
        // 把图形左上角的尖点（SVG 坐标 3,2 / viewBox 28）对准鼠标实际像素，
        // 用百分比平移，hover / press 改变尺寸时尖点依然锚定在指针上
        arrow.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-10.7143%, -7.1429%)`
      }
      cursorFrame = requestAnimationFrame(loop)
    }
    loop()
  }

  // ===== 首屏高度：扣掉吸顶导航 =====
  function initViewportFit () {
    const nav = document.querySelector('.site-nav')
    const sync = () => {
      const height = nav ? nav.offsetHeight : 64
      document.documentElement.style.setProperty('--home-nav-h', `${height}px`)
      document.documentElement.style.setProperty('--home-viewport-h', `${document.documentElement.clientHeight}px`)
    }
    sync()
    on(window, 'resize', sync)
  }

  // ===== 顶部滚动进度条 =====
  function initScrollProgress () {
    const update = () => {
      scrollFrame = null
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.value = max > 0 ? Math.min(window.scrollY / max, 1) : 0
    }
    const schedule = () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(update)
    }
    on(window, 'scroll', schedule, { passive: true })
    on(window, 'resize', schedule)
    update()
  }

  // ===== 平滑滚动 =====
  function initSmoothScroll () {
    on(document, 'click', (event) => {
      const anchor = event.target.closest('a[href^="#"]')
      if (!anchor || event.defaultPrevented) return
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
      const navHeight = document.querySelector('.site-nav')?.offsetHeight ?? 72
      window.scrollTo({ top: target.offsetTop - navHeight, behavior: 'smooth' })
    })
  }

  const onKeydown = (event) => {
    if (event.key === 'Escape' && splashVisible.value) hideSplash()
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)

    const grid = document.getElementById('activityGrid')
    if (grid) grid.innerHTML += grid.innerHTML

    initViewportFit()
    initScrollProgress()
    initCarousel()
    initSmoothScroll()
    initCountUp()
    initScrollReveal()
    initMouseParallax()
    initCustomCursor()

    const modal = document.getElementById('splashModal')
    if (modal) {
      const startedAt = Date.now()
      countdownTimer = setInterval(() => {
        const elapsed = Date.now() - startedAt
        splashProgress.value = Math.min(elapsed / SPLASH_AUTO_HIDE, 1)
        splashSeconds.value = Math.max(1, Math.ceil((SPLASH_AUTO_HIDE - elapsed) / 1000))
        if (elapsed >= SPLASH_AUTO_HIDE) hideSplash()
      }, SPLASH_COUNTDOWN_TICK)
    } else {
      appVisible.value = true
      initScrollAnim()
    }
  })

  onBeforeUnmount(() => {
    if (scrollFrame) cancelAnimationFrame(scrollFrame)
    if (mouseFrame) cancelAnimationFrame(mouseFrame)
    if (cursorFrame) cancelAnimationFrame(cursorFrame)
    document.body.classList.remove('has-custom-cursor', 'cursor-hover', 'cursor-press', 'cursor-visible')
    document.documentElement.style.removeProperty('--home-nav-h')
    document.documentElement.style.removeProperty('--home-viewport-h')
    if (mouseVarTarget) {
      ['--mouse-x', '--mouse-y', '--mouse-rx', '--mouse-ry', '--mouse-active']
        .forEach((name) => mouseVarTarget.style.removeProperty(name))
      mouseVarTarget = null
    }
    clearInterval(countdownTimer)
    clearTimeout(revealTimer)
    clearTimeout(hideDisplayTimer)
    clearTimeout(carouselAnimTimer)
    clearInterval(carouselTimer)
    scrollObserver?.disconnect()
    countObserver?.disconnect()
    revealObserver?.disconnect()
    listeners.forEach(([target, type, handler, options]) => {
      target.removeEventListener(type, handler, options)
    })
    document.removeEventListener('keydown', onKeydown)
  })

  return { splashVisible, appVisible, splashSeconds, splashProgress, scrollProgress, hideSplash }
}
