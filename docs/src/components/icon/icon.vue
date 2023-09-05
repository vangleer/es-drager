<template>
  <i class="es-icon" :style="getStyle()">
    <component :is="icon!"></component>
  </i>
</template>
<script setup lang="ts" name="ElIconWrapper">

import { CSSProperties, PropType } from 'vue'
import { ComponentType } from '../types'

  const props = defineProps({
    element: Object as PropType<ComponentType>,
    icon: String
  });

  function getStyle() {
    if (!props.element) return
    const style: CSSProperties = {}
    const { width, height } = props.element
    if (width && height) {
      style['--font-size'] = Math.min(width, height) + 'px'
    }

    if (props.element?.style?.color) {
      style['--color'] = props.element?.style?.color
    }

    return style
  }
</script>
<style lang="scss" scoped>
.es-icon {
  --color: inherit;
  --font-size: inherit;
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--color);
  font-size: var(--font-size);
}
</style>
