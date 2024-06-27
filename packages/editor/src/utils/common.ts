import { ComponentType } from '../types'

let uid = 1

export function useId(prefix = 'es-drager') {
  return `${prefix}-${Date.now()}-${uid++}`
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

// 计算辅助线
export function calcLines(list: ComponentType[], current: ComponentType) {
  const lines: any = { x: [], y: [] }
  const { width = 0, height = 0 } = current
  list.forEach(block => {
    if (current.id === block.id) return
    const {
      top: ATop,
      left: ALeft,
      width: AWidth,
      height: AHeight
    } = block as any
    lines.y.push({ showTop: ATop, top: ATop }) // 顶对顶
    lines.y.push({ showTop: ATop, top: ATop - height }) // 顶对底

    lines.y.push({
      showTop: ATop + AHeight / 2,
      top: ATop + AHeight / 2 - height / 2
    }) // 中

    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight }) // 底对顶

    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - height }) // 底对底

    lines.x.push({ showLeft: ALeft, left: ALeft }) // 左对左
    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }) // 右对左
    // 中间对中间
    lines.x.push({
      showLeft: ALeft + AWidth / 2,
      left: ALeft + AWidth / 2 - width / 2
    }) // 中
    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - width })
    lines.x.push({ showLeft: ALeft, left: ALeft - width }) // 左对右
  })

  return lines
}

/**
 * 组合元素
 * @param elements 元素列表
 * @param editorRect 画布react信息
 * @returns 组合后的列表
 */
export function makeGroup(elements: ComponentType[], editorRect: DOMRect) {
  const selectedItems = elements.filter(item => item.selected)

  if (!selectedItems.length) return elements

  let minLeft = Infinity,
    minTop = Infinity,
    maxLeft = -Infinity,
    maxTop = -Infinity

  Math.max(...selectedItems.map(item => item.left!))
  selectedItems.forEach(item => {
    // 获取拖拽元素的位置信息，使用rect只是为了处理旋转后位置的边界
    const itemRect = document.getElementById(item.id!)!.getBoundingClientRect()
    // 最小left
    minLeft = Math.min(minLeft, itemRect.left - editorRect.left)
    // 最大left
    maxLeft = Math.max(maxLeft, itemRect.right - editorRect.left)

    // 最小top
    minTop = Math.min(minTop, itemRect.top - editorRect.top)
    // 最大top
    maxTop = Math.max(maxTop, itemRect.bottom - editorRect.top)
  })

  const dragData = {
    left: minLeft,
    top: minTop,
    width: maxLeft - minLeft, // 宽度 = 最大left - 最小left
    height: maxTop - minTop // 高度 = 最大top - 最小top
  }
  let hasRotate = false
  // 子元素相对父元素的位置
  selectedItems.forEach(item => {
    item.left = item.left! - minLeft
    item.top = item.top! - minTop
    item.groupStyle = {
      // 使用百分比的好处是组合元素缩放里面的子元素可以自适应
      ...item.style,
      width: toPercent(item.width! / dragData.width),
      height: toPercent(item.height! / dragData.height),
      left: toPercent(item.left / dragData.width),
      top: toPercent(item.top / dragData.height),
      transform: `rotate(${item.angle || 0}deg)`,
      position: 'absolute'
    }
    if (item.angle) {
      hasRotate = true
    }
  })

  // 组合组件信息
  const groupElement: ComponentType = {
    id: useId(),
    component: 'es-group',
    group: true,
    selected: true,
    ...dragData,
    equalProportion: hasRotate,
    props: {
      // 组合组件的props，参见Group.vue
      elements: selectedItems
    }
  }

  const newElements = elements.filter(item => !item.selected)

  return [...newElements, groupElement]
}

/**
 * 取消组合
 * @param elements 元素列表
 * @param editorRect 画布react信息
 * @returns 拆分后的列表
 */
export function cancelGroup(elements: ComponentType[], editorRect: DOMRect) {
  // 得到当前选中元素
  const current = elements.find(
    item => item.selected
  ) as Required<ComponentType>
  // 如果没有选中的元素或者不是组合元素直接返回
  if (!current || current.component !== 'es-group') {
    return elements
  }

  // 获取组合元素的子元素列表
  const items = current.props.elements as ComponentType[]
  const newElements = items.map(item => {
    // 子组件相对于浏览器视口位置大小
    const componentRect = document
      .getElementById(item.id!)!
      .getBoundingClientRect()
    // 获取元素的中心点坐标
    const center = {
      x: componentRect.left - editorRect.left + componentRect.width / 2,
      y: componentRect.top - editorRect.top + componentRect.height / 2
    }
    const groupStyle = item.groupStyle!
    // 拆分后的宽高
    const width = current.width * perToNum(groupStyle.width)
    const height = current.height * perToNum(groupStyle.height)

    const obj = {
      width,
      height,
      left: center.x - width / 2,
      top: center.y - height / 2,
      angle: (item.angle || 0) + (current.angle! || 0)
    }
    // 将组合样式置空
    item.groupStyle = {}

    return {
      ...item,
      ...obj
    }
  })

  const list = elements.filter(item => item !== current)
  return [...list, ...newElements]
}

function toPercent(val: number) {
  return val * 100 + '%'
}
function perToNum(perStr: any) {
  return parseFloat(perStr as string) / 100
}

export function addPxUnit(value: number | string) {
  // 检查传入的值是否已经有单位，例如 %, rem, em 等
  if (`${value}`.match(/^[0-9.-]+(px|%|rem|em|vh|vw)$/)) {
    return value // 如果已经有单位，则不做替换，直接返回
  }

  // 否则，添加 px 单位并返回
  return value + 'px'
}
