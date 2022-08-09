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
// 新增小组
const reqAddGroup = (data: any) => {
    return request({ url: '/addGroup', method: 'post', data })
}
// 解散小组
const delGroup = (data: any) => {
    return request({ url: '/delGroup', method: 'post', data })
}

// 解散部门
const delDept = (data: any) => {
    return request({ url: '/delDept', method: 'post', data })
}
const department = {
    reqUpdateDepartmentNoAvatar,
    reqUpdateDepartmentAvatar,
    reqUpdateGroupInfo,
    reqGetAllEmploye,
    reqAddGroup,
    delGroup,
    delDept
}
export default department   