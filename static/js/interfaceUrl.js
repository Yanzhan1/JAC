// const constants = require('@constants/index.js')
// const { apiHost } = constants

// console.log(`执行环境${apiHost}`)
// var indexip = `${apiHost}/api/dk-dm-portal-api`
// //测试环境域名
var host = '//test.jac.timanetwork.net'

// //江淮内网测试环境域名
// var host = '//jacsupperapptest.jac.com.cn'

//云环境域名
// var host = 'https://jacsupperappuat.jac.com.cn/'

//生产环境域名403
// var host = '//jacsupperapp.jac.com.cn'

var indexip = host + '/api/dk-dm-portal-api'
var userip = host + '/api'
var focusip = host + '/api/dk-pr-svr' //uat
var point = 'http://192.168.1.141:8868' //埋点
let versionNumber = '?versionNumber=1.0.0' //添加版本号尝试解决cdn缓存的问题
    //服务器-智享
var mip = host + '/api/jac-automobile-manage/automobilemanage' //智享
var witlocal = host + '/api/jac-energy/jacenergy' //线上
    // var witlocal = 'http://172.21.12.74:8086/jacenergy' //杨毅飞本地服务器
    //服务器-admin(跟用户有关即我的)
var mips = host + '/api/jac-admin' //地区
var jf = host + '/' //跟积分有关的
    // var love_car = host+'/jvconnectedcar' //爱车
var love_car = host + '/api/jac-car-control' //爱车
    // var love_car = 'http://172.21.12.74:8084' //爱车
    //服务器→反馈记录
var rec = host + '/api/jac-enjoy-service/'
    // H5外网地址，分享用
var waiwangip = window.location.protocol + host + '/JACH5/#/';
var filestore = host + '/api/dk-filestore-svr'
var POINT = {
        addpoint: indexip + '/buriedPoint/buriedPointModuleStart', //tab切换时候埋点,车型切换时候埋点
        buryingPointShare: indexip + '/buriedPoint/buryingPointShare', //分享时候埋点
    }
    //首页
