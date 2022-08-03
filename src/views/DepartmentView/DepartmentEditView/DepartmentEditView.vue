<template>
    <HeaderView title="部门管理" msg="该功能是针对部门的一系列管理操作" />
    <MainView />
</template>

<script lang='ts'>
import { reactive, ref, toRefs, defineComponent, onMounted } from 'vue'
import MainView from './MainView/MainView.vue'
import HeaderView from "@/components/HeaderView/HeaderView.vue";
export default defineComponent({
    name: '',
    components: {
        MainView,
        HeaderView
    },
    setup() {
        return {
        }

    }
});
</script>
<style lang='scss' scoped>
</style>