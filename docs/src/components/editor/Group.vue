<template>
  <div class="es-group">
    <component
      v-for="item in list"
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
import { PropType, computed } from 'vue'

const props = defineProps({
  elements: {
    type: Array as PropType<ComponentType[]>,
    default: () => []
  },
  data: {
    type: Object as PropType<ComponentType>,
    default: () => ({})
  }
})

const list = computed(() => {
  return props.elements.map(item => {
    return { ...item }
  })
})

</script>

