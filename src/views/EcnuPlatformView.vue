<template>
  <div class="page page--ecnu" :class="{ 'theme-light': !isDark }">
    <div class="ec-bg" aria-hidden="true">
      <div class="ec-bg__grid"></div>
      <div class="ec-bg__blob ec-bg__blob--a"></div>
      <div class="ec-bg__blob ec-bg__blob--b"></div>
    </div>

    <header class="ec-hero">
      <div class="ec-hero__watermark" aria-hidden="true">ECNU</div>
      <div class="ec-hero__inner">
        <span class="ec-hero__eyebrow"><span class="dot"></span>ECNU OPEN PLATFORM · 双向发榜</span>
        <h1 class="ec-hero__title">华东师范大学公共创新服务平台</h1>
        <p class="ec-hero__desc">
          整合华东师范大学大型科研仪器、实验动物等公共资源，面向校内外开放共享。
          以下为平台各级入口，点击卡片可直接跳转至对应系统。
        </p>
      </div>
    </header>

    <main class="ec-main">
      <article
        v-for="(item, index) in platforms"
        :key="item.name"
        class="ec-card"
        :style="{ animationDelay: `${index * 60}ms` }"
      >
        <div class="ec-card__head">
          <span class="ec-card__tag">{{ item.tag }}</span>
          <h2>{{ item.name }}</h2>
          <p>{{ item.desc }}</p>
        </div>

        <div class="ec-card__links">
          <a
            v-for="link in item.links"
            :key="link.url"
            class="ec-link"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span class="ec-link__label">
              <em>{{ link.label }}</em>
              <small>{{ link.host }}</small>
            </span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" />
            </svg>
          </a>
        </div>
      </article>

      <p class="ec-note">
        说明：以上链接均指向华东师范大学官方系统，将在新窗口打开；使用前请遵守各平台账号与预约管理要求。
      </p>
    </main>

    <footer class="ec-footer">
      <p>华东师范大学公共创新服务平台 · 松江大学城科创源</p>
      <p>大型仪器共享 · 实验动物管理 · 开放创新服务</p>
    </footer>
  </div>
</template>

<script setup>
import { useTheme } from '@/composables/useTheme'

const { isDark } = useTheme()

const platforms = [
  {
    name: '公共创新服务平台',
    tag: 'PORTAL',
    desc: '平台总门户，聚合大仪共享、实验动物、分析测试等公共创新服务资源。',
    links: [
      { label: '进入公共创新服务平台', host: 'mpi.ecnu.edu.cn', url: 'https://mpi.ecnu.edu.cn' },
    ],
  },
  {
    name: '大型仪器共享管理平台',
    tag: 'INSTRUMENT',
    desc: '在线查询、预约全校大型科研仪器，查看技术指标、收费标准与使用状态。',
    links: [
      { label: '进入大型仪器共享管理平台', host: 'yqgx.ecnu.edu.cn', url: 'https://yqgx.ecnu.edu.cn' },
    ],
  },
  {
    name: '实验动物管理系统',
    tag: 'ANIMAL',
    desc: '实验动物采购、饲养与使用管理系统，按校区分别提供独立入口。',
    links: [
      { label: '闵行校区', host: 'lac.ecnu.edu.cn/mh', url: 'https://lac.ecnu.edu.cn/mh/a/login' },
      { label: '普陀校区', host: 'lac.ecnu.edu.cn/zb', url: 'https://lac.ecnu.edu.cn/zb/a/login' },
    ],
  },
]
</script>

<style scoped>
.page--ecnu {
  --ec-bg: #050b16;
  --ec-panel: rgba(10, 22, 40, 0.78);
  --ec-line: rgba(56, 189, 248, 0.16);
  --ec-line-strong: rgba(56, 189, 248, 0.42);
  --ec-text: #e6f3ff;
  --ec-muted: #8ea9c6;
  --ec-accent: #38bdf8;
  --ec-font: "Inter", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: var(--ec-bg);
  color: var(--ec-text);
  font-family: var(--ec-font);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

.page--ecnu.theme-light {
  --ec-bg: #f3f8fd;
  --ec-panel: rgba(255, 255, 255, 0.92);
  --ec-line: rgba(14, 116, 178, 0.16);
  --ec-line-strong: rgba(14, 116, 178, 0.36);
  --ec-text: #0f2233;
  --ec-muted: #5a7189;
  --ec-accent: #0ea5e9;
}

.ec-bg {
  position: absolute;
  inset: 0 0 auto;
  height: 560px;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.ec-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(180deg, #000 0%, transparent 92%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 92%);
}
.theme-light .ec-bg__grid {
  background-image:
    linear-gradient(rgba(14, 116, 178, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 116, 178, 0.07) 1px, transparent 1px);
}
.ec-bg__blob {
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
}
.ec-bg__blob--a {
  top: -220px;
  left: -140px;
  background: radial-gradient(circle, rgba(2, 132, 199, 0.5), transparent 68%);
}
.ec-bg__blob--b {
  top: -260px;
  right: -160px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.34), transparent 70%);
}
.theme-light .ec-bg__blob {
  opacity: 0.26;
}

