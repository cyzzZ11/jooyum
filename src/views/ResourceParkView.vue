<template>
  <div class="rd-page page page--resource-detail" :class="{ 'theme-light': !isDark }">
    <div class="rd-bg" aria-hidden="true"></div>

    <div class="rd-shell">
      <RouterLink to="/resource" class="rd-crumb">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
        返回载体资源
      </RouterLink>

      <template v-if="park">
        <div class="rd-hero">
          <div class="rd-title">
            <span class="rd-title__eyebrow">PARK · {{ park.type === '2' ? '孵化器' : '载体园区' }}</span>
            <h1>{{ park.parkName }}</h1>
            <p class="rd-title__meta">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M12 21s-6.5-5.6-6.5-10.2A6.5 6.5 0 0 1 18.5 10.8C18.5 15.4 12 21 12 21Z" />
                  <circle cx="12" cy="10.5" r="2.2" />
                </svg>
                {{ park.town || '松江区' }} · {{ park.address }}
              </span>
              <span v-if="park.propertyType">物业类型：{{ park.propertyType }}</span>
            </p>
            <div class="rd-tags">
              <span v-for="tag in parkTags" :key="tag">{{ tag }}</span>
            </div>

            <div class="rd-stats">
              <div><b>{{ parkHouses.length }}</b><i>在租房源</i></div>
              <div><b>{{ park.propertyType || '—' }}</b><i>物业类型</i></div>
              <div><b>{{ rentText }}</b><i>租金区间（元/㎡/天）</i></div>
              <div><b>{{ parkHouses.length ? facilities.length : 0 }}</b><i>配套设施</i></div>
            </div>
          </div>

          <div class="rd-gallery">
            <div class="rd-gallery__main">
              <img v-if="activeImage" :src="imgUrl(activeImage)" :alt="park.parkName" @error="onImgError" />
              <span v-else class="rd-gallery__empty">暂无实景图片</span>
            </div>
            <div class="rd-gallery__tabs" role="tablist">
              <button
                v-for="cat in galleryCats"
                :key="cat.key"
                type="button"
                :class="{ active: galleryCat === cat.key }"
                @click="galleryCat = cat.key"
              >
                {{ cat.label }}
              </button>
            </div>
            <div class="rd-gallery__thumbs">
              <button
                v-for="(image, index) in galleryImages.slice(0, 8)"
                :key="image + index"
                type="button"
                :class="{ active: image === activeImage }"
                @click="activeImage = image"
              >
                <img :src="imgUrl(image)" :alt="`${park.parkName} 实景 ${index + 1}`" loading="lazy" @error="onImgError" />
              </button>
            </div>
          </div>
        </div>

        <!-- 园区简介 -->
        <section class="rd-section">
          <header class="rd-section__head">
            <h2>园区简介</h2>
            <span>PARK INTRO</span>
          </header>
          <div class="rd-panel">
            <p v-if="park.remark" class="rd-prose">{{ park.remark }}</p>
            <p v-else class="rd-prose rd-prose--muted">暂无园区简介</p>
          </div>
        </section>

        <!-- 园区荣誉 -->
        <section v-if="park.honor.length" class="rd-section">
          <header class="rd-section__head">
            <h2>园区荣誉</h2>
            <span>HONORS</span>
            <em>{{ park.honor.length }} 项</em>
          </header>
          <ul class="rd-honor">
            <li v-for="item in park.honor" :key="item">{{ item }}</li>
          </ul>
        </section>

        <!-- 配套设施 -->
        <section class="rd-section">
          <header class="rd-section__head">
            <h2>配套设施</h2>
            <span>FACILITIES</span>
          </header>
          <div class="rd-facilities">
            <span v-for="item in facilities" :key="item" class="rd-facility">{{ item }}</span>
            <span v-if="!facilities.length" class="rd-empty">暂无配套信息</span>
          </div>
        </section>

        <!-- 园区房源 -->
        <section class="rd-section">
          <header class="rd-section__head">
            <h2>园区房源</h2>
            <span>HOUSES</span>
            <em>合计 {{ parkHouses.length }} 条数据</em>
          </header>
          <div v-if="parkHouses.length" class="rd-houses">
            <RouterLink
              v-for="house in parkHouses"
              :key="house.id"
              :to="`/resource/house/${house.id}`"
              class="rd-house"
            >
              <div class="rd-house__cover">
                <img v-if="house.images.length" :src="imgUrl(house.images[0])" :alt="house.name" loading="lazy" @error="onImgError" />
              </div>
              <div>
                <h3>{{ house.name }}</h3>
                <p>{{ house.town || park.town }} · {{ house.propertyType || '—' }}</p>
                <div class="rd-house__metrics">
                  <span>面积 <b>{{ house.area || '—' }}</b> ㎡</span>
                  <span>租金 <b>{{ house.rent || '—' }}</b> 元/㎡/天</span>
                </div>
              </div>
            </RouterLink>
          </div>
          <p v-else class="rd-empty">暂无在租房源</p>
        </section>

        <!-- 联络方式 -->
        <section class="rd-section">
          <header class="rd-section__head">
            <h2>联络方式</h2>
            <span>CONTACT</span>
          </header>

          <div class="rd-mapbox">
            <ResourceMap :points="mapPoints" :active-id="`park-${park.id}`" compact :compact-label="park.parkName" />
          </div>

          <div class="rd-contact">
            <div class="rd-contact__card">
              <h3>园区联系方式</h3>
              <div class="rd-contact__row"><span>园区联系人</span><b>{{ park.contact || '—' }}</b></div>
              <div class="rd-contact__row">
                <span>园区联系电话</span>
                <b><a v-if="park.contactInfo" :href="`tel:${park.contactInfo}`">{{ park.contactInfo }}</a><template v-else>—</template></b>
              </div>
              <div class="rd-contact__row"><span>详细地址</span><b>{{ park.address || '—' }}</b></div>
            </div>

            <div class="rd-contact__card">
              <h3>周边交通</h3>
              <p v-if="park.zbpt" class="rd-prose rd-prose--muted">{{ park.zbpt }}</p>
              <div class="rd-traffic" style="margin-top: 12px">
                <div class="rd-traffic__item">
                  <h4>高速口</h4>
                  <p>距离 {{ firstHouse.gsk || '—' }} km</p>
                  <small>上海市</small>
                </div>
                <div class="rd-traffic__item">
                  <h4>公交站</h4>
                  <p>距离 {{ firstHouse.zbgjz || '—' }} km</p>
                  <small>上海市</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>

      <div v-else class="rd-panel" style="margin-top: 40px">
        <p class="rd-empty">未找到该园区，<RouterLink to="/resource">返回载体资源</RouterLink></p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import ResourceMap from '@/components/ResourceMap.vue'
