<template>
  <div class="player-footer">
    <div class="song-info">
      <div class="song-img">
        <div class="song-bg">
          <img
            class="music-circle"
            src="/public/icons/disc.png"
          />
          <img
            class="music-src"
            :style="{ 'animationPlayState' : isPlaying ? 'running' : 'paused' }"
            :src="musicInfo.picUrl || '/public/icons/default.png'"
          />
        </div>

        <div class="info-right">
          <div class="song-text">
            <span class="font_18">{{ musicInfo.name }}</span>
            <span>-</span>
            <span class="font_14">{{ musicInfo.author }}</span>
          </div>
          <div class="song-icon">
            <i class="iconfont icon-aixin1"></i>
            <i class="iconfont icon-pinglun"></i>
            <i class="iconfont icon-xiazai"></i>
            <i class="iconfont icon-gengduo"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="song-control">
      <div class="control-icon">
        <i class="iconfont icon-xunhuan"></i>
        <i class="iconfont icon-shangyishou"></i>
        <div class="play-btn" @click="handlerPlay">
          <i
            v-if="isPlaying"
            class="iconfont icon-zanting"
          />
          <i v-else class="iconfont icon-bofang" />
        </div>
        <i class="iconfont icon-shangyishou xiayishou"></i>
        <i class="iconfont icon-geci"></i>
      </div>
      <div class="song-duration">
        <div class="active-duration">
          {{ formatDuration(musicTimeInfo.currentDur!) }}
        </div>
        <div 
          ref="totalBarRef" 
          class="control-bar" 
          @click="ballMoveClick"
          @mouseover="barMouseOver"
          @mouseleave="barMouseLeave"
        >
          <div ref="activeBarRef" :style="{ 'width': activeBarWidth + '%' }" class="active-bar"></div>
          <div
            v-show="isShowMoveBall || isMoveBall"
            ref="activeBallRef"
            class="active-ball"
            @mousedown="ballMouseDown($event)"
            @mousemove="ballMouseMove"
          ></div>
        </div>
        <div class="total-duration">
          {{ formatDuration(musicTimeInfo.duration!) }}
        </div>
      </div>
    </div>
    <div class="song-setting"></div>

    <audio 
      ref="audioRef" 
      :src="musicInfo.musicUrl" 
      @timeupdate="timeupdate"
      @ended="ended"
    />
  </div>
</template>

<script setup lang="ts">
import useMusicStore from '@/store/modules/music'
import { formatDuration } from '@/utils/index'

const musicStore = useMusicStore()
const isShowMoveBall = ref(false)
const isMoveBall = ref(false)
const { isPlaying } = toRefs(musicStore.$state)

const totalBarRef = ref<HTMLDivElement>()
const activeBarRef = ref<HTMLDivElement>()
const activeBallRef = ref<HTMLDivElement>()
const audioRef = ref<HTMLMediaElement>()

const activeBarWidth = ref<number>(0)

const musicTimeInfo = reactive({
  currentDur: 0,
  duration: 320,
})

const ballInfo = reactive({
  x: 0,
  y: 0,
})

const musicInfo = reactive<{[key: string]: any } & musicInfoType>({
  name: '',
  musicUrl: '',
  id: null,
  picUrl: '',
  author: ''
})

watch(() => musicStore.$state.isPlaying, (val) => {
  nextTick(() => val ? _play() : _pause())
})

musicStore.$subscribe((_, state) => {
  if (musicInfo.id !== state.musicInfo.id) {
    nextTick(() => musicStore.play())
  }
  Object.keys(musicInfo).forEach(key => {
    musicInfo[key] = state.musicInfo[key as keyof musicInfoType]
  })
  musicTimeInfo['currentDur'] = 0
  musicTimeInfo['duration'] = state.musicInfo.duration!
})

/**
 * 播放音乐
 * 只能通过 store 调用
 */
const _play = () => audioRef.value?.play()
/**
 * 暂停音乐
 * 只能通过 store 调用
 */
const _pause = () => audioRef.value?.pause()

/** 音乐播放时间更新 */
const timeupdate = (event: Event) => {
  musicTimeInfo.currentDur = parseInt(((event.target as HTMLAudioElement).currentTime).toFixed(0))
  activeBarWidth.value = ((musicTimeInfo.currentDur / musicTimeInfo.duration!) * 100)
}
/** 音乐播放结束 */
const ended = () => musicStore.paused()

