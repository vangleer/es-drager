<template>
  <div class="es-group">
    <component
      :id="item.id"
      v-for="item in elements"
      :is="item.component!"
      v-bind="item.props"
      :style="item.groupStyle"
    >
      <TextEditor
        v-if="item.text"
        :text="item.text"
      />
    </component>
  </div>
</template>

<script setup lang="ts">
import { ComponentType } from '../../types'
import { PropType } from 'vue'
import TextEditor from './TextEditor.vue'

defineProps({
  elements: {
    type: Array as PropType<Required<ComponentType>[]>,
    default: () => []
  }
})
</script>