window.INDEXMESSAGE = {
    getRecommend: indexip + '/recommend/recommendList' + versionNumber, //首页-推荐
    getInfomation: indexip + '/information/indexList' + versionNumber, //首页-资讯
    getActivity: indexip + '/activity/indexList' + versionNumber, //首页-活动
    getNow: indexip + '/moment/indexList', //首页-此刻
    getQuestion: indexip + '/question/indexList' + versionNumber, //首页-问答
}
window.DISCOVERMESSAGE = {
        weiSignGetWeiSign: indexip + '/weiSign/getWeiSign' + versionNumber, // 获取微信二次分享的参数
        /*标签*/
        getLabels: indexip + '/label/getLabels', //获取标签
        /*新增用户兴趣车型*/
        addUserBindingOtherModules: mips + '/admin/userBindingOtherModules/addUserBindingOtherModules' + versionNumber,
        /*查询用户兴趣车型*/
        searchUserBindingOtherModulesOne: mips + '/admin/userBindingOtherModules/searchUserBindingOtherModulesOne' + versionNumber,
        /*资讯*/
        informationGiveLike: indexip + '/userLike/giveInformationLike' + versionNumber, //资讯点赞
        informationRemoveLike: indexip + '/userLike/removeInformationLike' + versionNumber, //资讯取消点赞
        informationCollection: indexip + '/userCollection/collectionInformation' + versionNumber, //资讯收藏
        informationRemoveCollection: indexip + '/userCollection/unCollection/Information' + versionNumber, //资讯取消收藏
        informationDetail: indexip + '/information/detail' + versionNumber, //资讯详情
        informationRead: indexip + '/readerHistory/information' + versionNumber, //资讯浏览量
        informationComment: indexip + '/userComment/informationComment' + versionNumber, //资讯评论
        informationCommentList: indexip + '/userComment/informationCommentList' + versionNumber, //资讯评论列表
        informationCommentGiveLike: indexip + '/userLike/giveCommentLike' + versionNumber, //资讯评论点赞
        informationCommentRemoveLike: indexip + '/userLike/removeCommentLike' + versionNumber, //资讯评论取消点赞
        /*活动*/
        getActivityDetail: indexip + '/activity/detail' + versionNumber, //活动详情
        activetyGiveLike: indexip + '/userLike/giveActivityLike' + versionNumber, //活动点赞
        activetyRemoveLike: indexip + '/userLike/removeActivityLike' + versionNumber, //活动取消点赞
        activetyCollection: indexip + '/userCollection/collectionActivity' + versionNumber, //活动收藏
        activetyRemoveCollection: indexip + '/userCollection/unCollection/Activity' + versionNumber, //活动取消收藏
        activetyRead: indexip + '/readerHistory/activity' + versionNumber, //活动浏览量
        activetyWantGo: indexip + '/userActivity/join' + versionNumber, //活动报名
        activetyRemoveWant: indexip + '/userActivity/unJoin' + versionNumber, //活动取消报名
        addPicture: indexip + '/showPicture/add' + versionNumber, //晒图
        pictureList: indexip + '/showPicture/indexList' + versionNumber, //晒图列表
        pictureDetail: indexip + '/showPicture/detail' + versionNumber, //晒图详情
        deleteShowPicture: indexip + '/showPicture/deleteShowPicture' + versionNumber, //删除晒图
        giveShowPictureLike: indexip + '/userLike/giveShowPictureLike' + versionNumber, //晒图点赞
        removeShowPictureLike: indexip + '/userLike/removeShowPictureLike' + versionNumber, //取消点赞
        showPictureComment: indexip + '/userComment/showPictureComment' + versionNumber, //晒图评论
        showPictureCommentList: indexip + '/userComment/showPictureCommentList' + versionNumber, //晒图评论列表
        pictureRead: indexip + '/readerHistory/picture' + versionNumber, //晒图浏览量
        /*圈子*/
        momentGiveLike: indexip + '/userLike/giveMomentLike' + versionNumber, //此刻点赞
        momentRemoveLike: indexip + '/userLike/removeMomentLike' + versionNumber, //此刻取消点赞
        momentCollection: indexip + '/userCollection/collectionMoment' + versionNumber, //此刻收藏
        momentRemoveCollection: indexip + '/userCollection/unCollection/Moment' + versionNumber, //此刻取消收藏
        nowDetail: indexip + '/moment/detail' + versionNumber, //此刻详情
        momentCommentGiveLike: indexip + '/userLike/giveCommentLike' + versionNumber, //此刻评论点赞
        momentCommentRemoveLike: indexip + '/userLike/removeCommentLike' + versionNumber, //此刻评论取消点赞
        momentCommentList: indexip + '/userComment/momentCommentList' + versionNumber, //此刻评论列表
        momentComment: indexip + '/userComment/momentComment' + versionNumber, //此刻评论
        momentRead: indexip + '/readerHistory/moment' + versionNumber, //此刻浏览量
        momentCollection: indexip + '/userCollection/collectionMoment' + versionNumber, //圈子收藏
        momentRemoveCollection: indexip + '/userCollection/unCollection/Moment' + versionNumber, //圈子取消收藏
        /*问答*/
        addQuestion: indexip + '/question/add' + versionNumber, //发布问答
        getQuestionDetail: indexip + '/question/detail' + versionNumber, //问答详情
        questionComment: indexip + '/userComment/questionComment' + versionNumber, //问答发答案
        questionCommentList: indexip + '/userComment/questionCommentList' + versionNumber, //问答评论列表
        questionRead: indexip + '/readerHistory/question' + versionNumber, //此刻浏览量
        deleteQuestion: indexip + '/question/delete' + versionNumber, //删除问答
        giveQuestionLike: indexip + '/userLike/giveQuestionLike' + versionNumber, //问答点赞
        removeQuestionLike: indexip + '/userLike/removeQuestionLike' + versionNumber, //问答取消点赞
        getQuestionLabels: indexip + '/question/getLabels' + versionNumber, //获取标签
        /*我的收藏*/
        myCollectArticle: indexip + '/mine/myCollection/article' + versionNumber, //我收藏的资讯
        myCollectActivity: indexip + '/mine/myCollection/activity' + versionNumber, //我收藏的活动
        /*我的活动*/
        myRegistrationList: indexip + '/mine/registration/list' + versionNumber, //我报名的活动列表
        myRegistrationInfo: indexip + '/mine/registration/detail' + versionNumber, //我报名的信息
        /*关注*/
        focusOn: indexip + '/userFocus/focusOn' + versionNumber, //加关注
        unFocus: indexip + '/userFocus/unFocus' + versionNumber, //取消关注
        focusOnList: indexip + '/mine/focusOnList' + versionNumber, //关注列表
        fansList: indexip + '/mine/fansList' + versionNumber, //粉丝列表
        focusStatu: indexip + '/userFocus/status' + versionNumber, //我和他人的关注状态
        /*我的此刻*/
        addMoment: indexip + '/moment/add' + versionNumber, //发布此刻
        issueMomentList: indexip + '/moment/issueMomentList' + versionNumber, //此刻列表（发布列表新）
        count: indexip + '/mine/count', //获赞、关注、发布、粉丝数量
        informOthers: indexip + '/userInform/inform' + versionNumber, //举报他人
        deleteMoment: indexip + '/moment/deleteMoment' + versionNumber, //删除我的此刻
        deleteComment: indexip + '/userComment/deleteComment' + versionNumber, //删除评论
        getOneComment: indexip + '/userComment/getOneComment' + versionNumber, //进入评论页获取当前评论所有回复
        searchUserBaseInformationMany: userip + '/jac-admin/admin/userBaseInformation/searchUserBaseInformationMany' + versionNumber,
    }
    // 智享
