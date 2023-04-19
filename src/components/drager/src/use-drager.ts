import { Ref, onMounted, ref, onBeforeUnmount, ExtractPropTypes } from 'vue'
import { DragerProps } from './drager'
let zIndex = 1000
export function useDrager(targetRef: Ref<HTMLElement | null>, props: ExtractPropTypes<typeof DragerProps>) {
  const dragRef = ref()
  const isMousedown = ref(false)
  const selected = ref(false)
  function onMousedown(e: MouseEvent) {
    isMousedown.value = true
    selected.value = true
    const el = targetRef.value!
    const downX = e.clientX
    const downY = e.clientY
    const elRect = el.getBoundingClientRect()
    el.style.zIndex = zIndex++ + ''
    const parentEl = document.querySelector(props.teleport)

    const parentElRect = parentEl!.getBoundingClientRect()
    // 最小x
    const minX = parentElRect.left
    // 最大x
    const maxX = parentElRect.left + parentElRect.width - elRect.width
    // 最小y
    const minY = parentElRect.top
    // 最大y
    const maxY = parentElRect.top + parentElRect.height - elRect.height

    // 鼠标在盒子里的位置
    const mouseX = downX - elRect.left
    const mouseY = downY - elRect.top

    const onMousemove = (e: MouseEvent) => {
      let moveX = e.clientX - mouseX
      let moveY = e.clientY - mouseY

      // 判断x最小最大边界
      moveX = moveX < minX ? minX : moveX
      moveX = moveX > maxX ? maxX : moveX

      // 判断y最小最大边界
      moveY = moveY < minY ? minY : moveY
      moveY = moveY > maxY ? maxY : moveY
      
      el.style.left = moveX + 'px'
      el.style.top = moveY + 'px'
      // el.style.transform = `translate(${moveX}px, ${moveY}px)`
    }
    const onMouseup = (e: MouseEvent) => {
      isMousedown.value = false
      console.log('up')
      document.removeEventListener('mousemove', onMousemove)
      document.removeEventListener('mouseup', onMouseup)
    }
    document.addEventListener('mousemove', onMousemove)
    document.addEventListener('mouseup', onMouseup)
  }

  const clickOutsize = () => {
    console.log('document click...')
    selected.value = false
  }
  onMounted(() => {
    if (!targetRef.value) return
    targetRef.value.addEventListener('mousedown', onMousedown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', clickOutsize)
  })

  return {
    isMousedown,
    selected,
    dragRef
  }
}