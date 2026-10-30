<template>
  <header class="site-nav">
    <div class="site-nav__inner">
      <div class="site-nav__brand">
        <a href="/" class="site-nav__logo" aria-label="松江大学城科创源 首页">
          <img :src="`${baseUrl}logo.png`" alt="松江大学城科创源" />
        </a>
      </div>

      <nav class="site-nav__menu" :class="{ 'is-open': menuOpen }" aria-label="全站导航">
        <div
          class="site-nav__item site-nav__item--dropdown"
          :class="{ 'is-open': openDropdown === 'cgzh' }"
        >
          <button
            type="button"
            class="site-nav__link site-nav__dropdown-trigger"
            aria-haspopup="true"
            :aria-expanded="String(openDropdown === 'cgzh')"
            @click="toggleDropdown('cgzh')"
          >
            科技成果转化
            <svg
              class="site-nav__dropdown-caret"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div class="site-nav__dropdown-menu" role="menu">
            <div
              class="site-nav__dropdown-item site-nav__dropdown-item--has-sub"
              role="menuitem"
              aria-haspopup="true"
              :class="{ 'is-open': openSub === 'lbfb' }"
              @click="toggleSub('lbfb')"
            >
              <span>双向发榜</span>
              <svg
                class="arrow"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
              <div class="site-nav__submenu" role="menu">
                <a href="/cgzh-gx/university-tech-demand" class="site-nav__submenu-item" role="menuitem">
                  <span class="dot"></span>
                  <span>高校</span>
                </a>
                <a href="/cgzh-qy/tech-demand-platform" class="site-nav__submenu-item" role="menuitem">
                  <span class="dot"></span>
                  <span>企业</span>
                </a>
              </div>
            </div>
            <a href="/platform-index" class="site-nav__dropdown-item" role="menuitem">
              <span>高能级平台介绍</span>
            </a>
            <a href="/tech-manager-intro" class="site-nav__dropdown-item" role="menuitem">
              <span>技术经理团队</span>
            </a>
            <a href="/#finance-subsidy" class="site-nav__dropdown-item" role="menuitem">
              <span>科创服务中心</span>
            </a>
            <a href="/zlgxc" class="site-nav__dropdown-item" role="menuitem">
              <span>专利共享池</span>
            </a>
          </div>
        </div>

        <div
          class="site-nav__item site-nav__item--dropdown"
          :class="{ 'is-open': openDropdown === 'cxcy' }"
        >
          <button
            type="button"
            class="site-nav__link site-nav__dropdown-trigger"
            aria-haspopup="true"
            :aria-expanded="String(openDropdown === 'cxcy')"
            @click="toggleDropdown('cxcy')"
          >
            创新创业
            <svg
              class="site-nav__dropdown-caret"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div class="site-nav__dropdown-menu" role="menu">
            <a href="/sjqrcfw" class="site-nav__dropdown-item" role="menuitem">
              <span>人才服务</span>
            </a>
            <a href="/songjiang-employment-service" class="site-nav__dropdown-item" role="menuitem">
              <span>就业服务</span>
            </a>
            <a href="/sjkczcjs" class="site-nav__dropdown-item" role="menuitem">
              <span>政策</span>
            </a>
          </div>
        </div>

        <a href="/cxybm" class="site-nav__link" :class="{ 'is-active': activePath === '/cxybm' }">产学研</a>
        <a href="/finance-support" class="site-nav__link" :class="{ 'is-active': activePath === '/finance-support' }">金融服务</a>
        <a href="/resource" class="site-nav__link" :class="{ 'is-active': activePath.startsWith('/resource') }">载体资源</a>
        <a href="https://www.sjdxckcy.com/home/publicService" class="site-nav__link" target="_blank">数字公共服务驿站</a>
        <a href="/company-index" class="site-nav__link" :class="{ 'is-active': activePath === '/company-index' }">企业介绍</a>
      </nav>

      <button
        class="site-nav__theme"
        type="button"
        :aria-label="isDark ? '切换到浅色模式' : '切换到深色模式'"
        :aria-pressed="String(isDark)"
        @click="toggleTheme"
      >
        <svg v-if="isDark" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
          <circle cx="12" cy="12" r="4.2" />
          <path d="M12 2.4v2.2M12 19.4v2.2M2.4 12h2.2M19.4 12h2.2M5.2 5.2l1.6 1.6M17.2 17.2l1.6 1.6M18.8 5.2l-1.6 1.6M6.8 17.2l-1.6 1.6" />
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.4 14.4A8.4 8.4 0 0 1 9.6 3.6a8.4 8.4 0 1 0 10.8 10.8z" />
        </svg>
      </button>

      <button
        class="site-nav__toggle"
        type="button"
        :aria-expanded="String(menuOpen)"
        aria-label="菜单"
        @click="toggleMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme'

const baseUrl = import.meta.env.BASE_URL
const { isDark, toggleTheme } = useTheme()

const route = useRoute()
const activePath = ref(route.path)
const menuOpen = ref(false)
const openDropdown = ref('')
const openSub = ref('')

const isMobile = () => window.matchMedia('(max-width: 768px)').matches

function closeAll () {
  menuOpen.value = false
  openDropdown.value = ''
  openSub.value = ''
}

function toggleMenu () {
  menuOpen.value = !menuOpen.value
  if (!menuOpen.value) {
    openDropdown.value = ''
    openSub.value = ''
  }
}

function toggleDropdown (key) {
  openDropdown.value = openDropdown.value === key ? '' : key
  openSub.value = ''
}

function toggleSub (key) {
  // 桌面端由 hover 展开，点击仅用于移动端手风琴
  if (!isMobile()) return
  openSub.value = openSub.value === key ? '' : key
}

function onClickOutside (event) {
  const el = event.target
  if (!(el instanceof Element) || !el.closest('.site-nav')) {
    openDropdown.value = ''
    openSub.value = ''
  }
}

function onKeydown (event) {
  if (event.key === 'Escape') {
    openDropdown.value = ''
    openSub.value = ''
  }
}

watch(
  () => route.path,
  (path) => {
    activePath.value = path
    closeAll()
  }
)

onMounted(() => {
  document.addEventListener('click', onClickOutside)
  document.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
  document.removeEventListener('keydown', onKeydown)
})
</script>
