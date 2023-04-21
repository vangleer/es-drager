import { createApp } from 'vue'
import App from './App.vue'
import { Drager } from './components/drager'



createApp(App).directive('drager', Drager).mount('#app')
