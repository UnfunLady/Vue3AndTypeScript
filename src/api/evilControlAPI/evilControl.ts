import request from "@/http";

// 获取全国疫情信息
const reqGetEvilInfo = () => {
    return request({ url: 'https://api.tianapi.com/ncov/index?key=3fc0a98a6f2fa29aa2c1fadbc54d6a84', method: 'get' })
}

// 公司疫苗接种信息接口
const reqGetCompanyEvilInfo = () => {
    return request({ url: '/getCompanyEvilInfo', method: 'get' })
}

// 获取相关员工信息
const reqGetEmployeEvilInfo = (params: Object) => {
    return request({ url: '/getEmployeEvilInfo', method: 'get', params })
}

// 获取全部员工信息
const reqGetAllEmployeEvilInfo = (params: Object) => {
    return request({ url: '/getAllEmployeEvilInfo', method: 'get', params })
}

// 修改员工信息
const reqUpdateEmployeEvilInfo = (data: Object) => {
    return request({ url: '/updateEmployeEvilInfo', method: 'post', data })
}
const evilControl = {
    reqGetEvilInfo,
    reqGetCompanyEvilInfo,
    reqGetEmployeEvilInfo,
    reqGetAllEmployeEvilInfo,
    reqUpdateEmployeEvilInfo
}
export default evilControl