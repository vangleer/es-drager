<template>
  <div class="es-container">
    <div class="es-tools">
      <el-button v-for="item in tools" type="primary" @click="item.handler">{{
        item.label
      }}</el-button>

    </div>
    <div
      ref="editorRef"
      class="es-editor"
      @contextmenu.prevent="onEditorContextMenu"
    >
      <Drager
        v-for="item in data.elements"
        v-bind="item"
        rotatable
        @drag-start="onDragstart(item)"
        @change="onChange($event, item)"
        @contextmenu.stop="onContextmenu($event, item)"
        @click.stop
        @mousedown.stop
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
      </Drager>
      <GridRect />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Drager, { DragData } from 'es-drager'
import { ComponentType, EditorDataType, ToolType, GridRect, useActions } from '@es-drager/editor'
import { useId } from '@es-drager/editor/src/utils'
import { $dialog, $upload } from '@es-drager/editor/src/components/common'
import { t } from '@es-drager/common/i18n'
const data = ref<EditorDataType>({
  container: {
    gridSize: 10,
    markline: {},
    snapToGrid: true,
    style: {}
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
      style: { backgroundColor: '#fff2cc', border: '2px solid #d6b656' }
    },
    {
      id: useId(),
      component: 'div',
      width: 100,
      height: 100,
      left: 300,
      top: 150,
      text: 'div2',
      style: { backgroundColor: '#f8cecc', border: '2px solid #b85450' }
    }
  ]
})
const editorRef = ref<HTMLElement | null>(null)
const { onEditorContextMenu, onContextmenu } = useActions(data, editorRef)

const tools: ToolType[] = [
  {
    label: t('examples.export'),
    handler: () => {
      $dialog({
        title: t('examples.export'),
        content: JSON.stringify(data.value),
        confirm(text: string) {
          data.value = JSON.parse(text)
        }
      })
    }
  },
  {
    label: t('examples.import'),
    handler: () => {
      $upload({
        resultType: 'json',
        onChange(text: string) {
          data.value = JSON.parse(text)
        }
      })
    }
  },
  {
    label: t('examples.uploadImage'),
    handler: () => {
      $upload({
        resultType: 'image',
        onChange(e: string) {
          const newElement: ComponentType = {
            id: useId(),
            component: 'img',
            props: {
              src: e,
              width: 160,
              onLoad(e: Event) {
                // 避免多次执行
                if (newElement.props.loaded) return
                // 图片加载完毕，得到原始宽高
                const { naturalHeight, naturalWidth } = e.target as any
                const cur = data.value.elements.find(
                  item => item.id === newElement.id
                )!

                cur.width = naturalWidth
                cur.height = naturalHeight

                newElement.props.loaded = true
              }
            }
          }

          data.value.elements.push(newElement)
        }
      })
    }
  }
]

function onDragstart(item: ComponentType) {
  // 将上一次移动元素变为非选
  data.value.elements.forEach((item: ComponentType) => (item.selected = false))

  const current = item
  // 选中当前元素
  current.selected = true
}

function onChange(dragData: DragData, item: ComponentType) {
  Object.keys(dragData).forEach(key => {
    (item as any)[key] = dragData[key as keyof DragData]
  })
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
</style>
