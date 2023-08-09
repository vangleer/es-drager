import { ComponentType } from '@/components/types'

let uid = 1

export function useId(prefix = 'drager') {
  return `${prefix}${uid++}`
}

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

// 计算辅助线
export function calcLines(list: ComponentType[], currentIndex: number) {
  const lines: any = { x: [], y: [] }
  const { width = 0, height = 0 } = list[currentIndex]
  list.forEach((block: ComponentType, i: number) => {
    if (currentIndex === i) return
    const { top: ATop, left: ALeft, width: AWidth, height: AHeight } = block as any
    lines.y.push({ showTop: ATop, top: ATop }) // 顶对顶
    lines.y.push({ showTop: ATop, top: ATop - height }) // 顶对底

    lines.y.push({ showTop: ATop + AHeight / 2, top: ATop + AHeight / 2 - height / 2 }) // 中

    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight }) // 底对顶

    lines.y.push({ showTop: ATop + AHeight, top: ATop + AHeight - height }) // 底对底

    lines.x.push({ showLeft: ALeft, left: ALeft }) // 左对左
    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth }) // 右对左
    // 中间对中间
    lines.x.push({ showLeft: ALeft + AWidth / 2, left: ALeft + AWidth / 2 - width / 2 }) // 中
    lines.x.push({ showLeft: ALeft + AWidth, left: ALeft + AWidth - width })
    lines.x.push({ showLeft: ALeft, left: ALeft - width }) // 左对右
  })

  return lines
}

// 组合元素
export function makeGroup(elements: ComponentType[], editorRect: DOMRect) {
  const selectedItems = elements.filter(item => item.selected)

  if (!selectedItems.length) return elements
  
  let minLeft = Infinity, minTop = Infinity, maxLeft = -Infinity, maxTop = -Infinity

  Math.max(...selectedItems.map(item => item.left!))
  selectedItems.forEach(item => {
    // 获取拖拽元素的位置信息
    const itemRect = document.querySelector(`#${item.id}`)!.getBoundingClientRect()
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
    height: maxTop - minTop, // 高度 = 最大top - 最小top
  }

  // 子元素相对父元素的位置
  selectedItems.forEach(item => {
    item.left = item.left! - minLeft
    item.top = item.top! - minTop
    item.groupStyle = { // 使用百分比的好处是组合元素缩放里面的子元素可以自适应
      ...item.style,
      width: toPercent(item.width! / dragData.width),
      height: toPercent(item.height! / dragData.height),
      left: toPercent(item.left / dragData.width),
      top: toPercent(item.top / dragData.height),
      transform: `rotate(${item.angle || 0}deg)`,
      position: 'absolute'
    }
  })
  
  // 组合组件信息
  const grouItem: ComponentType = {
    component: 'es-group',
    group: true,
    ...dragData,
    props: { // 组合组件的props，参见Group.vue
      elements: selectedItems,
      data: dragData
    }
  }

  const newElements = elements.filter(item => !item.selected)
  
  return [...newElements, grouItem]
}
// 取消组合
export function cancelGroup(elements: ComponentType[], editorRect: DOMRect) {
  // 得到当前选中元素
  const current = elements.find(item => item.selected) as Required<ComponentType>
  // 如果没有选中的元素或者不是组合元素直接返回
  if (!current || current.component !== 'es-group') {
    return elements
  }

  // 获取组合元素的子元素列表
  const items = current.props.elements as ComponentType[]

  const newElements = items.map(item => {
    // 子组件相对于浏览器视口位置大小
    const componentRect = document.querySelector(`#${item.id}`)!.getBoundingClientRect()
    // 获取元素的中心点坐标
    const center = {
      x: componentRect.left - editorRect.left + componentRect.width / 2,
      y: componentRect.top - editorRect.top + componentRect.height / 2,
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