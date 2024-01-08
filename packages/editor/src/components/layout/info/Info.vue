<template>
  <div class="es-layout-info">
    <el-tabs v-model="activeName" class="es-info-tabs" @tab-click="handleClick">
      <el-tab-pane :label="title" name="style">
        <MyStyle />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import MyStyle from './Style.vue'
import { useEditorStore } from '@es-drager/editor/src/store'
const store = useEditorStore()

const title = computed(() =>
  store.current && store.current.selected ? '元素属性' : '画布属性'
)

const activeName = ref('style')
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style lang="scss">
.es-layout-info {
  flex-shrink: 0;
  width: 230px;
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
</style>
