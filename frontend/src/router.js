
import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js'

import Home from './views/user/Home.vue'
import Login from './views/user/Login.vue'
import Register from './views/user/Register.vue'

import Calendar from './views/user/Calendar.vue'
import CalendarSettings from './views/user/CalendarSettings.vue'
import UserSettings from './views/user/UserSettings.vue'
import ChangePassword from './views/user/ChangePassword.vue'
import CalendarSearch from './views/user/CalendarSearch.vue'

import User from './views/admin/User.vue'
import Subject from './views/admin/Subject.vue'
import Faculty from './views/admin/Faculty.vue'

import MinistryCalendar from './views/ministry/Calendar.vue'
import MinistryActivities from './views/ministry/Activities.vue'
import MinistryLogin from './views/ministry/Login.vue'
import MinistryRegister from './views/ministry/Register.vue'

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
    },
    {
      path: '/ministry/calendar',
      name: 'ministryCalendar',
      components: {
        default:MinistryCalendar,
        header:AdminHeader
      },
    },
    {
      path: '/ministry/activities',
      name: 'MinistryActivities',
      components: {
        default:MinistryActivities,
        header:AdminHeader
      },
    },
    {
      path: '/ministry/register',
      name: 'MinistryRegister',
      components: {
        default:MinistryRegister,
      },
    },
    {
      path: '/ministry/login',
      name: 'MinistryLogin',
      components: {
        default:MinistryLogin,
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