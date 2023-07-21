<template>
  <div class="es-app">
    <Header>
      <template #navbar-end>
        <a class="es-header-cube" @click.prevent="showCode = !showCode">代码</a>
      </template>
    </Header>
    <div class="es-main">
      <Aside class="es-sidebar">
        <div
          v-for="item in menuRoutes"
          :key="item.path"
          :class="['es-sidebar-item', { active: current.path === item.path }]"
          @click="handleClick(item)"
        >
          {{ item.meta?.title }}
        </div>
      </Aside>
      <div class="es-content">
        <RouterView />
      </div>

      <el-drawer
        v-model="showCode"
        title="示例代码"
      >
        <pre><code v-html="codeHtml"></code></pre>
      </el-drawer>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { shallowRef, computed, ref } from 'vue'
import { useRouter, RouteRecordRaw, useRoute } from 'vue-router'
import { menuRoutes } from '@/router'
import 'highlight.js/styles/panda-syntax-light.css'
import hljs from 'highlight.js'

import Header from '@/components/layout/Header.vue'
import Aside from '@/components/layout/Aside.vue'

const router = useRouter()
const route = useRoute()
const examplesSource = import.meta.glob('../examples/*.vue', { eager: true, as: 'raw' })

const codeHtml = computed(() => {
  return hljs.highlight(examplesSource[`../examples/${current.value.path}.vue`], { language: 'html' }).value
})

const current = shallowRef(menuRoutes.find(item => route.path === `/${item.path}`) || menuRoutes[0])
const showCode = ref(false)
function handleClick(item: RouteRecordRaw) {
  current.value = item
  router.push(item.path)
}

</script>

<style lang='scss'>
.es-header-cube {
  padding: 0 12px;
  color: #001938;
  background: #f7f8fa;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border: 1px solid rgba(255,255,255,.7);
  border-radius: 20px;
  cursor: pointer;
  margin-left: 16px;
  &:hover {
    color: var(--el-color-primary);
  }
}
.es-app {
  width: 100vw;
  height: 100vh;
  color: var(--es-color);
  font-size: 14px;
  overflow: hidden;
  background-color: var(--es-color-bg);
  transition: border-color .2s, background-color .2s;
  .es-code-box {
    max-width: 500px;
    height: 100%;
    padding: 24px 14px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: auto;
    border-left: var(--es-border);
  }
  .es-main {
    display: flex;
    position: relative;
    height: calc(100%);
    min-width: 400px;
    .es-sidebar {
      padding: 24px 6px;
      .es-sidebar-item {
        display: flex;
        align-items: center;
        padding: 8px 24px;
        width: 100%;
        height: 36px;
        margin: 8px 0;
        cursor: pointer;
        transition: color .2s;
        font-size: 15px;
        &:hover {
          color: var(--el-color-primary);
        }
        &.active {
          background-color: rgba(var(--el-color-primary-rgb), .1);
          color: var(--el-color-primary);
          border-radius: 36px;
        }
      }
    }
    .es-content {
      position: relative;
      flex: 1;
    }
  }
}
</style>
