<template>
    <div>
      <div @click="bgHide" id="bgShare"></div>
      <header class="header header1" id="header1">
        <img class="header_left" src="../../../../static/images/discover/backfff.png" @click="goBack">
        <img class="header_right" src="../../../../static/images/discover/morefff.png" @click="onShareClick(0)"/>
      </header>
      <header class="header header2" id="header2" style="display: none">
        <img class="header_left" src="../../../../static/images/discover/backblue.png" @click="goBack">
        <p class="header-title-fff">活动详情</p>
        <img class="header_right" src="../../../../static/images/discover/moreblue.png" @click="onShareClick(0)"/>
      </header>
      <!--活动内容S-->
      <shareBox :index="0" :item="content" :flag="flag" :type="type" :isCenter="true" @closeShare="bgHide"></shareBox>
      <img :src="content.imgUrl" style="width: 100%;" id="bgImg"/>
      <div class="wrap_92">
        <p class="contentActTitle">
          {{content.activityTitle}}
        </p>
        <div class="duiqiDiv">
          <img src="../../../../static/images/discover/date1.png" class="w_28 mr_16 v_m f_left"/>
          <span class="font_4">{{content.planDate}}</span>
        </div>
        <div style="margin-top: 0.4rem;margin-bottom: 0.4rem;margin-left: 0.2rem;">
          <img v-for="item in showJoinList.slice(0,10)" :src="item" class="sign_head"/>
          <span v-if="content.joinList" class="blue_28 ml_2">
            {{content.joinList.length}}人想参加
          </span>
          <span v-else class="blue_28 ml_2">
            0人想参加
          </span>
        </div>
        <p class="content" v-html="content.activityBody"></p>
        <div class="contentIconInfo">
          <!--阅读数量-->
          <img src="../../../../static/images/discover/eye.png" class="f_left"/>
          <span class="f_left">{{content.readNum}}</span>
          <!--是否点赞以及点赞数量-->
          <span class="f_right">{{content.likeNum}}</span>
          <img v-if="content.likeStatus" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveActivityLike">
          <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeActivityLike">
        </div>
      </div>
      <!--活动内容E-->
      <!--晒图内容S-->
      <div class="flag_word">用户晒图()</div>
      <div  v-if="content.activityState==2" v-for="(item,index) in pictureList" style="width: 92%;margin: auto;">
        <!--发布者信息S-->
        <div class="comment_userinfo">
          <div class="user_head">
            <div @click="changeUserStartId(content.user.user_id)">
              <img v-if="content.user" :src="content.user.head_image"/>
              <img v-else src="../../../../static/images/discover/normalhead.png" />
            </div>
          </div>
          <div class="user_info">
            <div v-if="content.user" class="user_name">
              {{content.user.nick_name}}
            </div>
            <div v-else class="user_name">
              尚未设置昵称
            </div>
            <div class="shaitu">
              <img class="f_left" src="../../../../static/images/discover/comment.png" alt="" @click="toDetail(item.id)">
              <span class="num_28 f_left mr_32">{{item.commentNum}}</span>
              <img v-if="item.likeStatus" class="f_left" src="../../../../static/images/discover/nozan.png" alt="" @click="giveShowPictureLike(index,item.id)">
              <img v-else class="f_left" src="../../../../static/images/discover/zan.png" alt="" @click="removeShowPictureLike(index,item.id)">
              <span class="num_28 f_left">{{item.likeNum}}</span>
            </div>
            <div class="user_date">
              {{item.issuedDate}}
            </div>
          </div>
        </div>
        <!--发布者信息E-->
        <div class="picTitle"><span @click="toDetail(item.id)">{{item.message}}</span>
        <span style="float: right;" v-if="item.user && self(item.user.user_id)" @click="deletePic(item.id)">删除</span></div>
        <div v-if="item.showImgList && item.showImgList.length>0 && item.showImgList!=''" @click="toDetail(item.id)">
          <div v-if="item.showImgList.length==1">
            <img :src="item.showImgList[0]" class="shaitu1">
          </div>
          <div v-if="item.showImgList.length==2" class="shaitu2_box">
            <img :src="item.showImgList[0]" class="shaitu2_1 mr_2">
            <img :src="item.showImgList[1]" class="shaitu2_2">
          </div>
          <div v-if="item.showImgList.length==3" class="shaitu3_box">
            <img :src="item.showImgList[0]" class="shaitu3_1 mr_2">
            <img :src="item.showImgList[1]" class="shaitu3_2 mr_2">
            <img :src="item.showImgList[2]" class="shaitu3_3">
          </div>
          <div v-if="item.showImgList.length>3" class="shaituMore_box">
            <div class="shaituNum">
              {{item.showImgList.length}}
            </div>
            <img :src="item.showImgList[0]" class="shaitu3_1 mr_2">
            <img :src="item.showImgList[1]" class="shaitu3_2 mr_2">
            <img :src="item.showImgList[2]" class="shaitu3_3">
          </div>
        </div>
        <div style="height: 0.4rem;"></div>
        <div style="height: 0.02rem;background-color: #f8f8f8;width: 100%;"></div>
        <div style="height: 0.4rem;"></div>
      </div>
      <!--晒图内容E-->
      <div style="height: 0.88rem;"></div>
      <!--按钮控制S-->
      <div v-if="userId">
        <div class="sign_btn" v-if="content.activityState==2 || content.activityState==1" @click="toPic(content.activityId)">
          晒&nbsp;图
        </div>
        <div class="sign_btn" v-else-if="content.activityState==0 && content.joinStatus" @click="toSign(content.activityId)">
          报&nbsp;名
        </div>
        <div class="sign_btn" v-else-if="content.activityState==0 && !content.joinStatus" @click="toPic(content.activityId)">
          已报名
        </div>
      </div>
      <div class="sign_btn" v-else  @click="cantWantGo">
        报&nbsp;名
      </div>
      <!--按钮控制E-->
      <div id="bg1" @click="bgbtn1" style="display: none;  position:fixed;  top: 0;  left: 0;  width: 100%;  height: 100%;  background-color: black;  z-index:1; opacity: 0;"/>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import shareBox from '../component/shareBox.vue';
    import { Toast } from 'mint-ui';
    export default {
        name: "detail-activity",
      data(){
          return{
            listNum: 3,
            activityId: '',
            content: [],
            readnum: 0,
            flag: 'activity',
            type: 'activity',
            pictureList:[],
            showJoinList:[],
            userId: this.$store.state.userId
          }
      },
      created(){
        this.activityId = this.$route.query.activityId;
      },
      components: {
        shareBox
      },
      methods:{
        toDetail: function (id) {
          this.$router.push({path:"/discover/picDetail",query:{id:id}})
        },
        toSign: function (id) {
          this.$router.push({path:"/activity/toSign",query:{activityId:id}})
        },
        toPic: function (id) {
          if (isMobile.iOS()) {
            window.webkit.messageHandlers.toPic.postMessage("");
          } else if(isMobile.Android()) {
            NativeJavaScriptInterface.send("晒图");
          }
        },
        self(id){
          if(id==this.$store.state.userId){
            return true;
          }else{
            return false;
          }
        },
        changeUserStartId(id){
          if(id == this.$store.state.userId){
            this.$router.push({path:'/my/mystart'});
          }else{
            this.$store.state.UserStartId = id;
            this.$router.push({path:'/userstart'});
          }
        },
        cantWantGo(){
          this.toLogin();
        },
        //活动详情
        getActivity(){
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.getActivityDetail, {"uid": _this.$store.state.userId,"id": this.activityId}, ).then(function (res) {
            if (res.data.status) {
              _this.content = res.data.data;
              if(res.data.data.joinList){
                _this.showJoinList = res.data.data.joinList.slice(0,10);
              }
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
        },
        //活动点赞
        giveActivityLike: function () {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.activetyGiveLike, {"uid": _this.$store.state.userId,"lid": _this.activityId}, ).then(function (res) {
            if (res.data.status) {
              _this.content.likeNum = res.data.data.num;
              _this.content.likeStatus = false;
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //晒图列表
        getPictureList(){
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.pictureList, {"uid": _this.$store.state.userId,"id": _this.activityId}).then(function (res) {
            if (res.data.status) {
              _this.pictureList = res.data.data;
            } else {
              console.log(res.data.errorMsg);
            }
          });
        },
        //取消点赞
        removeActivityLike: function () {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.activetyRemoveLike, {"uid": _this.$store.state.userId,"lid": _this.activityId}, ).then(function (res) {
            if (res.data.status) {
              _this.content.likeNum = res.data.data.num;
              _this.content.likeStatus = true;
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //收藏
        collection: function () {
          var _this = this;
          console.log(_this.userId);
          this.$http.post(DISCOVERMESSAGE.activetyCollection, {"uid": _this.userId,"lid": _this.activityId}).then(function (res) {
            if (res.data.status) {
              _this.content.collectionStatus = false;
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //取消收藏
        messageBoxCofirm: function(){
          var _this = this;
          MessageBox.confirm('确定取消收藏?').then(action => {
            var _this = this;
            this.$http.post(DISCOVERMESSAGE.activetyRemoveCollection, {"uid": _this.userId,"lid": _this.activityId}, ).then(function (res) {
              if (res.data.status) {
                _this.content.collectionStatus = true;
                Toast('取消成功');
              } else {
                if(_this.$store.state.userId == null){
                  _this.toLogin();
                }else{
                  MessageBox('提示', res.data.errorMsg);
                }
              }
            });
          });
        },
        //浏览量
        getReadNum: function () {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.activetyRead, {"uid": _this.userId,"lid": _this.activityId}, ).then(function (res) {
            if (res.data.status) {
              _this.readnum = res.data.data;
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
        },
        //取消报名
        removeWant: function () {
          var _this = this;
          MessageBox.confirm('确定取消报名?').then(action => {
          this.$http.post(DISCOVERMESSAGE.activetyRemoveWant, {"uid": _this.userId,"aid": _this.activityId}, ).then(function (res) {
            if (res.data.status) {
              Toast('取消报名成功');
              _this.getActivity();
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
          });
        },
        //删除晒图
        deletePic: function (id) {
          var _this = this;
          MessageBox.confirm('确定删除晒图?').then(action => {
            this.$http.post(DISCOVERMESSAGE.deleteShowPicture, {"id": id}).then(function (res) {
              if (res.data.status) {
                Toast('删除成功');
                _this.getPictureList();
              } else {
                if(_this.$store.state.userId == null){
                  _this.toLogin();
                }else{
                  MessageBox('提示', res.data.errorMsg);
                }
              }
            });
          });
        },
        //晒图点赞
        giveShowPictureLike: function (index,id) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.giveShowPictureLike, {"uid": _this.userId,"lid": id}).then(function (res) {
            if (res.data.status) {
              _this.pictureList[index].likeNum = res.data.data.num;
              _this.pictureList[index].likeStatus = false;
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //晒图取消点赞
        removeShowPictureLike: function (index,id) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.removeShowPictureLike, {"uid": _this.userId,"lid":id}).then(function (res) {
            if (res.data.status) {
              _this.pictureList[index].likeNum = res.data.data.num;
              _this.pictureList[index].likeStatus = true;
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //分享
        share(){
          $("#mess").show();
          $("#bg1").show();
        },
        bgbtn1(){
          $("#mess").hide();
          $("#bg1").hide();
        },
        onShareClick: function (index) {
          this.indexNum = index;
          var showId = '#share_activity'+index;
          $(showId).show();
          $("#bgShare").show();
          this.bgbtn1();
        },
        bgHide: function () {
          var showId = '#share_activity'+this.indexNum;
          $(showId).hide();
          $("#bgShare").hide();
        },
        //返回上一级
        goBack:function () {
          this.$router.go(-1);
          this.$store.dispatch("showFoot")
        },
      },
      mounted(){
          this.$store.dispatch("hideFoot")
          this.$nextTick(function () {
            //初始化数据
            this.getActivity();
            this.getReadNum();
            this.getPictureList();
          })
      }
    }
    /*悬浮,更换头部背景透明度和文字*/
     $(document).ready(function(){
       //获取图片高度imgHeight
       var imgHeight = 0;
       $("#bgImg").on("load",function(){
         imgHeight = $(this).height();
       });
       //根据图片高度切换透明/不透明头部
       $(document).scroll(function(){
         var top = $(document).scrollTop();
         if(top < imgHeight){
           $("#header1").show();
           $("#header2").hide();
         }
         else if(top >= imgHeight){
           $("#header1").hide();
           $("#header2").show();
         }
       });
     });
</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";
  .act_13{
    height: 0.5rem;
    display: flex;
    flex-direction: row;
    padding-left: 0.2rem;
    margin-bottom: 0.4rem;
  }
  .act_14{
    display: flex;flex-direction: row;align-items: center;
  }
  .act_15{
    width: 96%;display: flex;flex-direction: row;align-items: center;font-size: 0.3rem;color: #222222;padding-left: 0.2rem;
  }
  .act_16{
    width: 0.32rem;display: flex;flex-direction: row;align-items: center;float: right;
  }
  .act_16 img{
    height: 0.32rem;width: 0.32rem
  }
  .title{
    color: #222222;
    font-size: 0.44rem;
  }
  .content{
    font-family: PingFangSC-Regular;
    font-size: 0.24rem;
    color: #555555 !important;
    letter-spacing: -0.29px;
    text-align: justify;
    line-height: 0.44rem;
    text-indent: 0.6rem;
    overflow: hidden;
    width: 100%;
  }
  .wantgo{
    background: #FC3846;
    border-radius: 0.16rem;
    height: 0.88rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.88rem;
    position: fixed;
    bottom: 0.3rem;
    width: 92%;
    margin-left: 4%;
  }
  #mess{
    z-index: 666;position: fixed;margin-top: 1rem;right: 0.1rem;display: none;
  }
  #bgShare{
    position: fixed; width: 100%;height: 100%;background: black; display: none;opacity: 0.2
  }
  .like{
    margin-top: 0.4rem;height: 0.32rem;line-height: 0.44rem;
  }
  .likeIcon{
    width: 0.44rem;float:left;
  }
  .liner{
    height: 0.2rem;background: #f8f8f8;
    margin-bottom: 0.4rem;
  }
  .pics{
    width: 100%;
    margin: auto;
    text-align: center;
  }
  .user-head{
    border-radius: 15px;width:0.72rem;height: 0.72rem;
    float: left;
  }
  .user-name{
    float: left;color: #222222;font-size: 0.28rem;padding-left: 0.2rem;
    width: 88%;
    height: 0.72rem;
    line-height: 0.72rem;
  }
  .pic-title{
    font-size: 0.28rem;
    color: #555555;
    margin-top: 0.6rem;
    margin-bottom: 0.3rem;
  }
  .date{
    font-size: 0.24rem;
    color: #888888;
    float: left;
  }
  .d_08{
    height: 0.7rem;
    line-height: 0.7rem;
  }
  .header-title{
    color: #FC3846 ;
    font-size: 0.36rem;
  }
  .go-num{
    color: #FC3846;
    font-size: 0.28rem;
  }
  .w_01{
    width: 100%;height: 0.8rem;line-height: 0.8rem
  }
  .w_02{
    width: 0.4rem;height: 0.4rem;vertical-align: middle;
  }
  .w_03{
    font-size: 0.28rem;color: #999999;
  }
</style>
