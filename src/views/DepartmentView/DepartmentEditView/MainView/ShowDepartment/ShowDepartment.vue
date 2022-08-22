<!-- 主要是curd -->
<template>
    <div>
        <el-card style="margin:30px 0 30px 0;">
            <el-table row-key="dno" stripe border :data="departmentData.allDeptInfo">
                <el-table-column type="expand" label="详细信息" width="150">
                    <template #default="scope">
                        <div>
                            <h3 style="margin:20px">部门细节</h3>
                            <p style="margin:20px"> 部门号: <span style="color:red">{{ scope.row.dno }}</span>
                            </p>
                            <p style="margin:20px">部门名: <span style="color:red">{{ scope.row.dname }}</span>
                            </p>
                            <p style="margin:20px"> 部门团队数: <span style="color:red">{{ scope.row.groupCount }}</span>
                            </p>
                            <p style="margin:20px">部门总人数: <span style="color:red">{{ scope.row.count }}</span>
                            </p>
                            <p style="margin:20px">部门职责: <span style="color:red">{{ scope.row.explain }}</span>
                            </p>
                            <el-table :data="scope.row.children" stripe border>
                                <el-table-column align="center" label="部门下团队号" prop="id" />
                                <el-table-column align="center" label="团队名" prop="deptname" />
                                <el-table-column align="center" label="团队所在城市" prop="deptname">
                                    <template #default="props">
                                        <div>
                                            <el-tag type="success">{{ props.row.location }}</el-tag>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" label="团队总人数" prop="count" />
                                <el-table-column align="center" label="操作">
                                    <template #default="scope">
                                        <el-button size="small" icon="Monitor" color="#97D077"
                                            @click="moveGroupDetail(scope)">
                                            查看信息</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="部门号" align="center" prop="dno" width="150"></el-table-column>
                <el-table-column label="部门名" align="center" prop="dname"></el-table-column>
                <el-table-column label="部门头像" align="center" prop="dname">
                    <template #default="scope">
                        <div>
                            <el-avatar :size="30" :src="scope.row.avatar"></el-avatar>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="scope">
                        <el-button color="#ADADAD" size="small" icon="Document" @click="showDetail(scope)">基本信息
                        </el-button>
                        <el-button color="#7777C7" size="small" icon="Edit" @click="EditDept(scope)">编辑信息</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- <Pagination v-model:size="departmentData.size" :total="20" v-model:page="departmentData.page"
            @pagination="changePagination" :page-sizes="[5, 10, 15]" /> -->
    </div>
    <el-dialog v-model="departmentData.showDetail" @close="closeDetail">
        <template #header="{ titleId }">
            <div class="detail-header">
                <h3 :id="titleId" style="margin:0 auto;" class="detail">基本信息</h3>
            </div>
        </template>
        <el-form :model="departmentData.detailForm">
            <el-form-item label="">
                <el-avatar :size="70" class="form-item" :src="departmentData.detailForm.avatar">
                </el-avatar>
            </el-form-item>
            <el-form-item>
                <h3 class="form-item">{{ departmentData.detailForm.dname }}</h3>
            </el-form-item>
            <el-form-item>
                <h3 class="form-item">部门编号:<span style="color:green">{{ departmentData.detailForm.dno }}</span>
                </h3>
            </el-form-item>
            <el-form-item>
                <h3 class="form-item">部门团队数:<span style="color:green">{{ departmentData.detailForm.groupCount }}</span>
                </h3>
            </el-form-item>
            <el-form-item>
                <h3 class="form-item">部门总人数:<span style="color:green">{{ departmentData.detailForm.count }}</span>
                </h3>
            </el-form-item>
            <el-form-item>
                <h4 class="form-item">部门职责:<el-tag type="danger"><span>{{
                        departmentData.detailForm.explain
                }}</span></el-tag>
                </h4>
            </el-form-item>
        </el-form>

    </el-dialog>
</template>

<script lang='ts'>
import { reactive, toRefs, defineComponent, onMounted, getCurrentInstance } from "vue";
import { departmentDataInit } from "@/types/department";
import router from "@/router";
// import Pagination from '@/components/Pagination/PaginationView.vue'
export default defineComponent({
    name: "Show",
    emits: ['change'],
    setup(props, ctx) {
        const API = getCurrentInstance().appContext.config.globalProperties.$API
        const data = reactive(new departmentDataInit());
        onMounted(async () => {
            // 获取部门信息
            const res = await API.employe.reqAllDept();
            // 遍历团队  把团队添加到所属部门
            res.deptInfo.forEach((item: any, index: number) => {
                // 给每个部门定义一个children数组
                item.children = []
                res.groupInfo.forEach((child: any) => {
                    // 如果符合条件就添加进去
                    if (item.dno === child.deptno) {
                        item.children.push(child)
                    }
                })
            })
            data.departmentData.allDeptInfo = res.deptInfo;
        })
        // // 分页用
        // interface pageSize {
        //     page: number;
        //     size: number;
        // }
        // // 分页数据修改时
        // const changePagination = (obj: pageSize) => {
        //     data.departmentData.page = obj.page;
        //     data.departmentData.size = obj.size;
        // };
        // 展开详细信息
        const showDetail = ({ row }) => {
            data.departmentData.showDetail = true;
            data.departmentData.detailForm = row;

        }
        // 关闭详细信息
        const closeDetail = () => {
            data.departmentData.showDetail = false;
        }

        // 查看团队信息
        const moveGroupDetail = ({ row }) => {
            router.push({
                name: 'editemploye',
                query: {
                    dno: row.deptno,
                    deptId: row.id
                }
            })
        }

        // 点击了修改部门
        const EditDept = ({ row }) => {
            ctx.emit('change', row)
        }

        return {
            // changePagination,
            ...toRefs(data),
            showDetail,
            closeDetail,
            moveGroupDetail,
            EditDept

        };
    },


    components: {
        // Pagination,

    },
});
</script>
<style lang='scss' scoped>
.el-button {
    color: white;
    height: 30px;
}

.detail-header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;

    .detail {
        color: rgb(81, 81, 81);
        font-size: 18px;

    }
}

.form-item {
    margin: 0 auto !important;

}
</style>