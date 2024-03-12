<template>
  <div class="header-content">
    <div class="header-left">
      <div class="back-icon">
        <i class="iconfont icon-fenxiang"></i>
      </div>
      <Search />
    </div>

    <div class="header-right">
      <Login />
      <div class="size-info">
        <i
          class="iconfont icon-2zuixiaohua-2"
          @click="onElectronOperationWindow('min')"
        ></i>
        <i
          class="iconfont icon-zuidahua"
          @click="
            onElectronOperationWindow(isWindowMax ? 'restoreDown' : 'max')
          "
        ></i>
        <i
          class="iconfont icon-guanbi"
          @click="onElectronOperationWindow('close')"
        ></i>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Search from './components/Search.vue'
import Login from './components/Login.vue'

let isWindowMax = false

/**
 * 窗口尺寸变化
 */
const onElectronOperationWindow = (
  type: 'min' | 'max' | 'close' | 'restoreDown'
) => {
  if (type === 'max' || type === 'restoreDown') {
    isWindowMax = !isWindowMax
  }
  ;(window as any).electronAPI.operationWindow(type)
}
</script>

<style lang="scss" scoped>
.header-content {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: calc(100vw - 250px);
}
.header-left {
  display: flex;
}
.back-icon {
  height: 35px;
  width: 25px;
  @include border_color('light-grey-color');
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    color: #ffffff;
    // background-color: #212127;
    height: 35px;
    width: 25px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.header-right {
  display: flex;
  align-items: center;

  .size-info {
    margin-left: 20px;
    padding-left: 20px;
    border-left: 1px solid #2b2b31;
    :hover {
      color: #ffffff;
    }
    .iconfont {
      padding: 0 10px;
      cursor: pointer;
    }
  }
}
</style>
