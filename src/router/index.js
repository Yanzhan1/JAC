import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
//状态管理
import store from '../store'
//导入axios
import axios from 'axios'

/**
 * 懒加载的工厂
 * @param {*} path
 */
const lazyLoad = (path) => () =>
    import (`@/components${path}`)

/**
 * 爱车部分
 */
const Lovecar = lazyLoad('/Lovecar/lovecar')
    // import Lovecar from '@/components/Lovecar/lovecar'
const RevisePinCode = lazyLoad('/Lovecar/RevisePinCode') //修改pin码
    // import RevisePinCode from '@/components/Lovecar/RevisePinCode' //修改pin码
const ForgetPinCode = lazyLoad('/Lovecar/ForgetPinCode') //忘记pin码
    // import ForgetPinCode from '@/components/Lovecar/ForgetPinCode' //忘记pin码
const ReviseSuccess = lazyLoad('/Lovecar/ReviseSuccess') //pin码修改成功
    // import ReviseSuccess from '@/components/Lovecar/ReviseSuccess' //pin码修改成功
const Authorize = lazyLoad('/Lovecar/Authorize.vue')
    // import Authorize from "@/components/Lovecar/Authorize.vue"
const Authorize_next = lazyLoad('/Lovecar/Authorize_next.vue')
    // import Authorize_next from "@/components/Lovecar/Authorize_next.vue"
const WifiLink = lazyLoad('/Lovecar/WifiLink') //wifi直连
    // import WifiLink from "@/components/Lovecar/WifiLink" //wifi直连
const WifiSetup = lazyLoad('/Lovecar/WifiSetup') //wifi设置
    // import WifiSetup from "@/components/Lovecar/WifiSetup" //wifi设置
const FuelQuery = lazyLoad('/Lovecar/FuelQuery') //燃油查询
    // import FuelQuery from "@/components/Lovecar/FuelQuery" //燃油查询
const Datechoose = lazyLoad('/Lovecar/Datechoose') //日期选择
    // import Datechoose from '@/components/Lovecar/Datechoose' //日期选择
const FlowQuery = lazyLoad('/Lovecar/FlowQuery') //流量查询
    // import FlowQuery from "@/components/Lovecar/FlowQuery" //流量查询
const FlowBuy = lazyLoad('/Lovecar/FlowBuy') //流量购买
    // import FlowBuy from "@/components/Lovecar/FlowBuy" //流量购买
const PlaceOrder = lazyLoad('/Lovecar/PlaceOrder') //提交流量订单
    // import PlaceOrder from "@/components/Lovecar/PlaceOrder" //提交流量订单
const PurchaseRecord = lazyLoad('/Lovecar/PurchaseRecord') //流量购买记录
    // import PurchaseRecord from "@/components/Lovecar/PurchaseRecord" //流量购买记录
const Islogin = lazyLoad('/Lovecar/islogin')
    // import Islogin from '@/components/Lovecar/islogin'
const IntelligenceParking = lazyLoad('/Lovecar/IntelligenceParking') //智能停车G1
    // import IntelligenceParking from "@/components/Lovecar/IntelligenceParking" //智能停车G1
const IntelligentParkingInfo = lazyLoad('/Lovecar/IntelligentParkingInfo') //智能停车G2
    // import IntelligentParkingInfo from "@/components/Lovecar/IntelligentParkingInfo" //智能停车G2
const IntelligentParkingUninfo = lazyLoad('/Lovecar/IntelligentParkingUninfo') //智能停车G3
    // import IntelligentParkingUninfo from "@/components/Lovecar/IntelligentParkingUninfo" //智能停车G3
const AirConditionControl = lazyLoad('/Lovecar/AirConditionControl') //自动空调控制
    // import AirConditionControl from "@/components/Lovecar/AirConditionControl" //自动空调控制
const AdjustSeatTemper = lazyLoad('/Lovecar/AdjustSeatTemper') //座椅调温
    // import AdjustSeatTemper from "@/components/Lovecar/AdjustSeatTemper" //座椅调温
