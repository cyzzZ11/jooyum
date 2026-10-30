<template>
  <div class="page page--finance">
    <!-- 背景层：网格 + 光晕 -->
    <div class="fx-bg" aria-hidden="true">
      <div class="fx-bg__grid"></div>
      <div class="fx-bg__blob fx-bg__blob--a"></div>
      <div class="fx-bg__blob fx-bg__blob--b"></div>
      <div class="fx-bg__blob fx-bg__blob--c"></div>
      <div class="fx-bg__scan"></div>
    </div>

    <header class="fx-nav">
      <div class="fx-nav__inner">
        <a href="/" class="fx-brand" aria-label="松江大学城科创源 首页">
          <img :src="`${baseUrl}logo.png`" alt="" />
          <span>松江大学城科创源</span>
        </a>
        <nav class="fx-nav__menu" aria-label="页内导航">
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            :class="{ active: activeSection === item.id }"
          >
            {{ item.label }}
          </a>
        </nav>
        <a href="/" class="fx-nav__back">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          返回首页
        </a>
      </div>
    </header>

    <main>
      <!-- ═══ 01 融资服务 ═══ -->
      <section id="service" class="fx-hero">
        <div class="fx-hero__watermark" aria-hidden="true">FINANCE</div>
        <div class="fx-hero__inner">
          <span class="fx-hero__eyebrow">
            <span class="dot"></span>
            FINANCE SUPPORT · 金融支持
          </span>
          <h1 class="fx-hero__title">融资服务</h1>
          <div class="fx-hero__badge">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
            </svg>
            {{ financeIntro.title }}
          </div>
          <p class="fx-hero__desc">{{ financeIntro.desc }}</p>

          <div class="fx-hero__stats">
            <div v-for="stat in stats" :key="stat.label" class="fx-stat">
              <strong>{{ stat.value }}</strong>
              <span>{{ stat.label }}</span>
            </div>
          </div>
        </div>

        <div class="fx-hero__footer" aria-hidden="true">
          <span>SCROLL</span>
          <span class="fx-hero__line"></span>
        </div>
      </section>

      <!-- ═══ 02 基金 ═══ -->
      <section id="fund" class="fx-section">
        <div class="fx-section__inner">
          <header class="fx-head fx-reveal">
            <span class="fx-head__index">02</span>
            <div class="fx-head__text">
              <h2>基金</h2>
              <p>FUND · {{ funds.length }} 家合作基金机构</p>
            </div>
            <span class="fx-head__count">{{ String(funds.length).padStart(2, '0') }}</span>
          </header>

          <div class="fx-fund-grid">
            <article
              v-for="(fund, index) in funds"
              :key="fund.name"
              class="fx-fund fx-reveal"
              :style="{ transitionDelay: `${index * 70}ms` }"
            >
              <div class="fx-fund__top">
                <div class="fx-logo-plate fx-logo-plate--fund">
                  <img :src="`${baseUrl}finance/${fund.logo}`" :alt="fund.name" loading="lazy" />
                </div>
                <div class="fx-fund__titles">
                  <h3>{{ fund.name }}</h3>
                  <div v-if="fund.alias || fund.product" class="fx-fund__chips">
                    <span v-if="fund.alias" class="chip">{{ fund.alias }}</span>
                    <span v-if="fund.product" class="chip chip--accent">{{ fund.product }}</span>
                  </div>
                </div>
              </div>

              <p class="fx-fund__desc">{{ fund.desc }}</p>
              <p v-if="fund.highlight" class="fx-fund__highlight">{{ fund.highlight }}</p>

              <footer class="fx-fund__meta">
                <span v-if="fund.address" class="fx-meta-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                    <path d="M12 21s-6.5-5.6-6.5-10.2A6.5 6.5 0 0 1 18.5 10.8C18.5 15.4 12 21 12 21Z" />
                    <circle cx="12" cy="10.5" r="2.2" />
                  </svg>
                  {{ fund.address }}
                </span>
                <span v-if="fund.contactUser || fund.contactMobile" class="fx-meta-line">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
                    <path d="M6 3h3l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4 5.2 2 2 0 0 1 6 3Z" />
                  </svg>
                  {{ [fund.contactUser, fund.contactMobile].filter(Boolean).join(' · ') }}
                </span>
                <a v-if="fund.link" :href="fund.link" class="fx-meta-link" target="_blank" rel="noopener">
                  官方网站
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" aria-hidden="true">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </a>
              </footer>
            </article>
          </div>
        </div>
      </section>

      <!-- ═══ 03 银行 ═══ -->
      <section id="bank" class="fx-section fx-section--alt">
        <div class="fx-section__inner">
          <header class="fx-head fx-reveal">
            <span class="fx-head__index">03</span>
            <div class="fx-head__text">
              <h2>银行</h2>
              <p>BANK · {{ banks.length }} 家合作银行</p>
            </div>
            <span class="fx-head__count">{{ String(banks.length).padStart(2, '0') }}</span>
          </header>

          <div class="fx-logo-wall">
            <div
              v-for="(bank, index) in banks"
              :key="bank.id"
              class="fx-logo-card fx-reveal"
              :style="{ transitionDelay: `${Math.min(index, 12) * 35}ms` }"
              tabindex="0"
              :aria-label="`${bank.branch}，联系人 ${bank.contactUser}，电话 ${bank.contactMobile}`"
            >
              <div class="fx-logo-plate">
                <img :src="`${baseUrl}finance/${bank.logo}`" :alt="bank.name" loading="lazy" />
              </div>
              <span class="fx-logo-card__name">{{ bank.name }}</span>
              <div class="fx-logo-card__info">
                <p class="fx-logo-card__branch">{{ bank.branch }}</p>
                <p v-if="bank.contactUser"><em>联系人</em>{{ bank.contactUser }}</p>
                <p><em>电话</em>{{ bank.contactMobile }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ 04 保险 ═══ -->
      <section id="insurance" class="fx-section">
        <div class="fx-section__inner">
          <header class="fx-head fx-reveal">
            <span class="fx-head__index">04</span>
            <div class="fx-head__text">
              <h2>保险</h2>
              <p>INSURANCE · {{ insurances.length }} 家合作保险机构</p>
            </div>
            <span class="fx-head__count">{{ String(insurances.length).padStart(2, '0') }}</span>
          </header>

          <div class="fx-logo-wall fx-logo-wall--insurance">
            <div
              v-for="(item, index) in insurances"
              :key="item.id"
              class="fx-logo-card fx-reveal"
              :style="{ transitionDelay: `${index * 60}ms` }"
              tabindex="0"
              :aria-label="`${item.branch}，联系人 ${item.contactUser}，电话 ${item.contactMobile}`"
            >
              <div class="fx-logo-plate">
                <img :src="`${baseUrl}finance/${item.logo}`" :alt="item.name" loading="lazy" />
              </div>
              <span class="fx-logo-card__name">{{ item.name }}</span>
              <div class="fx-logo-card__info">
                <p class="fx-logo-card__branch">{{ item.branch }}</p>
                <p v-if="item.contactUser"><em>联系人</em>{{ item.contactUser }}</p>
                <p><em>电话</em>{{ item.contactMobile }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer class="fx-footer">
        <div class="fx-footer__glow" aria-hidden="true"></div>
        <p class="fx-footer__title">一站式金融服务中心</p>
        <p class="fx-footer__desc">金融政策解读 · 金融需求咨询 · 金融方案设计</p>
        <div class="fx-footer__actions">
          <a href="#service" class="fx-btn fx-btn--ghost">了解融资服务</a>
          <a href="/" class="fx-btn fx-btn--primary">返回首页</a>
        </div>
        <p class="fx-footer__copy">松江大学城科创源 · 金融服务</p>
      </footer>
    </main>

    <button
      class="fx-back-top"
      type="button"
      :class="{ 'is-visible': showBackTop }"
      aria-label="返回顶部"
      @click="backToTop"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <line x1="12" y1="19" x2="12" y2="5" />
        <polyline points="5 12 12 5 19 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'
import { banks, financeIntro, funds, insurances } from '@/data/finance'

const baseUrl = import.meta.env.BASE_URL

const navItems = [
  { id: 'service', label: '融资服务' },
  { id: 'fund', label: '基金' },
  { id: 'bank', label: '银行' },
  { id: 'insurance', label: '保险' },
]

const stats = [
  { value: String(funds.length), label: '合作基金' },
  { value: String(banks.length), label: '合作银行' },
  { value: String(insurances.length), label: '合作保险' },
  { value: '40', label: '金融机构' },
]

const activeSection = ref('service')
const showBackTop = ref(false)

let revealObserver = null
let spyObserver = null

useSmoothScroll({ offset: 76 })

function backToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function onScroll() {
  showBackTop.value = window.scrollY > 560
}

onMounted(() => {
  onScroll()

  // 渐显动画
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
  )
  document.querySelectorAll('.fx-reveal').forEach((el) => revealObserver.observe(el))

  // 导航高亮
  spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeSection.value = entry.target.id
      })
    },
    { rootMargin: '-40% 0px -52% 0px' }
  )
  navItems.forEach(({ id }) => {
    const el = document.getElementById(id)
    if (el) spyObserver.observe(el)
  })

  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
  spyObserver?.disconnect()
  window.removeEventListener('scroll', onScroll)
})
</script>

