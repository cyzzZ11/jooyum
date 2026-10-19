import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { installLinkInterceptor } from './router/linkInterceptor'
import './assets/styles/global.css'

installLinkInterceptor(router)

createApp(App).use(router).mount('#app')
