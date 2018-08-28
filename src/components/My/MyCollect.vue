<template>
  <div class="all">
    <div class="header" style="background: #fff">
      <img class="header-left" src="../../../static/images/back@2x.png" alt="" @click="$router.go(-1)">
      <span class="header-title">我的收藏</span>
      <div class="header-right"></div>
    </div>
    <div class="flex choose">
      <div class="flex contentcenter" :class="{'contentchoose':contentchoose==1}" @click="contentchoose = 1">资讯</div>
      <div class="flex contentcenter" :class="{'contentchoose':contentchoose==2}" @click="contentchoose = 2">活动</div>

    </div>
    <div style="padding: 0.16rem 0;">
      <!--我收藏的资讯-->
      <div v-if="contentchoose==1">
        <!--资讯列表S-->
        <div v-for="(item,index) in articleList">
          <div class="boxInfo">
            <p class="listTitleInfo" @click="toDetail(item.manageId)">
              {{item.manageTitle.slice(0,46)}}
              <span v-if="item.manageTitle.length>46">...</span>
            </p>
            <img class="listPic312" @click="toDetail(item.manageId)" :src="item.imgUrl"/>
            <div class="listIconInfo">
              <!--阅读数量-->
              <img src="../../../static/images/discover/eye.png" class="f_left"/>
              <span class="f_left">{{item.readNum}}</span>
              <!--是否点赞以及点赞数量-->
              <span class="f_right">{{item.likeNum}}</span>
              <img v-if="item.likeStatus" src="../../../static/images/discover/nozan.png" class="f_right" @click="giveInformationLike(item.manageId,index)"/>
              <img v-else src="../../../static/images/discover/zan.png" class="f_right" @click="removeInformationLike(item.manageId,index)"/>
            </div>
          </div>
        </div>
        <!--资讯列表E-->
    <!--    <div v-for="item in articleList" :key="item.id">
          <div class="message-box" @click="goDiscDetail(item.manageId)">
            <div class="message-content-left">
              <img :src="item.imgUrl" alt="">
              <p class="message-left-section">
                <span>标签</span>
                <span style="text-align:right;">{{item.issuedDate}}</span>
              </p>
            </div>
            <div class="message-content-right">
              <div class="message-right-title">
                {{item.manageTitle}}
              </div>
              <div class="message-right-footer">
                <p class="left-footer">
                  <span  v-if="item.user">{{item.user.nick_name}}</span>
                  <span  v-else>红星汽车</span>
                </p>
                <p class="right-footer">
                  <img src="../../../static/images/discover/chakan.png">
                  <span>{{item.readNum}}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="intervalBg"></div>
        </div>-->
      </div>
      <!--我收藏的活动-->
      <div v-else-if="contentchoose==2" >
        <!--<div class="wrap">
          <div class="box" v-for="item in activityList">
            <img @click="goActivityDetail(item.activityId)" :src="item.imgUrl" class="headPic"/>
            <p @click="goActivityDetail(item.activityId)">{{item.activityTitle}}</p>
            <div class="date-box-left">
              <img v-if="item.activityState==0" src="../../../static/images/discover/daojishi1@2x.png"/>
              <img v-else-if="item.activityState==1" src="../../../static/images/discover/daojishi2@2x.png"/>
              <img v-else-if="item.activityState==2" src="../../../static/images/discover/daojishi3@2x.png"/>
              <span>{{item.planDate}}</span>
            </div>
            <div class="date-box-right">
              <img v-if="item.activityState==0" src="../../../static/images/discover/huodong1@2x.png"/>
              <img v-else-if="item.activityState==1" src="../../../static/images/discover/huodong2@2x.png"/>
              <img v-else-if="item.activityState==2" src="../../../static/images/discover/huodong3@2x.png"/>
              <span v-if="item.activityState==0">报名中</span>
              <span v-if="item.activityState==1">进行中</span>
              <span v-if="item.activityState==2">已结束</span>
            </div>
          </div>
        </div>
        <div class="liner"></div>-->
        <!--活动列表S-->
        <div v-for="(item) in activityList" :key="item.id">
          <div class="boxInfo">
            <p class="listTitleInfo" @click="toDetail(item.manageId)">
              {{item.activityTitle.slice(0,46)}}
              <span v-if="item.activityTitle.length>46">...</span>
            </p>
            <img class="listPic312" @click="toDetail(item.activityId)" :src="item.imgUrl"/>
            <div class="listIconActivity">
              <!--未开始-->
              <div v-if="item.activityState==0">
                <img src="../../../static/images/discover/date1.png" class="f_left"/>
                <span class="f_left">{{item.planDate}}</span>
                <span class="f_right">未开始</span>
                <img src="../../../static/images/discover/start1.png" class="f_right"/>
              </div>
              <!--已开始-->
              <div v-if="item.activityState==1">
                <img src="../../../static/images/discover/date2.png" class="f_left"/>
                <span class="f_left">{{item.planDate}}</span>
                <span class="f_right">已开始</span>
                <img src="../../../static/images/discover/start2.png" class="f_right"/>
              </div>
              <!--已结束-->
              <div v-if="item.activityState==2">
                <img src="../../../static/images/discover/date3.png" class="f_left"/>
                <span class="f_left">{{item.planDate}}</span>
                <span class="f_right">已结束</span>
                <img src="../../../static/images/discover/start3.png" class="f_right"/>
              </div>
            </div>
          </div>
        </div>
        <!--活动列表E-->
      </div>
    </div>
    <div style="height: 1rem"></div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  export default {
    name: "MyCollect",
    data(){
      return{
        list:[0,1,2,3,4,5,6,7,8,9],
        contentchoose:1,
        articleList:[],//资讯列表
        activityList:[],//活动列表
        likeNum: 0,
        pageNo:0,
      }
    },
    methods:{
      //下拉翻页
      loadMore() {
        this.loading = true;
        this.pageNo += 1;
        this.getActivityList();
        this.loading = false;
      },
      CommentBoxchange(){
        this.$store.dispatch('showcommentBox')
      },
      // 进入资讯详情
      goDiscDetail: function(id) {
        this.$router.push({
          path: "/discdetail",
          query: { id: id }
        });
      },
      // 进入活动详情
      goActivityDetail: function (id) {
        this.$router.push({path:"/activity/DetailActivity",query:{activityId:id}})
      },
      //资讯列表
      getArticleList: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myCollectArticle, {"uid": _this.$store.state.userId,"pageNo":1, "length":100}).then(function (res) {
          if (res.data.status) {
            _this.articleList = res.data.data;
          } else {
            _this.articleList = res.data.data;
         }
        });
      },
      //活动列表
      getActivityList: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myCollectActivity, {"uid": _this.$store.state.userId,"pageNo":_this.pageNo, "length":100}).then(function (res) {
          if (res.data.status) {
            _this.activityList = res.data.data;
          } else {
           }
        });
      },
      //资讯点赞
      giveInformationLike: function (manageId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationGiveLike, {"uid": _this.$store.state.userId,"lid": manageId,"uuid":_this.$store.state.uuid}).then(function (res) {
          if (res.data.status) {
            _this.articleList[index].likeNum = res.data.data.num;
            _this.articleList[index].likeStatus = false;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //取消点赞
      removeInformationLike: function (manageId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationRemoveLike, {"uid": _this.$store.state.userId,"lid": manageId,"uuid":_this.$store.state.uuid}).then(function (res) {
          if (res.data.status) {
            _this.articleList[index].likeNum = res.data.data.num;
            _this.articleList[index].likeStatus = true;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //取消收藏
      messageBoxCofirm: function(manageId,index){
      MessageBox.confirm('确定取消收藏?').then(action => {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.informationRemoveCollection, {"uid": _this.$store.state.userId,"lid": manageId,"uuid":_this.$store.state.uuid}).then(function (res) {
            if (res.data.status) {
              _this.getArticleList();
             } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
        });
      },
    },
    mounted:function () {
      this.$nextTick(function () {
        //初始化数据
        this.getArticleList();
        this.getActivityList();
        this.userId = this.$store.state.userId;
      })
    }
  }
</script>

<style scoped>
  @import "./../../../static/css/discover/all.css";
  .all{
    height: 100%;
  }
  .choose>div{
    flex: 1;
    margin-top: 0.88rem;
    height: 0.88rem;
    font-size: 0.28rem;
    color: #555555;
  }
  .choose>div{
    color: #222222;
  }
  .choose>.contentchoose{
    border-bottom: 0.05rem solid #2099FF;
    color: #2099FF;
  }
  .list{
    padding-top: 0.4rem;
    font-size: 0.24rem;
  }
  .func span>img{
    margin-right: 0.24rem;
  }
  .d_06_title{
    font-size: 0.36rem;
    margin-bottom: 0.2rem;
    color: #222222;
  }
  /*资讯*/
  .message-box {
    padding: 0 0.3rem 0.3rem 0.3rem;
    display: flex;
    height: 3rem;
  }
  .message-content-left {
    flex: 1;
    position: relative;
  }
  .message-content-left .message-left-section {
    position: absolute;
    bottom: 0.1rem;
    width: 100%;
    height: 0.4rem;
    line-height: 0.38rem;
    opacity: 0.3;
    background: #000000;
    color: #fff;
    display: flex;
    padding: 0 0.2rem;
    border-bottom-right-radius:50%;
    border-bottom-left-radius:50%;
  }
  .message-content-left .message-left-section span {
    width: 100%;
    justify-content: space-around;
    display: block;
    font-size: 0.2rem;
  }
  .message-content-left img {
    width: 100%;
    height: 2.6rem;
    border-radius: 3%;
  }
  .message-content-right {
    flex: 1;
    margin-left: 0.2rem;
    position: relative;
  }
  .message-content-right .message-right-title {
    font-size: 0.32rem;
    color: #000000;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    overflow: hidden;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    display: -webkit-box;
  }
  .message-content-right .message-right-footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    color: #888888;
    height: 0.4rem;
    line-height: 0.4rem;
  }
  .message-content-right .left-footer {
    float: left;
    font-size: 0.22rem;
  }
  .message-content-right .right-footer {
    float: right;
    font-size: 0.22rem;
  }
  .message-content-right .right-footer img {
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.1rem;
  }
  .message-content-right .right-footer span {
    display: inline-block;
  }
  .intervalBg{
    background-color: #F4F4F4;
    height: 0.08rem;
    margin-bottom: 0.4rem;
  }
  /*活动*/
  .wrap{
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
    width: 92%;
    margin: 0 auto;
  }
  .box{
    border: 0.02rem solid #EFEFEF;
    border-radius: 0.08rem;
    height: 4.44rem;
  }
  .box p{
    padding: 0.1rem 0 0.08rem 0.2rem;
    font-size: 0.32rem;
    color: #222;
  }
  .date-box-left{
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 0 0 0.2rem;
    width: 70%;
    float: left;
  }
  .date-box-right{
    padding: 0 0 0 0.2rem;
    width: 25%;
    float: right;
    text-align: right;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .date-box-left span,.date-box-right span{
    color: #555555;
    font-size: 0.28rem;
  }
  .date-box-left img,.date-box-right img{
    margin-right: 0.16rem;
  }
  .liner{
    height: 0.08rem;
    background: #f4f4f4;
    margin: 0.3rem 0;
  }
  .headPic{
    height: 3.2rem;
    width: 100%;
    object-fit: cover;
  }
</style>