const AdjustSeatAeration = lazyLoad('/Lovecar/AdjustSeatAeration') //座椅通风
    // import AdjustSeatAeration from "@/components/Lovecar/AdjustSeatAeration" //座椅通风
const WindowControl = lazyLoad('/Lovecar/WindowControl') //车窗控制
    // import WindowControl from "@/components/Lovecar/WindowControl" //车窗控制
const SkylightControl = lazyLoad('/Lovecar/SkylightControl') //天窗控制
    // import SkylightControl from "@/components/Lovecar/SkylightControl" //天窗控制
const SkylightClose = lazyLoad('/Lovecar/SkylightClose') //天窗关闭
    // import SkylightClose from "@/components/Lovecar/SkylightClose" //天窗关闭
const SkylightAll = lazyLoad('/Lovecar/SkylightAll') //天窗关闭
    // import SkylightAll from "@/components/Lovecar/SkylightAll" //天窗可开关
const AirEvoluor = lazyLoad('/Lovecar/AirEvoluor') //空气进化器
    // import AirEvoluor from "@/components/Lovecar/AirEvoluor" //空气进化器
const Electricairconditioning = lazyLoad('/Lovecar/Electricairconditioning') //电动空调调控
    // import Electricairconditioning from '@/components/Lovecar/Electricairconditioning' //电动空调调控


// 新能源部分
const Remotecharging = lazyLoad('/Lovecar/newenergy/Remotecharging') //充电功能页面
    // import Remotecharging from "@/components/Lovecar/newenergy/Remotecharging" //充电功能页面
const Preheat = lazyLoad('/Lovecar/newenergy/Preheat') //充电功能页面
    // import Preheat from "@/components/Lovecar/newenergy/Preheat" //充电功能页面
const NewenergyCar = lazyLoad('/Lovecar/newenergy/newenergyCar') //新能源车控主页
const Airwindow = lazyLoad('/Lovecar/newenergy/Airwindow') //充电功能页面
const Newaircondition = lazyLoad('/Lovecar/newenergy/Newaircondition') //新能源空调
const Newcarwindow = lazyLoad('/Lovecar/newenergy/Newcarwindow') //新能源空调

/**
 * 我的部分
 */
const My = lazyLoad('/My/Myindex')
    // import My from '@/components/My/Myindex'
const Mystart = lazyLoad('/My/Mystart')
    // import Mystart from '@/components/My/Mystart'
const Userstart = lazyLoad('/My/Userstart')
    // import Userstart from '@/components/My/Userstart'
const Fans = lazyLoad('/My/Fans') //我的粉丝
    // import Fans from '@/components/My/Fans' //我的粉丝
const Focus = lazyLoad('/My/Focus') //我的关注
    // import Focus from '@/components/My/Focus' //我的关注
const MyCollect = lazyLoad('/My/MyCollect.vue') //我的收藏
    // import MyCollect from '@/components/My/MyCollect.vue' //我的收藏
const Myactivity = lazyLoad('/My/Myactivity.vue') //我的活动
    // import Myactivity from '@/components/My/Myactivity.vue' //我的活动
const RegistryInfo = lazyLoad('/My/RegistryInfo.vue') //我的报名信息
    // import RegistryInfo from '@/components/My/RegistryInfo.vue' //我的报名信息
const MyPublish = lazyLoad('/My/MyPublish.vue') //我的发布
    // import MyPublish from '@/components/My/MyPublish.vue' //我的发布
const FeedbackRecord = lazyLoad('/My/FeedbackRecord') //反馈记录
    // import FeedbackRecord from '@/components/My/FeedbackRecord' //反馈记录
const FeedbackDetail = lazyLoad('/My/FeedbackDetail') //反馈详情
    // import FeedbackDetail from '@/components/My/FeedbackDetail' //反馈详情
const ContactPerson = lazyLoad('/My/ContactPerson') //紧急联系人
    // import ContactPerson from '@/components/My/ContactPerson' //紧急联系人
