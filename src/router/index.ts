import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import {createRouter,createWebHistory,routeRecordRaw} from 'vue-router
import useStore from '@/store'
import { ElMessage } from 'element-plus'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: '/main',
    component: () => import('@/views/HomeView/HomeView.vue'),
    meta: { name: '首页' },
    children: [
      {
        path: '/employee',
        name: '/employee',
        component: () => import(/* webpackChunkName: "about" */ '../views/MenuView.vue'),
        redirect: '/editemploye',
        meta: {
          isShow: true,
          name: '员工菜单',
          icon: 'User',
          keepAlive: true,
          isAuth: true
        },
        children: [
          {
            path: '/editemploye',
            name: 'editemploye',
            component: () => import(/* webpackChunkName: "about" */ '../views/EmployeeView/EmployeeView.vue'),
            meta: {
              name: '员工管理',
              icon: 'Discount',
              keepAlive: true,
              isAuth: true
            }
          },
          {
            path: '/salaryEmploye',
            name: 'salaryEmploye',
            redirect: '/salaryIndexView',
            component: () => import(/* webpackChunkName: "about" */ '../views/EmployeeView/EmployeSalaryView/index.vue'),
            meta: {
              name: '薪资管理',
              icon: 'Money',
              keepAlive: true,
              isAuth: true
            },
            children: [
              {
                path: '/salaryIndexView',
                name: 'salaryIndexView',
                component: () => import('../views/EmployeeView/EmployeSalaryView/IndexView/IndexView.vue'),
                meta: {
                  name: '全部部门',
                  keepAlive: true,
                  activePath: '/salaryEmploye',
                  isAuth: true
                },
              },
              {
                path: '/departmentSalaryDetail',
                name: 'departmentSalaryDetail',
                component: () => import('../views/EmployeeView/EmployeSalaryView/IndexView/departmentSalaryDetail/departmentSalaryDetail.vue'),
                meta: {
                  name: '部门整体工资明细',
                  activePath: '/salaryEmploye',
                  isAuth: true
                },
              },
              {
                path: '/employeDetailView',
                name: 'employeDetailView',
                component: () => import('../views/EmployeeView/EmployeSalaryView/IndexView/employeDetailView/employeDetailView.vue'),
                meta: {
                  name: '员工工资明细',
                  activePath: '/salaryEmploye',
                  isAuth: true
                },
              },




            ]
          }
        ]
      },
      {
        path: '/department',
        name: 'department',
        component: () => import('@/views/DepartmentView/index.vue'),
        redirect: '/departmentView',
        meta: {
          isShow: true,
          name: '部门菜单',
          icon: 'House',
          isAuth: true
        },
        children: [
          {
            path: '/departmentView',
            name: 'departmentView',
            component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentView/DepartmentEditView/DepartmentEditView.vue'),
            meta: {
              name: '现有部门信息',
              icon: 'Connection',
              isAuth: true
            },
          },
          {
            path: '/editGroup',
            name: 'EditGroup',
            component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentView/DepartmentEditView/MainView/EditGroupView/EditGroupView.vue'),
            meta: {
              name: '编辑小组信息',
              icon: 'Connection',
              activePath: '/departmentView',
              hidden: true,
              isAuth: true
            },
          },
          {
            path: '/addGroup',
            name: 'addGroup',
            component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentView/AddGroupView/AddGroupView.vue'),
            meta: {
              name: '组织新小组',
              icon: 'Notebook',
              isAuth: true
            },
          },
          {
            path: '/addDepartment',
            name: 'addDepartment',
            component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentView/AddDepartmentView/AddDepartmentView.vue'),
            meta: {
              name: '创建新部门',
              icon: 'School',
              isAuth: true
            },
          },
          {
            path: '/DeleteDepartment',
            name: 'DeleteDepartment',
            component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentView/DeleteDepartmentView/DeleteDepartmentView.vue'),
            meta: {
              name: '解散部门或小组',
              icon: 'Delete',
              isAuth: true
            },

          },

        ]
      },
      {
        path: '/main',
        name: 'main',
        component: () => import('@/views/MainView/MainView.vue'),
        meta: {
          name: '首页信息',
          isAuth: true
        }
      },
    ]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView/LoginView.vue')
  },


]

const router = createRouter({
  routes: routes,
  history: createWebHistory(process.env.BASE_URL)
})

router.beforeEach((to, from, next) => {
  // 获取用户信息
  const { user } = useStore()
  // 如果路由需要认证的话
  if (to.meta.isAuth) {
    // 先判断token如果不为空 则继续  后台node也会验证token是否过期
    if (user.getUserToken !== '' && user.userInfo.userList.isLogin === true) {
      next();
    } else {
      // 没有token就跳到登录
      ElMessage.warning('请先登录!')
      next('/login')
    }
  } else {
    // 如果登录了有token 不能再去登录界面
    if (user.getUserToken !== '' && user.userInfo.userList.isLogin === true) {
      if (to.path === '/login') {
        ElMessage.warning('您已经登录过了!')
        next('/main')
      }
    }
    next()

  }
})


export default router
