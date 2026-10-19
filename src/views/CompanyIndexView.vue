<template>
  <div class="page page--company-index">
    <header class="company-nav">
      <div class="company-nav__inner">
        <a href="/" class="company-nav__brand" aria-label="松江大学城科创源 首页">
          <img src="/logo.png" alt />
          <span>企业介绍</span>
        </a>
        <a href="/" class="company-nav__back">
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
      <header>
        <h1>公司名称</h1>
        <p class="tagline">专业 · 创新 · 值得信赖</p>
        <p class="intro">
          我们致力于为客户提供卓越的解决方案，以专业能力和创新精神推动行业发展。
          多年来，我们始终坚持客户至上，用实力赢得信赖。
        </p>
      </header>

      <section>
        <h2>关于我们</h2>
        <div class="about-content">
          <p>
            公司成立于20XX年，是一家专注于[行业领域]的专业服务机构。我们拥有一支经验丰富、技术精湛的团队，
            致力于为客户提供高质量的产品和服务。经过多年的发展，我们已经成为行业内的领军企业，
            服务了众多知名客户，赢得了良好的口碑和信誉。
          </p>
        </div>

        <div class="values-grid">
          <div class="value-card">
            <h3>使命</h3>
            <p>通过创新技术和专业服务，为客户创造持续价值，推动行业进步。</p>
          </div>
          <div class="value-card">
            <h3>愿景</h3>
            <p>成为行业领先的解决方案提供商，打造值得信赖的长期合作伙伴关系。</p>
          </div>
          <div class="value-card">
            <h3>价值观</h3>
            <p>专业、诚信、创新、共赢。我们坚信只有为客户创造价值，才能实现自身发展。</p>
          </div>
        </div>
      </section>

      <section class="services-section" id="services">
        <div class="services-layout">
          <div class="services-intro">
            <span class="section-eyebrow">CORE SERVICES</span>
            <h2>核心业务</h2>
            <p class="services-desc">从需求诊断到落地交付，三类服务覆盖企业创新的关键环节，按顺序组合即可形成完整解决方案。</p>
            <a href="#contact" class="services-cta">
              咨询合作方案
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <ol class="service-list">
            <li class="service-item">
              <a class="service-item__link" href="#contact">
                <span class="service-item__index" aria-hidden="true">01</span>
                <span class="service-item__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="3" y="7" width="18" height="13" rx="2" />
                    <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <path d="M3 12h18" />
                  </svg>
                </span>
                <div class="service-item__body">
                  <h3>业务一</h3>
                  <p>提供全方位的[业务类型]服务，涵盖[具体领域]。我们采用先进的技术和方法，确保每一个项目都能达到最高标准，为客户带来实实在在的价值。</p>
                </div>
                <span class="service-item__cta" aria-hidden="true">
                  咨询
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            </li>

            <li class="service-item">
              <a class="service-item__link" href="#contact">
                <span class="service-item__index" aria-hidden="true">02</span>
                <span class="service-item__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M12 3 3 8l9 5 9-5-9-5Z" />
                    <path d="m3 13 9 5 9-5" />
                    <path d="m3 18 9 5 9-5" />
                  </svg>
                </span>
                <div class="service-item__body">
                  <h3>业务二</h3>
                  <p>专注于[业务类型]领域，为客户提供定制化的解决方案。我们的团队具备丰富的行业经验，能够精准把握客户需求，交付高质量的成果。</p>
                </div>
                <span class="service-item__cta" aria-hidden="true">
                  咨询
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            </li>

            <li class="service-item">
              <a class="service-item__link" href="#contact">
                <span class="service-item__index" aria-hidden="true">03</span>
                <span class="service-item__icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.6"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M3 20h18" />
                    <rect x="5" y="11" width="3.5" height="6" rx="1" />
                    <rect x="10.25" y="6" width="3.5" height="11" rx="1" />
                    <rect x="15.5" y="9" width="3.5" height="8" rx="1" />
                  </svg>
                </span>
                <div class="service-item__body">
                  <h3>业务三</h3>
                  <p>整合[业务类型]资源，打造一站式服务平台。我们通过专业的管理和执行，帮助客户提升效率、降低成本，实现业务目标。</p>
                </div>
                <span class="service-item__cta" aria-hidden="true">
                  咨询
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
            </li>
          </ol>
        </div>
      </section>

      <section>
        <h2>为什么选择我们</h2>
        <div class="advantages-list">
          <div class="advantage-item">
            <h3>专业团队</h3>
            <p>我们拥有一支由行业专家组成的团队，平均从业经验超过10年，具备深厚的专业知识和丰富的实战经验。</p>
          </div>
          <div class="advantage-item">
            <h3>品质保证</h3>
            <p>严格的质量管理体系，从需求分析到交付验收，每个环节都经过严格把控，确保交付质量。</p>
          </div>
          <div class="advantage-item">
            <h3>客户至上</h3>
            <p>7×24小时响应机制，快速响应客户需求。我们不仅是服务商，更是客户的战略合作伙伴。</p>
          </div>
          <div class="advantage-item">
            <h3>持续创新</h3>
            <p>持续投入研发，紧跟行业前沿技术，为客户提供最具竞争力的解决方案。</p>
          </div>
        </div>
      </section>

      <section>
        <div class="contact-cta">
          <h2>开启合作</h2>
          <p>无论您的需求是什么，我们都准备好了</p>
          <a href="#contact" class="contact-button">立即联系我们</a>
        </div>
      </section>

      <footer id="contact">
        <p>&copy; 2024 公司名称. 保留所有权利.</p>
        <p>地址：[公司详细地址] |</p>
        <p class="footer-back">
          <a href="/">
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
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup>
import { useSmoothScroll } from '@/composables/useSmoothScroll'

