<template>
  <div
    ref="skewRef"
    class="es-drager-skew"
    @mousedown="onSkewMousedown"
    @touchstart.passive="onSkewMousedown"
  >
    <slot>
      <div class="es-drager-skew-handle">
        <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M870.679273 271.378618L520.946036 65.489455a16.384 16.384 0 0 0-16.644654 0L154.568145 271.378618a16.290909 16.290909 0 0 0 0 28.094837l349.733237 205.889163a16.384 16.384 0 0 0 16.644654 0L870.679273 299.473455a16.290909 16.290909 0 0 0 0-28.094837zM512.623709 452.673164L228.528873 285.426036l284.094836-167.247127 284.094836 167.247127z m-22.574545 71.68L135.521745 322.615855a16.346764 16.346764 0 0 0-24.482909 14.270836l2.485528 405.820509a16.309527 16.309527 0 0 0 8.257163 14.075345l354.518109 201.728a16.346764 16.346764 0 0 0 24.482909-14.270836l-2.485527-405.820509a16.300218 16.300218 0 0 0-8.247854-14.093964z m-326.888728 198.842181l-2.020072-328.927418 287.529891 163.607273 2.020072 328.936727z m725.336437-400.607418L533.969455 524.325236a16.300218 16.300218 0 0 0-8.247855 14.066037l-2.485527 405.820509a16.365382 16.365382 0 0 0 24.4736 14.270836l354.546036-201.728a16.309527 16.309527 0 0 0 8.257164-14.075345l2.485527-405.820509a16.374691 16.374691 0 0 0-24.501527-14.270837z m-41.890909 373.462109L605.016436 838.683927v-57.902545l241.626764-142.671127v57.902545z m0-98.434327L605.016436 740.2496v-57.911855l241.626764-142.63389v57.911854z m0-98.443636L605.016436 641.833891v-57.902546l241.626764-142.63389v57.902545z"
          />
        </svg>
      </div>
    </slot>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, PropType } from 'vue'
import { getXY, MouseTouchEvent, setupMove } from '../utils'

const props = defineProps({
  modelValue: {
    type: Array as PropType<number[]>,
    default: () => [0, 0]
  },
  element: {
    type: Object as PropType<HTMLElement | null>
  }
})

const emit = defineEmits([
  'update:modelValue',
  'skew',
  'skew-start',
  'skew-end'
])

const skewRef = ref<HTMLElement | null>(null)
const skew = computed({
  get: () => props.modelValue,
  set: val => {
    emit('update:modelValue', val)
  }
})

/**
 * 倾斜
 * @param e
 */
 function onSkewMousedown(e: MouseTouchEvent) {
  if (!props.element) {
    return console.warn('[es-drager] skew component need drag element property')
  }

  e.stopPropagation()

  // 获取元素的宽高
  const { width, height } = props.element.getBoundingClientRect()

  // 获取鼠标按下时的位置
  const { clientX: downX, clientY: downY } = getXY(e)

  // 记录初始的 skew 值
  const [initialSkewX, initialSkewY] = skew.value

  // 触发开始事件
  emit('skew-start', skew.value)

  // 开始拖动
  setupMove(
    (e: MouseTouchEvent) => {
      const { clientX, clientY } = getXY(e)

      // 计算鼠标移动的差值
      const diffX = downX - clientX
      const diffY = downY - clientY

      // 基于初始值累加偏移量
      const skewX = initialSkewX + (diffX / width) * 45
      const skewY = initialSkewY + (diffY / height) * 45

      // 更新 skew 值
      skew.value = [+skewX.toFixed(2), +skewY.toFixed(2)]

      emit('skew', skew.value)
    },
    () => {
      // 触发结束事件
      emit('skew-end', skew.value)
    }
  )
}
</script>

<style lang="scss" scoped>
.es-drager-skew {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(0%, -200%);
  &-handle {
    width: 16px;
    height: 16px;
    font-size: 20px;
    color: var(--es-drager-color);
  }
}
</style>
