import { ComponentType, IconType } from '@/components/types'
function createEditorConfig() {
  const componentList: ComponentType[] = []
  const iconList: IconType[] = []
  const componentMap = {}
  return {
    componentList,
    iconList,
    componentMap,
    registerCommon(component: ComponentType) {
      componentList.push(component)
    },
    registerIcon(icon: IconType) {
      iconList.push(icon)
    }
  }
}

export const registerConfig = createEditorConfig()

registerConfig.registerCommon({
  component: 'span',
  text: '文本'
})
registerConfig.registerCommon({
  component: 'el-button',
  text: '按钮'
})
registerConfig.registerCommon({
  component: 'v-rect',
  text: '按钮'
})

registerConfig.registerIcon({
  component: 'es-icon',
  props: { icon: 'Plus' }
})

registerConfig.registerIcon({
  component: 'es-icon',
  props: { icon: 'Minus' }
})

registerConfig.registerIcon({
  component: 'es-icon',
  props: { icon: 'CirclePlus' }
})

registerConfig.registerIcon({
  component: 'es-icon',
  props: { icon: 'Search' }
})

registerConfig.registerIcon({
  component: 'es-icon',
  props: { icon: 'Female' }
})

registerConfig.registerIcon({
  component: 'es-icon',
  props: { icon: 'Male' }
})

registerConfig.registerIcon({
  component: 'es-icon',
  props: { icon: 'Male' }
})
