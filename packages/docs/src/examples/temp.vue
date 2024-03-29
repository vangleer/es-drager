<template>
  {{ selected }}
  <button @click.stop="onFocus">选中</button>
  <button @click.stop="onBlur">取消选中</button>
  <Drager
    :width="100"
    :height="100"
    :left="100"
    :top="100"
    :selected="selected"
    rotatable
    @focus="onFocus"
    @blur="onBlur"
  >
    按钮
  </Drager>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import Drager from 'es-drager/index'

const selected = ref(false)

const onFocus = () => selected.value = true

const onBlur = () => selected.value = false
</script>
