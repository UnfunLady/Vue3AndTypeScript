<template>
    <div>
        <el-card style="margin:20px">
            <el-form :model="employeForm" inline>
                <el-form-item label="部门名">
                    <!-- 遍历部门名 -->
                    <el-select size="large" v-model="employeForm.dno" placeholder="请选择部门" @change="getGroup">
                        <el-option v-for="item in employeForm.deptInfo" :key="item['dno']" :label="item['dname']"
                            :value="item['dno']"></el-option>
                    </el-select>
                </el-form-item>
                <!-- 遍历团队名 -->
                <el-form-item label="所属团队">
                    <el-select size="large" v-model="employeForm.deptId" placeholder="请选择所属团队"
                        :disabled="employeForm.dno === null ? true : false" @change="getEmploye">
                        <el-option v-for="item in employeForm.groupInfo" :key="item['id']" :label="item['deptname']"
                            :value="item['id']"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询">
                    <div style="display:flex;align-items: center;">
                        <el-input size="large" prefix-icon="Search" clearable v-model="employeForm.keyword"
                            placeholder="请输入要查找的员工" />
                        <el-button :disabled="employeForm.keyword != '' ? false : true" style="margin-left: 20px;"
                            type="primary" icon="Search" @click="search">查询
                        </el-button>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin:20px;" v-if="employeForm.employeInfo.length > 0">
            <el-button type="primary" icon="Plus" size="large" style="margin-bottom:30px" @click="addEmploye"
                :disabled="employeForm.employeInfo.length > 0 ? false : true">增加员工
            </el-button>
            <el-table empty-text="暂无数据" :data="employeForm.employeInfo" style="width: 100%" stripe border>
                <el-table-column prop="deptname" label="团队" align="center" width="150" />
                <el-table-column prop="employno" label="员工号" align="center" />
                <el-table-column prop="employname" label="员工名" align="center" />
                <el-table-column prop="employage" label="年龄" align="center" />
                <el-table-column prop="employsex" label="性别" align="center" />
                <el-table-column prop="employidcard" label="身份证" width="200" align="center" />
                <el-table-column prop="employphone" label="电话" width="180" align="center" />
                <el-table-column prop="entryDate" label="入职日" align="center" width="120" />
                <el-table-column prop="employemail" label="邮箱" width="200" align="center" />
                <el-table-column prop="employaddress" label="地址" width="220" align="center" />
                <el-table-column prop="employsalary" label="薪资" align="center" />
                <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                        <el-button type="warning" size="small" @click="editEmploye(scope)" icon="Edit">修 改</el-button>
                        <el-popconfirm confirm-button-text="确认删除" cancel-button-text="取消" icon="Delete"
                            confirm-button-type="danger" icon-color="red" cancel-button-type="info"
                            :title="`您确定要删除员工:  ${scope.row.employname}  吗？`" @confirm="deleteEmployeCheck(scope.row)"
                            @cancel="cancelDelete">
                            <template #reference>
                                <el-button type="danger" size="small" icon="Delete">删
                                    除
                                </el-button>
                            </template>
                        </el-popconfirm>

                    </template>
                </el-table-column>

            </el-table>
        </el-card>
        <!-- :disabled="disabled"
             :background="background" 
        -->
        <div class="pagenation" v-if="employeForm.employeInfo.length > 0">
            <!-- pagination组件 -->
            <Pagination :disabled="employeForm.deptId != null || employeForm.employeInfo.length > 0 ? false : true"
                v-show="employeForm.groupInfo != null" :pageSizes="[8, 10, 15]" :page="employeForm.page"
                :size="employeForm.size" :currentPage="employeForm.page" :total="employeForm.count"
                @pagination="testPagination" />
        </div>
        <el-dialog class="addOrUpdateDialog" draggable :title="addOrUpdateEmployeForm.isUpdate ? '更新员工信息' : '增加新员工'"
            v-model="dialogVisiable" @close="cancelAddOrUpdate">
            <el-form :rules="rules" class="addOrUpdateElForm" label-width="120px" :model="addOrUpdateEmployeForm"
                ref="addOrUpdateFormRef">
                <el-form-item label="姓名" prop="employname">
                    <el-input prefix-icon="User" size="large" v-model="addOrUpdateEmployeForm.employname"
                        placeholder="请输入员工姓名" />
                </el-form-item>
                <el-form-item label="性别" prop="employsex">
                    <el-radio-group v-model="addOrUpdateEmployeForm.employsex">
                        <el-radio label="男" value="男"></el-radio>
                        <el-radio label="女" value="女"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="年龄" prop="employage">
                    <el-input prefix-icon="HotWater" size="large" v-model="addOrUpdateEmployeForm.employage"
                        placeholder="请输入员工年龄" />
                </el-form-item>
                <el-form-item label="入职日期" prop="entryDate">
                    <el-date-picker size="large" v-model="addOrUpdateEmployeForm.entryDate" type="date"
                        placeholder="请选择入职日期" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                </el-form-item>
                <el-form-item label="身份证" prop="employidcard">
                    <el-input size="large" prefix-icon="Postcard" v-model="addOrUpdateEmployeForm.employidcard"
                        placeholder="请输入员工身份证" />
                </el-form-item>
                <el-form-item label="电话" prop="employphone">
                    <el-input size="large" prefix-icon="Iphone" v-model="addOrUpdateEmployeForm.employphone"
                        placeholder="请输入员工电话" />
                </el-form-item>
                <el-form-item label="邮箱" prop="employemail">
                    <el-input size="large" prefix-icon="Monitor" v-model="addOrUpdateEmployeForm.employemail"
                        placeholder="请输入员工邮箱">
                        <template #append>.com</template>
                    </el-input>
                </el-form-item>
                <div class="address">
                    <el-form-item label="省份" prop="province">
                        <el-select v-model="addOrUpdateEmployeForm.province" size="large" placeholder="请选择省份"
                            @change="selectCity">
                            <el-option v-for="item in provinceListAll" :key="item['adcode']" :label="item['name']"
                                :value="item['name']"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="市区" prop="city">
                        <el-select :disabled="addOrUpdateEmployeForm.province == '' ? true : false"
                            style="margin-left:0px" v-model="addOrUpdateEmployeForm.city" size="large"
                            placeholder="请选择城市">
                            <el-option v-for="item in cityListAll" :key="item['adcode']" :label="item['name']"
                                :value="item['name']"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="department">
                    <el-form-item label="部门名">
                        <!-- 遍历部门名 -->
                        <el-select size="large" v-model="addOrUpdateEmployeForm.dno" placeholder="请选择部门"
                            @change="getGroupByUpdate">
                            <el-option v-for="item in addOrUpdateEmployeForm.deptInfo" :key="item['dno']"
                                :label="item['dname']" :value="item['dno']"></el-option>
                        </el-select>
                    </el-form-item>
                    <!-- 遍历团队名 -->
                    <el-form-item label="所属团队">
                        <el-select size="large" v-model="addOrUpdateEmployeForm.deptno" placeholder="请选择所属团队"
                            :disabled="addOrUpdateEmployeForm.dno == null ? true : false">
                            <el-option v-for="item in addOrUpdateEmployeForm.groupInfo" :key="item['id']"
                                :label="item['deptname']" :value="item['id']"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <el-form-item label="薪资" prop="employsalary">
                    <el-input v-model="addOrUpdateEmployeForm.employsalary" size="large" placeholder="请输入员工薪资"
                        prefix-icon="Coin">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="info" size="large" icon="Close" @click="cancelAddOrUpdate">取 消</el-button>
                    <el-button type="success" size="large" icon="Check" @click="addOrUpdateEmploye">
                        {{ addOrUpdateEmployeForm.isUpdate ? '确认修改' : '确认添加' }}</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>


    </div>
    <!-- 如果没有部门详细信息 -->
    <el-empty v-if="employeForm.employeInfo.length == 0" description="暂无数据 请自行选择查看的数据" />
