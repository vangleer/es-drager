<template>
  <div>
    <el-form-item label="标题">
      <el-select v-model="titleValue" @change="handleTitleChange">
        <el-option
          v-for="item in titles"
          :label="item.label"
          :value="item.value"
        >
          <span :style="{ fontSize: item.value, fontWeight: 'bold' }">{{ item.label }}</span>
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="字体大小">
      <el-input v-model="textStyle.fontSize" />
    </el-form-item>
    
    <el-form-item label="字体颜色">
      <el-color-picker v-model="textStyle.color" />
    </el-form-item>

    <div class="text-style-block" v-for="block, index in fontStyleListFormat">
      <div
        v-for="item in block"
        :style="index === 0 ? { [item.key]: item.value } : {}"
        :class="['block-item', { active: item.selected }]"
        @click="handleFontStyleClick(item)"
        v-html="item.label"
      ></div>
    </div>

  </div>
</template>

<script setup lang='ts'>
import { useEditorStore } from '@/store'
import { ref, CSSProperties, computed } from 'vue'
import { getIcon } from '@/assets/images/icons/index'

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
  { label: 'B', key: 'fontWeight', value: 'bold' },
  { label: 'I', key: 'fontStyle', value: 'italic' },
  { label: 'U', key: 'textDecoration', value: 'underline' },
  { label: 'S', key: 'textDecoration', value: 'line-through' },

  { label: getIcon('left'), key: 'justifyContent', value: 'flex-start' },
  { label: getIcon('center'), key: 'justifyContent', value: 'center' },
  { label: getIcon('right'), key: 'justifyContent', value: 'flex-end' },

  { label: getIcon('top'), key: 'alighItems', value: 'flex-start' },
  { label: getIcon('middle'), key: 'alighItems', value: 'center' },
  { label: getIcon('bottom'), key: 'alighItems', value: 'flex-end' }
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
  set: (val) => {
    store.current.style = store.current.style || {}
    Object.keys(val).forEach(key => {
      setStyle(key, (val as any)[key])
    })
  }
})

// 设置样式
function setStyle(key: string | number | symbol, value: any) {
  (store.current.style as any)[key] = value
}
// 根据key获取样式值
function getValue(key: string | number | symbol) {
  return store.current.style![key as keyof CSSProperties]
}
</script>

<style lang='scss' scoped>
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
    width: 30px;
    height: 30px;
    border: var(--es-border);
    border-radius: 4px;
    font-size: 14px;
    margin: 0 5px 5px 0;
    &.active {
      background-color: var(--el-color-primary);
    }
  }
}
</style>
