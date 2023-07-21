import { App } from 'vue'
import { createPinia } from 'pinia'
export * from './app'
export default {
  install: (app: App) => {
    app.use(createPinia())
  }
}
