<template>
  <Drager type="image" :width="200" :height="120" :left="100" :top="100" rotatable>
    <span style="position: absolute;">图片类型</span>
    <img class="img" style="width: 100%; height: 100%" :src="imgUrl" />
  </Drager>

  <Drager class="drager-text" type="text" :left="350" :top="100">
    <div :contenteditable="true" style="text-align: center;">文本类型</div>
  </Drager>

  <Drager :width="100" :height="100" :left="100" :top="300" rotatable>
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

  <Drager :width="100" :height="100" :left="100" :top="450" rotatable>
    rotate handle
    <template #rotate>
      <div class="custom-rotate">E</div>
    </template>
  </Drager>

  <Drager :width="100" :height="100" :left="300" :top="450" skewable>
    skew handle
    <template #skew>
      <div class="custom-rotate">S</div>
    </template>
  </Drager>
</template>

<script setup lang="ts">
import Drager from 'es-drager/index'
import imgUrl from '../assets/demo.png'
</script>

<style lang="scss" scoped>
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
.drager-text {
  font-size: 30px;
}
</style>
