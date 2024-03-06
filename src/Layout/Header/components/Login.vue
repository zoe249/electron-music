<template>
  <div class="logo-info">
    <div class="logo-icon">
      <i class="iconfont icon-denglu-copy"></i>
    </div>

    <div class="text" @click="handlerLogin(true, $event)">未登录</div>
  </div>

  <div class="log-box" ref="logBoxRef" v-if="isLogBox">
    <div class="close-icon" @click="handlerLogin(false, $event)">
      <i class="iconfont icon-guanbi"></i>
    </div>
    <div class="icon-box">
      <LogoIcon :width="35" :height="35" />
      <div class="title">{{ title }}</div>
    </div>
    <div class="login-form">
      <div class="phonenumber login-input">
        <input type="text" placeholder="请输入手机号" />
      </div>
      <div class="validatecode login-input">
        <input type="text" placeholder="请输入验证码" />
        <div class="getcode">获取验证码</div>
      </div>
      <div class="remember-me">
        <input type="checkbox" />
        <div class="text">自动登录</div>
      </div>
      <div class="login-btn">登录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon/index.vue'

const title = import.meta.env.VITE_APP_TITLE
const isLogBox = ref(false)
const logBoxRef = ref()
const clientInfo = reactive<{ clientX?: number; clientY?: number }>({})
const logBoxInfo = {
  offsetLeft: 0,
  offsetTop: 0,
}

const loginBoxPosition = computed(() => {
  if (!logBoxRef) return
  let styles = document.styleSheets
  // console.log(styles)
  const offsetX = clientInfo.clientX! - logBoxInfo.offsetLeft
  const offsetY = clientInfo.clientY! - logBoxInfo.offsetTop
  return `transform: translate(${offsetX}px, ${offsetY}px);`
})

const handlerLogin = (type: boolean, event: MouseEvent) => {
  isLogBox.value = type
  nextTick(() => {
    clientInfo.clientX = event.clientX
    clientInfo.clientY = event.clientY
    logBoxInfo.offsetLeft = logBoxRef.value.offsetLeft
    logBoxInfo.offsetTop = logBoxRef.value.offsetTop
  })
}
</script>

<style lang="scss" scoped>
.logo-info {
  display: flex;
  align-items: center;
  .logo-icon {
    background-color: #2c2d36;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-right: 10px;
  }
  .text {
    font-size: 12px;
    cursor: pointer;
  }
  :hover {
    color: #ffffff;
    cursor: pointer;
  }
}

.log-box {
  padding: 20px;
  height: 480px;
  width: 320px;
  background-color: #1b1b24;
  position: absolute;
  z-index: 9;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  .close-icon {
    width: 100%;
    text-align: right;
    padding-bottom: 20px;
    .iconfont {
      cursor: pointer;
    }
  }
  .icon-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    .title {
      margin-left: 10px;
    }
  }
}
.login-form {
  padding: 10px;
  .phonenumber {
    input {
      width: calc(100% - 150px);
      padding: 0 50px 0 100px;
    }
  }
  .validatecode {
    display: flex;
    align-items: center;
    justify-content: space-between;
    input {
      padding: 0 30px;
      width: 120px;
    }
    .getcode {
      height: 32px;
      width: 90px;
      text-align: center;
      line-height: 32px;
      background-color: #1b1b24;
      border: 1px solid #606066;
      border-radius: 30px;
      font-size: 12px;
      cursor: pointer;
      &:hover {
        background-color: #22222b;
      }
    }
  }
  .remember-me {
    margin-top: 15px;
    display: flex;
    align-items: center;
    input {
      height: 15px;
      width: 15px;
      margin-right: 10px;
    }
    .text {
      font-size: 12px;
    }
  }
  .login-btn {
    margin-top: 30px;
    height: 36px;
    width: 100%;
    background-image: linear-gradient(to right, #ff1168, #fc3d49);
    border-radius: 30px;
    text-align: center;
    color: #ffffff;
    font-size: 18px;
    font-weight: bold;
    line-height: 36px;
    cursor: pointer;
    &:hover {
      background-image: linear-gradient(to right, #e50f5e, #e33742);
    }
  }
}
.login-input {
  margin-top: 15px;
  input {
    height: 30px;
    background-color: #22222b;
    border: 1px solid #303038;
    border-radius: 30px;
  }
}
</style>
