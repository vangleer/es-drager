import { defineStore } from 'pinia'

interface AppState {
  theme: 'light' | 'dark'
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    theme: (localStorage.getItem('theme') as any) || 'dark'
  }),
  getters: {
    isLight: state => state.theme === 'light'
  }
})
