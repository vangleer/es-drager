import { createApp } from 'vue'
import App from './App.vue'
import 'es-drager/dist/style.css'
import { Drager } from 'es-drager'

createApp(App).directive('drager', Drager).mount('#app')
