
import { App } from 'vue'
export * from './src/drager'
export * from './src/drager-directive'
import Drager from './src/drager.vue'

export const install = (app: App) => {
  app.component('es-drager', Drager)
}

export default Drager
