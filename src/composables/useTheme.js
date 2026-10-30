import { ref } from 'vue'

const THEME_KEY = 'sckcy-theme'
const isDark = ref(false)

let initialized = false

/**
 * 全站主题（浅色 / 深色）：导航上的切换按钮与首页页面类共用同一状态。
 * 首选项写入 localStorage，切换时同步到 <html class="theme-dark">。
 */
export function useTheme () {
  function applyTheme (dark) {
    isDark.value = dark
    document.documentElement.classList.toggle('theme-dark', dark)
    try {
      localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light')
    } catch (e) {
      /* 隐私模式下忽略存储失败 */
    }
  }

  function toggleTheme () {
    applyTheme(!isDark.value)
  }

  if (!initialized) {
    initialized = true
    try {
      if (localStorage.getItem(THEME_KEY) === 'dark') applyTheme(true)
    } catch (e) {
      /* 隐私模式下忽略读取失败 */
    }
  }

  return { isDark, toggleTheme }
}
