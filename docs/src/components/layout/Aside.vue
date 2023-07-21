<template>
  <div class="v-layout-aside">
    <el-collapse v-model="activeNames">
      <el-collapse-item title="通用" name="1">
        <div class="collapse-content">
          <div
            class="v-block"
            v-for="item in config.componentList"
            draggable="true"
            @dragstart="dragstart($event, item)"
            @dragend="dragend"
          >
            <component v-if="item.component" :is="item.component">{{ item.text }}</component>
            <template v-else>{{ item.text }}</template>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="杂项" name="2">
      </el-collapse-item>
      <el-collapse-item title="图标" name="3">

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { registerConfig as config, ComponentType } from '@/utils/editor-config'

const emit = defineEmits(['dragstart', 'dragend'])

const activeNames = ref(['1'])

function dragstart(e: DragEvent, component: ComponentType) {
  emit('dragstart', {
    ...component,
    width: (e.target as HTMLElement).offsetWidth,
    height: (e.target as HTMLElement).offsetHeight
  })
}
function dragend() {
  emit('dragend')
}

</script>

<style lang='scss'>
.v-layout-aside {
  flex-shrink: 0;
  width: 200px;
  height: 100%;
  border-right: var(--v-border);
  .el-collapse-item__header {
    padding: 0 10px;
  }
  .collapse-content {
    padding: 8px 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .v-block {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45%;
      height: 40px;
      border: var(--v-border);
      margin-bottom: 10px;
      cursor: grab;
    }
  }
}
</style>
