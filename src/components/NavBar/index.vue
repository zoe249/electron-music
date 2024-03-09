<template>
  <div class="navbar">
    <div
      :class="['nav-item', item.type === currentType ? 'activeNav' : '']"
      v-for="(item, index) in navBarList"
      :key="item.type"
      @click="nvaItemClick(item.type)"
    >
      {{ item.label }}
    </div>
    <div class="nva-border" :style="activeBorderStyle"></div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

const emits = defineEmits(['navBarChange'])
const props = defineProps({
  navBarList: {
    type: Array as PropType<Array<{ type: string; label: string }>>,
    required: true,
  },
  currentType: {
    type: String,
    required: true,
  },
})

// const currentType = ref(props.initCurrentType)

const nvaItemClick = (type: string) => {
  // currentType.value = type
  emits('navBarChange', type)
}

const activeBorderStyle = computed(() => {
  const curIndex = props.navBarList.findIndex(
    (item) => item.type === props.currentType
  )
  return `transform: translateX(${curIndex * 50}px);`
})
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  position: relative;
  left: -10px;
  .nav-item {
    width: 50px;
    color: #99999c;
    font-size: 16px;
    text-align: center;
    cursor: pointer;
  }
  .activeNav {
    color: #ffffff;
    font-weight: bold;
  }
  .nva-border {
    position: absolute;
    width: 20px;
    height: 4px;
    bottom: -10px;
    border-radius: 4px;
    left: 0;
    background-color: #fc3c4d;
    margin: 0 15px;
    transition: all 0.5s;
  }
}
</style>
