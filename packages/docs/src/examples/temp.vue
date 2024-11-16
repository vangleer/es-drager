<template>
  <Drager
    type="text"
    v-bind="dragData"
    rotatable
    boundary
    @resize="handleResize"
  >
    <div :contenteditable="true" style="text-align: center;width: 100%;">啦啦啦啦啦啦啦啦</div>
  </Drager>

  <Drager type="image" :width="200" :height="120" :left="200" :top="200" rotatable>
    <img class="img" style="width: 100%; height: 100%" :src="imgUrl" />
  </Drager>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import imgUrl from '../assets/demo.png'
import Drager from 'es-drager/index'

const textRef = ref<HTMLElement>()
const dragData = ref<any>({
  left: 100,
  top: 100,
})

function handleResize(_: any, resizeType: string) {
  // if (resizeType && !resizeType.includes('-')) {
  //   const style = window.getComputedStyle(textRef.value!)
  //   dragData.value.height = parseInt(style.height)
  // }
}

</script>
