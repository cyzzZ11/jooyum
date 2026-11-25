<template>
  <div class="page page--public-service" :class="{ 'theme-light': !isDark }">
    <div class="ps-bg" aria-hidden="true">
      <div class="ps-bg__grid"></div>
      <div class="ps-bg__blob ps-bg__blob--a"></div>
      <div class="ps-bg__blob ps-bg__blob--b"></div>
    </div>

    <main>
      <!-- ═══ 01 数字公共服务体系 ═══ -->
      <section class="ps-hero">
        <div class="ps-hero__watermark" aria-hidden="true">DIGITAL</div>
        <div class="ps-hero__inner">
          <span class="ps-hero__eyebrow">
            <span class="dot"></span>
            DIGITAL PUBLIC SERVICE · 数字公共服务
          </span>
          <h1 class="ps-hero__title">数字公共服务体系</h1>
          <p class="ps-hero__sub">
            围绕算力、模型、数据、软件等数字能力，集聚政府、技术、市场、产业资源，
            为松江大学城科创源的企业与团队提供低成本、低门槛、高可信、高可用的数字公共服务。
          </p>
          <ul class="ps-hero__points">
            <li>什么是数字公共服务体系</li>
            <li>为什么要推数字公共服务</li>
            <li>数字服务官全程对接</li>
          </ul>
        </div>
      </section>

      <!-- ═══ 02 服务能力标签 ═══ -->
      <section class="ps-tags">
        <div class="ps-tags__inner">
          <div v-for="tag in capabilityTags" :key="tag.label" class="ps-tag">
            <span class="ps-tag__label">{{ tag.label }}</span>
            <span class="ps-tag__desc">{{ tag.desc }}</span>
          </div>
        </div>
      </section>

      <!-- ═══ 03 主题分类 ═══ -->
      <section class="ps-categories">
        <header class="ps-head">
          <span class="ps-head__index">03</span>
          <div class="ps-head__text">
            <h2>主题分类</h2>
            <p>九大数字服务方向，覆盖企业数字化全链条</p>
          </div>
        </header>

        <div class="ps-tabs" role="tablist">
          <button
            v-for="item in serviceCategories"
            :key="item.name"
            class="ps-tab"
            role="tab"
            :aria-selected="active === item.name"
            :class="{ active: active === item.name }"
            @click="active = item.name"
          >
            {{ item.name }}
          </button>
        </div>

        <div class="ps-panel">
          <div class="ps-panel__head">
            <h3>{{ activeCategory.name }}</h3>
            <div class="ps-panel__tags">
              <span v-for="t in activeCategory.tags" :key="t">{{ t }}</span>
            </div>
          </div>
          <p class="ps-panel__desc">{{ activeCategory.desc }}</p>
        </div>

        <div class="ps-grid">
          <article v-for="(item, index) in activeRecords" :key="item.title + index" class="ps-card">
            <div class="ps-card__head">
              <span class="ps-card__name">{{ item.title }}</span>
              <span class="ps-card__idx">{{ String(index + 1).padStart(2, '0') }}</span>
            </div>
            <p class="ps-card__desc">{{ item.desc }}</p>
            <p v-if="item.extra" class="ps-card__extra">
              <span class="ps-card__badge">优惠</span>{{ item.extra }}
            </p>
          </article>
        </div>
      </section>

      <!-- ═══ 04 数字服务官 ═══ -->
      <section class="ps-officer">
        <div class="ps-officer__inner">
          <div class="ps-officer__text">
            <span class="ps-officer__eyebrow">SERVICE OFFICER</span>
            <h2>{{ serviceOfficer.title }}</h2>
            <p>{{ serviceOfficer.desc }}</p>
          </div>
          <ol class="ps-officer__steps">
            <li v-for="(step, index) in serviceOfficer.items" :key="step.label">
              <span class="ps-officer__num">{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <strong>{{ step.label }}</strong>
                <p>{{ step.desc }}</p>
              </div>
            </li>
          </ol>
        </div>
      </section>
    </main>

    <footer class="ps-footer">
      <p>版权所有© 2025 上海松江高创源科技服务有限公司</p>
      <p>沪ICP备2025156731号 · 沪公网安备31011702891211号</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import { capabilityTags, serviceCategories, serviceOfficer } from '@/data/publicService'
import { serviceRecords } from '@/data/publicServiceRecords'

const { isDark } = useTheme()
const active = ref(serviceCategories[0].name)

const activeCategory = computed(
  () => serviceCategories.find((item) => item.name === active.value) || serviceCategories[0]
)
const activeRecords = computed(() =>
  serviceRecords.filter((item) => item.type === active.value)
)
</script>

<style scoped>
.page--public-service {
  --ps-cyan: #38bdf8;
  --ps-sky: #7dd3fc;
  --ps-text: #e8f1fb;
  --ps-muted: #9db4cd;
  --ps-line: rgba(56, 189, 248, 0.16);
  position: relative;
  min-height: 100vh;
  background: #060d18;
  color: var(--ps-text);
  overflow-x: hidden;
  padding-top: var(--site-nav-h, 72px);
}

/* 背景 */
.ps-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.ps-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 20%, #000 10%, transparent 75%);
}
.ps-bg__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.4;
}
.ps-bg__blob--a {
  width: 46vw;
  height: 46vw;
  top: -12vw;
  left: -10vw;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.4), transparent 65%);
}
.ps-bg__blob--b {
  width: 40vw;
  height: 40vw;
  right: -8vw;
  top: 30vh;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.32), transparent 65%);
}

