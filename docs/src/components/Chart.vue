<template>
  <div ref="chartRef" style="width: 100%; height: 100%"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { t } from '@/plugins/locales'
const chartRef = ref()
let chart: echarts.ECharts | null = null

function init() {
  chart = echarts.init(chartRef.value)
  // 绘制图表
  chart.setOption({
    title: {
      text: t('examples.chartTitle')
    },
    tooltip: {},
    xAxis: {
      data: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6']
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
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
