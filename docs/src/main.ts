import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import LocalComponent from '@/components'
import store from '@/store'
import element from '@/plugins/element'
import i18n from '@/plugins/locales'

import '@/utils/echarts'
import 'es-drager/lib/style.css'
import '@/assets/css/index.scss'

const app = createApp(App)
app
  .use(store)
  .use(router)
  .use(i18n)
  .use(element)
  .use(LocalComponent)
  .mount('#app')
