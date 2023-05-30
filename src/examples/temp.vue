<template>
  <Drager :top="100" :left="100" :selected="selected"></Drager>
  <button @click="handleChange">{{ selected ? '不选中' : '选中' }}</button>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import Drager from '../drager'

const selected = ref(true)

function handleChange() {
  selected.value = !selected.value
}

</script>

<style lang='scss' scoped>
</style>