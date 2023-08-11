import { ComponentType, EditorType } from '@/components/types'
import { calcLines } from '@/utils/common'
import { DragData } from 'es-drager'
import { reactive, Ref, ref } from 'vue'

export function useMarkline(data: Ref<EditorType>, current: Ref<ComponentType | null>) {
  const markLine = reactive({
    left: null,
    top: null
  })
  const lines = ref({ x: [], y: [] })

  const updateLines = () => {
    lines.value = calcLines(data.value.elements, current.value!)
  }

  const updateMarkline = (dragData: DragData) => {
    markLine.top = null
    markLine.left = null

    for (let i = 0; i < lines.value.y.length; i++) {
      const { top, showTop } = lines.value.y[i]

      if (Math.abs(top - dragData.top) < 5) {
        markLine.top = showTop
        break
      }
    }

    for (let i = 0; i < lines.value.x.length; i++) {
      const { left, showLeft } = lines.value.x[i]

      if (Math.abs(left - dragData.left) < 5) {
        markLine.left = showLeft
        break
      }
    }
  }

  return {
    markLine,
    updateLines,
    updateMarkline
  }
}