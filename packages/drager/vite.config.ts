import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    dts({
      // root: resolve(__dirname, '../..'),
      tsConfigFilePath: resolve(__dirname, '../../tsconfig.json')
    }),
    vue()
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, './src/drager/index.ts'),
      name: 'ESDrager',
      fileName: format => `index.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
