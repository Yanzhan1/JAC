<template>
  <div>
    <div @click="bgHide" id="bgShare"></div>
    <my-header :id="'asd'" :title="title" :isShow="isShow" :rightPic="rightPic">
      <img slot="share" v-show="leftPic" src="../../../../static/images/discover/morefff.png" @click="onShareClick(0)" />
      <img slot="share" v-show="!leftPic" src="../../../../static/images/discover/moreblue.png" @click="onShareClick(0)" />
    </my-header>
    <!--活动内容S-->
    <div>
      <shareBox :index="0" :item="content" :flag="flag" :type="type" :collectionStatus="content.collectionStatus"
                :isCenter="true" @closeShare="bgHide" @collection="collection" @reCollection="messageBoxCofirm"></shareBox>
      <img :src="content.imgUrl" style="width: 100%;" id="bgImg" />
    <div class="wrap_92">
      <p class="contentActTitle">
        {{content.activityTitle}}
      </p>
      <div class="duiqiDiv">
        <img src="../../../../static/images/discover/date1.png" class="w_28 mr_16 v_m f_left" />
        <span class="font_4">{{content.planDate}}</span>
      </div>
      <div style="margin-top: 0.4rem;margin-bottom: 0.4rem;margin-left: 0.2rem;">
        <template v-if="showJoinList.length > 0">
          <template v-for="item in showJoinList.slice(0,10)">
            <img v-if="item" :src="item" class="sign_head" />
            <img v-else src="../../../../static/images/discover/normalhead.png" class="sign_head" />
          </template>
        </template>
        <img v-else src="../../../../static/images/discover/normalhead.png" class="sign_head" />
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
        <img src="../../../../static/images/discover/eye.png" class="f_left" />
        <span class="f_left">{{content.readNum}}</span>
        <!--是否点赞以及点赞数量-->
        <span class="f_right">{{content.likeNum}}</span>
        <img v-if="content.likeStatus" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveActivityLike">
        <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeActivityLike">
      </div>
    </div>
    <!--活动内容E-->
    <!--晒图内容S-->
    <div class="flag_word">用户晒图({{pictureList.length}})</div>
    <div v-if="content.activityState==2||content.activityState==1" v-for="(item,index) in pictureList" style="width: 92%;margin: auto;">
      <!--发布者信息S-->
      <div class="comment_userinfo">
        <div class="user_head">
          <div @click="changeUserStartId(item.user.user_id)">
            <img v-if="item.user && item.user.head_image" :src="item.user.head_image" />
            <img v-else src="../../../../static/images/discover/normalhead.png" />
            <!--加V-->
            <!-- <img v-if="item.user && item.user.vflag.indexOf('V') != -1" src="../../../../static/images/discover/v.png" class="head_list"/> -->
            <img class="heade_99" v-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('普通会员')!=-1" src="../../../../static/images/my/member1_v.png" alt="">
            <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('认证会员')!=-1" src="../../../../static/images/my/member2_v.png" alt="">
            <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('白银会员')!=-1" src="../../../../static/images/my/member3_v.png" alt="">
            <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('黄金会员')!=-1" src="../../../../static/images/my/member4_v.png" alt="">
            <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('钻石会员')!=-1" src="../../../../static/images/my/member5_v.png" alt="">
            <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('普通会员')!=-1" src="../../../../static/images/my/member1.png" alt="">
            <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('认证会员')!=-1" src="../../../../static/images/my/member2.png" alt="">
            <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('白银会员')!=-1" src="../../../../static/images/my/member3.png" alt="">
            <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('黄金会员')!=-1" src="../../../../static/images/my/member4.png" alt="">
            <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('钻石会员')!=-1" src="../../../../static/images/my/member5.png" alt="">
          </div>
        </div>
        <div class="user_info">
          <div v-if="item.user" class="user_name">
            {{item.user.nick_name}}
          </div>
          <div v-else class="user_name">
            尚未设置昵称
          </div>
          <span v-if="item.user && item.user.vflag.indexOf('JAC') != -1" class="jac">JAC</span>
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
      <div class="picTitle">
        <span @click="toDetail(item.id)">{{item.message}}</span>
        <span style="float: right;" v-if="item.user && self(item.user.user_id)" @click="deletePic(item.id)">删除</span>
      </div>
      <div v-if="item.showImgList && item.showImgList.length>0 && item.showImgList!=''" @click="toDetail(item.id)">
        <!--加精华-->
        <img v-if="item.supreme==1" src="../../../../static/images/discover/jinghua.png" class="jinghua"/>
        <div v-if="item.showImgList.length==1">
          <img :src="item.showImgList[0]" class="shaitu1" style="object-fit: cover;">
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
      <activity-button
        :activityId="content.activityId"
        :userId="userId"
        :activityType="content.activityType"
        :activityState="content.activityState"
        :joinStatus="content.joinStatus"
        @cantWantGo="cantWantGo"
        @toSign="toSign"
        @toPic="toPic"
        @removeWant="removeWant"></activity-button>
      <!--按钮控制E-->

    </div>
    <div id="bg1" @click="bgbtn1" style="display: none;  position:fixed;  top: 0;  left: 0;  width: 100%;  height: 100%;  background-color: black;  z-index:1; opacity: 0;" />
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'mint-ui';
  import shareBox from '../component/shareBox.vue';
  import ActivityButton from '../component/ActivityButton'
  import {
    Toast
  } from 'mint-ui';
  export default {
    name: "detail-activity",
    data() {
      return {
        listNum: 3,
        activityId: '',
        content: {},
        readnum: 0,
        flag: 'activity',
        type: 'activity',
        pictureList: [],
        showJoinList: [],
        userId: this.$store.state.userId,
        leftPic: true,
        rightPic: true,
        bgImgHeight: 0,
        title: '',
        isShow: true
      }
    },
    created() {
      this.activityId = this.$route.query.activityId;
    },
    components: {
      shareBox,
      ActivityButton
    },
    methods: {
      toDetail: function (id) {
        this.$router.push({
          path: "/activity/pictureDetail",
          query: {
            id: id
          }
        })
      },
      toSign: function (id,activityType) {
        if(!this.$store.state.userId){
          this.toLogin()
          return
        }
        this.$router.push({
          path: "/activity/toSign",
          query: {
            activityId: id,
            activityType:activityType
          }
        })
      },
      toPic: function (id) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        if (isMobile.iOS()) {
          let params = {
            userId:_this.$store.state.userId,
            activityId:_this.content.activityId
          }
          window.webkit.messageHandlers.toPic.postMessage(params);
        } else if (isMobile.Android()) {
          js2android.send("晒图", this.$store.state.userId, this.content.activityId);
        }
      },
      self(id) {
        if (id == this.$store.state.userId) {
          return true;
        } else {
          return false;
        }
      },
      changeUserStartId(id) {
        if (id == this.$store.state.userId) {
          this.$router.push({
            path: '/mystart'
          });
        } else {
          this.$store.state.UserStartId = id;
          this.$router.push({
            path: '/userstart'
          });
        }
      },
      cantWantGo() {
        this.toLogin();
      },
      //活动详情
      getActivity() {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.getActivityDetail, {
          "uid": _this.$store.state.userId,
          "id": this.activityId
        }, ).then(function (res) {
          if (res.data.status) {
            _this.content = res.data.data;
            if (res.data.data.joinList) {
              _this.showJoinList = res.data.data.joinList.slice(0, 10);
              console.log(_this.showJoinList)
            }
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //活动点赞
      giveActivityLike: function () {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.activetyGiveLike, {
          "uid": _this.$store.state.userId,
          "lid": _this.activityId
        }, ).then(function (res) {
          if (res.data.status) {
            _this.content.likeNum = res.data.data.num;
            _this.content.likeStatus = false;
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //晒图列表
      getPictureList() {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.pictureList, {
          "uid": _this.$store.state.userId,
          "lid": _this.activityId
        }).then(function (res) {
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
        this.$http.post(DISCOVERMESSAGE.activetyRemoveLike, {
          "uid": _this.$store.state.userId,
          "lid": _this.activityId
        }, ).then(function (res) {
          if (res.data.status) {
            _this.content.likeNum = res.data.data.num;
            _this.content.likeStatus = true;
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //收藏
      collection: function () {
        var _this = this;
        console.log(_this.userId);
        this.$http.post(DISCOVERMESSAGE.activetyCollection, {
          "uid": _this.userId,
          "lid": _this.activityId
        }).then(function (res) {
          if (res.data.status) {
            _this.content.collectionStatus = 1;
            setTimeout(() => {
              _this.bgHide();
            }, 2000)
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //取消收藏
      messageBoxCofirm: function () {
        var _this = this;
        /*MessageBox.confirm('确定取消收藏?').then(action => {*/
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.activetyRemoveCollection, {
          "uid": _this.userId,
          "lid": _this.activityId
        }).then(function (res) {
          if (res.data.status) {
            _this.content.collectionStatus = 0;
            setTimeout(() => {
              _this.bgHide();
            }, 2000)
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
        /*});*/
      },
      //浏览量
      getReadNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.activetyRead, {
          "uid": _this.userId,
          "lid": _this.activityId
        }, ).then(function (res) {
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
          this.$http.post(DISCOVERMESSAGE.activetyRemoveWant, {
            "uid": _this.userId,
            "aid": _this.activityId
          }, ).then(function (res) {
            if (res.data.status) {
              Toast('取消报名成功');
              _this.getActivity();
            } else {
              if (_this.$store.state.userId == null) {
                _this.toLogin();
              } else {
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
          this.$http.post(DISCOVERMESSAGE.deleteShowPicture, {
            "id": id
          }).then(function (res) {
            if (res.data.status) {
              Toast('删除成功');
              _this.getPictureList();
            } else {
              if (_this.$store.state.userId == null) {
                _this.toLogin();
              } else {
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        });
      },
      //晒图点赞
      giveShowPictureLike: function (index, id) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.giveShowPictureLike, {
          "uid": _this.userId,
          "lid": id
        }).then(function (res) {
          if (res.data.status) {
            _this.pictureList[index].likeNum = res.data.data.num;
            _this.pictureList[index].likeStatus = false;
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //晒图取消点赞
      removeShowPictureLike: function (index, id) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.removeShowPictureLike, {
          "uid": _this.userId,
          "lid": id
        }).then(function (res) {
          if (res.data.status) {
            _this.pictureList[index].likeNum = res.data.data.num;
            _this.pictureList[index].likeStatus = true;
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //分享
      share() {
        $("#mess").show();
        $("#bg1").show();
      },
      bgbtn1() {
        $("#mess").hide();
        $("#bg1").hide();
      },
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_activity' + index;
        $(showId).show();
        $("#bgShare").show();
        this.bgbtn1();
      },
      bgHide: function () {
        var showId = '#share_activity' + this.indexNum;
        $(showId).hide();
        $("#bgShare").hide();
      },
      //返回上一级
      goBack: function () {
        this.$router.go(-1);
      },
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var scrollHeight = (scrollTop / this.bgImgHeight).toFixed(1);
        if (scrollHeight == 0.0) {
          scrollHeight = 0;
        } else if (scrollHeight > 0.9) {
          scrollHeight = 1;
        }
        if (scrollHeight > 0.4) {
          this.leftPic = false;
          this.rightPic = false;
        } else if (scrollHeight <= 0.4) {
          this.leftPic = true;
          this.rightPic = true;
        }
        if (scrollHeight == 1) {
          this.title = '活动详情'
          this.isShow = false
        }else {
          this.title = ''
          this.isShow = true
        }
        $("#asd").css("background", `rgba(255, 255, 255, ${scrollHeight})`)
      },
    },
    mounted() {
      this.$store.dispatch("hideFoot")
      /*悬浮,更换头部背景透明度和文字*/
      window.addEventListener('scroll', this.handleScroll)
      //初始化数据
      this.$nextTick(function () {
        this.getActivity();
        this.getReadNum();
        this.getPictureList();
      })
      window.getPictureList = this.getPictureList
    },
    updated() {
      this.$nextTick(() => {
        const bgImg = document.querySelector('#bgImg')
        const asd = document.querySelector('#asd')

        this.bgImgHeight = bgImg.getBoundingClientRect().height - asd.getBoundingClientRect().height
      })
    }
  }

</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";

  .act_16 img {
    height: 0.32rem;
    width: 0.32rem
  }

  .content {
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

  .content>>>img {
    width: 100%;
    height: auto;
  }

  #bgShare {
    position: fixed;
    width: 100%;
    height: 100%;
    background: black;
    display: none;
    opacity: 0.2
  }
  .jinghua{
    width: 1.12rem !important;
    height: 1.12rem !important;
    position: absolute;
    right: 4%;
  }
  .head_list{
    width: 0.2rem !important;
    height: 0.2rem !important;
    position: relative;
    right: -0.54rem;
    bottom: 0.1rem;
  }
  .heade_99{
    display: block;
    width: .7rem !important;
    height: 0.25rem !important;
    bottom: .1rem;
    position: relative;
  }
  .heade_98{
    display: block;
    width: .7rem !important;
    height: 0.2rem !important;
    bottom: .1rem;
    position: relative;
  }
</style>
