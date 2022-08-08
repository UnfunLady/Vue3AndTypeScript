<template>
    <br>
    <el-card>
        <el-table :data="data.deleteDepartmentOrGroupInfo.allDeptInfo" border stripe>
            <el-table-column label="部门号" prop="dno" align="center"></el-table-column>
            <el-table-column label="部门名" prop="dname" align="center"></el-table-column>
            <el-table-column label="部门头像" prop="avatar" align="center">
                <template #default="scope">
                    <div>
                        <el-avatar :size="30" :src="scope.row.avatar"></el-avatar>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template #default="{ row }">
                    <el-button type="info" size="small" icon="Delete" @click="delGroup(row)">解散小组
                    </el-button>
                    <el-button color="#DE4E49" size="small" icon="Delete">解散部门</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script lang='ts' setup>
import { reactive, ref, toRefs, defineComponent, onMounted, getCurrentInstance, defineEmits, provide } from 'vue'
import { deleteDepartmentOrGroupInit } from '@/types/department'

// 声明emits
const $emit = defineEmits(['change'])

// API
const API = getCurrentInstance().appContext.config.globalProperties.$API;
// 初始化
const data = reactive(new deleteDepartmentOrGroupInit())
// 挂载时完成的操作
onMounted(async () => {
    const res = await API.employe.reqAllDept();
    // 遍历团队  把团队添加到所属部门
    res.deptInfo.forEach((item: any, index: number) => {
        // 给每个部门定义一个children数组
        item.children = []
        // 遍历所有子小组
        res.groupInfo.forEach((child: any) => {
            // 如果符合条件就添加进去
            if (item.dno === child.deptno) {
                item.children.push(child)
            }
        })
        data.deleteDepartmentOrGroupInfo.allDeptInfo = res.deptInfo;
    })

})


// 点击解散小组
const delGroup = (row: any) => {

    $emit('change', row)
}
provide('delGroupInfo', data.deleteDepartmentOrGroupInfo.delGroupInfo)

</script>
<style lang='scss' scoped>
.el-button {
    color: white;
    height: 30px;
}
</style>