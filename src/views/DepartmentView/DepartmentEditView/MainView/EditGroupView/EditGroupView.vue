<template>
    <div>
        <Header title="编辑部门小组" msg="对部门所属的小组信息编辑" />
        <br>
        <el-card>

        </el-card>
    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, defineComponent, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { editGroupInit } from '@/types/department'
import Header from '@/components/HeaderView/HeaderView.vue'
// 定义路由
const route = useRoute();
// API
const API = getCurrentInstance().appContext.config.globalProperties.$API;
// 初始化数据
const data = reactive(new editGroupInit())
// 将传递过来的部门号用来获取小组
onMounted(async () => {
    if (route.params && Object.keys(route.params).length > 0) {
        const res = await API.employe.reqGetDeptByDno({
            dno: route.params.dno
        });
        if (res.code === 200) {
            data.editGroupData.editGroupForm = res.groupInfo
        }

    }
})
</script>
<style lang='scss' scoped>
</style>