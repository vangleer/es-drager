<template>
  <div
    class="es-block"
    :key="item.text"
    draggable="true"
    @dragstart="emit('dragstart', $event, item)"
    @dragend="emit('dragend')"
  >
    <slot>
      <Icon :name="item.text" />
      <span class="block-text">{{ item.text }}</span>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'
import { ComponentType } from '../../../types'
import Icon from '../../common/svgIcon/Icon.vue'
defineProps({
  item: {
    type: Object as PropType<ComponentType>,
    required: true
  }
})

const emit = defineEmits(['dragstart', 'dragend'])
</script>