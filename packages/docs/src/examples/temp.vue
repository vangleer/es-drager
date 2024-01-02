<template>
  <button @click="selected = !selected">切换选中</button>

  <Drager
    :width="100"
    :height="100"
    :left="100"
    :top="100"
    rotatable
    snap
    :markline="handleMarkline"
  >
    测试
  </Drager>
  <Drager :width="100" :height="100" :left="300" :top="100" snap :markline="handleMarkline" rotatable>
    测试2
  </Drager>
  <!-- <Drager :tag="Demo" :left="100" :top="300" rotatable boundary>
    123465
  </Drager> -->

  <div
    v-show="markLineData.left"
    class="es-editor-markline-left"
    :style="{ left: markLineData.left + 'px' }"
  ></div>
  <div
    v-show="markLineData.top"
    class="es-editor-markline-top"
    :style="{ top: markLineData.top + 'px' }"
  ></div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Drager from '../../../src/drager'
const selected = ref(false)

const markLineData = ref({ left: null, top: null })

function handleMarkline(data: any) {
  // console.log(data)
  markLineData.value = data
}
</script>

<style lang="scss" scoped>
[class^='es-editor-markline'] {
  position: absolute;
  z-index: 9999;
  background-color: var(--el-color-primary);
}
.es-editor-markline-left {
  height: 100%;
  width: 1px;
  top: 0;
  background-color: red;
}
.es-editor-markline-top {
  width: 100%;
  height: 1px;
  left: 0;
  background-color: red;
}
</style>
