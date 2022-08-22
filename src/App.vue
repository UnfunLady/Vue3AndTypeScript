<template>
  <router-view v-if="isRouterAlive"></router-view>

</template>

<script lang="ts" setup>
import { nextTick, provide, ref } from 'vue';
const isRouterAlive = ref(true);
// 点击相同路由时刷新 或者在特定情境下更新数据
const reloadRouter = () => {
  // 不显示路由
  isRouterAlive.value = false;
  // 随后显示刷新 比location.reload 和router.go(0) 效果会好一点
  nextTick(() => {
    isRouterAlive.value = true;
  })
}
// 提供刷新路由方法
provide('reloadRouter', reloadRouter)
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

#nprogress .bar {
  background: rgb(207, 207, 207) !important;
}
</style>
