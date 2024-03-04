<template>
  <div>精选 / 首页</div>
</template>

<script setup lang="ts">
import api from '@/api/index'

api.get('/banner').then((res) => {
  console.log(res)
})
</script>

<style lang="scss" scoped></style>
