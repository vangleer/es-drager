import { ComponentType } from '@/components/types'

export function deepCopy(obj: any) {
  return JSON.parse(JSON.stringify(obj))
}

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
