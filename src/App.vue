<template>
  <router-view></router-view>

</template>

<script lang="ts" setup>
import { watch } from 'vue-demi';
import useStore from './store';
const { user } = useStore();


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
</style>