</template>

<script lang="ts">
import { defineComponent, toRefs, nextTick, ref, getCurrentInstance, reactive, onMounted, watch } from 'vue'
// 引入employe.ts方法
import { EmployeeInitData, getGroupByDno, getGroupEmploye, getAllProvinceAndCityList, searchEmploye, addOrUpdateDateEmploy, deleteEmploye } from '@/types/employe'
import { ElMessage, ElMessageBox } from 'element-plus';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'editEmploye',
    setup(props, ctx) {
        // 定义收集数据的表单
        const data = reactive(new EmployeeInitData());
        // 获取挂在原型上的全部api方法
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        // 定义router对象
        const router = useRouter();
        // 定义route对象获取传递过来的值
        const route = useRoute();
        // 如果有传递过来的数据 就直接查找
        if (route.query && Object.keys(route.query).length > 0) {
            nextTick(() => {
                data.employeForm.dno = Number(route.query.dno);
                // 获取团队
                getGroup();
                setTimeout(() => {
                    // 赋值团队号 消除干扰
                    data.employeForm.deptId = Number(route.query.deptId);
                    // 获取团队员工
                    getEmploye();
                }, 100)

            })
        }
        // data.employeForm.dno = route.query.dno;
        // 组建挂载时获取数据
        onMounted(async () => {
            // 获取全部团队
            const res = await API.employe.reqAllDept();
            data.employeForm.deptInfo = res.deptInfo;
            // 获取二级联动省市
            await getAllProvinceAndCityList(API, data);
        })
        // 添加或修改的展示
        let dialogVisiable = ref(false)
        // 初始选择部门号的时候请求团队数据
        async function getGroup() {
            // 首先清空团队选项的值
            data.employeForm.deptId = null;
            data.employeForm.groupInfo = null
            // const { deptId, deptno } = data.employeForm;
            // 该方法从employe.ts定义
            await getGroupByDno(API, data.employeForm);

        }

        // 选择团队号的时候根据部门号和团队号获取团队成员数据
        async function getEmploye(val: number = 1) {
            // 如果有关键字 则查询关键字
            if (data.employeForm.keyword != '') {
                search()
            }
            else {
                const res = await getGroupEmploye(API, data.employeForm);
                data.employeForm.employeInfo = res.employeInfo;
                data.employeForm.count = res.count;
            }
            // 清空传递的route值 以防干扰
            router.push({ query: {} });
        }

        function handleSizeChange(val: number) {
            // 设置页容量
            data.employeForm.size = val;
            getEmploye();
        }
        // 选择了某个省时候
        function selectCity() {
            // 清空城市的值
            data.addOrUpdateEmployeForm.city = ''
            // 将该城市下的所有市赋值给cityListAll 渲染出来
            if (data.addOrUpdateEmployeForm.province != '') {
                data.cityListAll = data.provinceListAll.filter(item => item.name == data.addOrUpdateEmployeForm.province)[0].districts
            }
        }
        // 监视地址全名
        watch(() => [data.addOrUpdateEmployeForm.province, data.addOrUpdateEmployeForm.city], (newValue) => {
            //  赋值省份和城市给表单
            data.addOrUpdateEmployeForm.employaddress = newValue[0] + newValue[1]
        })
        // 点击添加员工按钮
        function addEmploye() {
            dialogVisiable.value = true;
            data.addOrUpdateEmployeForm.deptInfo = data.employeForm.deptInfo
        }
        // 点击取消添加或修改
        function cancelAddOrUpdate() {
            dialogVisiable.value = false;
            data.addOrUpdateEmployeForm = {
                employno: null,
                dno: null,
                deptno: null,
                employname: '',
                deptInfo: [],//所有部门信息,
                groupInfo: [],//根据部门号获取的所有团队
                employage: '',
                employsex: '',
                employidcard: '',
                employphone: '',
                entryDate: '',
                employemail: '',
                employaddress: '',
                employsalary: '',
                province: '',  // 所属省（直辖市）
                city: '',     // 所属市
                isUpdate: false,
            }
            data.addOrUpdateFormRef.resetFields();
        }
        // 校验邮箱规则 
        const checkEmail = (rule, value, callback) => {
            const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
            if (!value) {
                return callback(new Error('邮箱不能为空'))
            }
            setTimeout(() => {
                if (mailReg.test(value)) {
                    callback()
                } else {
                    callback(new Error('请输入正确的邮箱格式'))
                }
            }, 100)
        }
        // 表单校验规则
        const rules = {
            employname: [
                { required: true, message: "请请正确输入员工姓名!", trigger: "blur" },
                { min: 2, max: 6, message: "员工姓名必须是2-6位", trigger: "blur" },
            ],
            employsex: [
                { required: true, message: "请选择员工性别!", trigger: "blur" },
            ],
            employage: [
                { required: true, message: "请请正确输入员工年龄!", trigger: "blur" },
            ],
            entryDate: [
                { required: true, message: "请选择入职日期!", trigger: "blur" },
            ],
            employidcard: [
                { required: true, message: "请请正确输入员工身份证!", trigger: "blur" },
                { min: 18, message: "身份证格式不对!", trigger: "blur" },
            ],
            employphone: [
                { required: true, message: "请请正确输入员工联系方式!", trigger: "blur" },
            ],
            employemail: [
                { required: true, message: "请正确输入员工邮箱!", trigger: "blur", validator: checkEmail },
            ],
            province: [
                { required: true, message: "请选择员工地址!", trigger: ['change', 'blur'] },
            ],
            city: [
                { required: true, message: "请选择员工地址!", trigger: ["change", 'blur'] },
            ],
            employsalary: [
                { required: true, message: "请正确输入员工薪资!", trigger: "blur" },
            ],
        };
        // 点击修改员工按钮
        async function editEmploye({ row }) {
            // 转为修改状态
            data.addOrUpdateEmployeForm.isUpdate = true;
            dialogVisiable.value = true;
            // 数据回显到表单上
            data.addOrUpdateEmployeForm = { ...data.addOrUpdateEmployeForm, ...row }
            // 把全部团队信息赋值给修改表单 
            data.addOrUpdateEmployeForm.deptInfo = data.employeForm.deptInfo;
            // 获取全部团队小组信息
            await getGroupByDno(API, data.addOrUpdateEmployeForm);
        }
        console.log(data.employeForm.groupInfo != null);


        // 修改添加或修改里面的团队选择时 获取团队小组
        async function getGroupByUpdate() {
            // 首先清空团队选项的值
            data.addOrUpdateEmployeForm.deptno = null;
            // const { deptId, deptno } = data.employeForm;
            // 该方法从employe.ts定义
            await getGroupByDno(API, data.addOrUpdateEmployeForm);
        }
        // 确认添加或修改
        function addOrUpdateEmploye() {
            data.addOrUpdateFormRef.validate(async (valid) => {
                if (valid) {
                    // 表单验证通过 发送请求
                    const res = await addOrUpdateDateEmploy(API, { default: data.addOrUpdateEmployeForm, old: data.employeForm.deptId });
                    if (res.code == 200) {
                        ElMessage.success(res.msg);
                        // 清空数据
                        cancelAddOrUpdate();
                        // 获取最新的数据
                        getEmploye();
                    }
                } else {
                    ElMessage.warning('请按规定输入数据!')
                }
            })
        }



        // 删除员工
        function deleteEmployeCheck(row: any) {
            ElMessageBox.confirm(
                `请您再次确认真的要<strong style="color:red">删除员工:${row.employname}</strong> 吗?`,
                '警告',
                {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '取消删除',
                    dangerouslyUseHTMLString: true,
                    confirmButtonClass: 'dButton',
                    type: 'error',
                    draggable: true,
                }
            )
                .then(async () => {
                    const res = await deleteEmploye(API, { employno: row.employno });
                    if (res.code == 200) {
                        ElMessage({
                            type: 'success',
                            message: '删除成功!',
                        })
                        getEmploye(data.employeForm.groupInfo.length > 0 ? data.employeForm.page : data.employeForm.page - 1)
                    } else {
                        ElMessage({
                            type: 'error',
                            message: res.msg,
                        })
                    }

                })
                .catch(() => {
                    ElMessage({
                        type: 'warning',
                        message: '您取消了删除!',
                    })
                })


        }
        function cancelDelete() {
            ElMessage.info('您取消了删除')

        }
        // 关键字查询
        async function search() {
            const searchData = {
                keyword: data.employeForm.keyword,
                page: data.employeForm.page,
                size: data.employeForm.size
            }
            const res = await searchEmploye(API, searchData);
            if (res.code == 200) {
                data.employeForm.employeInfo = res.employeInfo;
                data.employeForm.count = res.count

            } else {
                ElMessage.warning('所查找的员工并不存在')
            }

        }
        // pagination方法
        const testPagination = (query: any) => {
            data.employeForm.page = query.page
            data.employeForm.size = query.size;
            getEmploye();

        }
        return {
            ...toRefs(data),
            getGroup,
            getEmploye,
            handleSizeChange,
            editEmploye,
            search,
            dialogVisiable,
            selectCity,
            rules,
            addOrUpdateEmploye,
            addEmploye,
            cancelAddOrUpdate,
            getGroupByUpdate,
            deleteEmployeCheck,
            cancelDelete,
            testPagination

        }
    }
})
</script>

<style scoped>
.pagenation {
    text-align: center;
}

.addOrUpdateElForm .el-input {
    width: 350px;
}

.address,
.department {
    display: flex;
    margin: 0;
}

.dButton:hover {
    background-color: rgba(255, 0, 0, 0.871) !important;
}

.dButton {
    background-color: rgba(255, 0, 0, 0.537) !important;
    color: white !important;
    border: none !important;
}

.el-dialog {
    min-width: 1016px !important;
}
</style>