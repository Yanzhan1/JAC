<template>
    <div class="all">
      <div @click="bgHide" id="bgShare"></div>
      <header class="header" id="head">
        <!--<header class="header headerOpacity" id="head">-->
        <img class="header-left" src="../../../../static/images/discover/backfff.png" @click="goBack">
        <p class="header-title">活动详情</p>
        <img src="../../../../static/images/discover/morefff.png"  @click="onShareClick(0)"/>
      </header>
      <!--<div id="mess" @click="onShareClick(0)">
          <img src="../../../../static/images/discover/shareOrange.png"/>
      </div>-->
      <shareBox :index="0" :item="content" :flag="flag" :type="type" :isCenter="true" @closeShare="bgHide"></shareBox>
      <div style="height: 0.88rem"></div>
      <img :src="content.imgUrl" style="width: 100%;" id="bgImg"/>
      <div class="detail">
        <p class="title">
          {{content.activityTitle}}
        </p>
        <div style="height: 0.48rem"></div>
        <div style="height: 0.4rem;width: 100%;line-height: 0.4rem;">
          <img src="../../../../static/images/discover/date1.png" style="vertical-align: middle;"/>
          <span class="w_03">活动时间：{{content.planDate}}</span>
        </div>
        <div style="height: 0.32rem"></div>
        <div style="height: 0.4rem;width: 100%;line-height: 0.4rem;">
          <!--<img src="../../../../static/images/discover/huodongdingwei@2x.png" style="vertical-align: middle;"/>-->
          <span class="w_03">活动地点：{{content.activityAddress}}</span>
        </div>
        <div style="height: 0.48rem"></div>
          <div  class="act_13" to="/activity/detailactivity/WantGo" style="width: 100%;">
            <div class="act_14">
              <img v-for="item in showJoinList.slice(0,10)" :src="item" width="50px" height="50px" style="border-radius: 25px;margin-left: -0.2rem;"/>
            </div>
            <div class="act_15" >
              <span v-if="content.joinList" class="go-num">
                {{content.joinList.length}}人想参加
              </span>
              <span v-else class="go-num">
                0人想参加
              </span>
            </div>
            <div class="act_16">
              <!--<span v-if="content.collectionStatus">
                <img src="../../../../static/images/discover/shoucang.png" alt="" @click="collection" >
              </span>
              <span v-else>
                <img src="../../../../static/images/discover/shoucang1.png" alt="" @click="messageBoxCofirm">
              </span>-->
            </div>
          </div>
          <p class="content" v-html="content.activityBody">
          </p>
          <div class="like">
            <img src="../../../../static/images/discover/eye.png" class="likeIcon" style="margin-right: 0.1rem;"/>
            <span style="color: #CCCCCC;font-size: 0.24rem;margin-right: 0.1rem;float:left;">{{this.readnum}}</span>
            <span style="color: #CCCCCC;font-size: 0.24rem;margin-left: 0.1rem;float:right">{{content.likeNum}}</span>
            <span v-if="content.likeStatus" style="float:right;margin-right: 0.1rem;">
              <img src="../../../../static/images/discover/nozan.png" alt="" class="likeIcon" @click="giveActivityLike">
            </span>
            <span v-else style="float:right;margin-right: 0.1rem;">
              <img src="../../../../static/images/discover/zan.png" alt="" class="likeIcon" @click="removeActivityLike">
            </span>

          </div>
          <div style="height: 1rem;"></div>
      </div>
      <div class="liner"></div>
      <div  v-if="content.activityState==2" v-for="(item,index) in pictureList" style="width: 90%;margin: auto;">
        <div class="d_02">
          <div class="d_03" style="width: 100%;" @click="changeUserStartId(item.user.user_id)">
            <img v-if="item.user" :src="item.user.head_image" class="user-head"/>
            <img v-else src="../../../../static/images/discover/normalhead.png" class="user-head" />
            <div class="user-name">
              <span v-if="item.user">{{item.user.nick_name}}</span>
              <span v-else>尚未设置昵称</span>
            </div>
          </div>
        </div>
        <div style="height: 0.4rem;"></div>
        <div class="pic-title"><span @click="toDetail(item.id)">{{item.message}}</span>
          <span style="float: right;" v-if="item.user && self(item.user.user_id)" @click="deletePic(item.id)">删除</span></div>
        <div class="pics">
          <div v-if="item.showImgList && item.showImgList.length>0 && item.showImgList!=''" style="width:100%;flex-wrap: wrap" class="flex between">
            <div v-for="imgItem in item.showImgList"
                 :style="item.showImgList.length==1?
               'width:100%':((item.showImgList.length==2 || item.showImgList.length==4)?
               'width:48%':'width:32%')">
              <img @click="toDetail(item.id)" :src="imgItem" style="border-radius: 0.1rem;width: 100%;"
                   :style="(item.showImgList.length ==1 || item.showImgList.length == 2 || item.showImgList.length == 4)
                    ? 'height:3.2rem':'height:2.4rem'"/>
            </div>
          </div>
        </div>
        <div class="d_07">
          <div class="d_08">
            <div style="float:right;">
              <span v-if="item.likeStatus">
                <img src="../../../../static/images/discover/nozan.png" alt="" @click="giveShowPictureLike(index,item.id)" style="width: 0.32rem;" >
              </span>
              <span v-else>
                <img src="../../../../static/images/discover/zan.png" alt="" @click="removeShowPictureLike(index,item.id)" style="width: 0.32rem;" >
              </span>
              <span style="color: #888888;font-size: 0.24rem;">{{item.likeNum}}</span>
              <img src="../../../../static/images/discover/comment.png" style="width: 0.32rem;" @click="toDetail(index,item.id)"/>
              <span style="color: #888888;font-size: 0.24rem;">{{item.commentNum}}</span>
            </div>
            <span class="date">{{item.issuedDate}}</span>
          </div>
        </div>
        <div style="height: 0.2rem;"></div>
        <div style="height: 0.02rem;background-color: #f8f8f8;width: 100%;"></div>
        <div style="height: 0.2rem;"></div>
      </div>

      <div style="height: 2rem;"></div>
      <div style="height: 1.4rem;background: #ffffff;bottom: 0;position: fixed;width: 100%;"></div>
      <div v-if="userId">
        <div v-if="content.activityState==2 || content.activityState==1" class="d_06" @click="toPic(content.activityId)" >
          <div class="wantgo">晒图</div>
        </div>
        <div v-else-if="content.activityState==0 && content.joinStatus">
          <router-link tag="div" class="d_06"  :to="{path:'/activity/detailactivity/WantGo',query: {activityId: content.activityId}}">
            <div class="wantgo">预约报名</div>
          </router-link>
        </div>
        <div v-else-if="content.activityState==0 && !content.joinStatus" class="d_06">
          <div class="wantgo">已报名</div>
        </div>
      </div>
      <div v-else class="d_06" @click="cantWantGo">
        <div class="wantgo">报名</div>
      </div>
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
    /*悬浮，预留*/
    /*$(document).ready(function(){
      var imgHeight = 0;
      $("#bgImg").on("load",function(){
        imgHeight = $(this).height();
      });

      $(document).scroll(function(){
        var top = $(document).scrollTop();
        if(top < imgHeight){
          $("#head").addClass("headerOpacity");
        }
        else if(top >= imgHeight){
          $("#head").removeClass("headerOpacity");
          $("#head").addClass("headerBg");
        }
      });
    });*/
</script>

<style scoped>
  .all{
    font-size: 0.4rem;
    line-height: normal;
    background: #fff;
    height: auto;
  }
  .header{
    background:#1A1D23;
  }
  .headerOpacity{
    opacity: 0;
  }
  .headerBg{
    opacity: 1;
  }
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
  .detail{
    padding-top: 0.62rem;
    height: auto;
    width: 92%;
    margin: 0 auto;

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
