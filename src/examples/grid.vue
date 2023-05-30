<template>
  <div class="es-grid-info">
    <div class="es-info-item">
      <span>snapToGrid</span>
      <input type="checkbox" v-model="snapToGrid">
    </div>
    <div class="es-info-item">
      <span>gridX</span>
      <input v-model="gridX">
    </div>
    <div class="es-info-item">
      <span>gridY</span>
      <input v-model="gridY">
    </div>
  </div>
  <div
    class="es-grid-box"
    :style="gridStyle"
  >
    <Drager
      :top="100"
      :left="100"
      :gridX="gridX"
      :gridY="gridY"
      :snapToGrid="snapToGrid"
      boundary
    />
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import Drager from 'es-drager'
const snapToGrid = ref(true)
const gridX = ref(50)
const gridY = ref(50)

const gridStyle = computed(() => {
  return snapToGrid.value ? {
    '--es-grid-width': gridX.value + 'px',
    '--es-grid-height': gridY.value + 'px'
  } : {}
})
</script>

<style lang='scss' scoped>
.es-grid-box {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background:
        -webkit-linear-gradient(top, transparent calc(var(--es-grid-height) - 1px), #ccc var(--es-grid-height)),
        -webkit-linear-gradient(left, transparent calc(var(--es-grid-width) - 1px), #ccc var(--es-grid-width))
        ;
    background-size: var(--es-grid-width) var(--es-grid-height);
}
.es-grid-info {
  display: flex;
}
.es-info-item {
  display: flex;
  align-items: center;
  height: 36px;
  margin-right: 20px;
  padding: 24px 12px;
  span {
    margin-right: 6px;
  }
  input {
    flex-grow: 1;
    padding: 0;
    outline: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 8px;
    &:focus {
      border-color: var(--es-doc-color-primary);
    }
  }
}
</style>