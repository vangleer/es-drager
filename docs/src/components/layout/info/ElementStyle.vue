<template>
  <el-form
    :model="store.current"
    label-width="80px"
    label-position="left"
    v-if="store.current && store.current.selected"
  >
    <el-collapse v-model="collapseList">
      <el-collapse-item title="布局/样式" name="style">
        <div class="info-color-map">
          <div class="color-list" v-for="item in itemList">
            <div class="color-item" v-for="style in item" :style="style" @click="handleColorClick(style)"></div>
          </div>
        </div>
        <el-form-item label="left">
          <el-input-number v-model="store.current.left" />
        </el-form-item>
        <el-form-item label="top">
          <el-input-number v-model="store.current.top" />
        </el-form-item>
        <el-form-item label="width">
          <el-input-number v-model="store.current.width" />
        </el-form-item>
        <el-form-item label="height">
          <el-input-number v-model="store.current.height" />
        </el-form-item>
        <el-form-item label="angle">
          <el-input-number v-model="store.current.angle" />
        </el-form-item>

        <el-form-item label="disabled">
          <el-checkbox v-model="store.current.disabled" />
        </el-form-item>
        <el-form-item label="resizable">
          <el-checkbox v-model="store.current.resizable" :checked="true" />
        </el-form-item>
        <el-form-item label="rotatable">
          <el-checkbox v-model="store.current.rotatable" :checked="true" />
        </el-form-item>

        <template v-if="store.current.style">
          <el-form-item label="背景">
            <el-color-picker v-model="store.current.style.backgroundColor" />
          </el-form-item>
          <el-form-item label="边框颜色">
            <el-color-picker v-model="store.current.style.borderColor" />
          </el-form-item>
          <el-form-item label="边框宽度">
            <el-input-number v-model="store.current.style.borderWidth" />
          </el-form-item>
          <el-form-item label="边框风格">
            <el-select v-model="store.current.style.borderStyle">
              <el-option
                v-for="item in borderStyleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>

          <el-form-item label="边框半径">
            <el-input-number v-model="store.current.style.borderRadius" />
          </el-form-item>
          <el-form-item label="透明度">
            <el-slider :modelValue="1" :step="0.01" :min="0" :max="1" @input="onChange('opacity', $event)" />
          </el-form-item>
        </template>
      </el-collapse-item>
      <el-collapse-item title="文本" name="text">
        <TextStyle />
      </el-collapse-item>
    </el-collapse>
    
  </el-form>
</template>

<script setup lang='ts'>
import { useEditorStore } from '@/store'
import { ref, CSSProperties } from 'vue'
import TextStyle from './TextStyle.vue'
const store = useEditorStore()
const collapseList = ref(['style'])
const itemList = ref<CSSProperties[][]>([
  [
    { backgroundColor: '#18141d', borderColor: '#ffffff' },
    { backgroundColor: '#f5f5f5', borderColor: '#666666' },
    { backgroundColor: '#dae8fc', borderColor: '#6b8ebf' },
    { backgroundColor: '#d5e8d4', borderColor: '#82b366' },
    { backgroundColor: '#ffe6cc', borderColor: '#d79b00' },
    { backgroundColor: '#fff2cc', borderColor: '#d6b656' },
    { backgroundColor: '#f8cecc', borderColor: '#b85450' },
    { backgroundColor: '#e1d5e7', borderColor: '#9673a6' },
  ]
])

const borderStyleList = [
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dashed' },
  { label: '点线', value: 'dotted' }
]

const handleColorClick = (style: CSSProperties) => {
  if (!store.current.selected) return
  store.current.style = { ...store.current.style, ...style }
}

function onChange(key: string, value: any) {
  (store.current.style as any)[key] = value
}
</script>

<style lang='scss' scoped>
.color-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .color-item {
    width: 22%;
    height: 24px;
    border-width: 2px;
    border-style: solid;
    margin-bottom: 10px;
  }
}
</style>
