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
    </Header>
    <ESEditor ref="editorRef" :store="editorStore" :theme="appStore.theme" />
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/layout/Header.vue'
import { useAppStore, useEditorStore } from '@/store'
import { ESEditor, ToolType } from '@es-drager/editor'
import { onMounted } from 'vue';
import { computed, ref } from 'vue'
const title = 'ES Drager Editor 开发中...'
const editorRef = ref<InstanceType<typeof ESEditor> | null>(null)
const editorStore = useEditorStore()
const appStore = useAppStore()

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
