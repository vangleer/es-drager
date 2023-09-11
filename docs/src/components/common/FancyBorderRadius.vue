<template>
  <div class="es-fancy-border-radius">
    <slot />
    <div
      v-for="item in handleList"
      :class="['handle', item.side]"
      :style="{
        left: item.left + '%',
        top: item.top + '%'
      }"
      @mousedown="onMouseDown(item, $event)"
    >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
type HandleType = {
  side: string
  left?: number
  top?: number
}

const emit = defineEmits(['change'])

const borderRadius = ref('')

// 初始化边框调整小点的位置和类型
const handleList = ref<HandleType[]>([
  { side: 'left', top: 100 },
  { side: 'top' },
  { side: 'right', left: 100 },
  { side: 'bottom', left: 100, top: 100 }
])

function onMouseDown(handle: HandleType, e: MouseEvent) {
  e.preventDefault()
  // 获取目标元素
  const target = e.target as HTMLElement
  // 获取父元素
  const parent = target.parentElement
  const parentRect = parent?.getBoundingClientRect()!

  // 是否在水平方向上移动
  const isAxisX = ['top', 'bottom'].includes(handle.side)
  
  const onMouseMove = (e: MouseEvent) => {
    // 计算移动的距离，将其转换为百分比
    let disX = (e.clientX - parentRect.left) * 100 / parentRect.width
    let disY = (e.clientY - parentRect.top) * 100 / parentRect.height

    // 处理边界问题
    disX = Math.min(100, Math.max(0, disX))
    disY = Math.min(100, Math.max(0, disY))

    if (isAxisX) {
      handle.left = disX
    } else {
      handle.top = disY
    }

    // 更新borderRadius
    updateRudius()
  }

  const onMouseUp = (e: MouseEvent) => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
  }

  // 注册事件
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

function updateRudius() {

  const state = handleList.value.reduce((map, item) => {
    const isAxisX = ['top', 'bottom'].includes(item.side)
    if (isAxisX) {
      map[item.side] = item.left || 0
    } else {
      map[item.side] = item.top || 0
    }
    return map
  }, {} as any)

  let brd = state.top + '% '
  brd += (100 - state.top) + '% '
  brd += (100 - state.bottom) + '% '
  brd += state.bottom + '% / '

  brd += state.left + '% '
  brd += state.right + '% '
  brd += (100 - state.right) + '% '
  brd += (100 - state.left) + '% '
  borderRadius.value = brd

  emit('change', borderRadius.value)
}

</script>

<style scoped lang="scss">
.es-fancy-border-radius {
  display: inline-flex;
  position: relative;
  border: 2px dashed var(--es-border-color);
  
  .handle {
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: var(--el-color-primary);
    cursor: pointer;
    transition: transform 0.2s;
    
    &.right {
      left: 100%;
    }
    &.bottom {
      top: 100%;
      left: 100%;
    }

    &.left {
      top: 100%;
    }
  }
}
</style>
