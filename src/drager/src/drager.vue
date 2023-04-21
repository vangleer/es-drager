<template>
  <div ref="dragRef" class="es-drager" :style="dragStyle" @click.stop>
    <slot />
    
    <div v-if="zoomable" v-show="selected">
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

    <Rotate :visible="true" />
  </div>
</template>

<script setup lang='ts'>
import { computed, ref, provide } from 'vue'
import { DragerProps, IDot, withUnit, dotList, DragContextKey, getDotStyle } from './drager'
import { useDrager, setupMove } from './use-drager'
import Rotate from './rotate.vue'
const props = defineProps(DragerProps)
const emit = defineEmits(['move', 'resize'])

const dragRef = ref<HTMLElement | null>(null)
const { selected, dragData } = useDrager(dragRef, props, emit)

provide(DragContextKey, {
  dragRef
})

const dragStyle = computed(() => {
  const { width, height, left, top } = dragData.value
  return {
    width: withUnit(width),
    height: withUnit(height),
    left: withUnit(left),
    top: withUnit(top),
    '--es-drag-color': props.color
  }
})

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

    dragData.value = { left, top, width, height }
    emit('resize', dragData.value)
  }

  setupMove(onMousemove)
}

</script>

<style lang='scss'>
.es-drager {
  position: absolute;
  z-index: 1000;
  width: 200px;
  height: 120px;
  border: 1px solid var(--es-drag-color, #3a7afe);
  &:hover {
    cursor: move;
  }
  &-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--es-drag-color, #3a7afe);
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