window.Wit = {
        searchVehicleSeriesOne: mip + '/vehicleSeries/searchVehicleSeriesOne' + versionNumber, //车系和配置参数查询
        MainBus: mip + '/vehicleBrand/selectVehicleSeriesByBrand' + versionNumber, //全部车型 主推车型
        Dealer: mip + '/dealerVehicleModel/searchDealerVehicleModelListPage' + versionNumber, //经销列表商查询
        Switching: mip + '/vehicleBrand/searchVehicleBrandList' + versionNumber, //频道选择
        Distributor: mip + '/dealerBaseInformation/searchDealerBaseInformationListPage' + versionNumber, //选择经销商
        searchVehicleBrandList: mip + '/vehicleBrand/searchVehicleBrandList' + versionNumber, //品牌
        searchVehicleSeriesList: mip + '/vehicleBrand/selectVehicleSeriesByBrand' + versionNumber, //车型
        Brand: mip + '/vehicleBrand/searchVehicleBrandList' + versionNumber, //选择品牌
        System: mip + '/vehicleSeries/searchVehicleSeriesList' + versionNumber, //选择车系
        PreBus: mip + '/cluesOrderFrom/addCluesOrderFrom' + versionNumber, //车辆预定提交
        Wbpre: mip + '/maintenanceReservationOrder/addMaintenanceReservationOrder' + versionNumber, //维保预约下单
        default_pre: mip + '/automobilemanage/maintenanceReservationOrder/toMaintenanceReservationOrder' + versionNumber, //维保预约获取默认信息
        Brand: mip + '/vehicleBrand/selectVehicleSeriesByBrand', //选择品牌
        searchCountryAreaCodeListPage: mips + '/admin/countryAreaCode/searchCountryAreaCodeListPage' + versionNumber, //省份
        searchUserBaseInformationOne: mips + '/admin/userBaseInformation/searchUserBaseInformationOne' + versionNumber, //用户基本信息详细查询
        updateUserBaseInformation: mips + '/admin/userBaseInformation/updateUserBaseInformation' + versionNumber, //用户基本信息更新
        addComplaintsSuggestions: rec + '/enjoyservice/complaintsSuggestions/addComplaintsSuggestions' + versionNumber, //反馈记录
        searchComplaintsSuggestionsList: rec + '/enjoyservice/complaintsSuggestions/searchComplaintsSuggestionsList' + versionNumber, //投诉建议查询
        searchComplaintsSuggestionsOne: rec + '/enjoyservice/complaintsSuggestions/searchComplaintsSuggestionsOne' + versionNumber, //投诉建议详细信息
        searchComplaintsSuggestionsReplyOne: rec + '/enjoyservice/complaintsSuggestionsReply/searchComplaintsSuggestionsReplyOne' + versionNumber, //投诉及建议回复查询详细信息
        updateUserPassword: mips + '/admin/userBaseInformation/updateUserPassword' + versionNumber, //用户修改密码
        getComAndSugDet: rec + '/enjoyservice/complaintsSuggestionsReply/getComAndSugDet' + versionNumber, //反馈详情
        Help: rec + '/enjoyservice/position/savePosition' + versionNumber, //道路救援定位传给后端
        ValidateCode: mips + 'admin/recommendedCode/validateCode' + versionNumber, //验证推荐码
        SearchVehicleSeriesByVehicle: mip + '/vehicleSeries/searchVehicleSeriesByVehicle' + versionNumber, //品牌车型的获取
        selectDealerAndTime: mip + '/maintenanceAppointment/selectDealerAndTime' + versionNumber, //获取维保预约当天的时间段
        addMaintenanceAppointment: mip + '/maintenanceAppointment/addMaintenanceAppointment' + versionNumber, //维保预约提交
        synchronousMaintenanceAppointmentByDms: mip + '/maintenanceAppointment/synchronousMaintenanceAppointmentByDms' + versionNumber, //维保预约记录first
        searchMaintenanceAppointmentListPage: mip + '/maintenanceAppointment/searchMaintenanceAppointmentListPage' + versionNumber, //维保预约记录next
        selectValueByType: witlocal + '/vehicleConfigurationValue/selectValueByType' + versionNumber, //智能选车筛选
        searchHeavyCarModelListPage: witlocal + '/heavyCarModel/searchHeavyCarModelListPage' + versionNumber, //智能选车列表
    }
    //我的 部分
