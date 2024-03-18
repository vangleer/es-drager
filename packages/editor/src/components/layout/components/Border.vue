<template>
  <div v-if="store.current.style">
    <el-row :gutter="10">
      <el-col :span="10">边框颜色:</el-col>
      <el-col :span="14">
        <ColorPicker v-model="store.current.style.borderColor" />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="10">边框宽度:</el-col>
      <el-col :span="14">
        <InputNumber v-model="store.current.style.borderWidth" />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="10">边框风格:</el-col>
      <el-col :span="14">
        <el-select v-model="borderStyle">
          <el-option
            v-for="item in borderStyleList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">边框半径:</el-col>
      <el-col :span="14">
        <InputNumber v-model="store.current.style.borderRadius" />
      </el-col>
    </el-row>
  </div>
  
</template>

<script setup lang='ts'>
import { computed } from 'vue'
import InputNumber from './InputNumber.vue'
import ColorPicker from './ColorPicker.vue'
import { useEditorStore } from '@es-drager/editor/src/store'
const store = useEditorStore()

const borderStyleList = [
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dashed' },
  { label: '点线', value: 'dotted' }
]
const borderStyle = computed({
  get: () => store.current.style!.borderStyle || 'solid',
  set: (val) => {
    store.current.style!.borderStyle = val
  }
})
</script>

<style lang='scss' scoped>

</style>
