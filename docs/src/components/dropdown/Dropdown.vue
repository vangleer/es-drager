<template>
  <div
    ref="menuRef"
    v-show="state.visible"
    class="v-contentmenu"
    :style="style"
    @click.stop
  >
    <ul v-if="option.items">
      <li v-for="item in option.items" @click="handleItemClick(item)">{{ item.label }}</li>
    </ul>
  </div>
</template>

<script setup lang='ts'>
import { ref, computed, onMounted, reactive, onBeforeUnmount, PropType } from 'vue'
import { DropdownOption, DropdownItem } from './index'
const props = defineProps({
  option: {
    type: Object as PropType<DropdownOption>,
    default: () => ({})
  }
})

const menuRef = ref()

const state = reactive({
  option: props.option,
  visible: false,
  top: 0,
  left: 0
})

const style = computed(() => ({ left: state.left + 'px', top: state.top + 'px' }))

const open = (option: Record<string, any>) => {
  state.option = option
  const { top, left, height } = (option.el as HTMLElement).getBoundingClientRect()
  state.top = top + height
  state.left = left
  state.visible = true
}
const close = () => {
  state.visible = false
}

const handleItemClick = (item: DropdownItem) => {
  props.option.onClick && props.option.onClick(item)
}

function onMouseDown(e: Event) {
  if (!menuRef.value.contains(e.target)) {
    console.log('asdasd')
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
.v-contentmenu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
  height: 200px;
  z-index: 9999;
  box-shadow: var(--el-dropdown-menu-box-shadow);
  ul {
    padding: 5px 0;
    background-color: var(--el-bg-color-overlay);
    border-radius: var(--el-border-radius-base);
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
</style>
