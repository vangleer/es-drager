<template>
  <el-form
    :model="store.current"
    label-width="80px"
    label-position="left"
    v-if="store.current && store.current.selected"
  >
    <el-row :gutter="10">
      <el-col :span="12"><InputNumber v-model="store.current.left" prefix="X" /></el-col>
      <el-col :span="12"><InputNumber v-model="store.current.top" prefix="Y" /></el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12"><InputNumber v-model="store.current.width" prefix="W" /></el-col>
      <el-col :span="12"><InputNumber v-model="store.current.height" prefix="H" /></el-col>
    </el-row>
    
    <el-row :gutter="10">
      <el-col :span="12"><InputNumber v-model="store.current.angle" prefix="旋转" /></el-col>
      <el-col :span="12" class="es-col">
        <div class="text-btn" @click="handleUpdateAngle(-45)"><SvgIcon name="rotate-left" /> -45°</div>
        <div class="text-btn" @click="handleUpdateAngle(45)"><SvgIcon name="rotate-right" /> +45°</div>
      </el-col>
    </el-row>

    <el-divider />

    <el-row>
      <el-button-group style="display: inline-flex;">
        <el-tooltip v-for="item in alignX" placement="top" :show-after="300" :content="item.label">
          <el-button style="flex: 1;" @click="handleAlign(item.value)"><SvgIcon :name="item.value" :size="20" /></el-button>
        </el-tooltip>
      </el-button-group>
    </el-row>

    <el-row>
      <el-button-group style="display: inline-flex;">
        <el-tooltip v-for="item in alignY" placement="top" :show-after="300" :content="item.label">
          <el-button style="flex: 1;" @click="handleAlign(item.value)"><SvgIcon :name="item.value" :size="20" /></el-button>
        </el-tooltip>
      </el-button-group>
    </el-row>

    <el-divider />

    <el-row>
      <el-checkbox-group v-model="options1Value" size="small" @change="handleOptions1Change">
        <el-tooltip v-for="item in options1" placement="top" :show-after="300" :content="item.label">
          <el-checkbox-button style="flex: 1;" :label="item.value" :value="item.value">
            <SvgIcon :name="item.value" :size="20" />
          </el-checkbox-button>
        </el-tooltip>
      </el-checkbox-group>
    </el-row>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEditorStore } from '@es-drager/editor/src/store'
import InputNumber from '../components/InputNumber.vue'
import SvgIcon from '../components/svgIcon/SvgIcon.vue'
const store = useEditorStore()

// 水平对齐
const alignX = [
  { label: '左对齐', value: 'justify-left' },
  { label: '水平居中', value: 'justify-center' },
  { label: '右对齐', value: 'justify-right' },
]
// 垂直对齐
const alignY = [
  { label: '上对齐', value: 'align-top' },
  { label: '垂直居中', value: 'align-center' },
  { label: '下对齐', value: 'align-bottom' },
]

const options1Value = ref(['resizable', 'rotatable'])
const options1 = [
  { label: '禁用', value: 'disabled' },
  { label: '可缩放', value: 'resizable' },
  { label: '可旋转', value: 'rotatable' },
]

function handleUpdateAngle(num: number) {
  store.current.angle = (store.current.angle || 0) + num
}

function handleOptions1Change(val: string[]) {
  const keys = options1.map(item => item.value)
  keys.forEach(key => {
    if (val.includes(key)) {
      (store.current as any)[key] = true
    } else {
      (store.current as any)[key] = false
    }
  })
}

function handleAlign(type: string) {
  const { width, height } = store.data.container.style as any
  switch (type) {
    case 'justify-left':
      store.current.left = 0
      break
    case 'justify-center':
      store.current.left = width / 2 - store.current.width! / 2
      break
    case 'justify-right':
      store.current.left = width - store.current.width!
      break
    case 'align-top':
      store.current.top = 0
      break
    case 'align-center':
      store.current.top = height / 2 - store.current.height! / 2
      break
    case 'align-bottom':
      store.current.top = height - store.current.height!
      break

  }
}
</script>

<style lang="scss" scoped>
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
