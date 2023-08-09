<template>
  <div ref="editorRef" class="es-editor" :style="editorStyle" @mousedown="onEditorMouseDown">
    <template v-for="(item, index) in data.elements">
      <ESDrager
        v-bind="item"
        :grid-x="gridSize"
        :grid-y="gridSize"
        boundary
        rotatable
        :equalProportion="item.component === 'es-group'"
        @drag-start="onDragstart(index)"
        @drag-end="onDragend"
        @drag="onDrag($event)"
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
import { computed, reactive, ref, PropType } from 'vue'
import ESDrager, { DragData } from '../../../../src/drager'
import 'es-drager/lib/style.css'
import { calcLines, cancelGroup, events, makeGroup } from '@/utils'
import { CommandStateType } from '@/hooks/useCommand'
import { $dropdown } from '@/components/dropdown'
import { ComponentType } from '@/components/types'
import GridRect from './GridRect.vue'
import MarkLine from './MarkLine.vue'
import Area from './Area.vue'
import { EditorType } from '../types'
import { useArea } from '@/hooks/useArea'
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
  get() {
    return props.modelValue
  },
  set() {

  }
})
const gridSize = computed(() => props.modelValue.container.gridSize || 10)
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
const currentIndex = ref<number>(-1)
const markLine = reactive({
  left: null,
  top: null
})
const lines = ref({ x: [], y: [] })
const areaRef = ref()
const {
  areaSelected,
  onEditorMouseDown,
  onAreaMove,
  onAreaUp
} = useArea(data, areaRef)

function onDragstart(index: number) {
  if (!areaSelected.value) {
    // 将上一次移动元素变为非选
    data.value.elements.forEach((item: ComponentType) => item.selected = false)
  }
 
  const current = data.value.elements[index]
  // 选中当前元素
  current.selected = true
  // 记录按下的数据，为了计算多个选中时移动的距离
  extraDragData.value.startX = current.left!
  extraDragData.value.startY = current.top!

  currentIndex.value = index
  // 计算辅助线的可能性
  lines.value = calcLines(data.value.elements, currentIndex.value)
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

  markLine.top = null
  markLine.left = null

  for (let i = 0; i < lines.value.y.length; i++) {
    const { top, showTop } = lines.value.y[i]

    if (Math.abs(top - dragData.top) < 5) {
      markLine.top = showTop
      break
    }
  }

  for (let i = 0; i < lines.value.x.length; i++) {
    const { left, showLeft } = lines.value.x[i]

    if (Math.abs(left - dragData.left) < 5) {
      markLine.left = showLeft
      break
    }
  }

  // 如果选中了多个
  data.value.elements.forEach((item: ComponentType, index: number) => {
    if (item.selected && currentIndex.value !== index) {
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

function onContextmenu(e: Event, item: ComponentType) {
  e.preventDefault()

  $dropdown({
    el: e.target as HTMLElement,
    items: [
      { label: '置顶' },
      { label: '置底' },
      { label: item.group ? '取消组合' : '组合' }
    ],
    onClick: (opt) => {
      if (opt.label === '组合') {
        // 组合操作
        data.value.elements = makeGroup(data.value.elements, editorRef.value!.getBoundingClientRect())
      } else if (opt.label === '取消组合') {
        data.value.elements = cancelGroup(data.value.elements, editorRef.value!.getBoundingClientRect())
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
