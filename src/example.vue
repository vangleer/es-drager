<template>
  <Drager
    v-for="item, index in dragList"
    :key="index"
    :left="120"
    :top="index * 120 + 30"
    v-bind="item"
    :style="{ color: item.color }"
  >
    {{ item.text }}
  </Drager>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from './drager'
// import 'es-drager/lib/style.css'
// import Drager from 'es-drager'

const dragList = ref([
  { text: '移动', zoomable: false },
  { color: '#00c48f', text: '移动+缩放' },
  { color: '#ff9f00', text: '旋转', rotatable: true, zoomable: false },
  { color: '#f44336', text: '旋转+缩放', rotatable: true }
])

</script>

