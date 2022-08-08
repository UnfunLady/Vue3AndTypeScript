<template>
    <div>
        <Header title="编辑部门小组" msg="对部门所属的小组信息编辑" />
        <br />
        <Show v-if="!data.editGroupData.isEdit" @change="changeEdit" />
        <Edit v-else :editGroupForm="data.editGroupData.editGroupForm" @back="backShow" />

    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, defineComponent, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { editGroupInit } from '@/types/department'
import Show from './showGroupInfo/showGroupInfo.vue'
import Edit from './editGroupInfo/editGroupInfo.vue'
const data = reactive(new editGroupInit())
const changeEdit = (row: any) => {
    data.editGroupData.isEdit = true;
    data.editGroupData.editGroupForm = row;
}

const backShow = () => {
    data.editGroupData.isEdit = false;
    data.editGroupData.editGroupForm = []
}
</script>
<style lang='scss' scoped>
</style>