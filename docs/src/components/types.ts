export type EditorType = { container: { gridSize: number; style: { width: string; height: string } }; elements: { component?: string | undefined; text?: string | undefined; width?: number | undefined; height?: number | undefined; top?: number | undefined; left?: number | undefined; props?: any; style?: any }[] }
export type ToolType = {
  label: string
  handler: Function
}
