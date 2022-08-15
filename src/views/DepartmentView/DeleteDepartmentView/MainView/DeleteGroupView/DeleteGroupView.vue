<template>
    <div>
        <br>
        <el-card>
            <el-button icon="Back" size="large" type="info" @click="back">返回</el-button>
            <br>
            <br>
            <el-table :data="delGroupInfo.children" stripe border empty-text="该部门无任何小组">
                <el-table-column label="小组号" prop="id" align="center"></el-table-column>
                <el-table-column label="小组名" prop="deptname" align="center"></el-table-column>
                <el-table-column label="小组位置" prop="location" align="center">
                    <template #default="{ row }">
                        <el-tag type="success">{{ row.location }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="小组总人数" prop="count" align="center"></el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="{ row }">
                        <el-tooltip class="box-item" effect="dark" content="该操作将会删除本小组所有员工" placement="top">
                            <el-button icon="Delete" :type="row.count == 0 ? 'success' : 'danger'"
                                @click="delGroup(row)">
                                解散小组
                            </el-button>
                        </el-tooltip>

                        <el-tooltip class="box-item" effect="dark" content="可以自行修改员工所属小组迁移员工" placement="top">
                            <el-button style="color:white" icon="Edit" :color="row.count !== 0 ? '#82B366' : '#B3B3B3'"
                                :disabled="row.count == 0 ? true : false" @click="moveGroupEmploye(row)">
                                迁移小组人员
                            </el-button>
                        </el-tooltip>

                    </template>

                </el-table-column>
            </el-table>
        </el-card>

    </div>
</template>

<script lang='ts'>
import { ElMessageBox, ElMessage } from 'element-plus';
import { reactive, ref, toRefs, defineComponent, onMounted, inject, getCurrentInstance } from 'vue'
import { useRouter } from 'vue-router';
import { reqDelGroup } from '@/types/department'
export default defineComponent({
    emits: ['back'],
    props: ['delGroupInfo'],
    name: 'delGroup',
    setup(props, ctx) {
        // 路由
        const router = useRouter()
        // API
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        // 返回
        const back = () => {
            ctx.emit('back')
        }
        // 解散小组
        const delGroup = async (row: any) => {
            if (row && row.count === 0) {
                ElMessageBox.confirm(`是否解散该小组`, '警告!', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '坚持解散',
                    cancelButtonText: '取消操作',
                    confirmButtonClass: 'dButton',
                    type: 'error',
                    icon: 'Delete'
                }).then(async () => {
                    const res = await reqDelGroup(API, row);
                    if (res.code === 200) {
                        ElMessage.success('解散小组成功!')
                        back()
                    } else {
                        ElMessage.error(res.msg)
                    }

                }).catch(() => {
                    ElMessage.warning('您取消了解散操作!')
                })

            } else {
                ElMessageBox.confirm(`<span style="color:red">${row.deptname}还有员工存在${row.count}人,</span>是否坚持解散该小组`, '警告!', {
                    dangerouslyUseHTMLString: true,
                    confirmButtonText: '坚持解散',
                    cancelButtonText: '取消操作',
                    confirmButtonClass: 'dButton',
                    type: 'error',
                    icon: 'Delete'
                }).then(async () => {
                    const res = await reqDelGroup(API, row);
                    if (res.code === 200) {
                        ElMessage.success('解散小组成功!')
                        back()
                    } else {
                        ElMessage.error(res.msg)
                    }
                }).catch(() => {
                    ElMessage.warning('您取消了解散操作!')
                })
            }
        }
        //迁移小组成员
        const moveGroupEmploye = (row: any) => {
            router.push({
                name: 'editemploye',
                query: {
                    dno: row.deptno,
                    deptId: row.id
                }
            })
        }

        return {
            back,
            delGroup,
            moveGroupEmploye,


        }

    }
});
</script>
<style lang='scss' scoped>
.el-table .el-button {
    height: 30px;
    font-size: 12px;
}

.dButton:hover {
    background-color: rgba(255, 0, 0, 0.871) !important;
}

.dButton {
    background-color: rgba(255, 0, 0, 0.537) !important;
    color: white !important;
    border: none !important;
}
</style>