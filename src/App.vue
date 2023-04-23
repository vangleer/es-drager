<template>
  <div class="es-paint-box">
    <Drager boundary rotatable @move="handleMove">
      Drager
    </Drager>

    <!-- <Drager2 boundary @move="handleMove">
      Drager
    </Drager2> -->
    <!-- <div v-drager="{ boundary: true }"></div> -->
  </div>
</template>

<script setup lang='ts'>
// import Drager from 'es-drager'
// import Drager2 from './drager'
import Drager from './drager2/drager2.vue'
function handleMove(data: any) {
  console.log(data, 'data')
}

</script>

<style lang='scss' scoped>
.es-paint-box {
  width: 520px;
  height: 520px;
  border: 1px solid #ccc;
  margin: 100px auto;
}
</style>
