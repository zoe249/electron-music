<template>
  <div class="logo-info" v-if="userStore.userInfo">
    <img :src="userStore.userInfo.avatarUrl" alt="" />

    <div class="text">
      {{ userStore.userInfo.nickname }}
    </div>
  </div>
  <div class="logo-info" v-else>
    <div class="logo-icon">
      <i class="iconfont icon-denglu-copy"></i>
    </div>

    <div class="text" @click="handlerLoginIcon(true, $event)">未登录</div>
  </div>

  <div class="log-box" ref="logBoxRef" v-if="isLogBox">
    <div class="close-icon" @click="handlerLoginIcon(false, $event)">
      <i class="iconfont icon-guanbi"></i>
    </div>
    <div class="icon-box">
      <LogoIcon :width="35" :height="35" />
      <div class="title">{{ title }}</div>
    </div>
    <div class="login-form">
      <div class="phonenumber login-input">
        <input
          v-model="loginForm.phoneNumber"
          type="text"
          placeholder="请输入手机号"
          @focus="handerPhoneFocus"
        />
      </div>
      <div class="validatecode login-input">
        <input
          v-model="loginForm.validateCode"
          type="text"
          placeholder="请输入验证码"
        />
        <div class="getcode" @click="sendValidateCode">
          {{ showVaildateBtn }}
        </div>
      </div>
      <div v-if="isShowTips" class="remember-me text-tips">
        请输入11位数的手机号
      </div>
      <div class="remember-me" v-else>
        <input type="checkbox" />
        <div class="text">自动登录</div>
      </div>
      <div class="login-btn" @click="login">登录</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon/index.vue'
import { getCtcode, loginByCaptcha } from '@/api/common'
import { validatePhone } from '@/utils/validate'
import cache from '@/utils/cache'
import useUserStore from '@/store/modules/user'

const userStore = useUserStore()

const title = import.meta.env.VITE_APP_TITLE
const loginForm = reactive<{
  phoneNumber?: string | number
  validateCode?: string
}>({ phoneNumber: '13546175424' })
const isShowTips = ref()
const isLogBox = ref(false)
const logBoxRef = ref()

const clientInfo = reactive<{ clientX?: number; clientY?: number }>({})
const logBoxInfo = {
  offsetLeft: 0,
  offsetTop: 0,
}

const handlerLoginIcon = (type: boolean, event: MouseEvent) => {
  isLogBox.value = type
  nextTick(() => {
    clientInfo.clientX = event.clientX
    clientInfo.clientY = event.clientY
    logBoxInfo.offsetLeft = logBoxRef.value.offsetLeft
    logBoxInfo.offsetTop = logBoxRef.value.offsetTop
  })
}

const downCountInfo = reactive<{ timer: unknown; downCount: number }>({
  timer: null,
  downCount: 0,
})

const showVaildateBtn = computed(() => {
  if (downCountInfo.downCount) {
    return `${downCountInfo.downCount}秒后重试`
  } else {
    return '获取验证码'
  }
})

/**
 * 发送验证码
 */
const sendValidateCode = () => {
  if (!loginForm.phoneNumber) {
    isShowTips.value = true
    return
  }
  if (!validatePhone(loginForm.phoneNumber as string)) {
    isShowTips.value = true
    return
  }
  if (downCountInfo.timer) return
  getCtcode<{ code: number; data: any }>(loginForm.phoneNumber as string).then(
    (res) => {
      if (res.code === 200 && res.data) {
        downCountInfo.downCount = 30
        downCountInfo.timer = setInterval(() => {
          if (downCountInfo.downCount > 0) {
            downCountInfo.downCount--
          } else {
            downCountInfo.timer = null
          }
        }, 1000)
      }
    }
  )
}

const login = () => {
  loginByCaptcha(loginForm.phoneNumber as string, loginForm.validateCode!).then(
    (res: any) => {
      userStore.setUserInfo(res.profile)
      cache.local.setJSON('token', res.cookie)
      cache.local.setJSON('cookie', res.token)
      cache.local.setJSON('userInfo', res.profile)
    }
  )
}

const handerPhoneFocus = () => (isShowTips.value = false)

onMounted(() => {
  const userInfo = cache.local.getJSON('userInfo')
  userStore.setUserInfo(userInfo)
})
</script>

<style lang="scss" scoped>
.logo-info {
  display: flex;
  align-items: center;
  img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
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
  height: 400px;
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
  .text-tips {
    font-size: 12px;
    color: red;
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
