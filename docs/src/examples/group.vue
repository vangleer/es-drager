<template>
  <div class="es-container">
    <div class="es-tools">
      <el-button type="primary" @click="makeGroup">组合</el-button>
      <el-button type="primary" @click="cancelGroup">拆分</el-button>
    </div>
    <div class="es-editor" @mousedown="onEditorMouseDown">
      <Drager
        v-for="item, index in data.componentList"
        v-bind="item"
        @drag-start="onDragstart(index)"
        @drag="onDrag($event)"
        @change="onChange($event, item)"
        @click.stop
        @mousedown.stop
      >
        <component
          :is="item.component!"
          v-bind="item.props"
          :style="{
            ...item.style,
            width: '100%',
            height: '100%'
          }"
        >
          {{ item.text }}
        </component>
      </Drager>

      <GridRect />
      <Area ref="areaRef" @move="onAreaMove" @up="onAreaUp" />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import GridRect from '@/components/editor/GridRect.vue'
import Drager, { DragData } from 'es-drager'
import Area from '@/components/editor/Area.vue'
import { ComponentType } from '@/components/types'

interface EditorState {
  componentList: ComponentType[]
}

const data = ref<EditorState>({
  componentList: [
    {
      component: 'div',
      text: 'div1',
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      style: { border: '1px solid #3a7afe' }
    },
    {
      component: 'div',
      text: 'div2',
      width: 100,
      height: 100,
      top: 200,
      left: 300,
      style: { border: '1px solid #3a7afe' }
    }
  ]
})
const currentIndex = ref(-1)
const areaRef = ref()
// 每次拖拽移动的距离
const areaSelected = ref(false)
const extraDragData = ref({
  prevLeft: 0,
  prevTop: 0
})

function onDragstart(index: number) {
  if (!areaSelected.value) { // 如果是区域选中状态
    // 将上一次移动元素变为非选
    data.value.componentList.forEach((item: ComponentType) => item.selected = false)
  }
 
  const current = data.value.componentList[index]
  // 选中当前元素
  current.selected = true
  // 记录按下的数据，为了计算多个选中时移动的距离
  extraDragData.value.prevLeft = current.left!
  extraDragData.value.prevTop = current.top!

  currentIndex.value = index
}

function onDrag(dragData: DragData) {
  const disX = dragData.left - extraDragData.value.prevLeft
  const disY = dragData.top - extraDragData.value.prevTop


  // 如果选中了多个
  data.value.componentList.forEach((item: ComponentType, index: number) => {
    if (item.selected && currentIndex.value !== index) {
      item.left! += disX
      item.top! += disY
    }
  })

  extraDragData.value.prevLeft = dragData.left
  extraDragData.value.prevTop = dragData.top
}

function onChange(dragData: DragData, item: ComponentType) {
  Object.keys(dragData).forEach((key) => {
    item[key as keyof DragData] = dragData[key as keyof DragData]
  })
}

// 编辑器鼠标按下事件
function onEditorMouseDown(e: MouseEvent) {
  let flag = false
  data.value.componentList.forEach((item: ComponentType) => {
    // 如果有选中的元素，取消选中
    if (item.selected) {
      item.selected = false
      flag = true
    }
  })
  if (!flag) {
    areaRef.value.onMouseDown(e)
  }
}

function onAreaMove(areaData: DragData) {
  for (let i = 0; i < data.value.componentList.length; i++) {
    const item = data.value.componentList[i] as Required<ComponentType>
    // 包含left
    const containLeft = areaData.left < item.left && areaData.left + areaData.width > item.left + item.width
    // 包含top
    const containTop = areaData.top < item.top && areaData.top + areaData.height > item.top + item.height
    if (containLeft && containTop) {
      item.selected = true
    } else {
      item.selected = false
    }
  }
}

// 松开区域选择
function onAreaUp() {
  areaSelected.value = data.value.componentList.some((item: ComponentType) => item.selected)

  // 如果区域有选中元素
  if (areaSelected.value) {
    setTimeout(() => {
      document.addEventListener('click', () => {
        areaSelected.value = false
      }, { once: true })
    })
  }
}

// 组合元素
function makeGroup() {
  const selectedElements = data.value.componentList.filter(item => item.selected)

  if (!selectedElements.length) return
  // 设第一个元素的位置为最大和最小
  let { left: minLeft, top: minTop } = selectedElements[0] as Required<ComponentType>
  let maxLeft = minLeft, maxTop = minTop

  Math.max(...selectedElements.map(item => item.left!))
  selectedElements.slice(1).forEach(item => {
    const { left, top, width, height } = item as Required<ComponentType>
    // 最小left
    minLeft = Math.min(minLeft, left)
    // 最大top
    maxLeft = Math.max(maxLeft, left + width)
   
    // 最小top
    minTop = Math.min(minTop, top)
    // 最大top
    maxTop = Math.max(maxTop, top + height)
  })

  selectedElements.forEach(item => {
    item.left = item.left! - minLeft
    item.top = item.top! - minTop
  })
  
  const dragData = {
    left: minLeft,
    top: minTop,
    width: maxLeft - minLeft, // 宽度 = 最大left - 最小left
    height: maxTop - minTop, // 高度 = 最大top - 最小top
  }
  const groupElement: ComponentType = {
    component: 'es-group',
    group: true,
    ...dragData,
    props: {
      elements: selectedElements
    }
  }

  const newElements = data.value.componentList.filter(item => !item.selected)
  
  data.value.componentList = [...newElements, groupElement]
}

// 取消组合
function cancelGroup() {
  const current = data.value.componentList[currentIndex.value]
  if (!current || current.component !== 'es-group') {
    return
  }
  const items = current.props.elements as ComponentType[]

  const newElements = items.map(item => {
    return {
      ...item,
      selected: false,
      left: item.left! + current.left!,
      top: item.top! + current.top!,
      angle: (item.angle! || 0) + (current.angle! || 0),
    }
  })

  const list = data.value.componentList.filter(item => item !== current)

  data.value.componentList = [...list, ...newElements]
}
</script>

<style lang='scss' scoped>
.es-container {
  width: 800px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
  .es-editor {
    position: relative;
    width: 800px;
    height: 600px;
  }
}

.es-tools {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>