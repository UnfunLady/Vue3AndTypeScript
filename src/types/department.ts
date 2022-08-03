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
    editDeptData: {},
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
}

