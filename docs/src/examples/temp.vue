<template>
  <button @click="selected = !selected">切换选中</button>

  <Drager
    :width="100"
    :height="100"
    :left="100"
    :top="100"
    rotatable
    boundary
  >
    测试
  </Drager>
  <Drager
    :tag="Demo"
    :left="100"
    :top="300"
    rotatable
    boundary
  >
    123465
  </Drager>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from 'es-drager'
import Demo from '@/components/Demo.vue'
const selected = ref(false)
</script>

<style lang='scss' scoped>
</style>