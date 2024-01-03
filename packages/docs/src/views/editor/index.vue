<template>
  <ESEditor :store="store" />
</template>

<script setup lang="ts">
// import Layout from '@/components/layout/index.vue'
import { useAppStore, useEditorStore } from '@/store'
import { ESEditor } from '@es-drager/editor'
import { computed } from 'vue';
const editorStore = useEditorStore()
const appStore = useAppStore()
const store = computed(() => {
  return { ...editorStore, theme: appStore.theme }
})
</script>
