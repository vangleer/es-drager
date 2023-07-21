import { VNode, createVNode, render } from 'vue'
import Dropdown from './Dropdown.vue'

export type DropdownItem = {
  label?: string
}

export type DropdownOption = {
  el?: HTMLElement | null
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
    const a = render(vm, container)

    console.log(a, container.firstElementChild, 'containercontainer')
    document.body.appendChild(container.firstElementChild!)
  }

  const { open } = vm.component!.exposed!
  open(option)
}
