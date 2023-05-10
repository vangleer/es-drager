<template>
  <Drager
    :width="200"
    :height="120"
    :left="100"
    :top="100"
    rotatable
  >
    <img style="width: 100%;height: 100%;" :src="imgUrl">
  </Drager>
  
</template>

<script setup lang='ts'>
import Drager from '../drager'
import imgUrl from '../assets/demo.png'

</script>
