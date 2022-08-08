<template>

    <div style="margin-top:10px">
        <el-row :gutter="20">
            <el-col :span="6" v-for="item in deptList" :key="item.dno">
                <div class="grid-content ep-bg-purple">
                    <el-card style="min-height: 214px;">
                        <div class="content">
                            <div class="item">
                                <el-avatar>
                                    <img :src="item.avatar">
                                </el-avatar>
                            </div>
                            <div class="item" style="margin-left:20px">
                                <el-tooltip effect="light" placement="top">
                                    <template #content>
                                        <h5>{{ item.dname }}</h5>
                                        <p style="margin-left:10px">{{ item.explain }}</p>
                                    </template>
                                    <p style="margin-bottom:15px;cursor:help !important;">{{ item.dname }}</p>
                                </el-tooltip>
                                <p class="explain">{{ item.explain }}</p>
                            </div>
                            <div class="item" style="min-width:50px">
                                <span style="color:red"> {{ item.count }}人</span>
                            </div>

                        </div>
                        <div class="action">
                            <el-button link @click="goToDetail(item, 'departmentSalaryDetail')">部门整体工资明细
                            </el-button>
                            <el-button link @click="goToDetail(item, 'employeDetailView')">员工详细工资明细</el-button>
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang='ts'>
import { reactive, ref, toRefs, defineComponent, onMounted } from 'vue'
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'EmployeMainView',
    props: {
        deptList: Object
    },
    setup(prop) {
        const { deptList } = toRefs(prop);
        const router = useRouter();
        function goToDetail(item: any, name: string) {
            router.push({
                name: name,
                params: {
                    deptInfo: JSON.stringify(item)
                }
            })
        }

        return {
            deptList,
            goToDetail,

        }

    }
});
</script>
<style lang='scss' scoped>
.el-row {
    margin-bottom: 20px;

    .content {
        display: flex;
        padding-top: 30px;
        padding-bottom: 30px;

    }

    .action {
        display: flex;

        background-color: #90939936;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: 0px;

        .el-button {
            width: 100%;
            height: 100%;
            padding: 10px;
            margin-left: 0;
        }

        .el-button:hover {
            background-color: #cccccc34;
        }

        .el-button:last-child {
            position: relative;
        }

        .el-button:last-child::before {
            content: "";
            position: absolute;
            top: 50%;
            left: 0;
            width: 1px;
            height: 15px;
            margin-top: -7px;
            background-color: #7d7d7d;
        }


    }
}

.el-row:last-child {
    margin-bottom: 0;
}

.el-col {
    border-radius: 4px;
}

.grid-content {
    border-radius: 4px;
    min-height: 36px;
    position: relative;
}

$bg-purple: #d3dce6;

.ep-bg-purple {

    background-color: $bg-purple;
}

.el-card:hover {
    // transform: scale(1.005);
    transition: all .5s;
    box-shadow: 0px 0px 10px 5px #00000038;
}

.explain {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    color: #909399;
}

.el-col {
    margin-top: 35px;
}
</style>