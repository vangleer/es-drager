export type IDotSide = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type IDot = {
  side: IDotSide,
  cursor?: string
}

export const DragerProps = {
  teleport: { // 挂载到哪里
    type: String,
    default: 'body'
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

export const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}