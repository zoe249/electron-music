<template>
  <router-view v-slot="{ Component, route }">
    <component :is="Component" :key="route.path"></component>
  </router-view>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped></style>
