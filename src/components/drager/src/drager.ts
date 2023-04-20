export type IDotSide = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type IDot = {
  side: IDotSide,
  cursor?: string
}

export const DragerProps = {
  teleport: {
    type: String,
    default: '.es-paint-box'
  }
}