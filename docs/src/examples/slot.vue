<template>
  <Drager
    :width="200"
    :height="120"
    :left="100"
    :top="100"
    rotatable
  >
    <img class="img" style="width: 100%;height: 100%;" :src="imgUrl">
  </Drager>

  <Drager
    :width="100"
    :height="100"
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
    :width="100"
    :height="100"
    :left="300"
    :top="300"
    :selected="true"
    :resizeList="['top', 'bottom', 'left', 'right']"
  >
    control handle display
  </Drager>

  <Drager
    :width="100"
    :height="100"
    :left="500"
    :top="300"
    :selected="true"
    :resizeList="['top-left', 'top-right', 'bottom-left', 'bottom-right']"
  >
    control handle display
  </Drager>

  <Drager
    :width="100"
    :height="100"
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
import Drager from 'es-drager'
import imgUrl from '../assets/demo.png'

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