import { $dropdown, ActionType, DropdownItem } from '@/components/common'
import { ComponentType, EditorType } from '@/components/types'
import { cancelGroup, deepCopy, makeGroup, useId } from '@/utils'
import { computed, Ref } from 'vue'
type ActionMethods = {
  [key in ActionType]?: (element: ComponentType, ...args: any[]) => void
}
export function useActions(
  data: Ref<EditorType>,
  editorRef: Ref<HTMLElement | null>
) {
  const editorRect = computed(() => {
    return editorRef.value?.getBoundingClientRect() || {} as DOMRect
  })
  let currentMenudownElement: ComponentType | null = null
  // 复制元素
  let copySnapshot: ComponentType | null = null

  // 获取指定元素的索引
  const getIndex = (element: ComponentType | null) => {
    if (!element) return -1
    return data.value.elements.findIndex(item => item.id === element.id)
  }

  // 交换两个元素
  const swap = (i: number, j: number) => {
    [data.value.elements[i], data.value.elements[j]] = [data.value.elements[j], data.value.elements[i]]
  }
  
  // 添加元素
  const addElement = (element: ComponentType | null) => {
    if (!element) return
    const newElement = deepCopy(element)
    newElement.id = useId()
    data.value.elements.push(newElement)
  }
  const actions: ActionMethods = {
    remove() {
      const index = getIndex(currentMenudownElement)
      if (index > -1) data.value.elements.splice(index, 1)
    },
    copy(element) {
      copySnapshot = element
    },
    duplicate(element) { // 创建副本
      const newElement = deepCopy(element)
      newElement.left += 10
      newElement.top += 10
      addElement(newElement)
    },
    top(element) {
      // 获取当前元素索引
      const index = getIndex(element)
      // 将该索引的元素删除
      const [topElement] = data.value.elements.splice(index, 1)
      // 添加到末尾
      data.value.elements.push(topElement)
    },
    bottom(element) {
      // 获取当前元素索引
      const index = getIndex(element)
      // 将该索引的元素删除
      const [topElement] = data.value.elements.splice(index, 1)
      // 添加到开头
      data.value.elements.unshift(topElement)
    },
    group() {
      data.value.elements = makeGroup(data.value.elements, editorRect.value)
    },
    ungroup() {
      data.value.elements = cancelGroup(data.value.elements, editorRect.value)
    },
    paste(_, clientX: number, clientY: number){
      if (!copySnapshot) return
      const element = deepCopy(copySnapshot)
      element.left = clientX - editorRect.value!.left
      element.top = clientY - editorRect.value!.top
  
      addElement(element)
    },
    selectAll() {
      data.value.elements.forEach(item => item.selected = true)
    },
    lock(element) {
      const index = getIndex(element)
      data.value.elements[index].disabled = !data.value.elements[index].disabled
    },
    moveUp(element) {
      // 获取当前元素索引
      const index = getIndex(element)
      // 不能超过边界
      if (index >= data.value.elements.length - 1) {
        return 
      }

      swap(index, index + 1)
    },
    moveDown(element) {
      // 获取当前元素索引
      const index = getIndex(element)
      // 不能超过边界
      if (index <= 0) {
        return 
      }

      swap(index, index - 1)
    }
  }

  // 元素右键菜单
  const onContextmenu = (e: MouseEvent, item: ComponentType) => {
    e.preventDefault()
    const { clientX, clientY }  = e
    currentMenudownElement = deepCopy(item)
    
    const selectedElements = data.value.elements.filter(item => item.selected)
    const actionItems: DropdownItem[] = [
      { action: 'remove', label: '删除' },
      { action: 'copy', label: '复制' },
      { action: 'duplicate', label: '创建副本' },
      { action: 'top', label: '置顶' },
      { action: 'bottom', label: '置底' },
      { action: 'moveUp', label: '上移一层' },
      { action: 'moveDown', label: '下移一层' },
    ]
    if (!item.group && selectedElements.length > 1) {
      // 如果不是组合元素并且有多个选中元素，则显示组合操作
      actionItems.push({ action: 'group', label: '组合' })
    } else {
      // 显示取消组合操作
      item.group && actionItems.push({ action: 'ungroup', label: '取消组合' })
    }

    const isLocked = currentMenudownElement!.disabled
    const lockAction: DropdownItem = { action: 'lock', label: '锁定 / 解锁' }
    if (!isLocked) {
      actionItems.push(lockAction)
    }
    $dropdown({
      el: e.target as HTMLElement,
      clientX,
      clientY,
      items: !isLocked ? actionItems : [lockAction],
      onClick: ({ action }) => {
        if (actions[action]) {
          actions[action]!(currentMenudownElement!)
        }
      }
    })
  }

  // 画布右键菜单
  const onEditorContextMenu = (e: MouseEvent) => {
    const { clientX, clientY }  = e
    $dropdown({
      el: e.target as HTMLElement,
      clientX,
      clientY,
      items: [
        { action: 'paste', label: '在这粘贴' },
        { action: 'selectAll', label: '全选' },
      ],
      onClick({ action }) {
        if (action === 'paste') {
          actions.paste!(currentMenudownElement!, clientX, clientY)
        } else {
          actions[action] && actions[action]!(currentMenudownElement!)
        }
      }
    })
  }

  return {
    onContextmenu,
    onEditorContextMenu
  }
}