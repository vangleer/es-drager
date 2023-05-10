export type IDotSide = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type EventType = 'change' | 'drag' | 'drag-start' | 'drag-end' | 'resize' | 'resize-start' | 'resize-end' | 'rotate' | 'rotate-start' | 'rotate-end'
export type IDot = {
  side: IDotSide,
  cursor?: string
}

export const DragerProps = {
  resizable: {
    type: Boolean,
    default: true
  },
  rotatable: {
    type: Boolean,
    default: false
  },
  boundary: { // 边界
    type: Boolean
  },
  disabled: Boolean,
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 100
  },
  left: {
    type: Number,
    default: 0
  },
  top: {
    type: Number,
    default: 0
  },
  angle: {
    type: Number,
    default: 0
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
  aspectRatio: { // 缩放比例
    type: Number
  }
}

export type DragData = {
  width: number
  height: number
  left: number
  top: number
  angle: number
}

export const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}

export const resizableMap = {
  'n': 'top',
  's': 'bottom',
  'e': 'right',
  'w': 'left',
  'ne': 'top-right',
  'nw': 'top-left',
  'se': 'bottom-right',
  'sw': 'bottom-left'
}
export const cursorDirectionArray = [ 'n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw' ]
const cursorStartMap = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }
const cursorMap = { 0: 0, 1: 1, 2: 2, 3: 2, 4: 3, 5: 4, 6: 4, 7: 5, 8: 6, 9: 6, 10: 7, 11: 8 }
export const getCursor = (rotateAngle: number, d: string) => {
  const increment = (cursorMap as any)[ Math.floor(rotateAngle / 30) ]
  const index = (cursorStartMap as any)[ d ]
  const newIndex = (index + increment) % 8
  return cursorDirectionArray[ newIndex ]
}

export const getDotList = (angle: number = 0) => {
  let dots = []
  for (let index = 0; index < cursorDirectionArray.length; index++) {
    const key = cursorDirectionArray[index]
    
    const [side, position] = (resizableMap as any)[key].split('-')

    const cursor = getCursor(angle, key)
    
    const style: any = { [side]: '0%', cursor: cursor + '-resize', side: (resizableMap as any)[key] }
    if (!position) {
      const side2 = ['top', 'bottom'].includes(side) ? 'left' : 'top'
      style[side2] = '50%'
    } else {
      style[position] = '0%'
    }

    dots[index] = style
  }

  return dots
}

export const degToRadian = (deg: number) => deg * Math.PI / 180

export const getLength = (x: number, y: number) => Math.sqrt(x * x + y * y)
const cos = (deg: number) => Math.cos(degToRadian(deg))
const sin = (deg: number) => Math.sin(degToRadian(deg))
export const getNewStyle = (type: string, rect: any, deltaW: number, deltaH: number, ratio: number | undefined, minWidth: number, minHeight: number) => {
  let { width, height, centerX, centerY, rotateAngle } = rect
  const widthFlag = width < 0 ? -1 : 1
  const heightFlag = height < 0 ? -1 : 1
  width = Math.abs(width)
  height = Math.abs(height)
  switch (type) {
    case 'right': {
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      if (ratio) {
        deltaH = deltaW / ratio
        height = width / ratio
        // 左上角固定
        centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle)
        centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle)
      } else {
        // 左边固定
        centerX += deltaW / 2 * cos(rotateAngle)
        centerY += deltaW / 2 * sin(rotateAngle)
      }
      break
    }
    case 'top-right': {
      deltaH = -deltaH
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
      height = heightAndDeltaH.height
      deltaH = heightAndDeltaH.deltaH
      if (ratio) {
        deltaW = deltaH * ratio
        width = height * ratio
      }
      centerX += deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle)
      centerY += deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle)
      break
    }
    case 'bottom-right': {
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
      height = heightAndDeltaH.height
      deltaH = heightAndDeltaH.deltaH
      if (ratio) {
        deltaW = deltaH * ratio
        width = height * ratio
      }
      centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle)
      centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle)
      break
    }
    case 'bottom': {
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
      height = heightAndDeltaH.height
      deltaH = heightAndDeltaH.deltaH
      if (ratio) {
        deltaW = deltaH * ratio
        width = height * ratio
        // 左上角固定
        centerX += deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle)
        centerY += deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle)
      } else {
        // 上边固定
        centerX -= deltaH / 2 * sin(rotateAngle)
        centerY += deltaH / 2 * cos(rotateAngle)
      }
      break
    }
    case 'bottom-left': {
      deltaW = -deltaW
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
      height = heightAndDeltaH.height
      deltaH = heightAndDeltaH.deltaH
      if (ratio) {
        height = width / ratio
        deltaH = deltaW / ratio
      }
      centerX -= deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle)
      centerY -= deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle)
      break
    }
    case 'left': {
      deltaW = -deltaW
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      if (ratio) {
        height = width / ratio
        deltaH = deltaW / ratio
        // 右上角固定
        centerX -= deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle)
        centerY -= deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle)
      } else {
        // 右边固定
        centerX -= deltaW / 2 * cos(rotateAngle)
        centerY -= deltaW / 2 * sin(rotateAngle)
      }
      break
    }
    case 'top-left': {
      deltaW = -deltaW
      deltaH = -deltaH
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
      height = heightAndDeltaH.height
      deltaH = heightAndDeltaH.deltaH
      if (ratio) {
        width = height * ratio
        deltaW = deltaH * ratio
      }
      centerX -= deltaW / 2 * cos(rotateAngle) - deltaH / 2 * sin(rotateAngle)
      centerY -= deltaW / 2 * sin(rotateAngle) + deltaH / 2 * cos(rotateAngle)
      break
    }
    case 'top': {
      deltaH = -deltaH
      const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
      height = heightAndDeltaH.height
      deltaH = heightAndDeltaH.deltaH
      if (ratio) {
        width = height * ratio
        deltaW = deltaH * ratio
        // 左下角固定
        centerX += deltaW / 2 * cos(rotateAngle) + deltaH / 2 * sin(rotateAngle)
        centerY += deltaW / 2 * sin(rotateAngle) - deltaH / 2 * cos(rotateAngle)
      } else {
        centerX += deltaH / 2 * sin(rotateAngle)
        centerY -= deltaH / 2 * cos(rotateAngle)
      }
      break
    }
  }

  return {
    position: {
      centerX,
      centerY
    },
    size: {
      width: width * widthFlag,
      height: height * heightFlag
    }
  }
}

const setHeightAndDeltaH = (height: number, deltaH: number, minHeight: number) => {
  const expectedHeight = height + deltaH
  if (expectedHeight > minHeight) {
    height = expectedHeight
  } else {
    deltaH = minHeight - height
    height = minHeight
  }
  return { height, deltaH }
}

const setWidthAndDeltaW = (width: number, deltaW: number, minWidth: number) => {
  const expectedWidth = width + deltaW
  if (expectedWidth > minWidth) {
    width = expectedWidth
  } else {
    deltaW = minWidth - width
    width = minWidth
  }
  return { width, deltaW }
}

export const centerToTL = ({ centerX, centerY, width, height, angle }: any): DragData => ({
  top: centerY - height / 2,
  left: centerX - width / 2,
  width,
  height,
  angle
})

export const formatData = (data: DragData, centerX: number, centerY: number) => {
  const { width, height } = data
  return {
    width: Math.abs(width),
    height: Math.abs(height),
    left: centerX - Math.abs(width) / 2,
    top: centerY - Math.abs(height) / 2
  }
}