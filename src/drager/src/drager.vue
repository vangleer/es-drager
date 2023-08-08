<template>
  <component
    :is="tag"
    :ref="setRef"
    :class="['es-drager', { disabled, dragging: isMousedown, selected, border }]"
    :style="dragStyle"
    @click.stop
  >
    <slot />
    
    <template v-if="showResize">
      <div
        v-for="item, index in dotList"
        :key="index"
        class="es-drager-dot"
        :data-side="item.side"
        :style="{ ...item }"
        @mousedown.stop.prevent="onDotMousedown(item, $event)"
        @touchstart="onDotMousedown(item, $event)"
      >
        <slot name="resize" v-bind="{ side: item.side }">
          <div class="es-drager-dot-handle"></div>
        </slot>
      </div>
    </template>
    
    <Rotate
      v-if="showRotate"
      v-model="dragData.angle"
      :drag-data="dragData"
      :element="dragRef"
      @rotate="emitFn('rotate', dragData)"
      @rotate-start="emitFn('rotate-start', dragData)"
      @rotate-end="handleRotateEnd"
    >
      <slot name="rotate" />
    </Rotate>
  </component>
</template>

<script setup lang='ts'>
import { computed, ref, watch, ComponentPublicInstance, CSSProperties } from 'vue'
import {
  DragerProps,
  EventType
} from './drager'
import { useDrager } from './use-drager'
import {
  formatData,
  withUnit,
  getDotList,
  getLength,
  degToRadian,
  getNewStyle,
  centerToTL,
  calcGrid,
  setupMove,
  getXY,
  MouseTouchEvent
} from './utils'
import Rotate from './rotate.vue'

const props = defineProps(DragerProps)
const emit = defineEmits(['change', 'drag', 'drag-start', 'drag-end', 'resize', 'resize-start', 'resize-end', 'rotate', 'rotate-start', 'rotate-end'])
const emitFn = (type: EventType, ...args: any) => {
  emit(type, ...args)
  emit('change', ...args)
}
const dragRef = ref<HTMLElement | null>(null)
const { selected, dragData, isMousedown } = useDrager(dragRef, props, emitFn)

const dotList = ref(getDotList(0, props.resizeList))
const showResize = computed(() => props.resizable && !props.disabled)
const showRotate = computed(() => props.rotatable && !props.disabled && selected.value)

const dragStyle = computed(() => {
  const { width, height, left, top, angle } = dragData.value
  const style: CSSProperties = {}
  if (width) style.width = withUnit(width)
  if (height) style.height = withUnit(height)
  return {
    ...style,
    left: withUnit(left),
    top: withUnit(top),
    zIndex: props.zIndex,
    transform: `rotate(${angle}deg)`,
    '--es-drager-color': props.color
  }
})
function setRef(el: ComponentPublicInstance | HTMLElement) {
  if (dragRef.value) return
  dragRef.value = (el as ComponentPublicInstance).$el || el
}
function handleRotateEnd(angle: number) {
  dotList.value = getDotList(angle, props.resizeList)
  emitFn('rotate-end', dragData.value)
}

/**
 * 缩放
 * @param dotInfo 
 * @param e 
 */
function onDotMousedown(dotInfo: any, e: MouseTouchEvent) {
  e.stopPropagation()
  e.preventDefault()
  // 获取鼠标按下的坐标
  const { clientX, clientY } = getXY(e)
  const downX = clientX
  const downY = clientY
  const { width, height, left, top } = dragData.value

  // 中心点
  const centerX = left + width / 2
  const centerY = top + height / 2

  const rect = { width, height, centerX, centerY, rotateAngle: dragData.value.angle }
  const type = dotInfo.side

  const { minWidth, minHeight, aspectRatio } = props
  emitFn('resize-start', dragData.value)

  const onMousemove = (e: MouseTouchEvent) => {

    const { clientX, clientY } = getXY(e)
    // 距离
    let deltaX = (clientX - downX) / props.scaleRatio
    let deltaY = (clientY - downY) / props.scaleRatio
    // 开启网格缩放
    if (props.snapToGrid) {
      deltaX = calcGrid(deltaX, props.gridX)
      deltaY = calcGrid(deltaY, props.gridY)
    }

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
   
    const pData = centerToTL({
      centerX,
      centerY,
      width,
      height,
      angle: dragData.value.angle
    })

    dragData.value = {
      ...dragData.value,
      ...formatData(pData, centerX, centerY)
    }
    emitFn('resize', dragData.value)
  }

  setupMove(onMousemove, () => {
    emitFn('resize-end', dragData.value)
  })
}

watch(() => [
  props.width,
  props.height,
  props.left,
  props.top,
  props.angle
], ([width, height, left, top, angle]) => {
  dragData.value = {
    ...dragData.value,
    width,
    height,
    left,
    top,
    angle
  }
})

watch(() => props.selected, (val) => {
  selected.value = val
}, { immediate: true })

</script>

<style lang='scss'>
.es-drager {
  --es-drager-color: #3a7afe;
  position: absolute;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
  }
  &.selected {
    transition: none;
    &::after {
      display: block;
      outline: 1px dashed var(--es-drager-color);
    }
    .es-drager-dot {
      display: block;
    }
  }
  &.border {
    border: 1px solid var(--es-drager-color);
  }
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
    display: none;
    position: absolute;
    z-index: 1;
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

    &-handle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--es-drager-color);
    }
  }
}
</style>
