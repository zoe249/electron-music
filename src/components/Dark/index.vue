<template>
  <div
    class="check-btn"
    :style="style"
    @click="checkMode"
    @transitionend="animationEnd($event)"
  >
    切换
  </div>
</template>

<script setup lang="ts">
import cache from '@/utils/cache'
const isDark = ref(true)
const style = ref()
const theme = ref()

theme.value = cache.local.get('theme')

const checkMode = () => {
  isDark.value = !isDark.value
  if (!isDark.value) {
    window.document.documentElement.setAttribute('class', 'dark')
    cache.local.set('theme', 'dark')
    // return
    // style.value = `box-shadow: 0 0 10px 100vw #17171E;`
    // theme.value = 'dark'
  } else {
    window.document.documentElement.setAttribute('class', 'light')
    cache.local.set('theme', 'light')
    // return
    // style.value = `box-shadow: 0 0 0px 0px #000;`
    // theme.value = 'light'
  }
}

const animationEnd = (event: any) => {
  if (event.propertyName === 'box-shadow' && theme.value === 'dark') {
    window.document.documentElement.setAttribute('class', 'dark')
    cache.local.set('theme', 'dark')
    // style.value = true
  }
}
onMounted(() => checkMode())
</script>

<style lang="scss" scoped>
.bg {
  height: 30px;
  width: 30px;
  // background-color: black;
}
.check-btn {
  height: 30px;
  width: 30px;
  border-radius: 50%;
  transition: all 1s;
  background-color: #ffffff;
}
// .dark {
//   transform: scale(100);
// }
</style>