window.My = {
        UserInfo: mips + '/admin/userBaseInformation/searchUserBaseInformationOne' + versionNumber, //我的首页 用户基本信息
        IsSignIn: jf + 'api/pluto-membership/pluto-membership/integral-gather/is-sign' + versionNumber, //判断用户今天是否签到
        SignIn: jf + '/api/pluto-membership/pluto-membership/integral-gather/addintegral-signIn' + versionNumber, //签到
        Credit: jf + 'api/pluto-membership/plutomembership/integralCount/searchIntegralCountList' + versionNumber, //获取用户积分
        CreditDetail: jf + 'api/pluto-membership/plutomembership/integralRecord/searchIntegralRecordList' + versionNumber, //积分记录
        My_Bus: love_car + '/vehicle/find-vehicle-list' + versionNumber, //我的车辆
        SetOneDefault: love_car + '/vehicle/set-default-vehicle' + versionNumber, //我的车辆设为默认
        JFmybus: love_car + '/vehicle/set-vehicle-remoteset' + versionNumber, //解绑我的车辆,绑定,
        planbus: love_car + '/vehicle/set-vehicle-remoteset' + versionNumber, //添加车牌 绑定车牌
        Edict: mip + '/vehicle/updateVehicle' + versionNumber, //修改车辆信息
        ClueOrder: mip + '/cluesOrderFrom/searchCluesOrderFromListPage' + versionNumber, //线索订单
        MyDealer: mip + '/userDealer/searchUserDealerList' + versionNumber, //我的 我的经销商列表
        UpUserinfo: mips + '/admin/userBaseInformation/updateUserBaseInformation' + versionNumber, //更改用户信息
        Address: mips + '/admin/userAddress/searchUserAddressList' + versionNumber, //my部分查询所有地址
        RemoveAddress: mips + '/admin/userAddress/deleteUserAddress' + versionNumber, //my部分删除当前地址
        ChangeAddress: mips + '/admin/userAddress/updateUserAddress' + versionNumber, //my部分修改地址
        Defaultaddress: mips + '/admin/userAddress/setDefaultAddress' + versionNumber, //my部分设置默认地址
        Area: mips + '/admin/countryAreaCode/searchCountryAreaCodeListPage' + versionNumber, //选择地区
        AddAddress: mips + '/admin/userAddress/addUserAddress' + versionNumber, //my部分新增地址
        RecomendCode: mips + '/admin/recommendedCode/searchRecommendedCodeOne' + versionNumber, //获取推荐码
        List: 'http://14.21.46.171:8707/api/order/list' + versionNumber, //商城订单列表
        addintegralRealName: host + '/api/pluto-membership/pluto-membership/integral-gather/addintegral-realName' + versionNumber, //保存个人信息,增加积分
        orderList: host + '/api/pluto-membership/mall/information/orderList' + versionNumber, //商城订单
        orderDetail: host + '/api/pluto-membership/mall/information/orderDetail' + versionNumber, //商城订单详细
        getwords: mips + '/admin/sysDictType/searchSysDictTypeList' + versionNumber, //获取所有提示语
        searchReasonsForDissatisfactionList: mip + '/reasonsForDissatisfaction/searchReasonsForDissatisfactionList' + versionNumber, //网点评分列表
        addBranchesEvaluation: mip + '/branchesEvaluation/addBranchesEvaluation' + versionNumber, //提交评分
        searchBranchesEvaluationOne: mip + '/branchesEvaluation/searchBranchesEvaluationOne' + versionNumber, //网点评分详情
        cancelMaintenanceAppointment: mip + '/maintenanceAppointment/cancelMaintenanceAppointment' + versionNumber, //取消维保申请
        searchMaintenanceRecordList: mip + '/maintenanceRecord/searchMaintenanceRecordList' + versionNumber, //维保记录
        sendSMS: mips + '/admin/thirdPartyRequest/sendSMS' + versionNumber, //获取修改手机的验证码
        updateUserCode: mips + '/admin/userBaseInformation/updateUserCode' + versionNumber, //手机号码修改的提交
        addLabelEntityToUser: mips + '/admin/labelEntity/addLabelEntityToUser' + versionNumber, //登入app后同步会员等级
    }
    //爱车
