<template>
  <div
    :class="activeRoute ? 'activeRoute' : 'menu-item'"
    @click="menuItemClick"
  >
    <i :class="`iconfont ${menuItem.icon}`"></i>
    <span>{{ menuItem.name }}</span>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  menuItem: {
    type: Object as PropType<{ path: string; icon: string; name: string }>,
    required: true,
  },
})

const activeRoute = computed(() => {
  return route.path === props.menuItem.path
})

const menuItemClick = () => {
  router.push(props.menuItem.path)
}
</script>

<style lang="scss" scoped>
.menu-item {
  display: flex;
  align-content: center;
  padding: 8px 10px;
  margin: 10px 0;
  font-size: 12px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  color: #a3a3a6;
  &:hover {
    background-color: #27272e;
  }
}
.activeRoute {
  display: flex;
  align-content: center;
  padding: 8px 10px;
  margin: 10px 0;
  font-size: 12px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  color: #ffffff;
  background-image: linear-gradient(120deg, #ff1368, #fc3d49);
  .iconfont {
    color: #ffffff;
  }
}

.iconfont {
  font-size: 16px;
  margin-right: 10px;
}
</style>