<style scoped>
.page--finance {
  --fx-bg: #050a14;
  --fx-bg-soft: #071120;
  --fx-panel: rgba(12, 24, 42, 0.72);
  --fx-panel-strong: rgba(10, 22, 40, 0.92);
  --fx-line: rgba(56, 189, 248, 0.16);
  --fx-line-strong: rgba(56, 189, 248, 0.4);
  --fx-text: #e7f2ff;
  --fx-muted: #8fa8c4;
  --fx-sky: #38bdf8;
  --fx-cyan: #67e8f9;
  --fx-deep: #0ea5e9;
  --fx-radius: 16px;
  --fx-font: "Inter", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;

  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: var(--fx-bg);
  color: var(--fx-text);
  font-family: var(--fx-font);
  font-size: 16px;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

.page--finance *,
.page--finance *::before,
.page--finance *::after {
  box-sizing: border-box;
}

.page--finance h1,
.page--finance h2,
.page--finance h3,
.page--finance p {
  margin: 0;
}

/* ═══ 背景 ═══ */
.fx-bg {
  position: fixed;
  inset: 0;
  z-index: -1;
  overflow: hidden;
  background:
    radial-gradient(120% 80% at 50% -10%, rgba(14, 165, 233, 0.22), transparent 60%),
    linear-gradient(180deg, #050a14 0%, #060d1a 40%, #04080f 100%);
}

.fx-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.055) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(80% 60% at 50% 30%, #000 35%, transparent 100%);
  -webkit-mask-image: radial-gradient(80% 60% at 50% 30%, #000 35%, transparent 100%);
}

.fx-bg__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.55;
  animation: fxFloat 18s ease-in-out infinite alternate;
}

.fx-bg__blob--a {
  width: 46vw;
  height: 46vw;
  left: -12vw;
  top: 4vh;
  background: radial-gradient(circle, rgba(14, 165, 233, 0.38), transparent 68%);
}

.fx-bg__blob--b {
  width: 40vw;
  height: 40vw;
  right: -10vw;
  top: 28vh;
  background: radial-gradient(circle, rgba(103, 232, 249, 0.24), transparent 70%);
  animation-delay: -6s;
}

.fx-bg__blob--c {
  width: 52vw;
  height: 52vw;
  left: 20vw;
  bottom: -24vw;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.26), transparent 72%);
  animation-delay: -12s;
}

