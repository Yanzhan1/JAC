<template>
  <div>
    <!--<div class="header" style="background: #fff">
      <img class="header-left" src="../../../static/images/back@2x.png" alt="" @click="$router.go(-1)">
      <span class="header-title">我的收藏</span>
      <div class="header-right"></div>
    </div>-->
    <mhead currentTitle="我的收藏"></mhead>
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
            <p class="listTitleInfo" @click="goDiscDetail(item.manageId)">
              {{item.manageTitle.slice(0,46)}}
              <span v-if="item.manageTitle.length>46">...</span>
            </p>
            <img class="listPic312" @click="goDiscDetail(item.manageId)" :src="item.imgUrl"/>
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
      </div>
      <!--我收藏的活动-->
      <div v-else-if="contentchoose==2" >
        <!--活动列表S-->
        <div v-for="(item) in activityList" :key="item.id">
          <div class="boxInfo">
            <p class="listTitleInfo" @click="goActivityDetail(item.activityId, item.activityType)">
              {{item.activityTitle.slice(0,46)}}
              <span v-if="item.activityTitle.length>46">...</span>
            </p>
            <img class="listPic312" @click="goActivityDetail(item.activityId, item.activityType)" :src="item.imgUrl"/>
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
  import PublicHead from '../publicmodel/PublicHead';
  export default {
    name: "MyCollect",
    components: {
  		mhead:PublicHead
  	},
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
          path: "/information/informationDetail",
          query: { id: id }
        });
      },
      // 进入活动详情
      goActivityDetail: function (id, activityType) {
        var path = '';
        if(activityType == 2){
          path = '/activity/activityLive';
        }else{
          path = '/activity/activityDetail';
        }
        this.$router.push({
          path: path,
          query: {
            activityId: id
          }
        })
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
  .choose>div{
    flex: 1;
    /*margin-top: 0.88rem;*/
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
  .header{
    margin-left: -0.3rem;
  }
  .boxInfo{
    width: 92%;
    margin: 0 auto;
  }
</style>
