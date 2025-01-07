import { ComponentType, EditorDataType } from '../types'
import Area from '../components/editor/Area.vue'
import { DragData } from 'es-drager'
import { ref, Ref } from 'vue'
// .value.elements
export function useArea(data: Ref<EditorDataType>, areaRef: Ref<typeof Area>) {
  const areaSelected = ref()
  // 编辑器鼠标按下事件
  function onEditorMouseDown(e: MouseEvent) {
    let flag = false
    data.value.elements.forEach((item: ComponentType) => {
      // 如果有选中的元素，取消选中
      if (item.selected) {
        item.selected = false
        flag = true
      }
    })
    if (!flag) {
      areaRef.value.onMouseDown(e)
    }
  }

  function onAreaMove(areaData: DragData) {
    for (let i = 0; i < data.value.elements.length; i++) {
      const item = data.value.elements[i] as Required<ComponentType>
  
      // 计算旋转后的最小外接矩形
      const boundingBox = getBoundingBox(item, item.angle || 0)
  
      // 判断框选区域是否包含最小外接矩形
      const isContained =
        areaData.left < boundingBox.rotatedMinX &&
        areaData.left + areaData.width > boundingBox.rotatedMaxX &&
        areaData.top < boundingBox.rotatedMinY &&
        areaData.top + areaData.height > boundingBox.rotatedMaxY
  
      // 更新选中状态
      item.selected = isContained
    }
  }
  
  // 计算旋转后的最小外接矩形
  function getBoundingBox(d: DragData, angle: number) {
    const centerX = d.left + d.width / 2
    const centerY = d.top + d.height / 2
    const corners = [
      rotateMatrix(d.left, d.top, centerX, centerY, angle),
      rotateMatrix(d.left + d.width, d.top, centerX, centerY, angle),
      rotateMatrix(d.left, d.top + d.height, centerX, centerY, angle),
      rotateMatrix(d.left + d.width, d.top + d.height, centerX, centerY, angle)
    ]
  
    const rotatedMinX = Math.min(...corners.map(corner => corner[0]))
    const rotatedMaxX = Math.max(...corners.map(corner => corner[0]))
    const rotatedMinY = Math.min(...corners.map(corner => corner[1]))
    const rotatedMaxY = Math.max(...corners.map(corner => corner[1]))
  
    return { rotatedMinX, rotatedMaxX, rotatedMinY, rotatedMaxY }
  }
  
  function rotateMatrix(x: number, y: number, centerX: number, centerY: number, angle: number) {
    const radian = (angle * Math.PI) / 180
    const translatedX = x - centerX
    const translatedY = y - centerY
  
    return [
      translatedX * Math.cos(radian) - translatedY * Math.sin(radian) + centerX,
      translatedX * Math.sin(radian) + translatedY * Math.cos(radian) + centerY
    ]
  }

  // 松开区域选择
  function onAreaUp() {
    areaSelected.value = data.value.elements.some(
      (item: ComponentType) => item.selected
    )

    // 如果区域有选中元素
    if (areaSelected.value) {
      setTimeout(() => {
        document.addEventListener(
          'click',
          () => {
            areaSelected.value = false
          },
          { once: true }
        )
      })
    }
  }

  return {
    areaSelected,
    onEditorMouseDown,
    onAreaMove,
    onAreaUp
  }
}
