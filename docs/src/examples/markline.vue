<template>
  <div
    class="es-container"
    :style="gridStyle"
  >
    <div class="es-tools">
      <div class="es-button" @click="command.undo">撤销</div>
      <div class="es-button" @click="command.redo">重做</div>
    </div>
    <Drager
      v-for="item, index in data.componentList"
      v-bind="item"
      :snapToGrid="snapToGrid"
      :gridX="gridX"
      :gridY="gridY"
      @drag-start="onDragstart(index)"
      @drag="onDrag($event)"
      @change="onChange($event, item)"
      @drag-end="onDragend"
    >
      <component :is="item.component">{{ item.text }}</component>
    </Drager>

    <div v-show="markLine.left" class="es-markline-left" :style="{ left: markLine.left + 'px' }"></div>
    <div v-show="markLine.top" class="es-markline-top" :style="{ top: markLine.top + 'px' }"></div>
  </div>
</template>

<script setup lang='ts'>
import { computed, ref, reactive, CSSProperties, Ref, onBeforeUnmount } from 'vue'
import Drager, { DragData } from 'es-drager'
// 组件类型
type ComponentType = {
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
const snapToGrid = ref(true)
const gridX = ref(20)
const gridY = ref(20)
const gridStyle = computed(() => {
  return snapToGrid.value ? {
    '--es-grid-width': gridX.value + 'px',
    '--es-grid-height': gridY.value + 'px'
  } : {}
})
const currentIndex = ref(-1)

const data = ref<EditorState>({
  componentList: [
    {
      component: 'div',
      text: 'div1',
      width: 100,
      height: 100,
      left: 0,
      top: 0
    },
    {
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
  lines.value = calcLines()
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
}

/**
 * 计算辅助线的位置
 */
function calcLines() {
  const lines: any = { x: [], y: [] }
  // 当前拖拽元素大小
  const { width, height } = data.value.componentList[currentIndex.value!] as any

  // 循环遍历画布所有元素，将除当前拖拽元素外所有其它元素生成辅助线的位置保存，每个元素x和y都会有5种
  data.value.componentList.forEach((block, i: number) => {
    if (currentIndex.value! === i) return
    const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = block as any

    lines.x.push({ showLeft: ALeft, left: ALeft })
    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth })
    lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - width / 2 })
    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - width })
    lines.x.push({ showLeft: ALeft, left: ALeft - width })

    lines.y.push({ showTop: ATop, top: ATop })
    lines.y.push({ showTop: ATop, top: ATop - height })
    lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - height / 2 })
    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight })
    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - height })
  })

  return lines
}

function onChange(dragData: DragData, item: any) {
  Object.keys(dragData).forEach((key) => {
    (item as any)[key] = dragData[key as keyof DragData]
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

<style lang='scss' scoped>
.es-container {
  border: 1px solid #ccc;
  background:
        -webkit-linear-gradient(top, transparent calc(var(--es-grid-height) - 1px), #ccc var(--es-grid-height)),
        -webkit-linear-gradient(left, transparent calc(var(--es-grid-width) - 1px), #ccc var(--es-grid-width))
        ;
    background-size: var(--es-grid-width) var(--es-grid-height);
  width: 800px;
  height: 600px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  [class^=es-markline] {
    position: absolute;
    z-index: 9999;
    background-color: #3a7afe;
  }
  .es-markline-left {
    height: 100%;
    width: 1px;
    top: 0;
  }
  .es-markline-top {
    width: 100%;
    height: 1px;
    left: 0;
  }
}

.es-tools {
  display: flex;
  justify-content: center;
  align-items: center;

  .es-button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    line-height: 1;
    height: 32px;
    white-space: nowrap;
    cursor: pointer;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    transition: .1s;
    user-select: none;
    vertical-align: middle;
    background-color: #fff;
    border: 1px solid #dcdfe6;
    padding: 8px 15px;
    border-radius: 4px;
    margin-left: 10px;
    &:hover {
      border-color: #3a7afe;
    }
  }
}
</style>