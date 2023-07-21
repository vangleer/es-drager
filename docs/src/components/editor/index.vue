<template>
  <div class="es-editor" :style="editorStyle" @mousedown="onEditorMouseDown">
    <ESDrager
      v-for="(item, index) in data.elements"
      v-bind="item"
      :grid-x="gridSize"
      :grid-y="gridSize"
      boundary
      @drag-start="onDragstart(index)"
      @drag-end="onDragend"
      @drag="onDrag($event)"
      @change="onChange($event, item)"
      @contextmenu="onContextmenu($event, item)"
      @mousedown.stop
      @click.stop
    >
      <component
        :is="item.component"
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

    <MarkLine v-bind="markLine" />
    <GridRect />

    <Area ref="areaRef" @move="onAreaMove" @up="onAreaUp" />
  </div>
</template>

<script setup lang='ts'>
import { computed, reactive, ref, PropType } from 'vue'
import ESDrager, { DragData } from 'es-drager'
import 'es-drager/lib/style.css'
import { ComponentType, calcLines, events } from '@/utils'
import { CommandStateType } from '@/hooks/useCommand'
import { $dropdown } from '@/components/dropdown'
import GridRect from './GridRect.vue'
import MarkLine from './MarkLine.vue'
import Area from './Area.vue'
const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({})
  },
  commands: {
    type: Object as PropType<CommandStateType['commands']>
  }
})

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
const currentIndex = ref<number>()
const markLine = reactive({
  left: null,
  top: null
})
const lines = ref({ x: [], y: [] })

function onDragstart(index: number) {

  if (data.value.elements[currentIndex.value!]) {
    // 将上一次移动元素变为非选
    data.value.elements[currentIndex.value!].selected = false
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
  console.log(item)
  e.preventDefault()

  $dropdown({
    el: e.target as HTMLElement,
    items: [
      { label: '置顶' },
      { label: '置底' },
    ],
    onClick(item) {
      console.log(item)
    }
  })
}

const areaRef = ref()

// 编辑器鼠标按下事件
function onEditorMouseDown(e: MouseEvent) {
  let flag = false
  data.value.elements.forEach((item: ComponentType) => {
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
  for (let i = 0; i < data.value.elements.length; i++) {
    const item = data.value.elements[i]
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
  document.removeEventListener('click', documentClick)
  const flag = data.value.elements.some((item: ComponentType) => item.selected)
  if (flag) {
    document.addEventListener('click', documentClick, { once: true })
  }
}

function documentClick() {
  console.log(123465)
}

</script>

<style lang='scss'>
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
