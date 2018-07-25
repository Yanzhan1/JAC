import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//爱车部分
import Lovecar from '@/components/Lovecar/lovecar'
import RevisePinCode from '@/components/Lovecar/RevisePinCode' //修改pin码
import ForgetPinCode from '@/components/Lovecar/ForgetPinCode'  //忘记pin码
import ReviseSuccess from '@/components/Lovecar/ReviseSuccess' //pin码修改成功
import Authorize from "@/components/Lovecar/Authorize.vue"
import Authorize_next from "@/components/Lovecar/Authorize_next.vue"
import WifiLink from "@/components/Lovecar/WifiLink"  //wifi直连
import WifiSetup from "@/components/Lovecar/WifiSetup" //wifi设置
import FuelQuery from "@/components/Lovecar/FuelQuery" //燃油查询
import FlowQuery from "@/components/Lovecar/FlowQuery" //流量查询
import Islogin from '../components/Lovecar/islogin.vue' 
import IntelligenceParking from "@/components/Lovecar/IntelligenceParking" //智能停车G1
import IntelligentParkingInfo from "@/components/Lovecar/IntelligentParkingInfo" //智能停车G2
import IntelligentParkingUninfo from "@/components/Lovecar/IntelligentParkingUninfo" //智能停车G3
import AirConditionControl from "@/components/Lovecar/AirConditionControl"//空调控制
import AdjustSeatTemper from "@/components/Lovecar/AdjustSeatTemper"//座椅调温
import WindowControl from "@/components/Lovecar/WindowControl"//车窗控制
import SkylightControl from "@/components/Lovecar/SkylightControl"//天窗控制
import AirEvoluor from "@/components/Lovecar/AirEvoluor" //空气进化器

//我的部分
import My from '@/components/My/Myindex'
import Mystart from '@/components/My/Mystart'
import Userstart from '@/components/My/Userstart'
import Fans from '@/components/My/Fans'
import Focus from '@/components/My/Focus'
import FeedbackRecord from '@/components/My/FeedbackRecord'//反馈记录
import ContactPerson from '@/components/My/ContactPerson' //紧急联系人
import ModifyPassword from '@/components/My/ModifyPassword'//修改密码
import MyFeedback from '@/components/My/MyFeedback' //我的返回
import MySetUp from '@/components/My/MySetUp'//我的设置
import Bus_test from '@/components/Lovecar/Bus_test.vue'
import Edictperson from '@/components/My/edictperson.vue'
import Myaddress from '@/components/My/myaddress.vue'
import Addmydress from '@/components/My/addmydress.vue'
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
import ToInform from '@/components/discover/component/inform' //举报此刻
// 智享部分
import Wit from '@/components/Wit/Wit.vue' //智享首页
import Dealer from '../components/Wit/dealer.vue' //经销商查询
import Recoment_bus from '../components/Wit/Recoment_bus.vue'
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
            }, {
                path: "/component/inform",
                component: ToInform
            },
            {
                path: "/lovecar",
                component: Lovecar
            },
            {
                path: "/Bus_test",
                component: Bus_test
            },
            {
                path: "/Authorize",
                component: Authorize
            },
            {
                path: "/Authorize_next",
                component: Authorize_next
            },
            {
                path: "/islogin",
                component: Islogin
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
            {
                path: "/wifiLink",
                naem: 'wifi直连',
                component: WifiLink
            },
            {
                path: "/wifiSetup",
                naem: 'wifi设置',
                component: WifiSetup
            },
            {
                path: "/fuelQuery",
                naem: '燃油查询',
                component: FuelQuery
            },
            {
                path: "/flowQuery",
                naem: '流量查询',
                component: FlowQuery
            },
            {
                path: "/intelligenceParking",
                naem: '智能停车G1',
                component: IntelligenceParking
            },
            {
                path: "/intelligenceParkingInfo",
                naem: '智能停车G2',
                component: IntelligentParkingInfo
            },
            {
                path: "/intelligenceParkingUninfo",
                naem: '智能停车G3',
                component: IntelligentParkingUninfo
            },
            {
                path: "/airConditionControl",
                naem: '空调控制',
                component: AirConditionControl
            },
            {
                path: "/adjustSeatTemper",
                naem: '座椅调温',
                component: AdjustSeatTemper
            },
            {
                path: "/windowControl",
                naem: '车窗控制',
                component: WindowControl
            },
            {
                path: "/skylightControl",
                naem: '天窗控制',
                component: SkylightControl
            },
            {
                path: "/airEvoluor",
                naem: '空气净化器',
                component: AirEvoluor
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
            {
                path: "/addmydress",
                name: '增加新地址',
                component: Addmydress
            },
            {
                path: "/edictperson",
                name: '修改个人信息',
                component: Edictperson
            },
            {
                path: "/feedbackRecord",
                name: '反馈记录',
                component: FeedbackRecord
            },
            {
                path: "/contactPerson",
                name: '紧急联系人',
                component: ContactPerson
            },
            {
                path: "/modifyPassword",
                name: '修改密码',
                component: ModifyPassword
            },
            {
                path: "/myFeedback",
                name: '我的反馈',
                component: MyFeedback
            },
            {
                path: "/mySetUp",
                name: '设置',
                component: MySetUp
            },
            {
                path: "/myaddress",
                name: '我的地址管理',
                component: Myaddress
            },

            //智享部分
            {
                path: '/wit',
                name: '智享首页',
                component: Wit
            },
            {
                path: '/wit/dealer',
                name: '经销商查询',
                component: Dealer
            },
            {
                path: '/wit/recoment_bus',
                name: '主推车型',
                component: Recoment_bus
            }
        ]
    }]
})