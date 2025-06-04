import { ComponentType, IconType } from '../types'

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
    },
  }
}

export const registerConfig = createEditorConfig()

export const sourceComponentList = [
  {
    component: 'span',
    text: '文本',
    style: {
      fontSize: 18,
      color: '#333'
    }
  },
  {
    component: 'el-button',
    text: '按钮'
  },
  {
    component: 'div',
    text: '矩形',
    style: { border: '1px solid var(--el-text-color-primary)' }
  },
  {
    component: 'div',
    text: '圆形',
    width: 100,
    height: 100,
    style: {
      border: '1px solid var(--el-text-color-primary)',
      borderRadius: '50%'
    }
  },
  {
    component: 'es-svg',
    text: '三角形',
    width: 100,
    height: 100,
    props: { type: 'triangle' }
  },
  {
    component: 'es-svg',
    text: '五角形',
    width: 100,
    height: 100,
    props: { type: 'star' }
  },

  {
    component: 'es-chart',
    text: '图表',
    width: 300,
    height: 200,
  },
  {
    component: 'es-icon',
    text: '图标',
    width: 100,
    height: 100,
    props: { icon: 'Plus' }
  }
]

sourceComponentList.forEach(item => {
  registerConfig.registerCommon({ ...item })
})

// 注册icons
const icons = ['Plus', 'Minus', 'CirclePlus', 'Search', 'Female', 'Male']
icons.forEach(icon => {
  registerConfig.registerIcon({
    component: 'es-icon',
    props: { icon }
  })
})
