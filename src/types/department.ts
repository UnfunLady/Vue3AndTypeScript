import type { FormInstance } from "element-plus"
import { ref } from "vue"
// 部门基础信息
export interface departmentData {
    allDeptInfo: [],
    page: number,
    size: number,
    showDetail: boolean,
    // 详细信息
    detailForm: {
        [propName: string]: any
    }
}
// 部门信息初始化
export class departmentDataInit {
    departmentData: departmentData = {
        allDeptInfo: [],
        page: 1,
        size: 5,
        showDetail: false,
        detailForm: {}
    }
}
// 修改部门用到的数据
export interface editDepartmentData {
    editDeptData: {
        [propName: string]: any
    },
    isEdit: boolean,
    // 是否上传头像
    isUpload: boolean
}
// 初始化
export class editDepartmentDataInit {
    editDeptData: editDepartmentData = {
        editDeptData: {},
        isEdit: false,
        isUpload: false
    }
    updateDeptFormRef = ref<FormInstance>()
}

// 修改小组用到的数据
export interface editGroupData {
    editGroupForm: [],
    isEdit: boolean
}
export class editGroupInit {
    editGroupData: editGroupData = {
        editGroupForm: [],
        isEdit: false
    }
}

//组织新部门用到的数据
export interface addDepartmentData {
    // 所有员工信息
    employeData: [],
    // 步骤条
    active: number,
    // 选择的员工号集合
    addEmployeData: [],
    // 选择要添加的部门表单
    selectDeptForm: {
        // 全部部门
        allDept: [],
        // 部门号
        dno: number,
        // 小组名
        groupName: string | number,
        // 确认提交信息的表单
        confirmForm: {}
    }
}

export class addDepartmentDataInit {
    addDepartmentData: addDepartmentData = {
        employeData: [],
        active: 0,
        addEmployeData: [],
        selectDeptForm: {
            // 全部部门
            allDept: [],
            // 部门号
            dno: null,
            // 小组名
            groupName: null,
            confirmForm: {}
        }
    }
}

// 无头像更新
export const updateDepartmentNoAvatar = (API: any, data: any) => {
    return API.department.reqUpdateDepartmentNoAvatar(data);
}
// 有头像更新
export const updateDepartmentAvatar = (API: any, data: any) => {
    return API.department.reqUpdateDepartmentAvatar(data);
}

// 更新小组信息
export const updateGroupInfo = (API: any, data: any) => {
    return API.department.reqUpdateGroupInfo(data);
}
// 获取所有员工信息
export const getAllEmploye = (API: any) => {
    return API.department.reqGetAllEmploye();
}