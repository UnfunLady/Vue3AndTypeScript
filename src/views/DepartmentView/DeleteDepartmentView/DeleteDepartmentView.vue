<template>
    <MainView />
    <router-view></router-view>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, defineComponent, onMounted } from 'vue'
import MainView from './MainView/MainView.vue'

</script>
<style lang='scss' scoped>
</style>