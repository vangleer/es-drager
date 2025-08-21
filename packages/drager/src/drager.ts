import { Component, PropType } from 'vue'

export type IDotSide =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
export type EventType =
  | 'change'
  | 'drag'
  | 'drag-start'
  | 'drag-end'
  | 'resize'
  | 'resize-start'
  | 'resize-end'
  | 'rotate'
  | 'rotate-start'
  | 'rotate-end'
  | 'skew'
  | 'skew-start'
  | 'skew-end'
export type IDot = {
  side: IDotSide
  cursor?: string
}

export interface MarklineData {
  top?: null | number
  left?: null | number
  diffX?: number
  diffY?: number
}

export const DragerProps = {
  type: {
    type: String as PropType<'rect' | 'text' | 'image'>,
    default: 'rect'
  },
  tag: {
    type: [String, Object] as PropType<string | Component>,
    default: 'div'
  },
  resizable: {
    type: Boolean,
    default: true
  },
  rotatable: {
    type: Boolean,
    default: false
  },
  skewable: {
    type: Boolean,
    default: false
  },
  boundary: {
    // 边界
    type: Boolean
  },
  disabled: Boolean,
  width: {
    type: Number,
    default: 0
  },
  height: {
    type: Number,
    default: 0
  },
  left: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  },
  zIndex: {
    type: Number,
    default: 0
  },
  angle: {
    type: Number,
    default: 0
  },
  skew: {
    type: Array as PropType<number[]>,
    default: () => [0, 0]
  },
  color: {
    type: String,
    default: '#3a7afe'
  },
  minWidth: {
    type: Number,
    default: -Infinity
  },
  minHeight: {
    type: Number,
    default: -Infinity
  },
  maxWidth: {
    type: Number,
    default: 0
  },
  maxHeight: {
    type: Number,
    default: 0
  },
  aspectRatio: {
    // 缩放比例
    type: Number
  },
  selected: Boolean,
  snapToGrid: Boolean,
  gridX: {
    type: Number,
    default: 50
  },
  gridY: {
    type: Number,
    default: 50
  },
  scaleRatio: {
    type: Number,
    default: 1
  },
  disabledKeyEvent: Boolean,
  border: {
    type: Boolean,
    default: true // 兼容默认
  },
  resizeList: {
    type: Array as PropType<IDotSide[]> // 要显示的缩放handle列表，默认显示全部
  },
  equalProportion: {
    // 是否等比例缩放
    type: Boolean
  },
  checkCollision: {
    // 是否开启碰撞检查
    type: Boolean
  },
  snap: Boolean, // 是否开启吸附
  snapThreshold: { // 吸附阈值，默认10px
    type: Number,
    default: 10
  },
  markline: [Boolean, Function] as PropType<
    boolean | ((e: MarklineData) => void)
  >,
  extraLines: Function as PropType<(target: DOMRect) => Element[] | Array<{ showTop?: number, top?: number, showLeft?: number, left?: number }>>
}

export interface DragData {
  width: number
  height: number
  left: number
  top: number
  angle: number
  skew?: number[]
}