const ModifyLikeman = lazyLoad('/My/ModifyLikeman') //修改联系人
    // import ModifyLikeman from '@/components/My/ModifyLikeman' //修改联系人
const ModifyPassword = lazyLoad('/My/ModifyPassword') //修改密码
    // import ModifyPassword from '@/components/My/ModifyPassword' //修改密码
const ReviousePwdSuccess = lazyLoad('/My/ReviousePwdSuccess') //修改密码成功
    // import ReviousePwdSuccess from '@/components/My/ReviousePwdSuccess' //修改密码成功
const MyFeedback = lazyLoad('/My/MyFeedback') //我的反馈
    // import MyFeedback from '@/components/My/MyFeedback' //我的反馈
const MySetUp = lazyLoad('/My/MySetUp') //我的设置
    // import MySetUp from '@/components/My/MySetUp' //我的设置
const LoginVehicleState = lazyLoad('/My/LoginVehicleState') //机车登录状态-登入
    // import LoginVehicleState from '@/components/My/LoginVehicleState' //机车登录状态-登入
const LogoutVehicleState = lazyLoad('/My/LogoutVehicleState') //机车登录状态-登出
    // import LogoutVehicleState from '@/components/My/LogoutVehicleState' //机车登录状态-登出
const Bus_test = lazyLoad('/Lovecar/Bus_test.vue')
    // import Bus_test from '@/components/Lovecar/Bus_test.vue'
const Edictperson = lazyLoad('/My/edictperson.vue') //编辑个人信息
    // import Edictperson from '@/components/My/edictperson.vue' //编辑个人信息
const Myaddress = lazyLoad('/My/myaddress.vue') //我的地址管理
    // import Myaddress from '@/components/My/myaddress.vue' //我的地址管理
const Addmydress = lazyLoad('/My/addmydress.vue') //新增地址
    // import Addmydress from '@/components/My/addmydress.vue' //新增地址
const Changeaddress = lazyLoad('/My/changeaddress.vue') //新增地址
    // import Changeaddress from '@/components/My/changeaddress.vue' //新增地址
const My_dealer = lazyLoad('/My/My_dealer.vue') //我的经销商列表
    // import My_dealer from '../components/My/My_dealer.vue' //我的经销商列表
const MyOrder = lazyLoad('/My/MyOrder.vue') //我的订单
    // import MyOrder from '../components/My/MyOrder.vue' //我的订单
const FlowOrderDetails = lazyLoad('/My/FlowOrderDetails.vue') //流量订单详情
    // import FlowOrderDetails from '../components/My/FlowOrderDetails.vue' //流量订单详情
const MallOrderDetails = lazyLoad('/My/MallOrderDetails.vue') //商城订单详情
    // import MallOrderDetails from '../components/My/MallOrderDetails.vue' //商城订单详情
const MyWl = lazyLoad('/My/MyWl.vue') //我的物流
    // import MyWl from '../components/My/MyWl.vue' //我的物流
const Compontent = lazyLoad('/My/Compontent.vue') //评价
    // import Compontent from '../components/My/Compontent.vue' //评价
const Recommended = lazyLoad('/My/Recommended') //推荐码
    // import Recommended from '../components/My/Recommended' //推荐码
const OrderDetails = lazyLoad('/My/OrderDetails.vue') //订单详情
    // import OrderDetails from '..//components/My/OrderDetails.vue' //订单详情
const MyBus = lazyLoad('/My/MyBus') //我的车辆
    // import MyBus from '..//components/My/MyBus' //我的车辆
const PlateBind = lazyLoad('/My/PlateBind') //车牌绑定
    // import PlateBind from '..//components/My/PlateBind' //车牌绑定
const AddBus = lazyLoad('/My/AddBus') //添加车辆
    // import AddBus from '..//components/My/AddBus' //添加车辆
const TwoMa = lazyLoad('/My/TwoMa.vue') //二维码
    // import TwoMa from '../components/My/TwoMa.vue' //二维码
const Test_Result = lazyLoad('/Lovecar/Test_Reault.vue') //测试结果
    // import Test_Result from '../components/Lovecar/Test_Reault.vue' //测试结果
