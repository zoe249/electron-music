<template>
  <div class="record">
    <div class="circle c1"></div>
    <div class="circle c2"></div>
    <div class="circle c3"></div>
    <div class="circle c4"></div>
    <div class="circle c5"></div>
    <div class="circle c6"></div>
  </div>
  <div class="white-shadow"></div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.record {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 30px solid #010101;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  .circle {
    position: absolute;
    height: 100px;
    width: 100px;
    border: 1px solid #303030;
    border-radius: 50%;
  }
  .c2 {
    transform: scale(1.2);
  }
  .c3 {
    transform: scale(1.3);
  }
  .c4 {
    transform: scale(1.4);
  }
  .c5 {
    transform: scale(1.5);
  }
  .c6 {
    transform: scale(1.1);
  }
}
.white-shadow {
  height: 20px;
  width: 30px;
  background-color: rgba(255, 255, 255, 0.3);
  // background-color: red;
  position: absolute;
  left: 300px;
}
</style>
