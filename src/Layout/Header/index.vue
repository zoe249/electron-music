<template>
  <div class="header-content">
    <div class="header-left">
      <div class="back-icon">
        <i class="iconfont icon-fenxiang"></i>
      </div>
      <div class="search-content">
        <div class="search-input">
          <i class="iconfont icon-search" @click="handlerSearch"></i>
          <input
            type="text"
            v-model="searchValue"
            :placeholder="searchInfo?.showKeyword"
            @focus="updateIsFocus(true)"
            @blur="updateIsFocus(false)"
          />
          <i
            v-show="searchValue"
            class="iconfont icon-qingkong-"
            @click="() => (searchValue = '')"
          ></i>
        </div>
        <div class="listen-music">
          <i class="iconfont icon-tinggeshiqu"></i>
        </div>
      </div>
    </div>
    <div class="header-right">
      <div class="logo-info">
        <i class="iconfont icon-denglu-copy"></i>
      </div>
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
// import { ipcRenderer } from 'electron'
// import electron from 'electron'
interface searchDefaultType {
  realkeyword: string
  showKeyword: string
}
import { getSearchDefault } from '@/api/common'
const searchValue = ref()
const searchInfo = ref<searchDefaultType>()
const isSearchFocus = ref(false)
let isWindowMax = false

/**
 * 更新输入框状态
 */
const updateIsFocus = (value: boolean) => (isSearchFocus.value = value)

const handlerSearch = () => {
  let _searchVal = ''
  if (searchValue.value) {
    _searchVal = searchValue.value
  } else {
    _searchVal = searchInfo.value?.realkeyword!
  }
  console.log(_searchVal)
}

const getDefaulet = () => {
  getSearchDefault<SucType>().then((res: SucType) => {
    searchInfo.value = res.data
  })
}

const onElectronOperationWindow = (
  type: 'min' | 'max' | 'close' | 'restoreDown'
) => {
  if (type === 'max' || type === 'restoreDown') {
    isWindowMax = !isWindowMax
  }
  ;(window as any).electronAPI.operationWindow(type)
}

onMounted(() => getDefaulet())
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
  border: 1px solid #37373d;
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    color: #ffffff;
    background-color: #212127;
    height: 35px;
    width: 25px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.search-content {
  display: flex;
}
.search-input {
  height: 35px;
  width: 250px;
  background-image: linear-gradient(to right, #181d2a, #251b26);
  border: 1.5px solid #322842;
  border-radius: 6px;
  position: relative;

  .icon-search {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
    :hover {
      color: #ffffff;
    }
  }
  input {
    padding-left: 50px;
    background-color: transparent;
    border: 0;
    height: 100%;
    width: calc(100% - 80px);
    border-style: none;
    letter-spacing: 1px;
    &:focus {
      border: none;
      outline: none; /* 或者 outline: 0px */
    }
  }
  .icon-qingkong- {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
}

.listen-music {
  height: 35px;
  width: 25px;
  border: 1px solid #37373d;
  margin-left: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #251b27;
  :hover {
    color: #ffffff;
    background-color: #312336;
    height: 35px;
    width: 25px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.header-right {
  display: flex;
  align-items: center;
  .logo-info {
    :hover {
      color: #ffffff;
      cursor: pointer;
    }
  }
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
