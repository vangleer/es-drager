
import { App } from 'vue'
export * from './src/drager'

import Drager from './src/drager.vue'

export const install = (app: App) => {
  app.component('es-drager', Drager)
}

export default Drager
