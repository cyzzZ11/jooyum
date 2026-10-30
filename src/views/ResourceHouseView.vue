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

      <template v-if="house">
        <div class="rd-hero">
          <div class="rd-title">
            <span class="rd-title__eyebrow">HOUSE · 房源详情</span>
            <h1>{{ house.name }}</h1>
            <p class="rd-title__meta">
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6" />
                </svg>
                <RouterLink v-if="park" :to="`/resource/park/${park.id}`" style="color: inherit">{{ house.parkName }}</RouterLink>
                <template v-else>{{ house.parkName }}</template>
              </span>
              <span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                  <path d="M12 21s-6.5-5.6-6.5-10.2A6.5 6.5 0 0 1 18.5 10.8C18.5 15.4 12 21 12 21Z" />
                  <circle cx="12" cy="10.5" r="2.2" />
                </svg>
                {{ house.address || (park && park.address) || '松江区' }}
              </span>
            </p>
            <div class="rd-tags">
              <span v-if="house.propertyType">{{ house.propertyType }}</span>
              <span v-if="house.zxcd">{{ house.zxcd }}</span>
              <span v-for="tag in house.industry" :key="tag">{{ tag }}</span>
            </div>

            <div class="rd-stats">
              <div><b>{{ house.rent || '—' }}</b><i>租金（元/㎡/天）</i></div>
              <div><b>{{ house.area || '—' }}</b><i>面积（㎡）</i></div>
              <div><b>{{ house.inFloor || house.floor || '—' }}</b><i>所在楼层</i></div>
              <div><b>{{ house.floorHight || '—' }}</b><i>层高（m）</i></div>
            </div>

            <p v-if="house.yhzc" class="rd-policy"><b>科创源租赁优惠政策</b><span>{{ house.yhzc }}</span></p>
          </div>

          <div class="rd-gallery">
            <div class="rd-gallery__main">
              <img v-if="activeImage" :src="imgUrl(activeImage)" :alt="house.name" @error="onImgError" />
              <span v-else class="rd-gallery__empty">暂无房源实景图片</span>
            </div>
            <div class="rd-gallery__thumbs">
              <button
                v-for="(image, index) in house.images.slice(0, 8)"
                :key="image + index"
                type="button"
                :class="{ active: image === activeImage }"
                @click="activeImage = image"
              >
                <img :src="imgUrl(image)" :alt="`${house.name} 实景 ${index + 1}`" loading="lazy" @error="onImgError" />
              </button>
            </div>
          </div>
        </div>

        <!-- 房源参数 -->
        <section class="rd-section">
          <header class="rd-section__head">
            <h2>房源参数</h2>
            <span>PROPERTY PARAMS</span>
          </header>
          <div class="rd-params">
            <div v-for="item in params" :key="item.label">
              <span>{{ item.label }}</span>
              <b>{{ item.value }}<em v-if="item.unit">{{ item.unit }}</em></b>
            </div>
          </div>
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

        <!-- 所属园区 -->
        <section v-if="park" class="rd-section">
          <header class="rd-section__head">
            <h2>所属园区介绍</h2>
            <span>PARK INTRO</span>
            <em>
              <RouterLink :to="`/resource/park/${park.id}`" style="color: inherit">查看园区详情</RouterLink>
            </em>
          </header>
          <div class="rd-panel">
            <p v-if="park.remark" class="rd-prose">{{ park.remark }}</p>
            <p v-else class="rd-prose rd-prose--muted">暂无园区简介</p>
          </div>
        </section>

        <section v-if="park && park.honor.length" class="rd-section">
          <header class="rd-section__head">
            <h2>园区荣誉</h2>
            <span>HONORS</span>
            <em>{{ park.honor.length }} 项</em>
          </header>
          <ul class="rd-honor">
            <li v-for="item in park.honor" :key="item">{{ item }}</li>
          </ul>
        </section>

        <!-- 联系与交通 -->
        <section class="rd-section">
          <header class="rd-section__head">
            <h2>联络方式</h2>
            <span>CONTACT</span>
          </header>

          <div v-if="park" class="rd-mapbox">
            <ResourceMap :points="mapPoints" :active-id="`park-${park.id}`" compact :compact-label="park.parkName" />
          </div>

          <div class="rd-contact">
            <div class="rd-contact__card">
              <h3>如需了解更多请联系</h3>
              <div class="rd-contact__row"><span>地址</span><b>{{ house.address || (park && park.address) || '—' }}</b></div>
              <div class="rd-contact__row"><span>联系人</span><b>{{ house.contact || (park && park.contact) || '—' }}</b></div>
              <div class="rd-contact__row">
                <span>联系方式</span>
                <b>
                  <a v-if="house.contactInfo || (park && park.contactInfo)" :href="`tel:${house.contactInfo || park.contactInfo}`">
                    {{ house.contactInfo || park.contactInfo }}
                  </a>
                  <template v-else>—</template>
                </b>
              </div>
            </div>

            <div class="rd-contact__card">
              <h3>周边交通</h3>
              <p v-if="park && park.zbpt" class="rd-prose rd-prose--muted">{{ park.zbpt }}</p>
              <div class="rd-traffic" style="margin-top: 12px">
                <div class="rd-traffic__item">
                  <h4>高速口</h4>
                  <p>距离 {{ house.gsk || '—' }} km</p>
                  <small>上海市</small>
                </div>
                <div class="rd-traffic__item">
                  <h4>公交站</h4>
                  <p>距离 {{ house.zbgjz || '—' }} km</p>
                  <small>上海市</small>
                </div>
              </div>
            </div>
          </div>
        </section>
      </template>

      <div v-else class="rd-panel" style="margin-top: 40px">
        <p class="rd-empty">未找到该房源，<RouterLink to="/resource">返回载体资源</RouterLink></p>
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

