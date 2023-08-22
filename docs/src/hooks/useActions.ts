import { $contextmenu, ActionType, MenuItem } from '@/components/common'
import { ComponentType, EditorType } from '@/components/types'
import { cancelGroup, deepCopy, makeGroup, useId } from '@/utils'
import { computed, onBeforeMount, onMounted, Ref } from 'vue'
type ActionMethods = {
  [key in ActionType]?: (element: ComponentType, ...args: any[]) => void
}
// 键盘映射表
const keyboardMap = {
  ['ctrl+x']: 'cut',
  ['ctrl+c']: 'copy',
  ['ctrl+v']: 'paste',
  ['Delete']: 'remove',
  ['ctrl+a']: 'selectAll',
  ['ctrl+d']: 'duplicate'
}
export function useActions(
  data: Ref<EditorType>,
  editorRef: Ref<HTMLElement | null>
) {
  const editorRect = computed(() => {
    return editorRef.value?.getBoundingClientRect() || {} as DOMRect
  })
  // 当前右键元素
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
    // 拷贝一份
    const newElement = deepCopy(element)
    // 修改id
    newElement.id = useId()
    data.value.elements.push(newElement)
  }
  const actions: ActionMethods = {
    remove() { // 删除
      const index = getIndex(currentMenudownElement)
      if (index > -1) data.value.elements.splice(index, 1)
    },
    cut(element) { // 剪切
      copySnapshot = element
      actions.remove!(element)
    },
    copy(element) { // 拷贝
      copySnapshot = element
    },
    duplicate(element) { // 创建副本
      const newElement = deepCopy(element)
      // 偏移left和top避免重叠
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
    group() { // 组合
      data.value.elements = makeGroup(data.value.elements, editorRect.value)
    },
    ungroup() { // 拆分
      data.value.elements = cancelGroup(data.value.elements, editorRect.value)
    },
    paste(_, clientX: number, clientY: number){ // 粘贴
      if (!copySnapshot) return
      const element = deepCopy(copySnapshot)
      // 计算粘贴位置
      element.left = clientX - editorRect.value!.left
      element.top = clientY - editorRect.value!.top
  
      addElement(element)
    },
    selectAll() { // 全选
      data.value.elements.forEach(item => item.selected = true)
    },
    lock(element) { // 锁定/解锁
      const index = getIndex(element)
      data.value.elements[index].disabled = !data.value.elements[index].disabled
    },
    moveUp(element) { // 上移
      // 获取当前元素索引
      const index = getIndex(element)
      // 不能超过边界
      if (index >= data.value.elements.length - 1) {
        return 
      }

      swap(index, index + 1)
    },
    moveDown(element) { // 下移
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
    const actionItems: MenuItem[] = [
      { action: 'remove', label: '删除' },
      { action: 'cut', label: '剪切' },
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
    const lockAction: MenuItem = { action: 'lock', label: '锁定 / 解锁' }
    if (!isLocked) {
      actionItems.push(lockAction)
    }
    $contextmenu({
      clientX,
      clientY,
      items: !isLocked ? actionItems : [lockAction], // 如果是锁定元素只显示解锁操作
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
    $contextmenu({
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

  // 监听键盘事件
  const onKeydown = (e: KeyboardEvent) => {
    const { ctrlKey, key } = e
    // 拼凑按下的键
    const keyArr = []
    if (ctrlKey) keyArr.push('ctrl')
    keyArr.push(key)
    const keyStr = keyArr.join('+')
    // 获取操作
    const action = (keyboardMap as any)[keyStr]! as ActionType
    // 如果actions中有具体的操作则执行
    if (actions[action]) {
      e.preventDefault()
      // 找到当前选中的元素
      currentMenudownElement = data.value.elements.find(item => item.selected) || null
      actions[action]!(currentMenudownElement!)
    }
  }
  
  onMounted(() => {
    window.addEventListener('keydown', onKeydown)
  })

  onBeforeMount(() => {
    window.removeEventListener('keydown', onKeydown)
  })

  return {
    editorRect,
    onContextmenu,
    onEditorContextMenu
  }
}