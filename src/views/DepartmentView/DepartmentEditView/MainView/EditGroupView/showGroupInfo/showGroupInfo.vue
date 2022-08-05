<template>
    <div>
        <el-card>
            <el-button color="#296a99" icon="Back" size="large" @click="back">返回</el-button>

            <el-table :data="editGroupData.editGroupForm" stripe border style="margin-top:30px">
                <el-table-column label="部门号" prop="deptno" align="center" />
                <el-table-column label="小组号" prop="id" align="center" />
                <el-table-column label="小组名" prop="deptname" align="center" />
                <el-table-column label="所在区域" prop="location" align="center">
                    <template #default="scope">
                        <el-tag type="success">{{ scope.row.location }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="小组总人数" prop="count" align="center" />
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button icon="edit" color="#7777c7" style="color:#fff6f1" size="small"
                            @click="editGroupInfo(scope)">
                            编辑信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script lang='ts'>
import { reactive, ref, toRefs, defineComponent, onMounted, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { editGroupInit } from '@/types/department'
import Header from '@/components/HeaderView/HeaderView.vue'
export default defineComponent({
    emits: ['change'],
    setup(props, ctx) {
        // 定义路由
        const route = useRoute();
        const router = useRouter();
        // API
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        // 初始化数据
        const data = reactive(new editGroupInit());
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

        // 编辑小组信息
        const editGroupInfo = ({ row }) => {
            ctx.emit('change', row)
            console.log(row);

        }
        // 返回
        const back = () => {
            router.back()
        }
        return {
            ...toRefs(data),
            editGroupInfo,
            back
        }
    }
})

</script>
<style lang='scss' scoped>
</style>