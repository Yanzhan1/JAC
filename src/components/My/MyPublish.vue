<template>
  <div class="all">
    <my-header :title="'我的发布'"></my-header>
    <!-- <div class="header">
        <img class="header-left" src="../../../static/images/back@2x.png" alt="" @click="$router.go(-1)">
        <span class="header-title">我的发布</span>
        <div class="header-right"></div>
      </div> -->
    <!-- <div style="height: 0.88rem;"></div> -->
    <!--社区列表S-->
    <div v-for="(item,index) in myList">
      <div class="boxInfo">
        <!--发布者信息S-->
        <div class="comment_userinfo">
          <div class="user_head">
            <div @click="changeUserStartId(item.user.user_id)">
              <img v-if="item.user && item.user.head_image" :src="item.user.head_image" class="head_72" />
              <img v-else src="../../../static/images/discover/normalhead.png" class="head_72" />
              <!--加V-->
              <img v-if="item.user && item.user.vflag.indexOf('V') != -1" src="../../../static/images/discover/v.png" class="head_list"/>
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
            <div class="guanzhu">
              <div v-if="item.user && userId != item.user.user_id">
                <div v-if="item.focusStatus == 0" @click="addFoucs(item.user.user_id,index)">
                  <img src="../../../static/images/discover/jgz.png">
                  <span class="font_4">关注</span>
                </div>
                <div v-else-if="item.focusStatus == 1" @click="removeFoucs(item.user.user_id,index)">
                  <img src="../../../static/images/discover/ygz.png">
                  <span class="font_4">已关注</span>
                </div>
                <div v-else="item.focusStatus == 2" @click="removeFoucs(item.user.user_id,index)">
                  <img src="../../../static/images/discover/ygz.png">
                  <span class="font_4">相互关注</span>
                </div>
              </div>
            </div>
            <div class="user_date">
              {{item.createDate}}
            </div>
          </div>
        </div>
        <!--发布者信息E-->
        <div class="listTitleInfo">
          <span @click="toDetail(item.id)">{{item.momentMessage}}</span>
          <p style="float: right;" @click="deleteNow(item.id)">删除</p>
        </div>
        <div class="pics" v-if="item.momentImgList">
          <div v-if="item.momentImgList.length==1" v-for="imgItem in item.momentImgList">
            <img @click="toDetail(item.id)" :src="imgItem" class="pic1" />
          </div>
          <div v-if="item.momentImgList.length==2">
            <img @click="toDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic2_1" />
            <img @click="toDetail(item.id)" :src="item.momentImgList[1]" class="pic2_2" />
          </div>
          <div v-if="item.momentImgList.length==3">
            <img @click="toDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1" />
            <img @click="toDetail(item.id)" :src="item.momentImgList[1]" class="pic3_2" />
            <img @click="toDetail(item.id)" :src="item.momentImgList[2]" class="pic3_3" />
          </div>
          <div v-if="item.momentImgList.length>3">
            <div class="shequMore_box">
              <div class="shequNum">
                {{item.momentImgList.length}}
              </div>
              <img @click="toDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1" />
              <img @click="toDetail(item.id)" :src="item.momentImgList[1]" class="pic3_2" />
              <img @click="toDetail(item.id)" :src="item.momentImgList[2]" class="pic3_3" />
            </div>
          </div>
        </div>
        <!--阅读数量,是否点赞以及点赞数量S-->
        <div class="listIconInfo">
          <img src="../../../static/images/discover/eye.png" class="f_left" />
          <span class="f_left">{{item.readNum}}</span>
          <span class="f_right">{{item.likeNum}}</span>
          <img v-if="item.likeStatus==0" src="../../../static/images/discover/nozan.png" class="f_right" @click="giveMomentLike(item.id,index)" />
          <img v-else src="../../../static/images/discover/zan.png" class="f_right" @click="removeMomentLike(item.id,index)" />
        </div>
        <!--阅读数量,是否点赞以及点赞数量E-->
      </div>
    </div>
    <!--社区列表E-->

  </div>
</template>

<script>
  import {
    MessageBox,
    Toast
  } from 'mint-ui';
  export default {
    name: "ugc",
    data() {
      return {
        myList: [],
        userId: this.$store.state.userId,
      }
    },
    methods: {
      //删除此刻
      deleteNow: function (manageId) {
        console.log(manageId)
        var _this = this;
        MessageBox.confirm('确定删除?').then(action => {
          this.$http.post(DISCOVERMESSAGE.deleteMoment, {
            "id": manageId
          }).then(function (res) {
            if (res.data.status) {
              Toast('删除成功');
              _this.getmyList();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
        });
      },
      getmyList: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.issueMomentList, {
          "uid": _this.$store.state.userId,
          "hisUid": _this.$store.state.UserStartId
        }).then(function (res) {
          if (res.data.status) {
            _this.myList = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      toDetail: function (id, userId) {
        this.$store.state.UserStartId = userId;
        this.$router.push({
          path: "/now/nowDetail",
          query: {
            id: id
          }
        })
      },
      //加关注
      addFoucs: function (foucsId, index) {
        var _this = this;
        console.log(this.$store.state.userId)
        this.$http.post(DISCOVERMESSAGE.focusOn, {
          "uid": _this.$store.state.userId,
          "focusId": foucsId
        }).then(function (res) {
          if (res.data.status) {
            _this.myList[index].focusStatus = res.data.data;
            for (var i = 0; i < _this.myList.length; i++) {
              if (_this.myList[i].user.user_id == foucsId) {
                _this.myList[i].focusStatus = res.data.data;
              }
            }
          } else {
            _this.toLogin();
          }
        });
      },
      //取消关注
      removeFoucs: function (foucsId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.unFocus, {
          "uid": _this.$store.state.userId,
          "focusId": foucsId
        }).then(function (res) {
          if (res.data.status) {
            _this.myList[index].focusStatus = res.data.data;
            _this.myList[index].focusStatus = res.data.data;
            for (var i = 0; i < _this.myList.length; i++) {
              if (_this.myList[i].user.user_id == foucsId) {
                _this.myList[i].focusStatus = res.data.data;
              }
            }
          } else {
            _this.toLogin();
          }
        });
      },
      //此刻点赞
      giveMomentLike: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentGiveLike, {
          "uid": _this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = false;
          } else {
            _this.toLogin();
          }
        });
      },
      //取消点赞
      removeMomentLike: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {
          "uid": _this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = true;
          } else {
            _this.toLogin();
          }
        });
      },
    },
    mounted() {
      this.getmyList();
    }
  }

</script>

<style scoped>
  @import "./../../../static/css/discover/all.css";
  @import "./../../../static/css/discover/detail.css";

  .header {
    margin-left: -0.3rem;
  }
  .head_list{
    width: 0.2rem !important;
    height: 0.2rem !important;
    position: relative;
    right: -0.54rem;
    bottom: 0.1rem;
  }
</style>
