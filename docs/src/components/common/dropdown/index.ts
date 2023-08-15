import { useEditorContainer } from '@/hooks'
import { VNode, createVNode, render } from 'vue'
import Dropdown from './Dropdown.vue'

export type ActionType = 'remove' | 'copy' | 'paste' | 'duplicate' | 'top' | 'bottom' | 'bottom' | 'group' | 'ungroup' | 'selectAll' | 'lock' | 'moveUp' | 'moveDown'

export type DropdownItem = {
  label: string,
  action: ActionType
}

export type DropdownOption = {
  el?: HTMLElement | null
  clientX?: number
  clientY?: number
  items?: DropdownItem[]
  onClick?: (item: DropdownItem) => void
}

let vm: VNode | null = null
export function $dropdown(option: DropdownOption) {
  if (!vm) {
    const { container: globalContainer } = useEditorContainer()
    const container = document.createElement('div')
    vm = createVNode(Dropdown, { option })

    // 将组件渲染成真实节点
    render(vm, container)

    globalContainer.appendChild(container.firstElementChild!)
  }

  const { open } = vm.component!.exposed!
  open(option)
}
