import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//爱车部分
import Lovecar from '@/components/Lovecar/lovecar'
import RevisePinCode from '@/components/Lovecar/RevisePinCode' //修改pin码
import ForgetPinCode from '@/components/Lovecar/ForgetPinCode' //忘记pin码
import ReviseSuccess from '@/components/Lovecar/ReviseSuccess' //pin码修改成功
import Authorize from "@/components/Lovecar/Authorize.vue"
import Authorize_next from "@/components/Lovecar/Authorize_next.vue"
import WifiLink from "@/components/Lovecar/WifiLink" //wifi直连
import WifiSetup from "@/components/Lovecar/WifiSetup" //wifi设置
import FuelQuery from "@/components/Lovecar/FuelQuery" //燃油查询
import Datechoose from '@/components/Lovecar/Datechoose' //日期选择
import FlowQuery from "@/components/Lovecar/FlowQuery" //流量查询
import Islogin from '../components/Lovecar/islogin.vue'
import IntelligenceParking from "@/components/Lovecar/IntelligenceParking" //智能停车G1
import IntelligentParkingInfo from "@/components/Lovecar/IntelligentParkingInfo" //智能停车G2
import IntelligentParkingUninfo from "@/components/Lovecar/IntelligentParkingUninfo" //智能停车G3
import AirConditionControl from "@/components/Lovecar/AirConditionControl" //空调控制
import AdjustSeatTemper from "@/components/Lovecar/AdjustSeatTemper" //座椅调温
import WindowControl from "@/components/Lovecar/WindowControl" //车窗控制
import SkylightControl from "@/components/Lovecar/SkylightControl" //天窗控制
import AirEvoluor from "@/components/Lovecar/AirEvoluor" //空气进化器

