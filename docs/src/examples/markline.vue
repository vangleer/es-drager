<template>
  <div class="es-container">
    <div class="es-tools">
      <el-button type="primary" @click="command.undo">{{
        t('examples.undo')
      }}</el-button>
      <el-button type="primary" @click="command.redo">{{
        t('examples.redo')
      }}</el-button>
    </div>
    <div class="es-editor">
      <Drager
        v-for="(item, index) in data.componentList"
        v-bind="item"
        @drag-start="onDragstart(index)"
        @drag="onDrag($event)"
        @change="onChange($event, item)"
        @drag-end="onDragend"
      >
        <component :is="item.component">{{ item.text }}</component>
      </Drager>

      <MarkLine v-bind="markLine" />
      <GridRect class="grid-rect" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, CSSProperties, Ref, onBeforeUnmount } from 'vue'
import GridRect from '@/components/editor/GridRect.vue'
import Drager, { DragData } from 'es-drager'
import MarkLine from '@/components/editor/MarkLine.vue'
import { calcLines } from '@/utils'
import { t } from '@/plugins/locales'
// 组件类型
type ComponentType = {
  id?: string
  component: string // 内部组件名称，自定义组件需要提前全局注册
  text?: string // 文本
  width?: number
  height?: number
  top?: number
  left?: number
  angle?: number
  style?: CSSProperties // 样式
}

interface EditorState {
  componentList: ComponentType[]
}

const currentIndex = ref(-1)

const data = ref<EditorState>({
  componentList: [
    {
      id: 'div1',
      component: 'div',
      text: 'div1',
      width: 100,
      height: 100,
      left: 0,
      top: 0
    },
    {
      id: 'div2',
      component: 'div',
      text: 'div2',
      width: 100,
      height: 100,
      top: 100,
      left: 100
    }
  ]
})
const markLine = reactive({
  left: null,
  top: null
})

const lines = ref({ x: [], y: [] })

const command = useCommand(data)
/**
 * 监听拖拽开始
 * @param index
 */
function onDragstart(index: number) {
  currentIndex.value = index
  lines.value = calcLines(
    data.value.componentList,
    data.value.componentList[index]
  )
}

/**
 * 监听拖拽事件
 * @param dragData
 */
function onDrag(dragData: DragData) {
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
}

function onDragend() {
  // 每次拖拽结束记录变化
  command.record()
  markLine.top = null
  markLine.left = null
}

function onChange(dragData: DragData, item: any) {
  Object.keys(dragData).forEach(key => {
    ;(item as any)[key] = dragData[key as keyof DragData]
  })
}

function useCommand(data: Ref<EditorState>) {
  const queue: ComponentType[] = [] // 画布变化记录
  let current = -1 // 前进后退指针
  // 重做
  const redo = () => {
    console.log('redo', current, queue)
    if (current < queue.length - 1) {
      current++
      data.value.componentList = deepCopy(queue[current])
    }
  }
  // 撤销
  const undo = () => {
    console.log('undo', current, queue)
    if (current >= 0) {
      current--
      if (queue[current]) {
        data.value.componentList = deepCopy(queue[current])
      }
    }
  }
  // 记录操画布的变化
  const record = () => {
    queue[++current] = deepCopy(data.value.componentList)
  }

  // 记录初始数据
  record()

  // 键盘事件
  const onKeydown = (e: KeyboardEvent) => {
    const { ctrlKey, key } = e
    if (ctrlKey) {
      if (key === 'z') undo()
      else if (key === 'y') redo()
    }
  }
  window.addEventListener('keydown', onKeydown)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', onKeydown)
  })
  return {
    redo,
    undo,
    record
  }
}

function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
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