const WbRecode = lazyLoad('/My/WbRecode.vue') //维保记录
    // import WbRecode from '../components/My/WbRecode.vue' //维保记录
const ScoreDetails = lazyLoad('/My/ScoreDetails.vue') //会员积分详情
    // import ScoreDetails from '../components/My/ScoreDetails.vue' //会员积分详情
const DotComment = lazyLoad('/My/DotComment.vue') //网点评分
    // import DotComment from '../components/My/DotComment.vue' //网点评分
const Agreement = lazyLoad('/My/Agreement.vue') //用户协议
    // import Agreement from '../components/My/Agreement.vue' //用户协议
import DotCommentDetail from '../components/My/DotCommentDetail.vue' //网点评分详情页
// const Changemobile = lazyLoad('My/Changemobile.vue') //修改手机号
import Changemobile from '../components/My/Changemobile.vue'
import Maintenancedetail from '../components/My/Maintenancedetail.vue'

/**
 * 消息
 */
const News = lazyLoad('/news/News.vue') //消息
    // import News from '../components/news/News.vue' //消息
const StyNews = lazyLoad('/news/StyNews.vue') //系统消息
    // import StyNews from '../components/news/StyNews.vue' //系统消息
const ActiveNew = lazyLoad('/news/ActiveNew.vue') //活动
    // import ActiveNew from '../components/news/ActiveNew.vue' //活动
const Discuss = lazyLoad('/news/Discuss.vue') //评论
    // import Discuss from '../components/news/Discuss.vue' //评论
const Informations = lazyLoad('/news/information.vue')
    // import Informations from '../components/news/information.vue'
const Info_details = lazyLoad('/news/info_details.vue')
    // import Info_details from '../components/news/info_details.vue'
const Activitys = lazyLoad('/news/activitys.vue')
    // import Activitys from '../components/news/activitys.vue'
const Comments = lazyLoad('/news/comments.vue')
    // import Comments from '../components/news/comments.vue'
const Others = lazyLoad('/news/others.vue')
    // import Others from '../components/news/others.vue'

/**
 * 发现部分
 */
const Discover = lazyLoad('/discover/discover')

import Recommend from '@/components/discover/recommend/recommend' //推荐首页
import Activity from '@/components/discover/activity/activity' //活动首页
import Information from '@/components/discover/information/information' //资讯首页
import Now from '@/components/discover/now/now' //此刻首页

const ActivityDetail = lazyLoad('/discover/activity/activityDetail') //活动详情
const ActivityLive = lazyLoad('/discover/activity/activityLive') //活动直播
const InformationDetail = lazyLoad('/discover/information/informationDetail') //资讯详情
const NowDetail = lazyLoad('/discover/now/nowDetail') //此刻详情
const ActivityDetailStatic = lazyLoad('/discover/share/activityDetail') //分享出去的活动详情
    // const ActivityLiveStatic = lazyLoad('/discover/share/activityLive') //分享出去的活动直播详情
const InformationDetailStatic = lazyLoad('/discover/share/informationDetail') //分享出去的资讯详情
const NowDetailStatic = lazyLoad('/discover/share/nowDetail') //分享出去的此刻详情
const PictureDetail = lazyLoad('/discover/activity/pictureDetail') //晒图详情
const CommentList = lazyLoad('/discover/component/commentList') //超过4条的评论列表(公共)
    // const AddPic = lazyLoad('/discover/now/addPic') //新增此刻
const ToSign = lazyLoad('/discover/activity/toSign') //活动报名
const ToInform = lazyLoad('/discover/component/inform') //举报此刻

/**
 * 智享部分
 */
const Wit = lazyLoad('/Wit/Wit.vue') //智享首页
    // import Wit from '@/components/Wit/Wit.vue' //智享首页
const Allbus = lazyLoad('/Wit/Allbus.vue') //主推车型
    // import Allbus from '@/components/Wit/Allbus.vue' //主推车型
