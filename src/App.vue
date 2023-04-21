<template>
  <div class="es-paint-box">
    <Drager boundary>
      123465
    </Drager>
  </div>
</template>

<script setup lang='ts'>
import Drager from './components/drager'

</script>

<style lang='scss' scoped>
.es-paint-box {
  width: 500px;
  height: 500px;
  border: 1px solid #ccc;
}
</style>
