import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import {createRouter,createWebHistory,routeRecordRaw} from 'vue-router
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
          keepAlive: true
        },
        children: [
          {
            path: '/editemploye',
            name: 'editemploye',
            component: () => import(/* webpackChunkName: "about" */ '../views/EmployeeView/EmployeeView.vue'),
            meta: {
              name: '员工管理',
              icon: 'Discount',
              keepAlive: true
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
              keepAlive: true
            },
            children: [
              {
                path: '/salaryIndexView',
                name: 'salaryIndexView',
                component: () => import('../views/EmployeeView/EmployeSalaryView/IndexView/IndexView.vue'),
                meta: {
                  name: '全部部门',
                  keepAlive: true,
                  activePath: '/salaryEmploye'
                },
              },
              {
                path: '/departmentSalaryDetail',
                name: 'departmentSalaryDetail',
                component: () => import('../views/EmployeeView/EmployeSalaryView/IndexView/departmentSalaryDetail/departmentSalaryDetail.vue'),
                meta: {
                  name: '部门整体工资明细',
                  activePath: '/salaryEmploye'
                },
              },
              {
                path: '/employeDetailView',
                name: 'employeDetailView',
                component: () => import('../views/EmployeeView/EmployeSalaryView/IndexView/employeDetailView/employeDetailView.vue'),
                meta: {
                  name: '员工工资明细',
                  activePath: '/salaryEmploye'
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
          icon: 'House'
        },
        children: [
          {
            path: '/departmentView',
            name: 'departmentView',
            component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentView/DepartmentEditView/DepartmentEditView.vue'),
            meta: {
              name: '现有部门信息',
              icon: 'Connection'
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
              hidden: true
            },
          },
          {
            path: '/addDepartment',
            name: 'addDepartment',
            component: () => import(/* webpackChunkName: "about" */ '../views/DepartmentView/AddDepartmentView/AddDepartmentView.vue'),

            meta: {
              name: '组织新小组',
              icon: 'Notebook'
            },
          },
        ]
      },
      {
        path: '/main',
        name: 'main',
        component: () => import('@/views/MainView/MainView.vue'),
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
export default router
