import { VNode, createVNode, render } from 'vue'
import Dialog from './Dialog.vue'


let vm: VNode | null = null
export function $dialog(option: Object) {
  // 手动挂载组件

  const container = document.createElement('div')

  if (!vm) {
    vm = createVNode(Dialog, { option })

    // 将组件渲染成真实节点
    render(vm, container)

    document.body.appendChild(container.firstElementChild!)
  }

  const { open } = vm.component!.exposed!
  open(option)
}
