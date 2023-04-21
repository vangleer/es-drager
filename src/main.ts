import { createApp } from 'vue'
import App from './App.vue'
import 'es-drager/dist/style.css'
import Drager from './drager'

createApp(App).component('es-drager', Drager).mount('#app')
