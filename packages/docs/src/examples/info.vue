<template>
  <Drager
    v-bind="info"
    rotatable
    @change="onChange"
  />
  
  <div class="es-info">
    <div class="es-info-item">
      <span>width</span>
      <input v-model.number="info.width">
    </div>
    <div class="es-info-item">
      <span class="es-info-item-label">height</span>
      <input v-model.number="info.height">
    </div>
    <div class="es-info-item">
      <span class="es-info-item-label">left</span>
      <input v-model.number="info.left">
    </div>
    <div class="es-info-item">
      <span class="es-info-item-label">top</span>
      <input v-model.number="info.top">
    </div>
    <div class="es-info-item">
      <span class="es-info-item-label">angle</span>
      <input v-model.number="info.angle">
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager, { type DragData } from 'es-drager'

const info = ref<DragData>({
  width: 120,
  height: 120,
  left: 100,
  top: 100,
  angle: 20
})

const onChange = (dragData: DragData) => {
  info.value = dragData
}

</script>

<style lang='scss'>
.es-info {
  position: absolute;
  top: 0;
  right: 0;
  border-left: 1px solid #ddd;
  width: 200px;
  height: 100%;
  background-color: #fff;
  .es-info-item {
    display: flex;
    flex-direction: column;
    height: 36px;
    margin-bottom: 20px;
    padding: 24px 12px;
    .es-info-item-label {
      margin-bottom: 6px;
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
}
</style>