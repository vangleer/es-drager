<template>
  <div ref="textRef" :class="['es-text', { editable }]" :contenteditable="editable" select>
    <slot>{{ text }}</slot>
  </div>
</template>

<script setup lang='ts'>
import { ref, watch } from 'vue'

const props = defineProps({
  editable: {
    type: Boolean,
    default: false
  },
  text: {
    type: String
  }
})

const textRef = ref()

function selectText() {
  if (!textRef.value) return

  const range = document.createRange()
  range.selectNode(textRef.value)
  window.getSelection()!.removeAllRanges()
  window.getSelection()!.addRange(range)
}

watch(() => [props.editable], () => {
  if (props.editable) {
    selectText()
  }
})

</script>

<style lang='scss' scoped>
.es-text {
  width: calc(100% - 1px);
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  word-break: break-all;
  display: inline-block;
  &.editable {
    z-index: 1;
    cursor: text;
  }
}
</style>
