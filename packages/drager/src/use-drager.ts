import {
  Ref,
  onMounted,
  ref,
  ExtractPropTypes,
  nextTick,
  watch,
  onBeforeUnmount
} from 'vue'
import { DragerProps, DragData } from './drager'
import {
  setupMove,
  MouseTouchEvent,
  calcGrid,
  getXY,
  checkCollision
} from './utils'
import { useMarkline, useKeyEvent } from './hooks'
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
  const { marklineEmit } = useMarkline(targetRef, props)
  // 限制多个鼠标键按下的情况
  const mouseSet = new Set()
  function onMousedown(e: MouseTouchEvent) {
    mouseSet.add((e as MouseEvent).button)
    if (props.disabled) return
    isMousedown.value = true
    selected.value = true
    let { clientX: downX, clientY: downY } = getXY(e)
    const { left, top } = dragData.value
    let minX = 0,
      maxX = 0,
      minY = 0,
      maxY = 0
    if (props.boundary) {
      ;[minX, maxX, minY, maxY] = getBoundary()
    }

    marklineEmit('drag-start')
    emit && emit('drag-start', dragData.value)
    const onMousemove = (e: MouseTouchEvent) => {
      // 不是一个按键不执行移动
      if (mouseSet.size > 1) return
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
        ;[moveX, moveY] = fixBoundary(moveX, moveY, minX, maxX, minY, maxY)
      }
      
      dragData.value.left = moveX
      dragData.value.top = moveY

      emit && emit('drag', dragData.value)

      nextTick(() => {
        const markLine = marklineEmit('drag')!
        // 是否开启吸附
        if (props.snap) {
          if (markLine.diffX) {
            dragData.value.left += markLine.diffX
          }
    
          if (markLine.diffY) {
            dragData.value.top += markLine.diffY
          }
        }
      })
    }

    setupMove(onMousemove, (e: MouseTouchEvent) => {
      if (props.checkCollision) {
        const isCollision = checkDragerCollision()
        if (isCollision) {
          dragData.value.top = top
          dragData.value.left = left
        }
      }
      mouseSet.clear()
      isMousedown.value = false
      marklineEmit('drag-end')
      emit && emit('drag-end', dragData.value)
    })
  }
  const getBoundary = () => {
    let minX = 0,
      minY = 0
    const { left, top, height, width, angle } = dragData.value
    const parentEl = targetRef.value!.offsetParent || document.body
    const parentElRect = parentEl!.getBoundingClientRect()
    if (angle && props.scaleRatio === 1) {
      const rect = targetRef.value!.getBoundingClientRect()
      minX = Math.abs(rect.left - (left + parentElRect.left))
      minY = Math.abs(rect.top - (top + parentElRect.top))
    }

    // 最大x
    const maxX = parentElRect.width / props.scaleRatio - width
    // 最大y
    const maxY = parentElRect.height / props.scaleRatio - height
    return [minX, maxX - minX, minY, maxY - minY, parentElRect.width / props.scaleRatio, parentElRect.height / props.scaleRatio]
  }
  /**
   * @param moveX 移动的X
   * @param moveY 移动的Y
   * @param maxX 最大移动X距离
   * @param maxY 最大移动Y距离
   */
  const fixBoundary = (
    moveX: number,
    moveY: number,
    minX: number,
    maxX: number,
    minY: number,
    maxY: number
  ) => {
    // 判断x最小最大边界
    moveX = moveX < minX ? minX : moveX
    moveX = moveX > maxX ? maxX : moveX

    // 判断y最小最大边界
    moveY = moveY < minY ? minY : moveY
    moveY = moveY > maxY ? maxY : moveY
    return [moveX, moveY]
  }
  const checkDragerCollision = () => {
    const parentEl = targetRef.value!.offsetParent || document.body
    const broList = Array.from(parentEl.children).filter(item => {
      return item !== targetRef.value! && item.classList.contains('es-drager')
    })
    for (let i = 0; i < broList.length; i++) {
      const item = broList[i]
      const flag = checkCollision(targetRef.value!, item)
      if (flag) return true
    }
  }
  const clickOutsize = () => {
    selected.value = false
  }
  // 键盘事件
  const { onKeydown, onKeyup } = useKeyEvent(
    props,
    dragData,
    selected,
    {
      getBoundary,
      fixBoundary,
      checkDragerCollision,
      emit
    }
  )
  watch(selected, val => {
    // 聚焦/失焦
    if (val) {
      emit('focus', val)
      // 点击其它区域
      document.addEventListener('click', clickOutsize, { once: true })
    } else {
      emit('blur', val)
    }

    if (props.disabledKeyEvent) return
    // 每次选中注册键盘事件
    if (val) {
      document.addEventListener('keydown', onKeydown)
      document.addEventListener('keyup', onKeyup)
    } else {
      // 不是选中移除
      document.removeEventListener('keydown', onKeydown)
      document.removeEventListener('keyup', onKeyup)
    }
  })

  onMounted(() => {
    if (!targetRef.value) return
    // 没传宽高使用元素默认
    if (!dragData.value.width && !dragData.value.height) {
      const { width, height } = targetRef.value.getBoundingClientRect()
      // 获取默认宽高
      dragData.value = {
        ...dragData.value,
        width: width || 100,
        height: height || 100
      }
    }

    targetRef.value.addEventListener('mousedown', onMousedown)
    targetRef.value.addEventListener('touchstart', onMousedown, {
      passive: true
    })
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutsize)
    document.removeEventListener('keydown', onKeydown)
    document.removeEventListener('keyup', onKeyup)
  })
  return {
    isMousedown,
    selected,
    dragData,
    getBoundary,
    checkDragerCollision
  }
}
