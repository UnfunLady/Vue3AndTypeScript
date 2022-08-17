<template>
    <div style="width: 100%">
        <Header title="防疫相员工信息" msg="疫苗接种相关的员工信息" />
        <br />
        <el-card>
            <el-button icon="Back" style="height: 35px !important" color="#337ecc" @click="back">返回</el-button>
            <el-button icon="Reading" style="height: 35px !important" color="#337ecc"
                @click="getAllEmployeEvilInfoOrBack">
                {{
                        data.employeData.isAllEmploye ? "返回具体信息" : "查看所有员工"
                }}</el-button>
            <el-table :data="
                data.employeData.isAllEmploye
                    ? data.employeData.allEmployeInfo
                    : data.employeData.employeInfo
            " stripe border scrollbar-always-on style="margin-top: 20px">
                <el-table-column label="部门号" prop="deptno" align="center"></el-table-column>
                <el-table-column label="小组号" prop="deptid" align="center"></el-table-column>
                <el-table-column label="员工号" prop="employno" align="center"></el-table-column>
                <el-table-column label="员工名" prop="employname" align="center"></el-table-column>
                <el-table-column label="性别" prop="employsex" align="center"></el-table-column>
                <el-table-column label="员工电话" prop="employphone" align="center"></el-table-column>
                <el-table-column label="第一针" prop="fisrtInoculation" align="center">
                    <template #default="{ row }">
                        <span :style="{ color: row.fisrtInoculation == 'false' ? 'red' : 'green', }">
                            {{ row.fisrtInoculation == "false" ? "未接种" : "已接种" }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="第二针" prop="secondInoculation" align="center">
                    <template #default="{ row }">
                        <span :style="{ color: row.secondInoculation === 'false' ? 'red' : 'green', }">
                            {{ row.secondInoculation == "false" ? "未接种" : "已接种" }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="第三针" prop="threeInoculation" align="center">
                    <template #default="{ row }">
                        <span :style="{ color: row.threeInoculation == 'false' ? 'red' : 'green', }">
                            {{ row.threeInoculation == "false" ? "未接种" : "已接种" }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template #default="{ row }">
                        <div>
                            <el-button icon="Edit" color="#337ecc" style="height: 28px">编辑信息</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <Pagination :pageSizes="[8, 10, 15]" :page="data.employeData.page" :size="data.employeData.size"
            :currentPage="data.employeData.page" :total="data.employeData.count" @pagination="getInfo" />
    </div>
</template>

<script lang='ts' setup>
import {
    reactive,
    ref,
    toRefs,
    defineComponent,
    onMounted,
    getCurrentInstance,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { evilEmployeInfoInit, getEvilEmployeInfo } from "@/types/evilControl";
// router
const router = useRouter();
const route = useRoute();
//data、API
const API = getCurrentInstance().appContext.config.globalProperties.$API;
const data = reactive(new evilEmployeInfoInit());

onMounted(async () => {
    if (route.params.dno) {
        getEvilInfo();
    } else {
        router.back();
    }
});
// 获取数据
const getEvilInfo = async () => {
    const res = await getEvilEmployeInfo(API, {
        baseInfo: route.params,
        pagination: { page: data.employeData.page, size: data.employeData.size },
    });
    if (res.code === 200) {
        // 合并数据
        data.employeData.employeInfo = res.employeInfo.map(
            (item: object, index: number) => {
                return { ...item, ...res.evilInfo[index] };
            }
        );
        data.employeData.count = res.employeCount;
    }
};
// 返回
const back = () => {
    router.back();
};

//修改页码容量时
const getInfo = (query: any) => {
    data.employeData.page = query.page;
    data.employeData.size = query.size;
    getEvilInfo();
};

// 点击获取全部员工信息
const getAllEmployeEvilInfoOrBack = () => {
    // 改变状态
    data.employeData.isAllEmploye = !data.employeData.isAllEmploye;
    // 如果是获取全部
    if (data.employeData.isAllEmploye) {
        console.log(1);
    } else {
        console.log(2);
    }
};
</script>
<style lang='scss' scoped>
</style>