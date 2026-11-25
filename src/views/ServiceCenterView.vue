<template>
  <div class="page page--service-center" :class="{ 'theme-light': !isDark }">
    <div class="sc-bg" aria-hidden="true">
      <div class="sc-bg__grid"></div>
      <div class="sc-bg__blob sc-bg__blob--a"></div>
      <div class="sc-bg__blob sc-bg__blob--b"></div>
    </div>

    <main>
      <!-- ═══ 01 科创服务中心 ═══ -->
      <section class="sc-hero">
        <div class="sc-hero__watermark" aria-hidden="true">SERVICE</div>
        <div class="sc-hero__inner">
          <span class="sc-hero__eyebrow">
            <span class="dot"></span>
            INNOVATION SERVICE CENTER · 科创服务中心
          </span>
          <h1 class="sc-hero__title">科创服务中心</h1>
          <p class="sc-hero__sub">
            一口受理企业创新需求，联动高校院所、金融机构、载体空间与政策资源，
            为科创源企业与团队提供科技成果转化、金融、数字服务、载体、政策、人才的一站式服务。
          </p>
          <ul class="sc-hero__stats">
            <li v-for="stat in serviceStats" :key="stat.label">
              <strong>{{ stat.value }}<em>{{ stat.unit }}</em></strong>
              <span>{{ stat.label }}</span>
            </li>
          </ul>
        </div>
      </section>

      <!-- ═══ 02 六大服务板块 ═══ -->
      <section class="sc-sections">
        <header class="sc-head">
          <span class="sc-head__index">02</span>
          <div class="sc-head__text">
            <h2>六大服务板块</h2>
            <p>SERVICE SECTIONS · 覆盖企业创新全链条</p>
          </div>
        </header>

        <div class="sc-grid">
          <article
            v-for="(section, index) in serviceSections"
            :key="section.key"
            class="sc-card"
            :style="{ transitionDelay: `${index * 50}ms` }"
          >
            <div class="sc-card__head">
              <span class="sc-card__code">{{ section.code }}</span>
              <div class="sc-card__titles">
                <h3>{{ section.name }}</h3>
                <span>{{ section.en }}</span>
              </div>
            </div>
            <p class="sc-card__desc">{{ section.desc }}</p>
            <ul class="sc-card__items">
              <li v-for="item in section.items" :key="item.name">
                <a :href="item.href">
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.desc }}</span>
                </a>
              </li>
            </ul>
            <a :href="section.link" class="sc-card__link">
              {{ section.linkText }}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </article>
        </div>
      </section>

      <!-- ═══ 03 服务事项清单 ═══ -->
      <section class="sc-catalog">
        <header class="sc-head">
          <span class="sc-head__index">03</span>
          <div class="sc-head__text">
            <h2>服务事项清单</h2>
            <p>SERVICE CATALOG · 常见事项一次说清</p>
          </div>
        </header>

        <div class="sc-tabs" role="tablist" aria-label="服务事项筛选">
          <button
            v-for="tab in catalogTabs"
            :key="tab"
            type="button"
            class="sc-tab"
            role="tab"
            :aria-selected="activeSection === tab"
            :class="{ active: activeSection === tab }"
            @click="activeSection = tab"
          >
            {{ tab }}
          </button>
        </div>

        <div class="sc-items">
          <article v-for="item in filteredItems" :key="item.name" class="sc-item">
            <div class="sc-item__top">
              <h3>{{ item.name }}</h3>
              <span class="sc-item__tag">{{ item.section }}</span>
            </div>
            <p>{{ item.desc }}</p>
            <div class="sc-item__meta">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <path d="M3 10h18" />
                </svg>
                {{ item.mode }}
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                {{ item.duration }}
              </span>
              <a :href="item.link" class="sc-item__link">
                去办理
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M7 17 17 7M9 7h8v8" />
                </svg>
              </a>
            </div>
          </article>
        </div>
      </section>

      <!-- ═══ 04 服务流程 ═══ -->
      <section class="sc-process">
        <header class="sc-head">
          <span class="sc-head__index">04</span>
          <div class="sc-head__text">
            <h2>服务流程</h2>
            <p>SERVICE PROCESS · 五步闭环，全程可跟踪</p>
          </div>
        </header>

        <ol class="sc-steps">
          <li v-for="(step, index) in serviceProcess" :key="step.title">
            <span class="sc-steps__num">{{ String(index + 1).padStart(2, '0') }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </li>
        </ol>

        <div class="sc-commit">
          <div v-for="item in serviceCommitments" :key="item.title" class="sc-commit__item">
            <strong>{{ item.title }}</strong>
            <span>{{ item.desc }}</span>
          </div>
        </div>
      </section>

      <!-- ═══ 05 咨询预约 ═══ -->
      <section class="sc-contact">
        <div class="sc-contact__info">
          <span class="sc-contact__eyebrow">CONTACT · 联系我们</span>
          <h2>告诉我们你的需求</h2>
          <p>提交后由科创服务中心统一受理，1 个工作日内安排专属服务官对接。</p>
          <ul class="sc-contact__list">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {{ serviceContact.address }}
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              {{ serviceContact.phone }}
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              {{ serviceContact.email }}
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              {{ serviceContact.hours }}
            </li>
          </ul>
        </div>

        <form class="sc-form" @submit.prevent="submitForm">
          <div class="sc-form__row">
            <label>
              <span>企业 / 团队名称</span>
              <input v-model.trim="form.company" type="text" placeholder="请输入企业或团队名称" />
            </label>
            <label>
              <span>联系人</span>
              <input v-model.trim="form.contact" type="text" placeholder="请输入联系人姓名" />
            </label>
          </div>
          <div class="sc-form__row">
            <label>
              <span>联系电话</span>
              <input v-model.trim="form.phone" type="tel" placeholder="请输入手机号" />
            </label>
            <label>
              <span>服务板块</span>
              <select v-model="form.section">
                <option v-for="section in serviceSections" :key="section.key" :value="section.name">
                  {{ section.name }}
                </option>
              </select>
            </label>
          </div>
          <label class="sc-form__full">
            <span>需求描述</span>
            <textarea v-model.trim="form.demand" rows="4" placeholder="简单描述你的需求，例如技术对接、融资、载体选址等"></textarea>
          </label>

          <p v-if="formError" class="sc-form__msg is-error">{{ formError }}</p>
          <p v-else-if="formSuccess" class="sc-form__msg is-success">{{ formSuccess }}</p>

          <button type="submit" class="sc-form__submit">
            提交需求
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <p class="sc-form__tip">演示页面，提交不会真实发送；正式上线后可对接统一受理后台。</p>
        </form>
      </section>
    </main>

    <footer class="sc-footer">
      <p>版权所有© 2025 上海松江高创源科技服务有限公司</p>
      <p>沪ICP备2025156731号 · 沪公网安备31011702891211号</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, reactive, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'
import {
  serviceStats,
  serviceSections,
  serviceItems,
  serviceProcess,
  serviceCommitments,
  serviceContact,
} from '@/data/serviceCenter'

const { isDark } = useTheme()

const activeSection = ref('全部')
const catalogTabs = computed(() => ['全部', ...serviceSections.map((s) => s.name)])
const filteredItems = computed(() =>
  activeSection.value === '全部'
    ? serviceItems
    : serviceItems.filter((item) => item.section === activeSection.value)
)

const form = reactive({
  company: '',
  contact: '',
  phone: '',
  section: serviceSections[0].name,
  demand: '',
})
const formError = ref('')
const formSuccess = ref('')

const submitForm = () => {
  formError.value = ''
  formSuccess.value = ''
  if (!form.company || !form.contact || !form.phone) {
    formError.value = '请填写企业名称、联系人和联系电话。'
    return
  }
  if (!/^1[3-9]\d{9}$/.test(form.phone)) {
    formError.value = '请输入正确的 11 位手机号。'
    return
  }
  formSuccess.value = '需求已提交（演示），科创服务中心将在 1 个工作日内与你联系。'
  form.company = ''
  form.contact = ''
  form.phone = ''
  form.demand = ''
}
</script>

<style scoped>
.page--service-center {
  --sc-cyan: #38bdf8;
  --sc-sky: #7dd3fc;
  --sc-indigo: #6366f1;
  --sc-text: #e8f1fb;
  --sc-muted: #9db4cd;
  --sc-line: rgba(56, 189, 248, 0.16);
  --sc-panel: rgba(13, 26, 44, 0.72);
  position: relative;
  min-height: 100vh;
  background: #060d18;
  color: var(--sc-text);
  overflow-x: hidden;
  padding-top: var(--site-nav-h, 72px);
}

/* 背景 */
.sc-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}
.sc-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px);
  background-size: 64px 64px;
  mask-image: radial-gradient(circle at 50% 15%, #000 10%, transparent 78%);
}
.sc-bg__blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
}
.sc-bg__blob--a {
  width: 44vw;
  height: 44vw;
  top: -12vw;
  left: -10vw;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.38), transparent 65%);
}
.sc-bg__blob--b {
  width: 40vw;
  height: 40vw;
  right: -10vw;
  top: 42vh;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.32), transparent 65%);
}

