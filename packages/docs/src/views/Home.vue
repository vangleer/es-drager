<template>
  <div class="es-app">
    <Header>
      <template #navbar-end>
        <el-dropdown
          @command="handleCommand"
          class="es-header-lang"
          trigger="click"
        >
          <span class="el-dropdown-link">
            {{ currentLan }}
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for="lang in langs" :command="lang">
                {{ lang.title }}
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <a class="es-header-cube" @click.prevent="router.push('/editor')">{{
          t('common.editorDemo')
        }}</a>
        <a class="es-header-cube" @click.prevent="showCode = !showCode">{{
          t('common.code')
        }}</a>
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
          {{ t(`route.${item.meta?.title}`) }}
        </div>
      </Aside>
      <div class="es-content">
        <RouterView />
      </div>

      <el-drawer v-model="showCode" :title="t('common.code')">
        <pre><code v-html="codeHtml"></code></pre>
      </el-drawer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, computed, ref, watch } from 'vue'
import { useRouter, RouteRecordRaw, useRoute } from 'vue-router'
import { menuRoutes } from '@/router'
import 'highlight.js/styles/panda-syntax-light.css'
import hljs from 'highlight.js'
import { langs, t } from '@es-drager/common/i18n'
import { useLocaleStore } from '@/store/locales'

import Header from '@/components/layout/Header.vue'
import Aside from '@/components/layout/Aside.vue'
const examplesSource = import.meta.glob('../examples/*.vue', {
  eager: true,
  as: 'raw'
})

const router = useRouter()
const route = useRoute()
const useLocale = useLocaleStore()
// set lang
let curLocale = useLocale.locale
let currentLan = ref(langs.find(cur => cur.key === curLocale)?.title || '')

const handleCommand = (command: any) => {
  console.log(command)

  currentLan.value = command.title
  useLocale.setLocale(command.key)
}

const codeHtml = computed(() => {
  return hljs.highlight(
    examplesSource[`../examples/${current.value.path}.vue`],
    {
      language: 'html'
    }
  ).value
})

const current = shallowRef()

const showCode = ref(false)
function handleClick(item: RouteRecordRaw) {
  router.push(item.path)
}

watch(
  () => route.path,
  () => {
    current.value =
      menuRoutes.find(item => route.path === `/${item.path}`) || menuRoutes[0]
  },
  { immediate: true }
)
</script>

<style lang="scss">
.el-icon-arrow-down {
  font-size: 12px;
}
.es-header-cube {
  padding: 0 12px;
  color: #001938;
  background: #f7f8fa;
  font-size: 14px;
  line-height: 30px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 20px;
  cursor: pointer;
  margin-left: 16px;
  &:hover {
    color: var(--el-color-primary);
  }
}
.es-header-lang {
  padding: 0 12px;
  border: none;
  color: #001938;
  font-size: 14px;

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
  transition:
    border-color 0.2s,
    background-color 0.2s;

  .es-main {
    display: flex;
    position: relative;
    height: calc(100%);
    min-width: 400px;
    background-color: var(--es-bg-color-page);
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
        transition: color 0.2s;
        font-size: 15px;
        &:hover {
          color: var(--el-color-primary);
        }
        &.active {
          background-color: rgba(var(--el-color-primary-rgb), 0.1);
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

