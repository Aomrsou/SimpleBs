import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Home from '../components/Home'
import LibraryIndex from '../components/library/LibraryIndex'
import ManagerIndex from '../components/manager/ManagerIndex'
import ManagerStudent from '../components/manager/student/ManagerStudent'
import ManagerDormitory from '../components/manager/dormitory/ManagerDormitory'
import ManagerBuild from '../components/manager/build/ManagerBuild'
import ManagerClass from '../components/manager/class/ManagerClass'
import ManagerHygiene from '../components/manager/hygiene/ManagerHygiene'
import ManagerLos from '../components/los/ManagerLos'
import ManagerFix from '../components/fix/ManagerFix'
import ManagerLosAdmin from '../components/manager/manageLos/ManagerLosAdmin'
import ManagerFixAdmin from '../components/manager/manageFix/ManagerFixAdmin'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: 'home',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/los',
          name: 'Los',
          component: ManagerLos,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/fix',
          name: 'Fix',
          component: ManagerFix,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/admin',
          name: 'Admin',
          component: ManagerIndex,
          meta: {
            requireAuth: true
          },
          children: [
            {
              path: 'student',
              name: '/admin/student',
              component: ManagerStudent
            },
            {
              path: 'dormitory',
              name: '/admin/dormitory',
              component: ManagerDormitory
            },
            {
              path: 'build',
              name: '/admin/build',
              component: ManagerBuild
            },
            {
              path: 'class',
              name: '/admin/class',
              component: ManagerClass
            },
            {
              path: 'hygiene',
              name: '/admin/hygiene',
              component: ManagerHygiene
            },
            {
              path: 'fix',
              name: '/admin/fix',
              component: ManagerFixAdmin
            },
            {
              path: 'los',
              name: '/admin/los',
              component: ManagerLosAdmin
            }
          ]
        }
      ]
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
