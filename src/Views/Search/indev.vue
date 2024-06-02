<template>
  <div class="page-header">
    <div class="header-title">
      <span class="font_28">{{ keywords }}</span>
      <span>的相关搜索如下</span>
    </div>
    <NavBar
      :nav-bar-list="navbarList"
      :current-type="currentType"
      @nav-bar-change="navBarChange"
    />
  </div>

  <div class="page-content" v-if="currentType === 1">
    <div class="content-header row-flex">
      <div class="rank">#</div>
      <div class="title">标题</div>
      <div class="album">专辑</div>
      <div class="lover">喜欢</div>
      <div class="duration">时长</div>
    </div>
    <!-- <Songs :songs-list="songsList" :keywords="keywords" /> -->
    <div
      class="row-flex item-songs"
      v-for="(item, index) in songsList"
      :key="index"
      @click="songsClick(item)"
      @mouseenter="songsMoveEnter(index)"
      @mouseleave="songsMOveLeave"
    >
      <div class="rank">
        <span v-if="index === activeSongIndex">
          <i class="iconfont icon-bofang" :style="{ fontSize: '12px' }"></i>
        </span>
        <span v-else>{{ index + 1 }}</span>
      </div>
      <div class="title">
        <!-- <img :src="item.artists[0].img1v1Url" alt="" /> -->
        <div class="title-info">
          <div class="name">{{ item.name }}</div>
          <div class="author">{{ item.artists[0].name }}</div>
        </div>
      </div>
      <div class="album">{{ item.album.name }}</div>
      <div class="lover"><i class="iconfont icon-aixin1"></i></div>
      <div class="duration">{{ formatDuration(item.duration) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from '@/components/NavBar/index.vue'

import { formatDuration } from '@/utils/index'
import { getSearch } from './api'
import useMusicStore from '@/store/modules/music'

const musicStore = useMusicStore()
const route = useRoute()

let keywords = route.query.keywords + ''
const currentType = ref(1)
const navbarList = reactive<Array<{type: number, label: string}>>([
  { type: 1018, label: '综合' },
  { type: 1, label: '单曲' },
  { type: 1000, label: '歌单' },
  { type: 100, label: '歌手' },
  { type: 2000, label: '声音' },
  { type: 1009, label: '播客' },
  { type: 1006, label: '歌词' },
  { type: 10, label: '专辑' },
  { type: 1004, label: 'MV' },
  { type: 1002, label: '用户' },
])

const songsList = ref<Array<SongType>>([])
const activeSongIndex = ref<number>()

watch(() => route.query, (newVal) => {
  keywords = newVal.keywords + ''
  navBarChange(1, newVal.keywords as string)
})

const navBarChange = async (type: number = 1, keyword: string = keywords) => {
  currentType.value = type
  getSearch<{ code: number; result: any }>(type, keyword).then((res) => {
    songsList.value = res.result.songs
  })
}

/**
 * @description 添加音乐
 */
const songsClick = (music: SongType) => {
  musicStore.addMusic(music.id)
}

const songsMoveEnter = (index: number) => {
  activeSongIndex.value = index
}
const songsMOveLeave = () => {
  activeSongIndex.value = -1
}

onMounted(() => navBarChange(1))
</script>

<style lang="scss" scoped>
.page-header {
  height: 120px;
}
.header-title {
  height: 40px;
  display: flex;
  align-items: flex-end;
  color: $greyColor;
  margin-bottom: 20px;
  .font_28 {
    font-size: 28px;
    font-weight: bold;
    margin-right: 10px;
    @include font_color('text-color');
  }
}
.page-content {
  width: 100%;
  height: calc(100% - 120px);
  overflow-y: scroll;
  .content-header {
    height: 40px;
    line-height: 40px;
    @include border_bottom_color('light-grey-color');
    color: $greyColor;
    font-size: 14px;
  }
  .row-flex {
    width: 100%;
    display: flex;
    align-items: center;
    .rank {
      color: $greyColor;
      width: 40px;
      text-align: center;
    }
    .title {
      flex: 0.5;
      display: flex;
      align-items: center;
      img {
        height: 50px;
        width: 50px;
        margin-right: 10px;
      }
      .title-info {
        .name {
          color: #495d8a;
        }
        .author {
          color: $greyColor;
          font-size: 12px;
        }
      }
    }
    .album {
      flex: 0.5;
      // font-size: 12px;
      color: $greyColor;
    }
    .lover {
      width: 60px;
      cursor: pointer;
    }
    .duration {
      width: 80px;
      color: $greyColor;
      font-size: 14px;
    }
  }
  .item-songs {
    height: 70px;
    .album {
      flex: 0.5;
      font-size: 12px;
      color: $greyColor;
    }
    .duration {
      width: 80px;
      color: $greyColor;
      font-size: 12px;
    }
    &:hover {
      @include card_shadow('card-box-shadow');
      @include card_bg_color('card-bg-color');
      border-radius: 12px;
    }
    .icon-bofang {
      cursor: pointer;
    }
  }
}
</style>
