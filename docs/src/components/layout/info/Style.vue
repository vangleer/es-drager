<template>
  <div class="es-info-style" @click.stop>
    <ElementStyle v-if="store.current && store.current.selected" />
    <EditorStyle v-else />
  </div>
</template>

<script setup lang='ts'>
import { useEditorStore } from '@/store'
import EditorStyle from './EditorStyle.vue'
import ElementStyle from './ElementStyle.vue'
const store = useEditorStore()

</script>

<style lang='scss' scoped>
.es-info-style {
  padding: 0 10px;
}
</style>
