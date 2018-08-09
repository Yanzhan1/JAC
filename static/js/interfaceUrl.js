

const constants = require('@constants/index.js')
const {apiHost} = constants

console.log(`执行环境${apiHost}`)
var indexip = `${apiHost}/api/dk-dm-portal-api`
    //服务器-智享
var mip = 'http://172.20.20.69:8082/automobilemanage' //智享
    //服务器-admin(跟用户有关即我的)
var mips = 'http://172.20.20.69:8081/' //地区

var mipss = 'http://172.20.20.69:8084/' //爱车

var mipsss = 'http://172.21.4.184:8084/' //爱车本地服务器  yys

var mipes = 'http://172.21.4.37:8081/automobilemanage' //my收货地址部分 杨毅飞本地

//李明→本地反馈详情
var li = 'http://172.21.12.19:8083'


//服务器→反馈记录
var rec = 'http://172.20.20.69:8083/'
    //var indexip = 'http://172.18.31.40:8868'
    //首页
window.INDEXMESSAGE = {
    getRecommend: indexip + '/recommend/recommendList', //首页-推荐
    getInfomation: indexip + '/information/indexList', //首页-资讯
    getActivity: indexip + '/activity/indexList', //首页-活动
    getNow: indexip + '/moment/indexList', //首页-此刻
    getQuestion: indexip + '/question/indexList', //首页-问答
}
window.DISCOVERMESSAGE = {
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
        getLabels: indexip + '/question/getLabels', //获取标签
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
        myFocusNum: indexip + '/mine/myFocusNum', //关注数量
        myFansNum: indexip + '/mine/myFansNum', //粉丝数量
        myLikeNum: indexip + '/mine/myLikeNum', //点赞数量
        informOthers: indexip + '/userInform/inform', //举报他人
        deleteMoment: indexip + '/moment/deleteMoment', //删除我的此刻
        deleteComment: indexip + '/userComment/deleteComment', //删除评论
        getOneComment: indexip + '/userComment/getOneComment', //进入评论页获取当前评论所有回复
    }
    // 智享
window.Wit = {
        MainBus: mip + '/vehicleModel/searchVehicleModelList', //全部车型 主推车型
        Dealer: mip + '/dealerBaseInformation/searchDealerBaseInformationListPage', //经销商查询
        Switching: mip + '/vehicleBrand/searchVehicleBrandList', //频道选择
        Distributor: mip + '/dealerBaseInformation/searchDealerBaseInformationListPage', //选择经销商
        searchVehicleBrandList: mip + '/vehicleBrand/searchVehicleBrandList', //品牌
        searchVehicleSeriesList: mip + '/vehicleSeries/searchVehicleSeriesList', //车型
        Brand: mip + '/vehicleBrand/searchVehicleBrandList', //选择品牌
        System: mip + '/vehicleSeries/searchVehicleSeriesList', //选择车系
        Area: mips + '/admin/countryAreaCode/searchCountryAreaCodeListPage', //选择地区
        PreBus: mip + '/cluesOrderFrom/addCluesOrderFrom', //车辆预定提交
        Brand: mip + '/vehicleBrand/selectVehicleSeriesByBrand', //选择品牌
        searchCountryAreaCodeListPage: mips + '/admin/countryAreaCode/searchCountryAreaCodeListPage', //省份
        searchUserBaseInformationOne: mips + '/admin/userBaseInformation/searchUserBaseInformationOne', //用户基本信息详细查询
        updateUserBaseInformation: mips + '/admin/userBaseInformation/updateUserBaseInformation', //用户基本信息更新
        addComplaintsSuggestions: rec + '/enjoyservice/complaintsSuggestions/addComplaintsSuggestions', //反馈记录
        searchComplaintsSuggestionsList: rec + '/enjoyservice/complaintsSuggestions/searchComplaintsSuggestionsList', //投诉建议查询
        searchComplaintsSuggestionsOne: rec + '/enjoyservice/complaintsSuggestions/searchComplaintsSuggestionsOne', //投诉建议详细信息
        searchComplaintsSuggestionsReplyOne: rec + '/enjoyservice/complaintsSuggestionsReply/searchComplaintsSuggestionsReplyOne', //投诉及建议回复查询详细信息
        updateUserPassword: mips + '/admin/userBaseInformation/updateUserPassword', //用户修改密码

        ClueOrder: mip + '/cluesOrderFrom/searchCluesOrderFromListPage', //线索订单
        My_Bus: mip + '/userVehicle/searchUserVehicleList', //我的车辆
        JFmybus: mip + '/userVehicle/deleteUserVehicle', //解绑我的车辆,
        SetOneDefault: mip + '/userVehicle/setDefaultVehicle', //我的车辆设为默认
        AddMyBus: mip + '/vehicle/addVehicle', //添加我的车辆
        Edict: mip + '/vehicle/updateVehicle', //修改车辆信息
        ClueOrder: mip + '/cluesOrderFrom/searchCluesOrderFromListPage', //线索订单
        Address: mips + '/admin/userAddress/searchUserAddressList', //my部分查询所有地址
        RemoveAddress: mips + '/admin/userAddress/deleteUserAddress', //my部分删除当前地址
        AddAddress: mips + '/admin/userAddress/addUserAddress', //my部分新增地址
        ChangeAddress: mips + '/admin/userAddress/updateUserAddress', //my部分修改地址
        // ChangeAddress: mipes + '/admin/userAddress/updateUserAddress', //my部分修改地址
        Defaultaddress: mips + '/admin/userAddress/setDefaultAddress', //my部分设置默认地址
        MyDealer: mip + '/dealerBaseInformation/selectSeriesDealerBaseInformation', //我的 我的经销商列表
        UserInfo: mips + '/admin/userBaseInformation/searchUserBaseInformationOne', //我的首页 用户基本信息
        UpUserinfo: mips + '/admin/userBaseInformation/updateUserBaseInformation', //更改用户信息
        //      updateUserPassword: mips + '/admin/userBaseInformation/updateUserPassword',//用户修改密码
        getComAndSugDet: li + '/enjoyservice/complaintsSuggestionsReply/getComAndSugDet', //反馈详情→李明本地

    }
    //爱车
window.Lovecar = {
    Carquery: mipss + '/vehicle/query-vehicle-condition', //车辆车况查询
    OperationId: mipss + '/vehicle/vehicle-async-result', //获取车辆车况查询返回的operationId发送给后端
    Changepin: mipss + '/vehicle/update-vehicle-pin', //修改pin码
    Getphonepin: mipss + '/vehicle//identify-code', //获取验证码
    Checkphonepin: mipss + '/vehicle/check-vehicle-pin', //验证pin码
    BusTest: mipss + 'vehicle/query-cyc-car-examination', //车辆体检
    Fuel: mipss + '/vehicle/query-vehicle-fuel-Statistics', //燃油接口
    Flow: mipss + '/vehicle/query-vehicle-cyc-flow-query', //流量查询
    Longrange: mipss + '/vehicle/set-vehicle-remoteset', //远程设置
    LoginOut: mipss + '/vehicle/remote-vehicle-login-or-logout' //退出登录



}
