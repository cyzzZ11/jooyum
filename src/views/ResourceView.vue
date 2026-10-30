<template>
  <div class="page page--resource" :class="{ 'theme-light': !isDark }">
    <div class="rs-bg" aria-hidden="true">
      <div class="rs-bg__grid"></div>
      <div class="rs-bg__blob rs-bg__blob--a"></div>
      <div class="rs-bg__blob rs-bg__blob--b"></div>
    </div>

    <!-- ═══ 头部 ═══ -->
    <header class="rs-hero">
      <div class="rs-hero__watermark" aria-hidden="true">CARRIER</div>
      <div class="rs-hero__inner">
        <span class="rs-hero__eyebrow"><span class="dot"></span>CARRIER RESOURCES · 载体资源</span>
        <h1 class="rs-hero__title">载体资源</h1>
        <p class="rs-hero__desc">
          汇聚松江区产业园区、孵化器与高校载体资源，一图纵览区位分布，一键直达房源详情。
        </p>
        <ul class="rs-hero__stats">
          <li><strong>{{ stats.parks }}</strong><span>园区载体</span></li>
          <li><strong>{{ stats.houses }}</strong><span>在租房源</span></li>
          <li><strong>{{ stats.unis }}</strong><span>高校资源</span></li>
          <li><strong>{{ stats.area }}</strong><span>可租面积（万㎡）</span></li>
        </ul>
      </div>
    </header>

    <!-- ═══ 筛选控制台 ═══ -->
    <section class="rs-console" aria-label="载体资源筛选">
      <div class="rs-console__inner">
        <div class="rs-filters">
          <label class="rs-field">
            <span>选择区域</span>
            <select v-model="draft.town">
              <option value="">全部区域</option>
              <option v-for="t in towns" :key="t" :value="t">{{ t }}</option>
            </select>
          </label>
          <label class="rs-field">
            <span>物业类型</span>
            <select v-model="draft.propertyType">
              <option value="">不限</option>
              <option v-for="t in propertyTypes" :key="t" :value="t">{{ t }}</option>
            </select>
          </label>
          <label class="rs-field">
            <span>产业方向</span>
            <select v-model="draft.industry">
              <option value="">不限</option>
              <option v-for="t in industries" :key="t" :value="t">{{ t }}</option>
            </select>
          </label>
          <label class="rs-field">
            <span>房源面积</span>
            <select v-model="draft.area">
              <option value="">不限</option>
              <option v-for="a in areaRanges" :key="a.name" :value="a.name">{{ a.name }}</option>
            </select>
          </label>
          <label class="rs-search">
            <input v-model.trim="draft.keyword" type="search" placeholder="请输入您想找的园区" @keyup.enter="applyFilters" />
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
              <circle cx="11" cy="11" r="6.4" />
              <path d="m16 16 4.2 4.2" />
            </svg>
          </label>
          <button type="button" class="rs-btn rs-btn--primary" @click="applyFilters">查询</button>
          <button type="button" class="rs-btn rs-btn--ghost" @click="resetFilters">重置</button>
        </div>

        <div class="rs-meta">
          <p class="rs-count">
            共计 <em>{{ filteredParks.length }}</em> 个园区 · <em>{{ filteredHouses.length }}</em> 套房源
          </p>

          <div class="rs-seg" role="group" aria-label="载体类型">
            <button
              v-for="type in typeOptions"
              :key="type"
              type="button"
              :class="{ active: selectedTypes.includes(type) }"
              @click="toggleType(type)"
            >
              {{ type }}
            </button>
          </div>

          <label class="rs-hot">
            <span>热门园区</span>
            <select :value="activeParkId" @change="onHotChange">
              <option value="">全部</option>
              <option v-for="name in hotParks" :key="name" :value="hotParkId(name)">{{ name }}</option>
            </select>
          </label>
        </div>
      </div>
    </section>

    <!-- ═══ 工作台：房源列表 + 地图 ═══ -->
    <section class="rs-work">
      <aside class="rs-list" aria-label="房源列表">
        <header class="rs-list__head">
          <div class="rs-list__title">
            <span class="rs-list__badge">{{ activePark ? 'PARK' : 'ALL' }}</span>
            <h2>{{ activePark ? activePark.parkName : '全部房源' }}</h2>
            <p v-if="activePark">{{ activePark.town }} · {{ activePark.propertyType }}</p>
            <p v-else>点击地图点位可查看对应园区房源</p>
          </div>
          <button v-if="activePark" type="button" class="rs-list__back" @click="clearPark">
            返回全部
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        </header>

        <div class="rs-list__body">
          <article
            v-for="(house, index) in shownHouses"
            :key="house.id"
            class="rs-card"
            :style="{ animationDelay: `${Math.min(index, 12) * 45}ms` }"
            tabindex="0"
            :aria-label="`${house.parkName} ${house.name}`"
            @click="openHouse(house)"
            @keydown.enter.prevent="openHouse(house)"
          >
            <div class="rs-card__cover">
              <img v-if="firstImage(house)" :src="imgUrl(firstImage(house))" :alt="house.name" loading="lazy" @error="onImgError" />
              <span class="rs-card__cover-fallback">{{ house.parkName.slice(0, 4) }}</span>
            </div>
            <div class="rs-card__body">
              <h3>{{ house.parkName }}</h3>
              <p class="rs-card__name">{{ house.name }}</p>
              <div class="rs-card__tags">
                <span v-for="tag in house.industry.slice(0, 3)" :key="tag">{{ tag }}</span>
                <span v-if="!house.industry.length">综合</span>
              </div>
              <div class="rs-card__metrics">
                <span><i>面积</i><b>{{ house.area || '—' }}</b> ㎡</span>
                <span><i>租金</i><b>{{ house.rent || '—' }}</b> 元/㎡/天</span>
              </div>
            </div>
            <span class="rs-card__arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </span>
          </article>

          <p v-if="!filteredHouses.length" class="rs-empty">暂无符合条件的房源，试试调整筛选条件</p>

          <button v-if="shownHouses.length < filteredHouses.length" type="button" class="rs-more" @click="listLimit += 24">
            加载更多房源
          </button>
        </div>
      </aside>

      <div class="rs-map-wrap">
        <ResourceMap
          :points="mapPoints"
          :active-id="activeMapKey"
          @select="onSelectPoint"
        />

        <div v-if="activePark" class="rs-parkcard">
          <div class="rs-parkcard__head">
            <span class="rs-parkcard__type">{{ activePark.type === '2' ? '孵化器' : '载体园区' }}</span>
            <h3>{{ activePark.parkName }}</h3>
            <p>{{ activePark.address }}</p>
          </div>
          <div class="rs-parkcard__tags">
            <span v-for="tag in parkTags(activePark)" :key="tag">{{ tag }}</span>
          </div>
          <div class="rs-parkcard__meta">
            <span>房源 <b>{{ parkHouseCount(activePark.id) }}</b> 套</span>
            <span>类型 <b>{{ activePark.propertyType || '—' }}</b></span>
          </div>
          <div class="rs-parkcard__actions">
            <RouterLink :to="`/resource/park/${activePark.id}`" class="rs-btn rs-btn--primary">园区详情</RouterLink>
            <button type="button" class="rs-btn rs-btn--ghost" @click="clearPark">收起</button>
          </div>
        </div>
      </div>
    </section>

    <footer class="rs-footer">
      <p>载体资源 · 松江大学城科创源</p>
      <p>园区 / 孵化器 / 高校资源一站式检索，数据来源于松江区载体资源平台</p>
    </footer>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ResourceMap from '@/components/ResourceMap.vue'
