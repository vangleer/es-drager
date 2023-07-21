import { CSSProperties } from 'vue'
export type ComponentType = {
  component?: string
  text?: string
  width?: number
  height?: number
  top?: number
  left?: number
  angle?: number
  selected?: boolean
  group?: boolean
  props?: any
  style?: CSSProperties
}
export type EditorType = {
  container: { gridSize: number; style: { width: string; height: string } }; 
  elements: ComponentType[]
}

export type ToolType = {
  label: string
  handler: Function
}
