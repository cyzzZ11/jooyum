<template>
  <div class="page page--lab" :class="{ 'theme-light': !isDark }">
    <div class="lb-bg" aria-hidden="true">
      <div class="lb-bg__grid"></div>
      <div class="lb-bg__blob lb-bg__blob--a"></div>
      <div class="lb-bg__blob lb-bg__blob--b"></div>
    </div>

    <!-- ═══ 头部 ═══ -->
    <header class="lb-hero">
      <div class="lb-hero__watermark" aria-hidden="true">LABORATORY</div>
      <div class="lb-hero__inner">
        <span class="lb-hero__eyebrow"><span class="dot"></span>SHARED LABORATORY · 双向发榜</span>
        <h1 class="lb-hero__title">共享实验室（设备）</h1>
        <p class="lb-hero__desc">
          汇聚东华大学、上海工程技术大学、上海农林职业技术学院的大型科研仪器与实验室设备，
          覆盖材料表征、化学分析、纺织检测等方向，支持查询仪器型号、技术指标与服务内容。
        </p>
        <ul class="lb-hero__stats">
          <li><strong>{{ total }}</strong><span>可共享设备</span></li>
          <li><strong>{{ schools.length }}</strong><span>合作高校</span></li>
          <li><strong>{{ lastUpdated }}</strong><span>数据更新时间</span></li>
        </ul>
      </div>
    </header>

    <!-- ═══ 筛选控制台 ═══ -->
    <section class="lb-console" aria-label="设备筛选">
      <div class="lb-console__inner">
        <div class="lb-filters">
          <label class="lb-search">
            <input
              v-model.trim="keyword"
              type="search"
              placeholder="请输入仪器名称、规格型号查询"
              @keyup.enter="applySearch"
            />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="6.4" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </label>
          <button type="button" class="lb-btn lb-btn--primary" @click="applySearch">查询</button>
          <button type="button" class="lb-btn lb-btn--ghost" @click="resetFilters">重置</button>
        </div>

        <div class="lb-meta">
          <div class="lb-seg" role="group" aria-label="所属高校">
            <button
              v-for="item in schoolOptions"
              :key="item.name"
              type="button"
              :class="{ active: draftSchool === item.name }"
              @click="selectSchool(item.name)"
            >
              {{ item.label }}
              <em>{{ item.count }}</em>
            </button>
          </div>
          <p class="lb-count">共 <em>{{ filtered.length }}</em> 台设备</p>
        </div>
      </div>
    </section>

    <!-- ═══ 设备列表 ═══ -->
    <main class="lb-main">
      <div v-if="loading" class="lb-skeleton">
        <div v-for="n in 6" :key="n" class="lb-skeleton__row"></div>
      </div>

      <div v-else class="lb-list">
        <article
          v-for="(item, index) in pageItems"
          :key="item.id"
          class="lb-item"
          :class="{ 'is-open': expandedId === item.id }"
          :style="{ animationDelay: `${Math.min(index, 10) * 40}ms` }"
        >
          <header
            class="lb-item__head"
            role="button"
            tabindex="0"
            :aria-expanded="String(expandedId === item.id)"
            @click="toggle(item.id)"
            @keydown.enter.prevent="toggle(item.id)"
            @keydown.space.prevent="toggle(item.id)"
          >
            <span class="lb-item__idx">{{ String((page - 1) * pageSize + index + 1).padStart(3, '0') }}</span>
            <div class="lb-item__title">
              <h2>{{ item.deviceName }}</h2>
              <p>
                <span class="lb-item__school">{{ item.schoolName }}</span>
                <span class="lb-item__spec">{{ item.deviceSpec || '型号待补充' }}</span>
              </p>
            </div>
            <p class="lb-item__preview">{{ item.mainFunctions }}</p>
            <span class="lb-item__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </span>
          </header>

          <div v-if="expandedId === item.id" class="lb-item__body">
            <div class="lb-detail">
              <h3><span class="lb-detail__dot"></span>技术指标</h3>
              <p>{{ item.specification || '暂无技术指标信息' }}</p>
            </div>
            <div class="lb-detail">
              <h3><span class="lb-detail__dot"></span>主要功能</h3>
              <p>{{ item.mainFunctions || '暂无功能说明' }}</p>
            </div>
            <div class="lb-detail">
              <h3><span class="lb-detail__dot"></span>服务内容</h3>
              <p>{{ item.servicesContent || '暂无服务内容说明' }}</p>
            </div>
          </div>
        </article>

        <p v-if="!filtered.length" class="lb-empty">
          暂无符合条件的设备，试试调整高校或关键词
        </p>
      </div>

      <!-- 分页 -->
      <footer v-if="!loading && pageCount > 1" class="lb-pager">
        <button type="button" class="lb-pager__nav" :disabled="page === 1" @click="goPage(1)">
          首页
        </button>
        <button type="button" class="lb-pager__nav" :disabled="page === 1" @click="goPage(page - 1)">
          上一页
        </button>
        <button
          v-for="n in pageNumbers"
          :key="n"
          type="button"
          class="lb-pager__num"
          :class="{ active: n === page }"
          @click="goPage(n)"
        >
          {{ n }}
        </button>
        <button type="button" class="lb-pager__nav" :disabled="page === pageCount" @click="goPage(page + 1)">
          下一页
        </button>
        <button type="button" class="lb-pager__nav" :disabled="page === pageCount" @click="goPage(pageCount)">
          尾页
        </button>
      </footer>

      <p class="lb-source">数据来源：松江区共享实验室（设备）平台，共 {{ total }} 台设备</p>
    </main>

    <footer class="lb-footer">
      <p>共享实验室（设备） · 松江大学城科创源</p>
      <p>仪器共享 · 双向发榜 · 校企对接</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useTheme } from '@/composables/useTheme'