main {
  position: relative;
  z-index: 1;
}

/* Hero */
.sc-hero {
  position: relative;
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(40px, 6vh, 72px) 24px clamp(28px, 4vh, 48px);
}
.sc-hero__watermark {
  position: absolute;
  right: 0;
  top: 14px;
  font-size: clamp(72px, 13vw, 190px);
  font-weight: 800;
  letter-spacing: 0.04em;
  color: rgba(56, 189, 248, 0.05);
  pointer-events: none;
  user-select: none;
}
.sc-hero__inner {
  position: relative;
  max-width: 820px;
}
.sc-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--sc-sky);
}
.sc-hero__eyebrow .dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sc-cyan);
  box-shadow: 0 0 12px var(--sc-cyan);
}
.sc-hero__title {
  margin: 18px 0 18px;
  font-size: clamp(34px, 4.6vw, 60px);
  line-height: 1.12;
  letter-spacing: 0.02em;
  background: linear-gradient(120deg, #fff, var(--sc-sky) 58%, var(--sc-cyan));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.sc-hero__sub {
  margin: 0;
  max-width: 700px;
  font-size: 15px;
  line-height: 1.9;
  color: var(--sc-muted);
}
.sc-hero__stats {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin: 30px 0 0;
  padding: 18px 20px;
  list-style: none;
  border: 1px solid var(--sc-line);
  border-radius: 18px;
  background: linear-gradient(160deg, rgba(15, 29, 49, 0.72), rgba(7, 15, 27, 0.5));
  backdrop-filter: blur(10px);
}
.sc-hero__stats li {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 18px;
  border-left: 1px solid rgba(56, 189, 248, 0.14);
}
.sc-hero__stats li:first-child {
  border-left: none;
  padding-left: 0;
}
.sc-hero__stats strong {
  font-size: 26px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.02em;
}
.sc-hero__stats strong em {
  font-style: normal;
  font-size: 13px;
  margin-left: 3px;
  color: var(--sc-cyan);
}
.sc-hero__stats span {
  font-size: 12px;
  color: var(--sc-muted);
}

/* 区块通用头部 */
.sc-head {
  display: flex;
  gap: 18px;
  align-items: flex-start;
  margin-bottom: 28px;
}
.sc-head__index {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--sc-cyan);
  padding-top: 8px;
}
.sc-head__text h2 {
  margin: 0 0 6px;
  font-size: clamp(24px, 2.6vw, 34px);
  letter-spacing: 0.02em;
  color: #fff;
}
.sc-head__text p {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: var(--sc-muted);
}

