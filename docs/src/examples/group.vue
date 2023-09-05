<template>
  <div class="es-container">
    <div class="es-tools">
      <el-button type="primary" @click="handleMakeGroup">{{
        t('examples.group')
      }}</el-button>
      <el-button type="primary" @click="handleCancelGroup">{{
        t('examples.unGroup')
      }}</el-button>
    </div>
    <div ref="editorRef" class="es-editor" @mousedown="onEditorMouseDown">
      <Drager
        v-for="(item, index) in data.elements"
        v-bind="item"
        rotatable
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

<script setup lang="ts">
import { computed, ref } from 'vue'
import GridRect from '@/components/editor/GridRect.vue'
import Drager, { DragData } from '../../../src/drager'
import Area from '@/components/editor/Area.vue'
import { ComponentType, EditorType } from '@/components/types'
import { useId, makeGroup, cancelGroup } from '@/utils'
import { useArea } from '@/hooks/useArea'
import { t } from '@/plugins/locales'
const data = ref<EditorType>({
  container: {
    gridSize: 10,
    markline: {},
    snapToGrid: true,
    style: {}
  },
  elements: [
    {
      id: useId(),
      component: 'div',
      text: 'div1',
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      style: { border: '1px solid #3a7afe' }
    },
    {
      id: useId(),
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
const editorRef = ref<HTMLElement | null>(null)
const editorRect = computed(() => {
  return editorRef.value?.getBoundingClientRect() || ({} as DOMRect)
})
const currentIndex = ref(-1)
const areaRef = ref()
const { areaSelected, onEditorMouseDown, onAreaMove, onAreaUp } = useArea(
  data,
  areaRef
)
// 每次拖拽移动的距离
const extraDragData = ref({
  prevLeft: 0,
  prevTop: 0
})

function onDragstart(index: number) {
  if (!areaSelected.value) {
    // 如果是区域选中状态
    // 将上一次移动元素变为非选
    data.value.elements.forEach(
      (item: ComponentType) => (item.selected = false)
    )
  }

  const current = data.value.elements[index]
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
  data.value.elements.forEach((item: ComponentType, index: number) => {
    if (item.selected && currentIndex.value !== index) {
      item.left! += disX
      item.top! += disY
    }
  })

  extraDragData.value.prevLeft = dragData.left
  extraDragData.value.prevTop = dragData.top
}

function onChange(dragData: DragData, item: ComponentType) {
  Object.keys(dragData).forEach(key => {
    item[key as keyof DragData] = dragData[key as keyof DragData]
  })
}

function handleMakeGroup() {
  data.value.elements = makeGroup(data.value.elements, editorRect.value)
}

function handleCancelGroup() {
  data.value.elements = cancelGroup(data.value.elements, editorRect.value)
}
</script>

<style lang="scss" scoped>
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