import { useTheme } from '@/composables/useTheme'
import {
  areaRanges,
  hotParks,
  houses,
  industries,
  parks,
  propertyTypes,
  towns,
  universities,
} from '@/data/resource'

const { isDark } = useTheme()
const router = useRouter()

const IMG_BASE = 'https://www.sjdxckcy.com/dev/'

const typeOptions = ['载体园区', '孵化器', '高校']
const selectedTypes = ref(['载体园区', '孵化器', '高校'])

const draft = reactive({ town: '', propertyType: '', industry: '', area: '', keyword: '' })
const applied = reactive({ town: '', propertyType: '', industry: '', area: '', keyword: '' })

const activeParkId = ref('')
const listLimit = ref(24)

const stats = computed(() => {
  const areaSum = houses.reduce((sum, h) => sum + (Number(h.area) || 0), 0)
  return {
    parks: parks.length,
    houses: houses.length,
    unis: universities.length,
    area: (areaSum / 10000).toFixed(1),
  }
})

const showParks = computed(() => selectedTypes.value.includes('载体园区'))
const showIncubators = computed(() => selectedTypes.value.includes('孵化器'))
const showUnis = computed(() => selectedTypes.value.includes('高校'))

const filteredParks = computed(() =>
  parks.filter((p) => {
    if (p.type === '2' && !showIncubators.value) return false
    if (p.type === '1' && !showParks.value) return false
    if (p.type !== '1' && p.type !== '2') return false
    if (applied.town && p.town !== applied.town) return false
    if (applied.propertyType && p.propertyType !== applied.propertyType) return false
    if (applied.industry && !p.industry.includes(applied.industry)) return false
    if (applied.keyword) {
      const kw = applied.keyword.toLowerCase()
      const haystack = `${p.parkName} ${p.address} ${p.industry}`.toLowerCase()
      if (!haystack.includes(kw)) return false
    }
    return true
  })
)

