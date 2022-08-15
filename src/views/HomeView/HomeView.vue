<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <el-menu :collapse="isCollapse" background-color="#476080" class="el-menu-vertical-demo"
          :collapse-transition="true" :default-active="activeIndex" :unique-opened="true" text-color="#fff" router>
          <el-menu-item index="/main">
            <el-icon>
              <Menu />
            </el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu v-for="item in list" :key="item.path" :index="item.path">
            <template #title>
              <el-icon>
                <!-- <document /> -->
                <!-- 动态生成图标 -->
                <component :is="item.meta.icon"></component>
              </el-icon>
              <span>{{ item.meta.name }}</span>
            </template>
            <el-menu-item v-for="(child) in item.children" v-show="!child.meta.hidden" :key="child.path"
              :index="child.path">
              <template #title>
                <el-icon>
                  <!-- <document /> -->
                  <component :is="child.meta.icon"></component>
                </el-icon>
                {{ child.meta.name }}
              </template>
            </el-menu-item>
          </el-sub-menu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header height="50px">
          <el-row :gutter="24">
            <el-col :span="1" class="close">
              <el-button link @click="closeMenu()">
                <el-icon :size="21">
                  <component :is="isCollapse ? 'Expand' : 'Fold'" />
                </el-icon>
              </el-button>
              <!-- <img src="../assets/logo.png" class="logo" alt="" /> -->
            </el-col>
            <el-col :span="19">
              <div>
                <el-breadcrumb class="bread" separator="/" style="line-height: 50px;">
                  <el-breadcrumb-item :to="{ path: item.path }"
                    v-for="(item, index) in $router.currentRoute.value.matched" :key="index"
                    v-show="item.meta.name && item.children">
                    {{ item.meta.name ? item.meta.name : '' }}</el-breadcrumb-item>
                </el-breadcrumb>
              </div>
            </el-col>
            <el-col :span="4" class="rightInfo">
              <div class="avatar">
                <el-avatar :size="50" :src="user.userInfo.userList.userInfo['avatar']" />
              </div>
              <div class="nickname">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    {{ user.userInfo.userList.userInfo['nickname'] }}
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="infoVisible = true">我的信息</el-dropdown-item>
                      <el-dropdown-item @click="editPassword = true">修改密码</el-dropdown-item>
                      <el-dropdown-item @click="userLogout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- 个人信息 -->
  <el-dialog v-model="infoVisible" draggable title="管理员信息" width="30%" :before-close="handleClose">
    <el-form :model="user.userInfo.userList.userInfo" label-width="auto">
      <el-form-item label="当前头像：">
        <el-avatar :src="user.userInfo.userList.userInfo['avatar']"></el-avatar>
      </el-form-item>
      <el-form-item label="用户名/权限：">
        <el-tag type="danger">{{ user.userInfo.userList.userInfo['username'] }}</el-tag>
        <el-tag type="danger" style="margin-left:15px">{{ user.userInfo.userList.userInfo['level'] == 1 ? '超级管理员' :
            '普通管理员'
        }}</el-tag>
      </el-form-item>
      <el-form-item label="用户昵称：">
        <el-tag type="info">{{ user.userInfo.userList.userInfo['nickname'] }}</el-tag>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button color="#3ba272" icon="Check" @click="infoVisible = false">我知道了</el-button>
      </span>
    </template>
  </el-dialog>

  <!-- 修改密码 -->
  <el-dialog v-model="editPassword" draggable title="修改密码" width="30%" :before-close="editClose">
    <el-form :model="editPasswordForm" :rules="rules" ref="editPasswordRef" label-width="auto" style="width:90%">
      <el-form-item label="当前密码：" prop="nowPassword">
        <el-input type="text" v-model="editPasswordForm.nowPassword" size="large" placeholder="请输入原来的密码"></el-input>
      </el-form-item>
      <el-form-item label="新密码：" prop="newPassword">
        <el-input type="text" v-model="editPasswordForm.newPassword" size="large" placeholder="请输入新的密码"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码：" prop="confirmNewPassword">
        <el-input type="text" v-model="editPasswordForm.confirmNewPassword" size="large" placeholder="确认新的密码">
        </el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: center;">
      <el-button style="height:35px" type="info" icon="Close" @click="editClose">取消修改</el-button>
      <el-button style="height:35px" color="#3ba272" icon="Check" @click="confirmEdit(editPasswordRef)">确定修改</el-button>
    </div>
  </el-dialog>

