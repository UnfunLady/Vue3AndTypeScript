<template>
    <Header title="公司疫苗接种信息" msg='展示的是公司人员部门疫苗接种详细情况' />
    <br>
    <el-card>
        <el-row :gutter="24">
            <el-col :span="8" v-for="item in data.companyData.allDeptInfo" :key="item['dno']"
                style="margin-bottom:20px">
                <div class="grid-content ep-bg-purple">
                    <div class="card">
                        <div class="header">
                            <div class="deptInfo">
                                <el-avatar style="width:50px;height: 50px;" :src="item['avatar']" />
                                <h6>{{ item['dname'] }}</h6>
                            </div>
                            <div class="detailInfo" v-if="item['isAllCovid'] == 'false'">
                                <p @click="showNoCovid(item)">总数/未接种:
                                    <span class="sumNot">
                                        {{ item['count'] }}/{{ item['noCovid'] }}
                                    </span>
                                </p>
                            </div>
                            <div class="detailInfo" v-else>
                                <p>查看接种信息</p>
                            </div>
                        </div>
                        <div class="warn" v-if="item['isAllCovid'] == 'false'">
                            <p style="color: #fff">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-health"></use>
                                </svg> 部门尚有未接种员工{{ item['noCovid'] }}人
                            </p>
                        </div>
                        <div class="ok" v-else>
                            <p style="color:white">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-anquan"></use>
                                </svg>
                                该部门员工已完成接种
                            </p>
                        </div>
                    </div>
                </div>

            </el-col>
        </el-row>
    </el-card>
    <router-view></router-view>
</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, defineComponent, onMounted, getCurrentInstance } from 'vue'
import { companyInfoInit } from '@/types/evilControl'
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
// 初始化数据
const data = reactive(new companyInfoInit())
// API
const API = getCurrentInstance().appContext.config.globalProperties.$API;
// router
const router = useRouter()
// 获取信息
onMounted(async () => {
    // 获取部门信息
    const deptInfo = await API.evilControl.reqGetCompanyEvilInfo()
    if (deptInfo.code === 200) {
        data.companyData.allDeptInfo = deptInfo.deptInfo;

    } else {
        ElMessage.error('获取部门信息失败！')
    }

})

// 查看未接种的员工信息
const showNoCovid = (info: any) => {
    router.push({
        name: 'showNoCovid',
        params: info
    })
}

</script>
<style lang='scss' scoped>
.icon {
    width: 1.5em;
    height: 1.5em;
    vertical-align: -0.4em;
    fill: currentColor;
    overflow: hidden;
}

div.card {
    border: 1px solid rgba(128, 128, 128, 0.27);
    width: 500px;
    box-shadow: 2px 4px 8px 2px rgba(136, 134, 134, 0.19);
    text-align: center;
}

div.header {
    background-color: #ffffff;
    color: white;
    padding: 30px;
    font-size: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 130px;

    .deptInfo {
        h6 {
            margin-top: 10px;
            color: #989898;
        }

        width: 100px;
    }

    .detailInfo {
        position: absolute;
        font-size: 16px;
        color: #a6a6a6;
        right: 15px;
        top: 40px;
        cursor: pointer;

        .sumNot {
            color: red;
        }
    }

    .detailInfo:hover {
        color: green;
    }
}

div.warn {
    padding: 10px;
    font-size: 16px;
    font-family: "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif";
    background-color: #f56c6c;
}

div.ok {
    padding: 10px;
    font-size: 16px;
    font-family: "Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB, Microsoft YaHei, Arial, sans-serif";
    background-color: #43c283c3;
}
</style>