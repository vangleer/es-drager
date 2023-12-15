import { App, Plugin } from 'vue'
export type { DragData, MarklineData } from './src/drager'
export { DragerProps } from './src/drager'
import Drager from './src/drager.vue'

export const install = (app: App) => {
  app.component('es-drager', Drager)
}

Drager.install = install

export { Drager as ESDrager }
export default Drager as Plugin & typeof Drager
