<template>
  <div>
    <my-header :id="'asd'" :title="title" :isShow="isShow" :rightPic="leftPic">
      <!-- <img slot="backblue" v-show="leftPic" src="../../../static/images/discover/backfff.png" />
      <img slot="backblue" v-show="!leftPic" src="../../../static/images/discover/backblue.png" /> -->
    </my-header>
    <!-- <header class="headerUser" id="header2" style="display: none">
      <img class="f_left" src="../../../static/images/discover/backblue.png" @click="goBack">
      <img class="f_left head_4" src="../../../static/images/discover/normalhead.png">
      <p class="header-title-fff" style="margin-left: 30%;">
        {{userInfo.userName}}</p>
    </header>
    <div class="box" style="box-sizing: content-box;" :style="$statusBarHeightObj"></div> -->
    <div class="startbg">
      <div :class="['wrapbg' ,vFlag ? 'left4' : '']">
        <img v-if="userInfo && userInfo.headUrl" :src="userInfo.headUrl" alt="">
        <img v-else src="../../../static/images/discover/normalhead.png" />
        <!--加V-->
        <img v-if="userInfo && vFlag" src="../../../static/images/discover/v.png" class="head_22"/>
      </div>
      <div class="user_info">
        <p class="font_36 mb_16">
          {{userInfo.userName}}</p>
        <!--加V-->
        <div class="tagstopbottom flex" v-if="userInfo.entitys">
          <div v-for="item in userInfo.entitys" class="tags">{{item.entity}}</div>
        </div>
        <div style="clear: both"></div>
        <p class="font_24fff">{{userInfo.personalSignature}}</p>
        <div class="mytopbottom flex around">
          <div>
            <span>获赞</span>
            <span>{{likeNum}}</span>
          </div>
          <div @click="toFocus">
            <span>关注</span>
            <span>{{focusNum}}</span>
          </div>
          <div @click="toFans">
            <span>粉丝</span>
            <span>{{fansNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--社区列表S-->
    <div style="padding: 0.4rem 0.32rem;">
      <p class="font_5 f_left">我的发布</p>
      <p class="font_6 f_right">共{{myList.length}}条发布</p>
    </div>
    <div v-for="(item,index) in myList">
      <div class="boxInfo wrap_92 pt_4">
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
            <div class="user_date">
              {{item.createDate}}
            </div>
          </div>
        </div>
        <!--发布者信息E-->
        <div @click="toDetail(item.id)" class="listTitleInfo">{{item.momentMessage}}</div>
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
          <img v-if="item.likeStatus==0" src="../../../static/images/discover/nozan.png" class="f_right" @click="giveNowLike(item.id,index)">
          <img v-else src="../../../static/images/discover/zan.png" class="f_right" @click="removeNowLike(item.id,index)">
        </div>
        <!--阅读数量,是否点赞以及点赞数量E-->
      </div>
    </div>
    <div style="height: 1rem;"></div>
    <!--社区列表E-->
  </div>
</template>

<script>
  import moment from "moment";
  import {
    MessageBox
  } from 'mint-ui';
  export default {
    name: "user-start",
    data() {
      return {
        listNum: 3,
        sheetVisible: false,
        popupVisible: false,
        verifycontent: "",
        actions: [{
          name: "编辑个人信息",
          method: this.editPersonalDetails
        }, ],
        myList: [],
        userInfo: {

        },
        likeNum: 0,
        fansNum: 0,
        focsNum: 0,
        focusNum: 0,
        giveId: 0,
        showImg: false,
        imgSrc: '',
        leftPic: true,
        rightPic: true,
        bgImgHeight: 0,
        title: '',
        isShow: true,
        vFlag: false
      }
    },
    components: {},
    methods: {
      //转换时间
      convert: function (date) {
        date = date.substring(0, 10)
        moment.lang('zh-cn');
        let data = moment(date, "YYYYMMDD").fromNow();
        return data
      },
      clickImg(e) {
        this.showImg = true;
        this.imgSrc = e.currentTarget.src;;
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
      viewImg() {
        this.showImg = false;
      },
      init() {
        let _this = this;
        _this.$http.post(My.UserInfo, {
          "no": _this.$store.state.userId
        }).then(function (res) {
          if (res.data.code == 0) {
            _this.userInfo = res.data.data;
            for(var item in _this.userInfo.entitys){
              if(_this.userInfo.entitys[item].entity.indexOf('V') != -1){
                _this.vFlag = true;
                console.log(_this.vFlag+"是否加V")
              }
            }
          }
        });
      },
      getuserMessage() {
        var data = {
          userid: this.$store.state.userId
        }
        var url = USERMESSAGE.getuser
        this.$http({
          url: url,
          params: data,
          method: "get",
          formUrlencoded
        }).then((res) => {
          if (res.data.success) {
            this.userInfo = res.data.data;
            //            this.$store.state.userstartUuid = res.data.account.uuid;
          }
        }).catch(() => {

        })
      },
      //跳转到关注页面
      toFocus: function () {
        this.giveId = this.$store.state.userId;
        this.$router.push({
          path: '/focus'
        });
      },
      //跳转到粉丝页面
      toFans() {
        this.giveId = this.$store.state.userId;
        this.$router.push({
          path: '/fans'
        });
      },
      //我的关注数量
      myFocusNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myFocusNum, {
          "uid": _this.$store.state.userId
        }).then(function (res) {
          if (res.data.status) {
            _this.focsNum = res.data.data;
          } else {
            console.log(res.data.errorMsg);
            // MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //我的粉丝数量
      myFansNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myFansNum, {
          "uid": _this.$store.state.userId
        }).then(function (res) {
          if (res.data.status) {
            _this.fansNum = res.data.data;
          } else {
            console.log(res.data.errorMsg);
            //MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //我的点赞数量
      myLikeNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myLikeNum, {
          "uid": _this.$store.state.userId
        }).then(function (res) {
          if (res.data.status) {
            _this.likeNum = res.data.data;
            //
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      getMineList: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.issueMomentList, {
          "uid": _this.$store.state.userId,
          "hisUid": _this.$store.state.userId
        }).then(function (res) {
          if (res.data.status) {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].createDate = _this.convert(res.data.data[i].createDate)
            }
            _this.myList = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //给此刻点赞
      giveNowLike: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentGiveLike, {
          "uid": _this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = 1;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //给此刻取消点赞
      removeNowLike: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {
          "uid": _this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = 0;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //返回上一级
      goBack: function () {
        this.$router.go(-1);
        this.$store.dispatch("showFoot")
      },
      collect() {

      },
      editPersonalDetails() {
        this.$router.push({
          path: '/my/editPersonalDetails'
        })
      },
      addfriend() {
        this.popupVisible = true;
      },
      addfriendtrue() {
        this.popupVisible = false;
      },
      addfriendfalse() {
        this.popupVisible = false;
      },
      //关注、粉丝、获赞、发布、数量
      myNum: function () {
        var _this = this;
        // const uid = this.$route.query.id
        console.log(111111111111)
        this.$http
          .post(DISCOVERMESSAGE.count, {
            uid: _this.$store.state.userId
          })
          .then(function (res) {
            if (res.data.status) {
              _this.focusNum = res.data.data.focusNum;
              _this.fansNum = res.data.data.fansNum;
              _this.likeNum = res.data.data.likeNum;
              // _this.momentNum = res.data.data.momentNum;
            } else {
              console.log(res.data.errorMsg);
              // MessageBox('提示', res.data.errorMsg);
            }
          });
      },
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var scrollHeight = (scrollTop / this.bgImgHeight).toFixed(1);
        if (scrollHeight == 0.0) {
          scrollHeight = 0;
        } else if (scrollHeight > 0.9) {
          scrollHeight = 1;
        }
        // if (scrollHeight <= 0.4) {
        //   this.leftPic = true;
        //   this.rightPic = true;
        //   $("#header2").hide();
        // } else if (0.8 > scrollHeight > 0.4) {
        //   this.leftPic = false;
        //   this.rightPic = false;
        //   $("#header2").hide();
        // } else if (scrollHeight >= 0.8) {
        //   $("#header2").show();
        // }
        if (scrollHeight > 0.4) {
          this.leftPic = false;
          // this.rightPic = false;
        } else if (scrollHeight <= 0.4) {
          this.leftPic = true;
          // this.rightPic = true;
        }
        if (scrollHeight == 1) {
          this.title = this.userInfo.userName
          this.isShow = false
        } else {
          this.title = ''
          this.isShow = true
        }
        $("#asd").css("background", `rgba(255, 255, 255, ${scrollHeight})`)
      },
    },
    mounted() {
      this.$store.dispatch('hideFoot');
      //悬浮,更换头部背景透明度和文字
      window.addEventListener('scroll', this.handleScroll)
      this.init();
      this.myNum()
      this.getMineList();
      this.getuserMessage();
      // this.myFocusNum();
      // this.myFansNum();
      // this.myLikeNum();
    },
    updated() {
      this.$nextTick(() => {
        const asd = document.querySelector('#asd')
        const startbg = document.querySelector('.startbg')

        this.bgImgHeight = startbg.getBoundingClientRect().height - asd.getBoundingClientRect().height
      })
    }
  }

</script>

<style scoped>
  @import "./../../../static/css/discover/all.css";
  @import "./../../../static/css/discover/detail.css";

  .box {
    height: 0.88rem;
  }
  .head_22{
    width: 0.4rem !important;
    height: 0.4rem !important;
    position: relative;
    right: 0.48rem;
  }
  .head_list{
    width: 0.2rem !important;
    height: 0.2rem !important;
    position: relative;
    right: -0.54rem;
    bottom: 0.1rem;
  }
  .tags{
    border-radius: 0.1rem;
    border: 0.02rem solid #fff;
    padding: 0 0.1rem;
    height: 0.44rem;
    line-height: 0.44rem;
    color: #fff;
    float: left;
    margin: 0 0.15rem;
  }
  .tagstopbottom{
    padding-bottom: 0.3rem;
    width: 84%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
  }
  .left4{
    padding-left: 0.4rem;
  }
</style>
