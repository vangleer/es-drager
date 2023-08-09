import { ComponentType, EditorType } from "@/components/types"
import Area from '@/components/editor/Area.vue'
import { DragData } from 'es-drager'
import { ref, Ref } from "vue"
// .value.elements
export function useArea(data: Ref<EditorType>, areaRef: Ref<typeof Area>) {
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
      // 包含left
      const containLeft = areaData.left < item.left && areaData.left + areaData.width > item.left + item.width
      // 包含top
      const containTop = areaData.top < item.top && areaData.top + areaData.height > item.top + item.height
      if (containLeft && containTop) {
        item.selected = true
      } else {
        item.selected = false
      }
    }
  }

  // 松开区域选择
  function onAreaUp() {
    areaSelected.value = data.value.elements.some((item: ComponentType) => item.selected)

    // 如果区域有选中元素
    if (areaSelected.value) {
      setTimeout(() => {
        document.addEventListener('click', () => {
          areaSelected.value = false
        }, { once: true })
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