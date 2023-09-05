<template>
  <input
    ref="inpurRef"
    type="file"
    :accept="state.option?.accept"
    class="es-upload"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, PropType } from 'vue'
import { UploadOption } from './index'
const acceptMap = {
  json: '.json',
  image: 'image/*'
}
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

const open = (option: UploadOption) => {
  state.option = option
  let accept = (acceptMap as any)[option.resultType]
  if (option.accept) {
    accept = option.accept
  }
  inpurRef.value.setAttribute('accept', accept)
  inpurRef.value.click()
}

const handleChange = async (e: Event) => {
  if (!state.option || !state.option.onChange) return

  const { resultType, onChange } = state.option
  let result: any = e
  const file: File = (e.target as any).files[0]
  // 如果是json或text使用readAsText读取
  if (['json', 'text'].includes(resultType)) {
    result = await readFile(file)
  } else if (resultType === 'image') {
    // 按照base64读取
    result = await readFile(file, resultType)
  }

  // 调用onChange回调并把数据传递过去
  onChange(result)
  inpurRef.value.value = ''
}

/**
 * 读取文件的文本内容
 */
const readFile = (file: File, type: string = 'text') => {
  return new Promise(resolve => {
    const reader = new FileReader()
    reader.addEventListener('load', e => {
      const result = e.target!.result || '{}'
      resolve(result)
    })

    if (type === 'text') {
      reader.readAsText(file)
    } else {
      reader.readAsDataURL(file)
    }
  })
}

onMounted(() => {
  open(props.option)
})

defineExpose({
  open
})
</script>

<style lang="scss" scoped>
.es-upload {
  display: none;
}
</style>
