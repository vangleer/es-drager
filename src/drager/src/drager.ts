import { Ref, InjectionKey } from 'vue'
export type IDotSide = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type IDot = {
  side: IDotSide,
  cursor?: string
}

export const DragerProps = {
  zoomable: {
    type: Boolean,
    default: true
  },
  rotatable: { // 暂未实现
    type: Boolean,
    default: false
  },
  boundary: { // 现在边界
    type: Boolean
  },
  width: {
    type: [Number, String],
    default: 100
  },
  height: {
    type: [Number, String],
    default: 100
  },
  left: {
    type: [Number, String],
    default: 0
  },
  top: {
    type: [Number, String],
    default: 0
  },
  color: {
    type: String,
    default: '#3a7afe'
  }
}


type DragContext = {
  dragRef: Ref<HTMLElement | null>
}
export const DragContextKey: InjectionKey<DragContext> = Symbol('DragContextKey')

export const dotList: IDot[] = [
  { side: 'top', cursor: 'n-resize' },
  { side: 'bottom', cursor: 'n-resize' },
  { side: 'left', cursor: 'e-resize' },
  { side: 'right', cursor: 'e-resize' },
  { side: 'top-left', cursor: 'se-resize' },
  { side: 'top-right', cursor: 'sw-resize' },
  { side: 'bottom-left', cursor: 'sw-resize' },
  { side: 'bottom-right', cursor: 'se-resize' }
]

// 计算圆点位置
export function getDotStyle(item: IDot) {
  const [side, position] = item.side.split('-')
  const style = { [side]: '0%', cursor: item.cursor }
  if (!position) {
    const side2 = ['top', 'bottom'].includes(side) ? 'left' : 'top'
    style[side2] = '50%'
  } else {
    style[position] = '0%'
  }

  return style
}

export const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}