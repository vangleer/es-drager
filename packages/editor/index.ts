import { App } from 'vue'
import LocalComponent from './src/components'
import ESEditor from './src/components/layout/index.vue'
export * from './src/types'
export * from './src/components'
export * from './src/hooks'
export {
  ESEditor
}
export default {
  install: (app: App) => {
    app.use(LocalComponent)
  }
}