/* 六大板块 */
.sc-sections,
.sc-catalog,
.sc-process {
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(36px, 5vh, 60px) 24px;
}
.sc-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}
.sc-card {
  display: flex;
  flex-direction: column;
  padding: 22px;
  border: 1px solid var(--sc-line);
  border-radius: 18px;
  background: var(--sc-panel);
  backdrop-filter: blur(8px);
  transition: transform 0.28s ease, border-color 0.28s ease, box-shadow 0.28s ease;
}
.sc-card:hover {
  transform: translateY(-4px);
  border-color: rgba(56, 189, 248, 0.42);
  box-shadow: 0 18px 38px rgba(3, 12, 24, 0.55);
}
.sc-card__head {
  display: flex;
  align-items: center;
  gap: 12px;
}
.sc-card__code {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  flex: 0 0 auto;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 700;
  color: var(--sc-cyan);
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.28);
}
.sc-card__titles h3 {
  margin: 0;
  font-size: 18px;
  color: #fff;
}
.sc-card__titles span {
  display: block;
  margin-top: 2px;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: rgba(56, 189, 248, 0.65);
}
.sc-card__desc {
  margin: 14px 0 0;
  font-size: 13px;
  line-height: 1.8;
  color: var(--sc-muted);
}
.sc-card__items {
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
  border-top: 1px dashed rgba(56, 189, 248, 0.16);
}
.sc-card__items li a {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 0;
  border-bottom: 1px dashed rgba(56, 189, 248, 0.1);
  text-decoration: none;
  transition: color 0.2s ease;
}
.sc-card__items li:last-child a {
  border-bottom: none;
}
.sc-card__items strong {
  font-size: 13px;
  font-weight: 600;
  color: #d6e6f7;
  transition: color 0.2s ease;
}
.sc-card__items span {
  font-size: 12px;
  color: var(--sc-muted);
  text-align: right;
}
.sc-card__items li a:hover strong {
  color: var(--sc-cyan);
}
.sc-card__link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 16px;
  font-size: 12px;
  color: var(--sc-sky);
  text-decoration: none;
}
.sc-card__link svg {
  width: 15px;
  height: 15px;
  transition: transform 0.2s ease;
}
.sc-card__link:hover svg {
  transform: translateX(4px);
}

