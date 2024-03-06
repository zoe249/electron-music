<template>
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
</template>

<script setup lang="ts">
import { getSearchDefault } from '@/api/common'
interface searchDefaultType {
  realkeyword: string
  showKeyword: string
}

const searchValue = ref()
const searchInfo = ref<searchDefaultType>()
const isSearchFocus = ref(false)

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

onMounted(() => getDefaulet())
</script>

<style lang="scss" scoped>
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
</style>
