<template>
  <ElDialog
    v-model="state.visible"
    v-bind="state.option"
    draggable
  >
    <ElInput
      v-model="state.option.content"
      type="textarea"
      :rows="10"
    />

    <template #footer>
      <ElButton @click="close">取消</ElButton>
      <ElButton type="primary" @click="handleConfirm">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang='ts'>
import { ElButton, ElDialog, ElInput } from 'element-plus'
import { reactive } from 'vue';
const props = defineProps({
  option: {
    type: Object,
    default: () => ({})
  }
})

const state = reactive({
  option: props.option,
  visible: false
})

const open = (option: Record<string, any>) => {
  state.option = option
  state.visible = true
}
const close = () => {
  state.visible = false
}

const handleConfirm = () => {
  const { confirm } = state.option
  confirm && confirm(state.option.content)
}

defineExpose({
  open,
  close
})
</script>

<style lang='scss' scoped>

</style>
