var indexip = 'http://122.112.247.25/api/DK-DM-PORTAL-API'
//var indexip = 'http://172.18.31.40:8868'
//首页
var INDEXMESSAGE = {
  getRecommend: indexip + '/recommend/recommendList', //首页-推荐
  getInfomation: indexip + '/information/indexList', //首页-资讯
  getActivity: indexip + '/activity/indexList', //首页-活动
  getNow: indexip + '/moment/indexList', //首页-此刻
  getQuestion: indexip + '/question/indexList', //首页-问答
}
var DISCOVERMESSAGE = {
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
  deleteShowPicture: indexip + '/showPicture/deleteShowPicture',//删除晒图
  giveShowPictureLike: indexip + '/userLike/giveShowPictureLike',//晒图点赞
  removeShowPictureLike: indexip + '/userLike/removeShowPictureLike',//取消点赞
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
