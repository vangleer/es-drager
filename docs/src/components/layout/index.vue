<template>
  <div class="es-layout">
    <Header :title="title" :tools="tools" />
    <div class="es-layout-container">
      <Aside @dragstart="handleAsideDragstart" @dragend="handleAsideDragend" />
      
      <div ref="mainRef" class="es-layout-main">
        <el-scrollbar :height="mainRect.height">
          <Editor
            v-model="store.data"
            :commands="commands"
            @dragenter="dragenter"
            @drop="drop"
            @dragover.prevent
          />
        </el-scrollbar>
      </div>
      <Info v-model="store.current" />
    </div>
  </div>
  <Preview v-model="store.preview" />
</template>

<script setup lang='ts'>
import Aside from './Aside.vue'
import Header from './Header.vue'
import Info from './info/Info.vue'
import Editor from '@/components/editor/index.vue'
import Preview from '@/components/common/Preview.vue'
import { ComponentType } from '@/components/types'
import { events } from '@/utils/events'
import { useCommand } from '@/hooks/useCommand'
import { $dialog, $upload } from '@/components/common'
import { ToolType } from '../types'
import { useId } from '@/utils/common'
import { useEditorStore } from '@/store'
import { computed, onMounted, ref } from 'vue'
import { RefreshLeft, RefreshRight, Upload, Download, Picture, View } from '@element-plus/icons-vue'
const store = useEditorStore()
const title = 'ES Drager Editor 开发中...'
const mainRef = ref<HTMLElement>()
const { commands } = useCommand()
const tools: ToolType[] = [
  { label: '撤销', icon: RefreshLeft, handler: commands.undo },
  { label: '重做', icon: RefreshRight, handler: commands.redo },
  { label: '导出', icon: Download, handler: () => {
    $dialog({
      title: '导出',
      content: JSON.stringify(store.data),
      confirm(text: string) {
        commands.updateContainer(JSON.parse(text))
      }
    })
  }},
  { label: '导入', icon: Upload, handler: () => {
    $upload({
      resultType: 'json',
      onChange(text: string) {
        commands.updateContainer(JSON.parse(text))
      }
    })
  }},
  { label: '插入图片', icon: Picture, handler: () => {
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
  }},
  { label: '预览', icon: View, handler: () => store.preview = true }
]

const mainRect = computed(() => {
  return mainRef.value?.getBoundingClientRect() || {} as DOMRect
})

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

function init() {
  store.data.container.style.width = mainRect.value.width - 1
  store.data.container.style.height = mainRect.value.height - 4
}
onMounted(() => {
  init()
})
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
    margin: 20px;
    overflow: auto;
  }
}
</style>