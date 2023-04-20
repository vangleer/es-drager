<template>
  <Teleport :to="teleport">
    <div ref="dragRef" class="es-drager" :style="dragStyle">
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

        <div
          v-if="rotatable"
          ref="rotateRef"
          class="es-drager-rotate"
          @mousedown="onRotateMousedown"
        >
          <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M784.512 230.272v-50.56a32 32 0 1 1 64 0v149.056a32 32 0 0 1-32 32H667.52a32 32 0 1 1 0-64h92.992A320 320 0 1 0 524.8 833.152a320 320 0 0 0 320-320h64a384 384 0 0 1-384 384 384 384 0 0 1-384-384 384 384 0 0 1 643.712-282.88z"/></svg>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import { DragerProps, IDot, withUnit, dotList } from './drager'
import { useDrager, setupMove } from './use-drager'

const props = defineProps(DragerProps)
const emit = defineEmits(['move', 'resize'])

const dragRef = ref<HTMLElement | null>(null)
const rotateRef = ref<HTMLElement | null>(null)
const angle = ref(0)
const { selected } = useDrager(dragRef, props)

const dragStyle = computed(() => {
  return {
    width: withUnit(props.width),
    height: withUnit(props.height),
    left: withUnit(props.left),
    top: withUnit(props.top),
    '--es-drag-color': props.color
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
    el.style.width = `${width}px`
    el.style.height = `${height}px`
    el.style.left = `${left}px`
    el.style.top = `${top}px`
  }

  setupMove(onMousemove)
}

/**
 * 旋转
 * @param e 
 */
function onRotateMousedown(e: MouseEvent) {
  e.stopPropagation()
  e.preventDefault()
  const el = dragRef.value!
  const elRect = el.getBoundingClientRect()
  // 旋转中心位置
  const centerX = elRect.left + elRect.width / 2
  const centerY = elRect.top + elRect.height / 2

  setupMove((e: MouseEvent) => {

    const diffX = centerX - e.clientX
    const diffY = centerY - e.clientY
    // Math.atan2(y,x) 返回x轴到(x,y)的角度 // pi值
    const radians = Math.atan2(diffY, diffX)

    angle.value = radians * 180 / Math.PI - 90 // 角度
    el.style.transform = `rotate(${angle.value}deg)`
  })
}

</script>

<style lang='scss'>
.es-drager {
  position: absolute;
  z-index: 1000;
  width: 200px;
  height: 120px;
  border: 1px solid var(--es-drag-color);
  &:hover {
    cursor: move;
  }
  &-dot {
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: var(--es-drag-color);
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
    color: var(--es-drag-color);
    font-size: 20px;
  }
}
</style>
