<template>
  <button @click="selected = !selected">切换选中</button>
  <Drager
    :width="200"
    :height="120"
    :left="100"
    :top="100"
    :selected="selected"
    rotatable
  >
    <img style="width: 100%;height: 100%;" :src="imgUrl">
  </Drager>

  <Drager
    :left="100"
    :top="300"
    rotatable
  >
    resize handle
    <template #resize>
      <div class="custom-resize"></div>
    </template>
  </Drager>

  <Drager
    :left="100"
    :top="450"
    rotatable
  >
    rotate handle
    <template #rotate>
      <div class="custom-rotate">E</div>
    </template>
  </Drager>
  
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from 'es-drager'
import imgUrl from '../assets/demo.png'
const selected = ref(false)
</script>

<style lang='scss' scoped>
.custom-resize {
  width: 6px;
  height: 6px;
  border: 1px solid #0ec3b8;
}

.custom-rotate {
  font-size: 20px;
  font-weight: 700;
  color: #0ec3b8;
}
</style>