/**
 * 科技服务平台官网交互脚本
 * 功能：首屏弹窗、轮播、活动卡片筛选、滚动动画、移动端导航
 */

(function () {
  'use strict';

  // ===== 工具函数 =====
  function $(selector, ctx = document) {
    return ctx.querySelector(selector);
  }

  function $$(selector, ctx = document) {
    return Array.from(ctx.querySelectorAll(selector));
  }

  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function throttle(fn, delay) {
    let last = 0;
    return function (...args) {
      const now = Date.now();
      if (now - last >= delay) {
        last = now;
        fn.apply(this, args);
      }
    };
  }

  // ===== 首屏弹窗 =====
  const SplashModal = {
    modal: null,
    closeBtn: null,
    autoHideDelay: 2500, // 2.5秒后自动消失
    hideTimer: null,

    init() {
      this.modal = $('#splashModal');
      this.closeBtn = $('#splashCloseBtn');
      if (!this.modal) return;

      this.bindEvents();
      this.startAutoHide();
    },

    bindEvents() {
      // 点击关闭按钮
      this.closeBtn.addEventListener('click', () => this.hide());

      // 点击遮罩关闭
      this.modal.querySelector('.splash-modal__overlay').addEventListener('click', () => this.hide());

      // ESC键关闭
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !this.modal.classList.contains('is-hidden')) {
          this.hide();
        }
      });
    },

    startAutoHide() {
      this.hideTimer = setTimeout(() => this.hide(), this.autoHideDelay);
    },

    hide() {
      if (this.hideTimer) {
        clearTimeout(this.hideTimer);
        this.hideTimer = null;
      }

      this.modal.classList.add('is-hidden');
      this.modal.setAttribute('aria-hidden', 'true');

      // 弹窗消失后显示主体内容
      const app = $('#app');
      if (app) {
        // 同步触发，给一点延迟让视觉更自然
        setTimeout(() => {
          app.classList.add('is-visible');
          // 触发滚动动画初始化
          ScrollAnim.init();
        }, 200);
      }

      // 动画结束后从DOM流中移除（可选，保留也无妨）
      setTimeout(() => {
        this.modal.style.display = 'none';
      }, 800);
    }
  };

  // ===== 轮播组件 =====
  const Carousel = {
    carousel: null,
    track: null,
    slides: [],
    dots: [],
    prevBtn: null,
    nextBtn: null,
    currentIndex: 0,
    autoPlayInterval: null,
    autoPlayDelay: 5000,
    isPaused: false,
    isAnimating: false,
    touchStartX: 0,
    touchEndX: 0,

    init() {
      this.carousel = $('#carousel');
      if (!this.carousel) return;

      this.track = $('#carouselTrack');
      this.slides = $$('.carousel__slide', this.carousel);
      this.dots = $$('.carousel__dot', this.carousel);
      this.prevBtn = $('#carouselPrev');
      this.nextBtn = $('#carouselNext');

      if (this.slides.length <= 1) return;

      this.bindEvents();
      this.startAutoPlay();
    },

    bindEvents() {
      // 上下页按钮
      this.prevBtn.addEventListener('click', () => this.prev());
      this.nextBtn.addEventListener('click', () => this.next());

      // 指示器点击
      this.dots.forEach((dot, index) => {
        dot.addEventListener('click', () => this.goTo(index));
      });

      // 鼠标悬浮暂停
      this.carousel.addEventListener('mouseenter', () => this.pause());
      this.carousel.addEventListener('mouseleave', () => this.resume());

      // 触摸滑动
      this.carousel.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.pause();
      }, { passive: true });

      this.carousel.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
        this.resume();
      }, { passive: true });

      // 页面可见性变化时暂停/恢复
      document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
          this.pause();
        } else {
          this.resume();
        }
      });
    },

    handleSwipe() {
      const diff = this.touchStartX - this.touchEndX;
      const threshold = 50;

      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          this.next();
        } else {
          this.prev();
        }
      }
    },

    next() {
      if (this.isAnimating) return;
      const nextIndex = (this.currentIndex + 1) % this.slides.length;
      this.goTo(nextIndex, 'next');
    },

    prev() {
      if (this.isAnimating) return;
      const prevIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
      this.goTo(prevIndex, 'prev');
    },

    goTo(index, direction = 'next') {
      if (this.isAnimating || index === this.currentIndex) return;

      this.isAnimating = true;
      const currentSlide = this.slides[this.currentIndex];
      const nextSlide = this.slides[index];

      // 设置方向类
      nextSlide.style.transform = direction === 'next' ? 'translateX(30px)' : 'translateX(-30px)';

      // 强制重排
      // eslint-disable-next-line no-unused-expressions
      nextSlide.offsetWidth;

      // 当前幻灯片退出
      currentSlide.classList.remove('carousel__slide--active');
      currentSlide.style.transform = direction === 'next' ? 'translateX(-30px)' : 'translateX(30px)';

      // 下一张进入
      nextSlide.classList.add('carousel__slide--active');
      nextSlide.style.transform = 'translateX(0)';

      // 更新指示器
      this.dots[this.currentIndex].classList.remove('carousel__dot--active');
      this.dots[index].classList.add('carousel__dot--active');

      // 更新索引
      this.currentIndex = index;

      // 动画结束后重置
      setTimeout(() => {
        this.isAnimating = false;
        currentSlide.classList.remove('carousel__slide--prev');
        currentSlide.style.transform = '';
      }, 500);

      // 重置自动播放
      this.resetAutoPlay();
    },

    startAutoPlay() {
      this.autoPlayInterval = setInterval(() => {
        if (!this.isPaused) {
          this.next();
        }
      }, this.autoPlayDelay);
    },

    pause() {
      this.isPaused = true;
    },

    resume() {
      this.isPaused = false;
    },

    resetAutoPlay() {
      // 重新触发指示器动画
      const activeDot = this.dots[this.currentIndex];
      activeDot.classList.remove('carousel__dot--active');
      // 强制重排以重启动画
      // eslint-disable-next-line no-unused-expressions
      activeDot.offsetWidth;
      activeDot.classList.add('carousel__dot--active');
    }
  };

  // ===== 滚动动画 =====
  const ScrollAnim = {
    animatedElements: [],

    init() {
      // 为需要动画的元素添加类名
      const selectors = [
        '.section-header',
        '.activity-card',
        '.activity-tabs',
        '.footer__grid > *'
      ];

      this.animatedElements = $$(selectors.join(', '));
      this.animatedElements.forEach(el => el.classList.add('fade-in-up'));

      this.setupObserver();
    },

    setupObserver() {
      if (!('IntersectionObserver' in window)) {
        // 降级：直接显示
        this.animatedElements.forEach(el => el.classList.add('is-visible'));
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });

      this.animatedElements.forEach((el, index) => {
        // 卡片级别的交错延迟
        if (el.classList.contains('activity-card')) {
          const row = index % 2;
          el.style.transitionDelay = `${row * 80}ms`;
        }
        observer.observe(el);
      });
    }
  };

  // ===== 移动端导航 =====
  const MobileNav = {
    toggle: null,
    menu: null,

    init() {
      this.toggle = $('#navToggle');
      this.menu = $('.nav__menu');

      if (!this.toggle || !this.menu) return;

      this.bindEvents();
    },

    bindEvents() {
      this.toggle.addEventListener('click', () => {
        this.menu.classList.toggle('is-open');
        this.toggle.classList.toggle('is-active');
      });

      // 点击菜单项关闭
      $$('.nav__link', this.menu).forEach(link => {
        link.addEventListener('click', () => {
          this.menu.classList.remove('is-open');
          this.toggle.classList.remove('is-active');
        });
      });

      // 点击外部关闭
      document.addEventListener('click', (e) => {
        if (!this.menu.contains(e.target) && !this.toggle.contains(e.target)) {
          this.menu.classList.remove('is-open');
          this.toggle.classList.remove('is-active');
        }
      });
    }
  };

  // ===== 平滑滚动 =====
  const SmoothScroll = {
    init() {
      $$('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;

          const target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 64; // 减去导航栏高度
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    }
  };

  // ===== 初始化 =====
  function init() {
    // 首屏弹窗（优先初始化，控制主体内容显示时机）
    SplashModal.init();

    // 轮播
    Carousel.init();

    // 移动端导航
    MobileNav.init();

    // 平滑滚动
    SmoothScroll.init();

    // 数字滚动计数
    initCountUp();

    // 活动卡片自动滚动：克隆一份实现无缝循环
    var grid = document.getElementById('activityGrid');
    if (grid) {
      grid.innerHTML += grid.innerHTML;
    }

    // 滚动渐显动画
    initScrollReveal();

    // 如果没有弹窗，直接显示主体内容和滚动动画
    const splashModal = $('#splashModal');
    if (!splashModal) {
      $('#app').classList.add('is-visible');
      ScrollAnim.init();
    }
  }

  // ===== 数字滚动计数动效 =====
  function initCountUp() {
    var statNumbers = $$('.stat-number');
    if (!statNumbers.length) return;

    var observerOptions = {
      threshold: 0.3
    };

    var countUpObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-target'), 10) || 0;
          var duration = 2000;
          var startTime = null;
          var suffix = '';

          // 处理特殊后缀
          var label = el.nextElementSibling;
          if (label && label.textContent.indexOf('万') > -1) {
            suffix = '+';
          }

          function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            var progress = Math.min((currentTime - startTime) / duration, 1);
            // easeOutQuart
            var eased = 1 - Math.pow(1 - progress, 4);
            var current = Math.floor(eased * target);
            el.textContent = current.toLocaleString() + suffix;

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              el.textContent = target.toLocaleString() + suffix;
            }
          }

          requestAnimationFrame(animate);
          countUpObserver.unobserve(el);
        }
      });
    }, observerOptions);

    statNumbers.forEach(function (el) {
      countUpObserver.observe(el);
    });
  }

  // ===== 滚动渐显动画 =====
  function initScrollReveal() {
    var revealElements = $$('.stat-card, .partner-logo');
    if (!revealElements.length || !('IntersectionObserver' in window)) return;

    revealElements.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, index) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var delay = Array.from(entry.target.parentNode.children).indexOf(el) * 60;
          setTimeout(function () {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // DOM 加载完成后初始化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
