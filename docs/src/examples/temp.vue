<template>
  <button @click="selected = !selected">切换选中</button>

  <Drager
    :left="100"
    :top="300"
    rotatable
    boundary
  >
  </Drager>

</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from '../../../src/drager'
const selected = ref(false)
</script>

<style lang='scss' scoped>
</style>