<template>
  <div class="layout-content">
    <Menu></Menu>
    <div class="main-content">
      <Header />
      <Main />
    </div>
    <Player />
  </div>
</template>

<script setup lang="ts">
import Menu from './Menu/index.vue'
import Main from './Content/index.vue'
import Header from './Header/index.vue'
import Player from './Player/index.vue'
</script>

<style lang="scss" scoped>
.layout-content {
  display: flex;
  border-radius: 16px;
  overflow: hidden;
  height: calc(100% - 80px);
  width: 100%;
}

// @media (prefers-color-scheme: dark) {
//   .layout-content {
//     background: #13131a;
//     color: white;
//   }
// }

// @media (prefers-color-scheme: light) {
//   .layout-content {
//     background: #ddd;
//     color: black;
//   }
// }

.main-content {
  box-sizing: border-box;
  height: calc(100vh - 80px - 80px);
  padding: 20px;
}
</style>