main {
  position: relative;
  z-index: 1;
}

/* Hero */
.ps-hero {
  position: relative;
  padding: clamp(36px, 5vh, 64px) 24px clamp(32px, 4vh, 56px);
  max-width: 1180px;
  margin: 0 auto;
}
.ps-hero__watermark {
  position: absolute;
  right: 0;
  top: 20px;
  font-size: clamp(80px, 14vw, 210px);
  font-weight: 800;
  letter-spacing: 0.04em;
  color: rgba(56, 189, 248, 0.05);
  pointer-events: none;
  user-select: none;
}
.ps-hero__inner {
  position: relative;
  max-width: 780px;
}
.ps-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  letter-spacing: 0.22em;
  color: var(--ps-sky);
}
.ps-hero__eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--ps-cyan);
  box-shadow: 0 0 12px var(--ps-cyan);
}
.ps-hero__title {
  margin: 18px 0 20px;
  font-size: clamp(34px, 4.4vw, 58px);
  line-height: 1.15;
  letter-spacing: 0.02em;
  background: linear-gradient(120deg, #fff, var(--ps-sky) 60%, var(--ps-cyan));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.ps-hero__sub {
  margin: 0;
  max-width: 680px;
  font-size: 15px;
  line-height: 1.9;
  color: var(--ps-muted);
}
.ps-hero__points {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin: 26px 0 0;
  padding: 0;
  list-style: none;
}
.ps-hero__points li {
  position: relative;
  padding-left: 16px;
  font-size: 13px;
  color: #c9dcef;
}
.ps-hero__points li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 6px;
  height: 6px;
  margin-top: -3px;
  background: var(--ps-cyan);
  clip-path: polygon(50% 0, 100% 50%, 50% 100%, 0 50%);
}

/* 能力标签 */
.ps-tags {
  padding: 0 24px;
  max-width: 1180px;
  margin: 0 auto;
}
.ps-tags__inner {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
  padding: 18px;
  border: 1px solid var(--ps-line);
  border-radius: 18px;
  background: linear-gradient(160deg, rgba(15, 29, 49, 0.72), rgba(7, 15, 27, 0.5));
  backdrop-filter: blur(10px);
}
.ps-tag {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 14px;
  border-left: 1px solid rgba(56, 189, 248, 0.14);
}
.ps-tag:first-child {
  border-left: none;
}
.ps-tag__label {
  font-size: 15px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.04em;
}
.ps-tag__desc {
  font-size: 12px;
  line-height: 1.6;
  color: var(--ps-muted);
}

