<template>
    <Header title='组织新团队' msg="选择员工以组成新的部门团队,添加前请仔细确认一致" />
    <MainView />
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import MainView from './MainView/MainView.vue'
export default defineComponent({
    name: 'addDepartment',
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