const handlerPlay = () => {
  if (isPlaying.value) {
    musicStore.paused()
  } else {
    musicStore.play()
  }
}

/** 显示拖拽球 */
const barMouseOver = () => isShowMoveBall.value = true
/** 隐藏拖拽球 */
const barMouseLeave = () => isShowMoveBall.value = false

/**
 * 按下鼠标
 */
const ballMouseDown = (event: MouseEvent) => {
  isMoveBall.value = true
  ballInfo.x = event.x
  document.addEventListener('mousemove', ballMouseMove)
  document.addEventListener('mouseup', ballMouseUp)
}

/**
 * 拖拽进度条
 */
const ballMouseMove = (event: MouseEvent) => {
  if (isMoveBall.value) {
    let moveX = event.clientX - totalBarRef.value?.offsetLeft!
    if (moveX > 0 && moveX < totalBarRef.value?.clientWidth!) {
      activeBarWidth.value = (moveX / totalBarRef.value?.clientWidth!) * 100
      // 计算当前时长
      // const _ratio = (moveX / totalBarRef.value?.clientWidth!).toFixed(2)
      musicTimeInfo.currentDur = musicTimeInfo.duration! * getRatio(moveX)
      audioRef.value!.currentTime = musicTimeInfo.currentDur
    }
  }
}

/**
 * 鼠标弹起
 */
const ballMouseUp = () => {
  isMoveBall.value = false
}

/**
 * 点击进度条
 */
const ballMoveClick = (event: MouseEvent) => {
  const _current = event.x - totalBarRef.value?.offsetLeft!
  activeBarWidth.value = (_current / totalBarRef.value?.clientWidth!) * 100
  musicTimeInfo.currentDur = musicTimeInfo.duration! * getRatio(_current)
  audioRef.value!.currentTime = musicTimeInfo.currentDur
}

const getRatio = (x: number) => {
  return Number((x / totalBarRef.value?.clientWidth!).toFixed(2))
}

</script>

<style lang="scss" scoped>
.font_18 {
  font-size: 18px;
}
.font_14 {
  font-size: 14px;
}
.player-footer {
  @include player_bg_color('player-bg-color');
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  height: 80px;
  width: 1000px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  border-top: 1px solid $lightGreyColor;
  padding: 10px 30px;
  display: flex;
  .song-info {
    height: 100%;
    width: 250px;
    .song-img {
      display: flex;
      align-items: center;
      .song-icon {
        width: 150px;
        height: 30px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .iconfont {
          cursor: pointer;
          font-size: 14px;
        }
      }
    }
  }
  .song-control {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .control-icon {
      width: 200px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-bottom: 5px;
      .iconfont {
        font-size: 18px;
        cursor: pointer;
      }
      .play-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 40px;
        width: 40px;
        background-color: $primary-color;
        border-radius: 50%;
        cursor: pointer;
        .iconfont {
          color: #ffffff !important;
          font-size: 14px;
        }
      }
    }
    .song-duration {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: #b4a3a6;
      .control-bar {
        width: 280px;
        height: 4px;
        background-color: #4d4d56;
        border-radius: 10px;
        margin: 0 10px;
        display: flex;
        align-items: center;
        position: relative;
        display: flex;
        .active-bar {
          // position: absolute;
          border-radius: 10px;
          height: 4px;
          background-color: $primary-color;
        }
        .active-ball {
          // position: absolute;
          height: 10px;
          width: 10px;
          border-radius: 50%;
          background-color: #ffffff;
          cursor: pointer;
        }
      }
    }
  }
  .song-setting {
    height: 100%;
    width: 250px;
    // background-color: red;
  }
}

.song-bg {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 60px;
  width: 60px;
  overflow: hidden;
  margin-right: 10px;
  cursor: pointer;
  img {
    position: absolute;
  }
  .music-circle {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    // overflow: hidden;
  }
  .music-src {
    height: 38px;
    width: 38px;
    border-radius: 50%;
    animation-name: miniPlayAnimation;
    // animation-play-state: running;
    animation-duration: 20s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }
}
@keyframes miniPlayAnimation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.xiayishou {
  transform: rotate(180deg);
}
</style>