/* 主题分类 */
.ps-categories {
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(36px, 5vh, 64px) 24px;
}
.ps-head {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 28px;
}
.ps-head__index {
  font-size: 13px;
  letter-spacing: 0.2em;
  color: var(--ps-cyan);
  padding-top: 8px;
}
.ps-head__text h2 {
  margin: 0;
  font-size: clamp(24px, 2.6vw, 34px);
  letter-spacing: 0.04em;
}
.ps-head__text p {
  margin: 8px 0 0;
  font-size: 14px;
  color: var(--ps-muted);
}

.ps-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 26px;
}
.ps-tab {
  padding: 9px 18px;
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ps-muted);
  background: rgba(12, 25, 42, 0.6);
  border: 1px solid rgba(56, 189, 248, 0.16);
  border-radius: 999px;
  transition: color 220ms ease, border-color 220ms ease, background 220ms ease, box-shadow 220ms ease;
}
.ps-tab:hover {
  color: #fff;
  border-color: rgba(56, 189, 248, 0.4);
}
.ps-tab.active {
  color: #04121f;
  font-weight: 600;
  background: linear-gradient(120deg, var(--ps-sky), var(--ps-cyan));
  border-color: transparent;
  box-shadow: 0 12px 30px -16px rgba(56, 189, 248, 0.8);
}

.ps-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 22px;
  padding: 18px 20px;
  border: 1px solid rgba(56, 189, 248, 0.16);
  border-left: 2px solid var(--ps-cyan);
  border-radius: 14px;
  background: rgba(10, 22, 38, 0.55);
}
.ps-panel__head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}
.ps-panel__head h3 {
  margin: 0;
  font-size: 18px;
  letter-spacing: 0.04em;
  color: #fff;
}
.ps-panel__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.ps-panel__tags span {
  padding: 3px 10px;
  font-size: 11.5px;
  color: var(--ps-sky);
  border: 1px solid rgba(56, 189, 248, 0.2);
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.07);
}
.ps-panel__desc {
  margin: 0;
  font-size: 13px;
  line-height: 1.8;
  color: var(--ps-muted);
}

