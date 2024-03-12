<template>
  <div class="search-content">
    <div class="search-input">
      <i class="iconfont icon-search" @click="handlerSearch"></i>
      <input
        type="text"
        v-model="searchValue"
        :placeholder="searchInfo?.showKeyword"
        @input="changeInput"
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

  <div class="search-box" v-if="isSearchWrap">
    <div class="hot-search" v-if="!searchValue">
      <div class="title">热搜榜</div>
      <div
        class="hot-item"
        v-for="(item, index) in searchHotList"
        :key="index"
        @click="toSearchPage(item.searchWord)"
      >
        <div :class="['search-num', index <= 2 ? 'hot-color' : '']">
          {{ index + 1 }}
        </div>
        <div class="search-name">{{ item.searchWord }}</div>
      </div>
    </div>
    <div class="search-suggest" v-else>
      <div class="title">猜你想搜</div>
      <div
        class="suggest-item"
        v-for="(item, index) in searchSuggestList"
        @click="toSearchPage(item.name)"
      >
        <div class="search-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getSearchDefault, getSearchHot, getSearchSuggest } from '@/api/common'
import { debounce } from '@/utils/index'
interface searchDefaultType {
  realkeyword: string
  showKeyword: string
}

const router = useRouter()

const searchValue = ref()
const searchInfo = ref<searchDefaultType>()
const isSearchFocus = ref(false)
const isSearchWrap = ref(false)

const searchHotList = ref()
const searchSuggestList = ref()

const updateIsFocus = (value: boolean) => {
  isSearchFocus.value = value
  value ? (isSearchWrap.value = true) : ''
}

const handlerSearch = () => {
  let _searchVal = ''
  if (searchValue.value) {
    _searchVal = searchValue.value
  } else {
    _searchVal = searchInfo.value?.realkeyword!
  }
}

const getDefaulet = () => {
  getSearchDefault<SucType>().then((res) => {
    searchInfo.value = res.data
  })
}

const getSearchHotList = () => {
  getSearchHot().then((res: any) => {
    searchHotList.value = res.data
  })
}

const changeInput = debounce(
  async () => {
    getSearchSuggest(searchValue.value).then((res: any) => {
      searchSuggestList.value = res.result.songs
    })
  },
  500,
  false
)

const toSearchPage = (keyword: string) => {
  isSearchWrap.value = false
  router.push('/search?keywords=' + keyword)
}

onMounted(() => {
  getDefaulet()
  getSearchHotList()
})
</script>

<style lang="scss" scoped>
.search-content {
  display: flex;
}
.search-input {
  height: 35px;
  width: 250px;
  // background-image: linear-gradient(to right, #181d2a, #251b26);
  // border: 1.5px solid #322842;
  @include border_color('light-grey-color');
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
  @include border_color('light-grey-color');
  margin-left: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: #251b27;
  :hover {
    color: #ffffff;
    // background-color: #312336;
    height: 35px;
    width: 25px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.search-box {
  height: 500px;
  width: 320px;
  box-sizing: border-box;
  @include card_shadow('card-box-shadow');
  @include card_bg_color('card-bg-color');
  position: absolute;
  z-index: 9;
  top: 100px;
  border-radius: 8px;
  padding: 20px 0;
  overflow-y: scroll;
  .title {
    padding: 0 20px 20px 20px;
    color: #73737a;
    font-weight: bold;
  }
  .hot-item {
    height: 60px;
    width: 100%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding: 0 20px;
    cursor: pointer;
    .search-num {
      font-size: 14px;
      font-weight: bold;
      width: 30px;
      color: #818188;
    }
    .hot-color {
      color: #ff3a3a;
    }
    &:hover {
      // background-color: #393944;
    }
  }
  .suggest-item {
    cursor: pointer;
    &:hover {
      // background-color: #393944;
    }
    .search-name {
      height: 40px;
      line-height: 40px;
      padding-right: 20px;
      padding-left: 30px;
      font-size: 14px;
    }
  }
}
</style>
