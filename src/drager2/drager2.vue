<template>
  <div
    ref="dragRef"
    :class="['es-drager', { selected }]"
    :style="dragStyle"
    @mousedown="onMousedown"
  >
    <slot />

    <template v-if="resizable">
      <div
        v-for="item in dotList"
        :key="item.side"
        class="es-drager-dot"
        :data-side="item.side"
        :style="getDotStyle(item)"
        @mousedown="onDotMousedown(item, $event)"
      >
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
const selected = ref(false)
const props = defineProps({
  rotatable: {
    type: Boolean,
    default: false
  },
  resizable: {
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
  },
  snapToGrid: Boolean,
  gridX: {
    type: Number,
    default: 50
  },
  gridY: {
    type: Number,
    default: 50
  },
  scaleRatio: {
    type: Number,
    default: 1
  },
})
const emit = defineEmits(['move', 'resize', 'rotate'])
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
  selected.value = true
  const el = dragRef.value!
  const downX = e.clientX
  const downY = e.clientY
  // 鼠标在盒子里的位置
  
  const { width, height, left, top } = dragData.value
  let minX = 0, maxX = 0, minY = 0, maxY = 0

  if (props.boundary) {
    const parentEl = el.parentElement || document.body
    const parentElRect = parentEl!.getBoundingClientRect()
    // 最大x
    maxX = parentElRect.width - width
    // 最大y
    maxY = parentElRect.height - height
  }

  const onMousemove = (e: MouseEvent) => {
    let moveX = (e.clientX - downX) / props.scaleRatio + left
    let moveY = (e.clientY - downY) / props.scaleRatio + top

    // 是否开启网格对齐
    if (props.snapToGrid) {
      // 当前位置
      let { left: curX, top: curY } = dragData.value
      // 移动距离
      const diffX = moveX - curX
      const diffY = moveY - curY

      // 计算网格移动距离
      moveX = calcGridMove(diffX, props.gridX, curX)
      moveY = calcGridMove(diffY, props.gridY, curY)
    }

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
 * @param diff 移动的距离
 * @param grid 网格大小
 * @param cur 盒子当前的位置left or top
 */
 function calcGridMove(diff: number, grid: number, cur: number) {
  let result = cur
  // 移动距离超过grid的1/2，累加grid，移动距离为负数减掉相应的grid
  if (Math.abs(diff) > grid / 2) {
    result = cur + (diff > 0 ? grid : -grid)
  }

  return result
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
  const elRect = { ...dragData.value }
  
  const onMousemove = (e: MouseEvent) => {
    // 移动的x距离
    let disX = (e.clientX - downX) / props.scaleRatio
    // 移动的y距离
    let disY = (e.clientY - downY) / props.scaleRatio

    // 开启网格缩放
    if (props.snapToGrid) {
      disX = calcGridResize(disX, props.gridX)
      disY = calcGridResize(disY, props.gridY)
    }

    const [side, position] = dotInfo.side.split('-')

    // 是否是上方缩放圆点
    const hasT = side === 'top'
    // 是否是左方缩放圆点
    const hasL = [side, position].includes('left')
    
    let width = elRect.width + (hasL ? -disX : disX)
    let height = elRect.height + (hasT ? -disY : disY)
    
    // 如果是左侧缩放圆点，修改left位置
    let left = elRect.left + (hasL ? disX : 0)

    // 如果是上方缩放圆点，修改top位置
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

    // 处理逆向缩放
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
    emit('rotate', dragData.value)
  }

  const onMouseup = (_e: MouseEvent) => {
    
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)

    function adjustDotList(angle: number) {

    }
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}
/**
 * @param diff 缩放移动距离
 * @param grid 网格大小
 */
 function calcGridResize(diff: number, grid: number) {
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
</script>

<style lang='scss' scoped>
.es-drager {
  position: absolute;
  z-index: 1000;
  width: 200px;
  height: 120px;
  border: 1px solid var(--es-drager-color, #3a7afe);
  &.selected {
    .es-drager-dot {
      display: block;
    }
  }
  &-dot {
    position: absolute;
    display: none;
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
