import { ExtractPropTypes, Ref, computed, onMounted, ref } from 'vue'
import { DragerProps, MarklineData } from '../drager'
import { getBoundingClientRectByScale } from '../utils'
type MarklineEvent = 'drag-start' | 'drag' | 'drag-end'
const isFn = (value: any): value is Function => typeof value === 'function'
export function useMarkline(
  targetRef: Ref<HTMLElement | null>,
  props: ExtractPropTypes<typeof DragerProps>
) {
  let lineX: HTMLElement | null = null
  let lineY: HTMLElement | null = null
  const parent = computed(() => targetRef.value!.offsetParent || document.body)
  const parentRect = computed(() => getBoundingClientRectByScale(parent.value,props.scaleRatio))
  
  const lines = ref<any>({ x: [], y: [] })
  const init = () => {
    if (props.markline && !isFn(props.markline)) {
      if (!lineX) {
        lineX = document.querySelector(`.es-drager-markline-x`) || initLine('x', parent.value!, props.color)
      }
    
      if (!lineY) {
        lineY = document.querySelector(`.es-drager-markline-y`) || initLine('y', parent.value!, props.color)
      }
    }
  }
  const update = (marklineData: MarklineData = {}) => {
    if (!props.markline) return

    if (isFn(props.markline)) {
      return props.markline(marklineData)
    }

    if (marklineData.left === null) {
      lineX!.style.display = 'none'
    } else {
      lineX!.style.left = marklineData.left + 'px'
      lineX!.style.backgroundColor = props.color
      lineX!.style.display = 'block'
    }
    
    if (marklineData.top === null) {
      lineY!.style.display = 'none'
    } else {
      lineY!.style.top = marklineData.top + 'px'
      lineY!.style.backgroundColor = props.color
      lineY!.style.display = 'block'
    }
  }
  // 吸附
  const handleDragStart = () => {
    const source = getBoundingClientRectByScale(targetRef.value!, props.scaleRatio)
    const elList = Array.from(document.querySelectorAll('.es-drager')) as any[]
    if (props.extraLines) {
      const extras = props.extraLines(source) || []
      elList.push(...extras)
    }
    
    const targets = [], x = [], y = []
    for (let i = 0; i < elList.length; i++) {
      const el = elList[i]
      if (el.nodeType === 1) {
        if (el !== targetRef.value) {
          targets.push(getBoundingClientRectByScale(el, props.scaleRatio))
        }
      } else if (el.showTop || el.showTop === 0) {
        y.push(el)
      } else if (el.showLeft || el.showLeft === 0) {
        x.push(el)
      }
      
    }

    lines.value = calcLines(targets, source)
    lines.value.x.push(...x)
    lines.value.y.push(...y)
  }

  const handleDrag = () => {
    const markLine: MarklineData = {
      top: null,
      left: null,
      diffX: 0,
      diffY: 0
    }
    const source = getBoundingClientRectByScale(targetRef.value!,props.scaleRatio)
    for (let i = 0; i < lines.value.y.length; i++) {
      const { top, showTop } = lines.value.y[i]

      if (Math.abs(top - source.top) < props.snapThreshold) {
        markLine.diffY = top - source.top
        markLine.top = showTop - parentRect.value.top
        break
      }
    }

    for (let i = 0; i < lines.value.x.length; i++) {
      const { left, showLeft } = lines.value.x[i]

      if (Math.abs(left - source.left) < props.snapThreshold) {
        markLine.diffX = left - source.left
        markLine.left = showLeft - parentRect.value.left
        break
      }
    }
    
    // 更新markline
    update(markLine)
    return markLine
  }

  const handleDragEnd = () => {
    update({ left: null, top: null })
  }

  const marklineEmit = (type: MarklineEvent) => {
    if (!props.snap && !props.markline) return
    switch(type) {
      case 'drag-start':
        handleDragStart()
        break
      case 'drag':
        return handleDrag()
      case 'drag-end':
        handleDragEnd()
        break
    }
  }

  onMounted(() => {
    init()
  })
  
  return {
    marklineEmit
  }
}

function initLine(dir: 'x' | 'y' = 'x', parent: Element, color = '') {
  const line = document.createElement('div')
  line.classList.add(`es-drager-markline-${dir}`)
  // common style
  line.style.position = 'absolute'
  line.style.top = '0px'
  line.style.left = '0px'
  line.style.zIndex = '9999'
  line.style.backgroundColor = color
  line.style.display = 'none'

  if (dir === 'x') {
    line.style.height = '100%'
    line.style.width = '1px'
  } else {
    line.style.height = '1px'
    line.style.width = '100%'
  }
  
  parent.appendChild(line)
  return line
}

// 计算辅助线
function calcLines(list: DOMRect[], current: DOMRect) {
  const lines: any = { x: [], y: [] }
  const { width = 0, height = 0 } = current
  list.forEach(block => {
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