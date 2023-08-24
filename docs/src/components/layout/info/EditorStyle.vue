<template>
  <el-form
    :model="store.data.container"
    label-width="90px"
    label-position="left"
    style="padding: 0 10px;"
  >
    <el-form-item label="画布尺寸">
      <el-select v-model="editorSize">
        <el-option-group
          v-for="group in screenSize"
          :key="group.label"
          :label="group.label"
        >
          <el-option
            v-for="item in group.options"
            :label="item.label"
            :value="item.value"
          />
        </el-option-group>
      </el-select>
    </el-form-item>

    <el-form-item label="缩放比例(%)">
      <el-input v-model.number="scaleRatio" @change="handleScaleRatioChange" />
    </el-form-item>

    <el-form-item label="画布宽度">
      <el-input-number v-model="store.data.container.style.width" />
    </el-form-item>
    <el-form-item label="画布高度">
      <el-input-number v-model="store.data.container.style.height" />
    </el-form-item>

    <el-form-item label="网格">
      <el-switch v-model="store.data.container.snapToGrid" />
    </el-form-item>
    <el-form-item label="网格大小">
      <el-input-number v-model="store.data.container.gridSize" />
    </el-form-item>
    <el-form-item label="网格颜色">
      <el-color-picker v-model="store.data.container.gridColor" />
    </el-form-item>

    <el-form-item label="背景颜色">
      <el-color-picker v-model="store.data.container.style.backgroundColor" />
    </el-form-item>

    <el-form-item label="参考线">
      <el-checkbox v-model="store.data.container.markline.show" />
    </el-form-item>
  </el-form>
</template>

<script setup lang='ts'>
import { useEditorStore } from '@/store'
import { ref, computed } from 'vue'
const store = useEditorStore()

const scaleRatio = ref(100)
const editorSize = computed({
  get: () => {
    const { width, height } = store.data.container.style
    return `${width} x ${height}`
  },
  set: (val) => {
    const [width, height] = val.split(' x ')
    store.data.container.style.width = +width
    store.data.container.style.height = +height
  }
})

const screenSize = [
  {
    label: 'PC',
    options: [
      { label: '1360 x 760', value: '1360 x 760' },
      { label: '1280 x 720', value: '1280 x 720' },
      { label: '800 x 600', value: '800 x 600' }
    ]
  },
  {
    label: 'H5',
    options: [
      { label: '360 x 780', value: '360 x 780' },
      { label: 'iPhone 6/7/8', value: '375 x 667' },
      { label: 'iPhone 6/7/8 Plus', value: '414 x 736' }
    ]
  }
]

const handleScaleRatioChange = (val: number) => {
  store.data.container.scaleRatio = val / 100
}

</script>

