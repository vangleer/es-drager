# es-drager 拖拽组件

<p align="center">
	<a href="https://www.npmjs.com/package/commander" target="_blank">
		<img src="https://img.shields.io/badge/vuejs-vue3.x-green" alt="commander">
	</a>
	<a href="https://www.npmjs.com/package/inquirer" target="_blank">
		<img src="https://img.shields.io/badge/typescript-%3E4.0.0-blue" alt="typescript">
	</a>
</p>
<p>&nbsp;</p>

[example](https://vangleer.github.io/es-drager)

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
| width | 宽度       | ^[number]         | 100     |
| height | 高度       | ^[number]         | 100     |
| left | 横坐标偏移       | ^[number]         | 0     |
| top | 纵坐标偏移       | ^[number]         | 0     |
| angle | 旋转角度       | ^[number]         | 0     |
| color | 颜色       | ^[string]         |   #3a7afe   |
| resizable | 是否可缩放       | ^[boolean]        | true     |
| rotatable | 是否可旋转       | ^[boolean]        | -     |
| boundary | 是否判断边界(最近定位父节点)     | ^[boolean]        | -     |
| disabled | 是否禁用     | ^[boolean]        | -     |
| minWidth | 最小宽度     | ^[number]        | -     |
| minHeight | 最小高度     | ^[number]        | -     |

### Drager 事件

| 事件名    | 说明          | 类型                                                             |
| ------ | ----------- | -------------------------------------------------------------- |
| change | 位置、大小改变 | ^[Function]`(dragData) => void` |
| drag | 拖拽中 | ^[Function]`(dragData) => void` |
| drag-start | 拖拽开始 | ^[Function]`(dragData) => void` |
| drag-end | 拖拽结束 | ^[Function]`(dragData) => void` |
| resize | 缩放中 | ^[Function]`(dragData) => void` |
| resize-start | 缩放开始 | ^[Function]`(dragData) => void` |
| resize-end | 缩放结束 | ^[Function]`(dragData) => void` |
| rotate | 旋转中 | ^[Function]`(dragData) => void` |
| rotate-start | 旋转开始 | ^[Function]`(dragData) => void` |
| rotate-end | 旋转结束 | ^[Function]`(dragData) => void` |

- dragData 类型

```javascript
export type DragData = {
  width: number
  height: number
  left: number
  top: number
  angle: number
}
```


### Drager 插槽

| 插槽名     | 说明      |
| ------- | ------- |
| default | 自定义默认内容 |

