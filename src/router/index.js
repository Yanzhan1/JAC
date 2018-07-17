import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//爱车部分
import Lovecar from '@/components/Lovecar/lovecar'
//我的部分
import My from '@/components/My/Myindex'
//发现部分
import Discover from '@/components/discover/discover'
import Recommend from '@/components/discover/recommend/recommend' //推荐首页
import Activity from '@/components/discover/activity/activity' //活动首页
import Information from '@/components/discover/information/information' //资讯首页
import Now from '@/components/discover/now/now' //此刻首页

import ActivityDetail from '@/components/discover/activity/activityDetail' //活动详情
import InformationDetail from '@/components/discover/information/informationDetail' //资讯详情
import NowDetail from '@/components/discover/now/nowDetail' //此刻详情

import CommentList from '@/components/discover/component/commentList' //评论详情(公共)
import AddPic from '@/components/discover/now/addPic' //新增此刻
import ToSign from '@/components/discover/activity/toSign' //活动报名

Vue.use(Router)

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Main,
      children: [{
          path: '/',
          redirect: '/discover'
        },
        {
          path: "/activity/activityDetail",
          component: ActivityDetail
        },{
          path: "/information/informationDetail",
          component: InformationDetail
        },{
          path: "/now/nowDetail",
          component: NowDetail
        },{
          path: "/component/commentList",
          component: CommentList
        },{
          path: "/now/addPic",
          component: AddPic
        },{
          path: "/activity/toSign",
          component: ToSign
        }, /*
          {
          path: "/commentList",
          component: CommentList
        },
        {
          path: "/discover/toAsk",
          component: ToAsk
        }, {
          path: "/discover/questionDetail",
          component: QuestionDetail
        }, {
          path: "/discover/showPicture",
          component: ShowPicture
        }, {
          path: "/discover/picDetail",
          component: PicDetail
        },*/
        //发现
        {
          path: "/discover",
          component: Discover,
          children: [{
            path: '/',
            redirect: "/recommend",
            meta: { keepAlive: true }
          }, {
            path: "/recommend",
            component: Recommend,
            meta: { keepAlive: true }
          }, {
            path: "/activity",
            component: Activity,
            meta: { keepAlive: true }
          }, {
            path: "/information",
            component: Information,
            meta: { keepAlive: true }
          }, {
            path: "/now",
            component: Now,
            meta: { keepAlive: true }
          }]
        },
        /*{
          path: "/activity/detailactivity",
          component: DetailActivity
        },
        {
          path: "/activity/detailactivity/WantGo",
          component: WantGo
        }]*/
      /*children:[{
          path: '/',
          redirect: '/recommend'
        },
        {
          path: "/recommend",
          component: Recommend
        },
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
          path: "/information",
          component: Information
        },
        {
          path: "/now",
          component: Now
        },*/
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
