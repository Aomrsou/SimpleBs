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
            // requireAuth: true
          }
        },
        {
          path: '/library',
          name: 'Library',
          component: LibraryIndex,
          meta: {
            // requireAuth: true
          }
        },
        {
          path: '/admin',
          name: 'Admin',
          component: ManagerIndex,
          meta: {
            // requireAuth: true
          },
          children: [
            {
              path: 'student',
              name: 'Student',
              component: ManagerStudent
            },
            {
              path: 'dormitory',
              name: 'Dormitory',
              component: ManagerDormitory
            },
            {
              path: 'build',
              name: 'Build',
              component: ManagerBuild
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
