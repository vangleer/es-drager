import { ComponentType, EditorType } from '@/components/types'
import { useId } from '@/utils'
import { defineStore } from 'pinia'

interface EditorState {
  data: EditorType,
  current: ComponentType
}

const defaultData = {
  container: {
    gridSize: 10,
    style: {
      width: '500px',
      height: '500px',
    }
  },
  elements: [
    {
      id: useId(),
      component: 'div',
      width: 100,
      height: 100,
      left: 100,
      top: 100,
      text: 'div1',
      style: {
        border: '1px solid red',
        background: 'blue'
      }
    },
    {
      id: useId(),
      component: 'div',
      width: 100,
      height: 100,
      left: 300,
      top: 150,
      text: 'div2',
      style: {
        border: '1px solid red',
        background: 'pink'
      }
    }
  ]
}
export const  useEditorStore = defineStore('editor', {
  state: (): EditorState => {
    return {
      data: defaultData,
      current: {}
    }
  },
  actions: {
    update(val: EditorType) {
      this.data = val || {}
    }
  }
})
