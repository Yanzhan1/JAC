// const constants = require('@constants/index.js')
// const { apiHost } = constants

// console.log(`执行环境${apiHost}`)
// var indexip = `${apiHost}/api/dk-dm-portal-api`
//域名
var host = '//test.jac.timanetwork.net'
var indexip = host + '/api/dk-dm-portal-api'
    //服务器-智享
var mip = host + '/api/jac-automobile-manage/automobilemanage' //智享
    //服务器-admin(跟用户有关即我的)
var mips = host + '/api/jac-admin/' //地区
var jf = host + '/' //跟积分有关的
    // var love_car = host+'/jvconnectedcar' //爱车
var love_car = host + '/api/jac-car-control' //爱车
    //服务器→反馈记录
var rec = host + '/api/jac-enjoy-service/'
    // H5外网地址，分享用
var waiwangip = window.location.protocol + host + '/JACH5/#/';
var filestore = host + '/api/dk-filestore-svr'
    //首页
window.INDEXMESSAGE = {
    getRecommend: indexip + '/recommend/recommendList', //首页-推荐
    getInfomation: indexip + '/information/indexList', //首页-资讯
    getActivity: indexip + '/activity/indexList', //首页-活动
    getNow: indexip + '/moment/indexList', //首页-此刻
    getQuestion: indexip + '/question/indexList', //首页-问答
}
window.DISCOVERMESSAGE = {
        /*标签*/
        getLabels: indexip + '/label/getLabels', //获取标签
        /*资讯*/
        informationGiveLike: indexip + '/userLike/giveInformationLike', //资讯点赞
        informationRemoveLike: indexip + '/userLike/removeInformationLike', //资讯取消点赞
        informationCollection: indexip + '/userCollection/collectionInformation', //资讯收藏
        informationRemoveCollection: indexip + '/userCollection/unCollection/Information', //资讯取消收藏
        informationDetail: indexip + '/information/detail', //资讯详情
        informationRead: indexip + '/readerHistory/information', //资讯浏览量
        informationComment: indexip + '/userComment/informationComment', //资讯评论
        informationCommentList: indexip + '/userComment/informationCommentList', //资讯评论列表
        informationCommentGiveLike: indexip + '/userLike/giveCommentLike', //资讯评论点赞
        informationCommentRemoveLike: indexip + '/userLike/removeCommentLike', //资讯评论取消点赞
        /*活动*/
        getActivityDetail: indexip + '/activity/detail', //活动详情
        activetyGiveLike: indexip + '/userLike/giveActivityLike', //活动点赞
        activetyRemoveLike: indexip + '/userLike/removeActivityLike', //活动取消点赞
        activetyCollection: indexip + '/userCollection/collectionActivity', //活动收藏
        activetyRemoveCollection: indexip + '/userCollection/unCollection/Activity', //活动取消收藏
        activetyRead: indexip + '/readerHistory/information', //活动浏览量
        activetyWantGo: indexip + '/userActivity/join', //活动报名
        activetyRemoveWant: indexip + '/userActivity/unJoin', //活动取消报名
        addPicture: indexip + '/showPicture/add', //晒图
        pictureList: indexip + '/showPicture/indexList', //晒图列表
        pictureDetail: indexip + '/showPicture/detail', //晒图详情
        deleteShowPicture: indexip + '/showPicture/deleteShowPicture', //删除晒图
        giveShowPictureLike: indexip + '/userLike/giveShowPictureLike', //晒图点赞
        removeShowPictureLike: indexip + '/userLike/removeShowPictureLike', //取消点赞
        showPictureComment: indexip + '/userComment/showPictureComment', //晒图评论
        showPictureCommentList: indexip + '/userComment/showPictureCommentList', //晒图评论列表
        pictureRead: indexip + '/readerHistory/picture', //晒图浏览量
        /*圈子*/
        momentGiveLike: indexip + '/userLike/giveMomentLike', //此刻点赞
        momentRemoveLike: indexip + '/userLike/removeMomentLike', //此刻取消点赞
        momentCollection: indexip + '/userCollection/collectionMoment', //此刻收藏
        momentRemoveCollection: indexip + '/userCollection/unCollection/Moment', //此刻取消收藏
        nowDetail: indexip + '/moment/detail', //此刻详情
        momentCommentGiveLike: indexip + '/userLike/giveCommentLike', //此刻评论点赞
        momentCommentRemoveLike: indexip + '/userLike/removeCommentLike', //此刻评论取消点赞
        momentCommentList: indexip + '/userComment/momentCommentList', //此刻评论列表
        momentComment: indexip + '/userComment/momentComment', //此刻评论
        momentRead: indexip + '/readerHistory/moment', //此刻浏览量
        momentCollection: indexip + '/userCollection/collectionMoment', //圈子收藏
        momentRemoveCollection: indexip + '/userCollection/unCollection/Moment', //圈子取消收藏
        /*问答*/
        addQuestion: indexip + '/question/add', //发布问答
        getQuestionDetail: indexip + '/question/detail', //问答详情
        questionComment: indexip + '/userComment/questionComment', //问答发答案
        questionCommentList: indexip + '/userComment/questionCommentList', //问答评论列表
        questionRead: indexip + '/readerHistory/question', //此刻浏览量
        deleteQuestion: indexip + '/question/delete', //删除问答
        giveQuestionLike: indexip + '/userLike/giveQuestionLike', //问答点赞
        removeQuestionLike: indexip + '/userLike/removeQuestionLike', //问答取消点赞
        getQuestionLabels: indexip + '/question/getLabels', //获取标签
        /*我的收藏*/
        myCollectArticle: indexip + '/mine/myCollection/article', //我收藏的资讯
        myCollectActivity: indexip + '/mine/myCollection/activity', //我收藏的活动
        /*我的活动*/
        myRegistrationList: indexip + '/mine/registration/list', //我报名的活动列表
        myRegistrationInfo: indexip + '/mine/registration/detail', //我报名的信息
        /*关注*/
        focusOn: indexip + '/userFocus/focusOn', //加关注
        unFocus: indexip + '/userFocus/unFocus', //取消关注
        focusOnList: indexip + '/mine/focusOnList', //关注列表
        fansList: indexip + '/mine/fansList', //粉丝列表
        focusStatu: indexip + '/userFocus/status', //我和他人的关注状态
        /*我的此刻*/
        addMoment: indexip + '/moment/add', //发布此刻
        issueMomentList: indexip + '/moment/issueMomentList', //此刻列表（发布列表新）
        count: indexip + '/mine/count', //获赞、关注、发布、粉丝数量
        informOthers: indexip + '/userInform/inform', //举报他人
        deleteMoment: indexip + '/moment/deleteMoment', //删除我的此刻
        deleteComment: indexip + '/userComment/deleteComment', //删除评论
        getOneComment: indexip + '/userComment/getOneComment', //进入评论页获取当前评论所有回复
    }
    // 智享
