import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/utils/echarts'
import 'es-drager/lib/style.css'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './assets/css/index.scss'
import 'element-plus/theme-chalk/dark/css-vars.css'
import Rect from './components/basic/Rect.vue'

const app = createApp(App)
app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .mount('#app')

app.component('v-rect', Rect)
