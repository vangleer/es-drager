<template>
  <div class="es-layout-container">
    <Aside @dragstart="handleAsideDragstart" @dragend="handleAsideDragend" />
    <div ref="mainRef" class="es-layout-main">
      <div class="es-editor-container" :style="editorContainerStyle">
        <Editor
          v-model="store.data"
          :commands="commands"
          @dragenter="dragenter"
          @drop="drop"
          @dragover.prevent
        />
      </div>
    </div>
    <Info v-model="store.current" />
  </div>
  <Preview v-model="store.preview" />
</template>

<script setup lang="ts">
import Aside from './Aside.vue'
import Info from './info/Info.vue'
import Editor from '../../components/editor/index.vue'
import Preview from '../../components/common/Preview.vue'
import { ComponentType, EditorDataType, ToolType } from '../../types'
import { events } from '../../utils/events'
import { useCommand } from '../../hooks/useCommand'
import { $dialog, $upload } from '../../components/common'
import { useId } from '../../utils/common'
import { computed, onMounted, ref, provide, CSSProperties } from 'vue'
import { useEditorStore } from '../../store'
import {
  RefreshLeft,
  RefreshRight,
  Upload,
  Download,
  Picture,
  View
} from '@element-plus/icons-vue'
import { PropType } from 'vue'
import { watch } from 'vue'

const props = defineProps({
  data: {
    type: Object as PropType<EditorDataType>,
    required: true
  },
  theme: {
    type: String as PropType<'light' | 'dark'>
  }
})

const store = useEditorStore()
const theme = computed(() => props.theme)

provide('theme', theme)

const mainRef = ref<HTMLElement>()
const { commands } = useCommand(store)
const tools: ToolType[] = [
  { label: '撤销', icon: RefreshLeft, handler: commands.undo },
  { label: '重做', icon: RefreshRight, handler: commands.redo },
  {
    label: '导出',
    icon: Download,
    handler: () => {
      $dialog({
        title: '导出',
        content: JSON.stringify(store.data),
        confirm(text: string) {
          commands.updateContainer(JSON.parse(text))
        }
      })
    }
  },
  {
    label: '导入',
    icon: Upload,
    handler: () => {
      $upload({
        resultType: 'json',
        onChange(text: string) {
          commands.updateContainer(JSON.parse(text))
        }
      })
    }
  },
  {
    label: '插入图片',
    icon: Picture,
    handler: () => {
      $upload({
        resultType: 'image',
        onChange(e: string) {
          const defaultWidth = 200
          const newElement: ComponentType = {
            id: useId(),
            component: 'img',
            props: {
              src: e,
              width: defaultWidth,
              onLoadOnce(e: Event) {
                // 避免多次执行
                if (newElement.props.loaded) return
                // 图片加载完毕，得到原始宽高
                const { naturalHeight, naturalWidth } = e.target as any
                const cur = store.data.elements.find(
                  item => item.id === newElement.id
                )!
                // 上传图片最大宽度设置
                let rate = defaultWidth / naturalWidth
                if (rate > 1) rate = 1
                cur.width = naturalWidth * rate
                cur.height = naturalHeight * rate
                newElement.props.loaded = true
              }
            }
          }

          store.data.elements.push(newElement)
        }
      })
    }
  },
  { label: '预览', icon: View, handler: () => (store.preview = true) }
]

const editorContainerStyle = computed(() => {
  const { width, height } = store.data.container.style
  const style: CSSProperties = {}
  const x = store.initWidth > +width!, y = store.initHeight > +height!
  if (x) {
    style.position = 'absolute'
    style.left = '50%'
    style.transform = 'translateX(-50%)'
  }
  if (y) {
    style.position = 'absolute'
    style.top = '50%'
    style.transform = 'translateY(-50%)'
  }
  if (x && y) {
    style.transform = 'translate(-50%, -50%)'
  }
  return style
})

const mainRect = computed(() => {
  return mainRef.value?.getBoundingClientRect() || ({} as DOMRect)
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
  const isIcon = currentComponent.component === 'es-icon'
  const elements = [
    ...store.data.elements,
    {
      ...currentComponent,
      equalProportion: isIcon,
      left: e.offsetX - currentComponent.width! / 2,
      top: e.offsetY - currentComponent.height! / 2,
      id: useId(),
      style: currentComponent.style || {}
    }
  ]
  store.data.elements = elements
  currentComponent = null
}

function init() {
  store.initWidth = Math.floor(mainRect.value.width)
  store.initHeight = Math.floor(mainRect.value.height - 7)
  store.data.container.style.width = store.initWidth
  store.data.container.style.height = store.initHeight
}
function getData() {
  return { ...store.data }
}

watch(() => props.data, () => {
  store.update(props.data)
}, { immediate: true })
onMounted(() => {
  init()
})

defineExpose({
  tools,
  getData
})
</script>

<style lang="scss">
.es-layout-container {
  display: flex;
  height: calc(100% - var(--es-header-height));
  background-color: var(--es-bg-color-page);
}
.es-layout-main {
  flex: 1;
  position: relative;
  margin: 20px;
  overflow: auto;
  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 6px;
  }
  &:hover {
    &::-webkit-scrollbar-thumb {
      background-color: rgba(69,90,100,.2);
    }
  }
  .es-editor-container {
    box-shadow: var(--el-box-shadow);
    background-color: var(--es-color-bg);
  }
}
</style>
