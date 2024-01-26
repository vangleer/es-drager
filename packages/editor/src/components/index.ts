import { App } from 'vue'
import Rect from './basic/Rect.vue'
import Group from './editor/Group.vue'
import ElIconWrapper from './icon/icon.vue'
import Area from './editor/Area.vue'
import GridRect from './editor/GridRect.vue'
import MarkLine from './editor/MarkLine.vue'
import TextEditor from './editor/TextEditor.vue'
import Chart from './basic/chart/Chart.vue'
export {
  Group,
  Area,
  GridRect,
  MarkLine,
  TextEditor
}
export default {
  install: (app: App) => {
    app.component('es-chart', Chart)
    app.component('v-rect', Rect)
    app.component('es-icon', ElIconWrapper)
    app.component('es-group', Group)
  }
}