window.Lovecar = {
        Support: love_car + '/vehicle/vehicle-support-function' + versionNumber, //tsp用户返回所具有的车况功能
        vehicle: love_car + '/vehicle/sync-tsp-vehicle' + versionNumber, //给后端同步车辆接口
        TSP: mips + '/admin/thirdPartyUserBaseInformation/searchThirdPartyUserBaseInformationOne' + versionNumber, //获取tsp用户
        Carquery: love_car + '/vehicle/query-vehicle-condition' + versionNumber, //车辆车况查询
        OperationId: love_car + '/vehicle/vehicle-async-results' + versionNumber, //获取车辆车况查询返回的operationId发送给后端
        Changepin: love_car + '/vehicle/update-vehicle-pin' + versionNumber, //修改pin码
        Getphonepin: love_car + '/vehicle//identify-code' + versionNumber, //获取车控验证码
        Checkphonepin: love_car + '/vehicle/check-vehicle-pin' + versionNumber, //验证pin码
        BusTest: love_car + '/vehicle/query-cyc-car-examination' + versionNumber, //车辆体检
        Fuel: love_car + '/vehicle/query-vehicle-fuel-statistics' + versionNumber, //燃油接口
        Flow: love_car + '/vehicle/vehicle-cyc-flow-query' + versionNumber, //流量查询
        FlowBuy: love_car + '/vehicle/cyc-flow-package-query' + versionNumber, //流量购买查询
        Productionorder: love_car + '/flow/production-order' + versionNumber, //生产成流量订单
        // Productionorder: 'http://172.21.12.35:8084' + '/flow/production-order', //生产成流量订单
        Getoederlist: love_car + '/flow/get-order-list' + versionNumber, //后台从tsp同步流量订单查询数据
        Getoederlistapp: love_car + '/flow/get-order-one-app' + versionNumber, //流量订单查询
        // Getoederlistapp: 'http://172.21.12.35:8084' + '/get-order-one-app', //流量订单查询
        Flowpackage: love_car + '/vehicle/cyc-flow-package-query' + versionNumber, //流量包查询
        Longrange: love_car + '/vehicle/set-vehicle-remoteset' + versionNumber, //车辆远程设置
        LoginOut: love_car + '/vehicle/remote-vehicle-loginOut' + versionNumber, //退出登录
        RemoteVehicleLogin: love_car + '/vehicle/remote-vehicle-login' + versionNumber, //机车登入
        Findcode: love_car + '/vehicle/forget-vehicle-pin' + versionNumber, //找回pin码
        Control: love_car + '/vehicle/remote-vehicle-control' + versionNumber, //远程控制
        LogStatus: love_car + '/vehicle/vehicle-logstatus' + versionNumber, //获取机车登入状态
        vehiclestatus: love_car + '/vehicle/vehicle-status' + versionNumber, //车辆授权状态查询
        // vehiclestatus: 'http://172.21.12.35:8084' + '/vehicle/vehicle-status', //车辆授权状态查询
        loginOut: love_car + '/vehicle/remote-vehicle-loginOut' + versionNumber, //车辆远程登出
        showcallbackmessage: love_car + '/call-back/show-callback-message' + versionNumber, //超过电子围栏警告
        vehiclebyvin: love_car + '/vehicle/vehicle-by-vin' + versionNumber, //当tspflag为0的时候调用

    }
    //新能源接口
