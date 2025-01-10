<template>
  <div class="es-svg">
    <svg version="1.1" baseProfile="full" xmlns="http://www.w3.org/2000/svg">
      <polygon stroke="var(--el-text-color-primary)" fill="none" v-bind="getAttrs()"></polygon>
    </svg>
    <slot />
  </div>
</template>
<script setup lang="ts">
import { PropType } from 'vue'
import { ComponentType } from '@es-drager/editor'

const props = defineProps({
  element: Object as PropType<ComponentType>,
  type: {
    type: String as PropType<'star' | 'triangle'>,
    default: 'star'
  }
})

function getAttrs() {
  if (!props.element) return
  const attrs: any = {}
  const { width, height } = props.element
  if (width && height) {
    attrs.points = props.type === 'star' ? getStarPoints(width, height) : getTrianglePoints(width, height)
  }

  if (props.element?.style?.borderWidth) {
    attrs['stroke-width'] = props.element?.style?.borderWidth
  }
  if (props.element?.style?.borderColor) {
    attrs['stroke'] = props.element?.style?.borderColor
  }

  if (props.element?.style?.background || props.element?.style?.backgroundColor) {
    attrs['fill'] = props.element?.style?.background || props.element?.style?.backgroundColor
  }

  return attrs
}

// 计算五角星的点坐标并更新 SVG
function getStarPoints(width: number, height: number) {
  const points = []
  const cx = width / 2  // 中心点 X
  const cy = height / 2 // 中心点 Y

  // 外圆和内圆的半径分别基于宽度和高度进行调整
  const outerRadiusX = width / 2
  const outerRadiusY = height / 2
  const innerRadiusX = outerRadiusX * 0.5
  const innerRadiusY = outerRadiusY * 0.5

  // 计算五角星的 10 个点坐标
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i
    const isOuter = i % 2 === 0
    const radiusX = isOuter ? outerRadiusX : innerRadiusX
    const radiusY = isOuter ? outerRadiusY : innerRadiusY

    const x = cx + radiusX * Math.sin(angle)
    const y = cy - radiusY * Math.cos(angle)
    points.push(`${Math.round(x)},${Math.round(y)}`)
  }

  return points.join(' ')
}

// 计算三角形的点坐标
function getTrianglePoints(width: number, height: number) {
  const points = []
  points.push(`${Math.round(width / 2)},0`)
  points.push(`0,${Math.round(height)}`)
  points.push(`${Math.round(width)},${Math.round(height)}`)
  return points.join(' ')
}

</script>

<style lang="scss" scoped>
.es-svg {
  background: transparent !important;
  svg {
    width: 100%;
    height: 100%;
  }
}
</style>
