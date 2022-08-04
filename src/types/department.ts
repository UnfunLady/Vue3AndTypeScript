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
    editGroupForm: {
        [propName: string]: any
    }
}

export class editGroupInit {
    editGroupData: editGroupData = {
        editGroupForm: {}
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