const house = computed(() => houses.find((h) => String(h.id) === String(route.params.id)) || null)
const park = computed(() => (house.value ? parks.find((p) => p.id === house.value.parkId) || null : null))

const activeImage = ref('')
watch(
  () => house.value && house.value.images,
  (images) => {
    activeImage.value = images && images.length ? images[0] : ''
  },
  { immediate: true }
)

const params = computed(() => {
  if (!house.value) return []
  const h = house.value
  return [
    { label: '所在楼层', value: h.inFloor || h.floor || '—', unit: '层' },
    { label: '总楼层数', value: h.floor || '—', unit: '层' },
    { label: '层高', value: h.floorHight || '—', unit: 'm' },
    { label: '荷载', value: h.load || '—', unit: 'kg/㎡' },
    { label: '物业费', value: h.propertyFee || '—', unit: '元/㎡/月' },
    { label: '是否可分割', value: h.isSegment || '—' },
    { label: '消防等级', value: h.firefightingLevel || '—' },
    { label: '电力配置', value: h.electricConfig || '—', unit: 'kW/㎡' },
    { label: '装修程度', value: h.zxcd || '—' },
    { label: '客梯数量', value: h.ktsl || '—', unit: '个' },
    { label: '货梯数量', value: h.htsl || '—', unit: '个' },
    { label: '空调配置', value: h.ktpz || '—' },
    { label: '公司可注册', value: h.gskzc || '—' },
    { label: '用地性质', value: h.ydxz || '—' },
  ]
})

const facilities = computed(() => {
  if (!house.value) return []
  const h = house.value
  const list = []
  if (Number(h.tcw) > 0) list.push(`停车位（${h.tcw} 个）`)
  if (h.st === '有' || h.kfg === '有') list.push('餐饮')
  if (Number(h.gxhys) > 0) list.push(`共享会议室（${h.gxhys} 个）`)
  if (Number(h.zbrcgy) > 0) list.push('人才公寓')
  if (h.bld === '有') list.push('便利店')
  if (h.jsss === '有') list.push('健身设施')
  if (/\d/.test(h.ktsl) || /\d/.test(h.htsl)) list.push('电梯')
  if (h.ktpz === '有') list.push('空调')
  return list
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
