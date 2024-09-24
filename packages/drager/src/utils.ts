import { DragData } from './drager'

export type MouseTouchEvent = MouseEvent | TouchEvent
/**
 * 统一处理拖拽事件
 * @param onMousemove 鼠标移动处理函数
 */
export function setupMove(
  onMousemove: (e: MouseTouchEvent) => void,
  onMouseupCb?: (e: MouseTouchEvent) => void
) {
  const onMouseup = (_e: MouseTouchEvent) => {
    onMouseupCb && onMouseupCb(_e)
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
    document.removeEventListener('mouseleave', onMouseup)

    // for mobile
    document.removeEventListener('touchmove', onMousemove)
    document.removeEventListener('touchend', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
  document.addEventListener('mouseleave', onMouseup)

  // for mobile
  document.addEventListener('touchmove', onMousemove)
  document.addEventListener('touchend', onMouseup)
}

export function getXY(e: MouseTouchEvent) {
  let clientX = 0,
    clientY = 0
  if (isTouchEvent(e)) {
    const touch = e.targetTouches[0]
    clientX = touch.pageX
    clientY = touch.pageY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }

  return { clientX, clientY }
}

function isTouchEvent(val: unknown): val is TouchEvent {
  const typeStr = Object.prototype.toString.call(val)
  return typeStr.substring(8, typeStr.length - 1) === 'TouchEvent'
}

export const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}

export const resizableMap = {
  n: 'top',
  s: 'bottom',
  e: 'right',
  w: 'left',
  ne: 'top-right',
  nw: 'top-left',
  se: 'bottom-right',
  sw: 'bottom-left'
}

export const cursorDirectionArray = ['n', 'ne', 'e', 'se', 's', 'sw', 'w', 'nw']
const cursorStartMap = { n: 0, ne: 1, e: 2, se: 3, s: 4, sw: 5, w: 6, nw: 7 }
const cursorMap = {
  0: 0,
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 4,
  6: 4,
  7: 5,
  8: 6,
  9: 6,
  10: 7,
  11: 8
}
export const getCursor = (rotateAngle: number, d: string) => {
  const increment = (cursorMap as any)[Math.floor(rotateAngle / 30)]
  const index = (cursorStartMap as any)[d]
  const newIndex = (index + increment) % 8
  return cursorDirectionArray[newIndex]
}

export const getDotList = (angle: number = 0, resizeList?: string[]) => {
  let dots = []
  for (let index = 0; index < cursorDirectionArray.length; index++) {
    const key = cursorDirectionArray[index]

    const [side, position] = (resizableMap as any)[key].split('-')

    const cursor = getCursor(angle, key)

    const style: any = {
      [side]: '0%',
      cursor: cursor + '-resize',
      side: (resizableMap as any)[key]
    }
    if (!position) {
      const side2 = ['top', 'bottom'].includes(side) ? 'left' : 'top'
      style[side2] = '50%'
    } else {
      style[position] = '0%'
    }

    if (!resizeList) {
      // 没有传入缩放默认都显示
      dots.push(style)
    } else {
      if (resizeList.includes((resizableMap as any)[key])) {
        dots.push(style)
      }
    }
  }

  return dots
}

export const degToRadian = (deg: number) => (deg * Math.PI) / 180

export const getLength = (x: number, y: number) => Math.sqrt(x * x + y * y)
const cos = (deg: number) => Math.cos(degToRadian(deg))
const sin = (deg: number) => Math.sin(degToRadian(deg))
export const getNewStyle = (
  type: string,
  rect: any,
  deltaW: number,
  deltaH: number,
  ratio: number | undefined,
  minWidth: number,
  minHeight: number
) => {
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
        centerX +=
          (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle)
        centerY +=
          (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle)
      } else {
        // 左边固定
        centerX += (deltaW / 2) * cos(rotateAngle)
        centerY += (deltaW / 2) * sin(rotateAngle)
      }
      break
    }
    case 'top-right': {
      deltaH = -deltaH
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      if (ratio) {
        height = width / ratio
        deltaH = -Math.abs(height - rect.height) // 保持向上缩放
      } else {
        const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
        height = heightAndDeltaH.height
        deltaH = heightAndDeltaH.deltaH
      }
      centerX +=
        (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle)
      centerY +=
        (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle)
      break
    }
    case 'bottom-right': {
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      if (ratio) {
        height = width / ratio
        deltaH = height - rect.height
      } else {
        const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
        height = heightAndDeltaH.height
        deltaH = heightAndDeltaH.deltaH
      }
      centerX += (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle)
      centerY += (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle)
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
        centerX +=
          (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle)
        centerY +=
          (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle)
      } else {
        // 上边固定
        centerX -= (deltaH / 2) * sin(rotateAngle)
        centerY += (deltaH / 2) * cos(rotateAngle)
      }
      break
    }
    case 'bottom-left': {
      deltaW = -deltaW
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      if (ratio) {
        height = width / ratio
        deltaH = height - rect.height
      } else {
        const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
        height = heightAndDeltaH.height
        deltaH = heightAndDeltaH.deltaH
      }
      centerX -=
        (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle)
      centerY -=
        (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle)
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
        centerX -=
          (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle)
        centerY -=
          (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle)
      } else {
        // 右边固定
        centerX -= (deltaW / 2) * cos(rotateAngle)
        centerY -= (deltaW / 2) * sin(rotateAngle)
      }
      break
    }
    case 'top-left': {
      deltaW = -deltaW
      deltaH = -deltaH
      const widthAndDeltaW = setWidthAndDeltaW(width, deltaW, minWidth)
      width = widthAndDeltaW.width
      deltaW = widthAndDeltaW.deltaW
      if (ratio) {
        height = width / ratio
        deltaH = -Math.abs(height - rect.height) // 保持向上缩放
      } else {
        const heightAndDeltaH = setHeightAndDeltaH(height, deltaH, minHeight)
        height = heightAndDeltaH.height
        deltaH = heightAndDeltaH.deltaH
      }
      centerX -=
        (deltaW / 2) * cos(rotateAngle) - (deltaH / 2) * sin(rotateAngle)
      centerY -=
        (deltaW / 2) * sin(rotateAngle) + (deltaH / 2) * cos(rotateAngle)
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
        centerX +=
          (deltaW / 2) * cos(rotateAngle) + (deltaH / 2) * sin(rotateAngle)
        centerY +=
          (deltaW / 2) * sin(rotateAngle) - (deltaH / 2) * cos(rotateAngle)
      } else {
        centerX += (deltaH / 2) * sin(rotateAngle)
        centerY -= (deltaH / 2) * cos(rotateAngle)
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

const setHeightAndDeltaH = (
  height: number,
  deltaH: number,
  minHeight: number
) => {
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

export const centerToTL = ({
  centerX,
  centerY,
  width,
  height,
  angle
}: any): DragData => ({
  top: centerY - height / 2,
  left: centerX - width / 2,
  width,
  height,
  angle
})

export const formatData = (
  data: DragData,
  centerX: number,
  centerY: number
) => {
  const { width, height } = data
  return {
    width: Math.abs(width),
    height: Math.abs(height),
    left: centerX - Math.abs(width) / 2,
    top: centerY - Math.abs(height) / 2
  }
}

/**
 * @param diff 移动的距离
 * @param grid 网格大小
 */
export function calcGrid(diff: number, grid: number) {
  // 得到每次缩放的余数
  const r = Math.abs(diff) % grid

  // 正负grid
  const mulGrid = diff > 0 ? grid : -grid
  let result = 0
  // 余数大于grid的1/2
  if (r > grid / 2) {
    result = mulGrid * Math.ceil(Math.abs(diff) / grid)
  } else {
    result = mulGrid * Math.floor(Math.abs(diff) / grid)
  }

  return result
}

/**
 * 检查两个元素是否发生碰撞
 * @param element1 拖拽元素
 * @param element2 碰撞对象
 * @returns
 */
export function checkCollision(element1: Element, element2: Element, scaleRatio: number) {
  if (!element1 || !element2) return false
  const rect1 = getBoundingClientRectByScale(element1, scaleRatio)
  const rect2 = getBoundingClientRectByScale(element2, scaleRatio)

  if (
    rect1.left < rect2.left + rect2.width &&
    rect1.left + rect1.width > rect2.left &&
    rect1.top < rect2.top + rect2.height &&
    rect1.top + rect1.height > rect2.top
  ) {
    return true // 发生碰撞
  }

  return false // 未发生碰撞
}

/**
 * 获取缩放后得Rect
 */
export const getBoundingClientRectByScale = (el: HTMLElement | Element, scaleRatio: number) => {
  var curRect = el.getBoundingClientRect()
  return {
    ...curRect,
    left: curRect.left / scaleRatio,
    top: curRect.top / scaleRatio,
    right: curRect.right / scaleRatio,
    bottom: curRect.bottom / scaleRatio,
    width: curRect.width / scaleRatio,
    height: curRect.height / scaleRatio
  } as DOMRect
}