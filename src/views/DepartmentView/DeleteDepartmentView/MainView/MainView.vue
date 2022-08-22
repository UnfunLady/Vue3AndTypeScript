<template>
    <div>
        <Header title='解散部门或小组' msg='该操作将解散已有的部门或小组,请谨慎操作并确保部门及小组已经无员工,否则将清除原有的员工信息' />
        <Show v-if="!data.deleteDepartmentOrGroupInfo.isDelGroup" @change="isDelGroup" />
        <DelGroup v-else @back="backShow" :delGroupInfo="data.deleteDepartmentOrGroupInfo.delGroupInfo" />
    </div>
</template>
<script lang='ts' setup>
import { reactive } from 'vue'
import Show from './ShowDepartment/ShowDepartment.vue'
import DelGroup from './DeleteGroupView/DeleteGroupView.vue'
import { deleteDepartmentOrGroupInit } from '@/types/department'
// 初始化
const data = reactive(new deleteDepartmentOrGroupInit())
// 点击了解散小组
const isDelGroup = (row: any) => {
    data.deleteDepartmentOrGroupInfo.delGroupInfo = row;
    data.deleteDepartmentOrGroupInfo.isDelGroup = true
}
// 点击了返回
const backShow = () => {
    data.deleteDepartmentOrGroupInfo.isDelGroup = false;
    data.deleteDepartmentOrGroupInfo.delGroupInfo = [];
}
</script>
<style lang='scss' scoped>
</style>