const filteredParkIds = computed(() => new Set(filteredParks.value.map((p) => p.id)))

const activePark = computed(() => parks.find((p) => String(p.id) === activeParkId.value) || null)

const areaRange = computed(() => areaRanges.find((a) => a.name === applied.area) || null)

const filteredHouses = computed(() =>
  houses.filter((h) => {
    if (!filteredParkIds.value.has(h.parkId)) return false
    if (activeParkId.value && h.parkId !== Number(activeParkId.value)) return false
    if (areaRange.value) {
      const area = Number(h.area) || 0
      if (area < areaRange.value.min || area >= areaRange.value.max) return false
    }
    return true
  })
)

const shownHouses = computed(() => filteredHouses.value.slice(0, listLimit.value))

const mapPoints = computed(() => {
  const list = filteredParks.value.map((p) => ({
    id: p.id,
    kind: p.type === '2' ? 'incubator' : 'park',
    name: p.parkName,
    town: p.town,
    longitude: p.longitude,
    latitude: p.latitude,
    source: p,
  }))
  if (showUnis.value) {
    universities.forEach((u) => {
      list.push({
        id: u.id,
        kind: 'uni',
        name: u.name,
        longitude: u.longitude,
        latitude: u.latitude,
        source: u,
      })
    })
  }
  return list
})

const activeMapKey = computed(() => {
  const park = activePark.value
  if (!park) return ''
  return `${park.type === '2' ? 'incubator' : 'park'}-${park.id}`
})

watch(
  () => [applied.town, applied.propertyType, applied.industry, applied.area, applied.keyword, selectedTypes.value.join()],
  () => {
    listLimit.value = 24
    if (activeParkId.value && !filteredParkIds.value.has(Number(activeParkId.value))) {
      activeParkId.value = ''
    }
  }
)

function applyFilters() {
  Object.assign(applied, draft)
  activeParkId.value = ''
}

function resetFilters() {
  Object.assign(draft, { town: '', propertyType: '', industry: '', area: '', keyword: '' })
  applyFilters()
  selectedTypes.value = [...typeOptions]
}

function toggleType(type) {
  const set = selectedTypes.value
  if (set.includes(type)) {
    if (set.length === 1) return
    selectedTypes.value = set.filter((t) => t !== type)
  } else {
    selectedTypes.value = [...set, type]
  }
}

function hotParkId(name) {
  const park = parks.find((p) => p.parkName.includes(name))
  return park ? String(park.id) : ''
}

function onHotChange(event) {
  activeParkId.value = event.target.value
  listLimit.value = 24
}

function onSelectPoint(point) {
  if (point.kind === 'uni' || (point.homePage && !point.parkName)) {
    if (point.homePage) window.open(point.homePage, '_blank', 'noopener')
    return
  }
  activeParkId.value = String(point.id)
  listLimit.value = 24
}

function clearPark() {
  activeParkId.value = ''
}

function openHouse(house) {
  router.push(`/resource/house/${house.id}`)
}

function firstImage(house) {
  return house.images && house.images.length ? house.images[0] : ''
}

function imgUrl(path) {
  return IMG_BASE + encodeURI(path)
}

function onImgError(event) {
  event.target.style.visibility = 'hidden'
}

