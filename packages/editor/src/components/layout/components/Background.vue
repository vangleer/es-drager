<template>
  <el-row :gutter="10">
    <el-col :span="12">
      <el-select v-model="type">
        <el-option v-for="item in typeList" v-bind="item" />
      </el-select>
    </el-col>
    <el-col :span="12">
      <ColorPicker v-if="type === 1" v-model="value" />
      <el-select v-else v-model="gradientType" @change="handleGradientColorChange(gradientRotate, startColor, endColor)">
        <el-option v-for="item in gradientTypeList" v-bind="item" />
      </el-select>
    </el-col>
  </el-row>
  <template v-if="type === 2">
    <el-row :gutter="10">
      <el-col :span="12"> 起点颜色: </el-col>
      <el-col :span="12"><ColorPicker v-model="startColor" /></el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12"> 终点颜色: </el-col>
      <el-col :span="12"><ColorPicker v-model="endColor" /></el-col>
    </el-row>
    <el-row :gutter="10" v-if="gradientType === 'linear'">
      <el-col :span="12"> 渐变角度: </el-col>
      <el-col :span="12"><el-slider size="small" v-model="gradientRotate" :max="360" /></el-col>
    </el-row>
  </template>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import ColorPicker from './ColorPicker.vue'
const props = defineProps({
  modelValue: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get: () => props.modelValue,
  set: (val) => {
    emit('update:modelValue', val)
  } 
})
const typeList = [
  { label: '纯色背景', value: 1 },
  { label: '渐变背景', value: 2 },
  // { label: '背景图片', value: 'backgroundImage' },
]
const type = ref(typeList[0].value)

const gradientTypeList = [
  { label: '线性渐变', value: 'linear' },
  { label: '径向渐变', value: 'radial' },
]
const gradientType = ref(gradientTypeList[0].value)
const startColor = computed({
  get: () => getGradientValue('startColor'),
  set: (val) => {
    handleGradientColorChange(gradientRotate.value, val, endColor.value)
  }
})
const endColor = computed({
  get: () => getGradientValue('endColor'),
  set: (val) => {
    handleGradientColorChange(gradientRotate.value, startColor.value, val)
  }
})
const gradientRotate = computed({
  get: () => getGradientValue('gradientRotate'),
  set: (val) => {
    handleGradientColorChange(val, startColor.value, endColor.value)
  }
})

function getGradientValue(type: string) {
  const gradientString = value.value || ''
  let gradientRegex = /gradient\((\d+deg),\s*(rgba?\([^)]+\)),\s*(rgba?\([^)]+\))\)/
  const isRadial = gradientType.value === 'radial'
  if (isRadial) {
    gradientRegex = /(gradient)\(.*(rgba?\([^)]+\)),\s*(rgba?\([^)]+\))\)/
  }

  const match = gradientString.match(gradientRegex)
  const defaultValue = type === 'gradientRotate' ? 90 : 'rgba(255, 255, 255, 1)'
  if (!match) {
    return defaultValue
  }
  if (type === 'startColor') {
    return match[2] || defaultValue
  } else if (type === 'endColor') {
    return match[3] || defaultValue
  } else if (type === 'gradientRotate') {
    return parseInt(match[1]) || defaultValue
  }
 
  return defaultValue
}

function handleGradientColorChange(rotate: string | number, startColor: string | number, endColor: string | number) {
  let val = `linear-gradient(${rotate}deg, ${startColor}, ${endColor})`
  if (gradientType.value === 'radial') {
    val = `radial-gradient(${startColor}, ${endColor})`
  }

  emit('update:modelValue', val)
}
</script>

<style lang='scss' scoped>

</style>
