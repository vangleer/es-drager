<template>
  <div class="es-layout-info">
    <div class="es-info-tabs">
      <div
        v-for="item in tabs"
        :class="['es-info-tab', { active: item === activeName }]"
        @click="activeName = item"
      >
        {{ item }}
      </div>
    </div>
    <div class="es-info-style" @click.stop>
      <component :is="currentComponent" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEditorStore } from '@es-drager/editor/src/store'
import EditorStyle from './EditorStyle.vue'
import ElementStyle from './ElementStyle.vue'
import Position from './Position.vue'
import Animation from './Animation.vue'
const store = useEditorStore()
const componentMap = {
  '样式': ElementStyle,
  '位置': Position,
  '动画': Animation,
  '画布属性': EditorStyle
}
const elementTabs = ['样式', '位置', '动画']
const editorTabs = ['画布属性']
const activeName = ref<string>('画布属性')

const tabs = computed(() => store.current && store.current.selected ? elementTabs : editorTabs)
const currentComponent = computed(() => (componentMap as any)[activeName.value as string])

watch(() => store.current.selected, () => {
  activeName.value = store.current.selected ? elementTabs[0] : editorTabs[0]
}, { immediate: true })
</script>

<style lang="scss">
.es-layout-info {
  flex-shrink: 0;
  width: calc(var(--es-layout-aside-width) + 30px);
  height: 100%;
  border-left: var(--es-border);
  overflow-y: auto;
  background-color: var(--es-color-bg);
  .es-info-tabs {
    .el-tabs__nav-scroll {
      padding-left: 20px;
    }
  }
}
.es-info-style {
  padding: 10px;
  height: calc(100% - 40px);
  overflow-y: auto;
  .el-row {
    margin-bottom: 10px;
    .el-button-group, .el-checkbox-group {
      display: inline-flex;
      width: 100%;
    }
    .el-checkbox-group, .el-checkbox-button__inner {
      width: 100%;
    }
    .el-color-picker.el-tooltip__trigger {
      width: 100%;
    }
    .el-color-picker__trigger {
      justify-content: flex-start;
      width: 100%;
      &:after {
        content: '';
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../../assets/images/color.svg') no-repeat;
        background-size: contain;
        margin-left: 4px;
      }
      .el-color-picker__color {
        width: calc(100% - 10px);
      }
    }

    .el-slider {
      padding-right: 10px;
      --el-slider-button-size: 13px;
    }
  }
}
.es-info-tabs {
  display: flex;
  width: 100%;
  height: 40px;
  background-color: var(--el-bg-color-page);
  .es-info-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    cursor: pointer;
    &.active {
      background-color: var(--el-bg-color);
    }
  }
}

</style>
