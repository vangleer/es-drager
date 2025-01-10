<template>
  <div class="es-layout-aside">
    <slot>
      <el-collapse v-model="activeNames">
        <el-collapse-item title="通用" name="1">
          <div class="collapse-content">
            <template v-for="item in config.componentList">
              <AsideBlock
                v-if="item.component !== 'es-icon'"
                :item="item"
                @dragstart="dragstart($event, item)"
                @dragend="dragend"
              />
              <el-popover
                v-else
                placement="right"
                title="图标"
                trigger="hover"
              >
                <template #reference>
                  <AsideBlock
                    :item="item"
                    @dragstart="dragstart($event, item)"
                    @dragend="dragend"
                  />
                </template>
                <div class="collapse-content">
                  <AsideBlock
                    v-for="item in config.iconList"
                    :key="item.props.icon"
                    :item="item"
                    @dragstart="dragstart($event, item)"
                    @dragend="dragend"
                  >
                    <component
                      v-if="item.component"
                      :is="item.component"
                      v-bind="item.props"
                    ></component>
                    <template v-else>{{ item.props.icon }}</template>
                  </AsideBlock>
                </div>
              </el-popover>
            </template>
          </div>
        </el-collapse-item>

        <el-collapse-item title="模板" name="2"></el-collapse-item>
      </el-collapse>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { registerConfig as config } from '../../utils/editor-config'
import { ComponentType } from '../../types'
import AsideBlock from './components/AsideBlock.vue'

const emit = defineEmits(['dragstart', 'dragend'])

const activeNames = ref(['1', '2', '3'])

function dragstart(e: DragEvent, component: ComponentType) {
  let width = 50,
    height = 50
  if (component.component !== 'es-icon') {
    width = component.width || (e.target as HTMLElement).offsetWidth
    height = component.height || (e.target as HTMLElement).offsetHeight
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
  overflow-y: auto; /* 添加垂直滚动 */

  .el-collapse-item__header {
    padding: 0 10px;
  }
}

.collapse-content {
  padding: 8px 12px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow-y: auto;
  max-height: calc(100vh - 50px);

  .es-block {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 45%;
    height: 40px;
    border: var(--es-border);
    margin-bottom: 10px;
    cursor: grab;
    background-color: var(--el-bg-color);

    .block-text {
      margin-left: 6px;
    }
  }
}
</style>