function parkTags(park) {
  return park.industry
    .split(/[、,，]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4)
}

function parkHouseCount(parkId) {
  return houses.filter((h) => h.parkId === parkId).length
}
</script>

<style scoped>
.page--resource {
  --rs-bg: #050b16;
  --rs-bg-soft: #081527;
  --rs-panel: rgba(10, 22, 40, 0.78);
  --rs-panel-strong: rgba(8, 18, 34, 0.94);
  --rs-line: rgba(56, 189, 248, 0.16);
  --rs-line-strong: rgba(56, 189, 248, 0.42);
  --rs-text: #e6f3ff;
  --rs-muted: #8ea9c6;
  --rs-accent: #38bdf8;
  --rs-accent-2: #34d399;
  --rs-warn: #fbbf24;
  --rs-radius: 16px;
  --rs-font: "Inter", "PingFang SC", "Microsoft YaHei", "Noto Sans SC", system-ui, -apple-system, sans-serif;
  position: relative;
  isolation: isolate;
  overflow-x: clip;
  background: var(--rs-bg);
  color: var(--rs-text);
  font-family: var(--rs-font);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}

.page--resource.theme-light {
  --rs-bg: #f3f8fd;
  --rs-bg-soft: #ffffff;
  --rs-panel: rgba(255, 255, 255, 0.9);
  --rs-panel-strong: rgba(255, 255, 255, 0.98);
  --rs-line: rgba(14, 116, 178, 0.16);
  --rs-line-strong: rgba(14, 116, 178, 0.36);
  --rs-text: #0f2233;
  --rs-muted: #5a7189;
  --rs-accent: #0ea5e9;
  --rs-accent-2: #059669;
  --rs-warn: #d97706;
}