const HotSell = lazyLoad('/Wit/HotSell.vue') //热销车型
    // import HotSell from '@/components/Wit/HotSell.vue' //热销车型
const IntelligentCar = lazyLoad('/Wit/IntelligentCar.vue') //智能选车
    // import IntelligentCar from '@/components/Wit/IntelligentCar.vue' //智能选车
const Dealer = lazyLoad('/Wit/dealer.vue') //经销商查询
    // import Dealer from '../components/Wit/dealer.vue' //经销商查询
const Recoment_bus = lazyLoad('/Wit/Recoment_bus.vue')
    // import Recoment_bus from '../components/Wit/Recoment_bus.vue'
const Search_net = lazyLoad('/Wit/Search_net.vue') //网点查询
    // import Search_net from '../components/Wit/Search_net.vue' //网点查询
const Pre_weib = lazyLoad('/Wit/pre_weib.vue') //维保预约
    // import Pre_weib from '../components/Wit/pre_weib.vue' //维保预约
const Characteristic = lazyLoad('/Wit/Characteristic') //车系特色
    // import Characteristic from '../components/Wit/Characteristic' //车系特色
const Configure = lazyLoad('/Wit/Configure') //配置参数
    // import Configure from '../components/Wit/Configure' //配置参数
const Reserve = lazyLoad('/Wit/Reserve') //车辆预定
    // import Reserve from '../components/Wit/Reserve' //车辆预定
const CarChoose = lazyLoad('/Wit/tabChooseCar/CarChoose.vue') //车型
    // import CarChoose from '../components/Wit/tabChooseCar/CarChoose.vue' //车型
const CarChoosenew = lazyLoad('/Wit/CarChoosenew.vue') //车辆预定
    // import CarChoosenew from '../components/Wit/CarChoosenew.vue' //车辆预定
const ColorChoose = lazyLoad('/Wit/tabChooseCar/ColorChoose.vue') //颜色
    // import ColorChoose from '../components/Wit/tabChooseCar/ColorChoose.vue' //颜色
const RimChoose = lazyLoad('/Wit/tabChooseCar/RimChoose.vue') //轮辋
    // import RimChoose from '../components/Wit/tabChooseCar/RimChoose.vue' //轮辋
const VehicleChoose = lazyLoad('/Wit/tabChooseCar/VehicleChoose.vue') //车辆
    // import VehicleChoose from '../components/Wit/tabChooseCar/VehicleChoose.vue' //车辆
const PreviewChoose = lazyLoad('/Wit/PreviewChoose.vue') //
    // import PreviewChoose from '../components/Wit/PreviewChoose.vue' //
const TabChooseCar = lazyLoad('/Wit/TabChooseCar.vue') //车辆预定
    // import TabChooseCar from '../components/Wit/TabChooseCar.vue' //车辆预定
const Earnest = lazyLoad('/Wit/Earnest') //支付定金页面
    // import Earnest from '../components/Wit/Earnest' //支付定金页面

/**
 * 临时首页 ios审核用
 */
const indexLogin = lazyLoad('/index_login/index_login')
const indexLoginDetail1 = lazyLoad('/index_login/index_login_detail1')
const indexLoginDetail2 = lazyLoad('/index_login/index_login_detail2')
const indexLoginDetail3 = lazyLoad('/index_login/index_login_detail3')

Vue.use(Router)

