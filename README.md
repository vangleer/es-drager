# es-drager 拖拽组件

旋转实现方案: https://www.deanhan.cn/js-rotate-resize.html

<p align="center">
	<a href="https://www.npmjs.com/package/commander" target="_blank">
		<img src="https://img.shields.io/badge/vuejs-vue3.x-green" alt="commander">
	</a>
	<a href="https://www.npmjs.com/package/inquirer" target="_blank">
		<img src="https://img.shields.io/badge/typescript-%3E4.0.0-blue" alt="typescript">
	</a>
</p>
<p>&nbsp;</p>

## 🌈介绍

基于 vue3.x + CompositionAPI + typescript + vite 的可拖拽、缩放、旋转的组件

- 拖拽&区域拖拽
- 支持缩放
- 旋转

## ⚡ 使用说明

### 安装依赖

```
npm i es-drager
```

### 全局注册

```typescript
import { createApp } from 'vue'
import App from './App.vue'

import 'es-drager/dist/style.css'
import Drager from 'es-drager'

createApp(App)
  .component('es-drager', Drager)
  .mount('#app')
```

- 使用

```html
<template>
  <es-drager>
    drager
  </es-drager>
</template>

```

### 组件中直接使用

```html
<template>
  <Drager>
    drager
  </Drager>
</template>

<script setup lang='ts'>
import Drager from 'es-drager'
</script>

```

## Drager API

### Drager 属性

| 属性名                   | 说明           | 类型                                         | 默认    |
| --------------------- | ------------ | ------------------------------------------ | ----- |
| width | 宽度       | ^[string] / ^[number]         | 100     |
| height | 高度       | ^[string] / ^[number]         | 100     |
| left | 横坐标偏移       | ^[string] / ^[number]         | 0     |
| top | 纵坐标偏移       | ^[string] / ^[number]         | 0     |
| color | 颜色       | ^[string]         | 0     |
| zoomable | 是否可缩放       | ^[boolean]        | true     |
| rotatable | 是否可旋转       | ^[boolean]        | -     |
| boundary | 是否判断边界(最近定位父节点)     | ^[boolean]        | -     |
| disabled | 是否禁用     | ^[boolean]        | -     |

### Drager 事件

| 事件名    | 说明          | 类型                                                             |
| ------ | ----------- | -------------------------------------------------------------- |
| move | 移动事件 | ^[Function]`(dragData: { width: number, height: number, left: number, top: number }) => void` |
| resize | 缩放事件 | ^[Function]`(dragData: { width: number, height: number, left: number, top: number }) => void` |
| rotate | 旋转事件 | ^[Function]`(dragData: { width: number, height: number, left: number, top: number }) => void` |

### Drager 插槽

| 插槽名     | 说明      |
| ------- | ------- |
| default | 自定义默认内容 |

