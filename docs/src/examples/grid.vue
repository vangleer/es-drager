<template>
  <div class="es-grid-info">
    <div class="es-info-item">
      <span>snapToGrid</span>
      <input type="checkbox" v-model="snapToGrid">
    </div>
    <div class="es-info-item">
      <span>gridSize</span>
      <input v-model.number="gridSize">
    </div>
    <div class="es-info-item">
      <span>scaleRatio</span>
      <input :value="scale" @change="handleScaleChange">
    </div>
  </div>
  <div class="es-grid-box">
    <Drager
      :width="100"
      :height="100"
      :top="100"
      :left="100"
      :gridX="gridSize"
      :gridY="gridSize"
      :snapToGrid="snapToGrid"
      :scaleRatio="scale"
      boundary
    />

    <GridRect :showSmall="false" :grid="gridSize / 5" />
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from 'es-drager'
import GridRect from '@/components/editor/GridRect.vue'
const snapToGrid = ref(true)
const gridSize = ref(50)
const scale = ref(1)

function handleScaleChange(e: Event) {
  scale.value = +(e.target! as HTMLInputElement).value
}

</script>

<style lang='scss' scoped>
.es-grid-box {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 20px;
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