import { ref } from "vue"
import type { FormInstance } from 'element-plus'
// 用到的基本信息
export interface employeInfo {
    dno: number,//部门号
    deptId: number,//部门团队id
    deptInfo: object,//所有部门信息
    groupInfo: Array<object>,//根据部门号获取的所有团队
    employeInfo: Array<object>//根据团队号获取的全部员工信息,
    page: number,//分页页数
    size: number,//页容量
    count: number,//团队总人数
    keyword: string,//查询关键字
}
// 添加或修改员工用到的数据
export interface addOrUpdateEmploye {
    // 添加或修改的信息
    employno: number,
    dno: number,//部门号
    deptno: number,//团队号
    deptInfo: object,//所有部门信息,
    groupInfo: object,//根据部门号获取的所有团队
    employname: string,
    employage: string,
    employsex: string,
    employidcard: string,
    employphone: string,
    entryDate: string,
    employemail: string,
    employaddress: string,
    employsalary: string,
    province: string,  // 所属省（直辖市）
    city: string,     // 所属市
    isUpdate: boolean,//是否是更新状态
    changeGroup: boolean
}
// 部门薪资管理
export interface employeSalary {
    dno: number | string,
    groupInfo: [],
    editForm: {
        isuse: string,
        deptid: number | string,
    },
    isLoading: boolean,
    // 绩效的百分比
    performance: {
        deptid: number | string,
        performance: number | string
    }
}
// 员工个人具体薪资管理
export interface employeSalaryDetail {
    active: number,//步骤条的激活
    DetailForm: {
        // 传递的部门号
        dno: number | string,
        // 团队号
        deptid: number | string,
        // 全部部门
        AlldeptInfo: [],
        // 员工细节数据
        employeDetail: [],
        // 补贴相关的数据
        subDetail: {
            socialSub: number,
            houseSub: number,
            eatSub: number,
            transSub: number,
            hotSub: number,
            performance: number
        },
        // 应发工资
        allSalary: number,
        page: number,
        size: number,
        count: number
    },
    // 收集修改的目标 点击提交时循环执行修改
    editList: Array<any>,
    // 判断是否修改成功
    editSuccess: boolean,
    loading: boolean,
}
// 初始化数据 不包括薪资管理
export class EmployeeInitData {
    employeForm: employeInfo = {
        dno: null,
        deptId: null,
        deptInfo: [],
        groupInfo: [],
        employeInfo: [],
        page: 1,
        size: 8,
        count: 1,
        keyword: '',
    }
    addOrUpdateEmployeForm: addOrUpdateEmploye = {
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
        changeGroup: false,
    }
    //全国的省份
    provinceListAll: any = []
    // 省份下的市
    cityListAll = []
    // 县
    // countyListAll= []
    // 表单类型
    addOrUpdateFormRef = ref<FormInstance>();
}
// 薪资管理初始化数据
export class EmployeSalaryInitData {
    employeSalaryForm: employeSalary = {
        dno: '',
        isLoading: false,
        groupInfo: [],
        editForm: {
            isuse: '',
            deptid: null,
        },
        performance: {
            deptid: null,
            performance: null
        },
    }
}
// 个人员工薪资管理初始化数据
export class EmployeSalaryDetailData {
    employeSalaryDetailForm: employeSalaryDetail = {
        active: 0,
        DetailForm: {
            dno: null,
            AlldeptInfo: [],
            employeDetail: [],
            subDetail: {
                socialSub: null,
                houseSub: null,
                eatSub: null,
                transSub: null,
                hotSub: null,
                performance: null
            },
            allSalary: null,
            deptid: null,
            page: 1,
            size: 8,
            count: 0
        },
        // 修改列表
        editList: [],
        // 是否成功
        editSuccess: false,
        loading: false
    }
}
// const API = getCurrentInstance()?.appContext.config.globalProperties.$API;
// 基本信息相关
//#region
// 根据部门号获取全部团队
export const getGroupByDno = async (API: any, data: any) => {
    const res = await API.employe.reqGetDeptByDno(data);
    if (res && res.code == 200) {
        data.groupInfo = res.groupInfo;
    } else {
        data.groupInfo = null
    }
}
// 根据团队号获取员工
export const getGroupEmploye = async (API: any, data: any) => {
    const res = await API.employe.reqGetGroupEmploye(data);
    if (res.code == 200) {
        return res
    }
}
// 获取全国的省市县 （返回结果大概3万行 不能暴力遍历）
export const getAllProvinceAndCityList = (API: any, data: any) => {
    API.employe.reqGetAllProvinceAndAllCity().then((results: object) => {
        let res: any = results;
        if (res.code === 200) {
            // 省份赋值
            data.provinceListAll = res.districts[0].districts;
            // 市赋值 遍历省 下面的市
            // if (data.provinceListAll.length != 0) {
            //     for (let i = 0; i < data.provinceListAll.length; i++) {
            //         for (let j = 0; j < data.provinceListAll[i].districts.length; j++) {
            //             data.cityListAll.push(data.provinceListAll[i].districts[j].name);
            //         }
            //     }
            // }
            // // 县赋值  数据量太大 会卡顿！
            // if (data.cityListAll.length != 0) {
            //     for (let i = 0; i < data.cityListAll.length; i++) {
            //         for (let j = 0; i < data.cityListAll[i].districts.length; j++) {
            //             // data.countyListAll.push(data.cityListAll[i].districts[j])
            //         }
            //     }
            // }
            // console.log('省份', data.provinceListAll);
            // console.log('城市', data.cityListAll);
            // console.log('县', data.countyListAll);
        }
    });
}
// 更新或添加的方法
export const addOrUpdateDateEmploy = async (API: any, data: any) => {
    const res = await API.employe.reqAddOrUpdateEmploye(data)
    return res
}
// 删除员工的方法
export const deleteEmploye = async (API: any, employno: any) => {
    const res = await API.employe.reqDeleteEmploye(employno);
    return res
}
// 关键字查找
export const searchEmploye = async (API: any, data: any) => {
    const res = await API.employe.reqSearchEmploye(data)
    return res
}
//#endregion
// 整体薪资相关
//#region
// 获取工资明细
export const getEmployeSalaryInfo = async (API: any, params: Object) => {
    const res = await API.employe.reqGetSalaryInfo(params)
    return res;
}
// 修改工资的补助请求
export const updateEmployeSalaryInfo = async (API: any, data: any) => {
    const res = await API.employe.reqUpdateSalaryInfo(data);
    return res;
}
//#endregion
// 个人薪资相关
export const getEmployeSalaryDetailInfo = (API: any, params: Object) => {
    const res = API.employe.reqGetSalaryDetailInfo(params)
    return res;
}
// 更新
export const updateSalaryDetail = (API: any, data: Object) => {
    const res = API.employe.reqUpdateSalaryDetail(data)
    return res
}