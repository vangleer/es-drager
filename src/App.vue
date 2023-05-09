<template>
  <div class="es-app">
    <!-- <Example /> -->

    <Drager :left="left" :top="100" :angle="30" />

    <button @click="change">change</button>
  </div>
</template>

<script setup lang='ts'>
import Example from './example.vue'
import Drager from './drager/src/drager.vue'
import { ref } from 'vue';

const left = ref(100)

function change() {
  left.value = 200
}
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
