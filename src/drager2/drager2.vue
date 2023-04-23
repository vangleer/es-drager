<template>
  <div
    ref="dragRef"
    :class="['es-drager']"
    :style="dragStyle"
    @mousedown="onMousedown"
  >
    <slot />

    <template v-if="zoomable">
      <div v-show="selected">
        <div
          v-for="item in dotList"
          :key="item.side"
          class="es-drager-dot"
          :data-side="item.side"
          :style="getDotStyle(item)"
          @mousedown="onDotMousedown(item, $event)"
        >
        </div>
      </div>
    </template>

    <div
      v-if="rotatable"
      ref="rotateRef"
      class="es-drager-rotate"
      @mousedown="onRotateMousedown"
    >
      <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"/></svg>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
const withUnit = (val: number | string = 0) => {
  return parseInt(val + '') + 'px'
}
type IDotSide = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
type IDot = {
  side: IDotSide,
  cursor?: string
}
const dotList: IDot[] = [
  { side: 'top', cursor: 'n-resize' },
  { side: 'bottom', cursor: 'n-resize' },
  { side: 'left', cursor: 'e-resize' },
  { side: 'right', cursor: 'e-resize' },
  { side: 'top-left', cursor: 'se-resize' },
  { side: 'top-right', cursor: 'sw-resize' },
  { side: 'bottom-left', cursor: 'sw-resize' },
  { side: 'bottom-right', cursor: 'se-resize' }
]
const selected = ref(true)
const props = defineProps({
  rotatable: {
    type: Boolean,
    default: false
  },
  zoomable: {
    type: Boolean,
    default: true
  },
  boundary: { // 边界
    type: Boolean
  },
  width: {
    type: [Number, String],
    default: 100
  },
  height: {
    type: [Number, String],
    default: 100
  },
  left: {
    type: [Number, String],
    default: 0
  },
  top: {
    type: [Number, String],
    default: 0
  },
  color: {
    type: String,
    default: '#3a7afe'
  }
})
const emit = defineEmits(['move', 'resize', 'rotate'])
const angle = ref(0)
const dragRef = ref<HTMLElement | null>(null)
const isMousedown = ref(false)
type DragData = {
  [key: string]: any
}
const dragData = ref<DragData>({
  width: props.width,
  height: props.height,
  left: props.left,
  top: props.top,
  angle: 0
})

const dragStyle = computed(() => {
  const { width, height, left, top, angle } = dragData.value
  return {
    width: withUnit(width),
    height: withUnit(height),
    left: withUnit(left),
    top: withUnit(top),
    transform: `rotate(${angle}deg)`,
    '--es-drager-color': props.color
  }
})
// 计算圆点位置
function getDotStyle(item: IDot) {
  const [side, position] = item.side.split('-')
  const style = { [side]: '0%', cursor: item.cursor }
  if (!position) {
    const side2 = ['top', 'bottom'].includes(side) ? 'left' : 'top'
    style[side2] = '50%'
  } else {
    style[position] = '0%'
  }

  return style
}
function onMousedown(e: MouseEvent) {
  isMousedown.value = true
  const el = dragRef.value!
  const downX = e.clientX
  const downY = e.clientY
  const elRect = el.getBoundingClientRect()

  // 鼠标在盒子里的位置
  const mouseX = downX - elRect.left
  const mouseY = downY - elRect.top

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
    emit && emit('move', dragData.value)
  }

  const onMouseup = (_e: MouseEvent) => {
    isMousedown.value = false
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

/**
 * 缩放
 * @param dotInfo 
 * @param e 
 */
function onDotMousedown(dotInfo: IDot, e: MouseEvent) {
  e.stopPropagation()
  e.preventDefault()
  // 获取鼠标按下的坐标
  const downX = e.clientX
  const downY = e.clientY
  const el = dragRef.value!
  const elRect = el.getBoundingClientRect()
  
  const onMousemove = (e: MouseEvent) => {
    // 移动的x距离
    const disX = e.clientX - downX
    // 移动的y距离
    const disY = e.clientY - downY

    const [side, position] = dotInfo.side.split('-')
    const hasT = side === 'top'
    const hasL = [side, position].includes('left')

    let width = elRect.width, left = elRect.left
    if (hasL) {
      width -= disX
      left += disX
    } else {
      width += disX
    }

    // let width = elRect.width + (hasL ? -disX : disX)
    let height = elRect.height + (hasT ? -disY : disY)
    
    // let left = elRect.left + (hasL ? disX : 0)
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

    dragData.value = { left, top, width, height }
    emit('resize', dragData.value)
  }

  const onMouseup = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

// 旋转实现方案: https://www.deanhan.cn/js-rotate-resize.html
function onRotateMousedown(e: MouseEvent) {
  e.stopPropagation()
  e.preventDefault()
  const el = dragRef.value!
  const elRect = el.getBoundingClientRect()
  // 旋转中心位置
  const centerX = elRect.left + elRect.width / 2
  const centerY = elRect.top + elRect.height / 2

  function onMousemove(e: MouseEvent) {
    const diffX = centerX - e.clientX
    const diffY = centerY - e.clientY
    // Math.atan2(y,x) 返回x轴到(x,y)的角度 // pi值
    const radians = Math.atan2(diffY, diffX)

    dragData.value.angle = radians * 180 / Math.PI - 90 // 角度
    emit('rotate', angle.value)
  }

  const onMouseup = (_e: MouseEvent) => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}

</script>

<style lang='scss'>
.es-drager {
  position: absolute;
  z-index: 1000;
  width: 200px;
  height: 120px;
  border: 1px solid var(--es-drager-color, #3a7afe);

  &-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--es-drager-color, #3a7afe);
    transform: translate(-50%, -50%);
    cursor: se-resize;
    &[data-side*="right"] {
      transform: translate(50%, -50%);
    }
    &[data-side*="bottom"] {
      transform: translate(-50%, 50%);
    }
    &[data-side="bottom-right"] {
      transform: translate(50%, 50%);
    }
  }

  
  &-rotate {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -200%);
    width: 16px;
    height: 16px;
    color: var(--es-drager-color);
    font-size: 20px;
  }
}

</style>
