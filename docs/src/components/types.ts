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
  container?: { gridSize: number; style: { width: string; height: string } }; 
  elements: ComponentType[]
}

export type ToolType = {
  label: string
  handler: Function
}
