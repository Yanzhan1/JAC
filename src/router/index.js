import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//爱车部分
import Lovecar from '@/components/Lovecar/lovecar'
//发现部分
import Activity from '@/components/discover/activity/activity' //活动

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children:[
        {
          path: "/activity",
          component: Activity
        },
        {
          path: "/lovecar",
          component: Lovecar
        }
      ]
    }
  ]
})
