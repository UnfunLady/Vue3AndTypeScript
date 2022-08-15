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
                    <el-button style="height:30px" type="info" size="small" icon="Delete" @click="delGroup(row)">解散小组
                    </el-button>
                    <el-button style="height:30px" color="#DE4E49" size="small" icon="Delete" @click="delDept(row)">解散部门
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
</template>
<script lang='ts' setup>
import { reactive, ref, toRefs, defineComponent, onMounted, getCurrentInstance, defineEmits, provide } from 'vue'
import { deleteDepartmentOrGroupInit } from '@/types/department'
import { ElMessage, ElMessageBox } from 'element-plus';
import { reqDelDept } from '@/types/department'
import { useRouter } from 'vue-router';
const router = useRouter();
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
// 解散部门
const delDept = (row: any) => {
    ElMessageBox.confirm(`部门还有<span style="color:red">${row.children.length}</span>个小组共<span style="color:red">${row.count}人</span>,是否坚持解散!`, '风险操作', {
        dangerouslyUseHTMLString: true,
        confirmButtonClass: 'dButton',
        icon: 'Delete',
        confirmButtonText: '确认解散',
        cancelButtonText: '取消操作',
        type: 'error'
    }).then(() => {
        ElMessageBox.prompt('请输入<span style="color:red">确认解散</span>完成本次操作', '再次确认', {
            dangerouslyUseHTMLString: true,
            type: 'error',
            icon: 'Delete',
            confirmButtonClass: 'dButton',
            confirmButtonText: '确认解散',
            cancelButtonText: '取消操作',
            inputPattern: /确认解散/,
            inputErrorMessage: '请输入确认解散完成操作',
        }).then(async () => {
            const res = await reqDelDept(API, row)
            if (res.code === 200) {
                ElMessage.success('解散成功');
                router.go(0)
            } else {
                ElMessage.error(res.msg)
            }
        }).catch(() => {
            ElMessage.info('您取消了解散操作')
        })
    }).catch(() => {
        ElMessage.info('您取消了解散操作')
    })
}

</script>
<style lang='scss' >
.dButton:hover {
    background-color: rgba(255, 0, 0, 0.871) !important;
}

.dButton {
    background-color: rgba(255, 0, 0, 0.537) !important;
    color: white !important;
    border: none !important;
}
</style>