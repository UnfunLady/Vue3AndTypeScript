<template>
  <div class="login">
    <div class="bgForm">
      <el-form ref="loginFormRef" :model="loginForm" status-icon :rules="rules" label-width="70px" class="loginForm">
        <h3 class="header-title">LOGIN</h3>
        <!-- <p style="width: 100%;text-align: center;">login</p> -->
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username" type="text" :clearable="true" autocomplete="true" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password" show-password autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="subButton" @click="submitForm()">登 录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  toRefs,
  reactive,
  getCurrentInstance,
  onMounted,
} from "vue";
// 导入登录form表单
// import { hello } from "@/types/login";
import { InitData } from "@/types/login";
import { ElMessage } from "element-plus";
// import type { FormInstance } from 'element-plus'
import { ElLoading } from "element-plus";
// 引入路由
import { useRouter } from "vue-router";
import useStore from '@/store/index'
export default defineComponent({
  name: "Login",
  setup() {
  
    // 使用pinia
    const { user } = useStore();
    // 通过类的示例实现
    const data = reactive(new InitData());
    // 路由
    const router = useRouter();
    const rules = {
      username: [
        { required: true, message: "请输入用户名!", trigger: "blur" },
        { min: 5, max: 24, message: "用户名必须是6-24位", trigger: "blur" },
      ],
      password: [
        { required: true, message: "请输入密码!", trigger: "blur" },
        { min: 5, max: 24, message: "请输入密码必须是6-24位", trigger: "blur" },
      ],
    };
    // 获取挂在原型上的全部api方法
    const API = getCurrentInstance().appContext.config.globalProperties.$API;
    // 登录验证的方法
    const submitForm = () => {
      //#region
      // 第一种在login.ts暴露出方法然后传递data过去验证
      // 在login.ts定义的方法hello测试
      // hello(data);
      // 第二种直接在这里写方法
      // 不确定是否拿到了数据加个？
      //#endregion
      data.loginFormRef?.validate(async (valid: boolean) => {
        if (valid) {
          const res = await API.employe.reqUserLogin(data.loginForm);
          // 设置加载遮挡
          const loading = ElLoading.service({
            lock: true,
            text: "正在努力验证中...",
            background: "rgba(0,0,0,0.5)",
          });
          if (res.code == 200) {
            ElMessage.success("登陆成功~");
            // 关闭遮挡层
            loading.close();
            //存储token到localstorage
            user.setToken(res.token);
            user.setUserInfo(res.Info)
            // localStorage.setItem("UserToken", res.token);
            //  跳转到主页
            setTimeout(() => {
              router.push({ name: 'main' })
            }, 1000)

          }
        } else {
          ElMessage.error(" 登录验证失败,请重新输入~");
        }
      });
    };

    return {
      ...toRefs(data),
      rules,
      submitForm,
    };
  },
});
</script>

<style scoped lang="scss">
.login {
  width: 100%;
  height: 100%;
  // background-color: #f1f4f6;
  background-image: url('../../assets/bg.jpg');
  box-sizing: border-box;
  padding-top: 200px;

  .el-form {
    text-align: center;


  }

  .el-button {
    background-color: #79a0c9 !important;
    border: #79a0c9 !important;
  }

  .el-button:hover {
    background-color: #4c9aed !important;
    border: #4c9aed !important;
  }

  .el-form-item {
    margin: 40px;
    display: flex;
    align-items: center;

    .el-input {
      height: 40px !important;
    }
  }



  .bgForm {
    width: 500px;
    padding: 40px;
    background-color: rgba(255, 255, 255, 0.889);
    border-radius: 10px;
    margin: 0 auto;

  }

  .subButton {

    width: 100%;
    height: 40px;
  }
}

.el-loading-spinner .path {
  -webkit-animation: loading-dash 1.5s ease-in-out infinite;
  animation: loading-dash 1.5s ease-in-out infinite;
  stroke-dasharray: 90, 150;
  stroke-dashoffset: 0;
  stroke-width: 2;
  /* stroke: var(--el-color-primary); */
  stroke-linecap: round;
  stroke: rgb(255, 255, 255) !important;
}

.el-loading-spinner .el-loading-text {
  /* color: var(--el-color-primary); */
  color: rgb(255, 255, 255) !important;
  margin: 3px 0;
  font-size: 14px;
}

.header-title {

  font-size: 30px;
  color: #79a0c9;
  margin: 20px 0px;

}
</style>