window.Wit = {
        searchVehicleSeriesOne: mip + '/vehicleSeries/searchVehicleSeriesOne', //车系和配置参数查询
        MainBus: mip + '/vehicleBrand/selectVehicleSeriesByBrand', //全部车型 主推车型
        Dealer: mip + '/dealerVehicleModel/searchDealerVehicleModelListPage', //经销列表商查询
        Switching: mip + '/vehicleBrand/searchVehicleBrandList', //频道选择
        Distributor: mip + '/dealerBaseInformation/searchDealerBaseInformationListPage', //选择经销商
        searchVehicleBrandList: mip + '/vehicleBrand/searchVehicleBrandList', //品牌
        searchVehicleSeriesList: mip + '/vehicleBrand/selectVehicleSeriesByBrand', //车型
        Brand: mip + '/vehicleBrand/searchVehicleBrandList', //选择品牌
        System: mip + '/vehicleSeries/searchVehicleSeriesList', //选择车系
        PreBus: mip + '/cluesOrderFrom/addCluesOrderFrom', //车辆预定提交
        Wbpre: mip + '/maintenanceReservationOrder/addMaintenanceReservationOrder', //维保预约下单
        default_pre: mip + '/automobilemanage/maintenanceReservationOrder/toMaintenanceReservationOrder', //维保预约获取默认信息
        Brand: mip + '/vehicleBrand/selectVehicleSeriesByBrand', //选择品牌
        searchCountryAreaCodeListPage: mips + '/admin/countryAreaCode/searchCountryAreaCodeListPage', //省份
        searchUserBaseInformationOne: mips + '/admin/userBaseInformation/searchUserBaseInformationOne', //用户基本信息详细查询
        updateUserBaseInformation: mips + '/admin/userBaseInformation/updateUserBaseInformation', //用户基本信息更新
        addComplaintsSuggestions: rec + '/enjoyservice/complaintsSuggestions/addComplaintsSuggestions', //反馈记录
        searchComplaintsSuggestionsList: rec + '/enjoyservice/complaintsSuggestions/searchComplaintsSuggestionsList', //投诉建议查询
        searchComplaintsSuggestionsOne: rec + '/enjoyservice/complaintsSuggestions/searchComplaintsSuggestionsOne', //投诉建议详细信息
        searchComplaintsSuggestionsReplyOne: rec + '/enjoyservice/complaintsSuggestionsReply/searchComplaintsSuggestionsReplyOne', //投诉及建议回复查询详细信息
        updateUserPassword: mips + '/admin/userBaseInformation/updateUserPassword', //用户修改密码
        getComAndSugDet: rec + '/enjoyservice/complaintsSuggestionsReply/getComAndSugDet', //反馈详情
        Help: rec + '/enjoyservice/position/savePosition', //道路救援定位传给后端
        ValidateCode: mips + 'admin/recommendedCode/validateCode' //验证推荐码
    }
    //我的 部分