useSmoothScroll({ offset: 76 })
</script>

<style scoped>
.page--company-index {
  --color-canvas: oklch(95% 0.02 240);
  --color-surface: oklch(99% 0.005 240);
  --color-surface-accent: oklch(92% 0.04 240);
  --color-ink: oklch(18% 0.02 240);
  --color-muted: oklch(45% 0.03 240);
  --color-primary: oklch(60% 0.22 240);
  --color-primary-dark: oklch(45% 0.24 240);
  --color-rule: oklch(85% 0.03 240);
  --font-display: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --font-body: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2.5rem;
  --space-xl: 4rem;
  --radius: 0.5rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.page--company-index {
  margin: 0;
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.6;
  color: var(--color-ink);
  background-color: var(--color-canvas);
}

/* ===== 顶部返回栏 ===== */
.company-nav {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: oklch(99% 0.005 240 / 0.82);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--color-rule);
}

.company-nav__inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 10px clamp(1rem, 4vw, 2rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-sm);
}

.company-nav__brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
  text-decoration: none;
  color: var(--color-ink);
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
}

.company-nav__brand img {
  height: 30px;
  width: auto;
  display: block;
  flex: none;
}

.company-nav__brand span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.company-nav__back {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex: none;
  padding: 7px 16px;
  border-radius: 999px;
  border: 1px solid var(--color-rule);
  color: var(--color-primary-dark);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
  transition: background-color 0.2s ease, border-color 0.2s ease,
    color 0.2s ease, transform 0.2s ease;
}

.company-nav__back svg {
  width: 16px;
  height: 16px;
}

.company-nav__back:hover {
  background-color: var(--color-primary);
  border-color: var(--color-primary);
  color: #fff;
  transform: translateX(-2px);
}

.company-nav__back:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 2px;
}

main {
  max-width: 1100px;
  margin: 0 auto;
  padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem);
}

main > header {
  text-align: center;
  padding-bottom: var(--space-xl);
  border-bottom: 2px solid var(--color-rule);
  margin-bottom: var(--space-xl);
}

h1 {
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 var(--space-md) 0;
  color: var(--color-ink);
  letter-spacing: -0.02em;
}

.tagline {
  font-size: clamp(1.25rem, 3vw, 1.75rem);
  color: var(--color-primary);
  font-weight: 500;
  margin: 0 0 var(--space-md) 0;
  line-height: 1.4;
}