const router = new Router({
    mode: 'hash',
    scrollBehavior(to, from, savedPosition) { //商品列表进去详情，返回时回到原来的高度
        if (savedPosition) {
            const list = ['/recommend', '/information', '/activity', '/now']

            if (list.includes(to.path)) {
                const swiperSlides = document.querySelectorAll('.swiperSlide')

                swiperSlides[to.meta.index].scrollTop = to.meta.savedScrollTop || 0
            }
            return savedPosition
        } else {
            if (from.meta.keepAlive) {
                from.meta.savedPosition = document.body.scrollTop
            }
            return {
                x: 0,
                y: to.meta.savedPosition || 0
            }
        }
    },
    // mode: 'hash',
    routes: [{
        path: '/',
        component: Main,
        children: [{
                path: '/',
                redirect: '/discover'
            },
            {
                path: "/indexLogin",
                component: indexLogin
            },
            {
                path: '/indexLogin/indexLoginDetail1',
                component: indexLoginDetail1
            },
            {
                path: '/indexLogin/indexLoginDetail2',
                component: indexLoginDetail2
            },
            {
                path: '/indexLogin/indexLoginDetail3',
                component: indexLoginDetail3
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
                        keepAlive: true,
                        index: 0,

                    }
                }, {
                    path: "/activity",
                    component: Activity,
                    meta: {
                        keepAlive: true,
                        index: 2
                    }
                }, {
                    path: "/information",
                    component: Information,
                    meta: {
                        keepAlive: true,
                        index: 1
                    }
                }, {
                    path: "/now",
                    component: Now,
                    meta: {
                        keepAlive: true,
                        index: 3
                    }
                }]
            },
            {
                path: "/activity/activityDetail",
                component: ActivityDetail
            },
            {
                path: "/activity/activityLive",
                component: ActivityLive
            },
            {
                path: "/information/informationDetail",
                component: InformationDetail
            }, {
                path: "/now/nowDetail",
                component: NowDetail
            },
            {
                path: "/share/activityDetail",
                component: ActivityDetailStatic
            },
            // {
            //     path: "/share/activityLive",
            //     component: ActivityLiveStatic
            // },
            {
                path: "/share/informationDetail",
                component: InformationDetailStatic
            }, {
                path: "/share/nowDetail",
                component: NowDetailStatic
            },
            {
                path: "/activity/pictureDetail",
                component: PictureDetail
            },
            {
                path: "/component/commentList",
                component: CommentList
            },
            // {
            //     path: "/now/addPic",
            //     component: AddPic
            // },
            {
                path: "/activity/toSign",
                component: ToSign
            }, {
                path: "/component/inform",
                component: ToInform
            },
            {
                path: "/lovecar",
                component: Lovecar,
                // beforeEnter: (to, from, next) => {
                //     alert(Vue.$store.state.tsppin.headers.identityParam)
                //     next((vm) => {
                //         // alert(vm.$store.state.tsppin.headers.identityParam)

                //     })
                // }
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
                name: 'Authorize_next',
                component: Authorize_next
            },
            {
                path: "/islogin",
                component: Islogin
            },

            {
                path: "/lovecar/revisePinCode",
                name: '修改pin码',
                component: RevisePinCode
            },
            {
                path: "/lovecar/forgetPinCode",
                name: '忘记pin码',
                component: ForgetPinCode,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: "/lovecar/reviseSuccess",
                name: '修改pin成功',
                component: ReviseSuccess
            },
            {
                path: "/lovecar/wifiLink",
                name: 'wifi直连',
                component: WifiLink
            },
            {
                path: "/lovecar/wifiSetup",
                name: 'wifi设置',
                component: WifiSetup
            },
            {
                path: "/lovecar/fuelQuery",
                name: '燃油查询',
                component: FuelQuery
            },
            {
                path: "/Datechoose",
                name: '日期选择',
                component: Datechoose
            },
            {
                path: "/lovecar/flowQuery",
                name: '流量查询',
                component: FlowQuery
            },
            {
                path: "/lovecar/flowBuy",
                name: '流量购买',
                component: FlowBuy
            },
            {
                path: "/lovecar/placeOrder",
                name: '提交订单',
                component: PlaceOrder
            },
            {
                path: "/lovecar/purchaseRecord",
                name: '购买记录',
                component: PurchaseRecord
            },
            {
                path: "/lovecar/intelligenceParking",
                name: '智能停车G1',
                component: IntelligenceParking
            },
            {
                path: "/lovecar/intelligenceParkingInfo",
                name: '智能停车G2',
                component: IntelligentParkingInfo
            },
            {
                path: "/lovecar/intelligenceParkingUninfo",
                name: '智能停车G3',
                component: IntelligentParkingUninfo
            },
            {
                path: "/lovecar/airConditionControl",
                name: '空调控制',
                component: AirConditionControl
            },
            {
                path: "/lovecar/Electricairconditioning",
                name: '电动空调控制',
                component: Electricairconditioning
            },
            {
                path: "/lovecar/adjustSeatTemper",
                name: '座椅调温',
                component: AdjustSeatTemper
            },
            {
                path: "/lovecar/adjustSeatAeration",
                name: '座椅通风',
                component: AdjustSeatAeration
            },
            {
                path: "/lovecar/windowControl",
                name: '车窗控制',
                component: WindowControl
            },
            {
                path: "/lovecar/skylightControl",
                name: '天窗控制',
                component: SkylightControl
            },
            {
                path: "/lovecar/skylightClose",
                name: '天窗关闭',
                component: SkylightClose
            },
            {
                path: "/lovecar/SkylightAll",
                name: '天窗可开关',
                component: SkylightAll
            },
            {
                path: "/lovecar/airEvoluor",
                name: '空气净化器',
                component: AirEvoluor
            },
            //新能源
            {
                path: "/newenergy/remotecharging",
                name: '充电功能',
                component: Remotecharging
            },
            {
                path: "/newenergy/preheat",
                name: '远程预热',
                component: Preheat
            },
            {
                path: "/newenergyCar",
                name: '新能源主页',
                component: NewenergyCar
            },
            {
                path: "/newenergy/airwindow",
                name: '新能源天窗可开关',
                component: Airwindow
            },
            {
                path: "/newenergy/newaircondition",
                name: '新能源空调',
                component: Newaircondition
            },
            {
                path: "/newenergy/newcarwindow",
                name: '新能源车窗',
                component: Newcarwindow
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
                path: "/myindex/changeMobile",
                name: "修改手机号",
                component: Changemobile
            },
            {
                path: "/myCollect",
                component: MyCollect
            },
            {
                path: "/myactivity",
                component: Myactivity
            },
            {
                path: "/registryInfo",
                component: RegistryInfo
            },
            {
                path: "/myPublish",
                component: MyPublish
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
                path: "/myindex/feedbackRecord",
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
                path: "/myindex/reviousePwdSuccess",
                name: '修改密码成功',
                component: ReviousePwdSuccess
            },
            {
                path: "/myindex/myFeedback",
                name: '我的反馈',
                component: MyFeedback
            },
            {
                path: "/myindex/loginVehicleState",
                name: '机车登入',
                component: LoginVehicleState
            },
            {
                path: "/myindex/logoutVehicleState",
                name: '机车登出',
                component: LogoutVehicleState
            },
            {
                path: "/myindex/mySetUp",
                name: '设置',
                component: MySetUp
            }, {
                path: "/myindex/wbrecode",
                name: '维保记录',
                component: WbRecode
            }, {
                path: "/myindex/dotcomment",
                name: '网点评分',
                component: DotComment
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
                path: "/myindex/flowOrderDetails",
                name: '流量订单详情',
                component: FlowOrderDetails
            }, {
                path: "/myindex/mallOrderDetails",
                name: '商城订单详情',
                component: MallOrderDetails
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
            {
                path: "my/scoredetails",
                name: '积分详情',
                component: ScoreDetails
            },
            {
                path: "Agreement",
                name: '协议',
                component: Agreement
            },
            {
                path: "DotCommentDetail",
                name: '网点详情',
                component: DotCommentDetail
            },
            {
                path: "/myindex/Maintenancedetail",
                name: '维保详情',
                component: Maintenancedetail
            },
            // 消息
            {
                path: "/news",
                name: '消息',
                component: News
            },
            {
                path: '/info/information',
                name: '系统通知',
                component: Informations
            },
            {
                path: '/info/info_details',
                name: 'info_details',
                component: Info_details
            },
            {
                path: '/info/activitys',
                name: '活动',
                component: Activitys
            },
            {
                path: '/info/comments',
                name: '评论',
                component: Comments
            },
            {
                path: "/stynew",
                name: '系统消息',
                component: StyNews
            },
            {
                path: "/info/others",
                name: '其他消息',
                component: Others
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
                component: Wit,
                meta: {
                    keepAlive: false
                }
            },
            {
                path: '/wit/hotSell',
                name: '热销车型',
                component: HotSell
            },
            {
                path: '/wit/intelligentCar',
                name: '智能选车',
                component: IntelligentCar
            },
            {
                path: '/wit/dealer',
                name: '经销商查询',
                component: Dealer,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/wit/tabChooseCar',
                name: '车型选择',
                component: TabChooseCar,
                children: [{
                        path: '/',
                        redirect: "/CarChoose",
                        // name: '车型选择',
                        component: CarChoose
                    },
                    {
                        path: '/CarChoose',
                        name: '车型选择',
                        component: CarChoose
                    },
                    {
                        path: '/ColorChoose',
                        name: '颜色选择',
                        component: ColorChoose
                    },
                    {
                        path: '/RimChoose',
                        name: '轮辋选择',
                        component: RimChoose
                    },
                    {
                        path: '/VehicleChoose',
                        name: '轮辋选择',
                        component: VehicleChoose
                    }
                ]
            },
            {
                path: '/wit/PreviewChoose',
                name: '选配预览',
                component: PreviewChoose
            },

            {
                path: '/wit/CarChoosenew',
                name: '车型选择新',
                component: CarChoosenew
            },
            {

                path: '/wit/recoment_bus',
                name: '主推车型',
                component: Recoment_bus,
                meta: {
                    keepAlive: true
                }
            },
            {

                path: '/wit/Allbus',
                name: '全部车型',
                component: Allbus,
                meta: {
                    keepAlive: true
                }
            },
            {
                path: '/wit/search_net',
                name: '网点查询',
                component: Search_net,
                meta: {
                    keepAlive: true
                }

            }, {
                path: '/wit/pre_weib',
                name: '维保预约',
                component: Pre_weib,
                // meta: {
                //     keepAlive: true
                // }
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
            {
                path: '/wit/Earnest',
                name: '车辆定金页面',
                component: Earnest
            },
        ]
    }]
})

