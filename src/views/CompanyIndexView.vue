<template>
  <div class="page page--company-index">
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

    <section>
      <h2>核心业务</h2>
      <div class="services-grid">
        <div class="service-card">
          <h3>业务一</h3>
          <p>
            提供全方位的[业务类型]服务，涵盖[具体领域]。我们采用先进的技术和方法，
            确保每一个项目都能达到最高标准，为客户带来实实在在的价值。
          </p>
        </div>
        <div class="service-card">
          <h3>业务二</h3>
          <p>
            专注于[业务类型]领域，为客户提供定制化的解决方案。我们的团队具备丰富的行业经验，
            能够精准把握客户需求，交付高质量的成果。
          </p>
        </div>
        <div class="service-card">
          <h3>业务三</h3>
          <p>
            整合[业务类型]资源，打造一站式服务平台。我们通过专业的管理和执行，
            帮助客户提升效率、降低成本，实现业务目标。
          </p>
        </div>
      </div>
    </section>

    <section>
      <h2>为什么选择我们</h2>
      <div class="advantages-list">
        <div class="advantage-item">
          <h3>专业团队</h3>
          <p>
            我们拥有一支由行业专家组成的团队，平均从业经验超过10年，具备深厚的专业知识和丰富的实战经验。
          </p>
        </div>
        <div class="advantage-item">
          <h3>品质保证</h3>
          <p>
            严格的质量管理体系，从需求分析到交付验收，每个环节都经过严格把控，确保交付质量。
          </p>
        </div>
        <div class="advantage-item">
          <h3>客户至上</h3>
          <p>
            7×24小时响应机制，快速响应客户需求。我们不仅是服务商，更是客户的战略合作伙伴。
          </p>
        </div>
        <div class="advantage-item">
          <h3>持续创新</h3>
          <p>
            持续投入研发，紧跟行业前沿技术，为客户提供最具竞争力的解决方案。
          </p>
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
      <p>地址：[公司详细地址] | 电话：[联系电话] | 邮箱：contact@company.com</p>
    </footer>
  </main>
  </div>
</template>

<script setup>
import { useSmoothScroll } from '@/composables/useSmoothScroll'

useSmoothScroll()
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
      --font-display: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      --font-body: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
      --space-xs: 0.5rem;
      --space-sm: 1rem;
      --space-md: 1.5rem;
      --space-lg: 2.5rem;
      --space-xl: 4rem;
      --radius: 0.5rem;
    }

    *, *::before, *::after {
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

    main {
      max-width: 1100px;
      margin: 0 auto;
      padding: clamp(2rem, 5vw, 4rem) clamp(1rem, 4vw, 2rem);
    }

    header {
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

    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: var(--space-lg);
    }

    .service-card {
      background-color: var(--color-surface);
      padding: var(--space-lg);
      border-radius: var(--radius);
      position: relative;
    }

    .service-card::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background-color: var(--color-primary);
      border-radius: var(--radius) var(--radius) 0 0;
    }

    .service-card h3 {
      font-size: 1.375rem;
      margin-bottom: var(--space-sm);
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

    @media (max-width: 768px) {
      .services-grid,
      .values-grid {
        grid-template-columns: 1fr;
      }

      .contact-cta {
        padding: var(--space-lg) var(--space-md);
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

      header, section {
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
