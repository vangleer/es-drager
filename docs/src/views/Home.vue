<template>
  <div class="es-app">
    <div class="es-header">
      <h1>ES Drager</h1>
      <div class="es-navbar">
        <a class="es-header-link" href="https://github.com/vangleer/es-drager" target="_blank">
          <img :src="githubIcon" />
        </a>
        <a class="es-header-cube" @click.prevent="showCode = !showCode">
          代码
        </a>
      </div>
    </div>
    <div class="es-main">
      <div class="es-sidebar">
        <div
          v-for="item in menuRoutes"
          :key="item.path"
          :class="['es-sidebar-item', { active: current.path === item.path }]"
          @click="handleClick(item)"
        >
          {{ item.meta?.title }}
        </div>
      </div>
      <div class="es-content">
        <RouterView />
      </div>
      <Transition name="es-code">
        <div v-show="showCode" class="es-code-box">
          <pre><code v-html="codeHtml"></code></pre>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { shallowRef, computed, ref } from 'vue'
import { useRouter, RouteRecordRaw } from 'vue-router'
import { menuRoutes } from '@/router'
import githubIcon from '@/assets/github.svg'
import 'highlight.js/styles/panda-syntax-light.css'
import hljs from 'highlight.js'

const router = useRouter()
const examplesSource = import.meta.glob('../examples/*.vue', { eager: true, as: 'raw' })

const codeHtml = computed(() => {
  return hljs.highlight(examplesSource[`../examples/${current.value.path}.vue`], { language: 'html' }).value
})

const current = shallowRef(menuRoutes[0])
const showCode = ref(true)
function handleClick(item: RouteRecordRaw) {
  current.value = item
  router.push(item.path)
}

</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  background-color: #eff2f5;
}
.es-app {
  --es-doc-color-primary: #4fc08d;
  --es-doc-border: 1px solid #ddd;
  width: 100vw;
  height: 100vh;
  color: #455a64;
  font-size: 14px;
  overflow: hidden;
  .es-code-box {
    max-width: 500px;
    height: 100%;
    background-color: #fff;
    padding: 24px 14px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: auto;
    border-left: var(--es-doc-border);
  }
  .es-header {
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    box-shadow: 0 2px 4px #dad7d7;
    background-color: #001938;
    z-index: 2;
    padding: 0 24px;
    h1 {
      font-size: 20px;
      font-weight: 600;
      color: #fff;
      transition: opacity .25s;
      cursor: pointer;
      &:hover {
        opacity: .8;
      }
    }
    .es-navbar {
      display: flex;
      align-items: center;
      a {
        margin-left: 16px;
      }
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
      }
      img {
        width: 30px;
        height: 30px;
        transition: .3s cubic-bezier(.175,.885,.32,1.275);
        cursor: pointer;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
  .es-main {
    display: flex;
    position: relative;
    height: calc(100%);
    padding-top: 60px;
    min-width: 400px;
    .es-sidebar {
      width: 200px;
      height: 100%;
      background-color: #fff;
    }
    .es-sidebar {
      border-right: var(--es-doc-border);
      padding: 24px 6px;
      .es-sidebar-item {
        display: flex;
        align-items: center;
        padding: 8px 24px;
        width: 100%;
        height: 36px;
        margin: 8px 0;
        cursor: pointer;
        color: #455a64;
        transition: color .2s;
        font-size: 15px;
        &:hover {
          color: var(--es-doc-color-primary);
        }
        &.active {
          background-color: #ebfff0;
          color: var(--es-doc-color-primary);
          border-radius: 36px;
        }
      }
    }
    .es-content {
      position: relative;
      flex: 1;
      background-color: #f4f4f4;
    }
  }
}
.es-code-enter-active,
.es-code-leave-active {
  transition: transform .3s;
}

.es-code-enter-from,
.es-code-leave-to {
  transform: translateX(100%);
}

</style>
