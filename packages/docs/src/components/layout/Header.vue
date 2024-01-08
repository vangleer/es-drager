<template>
  <div class="es-header">
    <h1 class="es-logo">
      <img class="es-logo-img" src="/logo/logo4.png" alt="ES Drager">
      <span @click="router.replace('/')">{{ title }}</span>
    </h1>
    <slot />
    <div class="es-navbar">
      <slot name="navbar-start" />
      <a
        :class="['es-header-link', store.theme]"
        @click.prevent="handleThemeChange"
      >
        <img :src="store.isLight ? lightThemeIcon : darkThemeIcon" />
      </a>
      <a
        class="es-header-link"
        href="https://github.com/vangleer/es-drager"
        target="_blank"
      >
        <img :src="store.isLight ? lightGithubIcon : darkGithubIcon" />
      </a>
      <slot name="navbar-end" />
    </div>
  </div>
</template>

<script setup lang="ts">
import lightGithubIcon from '@/assets/images/light-github.svg'
import darkGithubIcon from '@/assets/images/dark-github.svg'
import lightThemeIcon from '@/assets/images/light-theme.svg'
import darkThemeIcon from '@/assets/images/dark-theme.svg'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import { useAppStore } from '@/store/app'
const store = useAppStore()
const router = useRouter()
defineProps({
  title: {
    type: String,
    default: 'ES Drager'
  }
})
function handleThemeChange() {
  store.theme = store.isLight ? 'dark' : 'light'
}

watch(
  () => store.theme,
  val => {
    document.documentElement.className = val
    localStorage.setItem('theme', val)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.es-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: var(--es-header-height);
  background-color: var(--es-color-bg);
  z-index: 2;
  padding: 0 24px;
  border-bottom: var(--es-border);
  transition:
  border-color 0.2s,
  background-color 0.2s;
  .es-logo {
    display: flex;
    align-items: center;
    .es-logo-img {
      width: 30px;
      margin-right: 10px;
    }
  }
  h1 {
    font-size: 20px;
    font-weight: 600;
    transition: opacity 0.25s;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
  .es-navbar {
    display: flex;
    align-items: center;
    a {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 16px;
      border-radius: 50%;
      background-color: var(--color-bg);
    }
    img {
      width: 30px;
      height: 30px;
      transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
</style>
