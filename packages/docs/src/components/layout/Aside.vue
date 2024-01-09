<template>
  <div class="es-layout-aside">
    <slot />
  </div>
</template>

<script lang="ts" setup>
</script>
<style lang="scss">
.es-layout-aside {
  flex-shrink: 0;
  width: var(--es-layout-aside-width);;
  height: 100%;
  border-right: var(--es-border);
  background-color: var(--es-color-bg);
}
</style>
