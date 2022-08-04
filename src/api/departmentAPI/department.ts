import request from "@/http";
// 修改部门无头像
const reqUpdateDepartmentNoAvatar = (data: any) => {
    return request({ url: '/editDeptNoAvatar', method: 'post', data })
}
// 修改部门有头像
const reqUpdateDepartmentAvatar = (data: any) => {
    return request({ url: '/editDept', method: 'post', data })
}
const department = {
    reqUpdateDepartmentNoAvatar,
    reqUpdateDepartmentAvatar
}
export default department   