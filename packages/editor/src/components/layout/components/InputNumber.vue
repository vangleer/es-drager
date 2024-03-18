<template>
  <div class="es-input-number">
    <div class="es-input-number-prefix">
      <slot name="prefix">
        <template v-if="prefix">{{ prefix }}:</template>
      </slot>
    </div>
    <el-input-number v-bind="$attrs" controls-position="right" />
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  prefix: {
    type: String
  }
})
</script>

<style lang='scss' scoped>
.es-input-number {
  position: relative;
  :deep(.el-input-number) {
    width: 100%;
    .el-input__inner {
      padding-left: 20px;
    }
  }
  &-prefix {
    display: flex;
    align-items: center;
    left: 0;
    top: 0;
    position: absolute;
    color: #000;
    z-index: 1;
    font-size: 12px;
    width: 40px;
    height: 100%;
    padding-left: 6px;
  }
}
</style>
