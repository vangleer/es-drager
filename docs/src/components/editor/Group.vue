<template>
  <div class="es-group">
    <component
      :id="item.id"
      v-for="item in elements"
      :is="item.component!"
      v-bind="item.props"
      :style="item.groupStyle"
    >
      {{ item.text }}
    </component>
  </div>
</template>

<script setup lang='ts'>
import { ComponentType } from '@/components/types'
import { PropType } from 'vue'
import { DragData } from 'es-drager'

defineProps({
  elements: {
    type: Array as PropType<Required<ComponentType>[]>,
    default: () => []
  },
  data: {
    type: Object as PropType<DragData>,
    required: true
  }
})
</script>

