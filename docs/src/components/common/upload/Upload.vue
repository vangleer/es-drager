<template>
  <input ref="inpurRef" type="file" class="es-upload" @change="handleChange">
</template>

<script setup lang='ts'>
import { ref, onMounted, reactive, PropType } from 'vue'
import { UploadOption } from './index'
import { readFileAsText } from '@/utils'
const props = defineProps({
  option: {
    type: Object as PropType<UploadOption>,
    required: true
  }
})
const state = {
  option: props.option
}
const inpurRef = ref()

const open = (option) => {
  state.option = option
  if (inpurRef.value) inpurRef.value.click()
}

const handleChange = async (e: InputEvent) => {
  if (!state.option || !state.option.onChange) return

  const { resultType, onChange } = state.option
  let result = e
  if (resultType === 'text') {
    result = await readFileAsText(e.target.files[0])
    onChange(result)
  } else if (resultType === 'url') {
    onChange(result)
  }

  onChange(result)
}


onMounted(() => {
  open(props.option)
})

defineExpose({
  open
})
</script>

<style lang='scss' scoped>
.es-upload {
  display: none;
}
</style>