/* 背景 */
.rs-bg {
  position: absolute;
  inset: 0 0 auto;
  height: 720px;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
}
.rs-bg__grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(56, 189, 248, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(56, 189, 248, 0.06) 1px, transparent 1px);
  background-size: 56px 56px;
  mask-image: linear-gradient(180deg, #000 0%, transparent 92%);
  -webkit-mask-image: linear-gradient(180deg, #000 0%, transparent 92%);
}
.theme-light .rs-bg__grid {
  background-image:
    linear-gradient(rgba(14, 116, 178, 0.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 116, 178, 0.07) 1px, transparent 1px);
}
.rs-bg__blob {
  position: absolute;
  width: 620px;
  height: 620px;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.5;
}
.rs-bg__blob--a {
  top: -240px;
  left: -140px;
  background: radial-gradient(circle, rgba(2, 132, 199, 0.5), transparent 68%);
}
.rs-bg__blob--b {
  top: -300px;
  right: -180px;
  background: radial-gradient(circle, rgba(16, 185, 129, 0.36), transparent 70%);
}
.theme-light .rs-bg__blob {
  opacity: 0.3;
}

/* 头部 */
.rs-hero {
  position: relative;
  padding: 108px clamp(20px, 5vw, 76px) 40px;
  overflow: hidden;
}
.rs-hero__watermark {
  position: absolute;
  right: clamp(10px, 6vw, 70px);
  top: 86px;
  font-size: clamp(46px, 8vw, 120px);
  font-weight: 800;
  letter-spacing: 8px;
  color: rgba(56, 189, 248, 0.07);
  user-select: none;
  pointer-events: none;
}
.theme-light .rs-hero__watermark {
  color: rgba(14, 116, 178, 0.08);
}
.rs-hero__inner {
  max-width: 1240px;
  margin: 0 auto;
}
.rs-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 6px 16px;
  border: 1px solid var(--rs-line);
  border-radius: 999px;
  background: var(--rs-panel);
  font-size: 12px;
  letter-spacing: 2px;
  color: var(--rs-muted);
}
.rs-hero__eyebrow .dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--rs-accent);
  box-shadow: 0 0 10px var(--rs-accent);
}
.rs-hero__title {
  margin: 18px 0 10px;
  font-size: clamp(36px, 5vw, 62px);
  font-weight: 800;
  letter-spacing: 3px;
  line-height: 1.1;
  background: linear-gradient(120deg, var(--rs-text) 10%, var(--rs-accent) 90%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.rs-hero__desc {
  max-width: 640px;
  margin: 0;
  color: var(--rs-muted);
  font-size: 15px;
}
.rs-hero__stats {
  display: flex;
  flex-wrap: wrap;
  gap: 38px;
  margin: 34px 0 0;
  padding: 0;
  list-style: none;
}
.rs-hero__stats li {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.rs-hero__stats strong {
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: 1px;
  color: var(--rs-accent);
  text-shadow: 0 0 22px rgba(56, 189, 248, 0.35);
}
.theme-light .rs-hero__stats strong {
  text-shadow: none;
}
.rs-hero__stats span {
  font-size: 12px;
  letter-spacing: 1.5px;
  color: var(--rs-muted);
}

/* 筛选控制台 */
.rs-console {
  position: sticky;
  top: var(--site-nav-h, 72px);
  z-index: 250;
  padding: 14px clamp(16px, 5vw, 76px);
  background: color-mix(in srgb, var(--rs-bg) 82%, transparent);
  backdrop-filter: blur(14px);
  border-top: 1px solid var(--rs-line);
  border-bottom: 1px solid var(--rs-line);
}
.rs-console__inner {
  max-width: 1240px;
  margin: 0 auto;
}
.rs-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: stretch;
}
.rs-field {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 1 140px;
  min-width: 132px;
  padding: 0 12px;
  border: 1px solid var(--rs-line);
  border-radius: 10px;
  background: var(--rs-panel);
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.rs-field:focus-within {
  border-color: var(--rs-line-strong);
  box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.1);
}
.rs-field span {
  flex: none;
  font-size: 12px;
  color: var(--rs-muted);
  letter-spacing: 1px;
}
.rs-field select {
  flex: 1;
  min-width: 0;
  height: 40px;
  border: none;
  outline: none;
  background: transparent;
  color: var(--rs-text);
  font-family: inherit;
  font-size: 13px;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--rs-muted) 50%),
    linear-gradient(135deg, var(--rs-muted) 50%, transparent 50%);
  background-position: calc(100% - 12px) 18px, calc(100% - 7px) 18px;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
  padding-right: 16px;
}
.rs-field select option {
  background: var(--rs-bg-soft);
  color: var(--rs-text);
}
.rs-search {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1.6 1 220px;
  padding: 0 12px;
  border: 1px solid var(--rs-line);
  border-radius: 10px;
  background: var(--rs-panel);
}
.rs-search:focus-within {
  border-color: var(--rs-line-strong);
}
.rs-search input {
  flex: 1;
  min-width: 0;
  height: 40px;
  border: none;
  outline: none;
  background: transparent;
  color: var(--rs-text);
  font-family: inherit;
  font-size: 13px;
}
.rs-search input::placeholder {
  color: var(--rs-muted);
}
.rs-search svg {
  width: 17px;
  height: 17px;
  color: var(--rs-muted);
  flex: none;
}
.rs-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  height: 42px;
  padding: 0 22px;
  border-radius: 10px;
  border: 1px solid transparent;
  font-family: inherit;
  font-size: 13px;
  letter-spacing: 1px;
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}
.rs-btn--primary {
  background: linear-gradient(120deg, #0ea5e9, #06b6d4);
  color: #02131f;
  font-weight: 700;
  box-shadow: 0 10px 28px -14px rgba(14, 165, 233, 0.9);
}
.rs-btn--primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 14px 32px -12px rgba(14, 165, 233, 0.95);
}
.rs-btn--ghost {
  border-color: var(--rs-line);
  background: transparent;
  color: var(--rs-muted);
}
.rs-btn--ghost:hover {
  color: var(--rs-text);
  border-color: var(--rs-line-strong);
  background: rgba(56, 189, 248, 0.08);
}

