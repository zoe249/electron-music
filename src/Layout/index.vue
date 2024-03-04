<template>
  <div class="layout-content">
    <Menu></Menu>
    <div>
      <Main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from './Menu/index.vue'
import Main from './Content/index.vue'
</script>

<style lang="scss" scoped>
.layout-content {
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

@media (prefers-color-scheme: dark) {
  .layout-content {
    background: #13131a;
    color: white;
  }
}

@media (prefers-color-scheme: light) {
  .layout-content {
    background: #ddd;
    color: black;
  }
}
</style>
