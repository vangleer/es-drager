<template>
  <div class="es-app">
    <!-- <Example /> -->

    <Drager :left="100" :top="100" />
  </div>
</template>

<script setup lang='ts'>
// import Example from './example.vue'
import Drager from './drager/src/drager.vue'
</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
}
html, body {
  background-color: #f8f8f8;
}
</style>
