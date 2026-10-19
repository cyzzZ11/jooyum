import { onBeforeUnmount, onMounted, ref } from 'vue'

const SPLASH_AUTO_HIDE = 3000
const SPLASH_COUNTDOWN_TICK = 50
const CAROUSEL_DELAY = 5000

/**
 * 首页交互：首屏弹窗、轮播、下拉导航、移动端导航、平滑滚动、数字滚动与渐显动画。
 */
export function useHomePage() {
  const splashVisible = ref(true)
  const appVisible = ref(false)
  const splashSeconds = ref(Math.ceil(SPLASH_AUTO_HIDE / 1000))
  const splashProgress = ref(0)

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

  function hideSplash() {
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
  function goTo(index, direction = 'next') {
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

  function resetAutoPlay() {
    const activeDot = carouselDots[carouselIndex]
    if (!activeDot) return
    activeDot.classList.remove('carousel__dot--active')
    void activeDot.offsetWidth
    activeDot.classList.add('carousel__dot--active')
  }

  function initCarousel() {
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
  function initScrollAnim() {
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
  function initCountUp() {
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
  function initScrollReveal() {
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

  // ===== 移动端导航 =====
  function initMobileNav() {
    const toggle = document.getElementById('navToggle')
    const menu = document.querySelector('.nav__menu')
    if (!toggle || !menu) return

    const close = () => {
      menu.classList.remove('is-open')
      toggle.classList.remove('is-active')
    }

    on(toggle, 'click', () => {
      menu.classList.toggle('is-open')
      toggle.classList.toggle('is-active')
    })
    menu.querySelectorAll('.nav__link').forEach((link) => on(link, 'click', close))
    on(document, 'click', (event) => {
      if (!menu.contains(event.target) && !toggle.contains(event.target)) close()
    })
  }

  // ===== 下拉菜单 =====
  function initDropdowns() {
    const dropdowns = Array.from(document.querySelectorAll('.nav__item--dropdown'))
    if (!dropdowns.length) return

    const isMobile = () => window.matchMedia('(max-width: 768px)').matches

    const closeRoot = (root) => {
      root.classList.remove('is-open')
      root.querySelector('.nav__dropdown-trigger')?.setAttribute('aria-expanded', 'false')
      root.querySelectorAll('.nav__dropdown-item--has-sub.is-open').forEach((el) => el.classList.remove('is-open'))
    }

    const closeAll = (except) => {
      dropdowns.forEach((root) => {
        if (root !== except) closeRoot(root)
      })
    }

    dropdowns.forEach((root) => {
      const trigger = root.querySelector('.nav__dropdown-trigger')
      if (trigger) {
        on(trigger, 'click', (event) => {
          event.preventDefault()
          event.stopPropagation()
          const willOpen = !root.classList.contains('is-open')
          if (willOpen && !isMobile()) closeAll(root)
          root.classList.toggle('is-open', willOpen)
          trigger.setAttribute('aria-expanded', String(willOpen))
          if (!willOpen) {
            root.querySelectorAll('.nav__dropdown-item--has-sub.is-open').forEach((el) => el.classList.remove('is-open'))
          }
        })
      }

      root.querySelectorAll('.nav__dropdown-item--has-sub').forEach((item) => {
        on(item, 'click', (event) => {
          if (!isMobile()) return
          event.preventDefault()
          event.stopPropagation()
          const parentMenu = item.parentElement
          parentMenu.querySelectorAll(':scope > .nav__dropdown-item--has-sub.is-open').forEach((el) => {
            if (el !== item) el.classList.remove('is-open')
          })
          item.classList.toggle('is-open')
        })
      })
    })

    on(document, 'click', (event) => {
      dropdowns.forEach((root) => {
        if (!root.contains(event.target)) closeRoot(root)
      })
    })
    on(document, 'keydown', (event) => {
      if (event.key === 'Escape') dropdowns.forEach(closeRoot)
    })

    const toggle = document.getElementById('navToggle')
    const menu = document.querySelector('.nav__menu')
    if (toggle && menu) {
      on(toggle, 'click', () => {
        if (!menu.classList.contains('is-open')) dropdowns.forEach(closeRoot)
      })
    }
  }

  // ===== 平滑滚动 =====
  function initSmoothScroll() {
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
      window.scrollTo({ top: target.offsetTop - 64, behavior: 'smooth' })
    })
  }

  const onKeydown = (event) => {
    if (event.key === 'Escape' && splashVisible.value) hideSplash()
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)

    const grid = document.getElementById('activityGrid')
    if (grid) grid.innerHTML += grid.innerHTML

    initCarousel()
    initMobileNav()
    initDropdowns()
    initSmoothScroll()
    initCountUp()
    initScrollReveal()

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

  return { splashVisible, appVisible, splashSeconds, splashProgress, hideSplash }
}
