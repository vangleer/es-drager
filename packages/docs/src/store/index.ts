import { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export * from './app'
export * from './editor'
export * from './locales'
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default {
  install: (app: App) => {
    app.use(pinia)
  }
}
