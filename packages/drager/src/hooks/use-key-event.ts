import {
  Ref,
  ExtractPropTypes
} from 'vue'
import { DragerProps, DragData } from '../drager'
type UtilFN = {
  getBoundary: Function,
  fixBoundary: Function,
  checkDragerCollision: Function,
  emit: Function
}
export function useKeyEvent(
  props: ExtractPropTypes<typeof DragerProps>,
  dragData: Ref<DragData>,
  selected: Ref<boolean>,
  {
    getBoundary,
    fixBoundary,
    checkDragerCollision,
    emit
  }: UtilFN
) {

  let oldLeft = 0
  let oldTop = 0
  
  // 键盘事件
  const onKeydown = (e: KeyboardEvent) => {
    let { left: moveX, top: moveY } = dragData.value
    if (!oldLeft) oldLeft = moveX
    if (!oldTop) oldTop = moveY
    if (['ArrowRight', 'ArrowLeft'].includes(e.key)) {
      // 左右键修改left
      const isRight = e.key === 'ArrowRight'
      // 默认移动1像素距离
      let diff = isRight ? 1 : -1
      // 如果开启网格，移动gridX距离
      if (props.snapToGrid) {
        diff = isRight ? props.gridX : -props.gridX
      }
      moveX = moveX + diff
    } else if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      // 左右键修改top
      const isDown = e.key === 'ArrowDown'
      // 默认移动1像素距离
      let diff = isDown ? 1 : -1
      // 如果开启网格，移动gridY距离
      if (props.snapToGrid) {
        diff = isDown ? props.gridY : -props.gridY
      }

      moveY = moveY + diff
    }

    // 边界判断
    if (props.boundary) {
      const [minX, maxX, minY, maxY] = getBoundary()
      ;[moveX, moveY] = fixBoundary(moveX, moveY, minX, maxX, minY, maxY)
    }
    
    // 一次只会有一个会变
    dragData.value.left = moveX
    dragData.value.top = moveY
  }
  const onKeyup = (e: KeyboardEvent) => {
    if (['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
      // 检测碰撞
      if (props.checkCollision) {
        if (checkDragerCollision()) {
          dragData.value.left = oldLeft
          dragData.value.top = oldTop
        }
      }
    }
    oldLeft = 0
    oldTop = 0
  }

  return {
    onKeydown,
    onKeyup
  }
}