</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import useStore from "@/store";
import { ElMessage } from "element-plus";
import { number } from "echarts";
import type { FormInstance } from 'element-plus'
export default defineComponent({
  name: "HomeView",
  setup() {
    // pinia
    const { user } = useStore();
    const router = useRouter();
    const route = useRoute();
    // 获取全部路由 并过滤要展示的
    const list = router.getRoutes().filter(v => v.meta.isShow);
    // // 获取菜单列表的子路由
    // const children = list.map((l, i) => l.children[0])
    //  是否折叠菜单
    let isCollapse = ref(false);
    // 个人信息控制
    const infoVisible = ref(false);

    // 修改密码控制
    const editPassword = ref(false);
    //  折叠菜单
    function closeMenu() {
      isCollapse.value = !isCollapse.value
    }
    // 设置动态路由的路径
    const activeIndex = ref('');
    // /加上当前路由路径
    const sesson = window.sessionStorage;
    sesson.Hearderpath = '/' + router.currentRoute.value.fullPath.split('/')[1].toLowerCase()
    activeIndex.value = sesson.Hearderpath;

    // 动态监视路由改变   这样面包屑跳转也可以检测到
    watch(() => route.path, (newPath, oldPath) => {
      // 菜单栏显示自定义激活 如果没有就激活新的路由路径
      let Path: any = router.currentRoute.value.meta.activePath
      activeIndex.value = Path || newPath
    }, { immediate: true });

    // 退出登录
    const userLogout = () => {
      user.userOut()
      ElMessage.success('退出登录成功!')
      router.push('/login')
    }
    // 个人信息关闭
    const handleClose = () => {
      infoVisible.value = false;
    }


    interface editPassword {
      nowPassword: string,
      newPassword: string,
      confirmNewPassword: string
    }

    const editPasswordForm: editPassword = reactive({
      nowPassword: '',
      newPassword: '',
      confirmNewPassword: ''

    })
    // 修改密码关闭
    const editClose = () => {
      editPassword.value = false;
      editPasswordForm.nowPassword = '';
      editPasswordForm.newPassword = ''
      editPasswordForm.confirmNewPassword = '';
      editPasswordRef.value!.clearValidate()
    }
    // 修改密码表单类型
    const editPasswordRef = ref<FormInstance>()

    const confirmValidatePass = (rule: any, value: any, callback: any) => {
      if (value == '') {
        return callback(new Error('请按要求输入!'));
      } else {
        if (value !== editPasswordForm.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        }
        callback()
      }
    }

    // 表单验证
    const rules = {
      nowPassword: [{ required: true, trigger: "blur", message: '旧密码不能为空' }],
      newPassword: [{ required: true, trigger: "blur", message: '新密码不能为空' }],
      confirmNewPassword: [{ validator: confirmValidatePass, trigger: 'blur' }],
    }

    // API
    const API = getCurrentInstance().appContext.config.globalProperties.$API;


    // 确定修改
    const confirmEdit = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate(async (valid) => {
        if (valid) {
          const res = await API.employe.editPassword({ editInfo: editPasswordForm, user: user.userInfo.userList.userInfo['username'] });
          if (res.code === 200) {
            ElMessage.success('修改密码成功,请重新登录')
            // 退出登录
            userLogout()
          } else {
            ElMessage.error(res.msg)
          }

        } else {
          ElMessage.error('请确认输入是否正确')
        }
      })
    }


    return {
      list,
      // children
      closeMenu,
      isCollapse,
      activeIndex,
      user,
      userLogout,
      infoVisible,
      handleClose,
      editPassword,
      editClose,
      editPasswordForm,
      editPasswordRef,
      rules,
      confirmEdit
    }
  }
});
</script>

<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 260px;
  height: 100%;

}

.el-container {
  height: calc(100vh);

}

.logo {
  height: 50px;
}

h2 {
  text-align: center;
  height: 50px;
  line-height: 50px;
  color: rgb(197, 197, 197);
}

.el-header {

  background-color: white;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
}

.avatar {
  height: 50px;
  line-height: 50px;
  transform: scale(.8);

}

.rightInfo {

  display: flex;

}

.nickname {
  width: 100%;
  line-height: 50px;
  margin-left: 20px;

}

.el-aside::-webkit-scrollbar {
  display: none;
}

.el-aside {
  transition: .6s;
  height: calc(100vh);

  .el-menu {
    height: 100%;

    .el-sub-menu .el-menu-item {
      background-color: #273f5ba4;

    }

    .el-menu-item:hover {
      background-color: #93969920;
    }
  }
}

.close {
  display: flex;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 210px;
  min-height: 400px;
}

.el-dropdown {
  vertical-align: middle;
  text-align: center !important;
}

.el-dropdown-link {
  cursor: pointer;

  display: flex;
  align-items: center;
}

.el-breadcrumb {
  font-size: 14px !important;

}

.el-menu-item.is-active {
  color: #92959b
}
</style>