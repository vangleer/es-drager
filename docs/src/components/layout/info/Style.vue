<template>
  <div class="es-info-style" @click.stop>
    <div class="info-color-map">
      <div class="color-list" v-for="item in itemList">
        <div class="color-item" v-for="style in item" :style="style" @click="handleColorClick(style)"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useEditorStore } from '@/store';
import { ref, CSSProperties } from 'vue'
const store = useEditorStore()

const itemList = ref<CSSProperties[][]>([
  [
    { backgroundColor: '#18141d', borderColor: '#ffffff' },
    { backgroundColor: '#f5f5f5', borderColor: '#666666' },
    { backgroundColor: '#dae8fc', borderColor: '#6b8ebf' },
    { backgroundColor: '#d5e8d4', borderColor: '#82b366' },
    { backgroundColor: '#ffe6cc', borderColor: '#d79b00' },
    { backgroundColor: '#fff2cc', borderColor: '#d6b656' },
    { backgroundColor: '#f8cecc', borderColor: '#b85450' },
    { backgroundColor: '#e1d5e7', borderColor: '#9673a6' },
  ]
])

const handleColorClick = (style: CSSProperties) => {
  store.current.style = { ...store.current.style, ...style }
}
</script>

<style lang='scss' scoped>
.es-info-style {
  padding: 0 10px;
  .color-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .color-item {
      width: 38px;
      height: 24px;
      border-width: 2px;
      border-style: solid;
      margin-bottom: 10px;
    }
  }
}
</style>