//我的部分
import My from '@/components/My/Myindex'
import Mystart from '@/components/My/Mystart'
import Userstart from '@/components/My/Userstart'
import Fans from '@/components/My/Fans'
import Focus from '@/components/My/Focus'
import FeedbackRecord from '@/components/My/FeedbackRecord' //反馈记录
import FeedbackDetail from '@/components/My/FeedbackDetail' //反馈详情
import ContactPerson from '@/components/My/ContactPerson' //紧急联系人
import ModifyLikeman from '@/components/My/ModifyLikeman' //修改联系人
import ModifyPassword from '@/components/My/ModifyPassword' //修改密码
import MyFeedback from '@/components/My/MyFeedback' //我的返回
import MySetUp from '@/components/My/MySetUp' //我的设置
import Bus_test from '@/components/Lovecar/Bus_test.vue'
import Edictperson from '@/components/My/edictperson.vue' //编辑个人信息
import Myaddress from '@/components/My/myaddress.vue' //我的地址管理
import Addmydress from '@/components/My/addmydress.vue' //新增地址
import Changeaddress from '../components/My/changeaddress' //编辑地址
import My_dealer from '../components/My/My_dealer.vue' //我的经销商列表
import MyOrder from '../components/My/MyOrder.vue' //我的订单
import MyWl from '../components/My/MyWl.vue' //我的物流
import Compontent from '../components/My/Compontent.vue' //评价
import Recommended from '../components/My/Recommended' //推荐码
import OrderDetails from '..//components/My/OrderDetails.vue' //订单详情
import MyBus from '..//components/My/MyBus' //我的车辆
import PlateBind from '..//components/My/PlateBind' //车牌绑定
import AddBus from '..//components/My/AddBus' //添加车辆
import TwoMa from '../components/My/TwoMa.vue' //二维码
import Test_Result from '../components/Lovecar/Test_Reault.vue' //测试结果
// 消息
import News from '../components/news/News.vue' //消息
import StyNews from '../components/news/StyNews.vue' //系统消息
import ActiveNew from '../components/news/ActiveNew.vue' //活动
import Discuss from '../components/news/Discuss.vue' //评论
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
import Pre_weib from '../components/Wit/pre_weib.vue' //维保预约
import Characteristic from '../components/Wit/Characteristic' //车系特色
import Configure from '../components/Wit/Configure' //配置参数
import Reserve from '../components/Wit/Reserve' //车辆预定
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
                path: "/lovecar/revisePinCode",
                naem: '修改pin码',
                component: RevisePinCode
            },
            {
                path: "/lovecar/forgetPinCode",
                naem: '忘记pin码',
                component: ForgetPinCode
            },
            {
                path: "/lovecar/reviseSuccess",
                naem: '修改pin成功',
                component: ReviseSuccess
            },
            {
                path: "/lovecar/wifiLink",
                naem: 'wifi直连',
                component: WifiLink
            },
            {
                path: "/lovecar/wifiSetup",
                naem: 'wifi设置',
                component: WifiSetup
            },
            {
                path: "/lovecar/fuelQuery",
                naem: '燃油查询',
                component: FuelQuery
            },
            {
                path: "/Datechoose",
                naem: '日期选择',
                component: Datechoose
            },
            {
                path: "/flowQuery",
                naem: '流量查询',
                component: FlowQuery
            },
            {
                path: "/lovecar/intelligenceParking",
                naem: '智能停车G1',
                component: IntelligenceParking
            },
            {
                path: "/lovecar/intelligenceParkingInfo",
                naem: '智能停车G2',
                component: IntelligentParkingInfo
            },
            {
                path: "/lovecar/intelligenceParkingUninfo",
                naem: '智能停车G3',
                component: IntelligentParkingUninfo
            },
            {
                path: "/lovecar/airConditionControl",
                naem: '空调控制',
                component: AirConditionControl
            },
            {
                path: "/lovecar/adjustSeatTemper",
                naem: '座椅调温',
                component: AdjustSeatTemper
            },
            {
                path: "/lovecar/windowControl",
                naem: '车窗控制',
                component: WindowControl
            },
            {
                path: "/lovecar/skylightControl",
                naem: '天窗控制',
                component: SkylightControl
            },
            {
                path: "/lovecar/airEvoluor",
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
                path: "/changeaddress",
                name: 'changeaddress',
                component: Changeaddress
            },
            {
                path: "/edictperson",
                name: '修改个人信息',
                component: Edictperson
            },
            {
                path: "/myindex//feedbackRecord",
                name: '反馈记录',
                component: FeedbackRecord
            },
            {
                path: "/myindex/feedbackDetail",
                name: '反馈详情',
                component: FeedbackDetail
            },
            {
                path: "/myindex/contactPerson",
                name: '紧急联系人',
                component: ContactPerson
            },
            {
                path: "/myindex/modifyLikeman",
                name: '修改联系人',
                component: ModifyLikeman
            },
            {
                path: "/myindex/modifyPassword",
                name: '修改密码',
                component: ModifyPassword
            },
            {
                path: "/myindex/myFeedback",
                name: '我的反馈',
                component: MyFeedback
            },
            {
                path: "/myindex/mySetUp",
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
            {
                path: "/myorder",
                name: '我的订单',
                component: MyOrder
            }, {
                path: "/mywl",
                name: '我的物流',
                component: MyWl
            }, {
                path: "/compontent",
                name: '评价',
                component: Compontent
            },
            {
                path: "/Recommended",
                name: '推荐码',
                component: Recommended
            }, {
                path: "/orderdetails",
                name: '订单详情',
                component: OrderDetails
            },
            {
                path: "/myindex/myBus",
                name: '我的车辆',
                component: MyBus
            },
            {
                path: "/myindex/plateBind",
                name: '车牌绑定',
                component: PlateBind
            },
            {
                path: "/myindex/addBus",
                name: '添加车辆',
                component: AddBus
            }, {
                path: "/twoma",
                name: '二维码',
                component: TwoMa
            }, {
                path: "/test_result",
                name: '测试结果',
                component: Test_Result
            },
            // 消息
            {
                path: "/news",
                name: '消息',
                component: News
            }, {
                path: "/stynew",
                name: '系统消息',
                component: StyNews
            },
            {
                path: "/activenew",
                name: '活动',
                component: ActiveNew
            }, {
                path: "/discuss",
                name: '评论',
                component: Discuss
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
            }, {
                path: '/wit/pre_weib',
                name: '维保预约',
                component: Pre_weib
            },
            {
                path: '/wit/Characteristic',
                name: '车系特色',
                component: Characteristic
            },
            {
                path: '/wit/Configure',
                name: '配置参数',
                component: Configure
            },
            {
                path: '/wit/Reserve',
                name: '车辆预定',
                component: Reserve
            },
        ]
    }]
})