.fx-bg__scan {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.012) 0,
    rgba(255, 255, 255, 0.012) 1px,
    transparent 1px,
    transparent 3px
  );
  opacity: 0.5;
  pointer-events: none;
}

@keyframes fxFloat {
  from {
    transform: translate3d(0, 0, 0) scale(1);
  }
  to {
    transform: translate3d(3vw, 4vh, 0) scale(1.08);
  }
}

/* ═══ 顶部导航 ═══ */
.fx-nav {
  position: sticky;
  top: 0;
  z-index: 60;
  background: rgba(5, 10, 20, 0.72);
  backdrop-filter: blur(18px) saturate(140%);
  -webkit-backdrop-filter: blur(18px) saturate(140%);
  border-bottom: 1px solid rgba(56, 189, 248, 0.14);
}

.fx-nav__inner {
  width: min(1180px, 92vw);
  margin: 0 auto;
  height: 68px;
  display: flex;
  align-items: center;
  gap: 24px;
}

.fx-brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: var(--fx-text);
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.02em;
  white-space: nowrap;
}

.fx-brand img {
  height: 30px;
  width: auto;
  object-fit: contain;
  /* logo 为深灰字，深色导航下反相提亮 */
  filter: invert(1) hue-rotate(180deg) brightness(1.15)
    drop-shadow(0 0 10px rgba(56, 189, 248, 0.35));
}