const baseUrl = import.meta.env.BASE_URL
const { isDark } = useTheme()

const loading = ref(true)
const records = ref([])
const schools = ref([])
const total = ref(0)
const lastUpdated = ref('2025-12-08')

const schoolName = ref('')
const draftSchool = ref('')
const keyword = ref('')
const appliedKeyword = ref('')
const page = ref(1)
const pageSize = 10
const expandedId = ref(0)

const schoolOptions = computed(() => [
  { name: '', label: '全部', count: total.value },
  ...schools.value.map((item) => ({ ...item, label: item.name })),
])

const filtered = computed(() => {
  const kw = appliedKeyword.value.toLowerCase()
  return records.value.filter((item) => {
    if (schoolName.value && item.schoolName !== schoolName.value) return false
    if (!kw) return true
    return (
      item.deviceName.toLowerCase().includes(kw) ||
      item.deviceSpec.toLowerCase().includes(kw)
    )
  })
})

const pageCount = computed(() => Math.max(1, Math.ceil(filtered.value.length / pageSize)))

const pageItems = computed(() => {
  const start = (page.value - 1) * pageSize
  return filtered.value.slice(start, start + pageSize)
})

const pageNumbers = computed(() => {
  const count = pageCount.value
  if (count <= 7) return Array.from({ length: count }, (_, i) => i + 1)
  const current = page.value
  const start = Math.min(Math.max(1, current - 2), count - 6)
  return Array.from({ length: 7 }, (_, i) => start + i)
})

function toggle (id) {
  expandedId.value = expandedId.value === id ? 0 : id
}

function applySearch () {
  appliedKeyword.value = keyword.value
  page.value = 1
  expandedId.value = 0
}

function selectSchool (name) {
  draftSchool.value = name
  schoolName.value = name
  page.value = 1
  expandedId.value = 0
}

function resetFilters () {
  keyword.value = ''
  appliedKeyword.value = ''
  draftSchool.value = ''
  schoolName.value = ''
  page.value = 1
  expandedId.value = 0
}

