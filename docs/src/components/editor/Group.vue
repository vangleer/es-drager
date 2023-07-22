<template>
  <div class="es-group">
    <component
      v-for="item in elements"
      :is="item.component!"
      v-bind="item.props"
      :style="{
        ...item.style,
        width: item.width + 'px',
        height: item.height + 'px',
        left: item.left + 'px',
        top: item.top + 'px',
        transform: `rotate(${item.angle || 0}deg)`,
        position: 'absolute'
      }"
    >
      {{ item.text }}
    </component>
  </div>
</template>

<script setup lang='ts'>
import { ComponentType } from '@/components/types'
import { PropType } from 'vue'

defineProps({
  elements: {
    type: Array as PropType<ComponentType[]>,
    default: () => []
  }
})

</script>

