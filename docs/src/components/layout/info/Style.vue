<template>
  <div class="es-info-style" @click.stop>
    <el-form
      :model="store.current"
      label-width="80px"
      label-position="left"
      v-if="store.current && store.current.selected"
    >
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
        <el-form-item label="边框颜色">
          <el-color-picker v-model="store.current.style.borderColor" />
        </el-form-item>
      </template>
    </el-form>

    <el-form
      v-else
      :model="store.data.container"
      label-width="80px"
      label-position="left"
    >
      <el-form-item label="画布比例">
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
  </div>
</template>

<script setup lang='ts'>
import { useEditorStore } from '@/store'
import { ref, CSSProperties, computed } from 'vue'
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
    { backgroundColor: '#e1d5e7', borderColor: '#9673a6' },
  ]
])

const borderStyleList = [
  { label: '实线', value: 'solid' },
  { label: '虚线', value: 'dashed' },
  { label: '点线', value: 'dotted' }
]

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

const handleColorClick = (style: CSSProperties) => {
  if (!store.current.selected) return
  store.current.style = { ...store.current.style, ...style }
}
</script>

<style lang='scss' scoped>
.es-info-style {
  padding: 0 10px;
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
}
</style>
