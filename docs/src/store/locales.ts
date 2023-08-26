import { defineStore } from 'pinia';
import i18n from '@/locales';
import { ref } from 'vue';

export const useLocaleStore = defineStore(
  'locale',
  () => {
    let locale = ref(i18n.global.locale.value);

    // 设置locale
    function setLocale(lang: any) {
      locale.value = lang;
      i18n.global.locale.value = lang;
    }

    return { locale, setLocale };
  },
  {
    persist: true,
  }
);
