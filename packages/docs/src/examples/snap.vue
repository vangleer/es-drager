<template>
  <div>
    <div
      class="wrapper"
      :class="[!store.isLight ? 'blackwrapper' : 'whitewrapper']"
      :style="rectStyle"
    >
      <sketch-rule ref="sketchruleRef" v-model:scale="post.scale" v-bind="post">
        <template #default>
          <div ref="dragParentRef" data-type="page" :style="canvasStyle">
            <Drager
              v-for="item in data.componentList"
              v-bind="item"
              :key="item.id"
              snap
              :scaleRatio="post.scale"
              class="dragerItem"
              :snap-threshold="10"
              markline
              :extraLines="extraLines"
              @change="onChange($event, item)"
            >
              <component :is="item.component">{{ item.text }}</component>
            </Drager>
          </div>
        </template>
        <template #btn="{ reset, zoomIn, zoomOut }">
          <div class="btns">
            <button @click.stop="reset">还原</button>
            <button @click.stop="zoomIn">放大</button>
            <button @click.stop="zoomOut">缩小</button>
          </div>
        </template>
      </sketch-rule>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, reactive, CSSProperties, nextTick } from 'vue'
import SketchRule from 'vue3-sketch-ruler'
import 'vue3-sketch-ruler/lib/style.css'
import Drager, { DragData } from 'es-drager/index'
import { useAppStore } from '@/store/app'
const store = useAppStore()
const sketchruleRef = ref()
const dragParentRef = ref<HTMLElement>()
const post = reactive<any>({
  scale: 1,
  thick: 20,
  width: 1470,
  height: 700,
  showShadowText: false,
  canvasWidth: 1000,
  canvasHeight: 500,
  showRuler: true,
  palette: { bgColor: 'transparent', lineType: 'dashed' },
  isShowReferLine: true,
  shadow: {
    x: 0,
    y: 0,
    width: 0,
    height: 0
  },
  lines: {
    h: [300],
    v: [400]
  }
})
// 组件类型
interface ComponentType {
  id?: string
  component: string // 内部组件名称，自定义组件需要提前全局注册
  text?: string // 文本
  width?: number
  height?: number
  top?: number
  left?: number
  angle?: number
  style?: CSSProperties // 样式
}

interface EditorState {
  componentList: ComponentType[]
}
const data = ref<EditorState>({
  componentList: [
    {
      id: 'div1',
      component: 'div',
      text: 'div1',
      width: 100,
      height: 100,
      left: 0,
      top: 0
    },
    {
      id: 'div2',
      component: 'div',
      text: 'div2',
      width: 100,
      height: 100,
      top: 100,
      left: 100
    }
  ]
})
const rectStyle = computed(() => {
  return {
    width: `${post.width}px`,
    height: `${post.height}px`
  }
})

const canvasStyle = computed<CSSProperties>(() => {
  return {
    width: `${post.canvasWidth}px`,
    height: `${post.canvasHeight}px`,
    position: 'relative',
    background: store.isLight ? '#eff2f5' : '#333333'
  }
})

const onChange = (dragData: DragData, item: any) => {
  nextTick(() => {
    post.shadow = {
      x: item.left,
      y: item.top,
      width: item.width,
      height: item.height
    }
  })
  Object.keys(dragData).forEach(key => {
    ;(item as any)[key] = dragData[key as keyof DragData]
  })
}

const extraLines = (targetRect: DOMRect) => {
  // 可以返回dom元素列表
  return Array.from(document.querySelectorAll('.sketch-ruler .lines .line'))


  // 也可以根据 targetRect 显示位置
  // const pRect = dragParentRef.value!.getBoundingClientRect()
  // const hLines = post.lines.h.reduce((arr: any[], item: number) => {
  //   const hTop = pRect.top / post.scale + item
  //   // 顶部对齐
  //   arr.push({ showTop: hTop, top: hTop })
  //   // 底部对齐
  //   arr.push({ showTop: hTop, top: hTop - targetRect.height })
  //   return arr
  // }, [])

  // const vLines = post.lines.v.reduce((arr: any[], item: number) => {
  //   const vLeft = pRect.left / post.scale + item
  //   // 顶部对齐
  //   arr.push({ showLeft: vLeft, left: vLeft })
  //   // 底部对齐
  //   arr.push({ showLeft: vLeft, left: vLeft - targetRect.width })
  //   return arr
  // }, [])

  // return hLines.concat(vLines)
}
</script>

<style lang="scss">
.wrapper {
  margin: 0 auto;
  background-size:
    21px 21px,
    21px 21px;
  border: 1px solid #dadadc;
}

.whitewrapper {
  background-color: #fafafc;
  background-image: linear-gradient(#fafafc 20px, transparent 0),
    linear-gradient(90deg, transparent 20px, #373739 0);
}

.blackwrapper {
  background-color: #18181c;
  background-image: linear-gradient(#18181c 20px, transparent 0),
    linear-gradient(90deg, transparent 20px, #86909c 0);
}

.img-style {
  width: 100%;
  height: 100%;
}
.btns {
  position: absolute;
  display: flex;
  bottom: 20px;
  right: 40px;
  z-index: 999;
}
.dragerItem {
  background: #2563eb;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
