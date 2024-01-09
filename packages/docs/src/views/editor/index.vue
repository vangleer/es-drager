<template>
  <div class="es-layout">
    <Header :title="title">
      <div class="es-header-toolbar">
        <div
          v-for="item in tools"
          class="es-tool-btn"
          @click="handleToolClick(item)"
        >
          <el-button :icon="item.icon">{{ item.label }}</el-button>
        </div>
      </div>
      <el-button>修改数据</el-button>
    </Header>
    <ESEditor ref="editorRef" :data="data" :theme="appStore.theme" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import { useAppStore } from '@/store'
import { ESEditor, ToolType, EditorDataType } from '@es-drager/editor'
import { onMounted } from 'vue';
import { computed, ref } from 'vue'
const title = 'ES Drager Editor 开发中...'

// editorRef.value?.getData() // 获取最新数据
const editorRef = ref<InstanceType<typeof ESEditor> | null>(null)
  
const appStore = useAppStore()

// 初始数据
const data = ref<EditorDataType>({
  container: {
    markline: {
      show: true,
      color: ''
    },
    snapToGrid: true,
    gridSize: 10,
    gridColor: '',
    style: {},
    scaleRatio: 1
  },
  elements: [
    {
      id: '1',
      component: 'div',
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      text: 'div1',
      style: {
        border: '1px solid red',
        background: 'blue'
      }
    },
    {
      id: '1',
      component: 'div',
      width: 100,
      height: 100,
      left: 300,
      top: 150,
      text: 'div2',
      style: {
        border: '1px solid red',
        background: 'pink'
      }
    }
  ]
})

const tools = computed(() => (editorRef.value as any)?.tools || [])

function handleToolClick(item: ToolType) {
  if (typeof item.handler === 'function') {
    item.handler()
  }
}

onMounted(() => {
  console.log(editorRef.value)
})
</script>

<style lang="scss" scoped>
.es-layout {
  width: 100%;
  height: 100%;
  color: var(--es-color);
  background-color: var(--es-color-bg);
  transition: background-color 0.2s;
  min-width: 1118px;
  .es-header-toolbar {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    .es-tool-btn + .es-tool-btn {
      margin-left: 10px;
    }
  }
}
</style>
