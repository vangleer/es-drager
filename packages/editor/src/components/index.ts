import { App } from 'vue'
import Rect from './basic/Rect.vue'
import Group from './editor/Group.vue'
import ElIconWrapper from './icon/icon.vue'

export default {
  install: (app: App) => {
    app.component('v-rect', Rect)
    app.component('es-icon', ElIconWrapper)
    app.component('es-group', Group)
  }
}
