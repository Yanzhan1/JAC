<template>
  <div>
    <my-header :id="'asd'" :title="title" :isShow="isShow" :rightPic="leftPic">
      <!-- <img slot="backblue" v-show="leftPic" src="../../../static/images/discover/backfff.png" />
      <img slot="backblue" v-show="!leftPic" src="../../../static/images/discover/backblue.png" /> -->
    </my-header>
    <!-- <header class="headerUser" id="header2" style="display: none">
      <img class="f_left" src="../../../static/images/discover/backblue.png" @click="goBack">
      <img v-if="userInfo && userInfo.headUrl" class="f_left head_4" :src="userInfo.headUrl" alt="">
      <img v-else class="f_left head_4" src="../../../static/images/discover/normalhead.png" />
      <p class="header-title-fff" style="margin-left: 30%;">
        {{userInfo.userName}}</p>
    </header>
    <div class="box" style="box-sizing: content-box;" :style="$statusBarHeightObj"></div> -->
    <div class="startbg">
      <div :class="['wrapbg' ,vFlag ? 'left4' : '']">
        <img v-if="userInfo && userInfo.imageUrl" :src="userInfo.imageUrl" alt="">
        <img v-else src="../../../static/images/discover/normalhead.png" />
        <!--加V-->
        <!-- <img v-if="userInfo && vFlag" src="../../../static/images/discover/v.png" class="head_22"/> -->
        <img class="head_22" :src='this.Vimg' />
      </div>
      <div class="user_info">
        <p class="font_36 mb_16">
          {{userInfo.userName}}
        </p>
        <!--加V-->
        <div class="tagstopbottom flex" v-if="userInfo.entitys">
          <div v-for="item in userInfo.entitys" class="tags">{{item.entity}}</div>
        </div>
        <div style="clear: both"></div>
        <p class="font_24fff">
          {{userInfo.personalSignature}}
          <!--{{userInfo.}}-->
        </p>
        <div class="mytopbottom flex around">
          <div>
            <span>获赞</span>
            <span>{{likeNum}}</span>
          </div>
          <div>
            <span>关注</span>
            <span>{{focusNum}}</span>
          </div>
          <div>
            <span>粉丝</span>
            <span>{{fansNum}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--社区列表S-->
    <div style="padding: 0.4rem 0.32rem;">
      <p class="font_5 f_left">他的发布</p>
      <p class="font_6 f_right">共{{myList.length}}条发布</p>
    </div>
    <div v-for="(item,index) in myList">
      <div class="boxInfo wrap_92 pt_4">
        <!--发布者信息S-->
        <div class="comment_userinfo">
          <div class="user_head">
            <div>
              <img v-if="item.user && item.user.head_image" :src="item.user.head_image" class="head_72" />
              <img v-else src="../../../static/images/discover/normalhead.png" class="head_72" />
              <!--加V-->
              <img class="heade_99" v-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('普通会员')!=-1" src="../../../static/images/my/member1_v.png" alt="">
              <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('认证会员')!=-1" src="../../../static/images/my/member2_v.png" alt="">
              <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('白银会员')!=-1" src="../../../static/images/my/member3_v.png" alt="">
              <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('黄金会员')!=-1" src="../../../static/images/my/member4_v.png" alt="">
              <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('钻石会员')!=-1" src="../../../static/images/my/member5_v.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('普通会员')!=-1" src="../../../static/images/my/member1.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('认证会员')!=-1" src="../../../static/images/my/member2.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('白银会员')!=-1" src="../../../static/images/my/member3.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('黄金会员')!=-1" src="../../../static/images/my/member4.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('钻石会员')!=-1" src="../../../static/images/my/member5.png" alt="">
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
    <div class="bottom_btn_wrap">
      <div v-if="focusStatu == 1||focusStatu == 2" class="bottom_ygz" @click="removeFoucs">
        已关注
      </div>
      <div v-else class="bottom_jgz" @click="addFoucs">
        加关注
      </div>
    </div>
  </div>
</template>

<script>
  import moment from "moment";
  import {
    Toast
  } from 'mint-ui';
  import {
    MessageBox
  } from 'mint-ui';
  export default {
    name: "user-start",
    data() {
      return {
        sheetVisible: false,
        popupVisible: false,
        delfriendVisible: false,
        verifycontent: "",
        userInfo: {},
        focusStatu: 0,
        actions: [{
            name: "关注",
            method: this.removeFoucs
          },
          {
            name: "加好友",
            method: this.addfriend
          },
          {
            name: "修改备注",
            method: this.changeremark
          },
          /*{name:"发消息",method:function () {
            }},*/
          {
            name: "删除好友",
            method: this.delfriend
          },
          // {name:"举报",method:this.inform}
        ],
        myList: [],
        likeNum: 0,
        fansNum: 0,
        focusNum: 0,
        user: this.$store.state.UserId,
        showImg: false,
        imgSrc: '',
        flag: 'person',
        type: 'person',
        leftPic: true,
        rightPic: true,
        bgImgHeight: 0,
        title: '',
        isShow: true,
        vFlag: false,
        Vimg:'',
        imgV:false,
      }
    },
    components: {
      /*shareBox*/
    },
    methods: {
      //转换时间
      convert: function (date) {
        date = date.substring(0, 10)
        moment.lang('zh-cn');
        let data = moment(date, "YYYYMMDD").fromNow();
        return data
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
      clickImg(e) {
        this.showImg = true;
        this.imgSrc = e.currentTarget.src;;
      },
      viewImg() {
        this.showImg = false;
      },
      CommentBoxchange() {
        this.$store.dispatch('showcommentBox')
        this.$refs.commentbox.boxfocus();
      },
      init() {
        let _this = this;
        let nos = [_this.$store.state.UserStartId];
        _this.$http.post(DISCOVERMESSAGE.searchUserBaseInformationMany, {
          "nos": nos
        }).then(function (res) {
          if (res.data.code == 0) {
            _this.userInfo = res.data.data[0];
            for(let item in _this.userInfo.entitys){
              if(_this.userInfo.entitys[item].entity==='V'){
               _this.imgV=true
              }
              setTimeout(()=>{
                if(_this.userInfo.entitys[item].entity.indexOf('普通会员') != -1){
                  if(_this.imgV){
                    _this.Vimg = "./static/images/my/member1_v.png";
                  }else{
                    _this.Vimg = './static/images/my/member1.png';
                  }
                }
                if(_this.userInfo.entitys[item].entity.indexOf('认证会员') != -1){
                  if(_this.imgV){
                    _this.Vimg = "./static/images/my/member2_v.png";
                  }else{
                    _this.Vimg = './static/images/my/member2.png';
                  }
                }
                if(_this.userInfo.entitys[item].entity.indexOf('白银会员') != -1){
                  if(_this.imgV){
                    _this.Vimg = "./static/images/my/member3_v.png";
                  }else{
                    _this.Vimg = './static/images/my/member3.png';
                  }
                }
                if(_this.userInfo.entitys[item].entity.indexOf('黄金会员') != -1){
                  if(_this.imgV){
                    _this.Vimg = "./static/images/my/member4_v.png";
                  }else{
                    _this.Vimg = './static/images/my/member4.png';
                  }
                }
                if(_this.userInfo.entitys[item].entity.indexOf('钻石会员') != -1){
                  if(_this.imgV){
                    _this.Vimg = "./static/images/my/member5_v.png";
                  }else{
                    _this.Vimg = './static/images/my/member5.png';
                  }
                }
              },0)
            }
          }
        });
      },
      //电咖没有好友功能
      //      getfriendconnect(){
      //        //获取是否是好友关系
      //        var checkfriend={
      //          from_account:this.$store.state.userId,
      //          to_account:this.$store.state.UserStartId
      //        }
      //        this.$http({url: FRIENDMESSAGE.checkFriend,
      //          params: checkfriend,
      //          method:"post",
      //          formUrlencoded
      //        }).then((res)=>{
      //          if(!res.data.runflag){
      //            this.actions.splice(2,2)
      //          }else{
      //            this.actions.splice(1,1)
      //          }
      //        }).catch(()=>{
      //
      //        })
      //      },
      changeremark() {
        this.$router.push({
          path: '/friend/changeremark'
        })
      },
      addfriend() {
        this.popupVisible = true;
      },
      addfriendtrue() {
        /*var userid = this.$store.state.userId;
        var UserStartId = this.$store.state.UserStartId;
        var add_type = 'Add_Type_Both';*/
        if (isMobile.iOS()) {
          var params = {
            uuid: this.$store.state.userstartUuid,
            content: this.verifycontent
          }
          window.webkit.messageHandlers.addFriend.postMessage(params);
        } else if (isMobile.Android()) {
          js2android.addFriend(this.$store.state.userstartUuid, this.verifycontent);
        }
        this.popupVisible = false;
        /*if (isMobile.iOS()) {
          var add_source = 'AddSource_Type_ios'
        } else if(isMobile.Android()) {
          var add_source = 'AddSource_Type_android'
        }
        // alert(this.$store.state.userstartUuid)
        var data = {
          from_account:this.$store.state.uuid,
          to_account:this.$store.state.userstartUuid,
          add_type:'Add_Type_Both',
          add_source:add_source,
          // add_wording:this.verifycontent
        }
        var url = FRIENDMESSAGE.addFriend
        this.$http({url: url,
          params: data,
          method:"post",
          formUrlencoded
        }).then((res)=>{
          if(res.data.errcode == 0){
            let instance = Toast({
              message: '添加成功',
              position: 'middle',
              duration: 1000
            });
          }else{
            let instance = Toast({
              message: res.data.errmsg,
              position: 'middle',
              duration: 1000
            });
          }
        }).catch(()=>{

        })*/
      },
      delfriend() {
        this.delfriendVisible = true
      },
      delfriendtrue() {
        if (isMobile.iOS()) {
          var params = {
            uuid: this.$store.state.userstartUuid
          }
          window.webkit.messageHandlers.delFriend.postMessage(params);
        } else if (isMobile.Android()) {
          js2android.delFriend(this.$store.state.userstartUuid);
        }
        this.delfriendVisible = false;
      },
      //跳转到举报页面
      inform: function () {
        this.$store.state.UserStartId = this.$store.state.UserStartId;
        this.$router.push('/inform');
      },
      //获取我和他人的关注状态
      focusStatus: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.focusStatu, {
          "uid": _this.$store.state.userId,
          // "focusId": _this.$store.state.UserStartId
          "focusId": _this.$store.state.UserStartId
        }).then(function (res) {
          if (res.data.status) {
            _this.focusStatu = res.data.data;
          } else {
          }
        });
      },
      //加关注
      addFoucs: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.focusOn, {
          "uid": _this.$store.state.userId,
          "focusId": _this.$store.state.UserStartId
          // "focusId": _this.$route.query.id
        }).then(function (res) {
          if (res.data.status) {
            _this.focusStatus();
            _this.focusStatu = res.data.data;
            Toast('关注成功');
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //取消关注
      removeFoucs: function () {
        var _this = this;
        MessageBox.confirm('确定取消关注?').then(action => {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.unFocus, {
            "uid": _this.$store.state.userId,
            "focusId": _this.$store.state.UserStartId
            // "focusId": _this.$route.query.id
          }).then(function (res) {
            if (res.data.status) {
              _this.focusStatus();
              _this.focusStatu = res.data.data;
              Toast('取消成功');
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
      //关注、粉丝、获赞、发布、数量
      myNum: function () {
        var _this = this;
        const uid = this.$route.query.id

        this.$http
          .post(DISCOVERMESSAGE.count, {
            uid: this.$store.state.UserStartId
          })
          .then(function (res) {
            if (res.data.status) {
              _this.focusNum = res.data.data.focusNum;
              _this.fansNum = res.data.data.fansNum;
              _this.likeNum = res.data.data.likeNum;
              // _this.momentNum = res.data.data.momentNum;
            } else {
              // MessageBox('提示', res.data.errorMsg);
            }
          });
      },
      //他的关注数量
      myFocusNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myFocusNum, {
          "uid": _this.$store.state.UserStartId
        }).then(function (res) {
          if (res.data.status) {
            _this.focusNum = res.data.data;
          } else {
          }
        });
      },
      //他的粉丝数量
      myFansNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myFansNum, {
          "uid": _this.$store.state.UserStartId
        }, this.$store.state.mytoken).then(function (res) {
          if (res.data.status) {
            _this.fansNum = res.data.data;
          } else {
          }
        });
      },
      //他的点赞数量
      myLikeNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myLikeNum, {
          "uid": _this.$store.state.UserStartId
        }, this.$store.state.mytoken).then(function (res) {
          if (res.data.status) {
            _this.likeNum = res.data.data;
          } else {
          }
        });
      },
      getUserList: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.issueMomentList, {
          // "uid": _this.$store.state.userId,
          "uid": _this.$store.state.userId,
          "hisUid": _this.$store.state.UserStartId
        }).then(function (res) {
          if (res.data.status) {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].createDate = _this.convert(res.data.data[i].createDate)
            }
            _this.myList = res.data.data;
          } else {
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
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给此刻取消点赞
      removeNowLike: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {
          "uid": _this.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = 0;
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      addfriendfalse() {
        this.popupVisible = false;
      },
      //返回上一级
      goBack: function () {
        this.$router.go(-1);
      },
      //分享
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_person' + index;
        $(showId).show();
        $("#bgShare").show();
        this.bgbtn1();
      },
      bgbtn1() {
        $("#mess").hide();
        $("#bg1").hide();
      },
      bgHide: function () {
        var showId = '#share_person' + this.indexNum;
        $(showId).hide();
        $("#bgShare").hide();
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
      /*悬浮,更换头部背景透明度和文字*/
      window.addEventListener('scroll', this.handleScroll)
      this.init();
      this.getUserList();
      this.myNum()
      this.focusStatus();
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
  .startbg{
    position: relative;
  }
  .head_22{
    width: 1.2rem !important;
    height: .35rem !important;
    position: absolute;
    border-radius: 0 !important;
    top: 2.5rem;
    right: 3.15rem;
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
    margin: 0.1rem 0.1rem;
  }
  .tagstopbottom{
    padding-bottom: 0.3rem;
    width: 84%;
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .left4{
    padding-left: 0.4rem;
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
