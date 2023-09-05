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

<script setup lang="ts">
import { ComponentType } from '@/components/types'
import { PropType } from 'vue'

defineProps({
  elements: {
    type: Array as PropType<Required<ComponentType>[]>,
    default: () => []
  }
})
</script>
