<template>
  <div class="common-layout">
    <el-container>
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <el-menu :collapse="isCollapse" background-color="#304156" class="el-menu-vertical-demo"
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
                <el-avatar :size="50"
                  src="https://himg.bdimg.com/sys/portrait/item/public.1.9d62a83f.ak8wyGYgvIRgx1ZEi2Lv4A.jpg" />
              </div>
              <div class="nickname">
                <el-dropdown>
                  <span class="el-dropdown-link">
                    UnfunLady
                    <el-icon class="el-icon--right">
                      <arrow-down />
                    </el-icon>
                  </span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item>个人信息</el-dropdown-item>
                      <el-dropdown-item>修改密码</el-dropdown-item>
                      <el-dropdown-item>退出登录</el-dropdown-item>

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
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useRouter, useRoute } from "vue-router";


export default defineComponent({
  name: "HomeView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    // 获取全部路由 并过滤要展示的
    const list = router.getRoutes().filter(v => v.meta.isShow);
    // // 获取菜单列表的子路由
    // const children = list.map((l, i) => l.children[0])
    //  是否折叠菜单
    let isCollapse = ref(false);
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



    return {
      list,
      // children
      closeMenu,
      isCollapse,
      activeIndex
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
      background-color: #1f2d3d;

    }

    .el-menu-item:hover {
      background-color: #001528;
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
</style>