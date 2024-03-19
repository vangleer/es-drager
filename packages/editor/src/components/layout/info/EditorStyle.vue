<template>
  <el-form
    :model="store.data.container"
    label-width="90px"
    label-position="left"
    style="padding: 0 10px"
  >
    <el-row :gutter="10">
      <el-col :span="10">画布尺寸:</el-col>
      <el-col :span="14">
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
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">缩放比例:</el-col>
      <el-col :span="14">
        <el-input v-model.number="scaleRatio" @change="handleScaleRatioChange">
          <template #suffix>%</template>
        </el-input>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">画布宽度:</el-col>
      <el-col :span="14">
        <InputNumber v-model="store.data.container.style.width" />
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">画布高度:</el-col>
      <el-col :span="14">
        <InputNumber v-model="store.data.container.style.height" />
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">画布高度:</el-col>
      <el-col :span="14">
        <InputNumber v-model="store.data.container.style.height" />
      </el-col>
    </el-row>

    <el-divider />

    <Background v-model="elementBg" />
    <el-divider />

    <el-row :gutter="10">
      <el-col :span="10">画布网格:</el-col>
      <el-col :span="14">
        <div style="display: flex; justify-content: flex-end;"><el-switch v-model="store.data.container.snapToGrid" /></div>
      </el-col>
    </el-row>

    <template v-if="store.data.container.snapToGrid">
      <el-row :gutter="10">
        <el-col :span="10">网格大小:</el-col>
        <el-col :span="14">
          <InputNumber v-model="store.data.container.gridSize" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">网格颜色:</el-col>
        <el-col :span="14">
          <ColorPicker v-model="store.data.container.gridColor" />
        </el-col>
      </el-row>
    </template>

    <el-divider />

    <el-row :gutter="10">
      <el-col :span="10">参考线:</el-col>
      <el-col :span="14">
        <div style="display: flex; justify-content: flex-end;"><el-switch v-model="store.data.container.markline.show" /></div>
      </el-col>
    </el-row>
    
  </el-form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import InputNumber from '../components/InputNumber.vue'
import Background from '../components/Background.vue'
import ColorPicker from '../components/ColorPicker.vue'
import { useEditorStore } from '@es-drager/editor/src/store'
const store = useEditorStore()

const scaleRatio = ref(100)
const editorSize = computed({
  get: () => {
    const { width, height } = store.data.container.style
    return `${width} x ${height}`
  },
  set: val => {
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

const elementBg = computed<any>({
  get: () => store.data.container.style.background || store.data.container.style.backgroundColor,
  set: (val) => {
    store.data.container.style.background = val
  }
})

const handleScaleRatioChange = (val: number) => {
  store.data.container.scaleRatio = val / 100
}
</script>