window.Newenergy = {
        energyremotevehiclecontrol: witlocal + '/vehicleControl/energy-remote-vehicle-control' + versionNumber, //新能源车辆控制查询operationId
        energyqueryvehiclecondition: witlocal + '/vehicleInformation/energy-query-vehicle-condition' + versionNumber, //新能源车况查询operationId
        energyvehicleasyncresults: witlocal + '/callBack/energy-vehicle-async-results' + versionNumber, //operationId回调
        energyqueryvehiclenewcondition: witlocal + '/vehicleInformation/energy-query-vehicle-new-condition' + versionNumber, //同步的车况不用operationId
        energyvehiclePINupdate: witlocal + '/vehicleInformation/energy-vehicle-PIN-update' + versionNumber, //修改pin码的接口
        energysendSMS: witlocal + '/vehicleInformation/energy-send-SMS' + versionNumber, //短信验证接口
        energyforgetvehiclepin: witlocal + '/vehicleInformation/energy-forget-vehicle-pin' + versionNumber, //忘记pin码接口
        energyvehiclePINvalidation: witlocal + '/vehicleInformation/energy-vehicle-PIN-validation' + versionNumber, //验证pin码
        energyvehiclecycflowquery: witlocal + '/vehicleInformation/energy-vehicle-cyc-flow-query' + versionNumber, //流量查询接口
    }
    //消息接口
window.IMFORMATION = {
        getList: indexip + '/sendMessageController/getList' + versionNumber, //通知list
        commentRequest: indexip + '/userComment/commentRequest' + versionNumber, //获取评论列表lid与类型进行跳转
        read: indexip + '/sendMessageController/read', //通知已读
        systemmessageread: love_car + '/sys-message/system-message-read' + versionNumber, //获取已读消息状态
        systemmessagelist: love_car + '/sys-message/system-message-list' + versionNumber, //系统消息列表
        notificationPushDetail: love_car + '/notificationPush/notificationPushDetail' + versionNumber, //通知详情
        systemmessagenew: love_car + '/sys-message/system-message-new' + versionNumber, //获取未读红点状态
        notificationPushList: love_car + '/notificationPush/notificationPushList' + versionNumber, //通知list
        changeReadStatus: love_car + '/notificationPush/changeReadStatus' + versionNumber, //通知已读
        unRead: indexip + '/sendMessageController/unRead' + versionNumber, //通知已读
        getReadFlag: indexip + '/sendMessageController/getReadFlag' + versionNumber //大连部分判断红点有无的接口
    }
    //文件服务器接口
window.FILESTORE = {
    uploadPicture: filestore + '/filestore/v1/picture' + versionNumber // 文件服务器上传图片地址
}