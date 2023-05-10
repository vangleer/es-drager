
import { App, Plugin } from 'vue'
export * from './src/drager'
export * from './src/drager-directive'
import Drager from './src/drager.vue'

Drager.install = (app: App) => {
  app.component('es-drager', Drager)
}

export default Drager as Plugin & typeof Drager
