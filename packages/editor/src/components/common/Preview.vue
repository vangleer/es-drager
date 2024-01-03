<template>
  <el-dialog draggable fullscreen>
    <div class="es-preview-tools">
      <el-button type="primary" @click="handleExport('png')">导出PNG</el-button>
      <el-button type="primary" @click="handleExport('jpg')">导出JPG</el-button>
      <el-button type="primary" @click="handleExport('pdf')">导出PDF</el-button>
    </div>
    <div
      class="es-preview-body"
      :style="{ width: editorStyle.width, height: editorStyle.height }"
    >
      <div ref="editorRef" class="es-editor preview" :style="editorStyle">
        <template v-for="item in store.data.elements">
          <component
            :is="item.component!"
            v-bind="item.props"
            :style="{
              ...pickStyle(item.style, false),
              width: item.width + 'px',
              height: item.height + 'px',
              position: 'absolute',
              left: item.left + 'px',
              top: item.top + 'px'
            }"
          >
            <TextEditor
              v-if="item.text"
              :text="item.text"
              :style="pickStyle(item.style)"
            />
          </component>
        </template>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import TextEditor from '../editor/TextEditor.vue'
import { computed, inject, ref } from 'vue'
import html2canvas from 'html2canvas'
import JsPdf from 'jspdf'
import { dayjs } from 'element-plus'
import { pickStyle } from '../../utils'
import { EditorStoreKey } from '../../types'
const store = inject(EditorStoreKey)!
const editorRef = ref<HTMLElement>()
const editorStyle = computed(() => {
  const { width, height } = store.data.container.style
  return {
    ...store.data.container.style,
    width: width + 'px',
    height: height + 'px',
    transform: `scale(${scaleRatio.value})`,
    transformOrigin: 'top left'
  }
})
const scaleRatio = computed(() => store.data.container?.scaleRatio || 1)

function handleExport(type: 'png' | 'jpg' | 'pdf') {
  const { width, height } = store.data.container.style
  // 生成文件名称
  const filename = dayjs().format('YYYY-MM-DD') + '-es-drager-editor.' + type
  html2canvas(editorRef.value!).then(canvas => {
    if (type === 'pdf') {
      const doc = new JsPdf('l', 'pt', 'a4')
      const imageData = canvas.toDataURL()
      doc.addImage(imageData, 'PNG', 0, 0, +width!, +height!)
      return doc.save(filename)
    }
    canvas.toBlob(blob => {
      // 创建a标签
      const link = document.createElement('a')
      link.download = filename
      // 创建临时url
      const href = URL.createObjectURL(blob!)
      link.href = href
      // 调用click
      link.click()
      // 销毁
      URL.revokeObjectURL(href)
    })
  })
}
</script>

<style lang="scss" scoped>
.es-editor {
  &.preview {
    position: relative;
    .es-drager.disabled {
      opacity: 1;
    }
  }
}
.es-preview-body {
  margin: 0 auto;
  border: var(--es-border);
}
.es-preview-tools {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
</style>
