import { ComponentType, EditorDataType } from '../types'
import { defineStore } from 'pinia'

interface EditorState {
  data: EditorDataType
  current: ComponentType
  preview: Boolean
  initWidth: number
  initHeight: number
  theme: string
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
  elements: []
}

export const useEditorStore = defineStore('editor', {
  state: (): EditorState => {
    return {
      data: defaultData,
      current: {},
      preview: false,
      initWidth: 1180,
      initHeight: 960,
      theme: localStorage.getItem('theme') || 'light'
    }
  },
  actions: {
    update(val: EditorDataType) {
      if (!val.container) {
        val.container = { ...defaultData.container }
      }
      this.data = val || {}
    }
  }
})
