import { App } from 'vue'
import Rect from '@/components/basic/Rect.vue'
import Group from '@/components/editor/Group.vue'
import ElIconWrapper from '@/components/icon/icon.vue'

export default {
  install: (app: App) => {
    app.component('v-rect', Rect)
    app.component('es-icon', ElIconWrapper)
    app.component('es-group', Group)
  }
}
