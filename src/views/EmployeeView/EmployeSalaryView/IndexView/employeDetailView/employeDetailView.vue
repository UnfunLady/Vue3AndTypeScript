<template>
    <div>
        <!-- 员工个人薪资管理 -->
        <Header msg="请详细核实每一步要操作的对象以免造成不必要的麻烦" title="温馨提示" />

        <!-- 分步 -->
        <el-card style="margin: 30px 0px 30px 0px">
            <el-steps :active="employeSalaryDetailForm.active" align-center finish-status="success">
                <el-step title="选择团队" description="选择要修改的具体某个团队" />
                <el-step title="确认修改信息" description="完成您的操作" />
                <el-step title="提交修改" description="提交修改" />
            </el-steps>
            <div class="form" v-show="employeSalaryDetailForm.active === 0">
                <el-form class="formChild" size="large" :model="employeSalaryDetailForm.DetailForm">
                    <el-form-item label="选择团队">
                        <el-select v-model="employeSalaryDetailForm.DetailForm.deptid" placeholder="请选择团队">
                            <el-option v-for="item in employeSalaryDetailForm.DetailForm.AlldeptInfo" :key="item['id']"
                                :value="item['id']" :label="item['deptname']"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
            <!-- 表格 -->
            <el-table v-show="
                employeSalaryDetailForm.active > 0 &&
                employeSalaryDetailForm.active < 2
            " style="margin-top: 30px" stripe border :data="employeSalaryDetailForm.DetailForm.employeDetail">
                <el-table-column label="部门号" prop="deptno" align="center"></el-table-column>
                <el-table-column label="部门名" prop="deptname" align="center"></el-table-column>
                <el-table-column label="员工号" prop="employno" align="center"></el-table-column>
                <el-table-column label="员工名" prop="employname" align="center"></el-table-column>
                <el-table-column label="社保" prop="usesocialSub" align="center">
                    <template #default="scope">
                        <div>
                            <el-switch :disabled="scope.row.isuse != 'true'" v-model="scope.row.usesocialSub"
                                active-icon="Check" inactive-icon="Close" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " active-value="true" inactive-value="false" @click="changeSub(scope)" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="房补" prop="usehouseSub" align="center">
                    <template #default="scope">
                        <div>
                            <el-switch :disabled="scope.row.isuse != 'true'" v-model="scope.row.usehouseSub"
                                active-icon="Check" inactive-icon="Close" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " active-value="true" inactive-value="false" @click="changeSub(scope)" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="餐补" prop="useeatSub" align="center">
                    <template #default="scope">
                        <div>
                            <el-switch :disabled="scope.row.isuse != 'true'" v-model="scope.row.useeatSub"
                                active-icon="Check" inactive-icon="Close" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " active-value="true" inactive-value="false" @click="changeSub(scope)" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="交通补" prop="usetransSub" align="center">
                    <template #default="scope">
                        <div>
                            <el-switch :disabled="scope.row.isuse != 'true'" v-model="scope.row.usetransSub"
                                active-icon="Check" inactive-icon="Close" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " active-value="true" inactive-value="false" @click="changeSub(scope)" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="高温补" prop="usehotSub" align="center">
                    <template #default="scope">
                        <div>
                            <el-switch :disabled="scope.row.isuse != 'true'" v-model="scope.row.usehotSub"
                                active-icon="Check" inactive-icon="Close" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " active-value="true" inactive-value="false" @click="changeSub(scope)" />
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="绩效比例%" prop="usePerformance" align="center">
                    <template #default="scope">
                        <el-slider :disabled="scope.row.isuse != 'true'" size="small" v-model="scope.row.usePerformance"
                            @change="changeSub(scope)">
                        </el-slider>
                    </template>
                </el-table-column>
                <el-table-column label="底薪" prop="salary" align="center">
                    <template #default="scope">
                        {{ scope.row.salary }}
                    </template>
                </el-table-column>
                <el-table-column label="是否补贴" prop="isuse" align="center">
                    <template #default="scope">
                        <div>
                            <el-switch v-model="scope.row.isuse" active-icon="Check" inactive-icon="Close" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " active-value="true" inactive-value="false" @click="changeSub(scope)" />
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="应发工资" prop="allSalary" align="center">
                    <template #default="scope">
                        <!-- 计算金额 -->
                        <!-- 如果有补贴 -->
                        <div>
                            <span class="allSalary">
                                {{
                                        // 如果有补贴就显示补贴后的否则显示默认底薪
                                        scope.row.isuse != 'true'
                                            ? scope.row.salary
                                            : (scope.row.usesocialSub == "true"
                                                ? -employeSalaryDetailForm.DetailForm.subDetail[0]
                                                    .socialSub
                                                : employeSalaryDetailForm.DetailForm.subDetail[0]
                                                    .socialSub) +
                                            (scope.row.usehouseSub == "true"
                                                ? employeSalaryDetailForm.DetailForm.subDetail[0]
                                                    .houseSub
                                                : 0) +
                                            (scope.row.useeatSub == "true"
                                                ? employeSalaryDetailForm.DetailForm.subDetail[0].eatSub
                                                : 0) +
                                            (scope.row.usetransSub == "true"
                                                ? employeSalaryDetailForm.DetailForm.subDetail[0]
                                                    .transSub
                                                : 0) +
                                            (scope.row.usehotSub == "true"
                                                ? employeSalaryDetailForm.DetailForm.subDetail[0].hotSub
                                                : 0) +
                                            scope.row.salary +
                                            scope.row.usePerformance *
                                            employeSalaryDetailForm.DetailForm.subDetail[0]
                                                .performance *
                                            0.01
                                }}
                            </span>

                        </div>
                    </template>
                </el-table-column>
            </el-table>

            <!--确认提交的信息 -->
            <div v-show="employeSalaryDetailForm.active === 2">
                <h3 style="margin: 15px">确认提交信息</h3>
                <el-descriptions style="margin-bottom: 15px !important" v-for="item in employeSalaryDetailForm.editList"
                    :key="item.employno" class="margin-top" :column="3" border>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <OfficeBuilding />
                                </el-icon>
                                团队名
                            </div>
                        </template>
                        <el-tag size="small" type="info">{{ item.deptname }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <user />
                                </el-icon>
                                员工姓名
                            </div>
                        </template>

                        <el-tag size="small" type="info"> {{ item.employname }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Postcard />
                                </el-icon>
                                社保
                            </div>
                        </template>
                        <el-tag size="small" type="info">
                            {{
                                    item.isuse == "true" && item.usesocialSub == "true"
                                        ? "有"
                                        : "无"
                            }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <house />
                                </el-icon>
                                房补
                            </div>
                        </template>
                        <el-tag size="small" type="info">
                            {{
                                    item.isuse == "true" && item.usehouseSub == "true" ? "有" : "无"
                            }}</el-tag>
                    </el-descriptions-item>

                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <ForkSpoon />
                                </el-icon>
                                餐补
                            </div>
                        </template>
                        <el-tag size="small" type="info">
                            {{
                                    item.isuse == "true" && item.useeatSub == "true" ? "有" : "无"
                            }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Van />
                                </el-icon>
                                交通补
                            </div>
                        </template>
                        <el-tag size="small" type="info">{{
                                item.isuse == "true" && item.usetransSub == "true" ? "有" : "无"
                        }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Smoking />
                                </el-icon>
                                高温补
                            </div>
                        </template>
                        <el-tag size="small" type="info">
                            {{
                                    item.isuse == "true" && item.usehotSub == "true" ? "有" : "无"
                            }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Coin />
                                </el-icon>
                                绩效(1000元)
                            </div>
                        </template>
                        <el-tag size="small" type="info">
                            {{ item.usePerformance + "%" }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <Coin />
                                </el-icon>
                                底薪
                            </div>
                        </template>
                        <el-tag size="small" type="success"> {{ item.salary }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <CircleCheck />
                                </el-icon>
                                是否补贴
                            </div>
                        </template>
                        <el-tag size="small" type="success">
                            {{ item.isuse == "true" ? "有补贴" : "不计算任何补贴" }}</el-tag>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon>
                                    <CircleCheck />
                                </el-icon>
                                应发工资
                            </div>
                        </template>
                        <el-tag size="small" type="success"> {{ item.allSalary }}</el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </div>

            <!-- 修改成功的展示 -->
            <div v-show="
                employeSalaryDetailForm.active > 2 &&
                employeSalaryDetailForm.editSuccess
            ">
                <el-result icon="success" title="修改员工信息成功" sub-title="点击回到第一步">
                    <template #extra>
                        <el-button type="primary" @click="backOne">返回第一步</el-button>
                    </template>
                </el-result>
            </div>

            <!-- 修改失败的展示 -->
            <div v-show="
                employeSalaryDetailForm.active > 2 &&
                !employeSalaryDetailForm.editSuccess
            ">
                <el-result icon="error" title="修改员工信息失败" sub-title="点击回到第一步">
                    <template #extra>
                        <el-button type="primary" @click="backOne">返回第一步</el-button>
                    </template>
                </el-result>
            </div>
            <!-- 按钮 -->
            <div style="text-align: center; margin: 20px">
                <el-button icon="Bottom" v-show="employeSalaryDetailForm.active < 1" style="margin-top: 12px"
                    @click="next" :disabled="employeSalaryDetailForm.DetailForm.deptid ? false : true">下一步
                </el-button>
                <el-button :disabled="employeSalaryDetailForm.editList.length > 0 ? false : true" type="primary"
                    :loading="employeSalaryDetailForm.loading" v-show="
                        employeSalaryDetailForm.active > 0 &&
                        employeSalaryDetailForm.active < 3
                    " style="margin-top: 12px" @click="confirm" icon="Upload">提交
                </el-button>
                <el-button icon="Top" v-show="
                    employeSalaryDetailForm.active > 0 &&
                    employeSalaryDetailForm.active < 3
                " style="margin-top: 12px" @click="before">上一步
                </el-button>
            </div>
        </el-card>
        <el-pagination v-show="
            employeSalaryDetailForm.active > 0 && employeSalaryDetailForm.active < 2
        " :total="employeSalaryDetailForm.DetailForm.count"
            v-model:current-page="employeSalaryDetailForm.DetailForm.page"
            v-model:page-size="employeSalaryDetailForm.DetailForm.size" @current-change="changePage"
            :page-sizes="[8, 10, 20]" @size-change="changeSize" layout="->,total, sizes, prev,pager, next,jumper">
        </el-pagination>
    </div>
</template>

<script lang='ts'>
import {
    reactive,
    ref,
    toRefs,
    defineComponent,
    onMounted,
    getCurrentInstance,
    watch,
    nextTick
} from "vue";
import { useRoute } from "vue-router";
import {
    EmployeSalaryDetailData,
    getEmployeSalaryDetailInfo,
    updateSalaryDetail,
} from "@/types/employe";
import { ElMessage } from "element-plus";
export default defineComponent({
    name: "employeDetailView",
    setup() {
        const route = useRoute();
        const data = reactive(new EmployeSalaryDetailData());
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        //   挂载的时候根据传过来的值获取全部团队
        onMounted(async () => {
            // 如果有路由传递过来的团队号
            //接受路由传递的信息
            interface deptInfoData {
                dno: string | number;
                [propName: string]: any;
            }
            if (route.params.deptInfo) {
                // 获取路由传递过来的信息
                const deptInfo: deptInfoData = JSON.parse(
                    route.params.deptInfo as string
                );
                data.employeSalaryDetailForm.DetailForm.dno = deptInfo.dno;
                const res = await API.employe.reqGetDeptByDno(
                    data.employeSalaryDetailForm.DetailForm
                );
                data.employeSalaryDetailForm.DetailForm.AlldeptInfo = res.groupInfo;
            } else {
                ElMessage.warning("请重新获取数据");
            }
        });
        // 获取员工信息
        const getInfo = async () => {
            if (data.employeSalaryDetailForm.DetailForm.deptid) {
                // 获取部门员工信息
                const res = await getEmployeSalaryDetailInfo(
                    API,
                    data.employeSalaryDetailForm.DetailForm
                );
                // 分页总数
                data.employeSalaryDetailForm.DetailForm.count = res.count;
                // 获得结果
                data.employeSalaryDetailForm.DetailForm.employeDetail = res.detailInfo;
                data.employeSalaryDetailForm.DetailForm.subDetail = res.subDetail;
            } else {
                ElMessage.warning("请重新选择团队");
            }
        };
        // 下一步
        const next = async () => {
            getInfo();
            if (data.employeSalaryDetailForm.active++ > 2)
                data.employeSalaryDetailForm.active = 0;
        };
        // 上一步
        const before = () => {
            // 如果返回了第一步 (===1)
            // 清空已经选择的数据
            if (data.employeSalaryDetailForm.active == 1) {
                data.employeSalaryDetailForm.editList = [];
            }
            // 激活步骤加-1
            if (data.employeSalaryDetailForm.active-- < 1)
                data.employeSalaryDetailForm.active = 0;


        };
        // 返回第一步
        const backOne = () => {
            data.employeSalaryDetailForm.active = 0;
            data.employeSalaryDetailForm.editList = [];
        };
        // 提交修改
        const confirm = async () => {
            // 跳转到确认信息
            if (data.employeSalaryDetailForm.active == 1) {
                data.employeSalaryDetailForm.active++;
            } else {
                // 执行修改逻辑
                data.employeSalaryDetailForm.loading = true;
                const res = await updateSalaryDetail(
                    API,
                    data.employeSalaryDetailForm.editList
                );
                if (res.code == 200) {
                    // 修改成功 显示修改成功的结果
                    data.employeSalaryDetailForm.editSuccess = true;
                    setTimeout(() => {
                        ElMessage.success("修改员工补贴标准成功!");
                        if (data.employeSalaryDetailForm.active++ > 2)
                            data.employeSalaryDetailForm.active = 0;
                        // 取消loading
                        data.employeSalaryDetailForm.loading = false;
                        data.employeSalaryDetailForm.DetailForm.employeDetail = [];
                    }, 900);
                } else {
                    // 修改失败 显示修改失败的结果
                    data.employeSalaryDetailForm.editSuccess = false;
                    ElMessage.warning("提交失败");
                }
            }
        };
        // 分页容量
        const changeSize = (val: number) => {
            data.employeSalaryDetailForm.DetailForm.size = val;
            getInfo();
        };
        // 分页页
        const changePage = (val: number) => {
            data.employeSalaryDetailForm.DetailForm.page = val;
            getInfo();
        };

        // 修改补贴值
        const changeSub = (scope: any) => {
            nextTick(() => {
                // 把应发工资追加在scope.row上
                // 加上nextTick 让下一次渲染的应发工资赋值  不然会把上一次的赋值
                scope.row.allSalary = parseInt(document.querySelectorAll('.allSalary')[scope.$index].innerHTML);
            })
            data.employeSalaryDetailForm.editList.push(scope.row);
            // set去重
            data.employeSalaryDetailForm.editList = Array.from(
                new Set(data.employeSalaryDetailForm.editList)
            );
        };



        return {
            ...toRefs(data),
            next,
            before,
            confirm,
            changeSize,
            changePage,
            changeSub,
            backOne,

        };
    },
});
</script>
<style lang='scss' scoped>
.form {
    position: relative;
    width: 800px;
    height: 80px;
    margin: 0 auto;

    .formChild {
        position: absolute;
        top: 50%;
        width: 400px;
        height: 40px;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>