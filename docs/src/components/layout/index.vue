<template>
  <div class="v-layout">
    <Header :tools="tools" />
    <div class="v-layout-container">
      <Aside @dragstart="handleAsideDragstart" @dragend="handleAsideDragend" />
      <div ref="mainRef" class="v-layout-main">
        <Editor
          v-model="data"
          :commands="commands"
          @dragenter="dragenter"
          @drop="drop"
          @dragover.prevent
        />
      </div>
      <div class="v-layout-info"></div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Aside from './Aside.vue'
import Header from './Header.vue'
import Editor from '@/components/editor/index.vue'
import { ComponentType } from '@/utils/editor-config'
import { events } from '@/utils/events'
import { useCommand } from '@/hooks/useCommand'
import { $dialog } from '../dialog'
import { EditorType, ToolType } from '../types'

const data = ref<EditorType>({
  container: {
    gridSize: 10,
    style: {
      width: '500px',
      height: '500px',
    }
  },
  elements: []
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
.v-layout {
  --v-header-height: 60px;
  width: 100%;
  height: 100%;
  color: var(--v-color);
  background-color: var(--v-color-bg);
  transition: background-color .2s;
  &-container {
    display: flex;
    height: calc(100% - var(--v-header-height));
  }
  .v-layout-main {
    flex: 1;
    position: relative;
    padding: 20px;
  }
  .v-layout-info {
    flex-shrink: 0;
    width: 200px;
    height: 100%;
    border-left: var(--v-border);
  }
}
</style>
