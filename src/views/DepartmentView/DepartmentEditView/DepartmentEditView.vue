<template>
    <Header title="部门管理" msg="该功能是针对部门的一系列管理操作" />
    <MainView />
    <router-view></router-view>
</template>

<script lang='ts'>
import { reactive, ref, toRefs, defineComponent, onMounted } from 'vue'
import MainView from './MainView/MainView.vue'

export default defineComponent({
    name: '',
    components: {
        MainView,
    },
    setup() {
        return {
        }

    }
});
</script>
<style lang='scss' scoped>
</style>