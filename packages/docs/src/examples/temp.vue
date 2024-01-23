<template>
  <Drager
    :width="100"
    :height="100"
    :left="100"
    :top="100"
    rotatable
    @focus="onFocus"
    @blur="onBlur"
  >
    测试
  </Drager>

</template>

<script setup lang="ts">
import Drager from 'es-drager/index'
function onFocus(val: boolean) {
  console.log('onFocus')
}
function onBlur(val: boolean) {
  console.log('onBlur')
}
</script>

