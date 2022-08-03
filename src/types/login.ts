// 代表form类型
import type {FormInstance} from 'element-plus'
import {ref} from 'vue'
// 登录要用到的数据 限制
// export interface  LoginFormInt{
//     username:string,
//     password:string
// }
// export class InitData{
//     loginForm:LoginFormInt={
//         username:'',
//         password:''
//     }
//     // 登录
//     loginFormRef=ref<FormInstance>()
// }
export interface LoginFormInt{
    username:string,
    password:string
}
export class InitData{
    loginForm:LoginFormInt={
        username:'',
        password:''
    }
    loginFormRef=ref<FormInstance>()
    isLoading:boolean=false
}
// export let hello=(data:any)=>{
//     data.loginFormRef?.validate((valid:boolean)=> {
//         if(valid){
//             console.log(data.loginFormRef);
//         }else{
//             console.log(123);      
//         }
//     })
   
// }