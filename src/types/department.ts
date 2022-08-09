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

//组织新小组用到的数据
export interface addGroupData {
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
        // 小组所在城市
        location: string,
        // 确认提交信息的表单
        confirmForm: {}
    },
    addSuccess: boolean
}

export class addGroupDataInit {
    addGroupData: addGroupData = {
        employeData: [],
        active: 0,
        addEmployeData: [],
        selectDeptForm: {
            // 全部部门
            allDept: [],
            // 部门号
            dno: null,
            // 小组名
            groupName: '',
            location: '',
            confirmForm: {}
        },
        addSuccess: false,

    }
}

// 创建新部门用到的数据
export interface addDepartmentData {
    addDepartmentForm: {
        dname: string,
        explain: string,
        loading: boolean,
        [propName: string]: any
    }
}

export class addDepartmentDataInit {
    addDepartmentData: addDepartmentData = {
        addDepartmentForm: {
            dname: '',
            explain: '',
            loading: false
        }
    }
}

// 解散部门或小组用到的数据
export interface deleteDepartmentOrGroup {
    // 所有部门信息
    allDeptInfo: [],
    // 解散小组信息
    delGroupInfo: [],
    // 是否点击了解散小组
    isDelGroup: boolean
}
export class deleteDepartmentOrGroupInit {
    deleteDepartmentOrGroupInfo: deleteDepartmentOrGroup = {
        allDeptInfo: [],
        delGroupInfo: [],
        isDelGroup: false
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

// 新增小组
export const addGroup = (API: any, data: any) => {
    return API.department.reqAddGroup(data)
}

// 解散小组 
export const reqDelGroup = (API: any, data: any) => {
    return API.department.delGroup(data);
}

// 解散部门
export const reqDelDept = (API: any, data: any) => {
    return API.department.delDept(data);
}