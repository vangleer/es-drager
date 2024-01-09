<template>
  <div class="es-layout-aside">
    <slot>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="通用" name="1">
          <div class="collapse-content">
            <div
              class="es-block"
              v-for="item in config.componentList"
              draggable="true"
              @dragstart="dragstart($event, item)"
              @dragend="dragend"
            >
              <component v-if="item.component" :is="item.component">{{
                item.text
              }}</component>
              <template v-else>{{ item.text }}</template>
            </div>
          </div>
        </el-collapse-item>
        <el-collapse-item title="杂项" name="2"></el-collapse-item>
        <el-collapse-item title="图标" name="3">
          <div class="collapse-content">
            <div
              class="es-block"
              v-for="item in config.iconList"
              draggable="true"
              @dragstart="dragstart($event, item)"
              @dragend="dragend"
            >
              <component
                v-if="item.component"
                :is="item.component"
                v-bind="item.props"
              ></component>
              <template v-else>{{ item.props.icon }}</template>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { registerConfig as config } from '../../utils/editor-config'
import { ComponentType } from '../../types'

const emit = defineEmits(['dragstart', 'dragend'])

const activeNames = ref(['1'])

function dragstart(e: DragEvent, component: ComponentType) {
  let width = 50,
    height = 50
  if (component.component !== 'es-icon') {
    width = (e.target as HTMLElement).offsetWidth
    height = (e.target as HTMLElement).offsetHeight
  }
  emit('dragstart', {
    ...component,
    width,
    height
  })
}
function dragend() {
  emit('dragend')
}
</script>
<style lang="scss">
.es-layout-aside {
  flex-shrink: 0;
  width: var(--es-layout-aside-width);
  height: 100%;
  border-right: var(--es-border);
  background-color: var(--es-color-bg);
  .el-collapse-item__header {
    padding: 0 10px;
  }
  .collapse-content {
    padding: 8px 12px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .es-block {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 45%;
      height: 40px;
      border: var(--es-border);
      margin-bottom: 10px;
      cursor: grab;
    }
  }
}
</style>
