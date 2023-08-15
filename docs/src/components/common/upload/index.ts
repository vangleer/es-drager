import { useEditorContainer } from '@/hooks'
import { VNode, createVNode, render } from 'vue'
import Upload from './Upload.vue'
type ResultType = 'text' | 'url' | 'custom'
export type UploadOption = {
  resultType: ResultType
  onChange?: (e: any) => void
}
let vm: VNode | null = null
export function $upload(option: UploadOption) {
  if (!vm) {
    // 手动挂载组件
    const { container: globalContainer } = useEditorContainer()
    const container = document.createElement('div')
    vm = createVNode(Upload, { option })

    // 将组件渲染成真实节点
    render(vm, container)

    globalContainer.appendChild(container.firstElementChild!)
  } else {
    // 第一次组件挂载会打开，后面调用open打开文件选择框
    const { open } = vm.component!.exposed!
    open(option)
  }
}
