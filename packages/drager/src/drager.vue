<template>
  <component
    :is="tag"
    :ref="setRef"
    :class="[
      'es-drager',
      `es-drager-${type}`,
      { disabled, dragging: isMousedown, selected, border }
    ]"
    :style="dragStyle"
    @click.stop
    @mousedown.stop
  >
    <slot />

    <template v-if="showResize">
      <div
        v-for="(item, index) in dots"
        :key="index"
        class="es-drager-dot"
        :data-side="item.side"
        :style="{ ...item }"
        @mousedown="onDotMousedown(item, $event)"
        @touchstart.passive="onDotMousedown(item, $event)"
      >
        <slot name="resize" v-bind="{ side: item.side }">
          <div class="es-drager-dot-handle"></div>
        </slot>
      </div>
    </template>

    <Rotate
      v-if="showRotate"
      v-model="dragData.angle"
      :dragData="dragData"
      :boundary="props.boundary"
      :getBoundary="getBoundary"
      :element="dragRef"
      @rotate="emitFn('rotate', dragData)"
      @rotate-start="emitFn('rotate-start', dragData)"
      @rotate-end="handleRotateEnd"
    >
      <slot name="rotate" />
    </Rotate>
  </component>
</template>

<script setup lang="ts">
import {
  computed,
  ref,
  watch,
  ComponentPublicInstance,
  CSSProperties
} from 'vue'
import { DragData, DragerProps, EventType } from './drager'
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
const emit = defineEmits([
  'change',
  'drag',
  'drag-start',
  'drag-end',
  'resize',
  'resize-start',
  'resize-end',
  'rotate',
  'rotate-start',
  'rotate-end',
  'focus',
  'blur'
])
const emitFn = (type: EventType, ...args: any) => {
  emit(type, ...args)
}
const dragRef = ref<HTMLElement | null>(null)
const { selected, dragData, isMousedown, getBoundary, checkDragerCollision } = useDrager(
  dragRef,
  props,
  emitFn
)

const dotList = ref(getDotList(0, props.resizeList))
const showResize = computed(() => props.resizable && !props.disabled)
const showRotate = computed(
  () => props.rotatable && !props.disabled && selected.value
)

const dots = computed(() => {
  return props.type != 'text' ? dotList.value : dotList.value.filter(d => !['top', 'bottom'].includes(d.side))
})