.rs-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 14px 22px;
  margin-top: 12px;
}
.rs-count {
  margin: 0;
  font-size: 13px;
  color: var(--rs-muted);
  letter-spacing: 0.5px;
}
.rs-count em {
  font-style: normal;
  color: var(--rs-accent);
  font-weight: 700;
  font-size: 16px;
  font-variant-numeric: tabular-nums;
}
.rs-seg {
  display: inline-flex;
  padding: 3px;
  border: 1px solid var(--rs-line);
  border-radius: 999px;
  background: var(--rs-panel);
}
.rs-seg button {
  padding: 5px 15px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--rs-muted);
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.rs-seg button.active {
  background: rgba(56, 189, 248, 0.16);
  color: var(--rs-accent);
  box-shadow: inset 0 0 0 1px var(--rs-line-strong);
}
.theme-light .rs-seg button.active {
  background: rgba(14, 165, 233, 0.12);
}
.rs-hot {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  font-size: 12px;
  color: var(--rs-muted);
}
.rs-hot select {
  height: 32px;
  padding: 0 26px 0 10px;
  border: 1px solid var(--rs-line);
  border-radius: 8px;
  background: var(--rs-panel);
  color: var(--rs-text);
  font-family: inherit;
  font-size: 12px;
  appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, var(--rs-muted) 50%),
    linear-gradient(135deg, var(--rs-muted) 50%, transparent 50%);
  background-position: calc(100% - 12px) 13px, calc(100% - 7px) 13px;
  background-size: 5px 5px, 5px 5px;
  background-repeat: no-repeat;
}
.rs-hot option {
  background: var(--rs-bg-soft);
}

/* 工作台 */
.rs-work {
  display: grid;
  grid-template-columns: minmax(340px, 420px) 1fr;
  gap: 18px;
  max-width: 1240px;
  margin: 26px auto 0;
  padding: 0 clamp(16px, 5vw, 76px);
  height: clamp(560px, 72vh, 820px);
}
.rs-list {
  display: flex;
  flex-direction: column;
  min-height: 0;
  border: 1px solid var(--rs-line);
  border-radius: var(--rs-radius);
  background: var(--rs-panel);
  backdrop-filter: blur(10px);
  overflow: hidden;
}
.rs-list__head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
  padding: 16px 18px;
  border-bottom: 1px solid var(--rs-line);
  background: linear-gradient(180deg, rgba(56, 189, 248, 0.06), transparent);
}
.rs-list__badge {
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--rs-accent);
}
.rs-list__title h2 {
  margin: 4px 0 2px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.rs-list__title p {
  margin: 0;
  font-size: 12px;
  color: var(--rs-muted);
}
.rs-list__back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 10px;
  border: 1px solid var(--rs-line);
  border-radius: 8px;
  background: transparent;
  color: var(--rs-muted);
  font-family: inherit;
  font-size: 12px;
  cursor: pointer;
}
.rs-list__back:hover {
  color: var(--rs-accent);
  border-color: var(--rs-line-strong);
}
.rs-list__back svg {
  width: 14px;
  height: 14px;
}
.rs-list__body {
  flex: 1;
  min-height: 0;
  padding: 12px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--rs-line-strong) transparent;
}
.rs-list__body::-webkit-scrollbar {
  width: 6px;
}
.rs-list__body::-webkit-scrollbar-thumb {
  background: var(--rs-line-strong);
  border-radius: 99px;
}

.rs-card {
  position: relative;
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 12px;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid var(--rs-line);
  border-radius: 12px;
  background: var(--rs-panel-strong);
  cursor: pointer;
  opacity: 0;
  animation: rs-card-in 0.5s ease forwards;
  transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}
