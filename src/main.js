import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/global.css'

import App from '@/App.vue'
import router from '@/router'
import { initScreenAdapter } from '@/utils/screen'

const app = createApp(App)

// 图标全局注册（菜单、卡片标题等均按名称取用）
Object.entries(ElementPlusIconsVue).forEach(([key, component]) => {
  app.component(key, component)
})

app.use(ElementPlus, { locale: zhCn, size: 'default' })
app.use(router)
app.mount('#app')

// 固定 1920×1080 画布，按窗口等比缩放（与参考站 Main.resize 一致）
initScreenAdapter()
