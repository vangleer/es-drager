import { Ref, onMounted, ref, ExtractPropTypes, } from 'vue'
import { DragerProps, DragData } from './drager'
let zIndex = 1000

export function useDrager(
  targetRef: Ref<HTMLElement | null>,
  props: ExtractPropTypes<typeof DragerProps>, 
  emit: Function
) {
  
  const dragRef = ref()
  const isMousedown = ref(false)
  const selected = ref(false)
  const dragData = ref<DragData>({
    width: props.width,
    height: props.height,
    left: props.left,
    top: props.top,
    angle: props.angle
  })
  function onMousedown(e: MouseEvent) {
    if (props.disabled) return
    isMousedown.value = true
    selected.value = true
    const el = targetRef.value!
    let { clientX: downX, clientY: downY } = e
    
    const { width, height, left, top } = dragData.value
    el.style.zIndex = useZIndex()
    let minX = 0, maxX = 0, minY = 0, maxY = 0
    if (props.boundary) {
      const parentEl = el.parentElement || document.body
      const parentElRect = parentEl!.getBoundingClientRect()
      // 最大x
      maxX = parentElRect.width - width
      // 最大y
      maxY = parentElRect.height - height
    }

    // 鼠标在盒子里的位置
    const mouseX = downX - left
    const mouseY = downY - top
    emit && emit('drag-start', dragData.value)
    const onMousemove = (e: MouseEvent) => {
      let moveX = e.clientX - mouseX
      let moveY = e.clientY - mouseY

      if (props.boundary) {
        // 判断x最小最大边界
        moveX = moveX < minX ? minX : moveX
        moveX = moveX > maxX ? maxX : moveX

        // 判断y最小最大边界
        moveY = moveY < minY ? minY : moveY
        moveY = moveY > maxY ? maxY : moveY
      }
      
      dragData.value.left = moveX
      dragData.value.top = moveY
      
      emit && emit('drag', dragData.value)
    }

    setupMove(onMousemove, (e: MouseEvent) => {
      isMousedown.value = false
      document.addEventListener('click', clickOutsize, { once: true })
      emit && emit('drag-end', dragData.value)
    })
  }

  const clickOutsize = () => {
    selected.value = false
  }
  onMounted(() => {
    if (!targetRef.value) return
    targetRef.value.addEventListener('mousedown', onMousedown)
  })
  return {
    isMousedown,
    selected,
    dragRef,
    dragData
  }
}

export function useZIndex() {
  return ++zIndex + ''
}

/**
 * 统一处理拖拽事件
 * @param onMousemove 鼠标移动处理函数
 */
export function setupMove(onMousemove: (e: MouseEvent) => void, onMouseupCb?: (e: MouseEvent) => void) {
  const onMouseup = (_e: MouseEvent) => {
    onMouseupCb && onMouseupCb(_e)
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}