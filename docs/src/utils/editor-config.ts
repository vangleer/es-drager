import { ComponentType } from '@/components/types'
function createEditorConfig() {
  const componentList: ComponentType[] = []
  const componentMap = {}
  return {
    componentList,
    componentMap,
    register(component: ComponentType) {
      componentList.push(component)
    }
  }
}

export const registerConfig = createEditorConfig()

registerConfig.register({
  component: 'span',
  text: '文本'
})
registerConfig.register({
  component: 'el-button',
  text: '按钮'
})

registerConfig.register({
  component: 'v-rect',
  text: '按钮'
})
