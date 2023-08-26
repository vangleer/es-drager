<template>
  <el-icon>
    <component :is="props.icon as string"></component>
  </el-icon>
</template>
<script setup lang="ts" name="ElIconWrapper">
  const props = defineProps({
    name: String,
    size: String,
    color: String,
    icon: String,
  });
</script>
<style lang="scss" scoped></style>
