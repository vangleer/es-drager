import { Ref, onMounted, ref, ExtractPropTypes, watch, onBeforeUnmount } from 'vue'
import { DragerProps, DragData } from './drager'
import { setupMove, MouseTouchEvent, calcGrid, getXY } from './utils'
export function useDrager(
  targetRef: Ref<HTMLElement | null>,
  props: ExtractPropTypes<typeof DragerProps>,
  emit: Function
) {
  
  const isMousedown = ref(false)
  const selected = ref(false)
  const dragData = ref<DragData>({
    width: props.width,
    height: props.height,
    left: props.left,
    top: props.top,
    angle: props.angle
  })
  function onMousedown(e: MouseTouchEvent) {
    if (props.disabled) return
    isMousedown.value = true
    selected.value = true
    let { clientX: downX, clientY: downY } = getXY(e)
    
    const { left, top } = dragData.value
    let maxX = 0, maxY = 0
    if (props.boundary) {
      [maxX, maxY] = getBoundary()
    }
    
    emit && emit('drag-start', dragData.value)
    const onMousemove = (e: MouseTouchEvent) => {
      const { clientX, clientY } = getXY(e)
      let moveX = (clientX - downX) / props.scaleRatio + left
      let moveY = (clientY - downY) / props.scaleRatio + top

      // 是否开启网格对齐
      if (props.snapToGrid) {
        // 当前位置
        let { left: curX, top: curY } = dragData.value
        // 移动距离
        const diffX = moveX - curX
        const diffY = moveY - curY

        // 计算网格移动距离
        moveX = curX + calcGrid(diffX, props.gridX)
        moveY = curY + calcGrid(diffY, props.gridY)
      }
      
      if (props.boundary) {
        [moveX, moveY] = fixBoundary(moveX, moveY, maxX, maxY)
      }

      dragData.value.left = moveX
      dragData.value.top = moveY
      
      emit && emit('drag', dragData.value)
    }

    setupMove(onMousemove, (e: MouseTouchEvent) => {
      isMousedown.value = false
      document.addEventListener('click', clickOutsize, { once: true })
      emit && emit('drag-end', dragData.value)
    })
  }
  const getBoundary = () => {
    const { width, height } = dragData.value
    const parentEl = targetRef.value!.parentElement || document.body
    const parentElRect = parentEl!.getBoundingClientRect()
    // 最大x
    const maxX = parentElRect.width / props.scaleRatio - width
    // 最大y
    const maxY = parentElRect.height / props.scaleRatio - height
    return [maxX, maxY]
  }
  /**
   * @param moveX 移动的X
   * @param moveY 移动的Y
   * @param maxX 最大移动X距离
   * @param maxY 最大移动Y距离
   */
  const fixBoundary = (moveX: number, moveY: number, maxX: number, maxY: number) => {
    // 判断x最小最大边界
    moveX = moveX < 0 ? 0 : moveX
    moveX = moveX > maxX ? maxX : moveX

    // 判断y最小最大边界
    moveY = moveY < 0 ? 0 : moveY
    moveY = moveY > maxY ? maxY : moveY
    return [moveX, moveY]
  }
  const clickOutsize = () => {
    selected.value = false
  }
  // 键盘事件
  const onKeydown = (e: KeyboardEvent) => {
    if (isMousedown.value) return
    let { left: moveX, top: moveY } = dragData.value
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
      const [maxX, maxY] = getBoundary()
      ;[moveX, moveY] = fixBoundary(moveX, moveY, maxX, maxY)
    }
    // 一次只会有一个会变
    dragData.value.left = moveX
    dragData.value.top = moveY
  }
  onMounted(() => {
    if (!targetRef.value) return

    // 没传宽高使用元素默认
    if (!dragData.value.width && !dragData.value.height) {
      const { width, height } = targetRef.value.getBoundingClientRect()
      // 获取默认宽高
      dragData.value = { ...dragData.value, width: width || 100, height: height || 100 }
      emit('change', { ...dragData.value })
    }
    
    targetRef.value.addEventListener('mousedown', onMousedown)
    targetRef.value.addEventListener('touchstart', onMousedown, { passive: true })
  })

  watch(selected, (val) => {
    if (props.disabledKeyEvent) return
    // 每次选中注册键盘事件
    if (val) {
      document.addEventListener('keydown', onKeydown)
    } else { // 不是选中移除
      document.removeEventListener('keydown', onKeydown)
    }
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
  })
  return {
    isMousedown,
    selected,
    dragData
  }
}