.fx-nav__menu {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
}

.fx-nav__menu a {
  position: relative;
  padding: 7px 14px;
  border-radius: 999px;
  color: var(--fx-muted);
  text-decoration: none;
  font-size: 14px;
  transition: color 220ms ease, background 220ms ease;
}

.fx-nav__menu a::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: 2px;
  width: 0;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(90deg, var(--fx-deep), var(--fx-cyan));
  transform: translateX(-50%);
  transition: width 260ms ease;
}

.fx-nav__menu a:hover,
.fx-nav__menu a.active {
  color: #fff;
  background: rgba(56, 189, 248, 0.1);
}

.fx-nav__menu a.active::after {
  width: 54%;
}

.fx-nav__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: 1px solid var(--fx-line-strong);
  border-radius: 999px;
  color: var(--fx-text);
  text-decoration: none;
  font-size: 13.5px;
  background: rgba(56, 189, 248, 0.08);
  transition: border-color 220ms ease, background 220ms ease, box-shadow 220ms ease;
}

.fx-nav__back svg {
  width: 15px;
  height: 15px;
}

.fx-nav__back:hover {
  border-color: rgba(103, 232, 249, 0.7);
  background: rgba(56, 189, 248, 0.16);
  box-shadow: 0 0 18px rgba(56, 189, 248, 0.25);
}

/* ═══ 首屏 ═══ */
.fx-hero {
  position: relative;
  padding: clamp(64px, 9vh, 108px) 0 clamp(48px, 7vh, 84px);
  overflow: hidden;
}

.fx-hero__watermark {
  position: absolute;
  left: 50%;
  top: 6%;
  transform: translateX(-50%);
  font-size: clamp(84px, 16vw, 240px);
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(56, 189, 248, 0.14);
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
}

.fx-hero__inner {
  position: relative;
  width: min(1180px, 92vw);
  margin: 0 auto;
  text-align: center;
}

.fx-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  border: 1px solid var(--fx-line);
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.08);
  color: #9fd7ff;
  font-size: 12px;
  letter-spacing: 0.22em;
  text-transform: uppercase;
}

.fx-hero__eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--fx-cyan);
  box-shadow: 0 0 10px var(--fx-cyan);
  animation: fxPulse 2.4s ease-in-out infinite;
}

@keyframes fxPulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.35; transform: scale(0.7); }
}

.fx-hero__title {
  margin-top: 22px !important;
  font-size: clamp(44px, 7.2vw, 92px);
  font-weight: 800;
  line-height: 1.06;
  letter-spacing: 0.04em;
  background: linear-gradient(180deg, #ffffff 12%, #b8e3ff 58%, #38bdf8 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  filter: drop-shadow(0 10px 40px rgba(56, 189, 248, 0.28));
}

.fx-hero__badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 20px;
  padding: 10px 22px;
  border: 1px solid var(--fx-line);
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(56, 189, 248, 0.16), rgba(14, 165, 233, 0.04));
  color: #d8ecff;
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.06em;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 12px 40px -18px rgba(56, 189, 248, 0.6);
}

.fx-hero__badge svg {
  width: 20px;
  height: 20px;
  color: var(--fx-cyan);
}

.fx-hero__desc {
  max-width: 880px;
  margin: 26px auto 0 !important;
  color: var(--fx-muted);
  font-size: clamp(14.5px, 1.1vw, 16.5px);
  line-height: 1.95;
  text-align: justify;
  text-justify: inter-ideograph;
}

.fx-hero__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  max-width: 860px;
  margin: 42px auto 0;
}

.fx-stat {
  position: relative;
  padding: 18px 12px;
  border: 1px solid var(--fx-line);
  border-radius: 14px;
  background: linear-gradient(180deg, rgba(17, 34, 56, 0.72), rgba(9, 18, 32, 0.42));
  overflow: hidden;
}

.fx-stat::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, var(--fx-cyan), transparent);
  opacity: 0.7;
}

.fx-stat strong {
  display: block;
  font-size: clamp(24px, 2.6vw, 34px);
  font-weight: 700;
  line-height: 1.1;
  color: #fff;
  font-variant-numeric: tabular-nums;
  text-shadow: 0 0 24px rgba(56, 189, 248, 0.5);
}

.fx-stat span {
  display: block;
  margin-top: 6px;
  font-size: 12.5px;
  color: var(--fx-muted);
  letter-spacing: 0.14em;
}

