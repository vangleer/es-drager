<template>
  <div class="es-layout">
    <Header :title="title" :tools="tools" />
    <div class="es-layout-container">
      <Aside @dragstart="handleAsideDragstart" @dragend="handleAsideDragend" />
      <div ref="mainRef" class="es-layout-main">
        <Editor
          v-model="data"
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
import { ref } from 'vue'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Editor from '@/components/editor/index.vue'
import { ComponentType } from '@/components/types'
import { events } from '@/utils/events'
import { useCommand } from '@/hooks/useCommand'
import { $dialog } from '../dialog'
import { EditorType, ToolType } from '../types'
import { useId } from '@/utils/common'
const title = 'ES Drager Editor 开发中...'
const data = ref<EditorType>({
  container: {
    gridSize: 10,
    style: {
      width: '500px',
      height: '500px',
    }
  },
  elements: [
    {
      id: useId(),
      component: 'div',
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      text: 'div1',
      style: {
        border: '1px solid red'
      }
    },
    {
      id: useId(),
      component: 'div',
      width: 100,
      height: 100,
      left: 300,
      top: 150,
      text: 'div2',
      style: {
        border: '1px solid red'
      }
    }
  ]
})
const { commands } = useCommand(data)

const tools: ToolType[] = [
  { label: '撤销', handler: commands.undo },
  { label: '重做', handler: commands.redo },
  { label: '导出', handler: () => {
    $dialog({
      title: '导出',
      content: JSON.stringify(data.value),
      confirm(text: string) {
        commands.updateContainer(JSON.parse(text))
      }
    })
  }},
  { label: '导入', handler: () => console.log('导入') }
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
    ...data.value.elements,
    {
    ...currentComponent,
      left: e.offsetX - currentComponent.width! / 2,
      top: e.offsetY - currentComponent.height! / 2
    }
  ]
  data.value.elements = elements
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
