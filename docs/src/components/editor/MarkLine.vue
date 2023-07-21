<template>
  <div v-show="left" class="v-editor-markline-left" :style="{ left: left + 'px' }"></div>
  <div v-show="top" class="v-editor-markline-top" :style="{ top: top + 'px' }"></div>
</template>

<script setup lang='ts'>
import { PropType } from 'vue'

defineProps({
  left: Number as PropType<number | null>,
  top: Number as PropType<number | null>
})
</script>

<style lang='scss' scoped>
[class^=v-editor-markline] {
  position: absolute;
  z-index: 9999;
  background-color: var(--el-color-primary);
}
.v-editor-markline-left {
  height: 100%;
  width: 1px;
  top: 0;
}
.v-editor-markline-top {
  width: 100%;
  height: 1px;
  left: 0;
}
</style>
