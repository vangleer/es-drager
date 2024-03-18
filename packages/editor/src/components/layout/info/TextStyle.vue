<template>
  <div>
    <el-row v-for="(block, index) in fontStyleListFormat">
      <el-button-group style="display: inline-flex;">
        <el-tooltip v-for="item in block" placement="top" :show-after="300" :content="item.label">
          <el-button
            :type="item.selected ? 'primary' : ''"
            style="flex: 1;"
            :style="index === 0 ? { [item.key]: item.value } : {}"
            @click="handleFontStyleClick(item)"
          >
            <template v-if="index === 0">{{ item.icon }}</template>
            <SvgIcon v-else :name="item.icon" :size="20" />
          </el-button>
        </el-tooltip>
      </el-button-group>
    </el-row>

    <el-divider />

    <el-row :gutter="10">
      <el-col :span="10">字体颜色:</el-col>
      <el-col :span="14">
        <ColorPicker v-model="textStyle.color" />
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">标题:</el-col>
      <el-col :span="14">
        <el-select
          v-model="titleValue"
          placeholder="标题"
          @change="handleTitleChange"
        >
          <el-option
            v-for="item in titles"
            :label="item.label"
            :value="item.value"
          >
            <span :style="{ fontSize: item.value, fontWeight: 'bold' }">{{
              item.label
            }}</span>
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">字体:</el-col>
      <el-col :span="14">
        <el-select v-model="textStyle.fontFamily" placeholder="字体">
          <el-option
            v-for="item in fontFamilyList"
            :label="item.label"
            :value="item.label"
          >
            <span :style="{ fontFamily: item.label }">{{ item.label }}</span>
          </el-option>
        </el-select>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">字体大小:</el-col>
      <el-col :span="14">
        <el-input v-model="textStyle.fontSize" />
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">行高:</el-col>
      <el-col :span="14">
        <InputNumber v-model="textStyle.lineHeight" />
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="10">文本:</el-col>
      <el-col :span="14">
        <el-input type="textarea" v-model="store.current.text" />
      </el-col>
    </el-row>
    
  </div>
</template>

<script setup lang="ts">
import { ref, CSSProperties, computed } from 'vue'
import ColorPicker from '../components/ColorPicker.vue'
import InputNumber from '../components/InputNumber.vue'
import SvgIcon from '../components/svgIcon/SvgIcon.vue'
import { useEditorStore } from '@es-drager/editor/src/store'
const store = useEditorStore()

const titles = [
  { label: '正常', value: 'normal' },
  { label: '标题 1', value: '2em' },
  { label: '标题 2', value: '1.5em' },
  { label: '标题 3', value: '1.17em' },
  { label: '标题 4', value: '1em' },
  { label: '标题 5', value: '0.9em' },
  { label: '标题 6', value: '0.8em' }
]
const titleValue = ref('')
const defaultList = [
  { label: '加粗', icon: 'B', key: 'fontWeight', value: 'bold' },
  { label: '斜体', icon: 'I', key: 'fontStyle', value: 'italic' },
  { label: '下划线', icon: 'U', key: 'textDecoration', value: 'underline' },
  { label: '中划线', icon: 'S', key: 'textDecoration', value: 'line-through' },

  { label: '左对齐', icon: 'left', key: 'justifyContent', value: 'flex-start' },
  { label: '水平居中', icon: 'center', key: 'justifyContent', value: 'center' },
  { label: '右对齐', icon: 'right', key: 'justifyContent', value: 'flex-end' },

  { label: '上对齐', icon: 'top', key: 'alignItems', value: 'flex-start' },
  { label: '垂直居中', icon: 'middle', key: 'alignItems', value: 'center' },
  { label: '下对齐', icon: 'bottom', key: 'alignItems', value: 'flex-end' }
]
const fontStyleList = computed(() => {
  return [...defaultList].map(item => {
    return { ...item, selected: getValue(item.key) === item.value }
  })
})

const fontStyleListFormat = computed(() => {
  return [
    fontStyleList.value.slice(0, 4),
    fontStyleList.value.slice(4, 7),
    fontStyleList.value.slice(7, 10)
  ]
})

const fontFamilyList = [
  { label: 'Helvetica' },
  { label: 'PingFang SC' },
  { label: 'Hiragino Sans GB' },
  { label: 'Microsoft YaHei' },
  { label: 'Times New Roman' },
  { label: 'Verdana' },
  { label: 'Courier New' },
  { label: 'Georgia' },
  { label: 'Lucida Sans' },
  { label: 'Tahoma' }
]
function handleFontStyleClick(item: any) {
  item.selected = !item.selected
  setStyle(item.key, item.selected ? item.value : undefined)
}
function handleTitleChange(val: string) {
  const normal = val === 'normal'
  store.current.style!.fontSize = normal ? undefined : val
  store.current.style!.fontWeight = normal ? 'normal' : 'bold'
}
const textStyle = computed({
  get: () => {
    return store.current.style || {}
  },
  set: val => {
    store.current.style = store.current.style || {}
    Object.keys(val).forEach(key => {
      setStyle(key, (val as any)[key])
    })
  }
})

// 设置样式
function setStyle(key: string | number | symbol, value: any) {
  ;(store.current.style as any)[key] = value
}
// 根据key获取样式值
function getValue(key: string | number | symbol) {
  return store.current.style![key as keyof CSSProperties]
}
</script>

<style lang="scss" scoped>
.el-select-dropdown__item {
  height: auto;
  line-height: normal;
  padding-top: 5px;
  padding-bottom: 5px;
}
.text-style-block {
  display: flex;
  flex-wrap: wrap;
  .block-item {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36px;
    height: 36px;
    border: var(--es-border);
    border-radius: 4px;
    font-size: 14px;
    margin: 0 5px 5px 0;
    &.active {
      background-color: var(--el-color-primary);
    }
  }
}
.text-block-box {
  border: var(--es-border);
  border-radius: 4px;
  padding: 10px;
}
</style>
