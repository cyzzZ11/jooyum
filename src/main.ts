import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles/index.scss'
import './styles/cards.scss'
import './utils/mapRegister'

createApp(App).use(createPinia()).mount('#app')
