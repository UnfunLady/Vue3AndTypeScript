<template>
    <div>
        <!-- 展示薪资管理的页面 -->
        <Header msg="薪资一般为无责任底薪+完成绩效的百分比以及各种补贴的总和" title="薪资说明" />
        <MainView :deptList=deptList v-loading="isLoading" element-loading-text="正在加载中" />
    </div>
</template>
<script lang='ts'>
import { reactive, ref, toRefs, onMounted, defineComponent, getCurrentInstance } from 'vue';
import MainView from './MainView/MainView.vue';
export default defineComponent({
    name: 'SalaryView',
    setup() {
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        const data = reactive({
            //部门列表
            deptList: [],
            // 是否加载中
            isLoading: false
        })
        // 获取部门信息
        onMounted(async () => {
            data.isLoading = true;
            const res = await API.employe.reqAllDept();
            data.deptList = res.deptInfo;
            setTimeout(() => {
                data.isLoading = false
            }, 500)
        })
        return {
            ...toRefs(data)
        }
    },
    components: {
        MainView
    }
});
</script>
<style lang='scss' scoped>
</style>