<template>
  <Drager
    :width="300"
    :height="200"
    :left="100"
    :top="100"
    @resize="handleResize"
    rotatable
  >
    <Chart ref="chartRef" />
  </Drager>
  
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from 'es-drager'
import Chart from '@/components/Chart.vue'
const chartRef = ref()
function handleResize() {
  chartRef.value.resize()
}
</script>

<style lang='scss' scoped>

</style>