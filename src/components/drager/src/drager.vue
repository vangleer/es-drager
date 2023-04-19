<template>
  <div ref="dragRef" class="es-drager">
    <slot />
    
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
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import { IDot } from './drager'
import { useDrager } from './use-drager'
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

const props = defineProps({
  teleport: {
    type: String,
    default: '.es-paint-box'
  }
})
const dragRef = ref<HTMLElement | null>(null)
const { selected } = useDrager(dragRef, props)

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

// 按下小圆点
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

  const onMouseup = (e: MouseEvent) => {
    document.removeEventListener('mousemove', onMousemove)
    document.removeEventListener('mouseup', onMouseup)
  }
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}
</script>

<style lang='scss' scoped>
.es-drager {
  position: absolute;
  z-index: 1000;
  width: 200px;
  height: 120px;
  border: 1px solid #ccc;
  &:hover {
    cursor: move;
  }
  &-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: yellowgreen;
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
}
</style>
