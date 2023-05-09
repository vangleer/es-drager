<template>
  <div
    ref="rotateRef"
    class="es-drager-rotate"
    @mousedown="onRotateMousedown"
  >
    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"/></svg>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, PropType } from 'vue'
import { DragData } from './drager'
import { setupMove } from './use-drager'

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0
  },
  dragData: {
    type: Object as PropType<DragData>,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'rotate', 'rotate-start', 'rotate-end'])

const rotateRef = ref<HTMLElement | null>(null)
const angle = computed({
  get: () => props.modelValue,
  set: (val) => {
    console.log(val, 123456)
    emit('update:modelValue', val)
  }
})

/**
 * 旋转
 * @param e 
 */
function onRotateMousedown(e: MouseEvent) {
  e.stopPropagation()
  e.preventDefault()
  const { width, height, left, top } = props.dragData
  // 旋转中心位置
  const centerX = left + width / 2
  const centerY = top + height / 2
  
  emit('rotate-start', angle.value)
  setupMove((e: MouseEvent) => {

    const diffX = centerX - e.clientX
    const diffY = centerY - e.clientY
    // Math.atan2(y,x) 返回x轴到(x,y)的角度 // pi值
    const radians = Math.atan2(diffY, diffX)

    const deg = radians * 180 / Math.PI - 90
    angle.value = (deg + 360) % 360

    emit('rotate', angle.value)
  }, () => {
    emit('rotate-end', angle.value)
  })
}

</script>

<style lang='scss'>
.es-drager-rotate {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -200%);
  width: 16px;
  height: 16px;
  color: var(--es-drager-color);
  font-size: 20px;
}
</style>
