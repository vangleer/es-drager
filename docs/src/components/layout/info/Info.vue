<template>
  <div class="es-layout-info">
    <el-tabs v-model="activeName" class="es-info-tabs" @tab-click="handleClick">
      <el-tab-pane label="样式" name="style">
        <Style />
      </el-tab-pane>
      <el-tab-pane label="文本" name="text">
        <div class="es-info-text">
          文本
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Style from './Style.vue'

const activeName = ref('style')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

</script>

<style lang='scss'>

.es-layout-info {
  flex-shrink: 0;
  width: 230px;
  height: 100%;
  border-left: var(--es-border);
  .es-info-tabs {
    .el-tabs__nav-scroll {
      padding-left: 20px;
    }
  }

  .es-info-style,
  .es-info-text {
    padding: 0 10px;
  }
}
</style>
