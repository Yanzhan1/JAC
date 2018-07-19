import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//爱车部分
import Lovecar from '@/components/Lovecar/lovecar'
import RevisePinCode from '@/components/Lovecar/RevisePinCode'
import ForgetPinCode from '@/components/Lovecar/ForgetPinCode'
import ReviseSuccess from '@/components/Lovecar/ReviseSuccess'
//我的部分
import My from '@/components/My/Myindex'
import Mystart from '@/components/My/Mystart'
import Userstart from '@/components/My/Userstart'
import Fans from '@/components/My/Fans'
import Focus from '@/components/My/Focus'

//发现部分
import Discover from '@/components/discover/discover'
import Recommend from '@/components/discover/recommend/recommend' //推荐首页
import Activity from '@/components/discover/activity/activity' //活动首页
import Information from '@/components/discover/information/information' //资讯首页
import Now from '@/components/discover/now/now' //此刻首页

import ActivityDetail from '@/components/discover/activity/activityDetail' //活动详情
import InformationDetail from '@/components/discover/information/informationDetail' //资讯详情
import NowDetail from '@/components/discover/now/nowDetail' //此刻详情
import PictureDetail from '@/components/discover/activity/pictureDetail' //晒图详情

import CommentList from '@/components/discover/component/commentList' //超过4条的评论列表(公共)
import AddPic from '@/components/discover/now/addPic' //新增此刻
import ToSign from '@/components/discover/activity/toSign' //活动报名

// 智享部分
import Wit from '@/components/Wit/Wit.vue' //智享首页

Vue.use(Router)

export default new Router({
	mode: 'hash',
	routes: [{
		path: '/',
		component: Main,
		children: [{
				path: '/',
				redirect: '/discover'
			},
      //发现
      {
        path: "/discover",
        component: Discover,
        children: [{
          path: '/',
          redirect: "/recommend",
          meta: {
            keepAlive: true
          }
        }, {
          path: "/recommend",
          component: Recommend,
          meta: {
            keepAlive: true
          }
        }, {
          path: "/activity",
          component: Activity,
          meta: {
            keepAlive: true
          }
        }, {
          path: "/information",
          component: Information,
          meta: {
            keepAlive: true
          }
        }, {
          path: "/now",
          component: Now,
          meta: {
            keepAlive: true
          }
        }]
      },
			{
				path: "/activity/activityDetail",
				component: ActivityDetail
			}, {
				path: "/information/informationDetail",
				component: InformationDetail
			}, {
				path: "/now/nowDetail",
				component: NowDetail
			},
      {
        path: "/activity/pictureDetail",
        component: PictureDetail
      },
      {
				path: "/component/commentList",
				component: CommentList
			}, {
				path: "/now/addPic",
				component: AddPic
			}, {
				path: "/activity/toSign",
				component: ToSign
			},
			{
				path: "/lovecar",
				component: Lovecar
			},
			{
				path: "/revisePinCode",
				naem: '修改pin码',
				component: RevisePinCode
			},
			{
				path: "/forgetPinCode",
				naem: '忘记pin码',
				component: ForgetPinCode
			},
			{
				path: "/reviseSuccess",
				naem: '修改pin成功',
				component: ReviseSuccess
			},
			//我的页面
			{
				path: "/myindex",
				component: My
			},
			{
				path: "/mystart",
				component: Mystart
			},
			{
				path: "/userstart",
				component: Userstart
			},
      {
        path: "/fans",
        component: Fans
      },
      {
        path: "/focus",
        component: Focus
      },
			//智享部分
			{
				path: '/wit',
				name: '智享首页',
				component: Wit
			}
		]
	}]
})