.fx-hero__footer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  width: min(1180px, 92vw);
  margin: 56px auto 0;
  color: rgba(143, 168, 196, 0.7);
  font-size: 10.5px;
  letter-spacing: 0.4em;
}

.fx-hero__line {
  width: 2px;
  height: 42px;
  background: linear-gradient(180deg, var(--fx-sky), transparent);
  opacity: 0.7;
}

/* ═══ 分区通用 ═══ */
.fx-section {
  position: relative;
  padding: clamp(56px, 8vh, 96px) 0;
}

.fx-section--alt {
  background: linear-gradient(180deg, rgba(8, 17, 31, 0.6), rgba(5, 11, 21, 0.2));
  border-block: 1px solid rgba(56, 189, 248, 0.08);
}

.fx-section__inner {
  width: min(1180px, 92vw);
  margin: 0 auto;
}

.fx-head {
  display: flex;
  align-items: flex-end;
  gap: 18px;
  padding-bottom: 22px;
  margin-bottom: 34px;
  border-bottom: 1px solid var(--fx-line);
}

.fx-head__index {
  font-size: 13px;
  letter-spacing: 0.3em;
  color: var(--fx-sky);
  font-weight: 600;
  padding-bottom: 6px;
}

.fx-head__text h2 {
  font-size: clamp(26px, 3.2vw, 38px);
  font-weight: 700;
  letter-spacing: 0.06em;
  line-height: 1.2;
  background: linear-gradient(90deg, #ffffff, #9fd7ff 70%, #38bdf8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.fx-head__text p {
  margin-top: 6px !important;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--fx-muted);
  text-transform: uppercase;
}

.fx-head__count {
  margin-left: auto;
  font-size: clamp(30px, 4vw, 52px);
  font-weight: 800;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1px rgba(56, 189, 248, 0.45);
  font-variant-numeric: tabular-nums;
}

/* ═══ 基金卡片 ═══ */
.fx-fund-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.fx-fund {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 26px;
  border: 1px solid var(--fx-line);
  border-radius: var(--fx-radius);
  background: linear-gradient(150deg, rgba(16, 32, 54, 0.86), rgba(8, 16, 29, 0.6));
  overflow: hidden;
  transition: transform 320ms cubic-bezier(0.22, 1, 0.36, 1), border-color 320ms ease, box-shadow 320ms ease;
}

.fx-fund::before {
  content: "";
  position: absolute;
  inset: 0 auto auto 0;
  width: 130px;
  height: 130px;
  background: radial-gradient(circle at top left, rgba(56, 189, 248, 0.22), transparent 70%);
  pointer-events: none;
}

.fx-fund::after {
  content: "";
  position: absolute;
  left: 0;
  top: 26px;
  width: 2px;
  height: 48px;
  background: linear-gradient(180deg, var(--fx-cyan), transparent);
  opacity: 0.8;
}

.fx-fund:hover {
  transform: translateY(-4px);
  border-color: rgba(103, 232, 249, 0.38);
  box-shadow: 0 24px 60px -30px rgba(56, 189, 248, 0.55);
}

.fx-fund__top {
  display: flex;
  align-items: center;
  gap: 18px;
}

