import { createApp } from 'vue'
import App from './App.vue'
import 'es-drager/lib/style.css'
import Drager from 'es-drager'

createApp(App).use(Drager).mount('#app')
