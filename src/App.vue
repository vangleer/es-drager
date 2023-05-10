<template>
  <div class="es-app">
    <div class="es-header">
      <h1>ES Drager</h1>
      <div class="es-navbar">
        <a href="https://github.com/vangleer/es-drager" target="_blank">
          <img :src="githubIcon" />
        </a>
      </div>
    </div>
    <div class="es-main">
      <div class="es-sidebar">
        <div
          v-for="item in components"
          :key="item.name"
          :class="['es-sidebar-item', { active: current.name === item.name }]"
          @click="handleClick(item)"
        >
          {{ item.name }}
        </div>
      </div>
      <div class="es-content">
        <Component :is="current.component" />
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Basic from './examples/basic.vue'
import Event from './examples/event.vue'
import Slot from './examples/slot.vue'
import Info from './examples/info.vue'
import githubIcon from './assets/github.svg'
const components = [
  { name: 'Basic 基本使用', component: Basic },
  { name: 'Event 事件', component: Event },
  { name: 'Slot 插槽', component: Slot },
  { name: 'info 数据详情', component: Info }
]

const current = ref(components[0])

function handleClick(item: typeof components[0]) {
  current.value = item
}

</script>

<style lang='scss'>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body {
  background-color: #f8f8f8;
}
.es-app {
  --es-doc-color-primary: #4fc08d;
  width: 100vw;
  height: 100vh;
  color: #455a64;
  font-size: 14px;
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
      border-right: 1px solid #ddd;
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
</style>
