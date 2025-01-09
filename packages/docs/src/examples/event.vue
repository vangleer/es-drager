<template>
  <Drager
    :width="100"
    :height="100"
    :left="100"
    :top="100"
    rotatable
    skewable
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
    @skew="onSkew"
    @skew-start="onSkewStart"
    @skew-end="onSkewEnd"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>

<script setup lang="ts">
import Drager, { type DragData } from 'es-drager/index'

// @change="onChange"
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

// skewing
const onSkew = (dragData: DragData) => {
  console.log('onSkew', dragData)
}
// skew start
const onSkewStart = (dragData: DragData) => {
  console.log('onSkewStart', dragData)
}
// skew end
const onSkewEnd = (dragData: DragData) => {
  console.log('onSkewEnd', dragData)
}

// focus/selected
function onFocus(val: boolean) {
  console.log('onFocus', val)
}
// blur/unselected
function onBlur(val: boolean) {
  console.log('onBlur', val)
}
</script>
