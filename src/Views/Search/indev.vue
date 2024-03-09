<template>
  <div class="page-header">
    <div class="header-title">
      <span class="font_28">起风了</span>
      <span>的相关搜索如下</span>
    </div>
    <NavBar
      :nav-bar-list="navbarList"
      :current-type="currentType"
      @nav-bar-change="navBarChange"
    />
  </div>

  <div class="page-content" v-if="currentType === '1'"></div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'

const currentType = ref('1')
const navbarList = reactive([
  { type: '1018', label: '综合' },
  { type: '1', label: '单曲' },
  { type: '1000', label: '歌单' },
  { type: '100', label: '歌手' },
  { type: '2000', label: '声音' },
  { type: '1009', label: '播客' },
  { type: '1006', label: '歌词' },
  { type: '10', label: '专辑' },
  { type: '1004', label: 'MV' },
  { type: '1002', label: '用户' },
])

const navBarChange = (type: string) => (currentType.value = type)
</script>

<style lang="scss" scoped>
.page-header {
  height: 120px;
}
.header-title {
  height: 40px;
  display: flex;
  align-items: flex-end;
  color: #626266;
  margin-bottom: 20px;
  .font_28 {
    font-size: 28px;
    font-weight: bold;
    margin-right: 10px;
    color: #ffffff;
  }
}
.page-content {
  width: 100%;
  height: calc(100% - 120px);
  background-color: red;
}
</style>
