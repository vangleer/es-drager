<template>
  <el-form
    :model="store.current"
    label-width="80px"
    label-position="left"
    v-if="store.current && store.current.selected"
  >
    <div class="info-color-map">
      <div class="color-list" v-for="item in itemList">
        <div
          class="color-item"
          v-for="style in item"
          :style="style"
          @click="handleColorClick(style)"
        ></div>
      </div>
    </div>

    <el-divider />
    
    <el-form-item label="透明度">
      <el-slider
        :modelValue="1"
        :step="0.01"
        :min="0"
        :max="1"
        @input="onChange('opacity', $event)"
      />
    </el-form-item>

    <template v-if="store.current.style">
      <el-form-item label="背景颜色">
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
    </template>

    <el-divider />

    <TextStyle />
  </el-form>
</template>

<script setup lang="ts">
import { ref, CSSProperties } from 'vue'
import TextStyle from './TextStyle.vue'
import { useEditorStore } from '@es-drager/editor/src/store'
const store = useEditorStore()
const itemList = ref<CSSProperties[][]>([
  [
    { backgroundColor: '#18141d', borderColor: '#ffffff' },
    { backgroundColor: '#f5f5f5', borderColor: '#666666' },
    { backgroundColor: '#dae8fc', borderColor: '#6b8ebf' },
    { backgroundColor: '#d5e8d4', borderColor: '#82b366' },
    { backgroundColor: '#ffe6cc', borderColor: '#d79b00' },
    { backgroundColor: '#fff2cc', borderColor: '#d6b656' },
    { backgroundColor: '#f8cecc', borderColor: '#b85450' },
    { backgroundColor: '#e1d5e7', borderColor: '#9673a6' }
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
  ;(store.current.style as any)[key] = value
}
</script>

<style lang="scss" scoped>
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
.es-col {
  display: flex;
  align-items: center;
}
.text-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: var(--el-fill-color-light);
  }
  :deep(.es-icon) {
    margin-right: 4px;
  }
}
:deep(.el-row) {
  margin-bottom: 10px;
  .el-button-group, .el-checkbox-group {
    display: inline-flex;
    width: 100%;
  }
  .el-checkbox-group, .el-checkbox-button__inner {
    width: 100%;
  }
}
</style>
