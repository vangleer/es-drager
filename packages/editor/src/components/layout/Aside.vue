<template>
  <div class="es-layout-aside">
    <slot>
      <div class="es-info-tabs">
        <div
          v-for="item in tabs"
          :class="['es-info-tab', { active: item === activeName }]"
          @click="activeName = item"
        >
          {{ item }}
        </div>
      </div>
      <div v-show="activeName === '组件'" class="collapse-content">
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

      <div v-show="activeName === '模板'" class="collapse-content">
        <template v-for="(item, index) in templateList">
          <div class="es-template-block">
            <img :src="item.bg" />
            <h2 class="es-template-title" :style="{ color: index < 2 ? '#333' : '#fff' }">{{ item.title }}</h2>
            <div class="es-template-ghost">
              <el-button type="primary" @click="emit('replaceTemplate', getTemplate(item))">使用模板</el-button>
            </div>
          </div>
        </template>
      </div>
    </slot>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { registerConfig as config } from '../../utils/editor-config'
import { ComponentType } from '../../types'
import AsideBlock from './components/AsideBlock.vue'
import { templateList, getTemplate } from '../../config/templates'

const emit = defineEmits(['dragstart', 'dragend', 'replaceTemplate'])

const tabs = ['组件', '模板']
const activeName = ref<string>(tabs[0])

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

  .es-template-block {
    position: relative;
    border-radius: 4px;
    margin-bottom: 10px;
    overflow: hidden;
    &:hover {
      .es-template-ghost {
        display: flex;
      }
    }
    img {
      width: 100%;
      height: 100%;
    }
    .es-template-title {
      position: absolute;
      top: 10px;
      left: 10px;
    }
    .es-template-ghost {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
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
