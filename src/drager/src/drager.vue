<template>
  <div ref="dragRef" :class="['es-drager', { disabled, dragging: isMousedown }]" :style="dragStyle" @click.stop>
    <slot />
    
    <template v-if="!disabled && zoomable">
      <div v-show="selected">
        <div
          v-for="item, index in dotList"
          :key="index"
          class="es-drager-dot"
          :data-side="item.side"
          :style="{ ...item }"
          @mousedown="onDotMousedown(item, $event)"
        >
        </div>
      </div>
    </template>
    
    <Rotate :visible="!disabled && selected" @rotate-end="handleRotateEnd" />
  </div>
</template>

<script setup lang='ts'>
import { computed, ref, provide } from 'vue'
import { DragerProps, DragData, withUnit, DragContextKey, getDotList, getLength, degToRadian, getNewStyle, centerToTL } from './drager'
import { useDrager, setupMove } from './use-drager'
import Rotate from './rotate.vue'

const props = defineProps(DragerProps)
const emit = defineEmits(['move', 'resize'])
const dragRef = ref<HTMLElement | null>(null)
const { selected, dragData, isMousedown } = useDrager(dragRef, props, emit)

const dotList = ref(getDotList())

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
    '--es-drager-color': props.color
  }
})

function handleRotateEnd(angle: number) {
  // cursorList.value = getNewCursorArray(angle)
  console.log(angle, 'angle')
  dragData.value.angle = angle
  dotList.value = getDotList(angle)
}

/**
 * 缩放
 * @param dotInfo 
 * @param e 
 */
function onDotMousedown(dotInfo: any, e: MouseEvent) {
  e.stopPropagation()
  e.preventDefault()
  // 获取鼠标按下的坐标
  const downX = e.clientX
  const downY = e.clientY
  const { width = 0, height = 0, left = 0, top = 0 } = dragData.value

  const centerX = left + width / 2
  const centerY = top + height / 2
  const rect = { width, height, centerX, centerY, rotateAngle: dragData.value.angle }
  const type = dotInfo.side
  const { minWidth, minHeight, aspectRatio } = props

  const formatData = (data: DragData, centerX: number, centerY: number) => {
    const { width, height } = data
    return {
      width: Math.abs(width),
      height: Math.abs(height),
      left: centerX - Math.abs(width) / 2,
      top: centerY - Math.abs(height) / 2
    }
  }

  const onMousemove = (e: MouseEvent) => {

    const { clientX, clientY } = e
    const deltaX = clientX - downX
    const deltaY = clientY - downY
    const alpha = Math.atan2(deltaY, deltaX)
    const deltaL = getLength(deltaX, deltaY)
    const isShiftKey = e.shiftKey

    const beta = alpha - degToRadian(rect.rotateAngle)
    const deltaW = deltaL * Math.cos(beta)
    const deltaH = deltaL * Math.sin(beta)
    const ratio = isShiftKey && !aspectRatio ? rect.width / rect.height : aspectRatio
    const {
      position: { centerX, centerY },
      size: { width, height }
    } = getNewStyle(type, { ...rect, rotateAngle: rect.rotateAngle }, deltaW, deltaH, ratio, minWidth, minHeight)
   
    const pData = centerToTL({ centerX, centerY, width, height, angle: dragData.value.angle })

    dragData.value = { ...dragData.value, ...formatData(pData, centerX, centerY) }

    console.log(dragData.value, 'dragData.value')
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
  border: 1px solid var(--es-drager-color, #3a7afe);
  &.dragging {
    user-select: none;
  }
  &.disabled {
    opacity: 0.4;
    cursor: not-allowed !important;
  }
  &:hover {
    cursor: move;
  }
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
}
</style>