.intro {
  font-size: 1.125rem;
  color: var(--color-muted);
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
}

section {
  margin-bottom: var(--space-xl);
}

section:last-child {
  margin-bottom: 0;
}

h2 {
  font-family: var(--font-display);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 600;
  margin: 0 0 var(--space-md) 0;
  color: var(--color-ink);
  letter-spacing: -0.01em;
}

h3 {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 var(--space-sm) 0;
  color: var(--color-primary-dark);
}

.about-content {
  background-color: var(--color-surface);
  padding: var(--space-lg);
  border-radius: var(--radius);
  border-left: 4px solid var(--color-primary);
}

.values-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.value-card {
  background-color: var(--color-surface);
  padding: var(--space-md);
  border-radius: var(--radius);
  border-top: 3px solid var(--color-primary);
}

.value-card h3 {
  margin-bottom: var(--space-xs);
}

/* ===== 核心业务 ===== */
.services-layout {
  display: grid;
  grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
  gap: clamp(1.5rem, 4vw, 3.5rem);
  align-items: start;
}

.services-intro {
  position: sticky;
  top: 92px;
}

.section-eyebrow {
  display: inline-block;
  margin-bottom: 10px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: var(--color-primary);
  text-transform: uppercase;
}

.services-intro h2 {
  margin-bottom: var(--space-sm);
}

.services-desc {
  margin: 0 0 var(--space-md);
  color: var(--color-muted);
  line-height: 1.75;
}

.services-cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding-bottom: 3px;
  border-bottom: 2px solid var(--color-primary);
  color: var(--color-primary-dark);
  font-weight: 600;
  font-size: 0.95rem;
  text-decoration: none;
  transition: gap 0.2s ease, color 0.2s ease;
}

.services-cta svg {
  width: 16px;
  height: 16px;
}

.services-cta:hover {
  gap: 10px;
  color: var(--color-primary);
}

.service-list {
  --step-gap: 32px;
  --step-x: 39px;
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: var(--step-gap);
}

.service-item {
  position: relative;
  background-color: var(--color-surface);
  border: 1px solid oklch(85% 0.03 240 / 0.9);
  border-radius: var(--radius);
  transition: border-color 0.25s ease, box-shadow 0.25s ease;
}

/* 步骤串联：沿序号列向下的连接线 + 箭头 */
.service-item:not(:last-child)::after {
  content: '';
  position: absolute;
  left: calc(var(--step-x) - 1px);
  bottom: calc(var(--step-gap) * -1);
  width: 2px;
  height: var(--step-gap);
  border-radius: 1px;
  background: linear-gradient(
    180deg,
    oklch(60% 0.22 240 / 0.45) 0%,
    oklch(60% 0.22 240 / 0.12) 100%
  );
}

.service-item:not(:last-child)::before {
  content: '';
  position: absolute;
  left: calc(var(--step-x) - 5px);
  bottom: calc(var(--step-gap) * -1 + 10px);
  width: 9px;
  height: 9px;
  border-right: 2px solid oklch(60% 0.22 240 / 0.5);
  border-bottom: 2px solid oklch(60% 0.22 240 / 0.5);
  border-radius: 1px;
  transform: rotate(45deg);
}

.service-item__link {
  display: grid;
  grid-template-columns: auto auto minmax(0, 1fr) auto;
  align-items: start;
  gap: 18px;
  padding: 22px 24px;
  color: inherit;
  text-decoration: none;
  border-radius: var(--radius);
}

.service-item__link:focus-visible {
  outline: 3px solid var(--color-primary);
  outline-offset: 3px;
}

.service-item:hover {
  border-color: oklch(60% 0.22 240 / 0.4);
  box-shadow: 0 12px 28px oklch(45% 0.15 240 / 0.12);
}

.service-item__index {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: oklch(60% 0.22 240 / 0.38);
  font-variant-numeric: tabular-nums;
}

.service-item__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background-color: var(--color-surface-accent);
  color: var(--color-primary-dark);
  flex: none;
}