.fx-logo-plate {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  background: linear-gradient(150deg, #ffffff, #eaf4ff);
  border: 1px solid rgba(148, 190, 232, 0.5);
  box-shadow: 0 8px 24px -12px rgba(56, 189, 248, 0.55), inset 0 1px 0 #fff;
  padding: 10px;
}

.fx-logo-plate img {
  display: block;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.fx-logo-plate--fund {
  flex: 0 0 128px;
  height: 78px;
  padding: 12px 14px;
}

.fx-fund__titles h3 {
  font-size: 17.5px;
  font-weight: 600;
  line-height: 1.45;
  color: #fff;
}

.fx-fund__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.chip {
  padding: 3px 10px;
  border: 1px solid rgba(56, 189, 248, 0.3);
  border-radius: 999px;
  font-size: 11.5px;
  letter-spacing: 0.06em;
  color: #9fd7ff;
  background: rgba(56, 189, 248, 0.1);
}

.chip--accent {
  border-color: rgba(103, 232, 249, 0.55);
  color: #e0fbff;
  background: rgba(103, 232, 249, 0.16);
  box-shadow: 0 0 16px -6px rgba(103, 232, 249, 0.8);
}

.fx-fund__desc {
  color: #b8cbe0;
  font-size: 14.5px;
  line-height: 1.9;
  text-align: justify;
  text-justify: inter-ideograph;
}

.fx-fund__highlight {
  padding: 14px 16px;
  border-left: 2px solid rgba(56, 189, 248, 0.5);
  border-radius: 0 10px 10px 0;
  background: rgba(56, 189, 248, 0.06);
  color: #93b4d2;
  font-size: 13px;
  line-height: 1.85;
  text-align: justify;
  text-justify: inter-ideograph;
}

.fx-fund__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  margin-top: auto;
  padding-top: 14px;
  border-top: 1px dashed rgba(56, 189, 248, 0.16);
  color: var(--fx-muted);
  font-size: 12.5px;
}

.fx-meta-line {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.fx-meta-line svg {
  width: 14px;
  height: 14px;
  color: var(--fx-sky);
  flex: none;
}

.fx-meta-link {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-left: auto;
  color: var(--fx-cyan);
  text-decoration: none;
  font-size: 12.5px;
  transition: opacity 200ms ease;
}

.fx-meta-link svg {
  width: 13px;
  height: 13px;
}

.fx-meta-link:hover {
  opacity: 0.75;
}

/* ═══ Logo 墙（银行 / 保险） ═══ */
.fx-logo-wall {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(196px, 1fr));
  gap: 14px;
}

.fx-logo-wall--insurance {
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
}

.fx-logo-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 118px;
  padding: 16px 14px;
  border: 1px solid rgba(56, 189, 248, 0.12);
  border-radius: 14px;
  background: linear-gradient(160deg, rgba(15, 29, 49, 0.72), rgba(7, 15, 27, 0.5));
  overflow: hidden;
  outline: none;
  transition: transform 280ms cubic-bezier(0.22, 1, 0.36, 1), border-color 280ms ease, box-shadow 280ms ease;
}

.fx-logo-card .fx-logo-plate {
  width: 100%;
  height: 52px;
  padding: 7px 12px;
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}

.fx-logo-card__name {
  font-size: 12.5px;
  letter-spacing: 0.06em;
  color: var(--fx-muted);
  transition: opacity 240ms ease;
}

.fx-logo-card__info {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  padding: 14px 18px;
  background: linear-gradient(160deg, rgba(7, 16, 30, 0.96), rgba(10, 26, 45, 0.94));
  border-left: 2px solid var(--fx-cyan);
  transform: translateY(100%);
  opacity: 0;
  transition: transform 340ms cubic-bezier(0.22, 1, 0.36, 1), opacity 260ms ease;
}

.fx-logo-card__info p {
  display: flex;
  gap: 8px;
  font-size: 12px;
  line-height: 1.6;
  color: #cfe2f5;
  word-break: break-all;
}

.fx-logo-card__info em {
  flex: none;
  font-style: normal;
  color: var(--fx-sky);
}

.fx-logo-card__branch {
  color: #fff !important;
  font-size: 12.5px !important;
  font-weight: 600;
}

.fx-logo-card:hover,
.fx-logo-card:focus-visible {
  transform: translateY(-3px);
  border-color: rgba(103, 232, 249, 0.42);
  box-shadow: 0 18px 44px -26px rgba(56, 189, 248, 0.7);
}

.fx-logo-card:hover .fx-logo-plate,
.fx-logo-card:focus-visible .fx-logo-plate {
  transform: scale(1.04);
}

.fx-logo-card:hover .fx-logo-card__info,
.fx-logo-card:focus-visible .fx-logo-card__info {
  transform: translateY(0);
  opacity: 1;
}

/* ═══ 底部 ═══ */
.fx-footer {
  position: relative;
  padding: clamp(56px, 8vh, 88px) 24px clamp(40px, 6vh, 64px);
  text-align: center;
  border-top: 1px solid rgba(56, 189, 248, 0.14);
  background: linear-gradient(180deg, rgba(6, 13, 24, 0.4), rgba(4, 8, 16, 0.9));
  overflow: hidden;
}

.fx-footer__glow {
  position: absolute;
  left: 50%;
  top: -120px;
  width: 60vw;
  height: 240px;
  transform: translateX(-50%);
  background: radial-gradient(ellipse at center, rgba(56, 189, 248, 0.22), transparent 70%);
  pointer-events: none;
}

