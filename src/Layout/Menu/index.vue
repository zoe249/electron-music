<template>
  <div class="menu-content">
    <div class="title">
      <LogoIcon :height="40" :width="40" />
      {{ title }}
    </div>

    <div class="menu" v-for="menu in menus" :key="menu.id">
      <MenuItem v-for="item in menu.menu" :key="item.icon" :menu-item="item" />
    </div>
    <Dark />
  </div>
</template>

<script setup lang="ts">
import LogoIcon from '@/components/LogoIcon/index.vue'
import MenuItem from './components/MenuItem.vue'
import Dark from '@/components/Dark/index.vue'
const title = import.meta.env.VITE_APP_TITLE
const menus = reactive([
  {
    id: '01',
    menu: [
      {
        path: '/home',
        icon: 'icon-tesezhuanqu26',
        name: '云音乐精选',
      },
      {
        path: '/boke',
        icon: 'icon-boke',
        name: '播客',
      },
      {
        path: '/shequ',
        icon: 'icon-dingdingshequ',
        name: '社区',
      },
    ],
  },
  {
    id: '02',
    menu: [
      {
        path: '/mylove',
        icon: 'icon-woxihuan',
        name: '我喜欢的音乐',
      },
      {
        path: '/history',
        icon: 'icon-zuijinbofang',
        name: '最近播放',
      },
      {
        path: '/setting',
        icon: 'icon-cloud-download-full',
        name: '下载管理',
      },
      {
        path: '/localMusic',
        icon: 'icon-bendiyinle',
        name: '本地音乐',
      },
    ],
  },
])
</script>

<style lang="scss" scoped>
.menu-content {
  box-sizing: border-box;
  height: 100%;
  padding: 20px;
  width: 230px;
  @include aside_bg_color('aside-bg-color');
  // background-color: #1a1a21;
}
.title {
  width: 100%;
  font-size: 20px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 20px;
  -webkit-app-region: drag; // 可拖拽
}

.menu {
  padding: 10px 0;
  // border-bottom: 1px solid #27272e;
  @include border_bottom_color('light-grey-color');
}
</style>
