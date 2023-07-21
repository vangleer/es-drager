import { deepCopy, events } from "@/utils"
import { onUnmounted, onMounted } from "vue"

type CommandType = {
  name: string
  keyboard?: string
  pushQueue?: boolean
  init?: Function
  execute: (...args: any[]) => QueueType
}
export type CommandStateType = {
  current: number
  queue: QueueType[]
  commands: { [key in string]: any },
  commandArray: CommandType[],
  destoryArray: any[]
}
type QueueType = {
  redo?: Function
  undo?: Function
}
export function useCommand(data: any) {
  const state: CommandStateType = {
    current: -1, // 前进后退指针
    queue: [], // 存放所有的操作命令
    commands: {}, // 制作命令和执行功能映射
    commandArray: [], // 所有的命令
    destoryArray: []
  }

  const registry = (command: CommandType) => {
    state.commandArray.push(command)
    state.commands[command.name] = (...args: any[]) => {
      const { redo, undo } = command.execute(...args)
      redo!()

      if (command.pushQueue) {
        let { queue } = state
        if (queue.length > 0) {
          queue = queue.slice(0, state.current + 1)
          state.queue = queue
        }
        state.queue.push({ redo, undo }) // 保存指令的前进后退
        state.current += 1
      }
    }
  }

  registry({
    name: 'redo',
    keyboard: 'ctrl+y',
    execute() {
      return {
        redo() {
          let item = state.queue[state.current + 1]
          if (item) {
            item.redo && item.redo()
            state.current++
          }
        }
      }
    }
  })

  registry({
    name: 'undo',
    keyboard: 'ctrl+z',
    execute() {
      return {
        redo() {
          if (state.current === -1) return
          let item = state.queue[state.current]
          if (item) {
            item.undo && item.undo()
            state.current--
          }
        }
      }
    }
  })

  registry({
    name: 'drag',
    pushQueue: true,
    init() { // 初始化操作 默认就会执行
      // 监控拖拽开始事件，保持状态
      const dragstart = () => {
        (this as any).before = deepCopy(data.value.elements)
      }
      const dragend = () => state.commands.drag()
      events.on('dragstart', dragstart)
      events.on('dragend', dragend)

      return () => {
        events.off('dragstart', dragstart)
        events.off('dragend', dragend)
      }
    },
    execute() {
      const before = (this as any).before
      const after = data.value.elements
      return {
        redo() {
          data.value = { ...data.value, elements: after }
        },
        undo() {
          data.value = { ...data.value, elements: before }
        }
      }
    }
  })

  // 带有历史记录常用模式
  registry({
    name: 'updateContainer',
    pushQueue: true,
    execute(newValue) {
      const state = {
        before: data.value,
        after: newValue
      }
      return {
        redo() {
          data.value = state.after
        },
        undo() {
          data.value = state.before
        }
      }
    }
  })


  state.commandArray.forEach(command => {
    command.init && state.destoryArray.push(command.init())
  })

  // 监听键盘事件
  const keyboardEvent = () => {
    const onKeydown = (e: KeyboardEvent) => {
      const { ctrlKey, key } = e
      // 拼凑按下的键
      const keyArr = []
      if (ctrlKey) keyArr.push('ctrl')
      keyArr.push(key)
      const keyStr = keyArr.join('+')

      state.commandArray.forEach(({ name, keyboard }) => {
        if (!keyboard) return
        if (keyboard === keyStr) {
          state.commands[name]()
          e.preventDefault()
        }
      })
    }
    window.addEventListener('keydown', onKeydown)
    return () => { // 销毁事件
      window.removeEventListener('keydown', onKeydown)
    }
  }

  onMounted(() => {
    state.destoryArray.push(keyboardEvent())
  })
  onUnmounted(() => {
    // 清理绑定的事件
    state.destoryArray.forEach(fn => fn && fn())
  })
  return state
}