/* 事项清单 */
.sc-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 22px;
}
.sc-tab {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--sc-line);
  background: rgba(10, 21, 38, 0.6);
  color: var(--sc-muted);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.22s ease;
}
.sc-tab:hover {
  color: #fff;
  border-color: rgba(56, 189, 248, 0.4);
}
.sc-tab.active {
  color: #06121f;
  font-weight: 600;
  background: linear-gradient(120deg, var(--sc-sky), var(--sc-cyan));
  border-color: transparent;
}
.sc-items {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}
.sc-item {
  padding: 18px 20px;
  border: 1px solid var(--sc-line);
  border-radius: 14px;
  background: var(--sc-panel);
  transition: border-color 0.24s ease, transform 0.24s ease;
}
.sc-item:hover {
  border-color: rgba(56, 189, 248, 0.4);
  transform: translateY(-2px);
}
.sc-item__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}
.sc-item__top h3 {
  margin: 0;
  font-size: 15px;
  color: #fff;
}
.sc-item__tag {
  flex: 0 0 auto;
  padding: 3px 9px;
  border-radius: 999px;
  font-size: 11px;
  color: var(--sc-sky);
  background: rgba(56, 189, 248, 0.1);
  border: 1px solid rgba(56, 189, 248, 0.24);
  white-space: nowrap;
}
.sc-item > p {
  margin: 8px 0 12px;
  font-size: 12.5px;
  line-height: 1.75;
  color: var(--sc-muted);
}
.sc-item__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  color: var(--sc-muted);
}
.sc-item__meta span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}
.sc-item__meta svg {
  width: 14px;
  height: 14px;
  color: var(--sc-cyan);
}
.sc-item__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
  font-size: 12px;
  color: var(--sc-sky);
  text-decoration: none;
}
.sc-item__link svg {
  width: 13px;
  height: 13px;
}
.sc-item__link:hover {
  color: var(--sc-cyan);
}

