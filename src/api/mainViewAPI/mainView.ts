import request from "@/http";
// 第一张图获取部门总人数细节
const getDeptInfo = () => {
    return request({ url: 'deptTotal', method: 'get' })
}
// 第二张 获取部门薪资以及小组数和总人数
const getDeptDetailInfo = () => {
    return request({ url: 'deptDetail', method: 'get' })
}
const main = {
    getDeptInfo,
    getDeptDetailInfo
}
export default main