window.My = {
        UserInfo: mips + '/admin/userBaseInformation/searchUserBaseInformationOne', //我的首页 用户基本信息
        IsSignIn: jf + 'api/pluto-membership/pluto-membership/integral-gather/is-sign', //判断用户今天是否签到
        SignIn: jf + '/api/pluto-membership/pluto-membership/integral-gather/addintegral-signIn', //签到
        Credit: jf + 'api/pluto-membership/plutomembership/integralCount/searchIntegralCountList', //获取用户积分
        CreditDetail: jf + 'api/pluto-membership/plutomembership/integralRecord/searchIntegralRecordList', //积分记录
        My_Bus: love_car + '/vehicle/find-vehicle-list', //我的车辆
        SetOneDefault: love_car + '/vehicle/set-default-vehicle', //我的车辆设为默认
        JFmybus: love_car + '/vehicle/set-vehicle-remoteset', //解绑我的车辆,绑定,
        planbus: love_car + '/vehicle/set-vehicle-remoteset', //添加车牌 绑定车牌
        Edict: mip + '/vehicle/updateVehicle', //修改车辆信息
        ClueOrder: mip + '/cluesOrderFrom/searchCluesOrderFromListPage', //线索订单
        MyDealer: mip + '/userDealer/searchUserDealerList', //我的 我的经销商列表
        UpUserinfo: mips + '/admin/userBaseInformation/updateUserBaseInformation', //更改用户信息
        Address: mips + '/admin/userAddress/searchUserAddressList', //my部分查询所有地址
        RemoveAddress: mips + '/admin/userAddress/deleteUserAddress', //my部分删除当前地址
        ChangeAddress: mips + '/admin/userAddress/updateUserAddress', //my部分修改地址
        Defaultaddress: mips + '/admin/userAddress/setDefaultAddress', //my部分设置默认地址
        Area: mips + '/admin/countryAreaCode/searchCountryAreaCodeListPage', //选择地区
        AddAddress: mips + '/admin/userAddress/addUserAddress', //my部分新增地址
        RecomendCode: mips + '/admin/recommendedCode/searchRecommendedCodeOne', //获取推荐码
        List: 'http://14.21.46.171:8707/api/order/list', //商城订单列表
        addintegralRealName: host + '/api/pluto-membership/pluto-membership/integral-gather/addintegral-realName', //保存个人信息,增加积分
        orderList: host + '/api/pluto-membership/mall/information/orderList', //商城订单
        orderDetail: host + '/api/pluto-membership/mall/information/orderDetail' //商城订单详细


    }
    //爱车