/* 流程 */
.sc-steps {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
  counter-reset: step;
}
.sc-steps li {
  position: relative;
  padding: 18px 16px;
  border: 1px solid var(--sc-line);
  border-radius: 14px;
  background: var(--sc-panel);
}
.sc-steps li::after {
  content: '';
  position: absolute;
  top: 34px;
  right: -8px;
  width: 10px;
  height: 10px;
  border-top: 1px solid rgba(56, 189, 248, 0.5);
  border-right: 1px solid rgba(56, 189, 248, 0.5);
  transform: rotate(45deg);
}
.sc-steps li:last-child::after {
  display: none;
}
.sc-steps__num {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: var(--sc-cyan);
}
.sc-steps h3 {
  margin: 8px 0 6px;
  font-size: 15px;
  color: #fff;
}
.sc-steps p {
  margin: 0;
  font-size: 12px;
  line-height: 1.7;
  color: var(--sc-muted);
}
.sc-commit {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  margin-top: 18px;
  padding: 16px 20px;
  border: 1px solid var(--sc-line);
  border-radius: 14px;
  background: linear-gradient(120deg, rgba(56, 189, 248, 0.08), rgba(99, 102, 241, 0.06));
}
.sc-commit__item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.sc-commit__item strong {
  font-size: 13px;
  color: #fff;
}
.sc-commit__item span {
  font-size: 12px;
  color: var(--sc-muted);
}

/* 咨询预约 */
.sc-contact {
  max-width: 1180px;
  margin: 0 auto;
  padding: clamp(36px, 5vh, 60px) 24px clamp(56px, 7vh, 84px);
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 40px;
  align-items: start;
}
.sc-contact__eyebrow {
  font-size: 11px;
  letter-spacing: 0.18em;
  color: var(--sc-sky);
}
.sc-contact__info h2 {
  margin: 12px 0 12px;
  font-size: clamp(24px, 2.6vw, 34px);
  color: #fff;
}
.sc-contact__info > p {
  margin: 0 0 20px;
  font-size: 13px;
  line-height: 1.85;
  color: var(--sc-muted);
}
.sc-contact__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.sc-contact__list li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: #c9dcef;
}
.sc-contact__list svg {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  color: var(--sc-cyan);
}

.sc-form {
  padding: 24px;
  border: 1px solid var(--sc-line);
  border-radius: 18px;
  background: var(--sc-panel);
  backdrop-filter: blur(10px);
}
.sc-form__row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 14px;
}
.sc-form label {
  display: flex;
  flex-direction: column;
  gap: 7px;
}
.sc-form label > span {
  font-size: 12px;
  color: var(--sc-muted);
}
.sc-form input,
.sc-form select,
.sc-form textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid rgba(56, 189, 248, 0.18);
  border-radius: 10px;
  background: rgba(6, 14, 26, 0.7);
  color: #e8f1fb;
  font-size: 13px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.sc-form input:focus,
.sc-form select:focus,
.sc-form textarea:focus {
  border-color: rgba(56, 189, 248, 0.6);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.12);
}
.sc-form textarea {
  resize: vertical;
  min-height: 100px;
}
.sc-form__full {
  margin-bottom: 14px;
}
.sc-form__msg {
  margin: 0 0 12px;
  font-size: 12.5px;
}
.sc-form__msg.is-error {
  color: #fca5a5;
}
.sc-form__msg.is-success {
  color: #6ee7b7;
}
.sc-form__submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 11px 24px;
  border: none;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  color: #06121f;
  background: linear-gradient(120deg, var(--sc-sky), var(--sc-cyan));
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.sc-form__submit svg {
  width: 16px;
  height: 16px;
}
.sc-form__submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 24px rgba(56, 189, 248, 0.32);
}
.sc-form__tip {
  margin: 12px 0 0;
  font-size: 11.5px;
  color: rgba(157, 180, 205, 0.75);
}

