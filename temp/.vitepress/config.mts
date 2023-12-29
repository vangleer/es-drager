import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ES Drager",
  description: "A draggable, resizable, rotatable component based on vue3",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'guide', link: '/guide/getting-started' },
      { text: 'Examples', link: '/guide/article1' }
    ],

    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'article1', link: '/guide/article1' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vangleer/es-drager' }
    ]
  }
})
