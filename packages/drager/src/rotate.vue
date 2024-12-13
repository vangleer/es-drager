<template>
  <div
    ref="rotateRef"
    class="es-drager-rotate"
    @mousedown="onRotateMousedown"
    @touchstart.passive="onRotateMousedown"
  >
    <slot>
      <div class="es-drager-rotate-handle">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"
          />
        </svg>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { getXY, MouseTouchEvent, setupMove, getRotatedBounds } from './utils'
import { DragData } from './drager'

const props = defineProps({
  getBoundary: {
    type: Function as PropType<() => number[]>
  },
  dragData: {
    type: Object as PropType<DragData>
  },
  boundary: Boolean,
  modelValue: {
    type: Number,
    default: 0
  },
  element: {
    type: Object as PropType<HTMLElement | null>
  }
})

const emit = defineEmits([
  'update:modelValue',
  'rotate',
  'rotate-start',
  'rotate-end'
])

const currentRotate = ref(0)
const rotateRef = ref<HTMLElement | null>(null)
const angle = computed({
  get: () => props.modelValue,
  set: val => {
    emit('update:modelValue', val)
  }
})

const fixRotateBoundary = (
  d: DragData,
  boundaryInfo: number[],
  newAngle: number
): number => {
  const [minX, widthBound, minY, heightBound, parentWidth, parentHeight] =
    boundaryInfo
  const maxX = parentWidth
  const maxY = parentHeight

  // 检查是否越界
  const isOutOfBoundary = (angle: number) => {
    // 获取旋转后的边界
    const { rotatedMinX, rotatedMaxX, rotatedMinY, rotatedMaxY } =
      getRotatedBounds(d, angle)
    // 这里要使用旧的angle
    const radian = (d.angle * Math.PI) / 180
    // 检查是否在边界内
    const isXWithinBounds =
      rotatedMinX >= minX * Math.sin(radian) && rotatedMaxX <= maxX
    const isYWithinBounds =
      rotatedMinY >= minY * Math.sin(radian) && rotatedMaxY <= maxY
    return !(isXWithinBounds && isYWithinBounds)
  }

  if (!isOutOfBoundary(newAngle)) {
    // 旋转角度在范围内, 就记住当前角度
    currentRotate.value = newAngle
  } else {
    // console.log('越界')
  }
  return currentRotate.value
}

/**
 * 旋转
 * @param e
 */
function onRotateMousedown(e: MouseTouchEvent) {
  if (!props.element)
    return console.warn(
      '[es-drager] rotate component need drag element property'
    )
  e.stopPropagation()

  const { width, height, left, top } = props.element.getBoundingClientRect()
  // 旋转中心位置
  const centerX = left + width / 2
  const centerY = top + height / 2

  emit('rotate-start', angle.value)
  setupMove(
    (e: MouseTouchEvent) => {
      const { clientX, clientY } = getXY(e)
      const diffX = centerX - clientX
      const diffY = centerY - clientY

      // Math.atan2(y,x) 返回x轴到(x,y)的角度 // pi值
      const radians = Math.atan2(diffY, diffX)

      const deg = (radians * 180) / Math.PI - 90
      let newAngle = (deg + 360) % 360
      if (props.boundary) {
        let boundaryInfo = props.getBoundary!()
        newAngle = fixRotateBoundary(props.dragData!, boundaryInfo, newAngle)
      }
      angle.value = newAngle
      emit('rotate', angle.value)
    },
    () => {
      emit('rotate-end', angle.value)
    }
  )
}
</script>

<style lang="scss">
.es-drager-rotate {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -200%);
  &-handle {
    width: 16px;
    height: 16px;
    font-size: 20px;
    color: var(--es-drager-color);
  }
}
</style>

function getBoundary() { throw new Error('Function not implemented.') } function
getBoundary() { throw new Error('Function not implemented.') }
