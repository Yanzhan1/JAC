import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//爱车部分
import Lovecar from '@/components/Lovecar/lovecar'
import RevisePinCode from '@/components/Lovecar/RevisePinCode'
import ForgetPinCode from '@/components/Lovecar/ForgetPinCode'
import ReviseSuccess from '@/components/Lovecar/ReviseSuccess'
import Authorize from "@/components/Lovecar/Authorize.vue"
import Authorize_next from "@/components/Lovecar/Authorize_next.vue"
import WifiLink from "@/components/Lovecar/WifiLink"
import WifiSetup from "@/components/Lovecar/WifiSetup"
import FuelQuery from "@/components/Lovecar/FuelQuery"
import FlowQuery from "@/components/Lovecar/FlowQuery"
import Islogin from '../components/Lovecar/islogin.vue'
import IntelligenceParking from "@/components/Lovecar/IntelligenceParking"
import IntelligentParkingInfo from "@/components/Lovecar/IntelligentParkingInfo"
import IntelligentParkingUninfo from "@/components/Lovecar/IntelligentParkingUninfo"
import AirConditionControl from "@/components/Lovecar/AirConditionControl"
import InputCount from "@/components/publicmodel/InputCount"

//我的部分
import My from '@/components/My/Myindex'
import Mystart from '@/components/My/Mystart'
import Userstart from '@/components/My/Userstart'
import Fans from '@/components/My/Fans'
import Focus from '@/components/My/Focus'
import FeedbackRecord from '@/components/My/FeedbackRecord'
import ContactPerson from '@/components/My/ContactPerson'
import ModifyPassword from '@/components/My/ModifyPassword'
import MyFeedback from '@/components/My/MyFeedback'
import MySetUp from '@/components/My/MySetUp'
import Bus_test from '@/components/Lovecar/Bus_test.vue'
import Edictperson from '@/components/My/edictperson.vue' //编辑个人信息
import Myaddress from '@/components/My/myaddress.vue' //我的地址管理
import Addmydress from '@/components/My/addmydress.vue' //新增地址
import My_dealer from '../components/My/My_dealer.vue' //我的经销商列表
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
import Search_net from '../components/Wit/Search_net.vue' //网点查询
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
                path: "/inputCount",
                naem: 'input计数器',
                component: InputCount
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
            }, {
                path: "/my_dealer",
                name: '我的经销商列表',
                component: My_dealer
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
            }, {
                path: '/wit/search_net',
                name: '网点查询',
                component: Search_net
            }
        ]
    }]
})