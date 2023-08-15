<template>
  <div class="es-layout">
    <Header :title="title" :tools="tools" />
    <div class="es-layout-container">
      <Aside @dragstart="handleAsideDragstart" @dragend="handleAsideDragend" />
      <div ref="mainRef" class="es-layout-main">
        <Editor
          v-model="store.data"
          :commands="commands"
          @dragenter="dragenter"
          @drop="drop"
          @dragover.prevent
        />
      </div>
      <div class="es-layout-info"></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import Aside from './Aside.vue'
import Header from './Header.vue'
import Editor from '@/components/editor/index.vue'
import { ComponentType } from '@/components/types'
import { events } from '@/utils/events'
import { useCommand } from '@/hooks/useCommand'
import { $dialog } from '../dialog'
import { $upload } from '../common/upload'
import { ToolType } from '../types'
import { useId } from '@/utils/common'
import { useEditorStore } from '@/store'
const store = useEditorStore()
const title = 'ES Drager Editor 开发中...'

const { commands } = useCommand()

const tools: ToolType[] = [
  { label: '撤销', handler: commands.undo },
  { label: '重做', handler: commands.redo },
  { label: '导出', handler: () => {
    $dialog({
      title: '导出',
      content: JSON.stringify(store.data),
      confirm(text: string) {
        commands.updateContainer(JSON.parse(text))
      }
    })
  }},
  { label: '导入', handler: () => {
    $upload({
      resultType: 'json',
      onChange(text: string) {
        commands.updateContainer(JSON.parse(text))
      }
    })
  }},
  { label: '插入图片', handler: () => {
    $upload({
      resultType: 'image',
      onChange(e: string) {
        const newElement: ComponentType = {
          id: useId(),
          component: 'img',
          props: { src: e, width: 160, onLoad(e: Event) {
            // 图片加载完毕，得到原始宽高
            const { naturalHeight, naturalWidth } = e.target as any
            const cur = store.data.elements.find(item => item.id === newElement.id)!

            cur.width = naturalWidth
            cur.height = naturalHeight
          }}
        }

        store.data.elements.push(newElement)
      }
    })
  }}
]

let currentComponent: ComponentType | null = null

function handleAsideDragstart(component: ComponentType) {
  events.emit('dragstart')
  currentComponent = component
}
function handleAsideDragend() {
  events.emit('dragend')
}
function dragenter(e: DragEvent) {
  e.dataTransfer!.dropEffect = 'move'
}

function drop(e: DragEvent) {
  if (!currentComponent) return
  const elements = [
    ...store.data.elements,
    {
      ...currentComponent,
      left: e.offsetX - currentComponent.width! / 2,
      top: e.offsetY - currentComponent.height! / 2,
      id: useId()
    }
  ]
  store.data.elements = elements
  currentComponent = null
}
</script>

<style lang='scss'>
.es-layout {
  width: 100%;
  height: 100%;
  color: var(--es-color);
  background-color: var(--es-color-bg);
  transition: background-color .2s;
  &-container {
    display: flex;
    height: calc(100% - var(--es-header-height));
  }
  .es-layout-main {
    flex: 1;
    position: relative;
    padding: 20px;
  }
  .es-layout-info {
    flex-shrink: 0;
    width: 200px;
    height: 100%;
    border-left: var(--es-border);
  }
}
</style>
