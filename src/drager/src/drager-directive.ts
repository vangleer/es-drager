import { Directive } from 'vue'
import { IDot, DragerProps } from './drager'
import { setupMove, useZIndex } from './use-drager'
const defaultProps = Object.keys(DragerProps).reduce((obj: any, key) => {
  obj[key] = (DragerProps as any)[key].default
  return obj
}, {})


/**
 * 缩放
 * @param dotInfo 
 * @param e 
 */
function onDotMousedown(dotInfo: IDot, e: MouseEvent, el: HTMLElement) {
  e.stopPropagation()
  e.preventDefault()
  // 获取鼠标按下的坐标
  const downX = e.clientX
  const downY = e.clientY
  const elRect = el.getBoundingClientRect()
  
  const onMousemove = (e: MouseEvent) => {
    // 移动的x距离
    const disX = e.clientX - downX
    // 移动的y距离
    const disY = e.clientY - downY

    const [side, position] = dotInfo.side.split('-')
    const hasT = side === 'top'
    const hasL = [side, position].includes('left')

    let width = elRect.width + (hasL ? -disX : disX)
    let height = elRect.height + (hasT ? -disY : disY)
    
    let left = elRect.left + (hasL ? disX : 0)
    let top = elRect.top + (hasT ? disY : 0)

    if (!position) { // 如果是四个正方位
      if (['top', 'bottom'].includes(side)) {
        // 上下就不改变宽度
        width = elRect.width
      } else {
        // 左右就不改变高度
        height = elRect.height
      }
    }

    if (width < 0) {
      width = -width
      left -= width
    }
    if (height < 0) {
      height = -height
      top -= height
    }

    el.style.width = `${width}px`
    el.style.height = `${height}px`
    el.style.left = `${left}px`
    el.style.top = `${top}px`
    
  }

  setupMove(onMousemove)
}

export const Drager: Directive = {
  mounted(el: HTMLElement, binding) {
    const props = { ...defaultProps, ...(binding.value || {}) }
    
    el.classList.add('es-drager')
    el.onmousedown = (e: MouseEvent) => {
      const downX = e.clientX
      const downY = e.clientY
      const elRect = el.getBoundingClientRect()
      el.style.zIndex = useZIndex()
      let minX = 0, maxX = 0, minY = 0, maxY = 0
      if (props.boundary) {
        const parentEl = el.parentElement || document.body
        const parentElRect = parentEl!.getBoundingClientRect()
        // 最小x
        minX = parentElRect.left
        // 最大x
        maxX = parentElRect.left + parentElRect.width - elRect.width
        // 最小y
        minY = parentElRect.top
        // 最大y
        maxY = parentElRect.top + parentElRect.height - elRect.height
      }
  
      // 鼠标在盒子里的位置
      const mouseX = downX - elRect.left
      const mouseY = downY - elRect.top

      setupMove((e: MouseEvent) => {
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
        
        el.style.left = moveX + 'px'
        el.style.top = moveY + 'px'
      })
    }

    if (props.zoomable) {
      // createDot(el)
    }
  },
  unmounted(el: HTMLElement) {
    el.onmousedown = null
  }
}