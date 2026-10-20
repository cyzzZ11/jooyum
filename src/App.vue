<template>
  <div class="main-wrapper">
    <!-- ============ 顶部 93px 头部（对齐参考站 .header-panel 尺寸与配色） ============ -->
    <div class="header-panel">
      <div class="header-left">
        <div class="sys-name" id="sys-name">{{ sysHeader }}</div>
        <!--
          模块切换：参考站为 v-if="cardList.length > 1" 才渲染。
          本账号只有 1 个系统（全国旅游大数据平台 / system_id=114），
          因此参考站上**不显示**这个「菜单」按钮 —— 这里同样不渲染。
        -->
        <div v-if="showSystemMenu" class="check-menu-wrapper">
          <el-dropdown trigger="click" @command="changeSystem">
            <div class="menu-btn-wrapper">
              <el-icon style="margin-right: 8px"><Menu /></el-icon>
              菜单
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="m in modules"
                  :key="m.key"
                  :command="m"
                  :style="{ color: activeModule.key === m.key ? '#0091ff' : '#fff' }"
                >
                  {{ m.shortName || m.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>

      <!-- 水平子菜单（参考站 .sys-menu-panel，每项 125px，可左右滚动） -->
      <div v-show="sysMenus.length > 1" class="sys-menu-panel">
        <div
          v-if="showMenuNav"
          class="sys-menu-arrow"
          :class="{ disabled: menuStartIndex <= 0 }"
          @click="scrollMenu(-1)"
        >
          <el-icon><ArrowLeft /></el-icon>
        </div>
        <div class="sys-menu-viewport" :style="{ width: menuViewportWidth + 'px' }">
          <div
            class="sys-menu-track"
            :style="{ transform: `translateX(-${menuStartIndex * menuItemWidth}px)` }"
          >
            <div
              v-for="m in sysMenus"
              :key="m.path"
              class="sys-menu"
              :class="{ 'sys-menu-select': isActiveMenu(m.path) }"
              @click="goPage(m.path)"
            >
              {{ m.name }}
            </div>
          </div>
        </div>
        <div
          v-if="showMenuNav"
          class="sys-menu-arrow"
          :class="{ disabled: menuStartIndex >= maxMenuStart }"
          @click="scrollMenu(1)"
        >
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>

      <!-- 右侧：时间 + 用户（实测参考站 .user-info 103×40 @(1808,10)，无天气） -->
      <div class="user-info">
        <span class="user-info__clock">{{ clock }}</span>
        <el-icon class="user-info__logout"><CircleClose /></el-icon>
      </div>
    </div>

    <!-- ============ 内容区（参考站 #mainContent，height: calc(100% - 70px)） ============ -->
    <div id="mainContent" class="main-content">
      <RouterView v-slot="{ Component }">
        <component :is="Component" :key="route.fullPath" />
      </RouterView>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import modules, { resolveMenu } from '@/config/menu'

/**
 * 应用外壳 1:1 对齐参考站主框架组件（chunk-223c1674）：
 *   .main-wrapper > .header-panel(93px) + #mainContent(height: calc(100% - 70px))
 *   子菜单为 header 内绝对定位的 125px 水平菜单，可左右箭头滚动。
 * 参考站位图背景（main-bj.png / header-top.png）此处用等价 CSS 渐变还原。
 * 画布固定 1920×1080，由 src/utils/screen.js 等比缩放适配窗口。
 */
const route = useRoute()
const router = useRouter()

const menuItemWidth = 125
/* 参考站 menuVisibleCount = 8（.sys-menu-panel 宽 55%，每项 125px） */
const menuVisibleCount = 8

const activeModule = computed(() => resolveMenu(route.path).module)
const sysMenus = computed(() => activeModule.value.children)
const sysHeader = ref('')

/** 模块切换下拉：与参考站一致，仅在存在多个系统时显示（本账号只有 1 个系统） */
const showSystemMenu = computed(
  () => window.appContext?.showSystemMenu === true && modules.length > 1
)

const menuStartIndex = ref(0)
const showMenuNav = computed(() => sysMenus.value.length > menuVisibleCount)
const maxMenuStart = computed(() => Math.max(0, sysMenus.value.length - menuVisibleCount))
const menuViewportWidth = computed(
  () => Math.min(sysMenus.value.length, menuVisibleCount) * menuItemWidth
)

const isActiveMenu = (path) => route.path === path

const goPage = (path) => {
  if (!path) return
  router.push(path)
}

const scrollMenu = (step) => {
  if (!showMenuNav.value) return
  menuStartIndex.value = Math.max(0, Math.min(menuStartIndex.value + step, maxMenuStart.value))
}

/** 切换模块：与参考站 initMenus 一致，进入该模块的第一个子页面 */
const changeSystem = (m) => {
  menuStartIndex.value = 0
  router.push(m.children && m.children.length ? m.children[0].path : m.path)
}

/** 保证当前选中子菜单始终可见（参考站 ensureMenuVisible） */
const ensureMenuVisible = () => {
  if (!showMenuNav.value) {
    menuStartIndex.value = 0
    return
  }
  // 模块路径与首页路径等价，统一用反查表定位当前菜单项
  const current = resolveMenu(route.path).item
  const targetPath = current ? current.path : route.path
  const idx = sysMenus.value.findIndex((m) => m.path === targetPath)
  if (idx < 0) return
  if (idx < menuStartIndex.value) menuStartIndex.value = idx
  else if (idx >= menuStartIndex.value + menuVisibleCount)
    menuStartIndex.value = idx - menuVisibleCount + 1
}

/** 顶部标题：模块全称（参考站 sysHeader = fullName || chineseName） */
const syncHeader = () => {
  sysHeader.value = activeModule.value.fullName || activeModule.value.name
  ensureMenuVisible()
}

/* 时间 */
const clock = ref('')
let timer = null
const pad = (n) => String(n).padStart(2, '0')
const tick = () => {
  const d = new Date()
  const week = (window.appContext?.weekList || ['日', '一', '二', '三', '四', '五', '六'])[d.getDay()]
  clock.value = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} 星期${week} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`
}

const weather = ref({ name: '多云', icon: '⛅️', temp: 18 })

onMounted(() => {
  syncHeader()
  tick()
  timer = setInterval(tick, 1000)
})
onUnmounted(() => clearInterval(timer))
watch(() => route.path, syncHeader)
</script>

<style scoped>
/* ==========================================================================
   尺寸/配色 1:1 取自参考站 chunk-223c1674.css
   main-wrapper : 全屏科技蓝背景（参考站 main-bj.png）
   header-panel : 93px 头部 + 底部青色发光边（参考站 header-top.png）
   sys-menu     : 125×60 菜单项，选中态换底图并加辉光
   ========================================================================== */

.main-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  /* 参考站 .main-wrapper 背景：main-bj.png（1920×1080 深蓝科技底图） */
  background: #02182e url('/img/main-bj.3a8efb62.png') no-repeat;
  background-size: 100% 100%;
}

.main-wrapper .el-input__inner {
  height: 30px !important;
  border: 1px solid #0091ff;
  border-radius: 4px;
}

/* ---------------- 头部 ---------------- */
.header-panel {
  position: relative;
  width: 100%;
  height: 93px;
  display: flex;
  align-items: flex-start;
  z-index: 1000;
  /* 参考站 .header-panel 背景：header-top.png（1920×93 头部横幅） */
  background: url('/img/header-top.1b3f41db.png') no-repeat;
  background-size: 100% 100%;
}

.header-left {
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  z-index: 2;
}

.header-panel .sys-name {
  height: 70px;
  margin: 0 0 0 10px;
  font-size: 38px;
  color: #fff;
  line-height: 70px;
  cursor: default;
  letter-spacing: 2px;
  white-space: nowrap;
  background: linear-gradient(180deg, #fff 35%, #93e1ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.check-menu-wrapper {
  margin-top: 23px;
  margin-left: 20px;
  flex-shrink: 0;
}

.check-menu-wrapper .menu-btn-wrapper {
  display: flex;
  align-items: center;
  padding: 5px 15px;
  font-weight: bolder;
  font-size: 16px;
  color: #fff;
  border: 1px solid #0091ff;
  background: linear-gradient(175deg, rgba(10, 109, 190, 0.3), rgba(17, 197, 245, 0.6));
  border-radius: 4px;
  cursor: pointer;
  white-space: nowrap;
}

/* ---------------- 水平子菜单 ---------------- */
/* 参考站：.sys-menu-panel { position:absolute; height:60px; right:150px; width:55% }，
   右侧与 .user-info(right:10px) / .weather(right:200px) 对齐 */
.sys-menu-panel {
  position: absolute;
  right: 270px;
  top: 0;
  height: 60px;
  width: 52%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
  z-index: 2;
}

.sys-menu-panel .sys-menu-arrow {
  width: 22px;
  height: 36px;
  margin: 0 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #fff;
  font-size: 18px;
  flex-shrink: 0;
  user-select: none;
  border: 1px solid rgba(0, 145, 255, 0.55);
  border-radius: 4px;
  background: rgba(10, 109, 190, 0.45);
  opacity: 0.9;
  transition: all 0.2s ease;
}

.sys-menu-panel .sys-menu-arrow:hover {
  opacity: 1;
  border-color: #0091ff;
  background: rgba(17, 197, 245, 0.45);
  text-shadow: 0 0 6px #1683ff;
}

.sys-menu-panel .sys-menu-arrow.disabled {
  opacity: 0.3;
  cursor: not-allowed;
  pointer-events: none;
}

.sys-menu-panel .sys-menu-viewport {
  height: 100%;
  overflow: hidden;
  flex-shrink: 0;
}

.sys-menu-panel .sys-menu-track {
  height: 100%;
  display: flex;
  transition: transform 0.25s ease;
  will-change: transform;
}

.sys-menu-panel .sys-menu {
  width: 125px;
  flex-shrink: 0;
  height: 100%;
  cursor: pointer;
  font-weight: 500;
  font-size: 20px;
  color: #fff;
  line-height: 60px;
  text-shadow: 0 0 2px rgba(112, 177, 250, 0.45);
  text-align: center;
  font-style: normal;
  opacity: 0.6;
  position: relative;
  /* 参考站：未选中用 menu-select.png 底图 */
  background: url('/img/menu-select.10dbc339.png') no-repeat;
  background-size: 100% 100%;
}

.sys-menu-panel .sys-menu-select,
.sys-menu-panel .sys-menu:hover {
  opacity: 1;
  text-shadow: 0 0 33px #1683ff, 0 0 7px #1683ff, 0 0 2px rgba(112, 177, 250, 0.45);
  /* 参考站：选中/悬停换 menu-bj.png 并加辉光 */
  background: url('/img/menu-bj.5edb0ae4.png') no-repeat;
  background-size: 100% 100%;
}

/* ---------------- 右侧用户区 ---------------- */
/* 实测参考站：.user-info 103×40 @(1808,10)，right:10px; top:10px */
.user-info {
  position: absolute;
  height: 40px;
  right: 10px;
  top: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  color: #fff;
  font-size: 12px;
  white-space: nowrap;
  z-index: 3;
}

.user-info__weather {
  position: absolute;
  right: 118px;
  top: 0;
  height: 40px;
  display: flex;
  align-items: center;
  color: #cfe6ff;
  font-size: 13px;
}

.user-info__weather em {
  font-style: normal;
  color: #ffd200;
  font-weight: 700;
  margin-left: 4px;
}

.user-info__clock {
  color: #cfe6ff;
}

.user-info__logout {
  margin-left: 10px;
  color: #c9d2fa;
  font-size: 16px;
  line-height: 40px;
  cursor: pointer;
}

.user-info__logout:hover {
  font-size: 18px;
  color: #fff;
}

/* ---------------- 内容区 ---------------- */
.main-content {
  position: absolute;
  width: 100%;
  height: calc(100% - 70px);
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: 1;
}
</style>
