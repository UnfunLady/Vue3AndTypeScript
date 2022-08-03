import axios from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { ElMessage } from 'element-plus'
enum MSGS {
    // 自动递增
    '请求操作成功!' = 200,
    '用户名或密码错误!',//201
    '请求出现异常'//202

}
const request = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        "content-Type": "application/json;charset=utf-8"
    }
})

request.interceptors.request.use(config => {
    Nprogress.start();
    // 判断是否有
    config.headers = config.headers || {};
    // 如果有token
    if (localStorage.getItem('UserToken')) {
        config.headers.token = localStorage.getItem('userToken') || '';
    }
    return config
})

request.interceptors.response.use(res => {
    // 获取状态码
    // console.log(res.data.code);
    const code: number = res.data.code
    if (code != 200) {
        ElMessage.error(MSGS[code] + '       ' + res.data.msg)
        Nprogress.done()
        return Promise.reject(res.data)

    } else {
        Nprogress.done()
        return res.data
    }

}, err => {
    ElMessage({
        message: '请求失败!' + err
    })
})

export default request;