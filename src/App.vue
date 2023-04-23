<template>
  <div class="es-paint-box">
    <Drager boundary rotatable @move="handleMove">
      <div class="my-comp">
        Drager1
      </div>
    </Drager>
    <Drager boundary rotatable @move="handleMove">
      <div class="my-comp">
        Drager2
      </div>
    </Drager>
    <Drager boundary rotatable @move="handleMove">
      <div class="my-comp">
        Drager3
      </div>
    </Drager>
  </div>
</template>

<script setup lang='ts'>

import Drager from './drager'
function handleMove(data: any) {
  console.log(data, 'data')
}

</script>

<style lang='scss' scoped>
.es-paint-box {
  width: 820px;
  height: 320px;
  border: 1px solid #ccc;
  margin: 100px auto;
}
.my-comp {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #c3dddc;
}
</style>