.service-item__icon svg {
  width: 22px;
  height: 22px;
}

.service-item__body h3 {
  margin-bottom: 6px;
  font-size: 1.2rem;
}

.service-item__body p {
  margin: 0;
  color: var(--color-muted);
  line-height: 1.75;
}

.service-item__cta {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  align-self: center;
  flex: none;
  padding: 7px 13px;
  border-radius: 999px;
  background-color: var(--color-surface-accent);
  color: var(--color-primary-dark);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-6px);
  transition: opacity 0.25s ease, transform 0.25s ease,
    background-color 0.25s ease;
}

.service-item__cta svg {
  width: 14px;
  height: 14px;
}

.service-item:hover .service-item__cta {
  opacity: 1;
  transform: translateX(0);
}

.service-item__link:focus-visible .service-item__cta {
  opacity: 1;
  transform: translateX(0);
}

.service-item:hover .service-item__body h3 {
  color: var(--color-primary);
}

.advantages-list {
  background-color: var(--color-surface);
  padding: var(--space-lg);
  border-radius: var(--radius);
}

.advantage-item {
  padding: var(--space-md) 0;
  border-bottom: 1px solid var(--color-rule);
}

.advantage-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.advantage-item:first-child {
  padding-top: 0;
}

.advantage-item h3 {
  color: var(--color-ink);
  margin-bottom: var(--space-xs);
}

.advantage-item p {
  margin: 0;
  color: var(--color-muted);
}

.contact-cta {
  background-color: var(--color-primary);
  color: white;
  padding: var(--space-xl) var(--space-lg);
  border-radius: var(--radius);
  text-align: center;
}

.contact-cta h2 {
  color: white;
  margin-bottom: var(--space-sm);
}

.contact-cta p {
  font-size: 1.125rem;
  margin: 0 0 var(--space-md) 0;
  opacity: 0.95;
}

.contact-button {
  display: inline-block;
  background-color: white;
  color: var(--color-primary);
  padding: 0.875rem 2rem;
  border-radius: var(--radius);
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  transition: transform 0.2s ease;
}

.contact-button:hover {
  transform: translateY(-2px);
}

.contact-button:focus-visible {
  outline: 3px solid white;
  outline-offset: 2px;
}

@media (prefers-reduced-motion: reduce) {
  .contact-button {
    transition: none;
  }
}

footer {
  margin-top: var(--space-xl);
  padding-top: var(--space-lg);
  border-top: 2px solid var(--color-rule);
  text-align: center;
  color: var(--color-muted);
  font-size: 0.875rem;
}

.footer-back {
  margin-top: var(--space-sm);
}

.footer-back a {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--color-primary-dark);
  font-weight: 600;
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-back a svg {
  width: 15px;
  height: 15px;
}

.footer-back a:hover {
  color: var(--color-primary);
}

@media (max-width: 1024px) {
  .services-layout {
    grid-template-columns: 1fr;
    gap: var(--space-lg);
  }

  .services-intro {
    position: static;
  }
}

@media (max-width: 768px) {
  .values-grid {
    grid-template-columns: 1fr;
  }

  .service-list {
    --step-gap: 24px;
    --step-x: 30px;
  }

  .service-item__link {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 14px;
    padding: 18px;
  }

  .service-item__index {
    grid-row: 1;
    font-size: 1.15rem;
  }

  .service-item__icon {
    display: none;
  }

  .service-item__cta {
    display: none;
  }

  .contact-cta {
    padding: var(--space-lg) var(--space-md);
  }
}

@media (prefers-reduced-motion: reduce) {
  .service-item,
  .service-item__cta,
  .company-nav__back,
  .services-cta {
    transition: none;
  }
}

@media print {
  .page--company-index {
    background-color: white;
    color: black;
  }

  main {
    max-width: none;
    padding: 0;
  }

  header,
  section {
    page-break-inside: avoid;
  }

  .contact-cta {
    background-color: #f0f0f0;
    color: black;
  }

  .contact-cta h2 {
    color: black;
  }

  .contact-button {
    background-color: #e0e0e0;
    color: black;
  }
}
</style>
