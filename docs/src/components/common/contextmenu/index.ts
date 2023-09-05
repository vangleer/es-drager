import { useEditorContainer } from '@/hooks'
import { VNode, createVNode, render } from 'vue'
import Menu from './Menu.vue'

export type ActionType =
  | 'remove'
  | 'cut'
  | 'copy'
  | 'paste'
  | 'duplicate'
  | 'top'
  | 'bottom'
  | 'group'
  | 'ungroup'
  | 'selectAll'
  | 'lock'
  | 'moveUp'
  | 'moveDown'

export type MenuItem = {
  label: string
  action: ActionType
}

export type MenuOption = {
  clientX?: number
  clientY?: number
  items?: MenuItem[]
  onClick?: (item: MenuItem) => void
}

let vm: VNode | null = null
export function $contextmenu(option: MenuOption) {
  if (!vm) {
    const { container: globalContainer } = useEditorContainer()
    const container = document.createElement('div')
    vm = createVNode(Menu, { option })

    // 将组件渲染成真实节点
    render(vm, container)

    globalContainer.appendChild(container.firstElementChild!)
  }

  const { open } = vm.component!.exposed!
  open(option)
}
