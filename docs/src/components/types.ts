import { CSSProperties, ExtractPropTypes } from 'vue'
import { DragerProps } from '../../../src/drager/src/drager'

type DragerType = Partial<ExtractPropTypes<typeof DragerProps>>

export type ComponentType = DragerType & {
  id?: string
  component?: string
  text?: string
  group?: boolean
  groupStyle?: any
  props?: any
  style?: CSSProperties
  editable?: boolean
}
export type EditorType = {
  container: {
    snapToGrid: boolean
    markline: {
      color?: string
      show?: Boolean
    }
    gridSize: number
    gridColor?: string
    style: CSSProperties
    scaleRatio?: number
  }
  elements: ComponentType[]
}

export type ToolType = {
  label: string
  handler: Function
}
