<template>
  <div class="es-paint-box">
    <Drager boundary @move="handleMove" disabled>
      123465
    </Drager>
    <div v-drager="{ boundary: true }"></div>
  </div>
</template>

<script setup lang='ts'>
// import Drager from 'es-drager'
import Drager from './drager'
function handleMove(data: any) {
  console.log(data, 'data')
}

</script>

<style lang='scss' scoped>
.es-paint-box {
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
}
</style>
