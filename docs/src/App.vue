<template>
  <el-config-provider :locale="en">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import en from 'element-plus/dist/locale/en.mjs'
</script>
