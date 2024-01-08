import { createI18n } from 'vue-i18n'
import zh from './locales/zh.json'
import en from './locales/en.json'
export * from './store'
// 获取浏览器界面语言，默认语言
// https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator/language
let currentLanguage = navigator.language.replace(/-(\S*)/, '')

// 如果本地缓存记录了语言环境，则使用本地缓存
let lsLocale = localStorage.getItem('locale') || ''
if (lsLocale) {
  currentLanguage = JSON.parse(lsLocale)?.locale
}

const i18n = createI18n({
  locale: currentLanguage,
  legacy: false, // 修复组件引入i18n时vite脚手架报错的问题
  globalInjection: true, // 全局注册 $t
  fallbackLocale: 'en',
  messages: {
    zh,
    en
  }
})

export default i18n

export const t = (key: string) => i18n.global.t(key)

export const langs = [
  { key: 'zh', title: '中文' },
  { key: 'en', title: 'English' }
]