.fx-footer__title {
  position: relative;
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 700;
  letter-spacing: 0.16em;
  color: #fff;
  text-shadow: 0 0 30px rgba(56, 189, 248, 0.35);
}

.fx-footer__desc {
  margin-top: 10px !important;
  color: var(--fx-muted);
  font-size: 13.5px;
  letter-spacing: 0.14em;
}

.fx-footer__actions {
  position: relative;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 26px;
}

.fx-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 148px;
  padding: 11px 24px;
  border-radius: 999px;
  font-size: 14px;
  text-decoration: none;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease, border-color 220ms ease;
}

.fx-btn:hover {
  transform: translateY(-2px);
}

.fx-btn--ghost {
  border: 1px solid var(--fx-line-strong);
  color: var(--fx-text);
  background: rgba(56, 189, 248, 0.06);
}

.fx-btn--ghost:hover {
  border-color: rgba(103, 232, 249, 0.7);
  background: rgba(56, 189, 248, 0.14);
}

.fx-btn--primary {
  color: #041019;
  font-weight: 600;
  background: linear-gradient(120deg, var(--fx-sky), var(--fx-cyan));
  box-shadow: 0 14px 36px -18px rgba(56, 189, 248, 0.9);
}

.fx-btn--primary:hover {
  box-shadow: 0 18px 44px -18px rgba(103, 232, 249, 0.95);
}

.fx-footer__copy {
  margin-top: 32px !important;
  color: rgba(143, 168, 196, 0.6);
  font-size: 11.5px;
  letter-spacing: 0.18em;
}

/* ═══ 返回顶部 ═══ */
.fx-back-top {
  position: fixed;
  right: clamp(16px, 3vw, 44px);
  bottom: clamp(16px, 3vw, 44px);
  z-index: 70;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid var(--fx-line-strong);
  border-radius: 50%;
  background: rgba(8, 18, 32, 0.8);
  backdrop-filter: blur(10px);
  color: var(--fx-text);
  opacity: 0;
  visibility: hidden;
  transform: translateY(12px);
  transition: opacity 260ms ease, transform 260ms ease, visibility 260ms ease, box-shadow 260ms ease;
}

.fx-back-top svg {
  width: 18px;
  height: 18px;
}

.fx-back-top.is-visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.fx-back-top:hover {
  box-shadow: 0 0 22px -4px rgba(56, 189, 248, 0.8);
  border-color: rgba(103, 232, 249, 0.8);
}

/* ═══ 渐显 ═══ */
.fx-reveal {
  opacity: 0;
  transform: translateY(26px);
  transition: opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1);
}

.fx-reveal.is-in {
  opacity: 1;
  transform: none;
}

/* ═══ 响应式 ═══ */
@media (max-width: 960px) {
  .fx-nav__inner {
    gap: 14px;
  }

  .fx-brand span {
    display: none;
  }

  .fx-nav__menu {
    gap: 0;
  }

  .fx-nav__menu a {
    padding: 7px 10px;
    font-size: 13px;
  }

  .fx-fund-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 720px) {
  .fx-nav__menu {
    display: none;
  }

  .fx-nav__back {
    margin-left: auto;
  }

  .fx-hero__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 32px;
  }

  .fx-head {
    flex-wrap: wrap;
    gap: 10px;
  }

  .fx-head__count {
    display: none;
  }

  .fx-fund {
    padding: 20px;
  }

  .fx-fund__top {
    gap: 14px;
  }

  .fx-logo-plate--fund {
    flex-basis: 104px;
    height: 66px;
    padding: 10px;
  }

  .fx-logo-wall,
  .fx-logo-wall--insurance {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 10px;
  }

  .fx-logo-card {
    min-height: 104px;
    padding: 12px 10px;
  }

  .fx-logo-card .fx-logo-plate {
    height: 46px;
    padding: 6px 8px;
  }

  /* 触屏无 hover：机构信息常驻显示 */
  .fx-logo-card__info {
    position: static;
    transform: none;
    opacity: 1;
    margin-top: 4px;
    padding: 10px 0 0;
    border-left: none;
    border-top: 1px dashed rgba(56, 189, 248, 0.22);
    background: none;
  }

  .fx-logo-card__name {
    color: #dbe9f7;
  }
}

@media (prefers-reduced-motion: reduce) {
  .fx-bg__blob,
  .fx-hero__eyebrow .dot {
    animation: none;
  }

  .fx-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
