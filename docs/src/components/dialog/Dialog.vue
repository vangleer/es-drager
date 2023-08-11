<template>
  <ElDialog
    v-model="state.visible"
    v-bind="state.option"
    draggable
  >
    <div id="esEditor"></div>

    <template #footer>
      <ElButton @click="close">取消</ElButton>
      <ElButton type="primary" @click="handleConfirm">确定</ElButton>
    </template>
  </ElDialog>
</template>

<script setup lang='ts'>
import { ElButton, ElDialog } from 'element-plus'
import { nextTick, reactive } from 'vue'
import ace from 'ace-builds'
import 'ace-builds/src-min-noconflict/theme-one_dark'
import 'ace-builds/src-min-noconflict/mode-json5'
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
let editor: ace.Ace.Editor
const open = (option: Record<string, any>) => {
  state.option = option
  state.visible = true

  nextTick(() => {
    editor = ace.edit('esEditor', {
      maxLines: 34,
      minLines: 34,
      fontSize: 14,
      theme: 'ace/theme/one_dark',
      mode: 'ace/mode/json5',
      tabSize: 4,
      readOnly: false
    })

    editor.setValue(JSON.stringify(JSON.parse(state.option.content), null, 4))
  })
}
const close = () => {
  state.visible = false
}

const handleConfirm = () => {
  const { confirm } = state.option
  confirm && confirm(editor && editor.getValue())
}

defineExpose({
  open,
  close
})
</script>

<style lang='scss' scoped>

</style>
