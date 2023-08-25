<template>
  <el-config-provider :locale="locale">
    <RouterView></RouterView>
  </el-config-provider>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  const locale = ref('en');
</script>
