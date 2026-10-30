import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installLinkInterceptor } from './router/linkInterceptor'
import './assets/styles/global.css'
import './assets/styles/site-nav.css'

installLinkInterceptor(router)

createApp(App).use(router).mount('#app')
