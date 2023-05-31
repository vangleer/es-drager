<template>
  <div ref="chartRef" style="width: 100%;height: 100%;" @click.stop></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

const chartRef = ref()
let chart: echarts.ECharts | null = null

function init() {
  chart = echarts.init(chartRef.value)
  // 绘制图表
  chart.setOption({
    title: {
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  })
}

function resize() {
  chart?.resize()
}

onMounted(() => {
  init()
})

defineExpose({
  resize
})

</script>