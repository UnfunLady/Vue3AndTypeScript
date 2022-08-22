<template>
    <div v-show="$route.params.deptInfo" v-loading="isLoading" element-loading-text="正在加载数据中...">
        <!-- 整体工资明细 -->
        <Header msg="这是针对整个小团队的明细,如想修改具体某位员工的数据请在详细信息处修改" title="温馨提示" />
        <el-card style="margin-top:50px">
            <el-table stripe border :data="employeSalaryForm.groupInfo" empty-text="暂无数据">
                <el-table-column label="团队号" prop="id" align="center" />
                <el-table-column label="团队名" prop="deptname" align="center" />
                <el-table-column label="团队位置" prop="location" align="center">
                    <template #default="scope">
                        <el-tag type="success">{{ scope.row.location }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="团队人数" prop="count" align="center" />
                <el-table-column label="社保" prop="socialSub" align="center" />
                <el-table-column label="房补" prop="houseSub" align="center" />
                <el-table-column label="餐补" prop="eatSub" align="center" />
                <el-table-column label="交通补" prop="transSub" align="center" />
                <el-table-column label="高温补" prop="hotSub" align="center" />
                <el-table-column label="绩效比例%(1000元)" prop="performance" align="center">
                    <template #default="scope">
                        <el-slider size="small" v-model="scope.row.performance" @change="changePerformance(scope.row)">
                        </el-slider>
                    </template>
                </el-table-column>
                <el-table-column label="是否提供补助" align="center">
                    <template #default="scope">
                        <el-switch :loading="employeSalaryForm.isLoading" v-model="scope.row.isuse" active-value="true"
                            inactive-value="false" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ccc"
                            active-icon="Check" inactive-icon="Close" @change="changeUse(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!-- loading等待加载数据 -->
    </div>
    <!-- 如果没有部门详细信息 -->
    <el-empty v-show="!$route.params.deptInfo" description="安全起见 数据不会保存 若想操作请重新获取数据" />
</template>
<script lang='ts'>
import { reactive, ref, toRefs, defineComponent, getCurrentInstance } from 'vue'
import { useRoute, } from 'vue-router';
import { ElMessage } from 'element-plus';
import { EmployeSalaryInitData, getEmployeSalaryInfo, updateEmployeSalaryInfo, } from '@/types/employe'
export default defineComponent({
    name: 'departmentSalaryDetail',
    setup() {
        // 获取全部API
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        // 获取route
        const route = useRoute();
        // 初始化数据
        const data = reactive(new EmployeSalaryInitData())
        // 是否加载
        const isLoading = ref(true)
        //接受路由传递的信息
        interface deptInfoData {
            dno: string | number,
            [propName: string]: any,
        }
        // 如果有路由传递过来的团队号
        if (route.params.deptInfo) {
            const deptInfo: deptInfoData = JSON.parse(route.params.deptInfo as string);
            data.employeSalaryForm.dno = deptInfo.dno
            setTimeout(async () => {
                const res = await getEmployeSalaryInfo(API, data.employeSalaryForm);
                data.employeSalaryForm.groupInfo = res.groupInfo;
                isLoading.value = false;
            }, 500)
        } else {
            ElMessage.warning('请重新获取数据')
        }
        // 改变是否补贴时
        async function changeUse(row: any) {
            // 赋值给表单
            data.employeSalaryForm.editForm.isuse = row.isuse
            data.employeSalaryForm.editForm.deptid = row.id
            // 发请求
            data.employeSalaryForm.isLoading = true;
            const res = await updateEmployeSalaryInfo(API, data.employeSalaryForm)
            if (res.code == 200) {
                // 置空表单以防干扰
                data.employeSalaryForm.editForm = {
                    isuse: null,
                    deptid: null
                }
                setTimeout(() => {
                    data.employeSalaryForm.isLoading = false;
                }, 900)
            }
        }
        // 改变绩效滑块时
        async function changePerformance(row: any) {
            // 赋值给表单
            data.employeSalaryForm.performance.performance = row.performance;
            // 团队号
            data.employeSalaryForm.performance.deptid = row.id
            // 发请求
            const res = await updateEmployeSalaryInfo(API, data.employeSalaryForm)
            if (res.code == 200) {
                // 清空收集的绩效信息
                data.employeSalaryForm.performance = {
                    deptid: null,
                    performance: null
                }
            }
        }
        return {
            ...toRefs(data),
            isLoading,
            changeUse,
            changePerformance
        }
    }
});
</script>
<style lang='scss' scoped>
</style>