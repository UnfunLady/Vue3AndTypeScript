<template>
    <div style="width: 100%">
        <Header title="防疫相员工信息" msg="疫苗接种相关的员工信息" />
        <br />
        <el-card>
            <el-button icon="Back" style="height: 35px !important" color="#337ecc" @click="back">返回</el-button>
            <el-button icon="Reading" style="height: 35px !important" color="#337ecc" v-if="!data.employeData.justCheck"
                @click="getAllEmployeEvilInfoOrBack">
                {{
                        data.employeData.isAllEmploye ? "返回具体信息" : "查看所有员工"
                }}</el-button>
            <el-table :data="
                data.employeData.isAllEmploye
                    ? data.employeData.allEmployeInfo
                    : data.employeData.employeInfo
            " stripe border scrollbar-always-on style="margin-top: 20px">
                <el-table-column label="部门号" prop="depallid" align="center"></el-table-column>
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
                            <el-button icon="Edit" color="#337ecc" style="height: 30px" @click="editEvilInfo(row)">编辑信息
                            </el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <Pagination :pageSizes="[8, 10, 12]" :page="data.employeData.page" :size="data.employeData.size"
            :currentPage="data.employeData.page"
            :total="data.employeData.isAllEmploye ? data.employeData.allCount : data.employeData.someCount"
            @pagination="getInfo" />

        <el-dialog v-model="data.employeData.dialogTableVisible" title="修改信息" :width="800" center>
            <div>
                <el-form :model="data.employeData.updateForm">
                    <el-form-item label="员工号:">
                        <el-tag type="info">{{ data.employeData.updateForm['employid'] }}</el-tag>
                    </el-form-item>
                    <el-form-item label="员工名:">
                        <el-tag type="info">{{ data.employeData.updateForm['employname'] }}</el-tag>
                    </el-form-item>

                    <el-form-item label="员工电话:">
                        <el-tag type="info">{{ data.employeData.updateForm['employphone'] }}</el-tag>
                    </el-form-item>
                    <el-form-item label="第一针是否接种">
                        <el-select v-model="data.employeData.updateForm['fisrtInoculation']" size="large"
                            placeholder="请选择">
                            <el-option value="true" label="已接种" :key="0"></el-option>
                            <el-option value="false" label="未接种" :key="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第二针是否接种">
                        <el-select v-model="data.employeData.updateForm['secondInoculation']" size="large"
                            placeholder="请选择">
                            <el-option value="true" label="已接种" :key="0"></el-option>
                            <el-option value="false" label="未接种" :key="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="第三针是否接种">
                        <el-select v-model="data.employeData.updateForm['threeInoculation']" size="large"
                            placeholder="请选择">
                            <el-option value="true" label="已接种" :key="0"></el-option>
                            <el-option value="false" label="未接种" :key="1"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>

            <div>
                <el-button color="#337ecc" icon="Close" @click="data.employeData.dialogTableVisible = false">取消修改
                </el-button>
                <el-button color="#337ecc" icon="Check">确认修改</el-button>
            </div>
        </el-dialog>
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
    nextTick,
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
    if (route.params.justCheck) {
        // 点击查看信息
        data.employeData.justCheck = true;
        data.employeData.isAllEmploye = true;
        getAllInfo()

    } else {
        if (route.params.dno && !data.employeData.isAllEmploye) {
            getEvilInfo();
        } else {
            data.employeData.justCheck = false;
            data.employeData.isAllEmploye = false;
            data.employeData.justCheck = false;
            router.back();

        }
    }

});
// 获取数据
const getEvilInfo = async () => {
    // 如果查看的是全部数据就获取全部的
    if (data.employeData.isAllEmploye || data.employeData.justCheck) {
        getAllInfo()
    } else {
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
            data.employeData.someCount = res.employeCount;
        }
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
const getAllEmployeEvilInfoOrBack = async () => {
    // 获取该部门全部员工信息
    // 改变状态
    data.employeData.isAllEmploye = !data.employeData.isAllEmploye;
    getAllInfo()
};
// 获取全部
const getAllInfo = async () => {
    // 如果是第一次获取就获取全部
    if (data.employeData.isAllEmploye) {
        const res = await API.evilControl.reqGetAllEmployeEvilInfo({
            baseInfo: route.params,
            pagination: { page: data.employeData.page, size: data.employeData.size },
        })
        if (res.code === 200) {
            data.employeData.allEmployeInfo = res.allEmployeEvilInfo;
            data.employeData.allCount = res.count;
        }
    }
}
// 修改信息
const editEvilInfo = (row: any) => {

    data.employeData.updateForm = JSON.parse(JSON.stringify(row));;


    data.employeData.dialogTableVisible = true;

}
</script>
<style lang='scss' scoped>
</style>