import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import '@/utils/echarts';
import 'es-drager/lib/style.css';
import store from './store';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import './assets/css/index.scss';
import 'element-plus/theme-chalk/dark/css-vars.css';
import Rect from './components/basic/Rect.vue';
import Group from './components/editor/Group.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElIconWrapper from '@/components/icon/icon.vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import i18n from './locales';
import { createPinia } from 'pinia';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(store).use(router).use(ElementPlus).use(i18n).mount('#app');

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.component('v-rect', Rect);
app.component('es-icon', ElIconWrapper);
app.component('es-group', Group);
