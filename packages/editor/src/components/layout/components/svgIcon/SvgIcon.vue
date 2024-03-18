<template>
  <i class="es-icon" :style="style" v-html="icon"></i>
</template>

<script lang="ts" setup>
import { computed, CSSProperties } from 'vue'
import { IconProps, getIcon } from './svg-icon'

const props = defineProps(IconProps)

const icon = computed(() => getIcon(props.name))
const style = computed<CSSProperties>(() => {
  if (!props.size && !props.color) return {}

  return {
    fontSize: typeof props.size === 'string' ? props.size : `${props.size}px`,
    '--color': props.color,
  }
})
</script>

<style scoped lang="scss">
.es-icon {
  --color: inherit;
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--color);
  font-size: inherit;
  font-style: normal;
  svg {
    height: 1em;
    width: 1em;
  }
}
</style>
