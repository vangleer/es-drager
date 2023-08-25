<template>
  <template v-for="list, index in dragList">
    <Drager
      v-for="item, index2 in list"
      :key="index"
      :width="100"
      :height="100"
      :left="index2 * 150 + 30"
      :top="index * 150 + 30"
      v-bind="item"
      :style="{ color: item.color }"
    >
      {{ item.text }}
    </Drager>
  </template>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from '../../../src/drager'

const dragList = ref([
  [
    { text: '移动', resizable: false, rotatable: false },
    { color: '#00c48f', text: '移动+缩放', rotatable: false },
    { color: '#ff9f00', text: '旋转', rotatable: true, resizable: false },
    { color: '#f44336', text: '旋转+缩放', rotatable: true },
  ],
  [
    { color: '#6A00FF', text: '边界', boundary: true },
    { color: '#A20025', text: '禁用', disabled: true },
    { color: '#D80073', text: '碰撞检测', checkCollision: true },
  ]
])
</script>

