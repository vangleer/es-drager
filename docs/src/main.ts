import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/utils/echarts'
import 'es-drager/lib/style.css'
// import Drager from 'es-drager'

createApp(App).use(router).mount('#app')
