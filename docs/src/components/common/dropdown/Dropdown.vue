<template>
  <div>
    <div ref="triggerRef" class="es-trigger" :style="triggerStyle"></div>
    <div
      ref="menuRef"
      v-show="state.visible"
      class="es-contentmenu"
      :style="style"
      @click.stop
    >
      <ul v-if="state.option.items">
        <li v-for="item in state.option.items" @click="handleItemClick(item)">{{ item.label }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, reactive, onBeforeUnmount, PropType } from 'vue'
import { computePosition, flip, shift, offset } from '@floating-ui/dom'
import { DropdownOption, DropdownItem } from './index'
const props = defineProps({
  option: {
    type: Object as PropType<DropdownOption>,
    default: () => ({})
  }
})
const triggerRef = ref()
const menuRef = ref()

const state = reactive({
  option: props.option,
  visible: false,
  top: 0,
  left: 0
})

const style = computed(() => ({ left: state.left + 'px', top: state.top + 'px' }))
const triggerStyle = computed(() => ({ left: state.option.clientX + 'px', top: state.option.clientY + 'px' }))
const middleware = [shift(), flip(), offset(10)]
const open = (option: Record<string, any>) => {
  state.option = option
  state.visible = true
  
  computePosition(triggerRef.value, menuRef.value, { middleware }).then(data => {
    state.left = data.x
    state.top = data.y
  })
}
const close = () => {
  state.visible = false
}

const handleItemClick = (item: DropdownItem) => {
  state.option.onClick && state.option.onClick(item)
  close()
}

function onMouseDown(e: Event) {
  if (!menuRef.value.contains(e.target)) {
    close()
  }
}

onMounted(() => {
  document.addEventListener('mousedown', onMouseDown, true)
})

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', onMouseDown)
})

defineExpose({
  open,
  close
})
</script>

<style lang='scss' scoped>
.es-contentmenu {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  box-shadow: var(--el-box-shadow-light);
  border-radius: 4px;
  ul {
    padding: 5px 0;
    background-color: var(--el-bg-color-overlay);
    border-radius: var(--el-border-radius-base);
    padding: 5px 0;
    li {
      display: flex;
      align-items: center;
      white-space: nowrap;
      list-style: none;
      line-height: 22px;
      padding: 5px 16px;
      margin: 0;
      font-size: var(--el-font-size-base);
      color: var(--el-text-color-regular);
      cursor: pointer;
      outline: none;
      &:hover {
        background-color: var(--el-color-primary-light-9);
        color: var(--el-color-primary);
      }
    }
  }
}

.es-trigger {
  position: absolute;
}
</style>