window.Lovecar = {
        vehicle: love_car + '/vehicle/sync-tsp-vehicle', //给后端同步车辆接口
        TSP: mips + 'admin/thirdPartyUserBaseInformation/searchThirdPartyUserBaseInformationOne', //获取tsp用户
        Carquery: love_car + '/vehicle/query-vehicle-condition', //车辆车况查询
        OperationId: love_car + '/vehicle/vehicle-async-results', //获取车辆车况查询返回的operationId发送给后端
        Changepin: love_car + '/vehicle/update-vehicle-pin', //修改pin码
        Getphonepin: love_car + '/vehicle//identify-code', //获取验证码
        Checkphonepin: love_car + '/vehicle/check-vehicle-pin', //验证pin码
        BusTest: love_car + '/vehicle/query-cyc-car-examination', //车辆体检
        Fuel: love_car + '/vehicle/query-vehicle-fuel-statistics', //燃油接口
        Flow: love_car + '/vehicle/vehicle-cyc-flow-query', //流量查询
        FlowBuy: love_car + '/vehicle/cyc-flow-package-query', //流量购买查询
        Productionorder: love_car + '/flow/production-order', //生产成流量订单
        Getoederlist: love_car + '/flow/get-order-list', //后台从tsp同步流量订单查询数据
        Getoederlistapp: love_car + '/flow/get-order-list', //流量订单查询
        Flowpackage: love_car + '/vehicle/cyc-flow-package-query', //流量包查询
        Longrange: love_car + '/vehicle/set-vehicle-remoteset', //车辆远程设置
        LoginOut: love_car + '/vehicle/remote-vehicle-loginOut', //退出登录
        RemoteVehicleLogin: love_car + '/vehicle/remote-vehicle-login', //机车登入
        Findcode: love_car + '/vehicle/forget-vehicle-pin', //找回pin码
        Control: love_car + '/vehicle/remote-vehicle-control', //远程控制
        LogStatus: love_car + '/vehicle/vehicle-logstatus', //获取机车登入状态
        vehiclestatus: love_car + '/vehicle/vehicle-status', //车辆授权状态查询
        loginOut: love_car + '/vehicle/remote-vehicle-loginOut' //车辆远程登出
    }
    //消息接口
window.IMFORMATION = {
        getList: indexip + '/sendMessageController/getList', //通知list
        commentRequest: indexip + '/userComment/commentRequest', //获取评论列表lid与类型进行跳转
        read: indexip + '/sendMessageController/read', //通知已读
        systemmessageread: love_car + '/sys-message/system-message-read', //获取已读消息状态
        systemmessagelist: love_car + '/sys-message/system-message-list', //系统消息列表
        notificationPushDetail: love_car + '/notificationPush/notificationPushDetail', //通知详情
        systemmessagenew: love_car + '/sys-message/system-message-new', //获取未读红点状态
        notificationPushList: love_car + '/notificationPush/notificationPushList', //通知list
        changeReadStatus: love_car + '/notificationPush/changeReadStatus', //通知已读
        unRead: indexip + '/sendMessageController/unRead', //通知已读
        getReadFlag: indexip + '/sendMessageController/getReadFlag' //大连部分判断红点有无的接口
    }
    //文件服务器接口
window.FILESTORE = {
    uploadPicture: filestore + '/filestore/v1/picture' // 文件服务器上传图片地址
}