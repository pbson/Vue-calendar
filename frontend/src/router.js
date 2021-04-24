
import Vue from 'vue'
import Router from 'vue-router'
import store from './store/store.js'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Login from './views/Login.vue'
import Secure from './components/Secure.vue'
import Register from './views/Register.vue'
import Calendar from './views/Calendar.vue'
import CalendarSettings from './views/CalendarSettings.vue'
import UserSettings from './views/UserSettings.vue'
import ChangePassword from './views/ChangePassword.vue'
import CalendarSearch from './views/CalendarSearch.vue'
import AppBar from './components/AppBar.vue'

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
      component: ChangePassword,
    },
    {
      path:'/calendar-settings',
      name:'calendarSettings',
      component: CalendarSettings
    },
    {
      path:'/calendar-search',
      name:'calendarSearch',
      component: CalendarSearch
    },
    {
      path:'/user-settings',
      name:'userSettings',
      component: UserSettings,
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
      path: '/secure',
      name: 'secure',
      component: Secure,
      meta: { 
        requiresAuth: true
      }
    },
    {
      path: '/about',
      name: 'about',
      component: About
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