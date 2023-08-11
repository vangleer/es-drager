import { App } from 'vue'
import { createPinia } from 'pinia'
export * from './app'
export * from './editor'
export default {
  install: (app: App) => {
    app.use(createPinia())
  }
}
