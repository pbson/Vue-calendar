
import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js'

import Home from './views/user/Home.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'

import Calendar from './views/user/Calendar.vue'
import CalendarSettings from './views/user/CalendarSettings.vue'
import UserSettings from './views/user/UserSettings.vue'
import ChangePassword from './views/user/ChangePassword.vue'
import CalendarSearch from './views/user/CalendarSearch.vue'

import User from './views/admin/User.vue'
import Subject from './views/admin/Subject.vue'
import Faculty from './views/admin/Faculty.vue'

import AppBar from './components/AppBar.vue'
import Header from './components/Header.vue'
import AdminHeader from './components/AdminHeader.vue'


Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path:'/calendar',
      name:'calendar',
      components:{
        default: Calendar,
        header: AppBar
      } 
    },
    {
      path:'/change-password',
      name:'changePassword',
      components: {
        default:ChangePassword,
        header:Header
      },
    },
    {
      path:'/calendar-settings',
      name:'calendarSettings',
      components: {
        default: CalendarSettings,
        header: Header
      },
    },
    {
      path:'/calendar-search',
      name:'calendarSearch',
      components: {
        default:CalendarSearch,
        header:Header
      }
    },
    {
      path:'/user-settings',
      name:'userSettings',
      components: {
        default:UserSettings,
        header:Header
      }
    },
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/admin/user',
      name: 'userManagement',
      components: {
        default:User,
        header:AdminHeader
      },
    },
    {
      path: '/admin/subject',
      name: 'subjectManagement',
      components: {
        default:Subject,
        header:AdminHeader
      },
    },
    {
      path: '/admin/faculty',
      name: 'facultyManagement',
      components: {
        default:Faculty,
        header:AdminHeader
      },
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login') 
  } else {
    next() 
  }
})

export default router