const $http = axios;
const $store = store
router.beforeEach((to, from, next) => {

    try {

        if (!$http.defaults.headers.common['timaToken']) {
            var userInfo,
                mobileStatusBar;
            if (isMobile.iOS()) {
                userInfo = JSON.parse(getCookie('userInfo'))
            } else if (isMobile.Android()) {
                userInfo = JSON.parse(js2android.getUserInfo())
                mobileStatusBar = js2android.getStatusBarHeight()
                $store.dispatch('MOBILESTATUSBAR', mobileStatusBar)
            }
            if (userInfo && userInfo.no) {
                // alert(JSON.stringify(userInfo))
                $store.dispatch('isLogin', true);
                // 江淮用户系统的需要通过no字段作为用户的唯一标识，所以将no作为userId使用
                $store.dispatch('userId', userInfo.no);
                $store.dispatch('userInfo', userInfo);
                //              alert('原生传过来的token:'+ $store.state.token)
                // alert(
                //   "store里面的值，" +
                //   "vin: "+ $store.state.vin +
                //   " userId: "+ $store.state.userId +
                //   " no: "+ $store.state.no +
                //   " token: "+ $store.state.token +
                //   " mobile: "+ $store.state.mobile
                // )
            } else {
                $store.dispatch('isLogin', false);
                $store.dispatch('userId', null);
                //$store.dispatch('userInfo', null);
                // TODO 跳转至登录页面 待处理
            }
            //          alert($store.state.token)
            console.log($store.state.token)
            $http.defaults.headers.common['timaToken'] = $store.state.token;
            // this.$http.post(Lovecar.vehicle, {}).then((res) => {
            //         console.log(res)
            //     })
            //             alert("axios里面的token值： "+$http.defaults.headers.common['timaToken'])
        }
        next()
    } catch (e) {
        next()
    }
})
export default router;