<template>
  <div class="header-content">
    <div class="header-left">
      <div class="back-icon">
        <i class="iconfont icon-fenxiang"></i>
      </div>
      <div class="search-content">
        <div class="search-input">
          <i class="iconfont icon-search"></i>
          <input type="text" v-model="searchValue" />
          <i v-show="searchValue" class="iconfont icon-qingkong-"></i>
        </div>
        <div class="listen-music">
          <i class="iconfont icon-tinggeshiqu"></i>
        </div>
      </div>
    </div>
    <div class="header-right"></div>
  </div>
</template>

<script setup lang="ts">
const searchValue = ref('')
</script>

<style lang="scss" scoped>
.header-content {
  height: 80px;
}
.header-left {
  display: flex;
}
.back-icon {
  height: 35px;
  width: 25px;
  border: 1px solid #37373d;
  margin-right: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  :hover {
    color: #ffffff;
    background-color: #212127;
    height: 35px;
    width: 25px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.search-content {
  display: flex;
}
.search-input {
  height: 35px;
  width: 250px;
  background-image: linear-gradient(to right, #181d2a, #251b26);
  border: 1.5px solid #322842;
  border-radius: 6px;
  position: relative;

  .icon-search {
    position: absolute;
    left: 20px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
    cursor: pointer;
    :hover {
      color: #ffffff;
    }
  }
  input {
    padding-left: 50px;
    background-color: transparent;
    border: 0;
    height: 100%;
    width: calc(100% - 80px);
    border-style: none;
    letter-spacing: 1px;
    &:focus {
      border: none;
      outline: none; /* 或者 outline: 0px */
    }
  }
  .icon-qingkong- {
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;
  }
}

.listen-music {
  height: 35px;
  width: 25px;
  border: 1px solid #37373d;
  margin-left: 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #251b27;
  :hover {
    color: #ffffff;
    background-color: #312336;
    height: 35px;
    width: 25px;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