function goPage (n) {
  page.value = Math.min(Math.max(1, n), pageCount.value)
  expandedId.value = 0
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  try {
    const res = await fetch(`${baseUrl}data/laboratory.json`)
    const data = await res.json()
    records.value = data.records || []
    schools.value = data.schools || []
    total.value = data.total || records.value.length
    if (data.updatedAt) lastUpdated.value = data.updatedAt
  } catch (err) {
    console.error('共享实验室数据加载失败', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.page--lab {
  --lb-bg: #050b16;
  --lb-bg-soft: #081527;
  --lb-panel: rgba(10, 22, 40, 0.78);
  --lb-panel-strong: rgba(8, 18, 34, 0.94);
  --lb-line: rgba(56, 189, 248, 0.16);
  --lb-line-strong: rgba(56, 189, 248, 0.42);
  --lb-text: #e6f3ff;
  --lb-muted: #8ea9c6;
  --lb-accent: #38bdf8;
  --lb-accent-2: #34d399;
  --lb-font: "Inter", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: var(--lb-bg);
  color: var(--lb-text);
  font-family: var(--lb-font);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

.page--lab.theme-light {
  --lb-bg: #f3f8fd;
  --lb-bg-soft: #ffffff;
  --lb-panel: rgba(255, 255, 255, 0.9);
  --lb-panel-strong: rgba(255, 255, 255, 0.98);
  --lb-line: rgba(14, 116, 178, 0.16);
  --lb-line-strong: rgba(14, 116, 178, 0.36);
  --lb-text: #0f2233;
  --lb-muted: #5a7189;
  --lb-accent: #0ea5e9;
  --lb-accent-2: #059669;
}

/* 背景 */
.lb-bg {
  position: absolute;
  inset: 0 0 auto;
  height: 620px;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.lb-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(180deg, #000 0%, transparent 92%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 92%);
}
.theme-light .lb-bg__grid {
  background-image:
    linear-gradient(rgba(14, 116, 178, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 116, 178, 0.07) 1px, transparent 1px);
}
.lb-bg__blob {
  position: absolute;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.45;
}
.lb-bg__blob--a {
  top: -220px;
  left: -150px;
  background: radial-gradient(circle, rgba(2, 132, 199, 0.5), transparent 68%);
}
.lb-bg__blob--b {
  top: -280px;
  right: -170px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.34), transparent 70%);
}
.theme-light .lb-bg__blob {
  opacity: 0.26;
}

/* 头部 */
.lb-hero {
  position: relative;
  padding: 104px clamp(20px, 5vw, 76px) 34px;
  overflow: hidden;
}
.lb-hero__watermark {
  position: absolute;
  right: clamp(10px, 6vw, 70px);
  top: 84px;
  font-size: clamp(40px, 7.4vw, 112px);
  font-weight: 800;
  letter-spacing: 6px;
  color: rgba(56, 189, 248, 0.07);
  user-select: none;
  pointer-events: none;
}
.theme-light .lb-hero__watermark {
  color: rgba(14, 116, 178, 0.08);
}
.lb-hero__inner {
  max-width: 1240px;
  margin: 0 auto;
}
.lb-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  border: 1px solid var(--lb-line);
  border-radius: 999px;
  background: var(--lb-panel);
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--lb-muted);
}
.lb-hero__eyebrow .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--lb-accent);
  box-shadow: 0 0 10px var(--lb-accent);
}
.lb-hero__title {
  margin: 18px 0 10px;
  font-size: clamp(32px, 4.4vw, 56px);
  font-weight: 800;
  letter-spacing: 2px;
  line-height: 1.12;
  background: linear-gradient(120deg, var(--lb-text) 10%, var(--lb-accent) 92%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.lb-hero__desc {
  max-width: 720px;
  margin: 0;
  color: var(--lb-muted);
  font-size: 15px;
}
.lb-hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin: 30px 0 0;
  padding: 0;
  list-style: none;
}
.lb-hero__stats li {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.lb-hero__stats strong {
  font-size: clamp(22px, 2.8vw, 32px);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--lb-accent);
  text-shadow: 0 0 22px rgba(56, 189, 248, 0.35);
}
.theme-light .lb-hero__stats strong {
  text-shadow: none;
}
.lb-hero__stats span {
  font-size: 12px;
  letter-spacing: 1.5px;
  color: var(--lb-muted);
}

/* 控制台 */
.lb-console {
  position: sticky;
  top: var(--site-nav-h, 72px);
  z-index: 250;
  padding: 14px clamp(16px, 5vw, 76px);
  background: color-mix(in srgb, var(--lb-bg) 82%, transparent);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--lb-line);
  border-bottom: 1px solid var(--lb-line);
}
.lb-console__inner {
  max-width: 1240px;
  margin: 0 auto;
}
.lb-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
}
.lb-search {
  position: relative;
  flex: 1 1 320px;
  display: flex;
  align-items: center;
}
.lb-search input {
  width: 100%;
  height: 42px;
  padding: 0 42px 0 16px;
  border: 1px solid var(--lb-line);
  border-radius: 10px;
  background: var(--lb-panel-strong);
  color: var(--lb-text);
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.lb-search input::placeholder {
  color: var(--lb-muted);
}
.lb-search input:focus {
  border-color: var(--lb-line-strong);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.12);
}
.lb-search svg {
  position: absolute;
  right: 14px;
  width: 18px;
  height: 18px;
  color: var(--lb-muted);
  pointer-events: none;
}
.lb-btn {
  height: 42px;
  padding: 0 24px;
  border-radius: 10px;
  border: 1px solid var(--lb-line);
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.lb-btn--primary {
  border-color: transparent;
  background: linear-gradient(120deg, #0ea5e9, #38bdf8);
  color: #04121f;
  font-weight: 600;
}
.lb-btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(56, 189, 248, 0.28);
}
.lb-btn--ghost {
  background: var(--lb-panel);
  color: var(--lb-muted);
}
.lb-btn--ghost:hover {
  color: var(--lb-text);
  border-color: var(--lb-line-strong);
}

.lb-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 12px;
}
.lb-seg {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.lb-seg button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 7px 14px;
  border-radius: 999px;
  border: 1px solid var(--lb-line);
  background: transparent;
  color: var(--lb-muted);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.lb-seg button em {
  font-style: normal;
  font-size: 11px;
  padding: 1px 7px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  color: var(--lb-accent);
}
.lb-seg button:hover {
  color: var(--lb-text);
  border-color: var(--lb-line-strong);
}
.lb-seg button.active {
  color: #04121f;
  border-color: transparent;
  background: linear-gradient(120deg, #38bdf8, #34d399);
  font-weight: 600;
}
.theme-light .lb-seg button.active {
  color: #fff;
}
.lb-seg button.active em {
  background: rgba(4, 18, 31, 0.18);
  color: inherit;
}
.lb-count {
  margin: 0;
  font-size: 13px;
  color: var(--lb-muted);
}
.lb-count em {
  font-style: normal;
  color: var(--lb-accent);
  font-weight: 700;
  font-size: 16px;
}

/* 列表 */
.lb-main {
  max-width: 1240px;
  margin: 0 auto;
  padding: 28px clamp(16px, 5vw, 76px) 56px;
}
.lb-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.lb-item {
  border: 1px solid var(--lb-line);
  border-radius: 14px;
  background: var(--lb-panel);
  backdrop-filter: blur(10px);
  overflow: hidden;
  animation: lb-in 0.4s ease both;
  transition: border-color 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease;
}
.lb-item:hover,
.lb-item.is-open {
  border-color: var(--lb-line-strong);
  box-shadow: 0 14px 34px rgba(2, 12, 27, 0.34);
}
.theme-light .lb-item:hover,
.theme-light .lb-item.is-open {
  box-shadow: 0 14px 30px rgba(14, 116, 178, 0.12);
}
@keyframes lb-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.lb-item__head {
  display: grid;
  grid-template-columns: 46px minmax(200px, 1.05fr) minmax(0, 1.6fr) 28px;
  gap: 16px;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
}
.lb-item__idx {
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  color: var(--lb-muted);
  letter-spacing: 1px;
}
.lb-item__title h2 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: var(--lb-text);
}
.lb-item__title p {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 6px 0 0;
  font-size: 12px;
}
.lb-item__school {
  padding: 1px 9px;
  border-radius: 6px;
  border: 1px solid var(--lb-line);
  color: var(--lb-accent);
}
.lb-item__spec {
  color: var(--lb-muted);
}
.lb-item__preview {
  margin: 0;
  font-size: 13px;
  color: var(--lb-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.lb-item__arrow {
  color: var(--lb-muted);
  transition: transform 0.25s ease, color 0.25s ease;
}
.lb-item__arrow svg {
  width: 18px;
  height: 18px;
}
.lb-item.is-open .lb-item__arrow {
  transform: rotate(180deg);
  color: var(--lb-accent);
}

.lb-item__body {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 18px;
  padding: 4px 20px 20px 66px;
  border-top: 1px dashed var(--lb-line);
}
.lb-detail h3 {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 14px 0 6px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--lb-accent);
}
.lb-detail__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--lb-accent);
  box-shadow: 0 0 8px var(--lb-accent);
}
.lb-detail p {
  margin: 0;
  font-size: 13px;
  line-height: 1.85;
  color: var(--lb-muted);
  white-space: pre-wrap;
}

