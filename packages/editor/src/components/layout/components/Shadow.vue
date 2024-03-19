

<template>
  <div v-if="store.current.style">
    <el-row :gutter="10">
      <el-col :span="10">开启阴影:</el-col>
      <el-col :span="14">
        <div style="display: flex; justify-content: flex-end;"><el-switch v-model="shadow" /></div>
      </el-col>
    </el-row>
    
    <template v-if="shadow">
      <el-row :gutter="10">
        <el-col :span="10">水平阴影:</el-col>
        <el-col :span="14">
          <el-slider v-model="shadowX" :step="1" :min="-10" :max="10" size="small" @change="onChange" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">垂直阴影:</el-col>
        <el-col :span="14">
          <el-slider v-model="shadowY" :step="1" :min="-10" :max="10" size="small" @change="onChange" />
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="10">模糊距离:</el-col>
        <el-col :span="14">
          <el-slider v-model="shadowBlur" :step="1" :min="1" :max="20" size="small" @change="onChange" />
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="10">阴影颜色:</el-col>
        <el-col :span="14">
          <ColorPicker v-model="shadowColor" @change="onChange" />
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, watch } from 'vue'
import ColorPicker from './ColorPicker.vue'
import { useEditorStore } from '@es-drager/editor/src/store'
const store = useEditorStore()
const shadow = ref(false)
const shadowX = ref(3)
const shadowY = ref(3)
const shadowBlur = ref(1)
const shadowColor = ref('#808080')
const boxShadow = computed(() => `${shadowX.value}px ${shadowY.value}px ${shadowBlur.value}px ${shadowColor.value}`)
function onChange() {
  store.current.style!.boxShadow = boxShadow.value
}

watch(shadow, (val) => {
  if (val) {
    store.current.style!.boxShadow = boxShadow.value
  } else {
    store.current.style!.boxShadow = undefined
  }
})
</script>

