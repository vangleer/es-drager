<template>
  <Drager
    :width="100"
    :height="100"
    :left="100"
    :top="100"
    rotatable
    @drag-start="onDragStart"
    @drag-end="onDragEnd"
    @click="handleClick"
  >
    按钮
  </Drager>

</template>

<script setup lang="ts">
import Drager from 'es-drager/index'
let timer = 0
function onDragStart() {
  timer = Date.now()
}
function onDragEnd() {
  timer = Date.now() - timer
}

const handleClick = () => {
  if (timer <= 300) {
    console.log('emit click')
  }
}
</script>

