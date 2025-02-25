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
        v-for="item in data.componentList"
        v-bind="item"
        snap
        :snap-threshold="10"
        markline
        :extraLines="extraLines"
        @change="onChange($event, item)"
        @drag-end="onDragend"
      >
        <component :is="item.component">{{ item.text }}</component>
      </Drager>

      <Drager
        :width="100"
        :height="100"
        :left="200"
        :top="200"
        snap
        :markline="onMarkline"
        :extraLines="extraLines"
      >
        custom markline
      </Drager>

      <div
        v-show="markLineData.left"
        class="es-editor-markline-left"
        :style="{ left: markLineData.left + 'px' }"
      ></div>
      <div
        v-show="markLineData.top"
        class="es-editor-markline-top"
        :style="{ top: markLineData.top + 'px' }"
      ></div>
      <GridRect class="grid-rect" />
      <div class="editor-center"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, CSSProperties, Ref, onBeforeUnmount } from 'vue'
import { GridRect } from '@es-drager/editor'
import Drager, { DragData, MarklineData } from 'es-drager/index'
import { t } from '@es-drager/common/i18n'
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

const markLineData = ref<MarklineData>({ left: null, top: null })

interface EditorState {
  componentList: ComponentType[]
}

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

const command = useCommand(data)

function onDragend() {
  // 每次拖拽结束记录变化
  command.record()
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

function onMarkline(data: MarklineData) {
  markLineData.value = data
}

// 添加其它对齐线
function extraLines(targetRect: DOMRect) {
  // 可以是dom元素列表，这里只有中心点
  return [document.querySelector('.editor-center')!]


  // 也可以是计算好的位置，以editor的中心点为例
  // const editorRect = document.querySelector('.es-editor')!.getBoundingClientRect()
  // const centerY = editorRect.height / 2 + editorRect.top
  // const centerX = editorRect.width / 2 + editorRect.left
  // return [
  //   { showTop: centerY, top: centerY }, // 顶
  //   { showTop: centerY, top: centerY - targetRect.height / 2 }, // 中
  //   { showTop: centerY, top: centerY - targetRect.height }, // 底

  //   { showLeft: centerX, left: centerX }, // 左
  //   { showLeft: centerX, left: centerX - targetRect.width / 2 }, // 中
  //   { showLeft: centerX, left: centerX - targetRect.width }, // 右
  // ]
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

[class^='es-editor-markline'] {
  position: absolute;
  z-index: 9999;
  background-color: greenyellow;
}

.es-editor-markline-left {
  height: 100%;
  width: 1px;
  top: 0;
}
.es-editor-markline-top {
  width: 100%;
  height: 1px;
  left: 0;
}

.editor-center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