import '@/assets/styles/resource-detail.css'
import { useTheme } from '@/composables/useTheme'
import { houses, parks } from '@/data/resource'

const { isDark } = useTheme()
const route = useRoute()

const IMG_BASE = 'https://www.sjdxckcy.com/dev/'

const park = computed(() => parks.find((p) => String(p.id) === String(route.params.id)) || null)
const parkHouses = computed(() => (park.value ? houses.filter((h) => h.parkId === park.value.id) : []))
const firstHouse = computed(() => parkHouses.value[0] || {})

const parkTags = computed(() => {
  if (!park.value) return []
  return park.value.industry
    .split(/[、,，]/)
    .map((s) => s.trim())
    .filter(Boolean)
})

const rentText = computed(() => {
  const values = parkHouses.value
    .map((h) => String(h.rent || '').match(/[\d.]+/g))
    .filter(Boolean)
    .flat()
    .map(Number)
    .filter((n) => Number.isFinite(n))
  if (!values.length) return '—'
  return `${Math.min(...values)} - ${Math.max(...values)}`
})

const galleryCats = [
  { key: 'all', label: '全部' },
  { key: 'facade', label: '外立面' },
  { key: 'inner', label: '内景' },
  { key: 'door', label: '大门' },
  { key: 'outdoor', label: '外景' },
]

const galleryCat = ref('all')
const activeImage = ref('')

const galleryImages = computed(() => {
  if (!park.value) return []
  const { images } = park.value
  const all = [...images.facade, ...images.inner, ...images.door, ...images.outdoor, ...images.other]
  const deduped = [...new Set(all)]
  if (galleryCat.value === 'all') return deduped
  return [...new Set(images[galleryCat.value] || [])]
})

watch(
  galleryImages,
  (list) => {
    activeImage.value = list.length ? list[0] : ''
  },
  { immediate: true }
)

const facilities = computed(() => {
  const list = parkHouses.value
  const result = []
  const maxNum = (key) => Math.max(0, ...list.map((h) => Number(h[key]) || 0))
  const parking = maxNum('tcw')
  if (parking > 0) result.push(`停车位（${parking} 个）`)
  if (list.some((h) => h.st === '有' || h.kfg === '有')) result.push('餐饮')
  const meeting = maxNum('gxhys')
  if (meeting > 0) result.push(`共享会议室（${meeting} 个）`)
  if (list.some((h) => Number(h.zbrcgy) > 0)) result.push('人才公寓')
  if (list.some((h) => h.bld === '有')) result.push('便利店')
  if (list.some((h) => h.jsss === '有')) result.push('健身设施')
  if (list.some((h) => /\d/.test(h.ktsl) || /\d/.test(h.htsl))) result.push('电梯')
  if (list.some((h) => h.ktpz === '有')) result.push('空调')
  return result
})

const mapPoints = computed(() => {
  if (!park.value) return []
  return [
    {
      id: park.value.id,
      kind: 'park',
      name: park.value.parkName,
      longitude: park.value.longitude,
      latitude: park.value.latitude,
      source: park.value,
    },
  ]
})

function imgUrl(path) {
  return IMG_BASE + encodeURI(path)
}

function onImgError(event) {
  event.target.style.visibility = 'hidden'
}
</script>
