import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//爱车部分
import Lovecar from '@/components/Lovecar/lovecar'
//我的部分
import My from '@/components/My/Myindex'
//发现部分
import Activity from '@/components/discover/activity/activity' //活动

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Main,
      children:[
        {
          path: '/',
          redirect: '/activity'
        },
        {
          path: "/activity",
          component: Activity
        },
        //爱车页面
        {
          path: "/lovecar",
          component: Lovecar
        },
        //我的页面
        {
          path: "/myindex",
          component: My
        }
      ]
    }
  ]
})