.lb-empty {
  padding: 60px 0;
  text-align: center;
  color: var(--lb-muted);
}

/* 骨架 */
.lb-skeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.lb-skeleton__row {
  height: 78px;
  border-radius: 14px;
  border: 1px solid var(--lb-line);
  background: linear-gradient(90deg, var(--lb-panel) 25%, rgba(56, 189, 248, 0.08) 50%, var(--lb-panel) 75%);
  background-size: 220% 100%;
  animation: lb-shimmer 1.4s infinite linear;
}
@keyframes lb-shimmer {
  from { background-position: 140% 0; }
  to { background-position: -40% 0; }
}

/* 分页 */
.lb-pager {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  margin-top: 30px;
}
.lb-pager__nav,
.lb-pager__num {
  min-width: 38px;
  height: 36px;
  padding: 0 14px;
  border-radius: 9px;
  border: 1px solid var(--lb-line);
  background: var(--lb-panel);
  color: var(--lb-muted);
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.lb-pager__nav:hover:not(:disabled),
.lb-pager__num:hover {
  color: var(--lb-text);
  border-color: var(--lb-line-strong);
}
.lb-pager__nav:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.lb-pager__num.active {
  color: #04121f;
  font-weight: 700;
  border-color: transparent;
  background: linear-gradient(120deg, #0ea5e9, #38bdf8);
}
.theme-light .lb-pager__num.active {
  color: #fff;
}

.lb-source {
  margin: 22px 0 0;
  text-align: center;
  font-size: 12px;
  letter-spacing: 1px;
  color: var(--lb-muted);
}

.lb-footer {
  padding: 34px 20px 44px;
  text-align: center;
  border-top: 1px solid var(--lb-line);
  color: var(--lb-muted);
  font-size: 13px;
}
.lb-footer p {
  margin: 4px 0;
}

@media (max-width: 900px) {
  .lb-item__head {
    grid-template-columns: 34px 1fr 24px;
    gap: 12px;
  }
  .lb-item__preview {
    display: none;
  }
  .lb-item__body {
    padding-left: 20px;
  }
}
</style>