.ps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}
.ps-card {
  position: relative;
  padding: 22px 22px 20px;
  border: 1px solid rgba(56, 189, 248, 0.14);
  border-radius: 16px;
  background: linear-gradient(160deg, rgba(15, 29, 49, 0.72), rgba(7, 15, 27, 0.52));
  overflow: hidden;
  transition: border-color 260ms ease, box-shadow 260ms ease, transform 260ms ease;
}
.ps-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 80% 0%, rgba(56, 189, 248, 0.16), transparent 60%);
  opacity: 0;
  transition: opacity 260ms ease;
  pointer-events: none;
}
.ps-card:hover,
.ps-card.active {
  border-color: rgba(103, 232, 249, 0.45);
  box-shadow: 0 18px 44px -28px rgba(56, 189, 248, 0.7);
  transform: translateY(-2px);
}
.ps-card:hover::after,
.ps-card.active::after {
  opacity: 1;
}
.ps-card__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
.ps-card__name {
  font-size: 17px;
  font-weight: 600;
  letter-spacing: 0.04em;
  color: #fff;
}
.ps-card__idx {
  font-size: 12px;
  letter-spacing: 0.14em;
  color: var(--ps-cyan);
  opacity: 0.7;
}
.ps-card__desc {
  margin: 12px 0 0;
  font-size: 13px;
  line-height: 1.8;
  color: var(--ps-muted);
}
.ps-card__extra {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin: 14px 0 0;
  padding-top: 12px;
  border-top: 1px dashed rgba(56, 189, 248, 0.16);
  font-size: 12.5px;
  line-height: 1.7;
  color: #ffd88a;
}
.ps-card__badge {
  flex: none;
  padding: 1px 8px;
  font-size: 11px;
  line-height: 18px;
  color: #3a2400;
  background: linear-gradient(120deg, #ffe1a1, #ffc65c);
  border-radius: 999px;
}

/* 数字服务官 */
.ps-officer {
  padding: 0 24px clamp(64px, 10vh, 116px);
}
.ps-officer__inner {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr);
  gap: clamp(24px, 4vw, 56px);
  padding: clamp(28px, 4vw, 48px);
  border: 1px solid var(--ps-line);
  border-radius: 22px;
  background:
    radial-gradient(circle at 100% 0%, rgba(56, 189, 248, 0.16), transparent 55%),
    linear-gradient(160deg, rgba(15, 29, 49, 0.8), rgba(7, 15, 27, 0.55));
}
.ps-officer__eyebrow {
  font-size: 11.5px;
  letter-spacing: 0.24em;
  color: var(--ps-sky);
}
.ps-officer__text h2 {
  margin: 14px 0 14px;
  font-size: clamp(22px, 2.4vw, 30px);
  letter-spacing: 0.04em;
}
.ps-officer__text p {
  margin: 0;
  font-size: 13.5px;
  line-height: 1.9;
  color: var(--ps-muted);
}
.ps-officer__steps {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.ps-officer__steps li {
  display: flex;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid rgba(56, 189, 248, 0.12);
  border-radius: 14px;
  background: rgba(8, 18, 32, 0.55);
}
.ps-officer__num {
  font-size: 13px;
  letter-spacing: 0.12em;
  color: var(--ps-cyan);
  padding-top: 2px;
}
.ps-officer__steps strong {
  font-size: 14px;
  color: #fff;
}
.ps-officer__steps p {
  margin: 6px 0 0;
  font-size: 12.5px;
  line-height: 1.7;
  color: var(--ps-muted);
}

/* 页脚 */
.ps-footer {
  position: relative;
  z-index: 1;
  padding: 28px 24px 36px;
  text-align: center;
  border-top: 1px solid var(--ps-line);
  background: rgba(4, 8, 16, 0.7);
}
.ps-footer p {
  margin: 4px 0;
  font-size: 12px;
  color: rgba(157, 180, 205, 0.8);
}

/* 亮色主题 */
.theme-light.page--public-service {
  --ps-text: #12293f;
  --ps-muted: #5b7591;
  --ps-line: rgba(14, 116, 178, 0.16);
  background: #f3f8fd;
}
.theme-light .ps-bg__grid {
  background-image:
    linear-gradient(rgba(14, 116, 178, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 116, 178, 0.07) 1px, transparent 1px);
}
.theme-light .ps-hero__title {
  background: linear-gradient(120deg, #0b2b45, #0e74b2 60%, #14a3d8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.theme-light .ps-hero__points li {
  color: #2c4b66;
}
.theme-light .ps-tags__inner,
.theme-light .ps-card {
  background: linear-gradient(160deg, #ffffff, #f2f8ff);
}
.theme-light .ps-panel {
  background: #ffffff;
}
.theme-light .ps-panel__head h3 {
  color: #0b2b45;
}
.theme-light .ps-card__extra {
  color: #a8700c;
  border-top-color: rgba(14, 116, 178, 0.16);
}
.theme-light .ps-card__name,
.theme-light .ps-tag__label,
.theme-light .ps-officer__steps strong {
  color: #0b2b45;
}
.theme-light .ps-tab {
  background: rgba(255, 255, 255, 0.85);
  color: #4a637b;
}
.theme-light .ps-tab:hover {
  color: #0b2b45;
}
.theme-light .ps-tab.active {
  color: #04121f;
}
.theme-light .ps-officer__inner {
  background:
    radial-gradient(circle at 100% 0%, rgba(14, 165, 233, 0.12), transparent 55%),
    linear-gradient(160deg, #ffffff, #eff7ff);
}
.theme-light .ps-officer__steps li {
  background: rgba(255, 255, 255, 0.8);
}
.theme-light .ps-footer {
  background: rgba(235, 244, 253, 0.8);
}
.theme-light .ps-footer p {
  color: rgba(90, 113, 137, 0.8);
}

@media (max-width: 900px) {
  .ps-tags__inner {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ps-tag {
    border-left: none;
    border-top: 1px solid rgba(56, 189, 248, 0.14);
    padding-top: 12px;
  }
  .ps-tag:nth-child(-n + 2) {
    border-top: none;
  }
  .ps-officer__inner {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
