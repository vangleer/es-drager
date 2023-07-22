<template>
  <div v-show="show" class="es-editor-area" :style="areaStyle"></div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'

const emit = defineEmits(['move', 'up'])

const show = ref(false)
const areaData = ref({
  width: 0,
  height: 0,
  top: 0,
  left: 0
})
const areaStyle = computed(()=> {
  const { width, height, top, left } = areaData.value
  return {
    width: width + 'px',
    height: height + 'px',
    top: top + 'px',
    left: left + 'px'
  }
})

function onMouseDown(e: MouseEvent) {
  show.value = true
  // 鼠标按下的位置
  const { pageX: downX, pageY: downY } = e;
  const elRect = (e.target as HTMLElement)!.getBoundingClientRect()

  console.log(downX, downY, elRect, 'elRectelRect')
  // 鼠标在编辑器中的偏移量
  const offsetX = downX - elRect.left
  const offsetY = downY - elRect.top

  const onMouseMove = (e: MouseEvent) => {
    // 移动的距离
    const disX = e.pageX - downX
    const disY = e.pageY - downY

    // 得到默认的left、top
    let left = offsetX, top = offsetY
    // 宽高取鼠标移动距离的绝对值
    let width = Math.abs(disX), height = Math.abs(disY)

    // 如果往左，将left减去增加的宽度
    if (disX < 0) {
      left = offsetX - width
    }

    // 如果往上，将top减去增加的高度
    if (disY < 0) {
      top = offsetY - height
    }

    areaData.value = {
      width,
      height,
      left,
      top
    }

    emit('move', { ...areaData.value })
  }

  const onMouseUp = () => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)

    show.value = false
    areaData.value = {
      width: 0,
      height: 0,
      top: 0,
      left: 0
    }

    emit('up', areaData.value)
  }
  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
}

defineExpose({
  onMouseDown,
  areaData
})
</script>

<style lang='scss' scoped>
.es-editor-area {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100px;
  height: 100px;
  border: 1px dashed var(--el-color-primary);
  background-color: rgba(var(--el-color-primary-rgb), .1);
}
</style>
