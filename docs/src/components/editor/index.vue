<template>
  <div
    ref="editorRef"
    class="es-editor"
    :style="editorStyle"
    @mousedown="onEditorMouseDown"
  >
    <template v-for="item in data.elements">
      <ESDrager
        v-bind="item"
        :grid-x="gridSize"
        :grid-y="gridSize"
        boundary
        rotatable
        @drag-start="onDragstart(item)"
        @drag-end="onDragend"
        @drag="onDrag"
        @change="onChange($event, item)"
        @contextmenu="onContextmenu($event, item)"
        @mousedown.stop
        @click.stop
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
      </ESDrager>
    </template>

    <MarkLine v-bind="markLine" />

    <GridRect />

    <Area ref="areaRef" @move="onAreaMove" @up="onAreaUp" />
  </div>
</template>

<script setup lang='ts'>
import { computed, ref, PropType } from 'vue'
import ESDrager, { DragData } from '../../../../src/drager'
import 'es-drager/lib/style.css'
import { cancelGroup, events, makeGroup } from '@/utils'
import { $dropdown } from '@/components/dropdown'
import { EditorType, ComponentType } from '@/components/types'
import GridRect from './GridRect.vue'
import MarkLine from './MarkLine.vue'
import Area from './Area.vue'
import { useMarkline, useArea, CommandStateType } from '@/hooks'
const props = defineProps({
  modelValue: {
    type: Object as PropType<EditorType>,
    required: true,
    default: () => ({})
  },
  commands: {
    type: Object as PropType<CommandStateType['commands']>
  }
})
const editorRef = ref<HTMLElement | null>(null)
const data = computed({
  get: () => props.modelValue,
  set: () => {}
})
const editorRect = computed(() => {
  return editorRef.value?.getBoundingClientRect() || {} as DOMRect
})
const gridSize = computed(() => props.modelValue.container?.gridSize || 10)
const editorStyle = computed(() => {
  return {
    '--es-editor-grid-size': gridSize.value + 'px',
    transformOrigin: 'left top'
  }
})

// 每次拖拽移动的距离
const extraDragData = ref({
  startX: 0,
  startY: 0,
  disX: 0,
  disY: 0
})
const current = ref<ComponentType | null>(null)
const {
  markLine,
  updateLines,
  updateMarkline
} = useMarkline(data, current)
const areaRef = ref()
const {
  areaSelected,
  onEditorMouseDown,
  onAreaMove,
  onAreaUp
} = useArea(data, areaRef)

function onDragstart(element: ComponentType) {
  current.value = element
  if (!areaSelected.value) {
    // 将上一次移动元素变为非选
    data.value.elements.forEach(item => item.selected = false)
  }
 
  // 选中当前元素
  current.value.selected = true
  // 记录按下的数据，为了计算多个选中时移动的距离
  extraDragData.value.startX = current.value.left!
  extraDragData.value.startY = current.value.top!

  // 更新辅助线的可能性
  updateLines()
  events.emit('dragstart')
}

function onDragend() {
  events.emit('dragend')
  markLine.left = null
  markLine.top = null
}
function onDrag(dragData: DragData) {
  const disX = dragData.left - extraDragData.value.startX
  const disY = dragData.top - extraDragData.value.startY

  // 更新是否显示markeline
  updateMarkline(dragData)

  // 如果选中了多个
  data.value.elements.forEach((item: ComponentType, index: number) => {
    if (item.selected && current.value?.id !== item.id) {
      item.left! += disX
      item.top! += disY
    }
  })

  extraDragData.value.startX = dragData.left
  extraDragData.value.startY = dragData.top
}

function onChange(dragData: DragData, item: ComponentType) {
  Object.keys(dragData).forEach((key) => {
    (item as any)[key] = dragData[key as keyof DragData]
  })
}

function onContextmenu(e: MouseEvent, item: ComponentType) {
  e.preventDefault()
  const { clientX, clientY }  = e
  $dropdown({
    el: e.target as HTMLElement,
    clientX,
    clientY,
    items: [
      { action: 'top', label: '置顶' },
      { action: 'bottom', label: '置底' },
      { action: item.group ? 'ungroup' : 'group', label: item.group ? '取消组合' : '组合' }
    ],
    onClick: ({ action }) => {
      switch(action) {
        case 'top': {
          return current.value!.zIndex = data.value.elements.reduce((max, item) => Math.max(max, item.zIndex || 1), 0)
        }
        case 'bottom': {
          let zIndex = current.value!.zIndex
          // 如果当前存在zIndex，取列表最小的
          if (zIndex) {
            zIndex = data.value.elements.reduce((min, item) => Math.min(min, item.zIndex || -1), Infinity)
          } else {
            zIndex = 0
            data.value.elements.forEach(item => {
              item.zIndex = (item.zIndex || 0) + 1
            })
          }
          return current.value!.zIndex = zIndex
        }
        case 'group': {
          // 组合操作
          return data.value.elements = makeGroup(data.value.elements, editorRect.value)
        }
        case 'ungroup': {
          return data.value.elements = cancelGroup(data.value.elements, editorRect.value)
        }
      }
    }
  })
}
</script>

<style lang='scss' scoped>
.es-editor {
  position: relative;
  width: 100%;
  height: 100%;
}
.es-drager {
  &.border {
    border-width: 0;
  }
  &.selected {
    border-width: 1px;
    border-style: dashed;
  }
  .es-drager-mask {
    display: none;
  }
}
</style>
