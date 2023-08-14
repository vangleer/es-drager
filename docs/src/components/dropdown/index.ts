import { VNode, createVNode, render } from 'vue'
import Dropdown from './Dropdown.vue'

export type ActionType = 'remove' | 'copy' | 'paste' | 'duplicate' | 'top' | 'bottom' | 'bottom' | 'group' | 'ungroup'

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
  // 手动挂载组件

  const container = document.createElement('div')

  if (!vm) {
    vm = createVNode(Dropdown, { option })

    // 将组件渲染成真实节点
    render(vm, container)

    document.body.appendChild(container.firstElementChild!)
  }

  const { open } = vm.component!.exposed!
  open(option)
}