const dragStyle = computed(() => {
  const { width, height, left, top, angle } = dragData.value
  const style: CSSProperties = {}

  if (width) style.width = withUnit(width)
  if (height) {
    if (props.type === 'text') {
      style.fontSize = height + 'px'
    } else {
      style.height = withUnit(height)
    }
  }
  let transform: string[] = [
    `translateX(${withUnit(left)})`,
    `translateY(${withUnit(top)})`,
    `rotate(${angle}deg)`,
  ]

  return {
    ...style,
    // left: withUnit(left),
    // top: withUnit(top),
    zIndex: props.zIndex,
    transform: transform.join(' '),
    '--es-drager-color': props.color,
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
  if (props.disabled) return
  e.stopPropagation()
  // 获取鼠标按下的坐标
  const { clientX, clientY } = getXY(e)
  const downX = clientX
  const downY = clientY
  const { width, height, left, top } = dragData.value

  // 中心点
  const centerX = left + width / 2
  const centerY = top + height / 2

  const rect = {
    width,
    height,
    centerX,
    centerY,
    rotateAngle: dragData.value.angle
  }
  const type = dotInfo.side

  let { minWidth, minHeight, aspectRatio, equalProportion } = props
  emitFn('resize-start', dragData.value, type)
  let boundaryInfo: number[] = []
  if (props.boundary) {
    boundaryInfo = getBoundary()
  }

  if (['text', 'image'].includes(props.type) && type.includes('-')) {
    aspectRatio = rect.width / rect.height
  }

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

    const ratio =
      (equalProportion || isShiftKey) && !aspectRatio
        ? rect.width / rect.height
        : aspectRatio

    const {
      position: { centerX, centerY },
      size: { width, height }
    } = getNewStyle(
      type,
      { ...rect, rotateAngle: rect.rotateAngle },
      deltaW,
      deltaH,
      ratio,
      minWidth,
      minHeight
    )

    const pData = centerToTL({
      centerX,
      centerY,
      width,
      height,
      angle: dragData.value.angle
    })

    let d = {
      ...dragData.value,
      ...formatData(pData, centerX, centerY)
    }

    // 最大宽高限制
    if (props.maxWidth > 0) {
      d.width = Math.min(d.width, props.maxWidth)
    }
    if (props.maxHeight > 0) {
      d.height = Math.min(d.height, props.maxHeight)
    }

    // 如果开启了边界，则调用 fixResizeBoundary 函数处理
    if (props.boundary) {
      d = fixResizeBoundary(d, boundaryInfo, ratio)
    }

    dragData.value = d
    emitFn('resize', dragData.value, type)
  }

  setupMove(onMousemove, () => {
    // 碰撞检测
    if (props.checkCollision && checkDragerCollision()) {
      // 发生碰撞回到原来位置
      dragData.value = { ...dragData.value, width, height, left, top }
    }
    emitFn('resize-end', dragData.value, type)
  })
}

function fixResizeBoundary(d: DragData, boundaryInfo: number[], ratio: number | undefined) {
  const [minX, maxX, minY, maxY, parentWidth, parentHeight] = boundaryInfo

  const isMinLeft = d.left < minX // 如果left小于最小x
  const isMaxLeft = d.left + d.width > parentWidth // 如果left+width超过了父元素的宽度

  const isMinTop = d.top < minY // top的做法与上面类似，如果小于最小y
  const isMaxTop = d.top + d.height > parentHeight // 如果top+height超过了父元素的高度

  if (isMinLeft) {
    // 则将left赋值为最小x
    d.left = minX
    // 宽度保持原来的不变
    d.width = dragData.value.width
  }

  if (isMinTop) {
    // 则将top赋值为最小y
    d.top = minY
    // 高度保持原来的不变
    d.height = dragData.value.height
  }

  if (isMaxLeft || isMaxTop) {
    // 解决issue:#39
    if (isMaxLeft) {
      // 将left赋值为老的left
      d.left = dragData.value.left
    }

    if (isMaxTop) {
      // 将top赋值为老的top
      d.top = dragData.value.top
    }

    if (!isMaxTop) {
      // 宽度变为parentWidth减去left，这样元素的left+width的和刚好等于parentWidth
      d.width = parentWidth - d.left
    }

    if (!isMaxLeft) {
      // 宽度变为parentHeight减去top，这样元素的top+height的和刚好等于parentHeight
      d.height = parentHeight - d.top
    }
  }

  if ((isMaxTop || isMinTop) && ratio) { // top超出并且等比缩放
    // width、left需要复原
    d.width = dragData.value.width
    d.left = dragData.value.left
  }

  if ((isMaxLeft || isMinLeft) && ratio) { // left超出并且等比缩放
    // height、top需要复原
    d.height = dragData.value.height
    d.top = dragData.value.top
  }
  return d
}

watch(
  () => [props.width, props.height, props.left, props.top, props.angle],
  ([width, height, left, top, angle], [oldWidth, oldHeight, oldLeft, oldTop, oldAngle]) => {
    if (width !== oldWidth) {
      dragData.value.width = width
    }
    if (height !== oldHeight) {
      dragData.value.height = height
    }
    if (left !== oldLeft) {
      dragData.value.left = left
    }
    if (top !== oldTop) {
      dragData.value.top = top
    }
    if (angle !== oldAngle) {
      dragData.value.angle = angle
    }
  }
)

watch(
  () => dragData.value,
  (val) => {
    emit('change', { ...val })
  },
  { deep: true }
)

watch(
  () => props.selected,
  val => {
    selected.value = val
  },
  { immediate: true }
)

</script>

<style lang="scss">
.es-drager {
  --es-drager-color: #3a7afe;
  position: absolute;
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: none;
  }
  &.selected {
    transition: none;
    &:not(.es-drager-text)::after {
      user-select: none;
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
    &-handle {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: var(--es-drager-color);
    }

    &[data-side='left'], &[data-side='right'] {
      .es-drager-dot-handle {
        width: 8px;
        height: 16px;
        border-radius: 8px;
      }
    }

    &[data-side='top'], &[data-side='bottom'] {
      .es-drager-dot-handle {
        width: 16px;
        height: 8px;
        border-radius: 8px;
      }
    }

    &[data-side*='right'] {
      transform: translate(50%, -50%);
    }
    &[data-side*='bottom'] {
      transform: translate(-50%, 50%);
    }
    &[data-side='bottom-right'] {
      transform: translate(50%, 50%);
    }
  }
}
</style>
