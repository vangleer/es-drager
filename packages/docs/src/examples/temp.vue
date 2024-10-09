<template>
  <Drager
    :width="100"
    :height="100"
    :left="100"
    :top="100"
    rotatable
  >
    <Drager
      :left="10"
      :top="10"
      boundary
      :z-index="1"
    >
      按钮
    </Drager>
  </Drager>

</template>

<script setup lang="ts">
import Drager from 'es-drager/index'
</script>
