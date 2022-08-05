<template>
    <div class="mainview">
        <el-steps :active="initData.addDepartmentData.active" finish-status="success"
            style="width:50%;margin: 0 auto;margin-top: 30px;">
            <el-step title="第一步" description="选择要组成新小组的员工" />
            <el-step title="第二步" description="选择所在部门及小组名" />
            <el-step title="第三步" description="提交信息" />
        </el-steps>
        <!-- 第一步 选择要添加的员工 -->
        <div style="text-align: center;margin-top: 30px;" v-show="initData.addDepartmentData.active === 0">
            <div style="text-align: center">
                <el-transfer v-model="initData.addDepartmentData.addEmployeData"
                    style="text-align: left; display: inline-block" filter-placeholder="查询员工姓名" filterable
                    :titles="['选择所有员工', '新小组员工']" :button-texts="['取消添加', '添加员工']" :format="{
                        noChecked: '${total}',
                        hasChecked: '${checked}/${total}',
                    }" :data="initData.addDepartmentData.employeData" @change="handleChange">
                    <template #default="{ option }">
                        <span>{{ option.key }} - {{ option.label }}</span>
                    </template>
                    <template #left-footer>
                        <el-button class="transfer-footer" icon="Right" size="small" color="#529a7c" style="color:white"
                            @click="next" :disabled="initData.addDepartmentData.addEmployeData.length <= 0">前往下一步
                        </el-button>
                    </template>
                    <template #right-footer>
                        <el-button class="transfer-footer" icon="Right" size="small" color="#529a7c" style="color:white"
                            @click="next" :disabled="initData.addDepartmentData.addEmployeData.length <= 0">前往下一步
                        </el-button>
                    </template>
                </el-transfer>
            </div>
        </div>
        <!-- 第二步 选择要添加的部门以及新小组的名字 -->
        <div style="text-align: center;max-width: 380px; margin: 0 auto; margin-top: 30px;"
            v-show="initData.addDepartmentData.active === 1">
            <el-form :model="initData.addDepartmentData.selectDeptForm" label-width="auto">
                <el-form-item label="请您选择部门">

                    <el-select size="large" v-model="initData.addDepartmentData.selectDeptForm.dno"
                        placeholder="请选择新团队所属部门" @change="cofirmListChange">
                        <el-option v-for="item in initData.addDepartmentData.selectDeptForm.allDept" :key="item['dno']"
                            :value="item['dno']" :label="item['dname']">

                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="输入小组名字">
                    <el-input size="large" v-model="initData.addDepartmentData.selectDeptForm.groupName"
                        placeholder="请输入新增的小组名字">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
        <!-- 第三步 确认要提交的信息 -->
        <div style="margin:0 auto;max-width:1200px;margin-top: 30px;text-align: center;"
            v-if="initData.addDepartmentData.active === 2">
            <el-descriptions title="请确认要提交的信息" border :column="2">
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <LocationInformation />
                            </el-icon>
                            小组所在部门号
                        </div>
                    </template>
                    {{ initData.addDepartmentData.selectDeptForm.confirmForm[0].dno }}

                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <OfficeBuilding />
                            </el-icon>
                            小组所在部门名
                        </div>
                    </template>

                    {{ initData.addDepartmentData.selectDeptForm.confirmForm[0].dname }}
                </el-descriptions-item>
                <el-descriptions-item>
                    <template #label>
                        <div class="cell-item">
                            <el-icon>
                                <OfficeBuilding />
                            </el-icon>
                            新增小组名
                        </div>
                    </template>
                    <el-tag size="small">{{ initData.addDepartmentData.selectDeptForm.groupName }}</el-tag>
                </el-descriptions-item>
            </el-descriptions>
            <br>
            <!-- 最后一步提交 -->
            <div>
                <el-button icon="Back" style="color:white" color="#529a7c" @click="initData.addDepartmentData.active--">
                    回上一步</el-button>
                <el-button icon="Check" style="color:white" color="#529a7c">提交保存</el-button>
            </div>

        </div>

        <div style="text-align: center;">
            <el-button v-show="initData.addDepartmentData.active === 1" @click="initData.addDepartmentData.active--"
                color="#529a7c" style="color:white" icon="Back">返回上一步
            </el-button>
            <el-button :disabled="initData.addDepartmentData.selectDeptForm.groupName == null"
                v-show="initData.addDepartmentData.active === 1" @click="initData.addDepartmentData.active++"
                color="#529a7c" style="color:white" icon="Check">提交信息
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { getAllEmploye, addDepartmentDataInit } from '@/types/department'
// 初始化数据
const initData = reactive(new addDepartmentDataInit());
// 全局API
const API = getCurrentInstance().appContext.config.globalProperties.$API;
// 挂载时获取所有员工信息
onMounted(async () => {
    // 获取全部员工
    const employRes = await getAllEmploye(API);
    // 获取全部部门
    const deptRes = await API.employe.reqAllDept();
    // 赋值
    initData.addDepartmentData.employeData = employRes.employeInfo;
    initData.addDepartmentData.selectDeptForm.allDept = deptRes.deptInfo;
})

// 下一步
const next = () => {
    initData.addDepartmentData.active > 3 ? initData.addDepartmentData.active = 0 : initData.addDepartmentData.active++
}

// 点击添加或移除时
const handleChange = (
    value: number | string,
    direction: 'left' | 'right',
    movedKeys: string[] | number[]
) => {
    console.log(value, direction, movedKeys)

}

const cofirmListChange = () => {
    // 修改选择时将选择的对象的数据传到表单用来确认展示
    initData.addDepartmentData.selectDeptForm.confirmForm = initData.addDepartmentData.selectDeptForm.allDept.filter((v) => {
        //  返回选择的部门号和全部部门相同的数据
        return v['dno'] === initData.addDepartmentData.selectDeptForm.dno
    })


}
</script>

<style lang="scss">
.mainview .transfer-footer {
    margin-left: 15px;
    padding: 6px 5px;
}

.mainview .el-transfer-panel .el-transfer-panel__header .el-checkbox .el-checkbox__label {
    font-size: 14px;
    color: #6b6969;
}

.mainview .el-transfer {
    width: 80%;

    .el-input {
        width: 70%;

    }
}

.mainview .el-transfer-panel .el-transfer-panel__header {
    background: #f4f4f4
}

.mainview .el-transfer-panel {
    width: 39%;
    height: 650px !important;
}

.mainview .el-transfer-panel__body {

    height: 550px;
}

.mainview .el-transfer-panel__list {

    height: 550px;
}

.mainview .el-step__head.is-process {
    color: #8f8e8e;
    border: #525252;
}

.mainview .el-step__title.is-process {
    color: #5f5e5e;
}

.mainview .el-step__description.is-process {
    color: #8f8d8f;
}

.mainview .el-transfer__buttons .el-button {
    background: #529a7c;
    border: none;
}

.mainview .el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
    color: rgb(255, 255, 255);
    cursor: not-allowed;
    background-image: none;
    background-color: #529a7c45;
    border: none;
}

.mainview .el-descriptions__label.el-descriptions__cell.is-bordered-label {
    background: #dfe0e24a;
    color: rgb(140, 137, 137);
    border: 1px solid #dfe0e24a;
}
</style>