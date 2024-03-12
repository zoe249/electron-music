<template>
  <div class="player-footer">Player</div>
</template>

<script setup lang="ts">
import useMusicStore from '@/store/modules/music'

const musicStore = useMusicStore()

musicStore.$subscribe((item, state) => {
  console.log(state.musicInfo)
})

// 手动删除监听器
// unsubscribe()
</script>

<style lang="scss" scoped>
.player-footer {
  position: absolute;
  box-sizing: border-box;
  bottom: 0;
  height: 80px;
  width: 100vw;
  // background-color: #2d2d38;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  padding: 10px 30px;
}
</style>
