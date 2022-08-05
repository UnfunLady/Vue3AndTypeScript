import request from "@/http";
// 修改部门无头像
const reqUpdateDepartmentNoAvatar = (data: any) => {
    return request({ url: '/editDeptNoAvatar', method: 'post', data })
}
// 修改部门有头像
const reqUpdateDepartmentAvatar = (data: any) => {
    return request({ url: '/editDept', method: 'post', data })
}
// 修改部门小组信息
const reqUpdateGroupInfo = (data: any) => {
    return request({ url: '/editGroupInfo', method: 'post', data })
}
// 获取全部员工
const reqGetAllEmploye = () => {
    return request({ url: '/getAllEmploye', method: 'get' })
}
const department = {
    reqUpdateDepartmentNoAvatar,
    reqUpdateDepartmentAvatar,
    reqUpdateGroupInfo,
    reqGetAllEmploye
}
export default department   