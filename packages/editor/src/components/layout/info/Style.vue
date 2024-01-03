<template>
  <div class="es-info-style" @click.stop>
    <ElementStyle v-if="store.current && store.current.selected" />
    <EditorStyle v-else />
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue'
import EditorStyle from './EditorStyle.vue'
import ElementStyle from './ElementStyle.vue'
import { EditorStoreKey } from '../../../types'
const store = inject(EditorStoreKey)!
</script>

<style lang="scss">
.es-info-style {
  .el-collapse-item__header {
    padding: 0 10px;
  }
  .el-collapse-item__content {
    padding: 8px 12px;
  }
}
</style>
