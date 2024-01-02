import { ComponentType, EditorType } from '@/components/types'
import { useId } from '@/utils'
import { defineStore } from 'pinia'

interface EditorState {
  data: EditorType
  current: ComponentType
  preview: Boolean
}

const defaultData = {
  container: {
    markline: {
      show: true,
      color: ''
    },
    snapToGrid: true,
    gridSize: 10,
    gridColor: '',
    style: {},
    scaleRatio: 1
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
export const useEditorStore = defineStore('editor', {
  state: (): EditorState => {
    return {
      data: defaultData,
      current: {},
      preview: false
    }
  },
  actions: {
    update(val: EditorType) {
      this.data = val || {}
    }
  }
})