.ec-hero {
  position: relative;
  padding: 104px clamp(20px, 5vw, 76px) 30px;
  overflow: hidden;
}
.ec-hero__watermark {
  position: absolute;
  right: clamp(10px, 6vw, 70px);
  top: 84px;
  font-size: clamp(44px, 7.4vw, 110px);
  font-weight: 800;
  letter-spacing: 8px;
  color: rgba(56, 189, 248, 0.07);
  user-select: none;
  pointer-events: none;
}
.theme-light .ec-hero__watermark {
  color: rgba(14, 116, 178, 0.08);
}
.ec-hero__inner {
  max-width: 1240px;
  margin: 0 auto;
}
.ec-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  border: 1px solid var(--ec-line);
  border-radius: 999px;
  background: var(--ec-panel);
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--ec-muted);
}
.ec-hero__eyebrow .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--ec-accent);
  box-shadow: 0 0 10px var(--ec-accent);
}
.ec-hero__title {
  margin: 18px 0 10px;
  font-size: clamp(30px, 4vw, 50px);
  font-weight: 800;
  letter-spacing: 2px;
  line-height: 1.16;
  background: linear-gradient(120deg, var(--ec-text) 10%, var(--ec-accent) 92%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.ec-hero__desc {
  max-width: 680px;
  margin: 0;
  color: var(--ec-muted);
  font-size: 15px;
}

.ec-main {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 18px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 26px clamp(16px, 5vw, 76px) 40px;
}
.ec-card {
  display: flex;
  flex-direction: column;
  padding: 24px;
  border: 1px solid var(--ec-line);
  border-radius: 16px;
  background: var(--ec-panel);
  backdrop-filter: blur(10px);
  animation: ec-in 0.45s ease both;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}
.ec-card:hover {
  transform: translateY(-3px);
  border-color: var(--ec-line-strong);
  box-shadow: 0 16px 38px rgba(2, 12, 27, 0.34);
}
.theme-light .ec-card:hover {
  box-shadow: 0 16px 32px rgba(14, 116, 178, 0.12);
}
@keyframes ec-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.ec-card__tag {
  display: inline-block;
  align-self: flex-start;
  padding: 2px 10px;
  border-radius: 6px;
  border: 1px solid var(--ec-line);
  font-size: 11px;
  letter-spacing: 2px;
  color: var(--ec-accent);
}
.ec-card__head h2 {
  margin: 14px 0 8px;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.ec-card__head p {
  margin: 0;
  min-height: 48px;
  font-size: 13px;
  color: var(--ec-muted);
}

.ec-card__links {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}
.ec-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 10px;
  border: 1px solid var(--ec-line);
  background: rgba(56, 189, 248, 0.05);
  color: var(--ec-text);
  text-decoration: none;
  transition: all 0.2s ease;
}
.ec-link:hover {
  border-color: var(--ec-line-strong);
  background: rgba(56, 189, 248, 0.12);
}
.ec-link__label {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.ec-link__label em {
  font-style: normal;
  font-size: 14px;
  font-weight: 600;
}
.ec-link__label small {
  font-size: 11px;
  letter-spacing: 0.5px;
  color: var(--ec-muted);
}
.ec-link svg {
  flex: none;
  width: 16px;
  height: 16px;
  color: var(--ec-accent);
}

.ec-note {
  grid-column: 1 / -1;
  margin: 6px 0 0;
  font-size: 12px;
  letter-spacing: 0.5px;
  color: var(--ec-muted);
}

.ec-footer {
  padding: 34px 20px 44px;
  text-align: center;
  border-top: 1px solid var(--ec-line);
  color: var(--ec-muted);
  font-size: 13px;
}
.ec-footer p {
  margin: 4px 0;
}
</style>
