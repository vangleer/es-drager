# 可拖拽、缩放、旋转组件网格效果及使用方法

## 🌈介绍

基于 vue3.x + CompositionAPI + typescript + vite 的可拖拽、缩放、旋转的组件

*   拖拽&区域拖拽
*   支持缩放
*   旋转
*   网格拖拽缩放

[在线示例](https://vangleer.github.io/es-drager)

[源码地址](https://github.com/vangleer/es-drager)

上一篇实现细节的文章遗留下了两个问题

1.  旋转后再缩放会很奇怪
2.  旋转后鼠标经过缩放圆点上时的样式也不相称

由于这两个问题代码量较多，建议大家直接去看源代码

这篇文章主要分享一下网格拖拽和缩放比的实现及es-drager组件的具体使用

## 网格拖拽和缩放比实现

*   效果展示

![05.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e6c1167ada1946a28f03e6ed71c9cc78~tplv-k3u1fbpfcp-watermark.image?)

这块功能主要是最近有朋友在github上提过相关需求，就给es-drager加上了

### 添加相关props

```typescript
const props = {
  // ...
  snapToGrid: Boolean, // 是否开启网格
  gridX: { // 网格X大小
    type: Number,
    default: 50
  },
  gridY: { // 网格Y大小
    type: Number,
    default: 50
  },
  scaleRatio: { // 缩放比
    type: Number,
    default: 1
  }
}
```

### 在移动的时候校验

主要关注onMousemove里对网格的判断即可

```typescript
const onMousemove = (e: MouseEvent) => {
  // 使用缩放比后的移动距离计算
  let moveX = (e.clientX - downX) / props.scaleRatio + left
  let moveY = (e.clientY - downY) / props.scaleRatio + top

  // 是否开启网格对齐
  if (props.snapToGrid) {
    // 当前位置
    let { left: curX, top: curY } = dragData.value
    // 移动距离
    const diffX = moveX - curX
    const diffY = moveY - curY

    // 计算网格移动距离
    moveX = calcGridMove(diffX, props.gridX, curX)
    moveY = calcGridMove(diffY, props.gridY, curY)
  }
  
  if (props.boundary) {
    [moveX, moveY] = fixBoundary(moveX, moveY, maxX, maxY)
  }

  dragData.value.left = moveX
  dragData.value.top = moveY
  
  emit && emit('drag', dragData.value)
}

/**
 * @param moveX 移动的X
 * @param moveY 移动的Y
 * @param maxX 最大移动X距离
 * @param maxY 最大移动Y距离
 */
const fixBoundary = (moveX: number, moveY: number, maxX: number, maxY: number) => {
  // 判断x最小最大边界
  moveX = moveX < 0 ? 0 : moveX
  moveX = moveX > maxX ? maxX : moveX

  // 判断y最小最大边界
  moveY = moveY < 0 ? 0 : moveY
  moveY = moveY > maxY ? maxY : moveY
  return [moveX, moveY]
}

/**
 * @param diff 移动的距离
 * @param grid 网格大小
 * @param cur 盒子当前的位置left or top
 */
function calcGridMove(diff: number, grid: number, cur: number) {
  let result = cur
  // 移动距离超过grid的1/2，累加grid，移动距离为负数减掉相应的grid
  if (Math.abs(diff) > grid / 2) {
    result = cur + (diff > 0 ? grid : -grid)
  }

  return result
}

```

*   由于父元素或者画布可能会缩放，那么就可以将这个缩放比（scaleRatio）传给es-drager，每次移动需要先将移动的距离和缩放比进行换算一下

```typescript
// 使用缩放比后的移动距离计算
let moveX = (e.clientX - downX) / props.scaleRatio + left
let moveY = (e.clientY - downY) / props.scaleRatio + top
```

*   如果传入snapToGrid为true，则计算网格移动，得到这次移动的距离，如果距离大于传入的gridX或gridY的1/2则移动一个网格距离，calcGridMove函数主要就是这个功能

### 网格缩放 resize

```typescript
const onMousemove = (e: MouseEvent) => {
  // 移动的x距离
  let disX = (e.clientX - downX) / props.scaleRatio
  // 移动的y距离
  let disY = (e.clientY - downY) / props.scaleRatio

  // 开启网格缩放
  if (props.snapToGrid) {
    disX = calcGridResize(disX, props.gridX)
    disY = calcGridResize(disY, props.gridY)
  }

  const [side, position] = dotInfo.side.split('-')

  // 是否是上方缩放圆点
  const hasT = side === 'top'
  // 是否是左方缩放圆点
  const hasL = [side, position].includes('left')
  
  let width = elRect.width + (hasL ? -disX : disX)
  let height = elRect.height + (hasT ? -disY : disY)
  
  // 如果是左侧缩放圆点，修改left位置
  let left = elRect.left + (hasL ? disX : 0)

  // 如果是上方缩放圆点，修改top位置
  let top = elRect.top + (hasT ? disY : 0)

  if (!position) { // 如果是四个正方位
    if (['top', 'bottom'].includes(side)) {
      // 上下就不改变宽度
      width = elRect.width
    } else {
      // 左右就不改变高度
      height = elRect.height
    }
  }

  // 处理逆向缩放
  if (width < 0) {
    width = -width
    left -= width
  }
  if (height < 0) {
    height = -height
    top -= height
  }

  dragData.value = { left, top, width, height }
  emit('resize', dragData.value)
}
```

其它代码上一篇讲过，主要看这几行新增的代码，前两行同样考虑缩放比（没有这个计算，鼠标可能不会在小圆点按下的位置）

```typescript
  // 移动的x距离
  let disX = (e.clientX - downX) / props.scaleRatio
  // 移动的y距离
  let disY = (e.clientY - downY) / props.scaleRatio

  // 开启网格缩放
  if (props.snapToGrid) {
    disX = calcGridResize(disX, props.gridX)
    disY = calcGridResize(disY, props.gridY)
  }
```

和上面拖拽一样，如果开启网格则调用`calcGridResize`函数得到缩放的大小，`calcGridResize`函数实现如下

```typescript
/**
 * @param diff 缩放移动距离
 * @param grid 网格大小
 */
 function calcGridResize(diff: number, grid: number) {
  // 得到每次缩放的余数
  const r = Math.abs(diff) % grid

  // 正负grid
  const mulGrid = diff > 0 ? grid : -grid
  let result = 0
  // 余数大于grid的1/2
  if (r > grid / 2) {
    result = mulGrid * Math.ceil(Math.abs(diff) / grid)
  } else {
    result = mulGrid * Math.floor(Math.abs(diff) / grid)
  }

  return result
}
```

## es-drager 的具体使用

### 安装依赖

    npm i es-drager

### 全局注册

```typescript
import { createApp } from 'vue'
import App from './App.vue'

import 'es-drager/lib/style.css'
import Drager from 'es-drager'

createApp(App)
  .component('es-drager', Drager)
  .mount('#app')
```

*   使用

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

### 浏览器直接引入

直接通过浏览器的 HTML 标签导入 es-drager，然后就可以使用全局变量 ESDrager 了。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/es-drager/lib/style.css">
  <title>Document</title>
</head>
<body>
  <div id="app">
    <es-drager>drager</es-drager>
  </div>

  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script src="https://unpkg.com/es-drager"></script>
  <script>
    const { createApp } = Vue
    const app = createApp({})
    app.use(ESDrager)
    app.mount('#app')
  </script>
</body>
</html>

```

### 基础使用


![06.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b4a2f4b154fe472491fb66ea6beb2301~tplv-k3u1fbpfcp-watermark.image?)

```html
<template>
  <Drager
    v-for="item, index in dragList"
    :key="index"
    :left="120"
    :top="index * 120 + 30"
    v-bind="item"
    :style="{ color: item.color }"
  >
    {{ item.text }}
  </Drager>
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from 'es-drager'

const dragList = ref([
  { text: '移动', resizable: false },
  { color: '#00c48f', text: '移动+缩放' },
  { color: '#ff9f00', text: '旋转', rotatable: true, resizable: false },
  { color: '#f44336', text: '旋转+缩放', rotatable: true }
])

</script>
```

### 事件监听

es-drager 提供了丰富的事件以便完成更细度的操作

```html
<template>
  <Drager
    :left="100"
    :top="100"
    rotatable
    @change="onChange"
    @drag="onDrag"
    @drag-start="onDragStart"
    @drag-end="onDragEnd"
    @resize="onResize"
    @resize-start="onResizeStart"
    @resize-end="onResizeEnd"
    @rotate="onRotate"
    @rotate-start="onRotateStart"
    @rotate-end="onRotateEnd"
  />
  
</template>

<script setup lang='ts'>
import Drager, { type DragData } from 'es-drager'

// drag、resize、rotate
const onChange = (dragData: DragData) => {
  console.log('onChange', dragData)
}

// draging
const onDrag = (dragData: DragData) => {
  console.log('onDrag', dragData)
}
// drag start
const onDragStart = (dragData: DragData) => {
  console.log('onDragStart', dragData)
}
// drag end
const onDragEnd = (dragData: DragData) => {
  console.log('onDragEnd', dragData)
}

// resizing
const onResize = (dragData: DragData) => {
  console.log('onResize', dragData)
}
// resize start
const onResizeStart = (dragData: DragData) => {
  console.log('onResizeStart', dragData)
}
// resize end
const onResizeEnd = (dragData: DragData) => {
  console.log('onResizeEnd', dragData)
}

// rotating
const onRotate = (dragData: DragData) => {
  console.log('onRotate', dragData)
}
// rotate start
const onRotateStart = (dragData: DragData) => {
  console.log('onRotateStart', dragData)
}
// resize end
const onRotateEnd = (dragData: DragData) => {
  console.log('onRotateEnd', dragData)
}

</script>

```

### 网格效果

通过 snapToGrid 是否开启网格，gridX、gridY分别表示网格横纵大小

scaleRatio缩放比例（如果父标签或者画布放大或缩小可能会影响拖拽缩放的距离），如果有缩放请传入scaleRatio

我们也可以使用方位按键来控制移动（只会移动已选中的元素），开启网格移动网格距离，否则每次移动1像素
，也可使用disabledKeyEvent禁用方向键移动

```html
<template>
  <div
    class="es-grid-box"
    :style="gridStyle"
  >
    <Drager
      :top="100"
      :left="100"
      :gridX="gridX"
      :gridY="gridY"
      :snapToGrid="snapToGrid"
      :scaleRatio="scale"
      boundary
    />
  </div>
</template>

<script setup lang='ts'>
import { computed, ref } from 'vue'
import Drager from '../../../src/drager2/drager2.vue'
const snapToGrid = ref(true)
const gridX = ref(50)
const gridY = ref(50)
const scale = ref(1)
const gridStyle = computed(() => {
  return snapToGrid.value ? {
    '--es-grid-width': gridX.value + 'px',
    '--es-grid-height': gridY.value + 'px',
    transform: `scale(${scale.value})`,
    transformOrigin: 'left top'
  } : {}
})

</script>

<style lang='scss' scoped>
.es-grid-box {
  position: relative;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  background:
        -webkit-linear-gradient(top, transparent calc(var(--es-grid-height) - 1px), #ccc var(--es-grid-height)),
        -webkit-linear-gradient(left, transparent calc(var(--es-grid-width) - 1px), #ccc var(--es-grid-width))
        ;
    background-size: var(--es-grid-width) var(--es-grid-height);
}
</style>
```

### 使用插槽


![07.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/45f1283b7bd74d70be1d769bd2174f9b~tplv-k3u1fbpfcp-watermark.image?)

*   默认插槽
*   resize 缩放handle（小圆点）插槽
*   rotate 旋转handle插槽

```html
<template>
  <Drager
    :width="200"
    :height="120"
    :left="100"
    :top="100"
    rotatable
  >
    <img style="width: 100%;height: 100%;" :src="imgUrl">
  </Drager>

  <Drager
    :left="100"
    :top="300"
    rotatable
  >
    resize handle
    <template #resize>
      <div class="custom-resize"></div>
    </template>
  </Drager>

  <Drager
    :left="100"
    :top="450"
    rotatable
  >
    rotate handle
    <template #rotate>
      <div class="custom-rotate">E</div>
    </template>
  </Drager>
  
</template>

<script setup lang='ts'>
import Drager from 'es-drager'
import imgUrl from '../assets/demo.png'

</script>

<style lang='scss' scoped>
.custom-resize {
  width: 6px;
  height: 6px;
  border: 1px solid #0ec3b8;
}

.custom-rotate {
  font-size: 20px;
  font-weight: 700;
  color: #0ec3b8;
}
</style>
```

### echarts 图表

![08.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c3ab0af452c4ba7a00b3cf1254b88a2~tplv-k3u1fbpfcp-watermark.image?)

也可以插入echarts图表，注意需要将chart元素的宽高都设置为100%

监听es-drager的resize事件然后调用echarts的resize方法进行缩放

```html
<template>
  <Drager
    :width="300"
    :height="200"
    :left="100"
    :top="100"
    @resize="handleResize"
    rotatable
  >
    <Chart ref="chartRef" />
  </Drager>
  
</template>

<script setup lang='ts'>
import { ref } from 'vue'
import Drager from 'es-drager'
import Chart from '@/components/Chart.vue'
const chartRef = ref()
function handleResize() {
  chartRef.value.resize()
}
</script>
```

## Drager完整API

### Drager 属性

| 属性名              | 说明              | 类型           | 默认      |
| ---------------- | --------------- | ------------ | ------- |
| width            | 宽度              | \^\[number]  | 100     |
| height           | 高度              | \^\[number]  | 100     |
| left             | 横坐标偏移           | \^\[number]  | 0       |
| top              | 纵坐标偏移           | \^\[number]  | 0       |
| angle            | 旋转角度            | \^\[number]  | 0       |
| color            | 颜色              | \^\[string]  | #3a7afe |
| resizable        | 是否可缩放           | \^\[boolean] | true    |
| rotatable        | 是否可旋转           | \^\[boolean] | -       |
| boundary         | 是否判断边界(最近定位父节点) | \^\[boolean] | -       |
| disabled         | 是否禁用            | \^\[boolean] | -       |
| minWidth         | 最小宽度            | \^\[number]  | -       |
| minHeight        | 最小高度            | \^\[number]  | -       |
| selected         | 控制是否选中          | \^\[boolean] | -       |
| snapToGrid       | 开启网格            | \^\[boolean] | -       |
| gridX            | 网格X大小           | \^\[number]  | 50      |
| gridY            | 网格Y大小           | \^\[number]  | 50      |
| scaleRatio       | 缩放比             | \^\[number]  | 1       |
| disabledKeyEvent | 禁用方向键移动         | \^\[boolean] | -       |

### Drager 事件

| 事件名          | 说明      | 类型                                |
| ------------ | ------- | --------------------------------- |
| change       | 位置、大小改变 | \^\[Function]`(dragData) => void` |
| drag         | 拖拽中     | \^\[Function]`(dragData) => void` |
| drag-start   | 拖拽开始    | \^\[Function]`(dragData) => void` |
| drag-end     | 拖拽结束    | \^\[Function]`(dragData) => void` |
| resize       | 缩放中     | \^\[Function]`(dragData) => void` |
| resize-start | 缩放开始    | \^\[Function]`(dragData) => void` |
| resize-end   | 缩放结束    | \^\[Function]`(dragData) => void` |
| rotate       | 旋转中     | \^\[Function]`(dragData) => void` |
| rotate-start | 旋转开始    | \^\[Function]`(dragData) => void` |
| rotate-end   | 旋转结束    | \^\[Function]`(dragData) => void` |

*   dragData 类型

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

| 插槽名     | 说明       |
| ------- | -------- |
| default | 自定义默认内容  |
| resize  | 缩放handle |
| rotate  | 旋转handle |