/* 页脚 */
.sc-footer {
  position: relative;
  z-index: 1;
  padding: 22px 24px;
  text-align: center;
  border-top: 1px solid rgba(56, 189, 248, 0.1);
  background: rgba(4, 10, 19, 0.8);
}
.sc-footer p {
  margin: 4px 0;
  font-size: 12px;
  color: rgba(157, 180, 205, 0.75);
}

/* 浅色主题 */
.theme-light.page--service-center {
  background: #f4f8fc;
  color: #1e293b;
  --sc-text: #1e293b;
  --sc-muted: #5b7189;
  --sc-line: rgba(37, 99, 176, 0.14);
  --sc-panel: rgba(255, 255, 255, 0.86);
  --sc-cyan: #2563b0;
  --sc-sky: #1d4ed8;
}
.theme-light .sc-bg__grid {
  background-image:
    linear-gradient(rgba(37, 99, 176, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 176, 0.07) 1px, transparent 1px);
}
.theme-light .sc-hero__watermark {
  color: rgba(37, 99, 176, 0.055);
}
.theme-light .sc-hero__title {
  background: linear-gradient(120deg, #0f2a4a, #2563b0 60%, #1d4ed8);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.theme-light .sc-hero__stats {
  background: linear-gradient(160deg, #ffffff, #eef5fc);
  border-color: rgba(37, 99, 176, 0.16);
  box-shadow: 0 10px 28px rgba(37, 99, 176, 0.08);
}
.theme-light .sc-hero__stats li {
  border-left-color: rgba(37, 99, 176, 0.14);
}
.theme-light .sc-hero__stats strong,
.theme-light .sc-head__text h2,
.theme-light .sc-card__titles h3,
.theme-light .sc-item__top h3,
.theme-light .sc-steps h3,
.theme-light .sc-commit__item strong,
.theme-light .sc-contact__info h2 {
  color: #0f2a4a;
}
.theme-light .sc-card__items strong,
.theme-light .sc-contact__list li {
  color: #33475f;
}
.theme-light .sc-tab {
  background: #fff;
}
.theme-light .sc-tab:hover {
  color: #0f2a4a;
}
.theme-light .sc-tab.active {
  color: #fff;
  background: linear-gradient(120deg, #2563b0, #1d4ed8);
}
.theme-light .sc-form input,
.theme-light .sc-form select,
.theme-light .sc-form textarea {
  background: #fff;
  color: #1e293b;
  border-color: rgba(37, 99, 176, 0.18);
}
.theme-light .sc-form__msg.is-error {
  color: #dc2626;
}
.theme-light .sc-form__msg.is-success {
  color: #047857;
}
.theme-light .sc-form__submit {
  color: #fff;
  background: linear-gradient(120deg, #2563b0, #1d4ed8);
}
.theme-light .sc-footer {
  background: #eaf2fa;
}
.theme-light .sc-footer p {
  color: #5b7189;
}

/* 响应式 */
@media (max-width: 1024px) {
  .sc-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .sc-steps {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .sc-steps li::after {
    display: none;
  }
  .sc-contact {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}
@media (max-width: 720px) {
  .sc-hero__stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
  .sc-hero__stats li:nth-child(odd) {
    border-left: none;
    padding-left: 0;
  }
  .sc-grid,
  .sc-items,
  .sc-commit {
    grid-template-columns: 1fr;
  }
  .sc-steps {
    grid-template-columns: 1fr;
  }
  .sc-form__row {
    grid-template-columns: 1fr;
  }
  .sc-card__items li a {
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
  }
  .sc-card__items span {
    text-align: left;
  }
}
</style>
