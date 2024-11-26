<template>
  <div
    ref="textRef"
    :class="['es-text', { editable }]"
    :contenteditable="editable"
    @blur="textBlur"
  >
    {{ text }}
  </div>
</template>

<script setup lang="ts">
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

/** text文本 双向绑定 */
const emit = defineEmits(['update:text'])
const textBlur = (e: Event) => {
  const val = (e.target as HTMLDivElement).innerText
  emit('update:text', val)
}

const textRef = ref()

function selectText() {
  if (!textRef.value) return

  const range = document.createRange()
  range.selectNode(textRef.value)
  window.getSelection()!.removeAllRanges()
  window.getSelection()!.addRange(range)
}

watch(
  () => [props.editable],
  () => {
    if (props.editable) {
      selectText()
    }
  }
)
</script>

<style lang="scss" scoped>
.es-text {
  width: calc(100% - 1px);
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  word-break: break-all;
  display: flex;
  justify-content: center;
  align-items: center;
  &.editable {
    z-index: 1;
    cursor: text;
  }
}
</style>