.rs-card:hover,
.rs-card:focus-visible {
  border-color: var(--rs-line-strong);
  transform: translateY(-2px);
  box-shadow: 0 16px 36px -26px rgba(2, 132, 199, 0.8);
  outline: none;
}
.rs-card__cover {
  position: relative;
  height: 78px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(135deg, rgba(14, 165, 233, 0.28), rgba(6, 182, 212, 0.12));
}
.rs-card__cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.rs-card__cover-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 11px;
  letter-spacing: 1px;
  color: var(--rs-text);
  opacity: 0.7;
}
.rs-card__body {
  min-width: 0;
}
.rs-card__body h3 {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: var(--rs-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 20px;
}
.rs-card__name {
  margin: 2px 0 6px;
  font-size: 12px;
  color: var(--rs-muted);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rs-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  margin-bottom: 6px;
}
.rs-card__tags span {
  padding: 1px 7px;
  border-radius: 4px;
  background: rgba(56, 189, 248, 0.12);
  color: var(--rs-accent);
  font-size: 10px;
  letter-spacing: 0.3px;
}
.rs-card__metrics {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 14px;
  font-size: 11px;
  color: var(--rs-muted);
}
.rs-card__metrics i {
  font-style: normal;
  margin-right: 4px;
  opacity: 0.75;
}
.rs-card__metrics b {
  color: var(--rs-accent);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}
.rs-card__arrow {
  position: absolute;
  right: 10px;
  top: 10px;
  color: var(--rs-muted);
  opacity: 0;
  transition: opacity 0.2s ease;
}
.rs-card__arrow svg {
  width: 15px;
  height: 15px;
}
.rs-card:hover .rs-card__arrow {
  opacity: 1;
}

.rs-empty {
  margin: 40px 0;
  text-align: center;
  font-size: 13px;
  color: var(--rs-muted);
}
.rs-more {
  display: block;
  width: 100%;
  padding: 10px;
  border: 1px dashed var(--rs-line-strong);
  border-radius: 10px;
  background: transparent;
  color: var(--rs-accent);
  font-family: inherit;
  font-size: 12px;
  letter-spacing: 1px;
  cursor: pointer;
}
.rs-more:hover {
  background: rgba(56, 189, 248, 0.08);
}

.rs-map-wrap {
  position: relative;
  min-width: 0;
  border: 1px solid var(--rs-line);
  border-radius: var(--rs-radius);
  overflow: hidden;
}

.rs-parkcard {
  position: absolute;
  right: 18px;
  bottom: 18px;
  width: min(320px, calc(100% - 36px));
  padding: 16px;
  border: 1px solid var(--rs-line-strong);
  border-radius: 14px;
  background: var(--rs-panel-strong);
  backdrop-filter: blur(14px);
  box-shadow: 0 24px 60px -30px rgba(2, 20, 40, 0.9);
  animation: rs-card-in 0.35s ease;
}
.rs-parkcard__type {
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--rs-accent-2);
}
.rs-parkcard__head h3 {
  margin: 4px 0 4px;
  font-size: 17px;
  line-height: 1.3;
}
.rs-parkcard__head p {
  margin: 0;
  font-size: 12px;
  color: var(--rs-muted);
}
.rs-parkcard__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin: 10px 0;
}
.rs-parkcard__tags span {
  padding: 2px 8px;
  border-radius: 4px;
  background: rgba(52, 211, 153, 0.12);
  color: var(--rs-accent-2);
  font-size: 10px;
}
.rs-parkcard__meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: var(--rs-muted);
}
.rs-parkcard__meta b {
  color: var(--rs-text);
}
.rs-parkcard__actions {
  display: flex;
  gap: 8px;
  margin-top: 14px;
}
.rs-parkcard__actions .rs-btn {
  height: 34px;
  padding: 0 14px;
  font-size: 12px;
  flex: 1;
}

.rs-footer {
  max-width: 1240px;
  margin: 44px auto 0;
  padding: 26px clamp(16px, 5vw, 76px) 44px;
  border-top: 1px solid var(--rs-line);
  text-align: center;
  color: var(--rs-muted);
  font-size: 12px;
  letter-spacing: 1px;
}
.rs-footer p:first-child {
  margin: 0 0 6px;
  color: var(--rs-text);
  font-size: 14px;
  letter-spacing: 2px;
}
.rs-footer p:last-child {
  margin: 0;
}

@keyframes rs-card-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 900px) {
  .rs-work {
    grid-template-columns: 1fr;
    height: auto;
  }
  .rs-list {
    max-height: 560px;
  }
  .rs-map-wrap {
    height: 480px;
  }
}

@media (max-width: 720px) {
  .rs-hero {
    padding-top: 92px;
    padding-bottom: 26px;
  }
  .rs-hero__stats {
    gap: 22px 28px;
    margin-top: 24px;
  }
  .rs-console {
    padding: 12px 16px;
  }
  .rs-field {
    flex: 1 1 calc(50% - 10px);
  }
  .rs-search {
    flex: 1 1 100%;
  }
  .rs-btn {
    flex: 1 1 auto;
  }
  .rs-meta {
    gap: 10px;
  }
  .rs-hot {
    margin-left: 0;
  }
  .rs-map-wrap {
    height: 380px;
  }
  .rs-parkcard {
    right: 12px;
    left: 12px;
    width: auto;
    bottom: 12px;
  }
}
</style>
