<template>
  <div class="player-footer">
    <div class="song-info">
      <div class="song-img">
        <div class="song-bg">
          <img class="music-circle" src="../../assets/images/disc.png" alt="" />
          <img class="music-src" src="../../assets/images/default.png" alt="" />
        </div>

        <div class="info-right">
          <div class="song-text">
            <span class="font_18">起风了</span>
            <span>-</span>
            <span class="font_14">买辣椒也用券</span>
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
            class="iconfont icon-bofang"
            v-if="musicStore.$state.isPlaying"
          ></i>
          <i class="iconfont icon-zanting" v-else></i>
        </div>
        <i class="iconfont icon-shangyishou xiayishou"></i>
        <i class="iconfont icon-geci"></i>
      </div>
      <div class="song-duration">
        <div class="active-duration">00:00</div>
        <div
          ref="totalBarRef"
          class="control-bar"
          @mouseenter="barMoveEnter"
          @mouseleave="barMoveLeave"
        >
          <div ref="activeBarRef" class="active-bar"></div>
          <div
            v-show="isMoveBall"
            ref="activeBallRef"
            class="active-ball"
            :style="{ transform: `translateX(${activeBarWidth}px)` }"
            @mousedown="ballMouseDown($event)"
            @mousemove="ballMouseMove"
            @mouseup="ballMouseUp"
          ></div>
        </div>
        <div class="total-duration">05:32</div>
      </div>
    </div>
    <div class="song-setting"></div>
  </div>
</template>

<script setup lang="ts">
import useMusicStore from '@/store/modules/music'

const musicStore = useMusicStore()
const isMoveBall = ref(false)

const totalBarRef = ref<HTMLDivElement>()
const activeBarRef = ref<HTMLDivElement>()
const activeBallRef = ref<HTMLDivElement>()

const ballInfo = reactive({
  x: 0,
  y: 0,
})

const activeBarWidth = ref<Number>()

// const activeBarWidth = computed(() => {
//   return activeBarRef.value?.clientWidth! - 5
// })

musicStore.$subscribe((item, state) => {
  console.log(state)
})

const barMoveEnter = () => {
  // console.log([totalBarRef.value])
  // console.log([activeBarRef.value])
  // console.log([activeBallRef.value])

  isMoveBall.value = true
}
const barMoveLeave = () => (isMoveBall.value = false)

const handlerPlay = () => {
  if (musicStore.$state.isPlaying) {
    musicStore.paused()
  } else {
    musicStore.play()
  }
}

let isMove = false
const ballMouseDown = (event) => {
  console.log('开始')
  isMove = true
  ballInfo.x = event.x
  ballInfo.y = event.y
  document.addEventListener('mousemove', ballMouseMove)
  document.addEventListener('mouseup', function () {
    console.log('结束')
    document.removeEventListener('mousemove', function () {
      console.log('清除成功')
    })
    isMove = false
  })
}
const ballMouseMove = () => {
  // console.log()
  if (isMove) {
    console.log(event.x, ballInfo.x, event.x - ballInfo.x)
    activeBarWidth.value = event.x - ballInfo.x
  }
}
const ballMouseUp = () => {}
</script>

<style lang="scss" scoped>
.font_18 {
  font-size: 18px;
}
.font_14 {
  font-size: 14px;
}
.player-footer {
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  height: 80px;
  width: 1000px;
  @include player_bg_color('player-bg-color');
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
        height: 3px;
        background-color: #4d4d56;
        border-radius: 10px;
        margin: 0 10px;
        display: flex;
        align-items: center;
        position: relative;
        .active-bar {
          position: absolute;
          border-radius: 10px;
          height: 3px;
          background-color: $primary-color;
        }
        .active-ball {
          position: absolute;
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
    animation-play-state: running;
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
