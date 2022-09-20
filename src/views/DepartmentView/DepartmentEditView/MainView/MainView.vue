<template>
    <!-- 主要展示部分 -->
    <div>
        <Show v-if="!editDeptData.isEdit" @change="changeEdit" />
        <Edit v-else :editDeptData=editDeptData @back="backShow" />
    </div>
</template>
<script lang='ts'>
import Show from './ShowDepartment/ShowDepartment.vue'
import Edit from './EditDepartment/EditDepartment.vue'
import { editDepartmentDataInit } from '@/types/department'
import { reactive, toRefs, } from 'vue'
export default {
    name: 'MainView',
    components: {
        Show,
        Edit
    },
    setup() {
        // 初始化数据
        const data = reactive(new editDepartmentDataInit())
        const changeEdit = (row: any) => {
            data.editDeptData.editDeptData = row;
            data.editDeptData.isEdit = true;
        }
        const backShow = () => {
            data.editDeptData.isEdit = false;
            data.editDeptData.editDeptData = {}
        }
        return {
            changeEdit,
            ...toRefs(data),
            backShow
        }
    }
}
</script>
<style lang='scss' scoped>

</style>