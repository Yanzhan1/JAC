<template>
  <div>
    <div class="mytop" :style="$statusBarHeightObj">
      <div class="flex between mytopicon cocenter">
        <img src="../../../static/images/my/mine_service@2x.png" alt="" @click="ton()">
        <img src="../../../static/images/my/mine_message@2x.png" alt="" @click="tonews()">
      </div>
      <div class="mytophead flex between cocenter">
        <div style="padding-left: 0.3rem;padding-right: 0.2rem;position:relative" class="flex cocenter">
          <div @click="edict()" style="width: 1.2rem;height: 1.2rem;border-radius:50%;overflow:hidden">
            <img v-if="Personal.headUrl" :src="Personal.headUrl" alt="" style="width:100%;height:100%">
            <img v-else src="../../../static/images/discover/normalhead.png" alt="" style="width:100%;height:100%">
          </div>
          <!-- 控制V图标的展示 -->
          <img v-show="this.imgV" class="signimg" :src="Vimg" alt="">
          <div class="flex column" style="margin-left: 0.2rem;">
            <div class="flex cocenter" style="overflow: hidden">
              <div v-if="this.$store.state.userId">
                <span v-if="Personal.userName" style="color: #fff;font-size: 0.32rem;font-weight: bold">{{Personal.userName}}</span>
                <span v-else style="color: #fff;font-size: 0.32rem;font-weight: bold">尚未设置昵称</span>
              </div>
              <div class="loginto" v-else>
                <span @click="gologin">登录 / 注册</span>
              </div>
              <!-- 控制jac图标的展示 -->
              <div v-show="imgJac" class="jacshow" >JAC</div>
              <img v-if="Personal.sex==1" src="../../../static/images/my/gender_man@2x.png" alt="" style="width: 0.28rem;height: 0.28rem">
              <img v-if="Personal.sex==2" src="../../../static/images/my/gender_woman.png" alt="" style="width: 0.28rem;height: 0.28rem">
            </div>
            <span @click="ToScore()" style="margin-top: 0.16rem;font-size: 0.22rem;color: #dcf5ff;">{{integral}}&nbsp;积分&nbsp;></span>
          </div>
        </div>
        <!-- <img @click="twoma()" src="../../../static/images/my/qr_code@2x.png" alt="" style="width: 0.4rem;height: 0.4rem"> -->
        <span class="btn" @click="sign" v-if="isShow">点击签到</span>
        <span class="btns" v-else>已签到</span>
      </div>
      <div class="mytopbottom flex around">
        <div>
          <span>{{likeNum}}</span>
          <span>获赞</span>
        </div>
        <div @click="mypublish">
          <span>{{momentNum}}</span>
          <span>发布</span>
        </div>
        <div @click="toFocus">
          <span>{{focusNum}}</span>
          <span>关注</span>
        </div>
        <div @click="toFans">
          <span>{{fansNum}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <div class="mybottom">
      <router-link tag="div" class="mylist" to="/myindex/myBus">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_car@2x.png" alt="">
          <span>我的爱车</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </router-link>
      <router-link class="mylist" tag="div" to="/myorder">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_list@2x.png" alt="">
          <span>我的订单</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </router-link>
      <div class="mylist" @click="tobuy">
        <div class="flex cocenter">
          <img src="../../../static/images/my/shoppingbuy.png" alt="">
          <span>我的商城</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
       <!-- <div class="mylist" @click="wbrecode">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_record_maintanance@2x.png" alt="">
          <span>维保记录</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div> -->
      <router-link to="/myCollect" tag="div" class="mylist">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_collection@2x.png" alt="">
          <span>我的收藏</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </router-link>
      <router-link to="/myactivity" tag="div" class="mylist">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_activity@2x.png" alt="">
          <span>我的活动</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </router-link>
      <router-link to="/my_dealer" tag="div" class="mylist">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_agency@2x.png" alt="">
          <span>我的经销商</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </router-link>
      <!-- <div class="mylist" @click="recommended">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_recommend@2x.png" alt="">
          <span>推荐码</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div> -->
      <div class="mylist" @click="myFeedback">
        <div class="flex cocenter">
          <img src="../../../static/images/my/fankui@3x.png" alt="">
          <span>我的反馈</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
      <!-- <div class="mylist" @click="scan()">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_code@2x.png" alt="">
          <span>扫一扫</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div> -->
      <div class="mylist"  @click="gologinal">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_set@2x.png" alt="">
          <span>设置</span>
        </div>
        <div style="display: flex;align-items: center;">
          <span></span>
          <img src="../../../static/images/my/next@2x.png" alt="">
        </div>
      </div>
    </div>
    <mt-popup v-model="popupVisible" position="middle">
      <div style="display: flex;justify-content: center;align-items: center;  margin-top:.3rem">
        <img src="../../../static/images/my/complete@3x.png" alt="" style="width:1.2rem;display:block;">
      </div>
      <span style="font-size:.32rem;color:#222;margin-top:.4rem;text-align:center;display:block">签到成功</span>
      <span style="font-size:.24rem;color:#444;margin-top:.3rem;text-align:center;display:block">获得
        <span style="color:#49BBFF"> {{this.num}}</span> 积分可兑换会员商品</span>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from "mint-ui";
import { Toast } from "mint-ui";
import Vimg from "../../../static/images/my/signVV.png";
export default {
  name: "Myindex",
  data() {
    return {
      Personal: {}, //个人信息
      popupVisible: false,
      isShow: true, //今日未签到
      integral: "", //用户总积分
      likeNum: 0,
      fansNum: 0,
      focusNum: 0,
      momentNum: 0,
      myList: [],
      Vimg, //V图片
      imgV: "", //控制V图片是否展示
      imgJac: false, //控制jac是否展示
      num: "", //添加的积分量
      flag: false, //隐藏推荐码
      url: "",
      aaaid: "",
      mobile: "",
      add: "",
      userName: "",
      token: ""
    };
  },
  methods: {
    // 签到
    sign() {
      // 检查登录状态,如果没登陆，弹出提示框并且return false
      if (!this.$store.state.islogin) {
        this.toLogin();
        return false;
      }
      var data = {
        ruleStr: "SIGN_IN",
        serviceTypeStr: "SERVICE_FIXED",

        no: this.$store.state.userId
        // no:'AD11201809030320353266'
      };
      //  var param=JSON.stringify(data)
      this.$http.post(My.SignIn, data).then(res => {
        if (res.data.code == 0) {
          this.num = res.data.data;
          this.popupVisible = true;
          setTimeout(() => {
            this.popupVisible = false;
            this.isShow = false;
          }, 1000);
        }
        this.total();
      });
    },
    // 判断是否签到
    IsSign() {
      var data = {
        no: this.$store.state.userId
        //no:'AD112018090402110693811'
      };
      this.$http.post(My.IsSignIn, data).then(res => {
        if (res.data.code == 50004) {
          this.isShow = false;
        }
      });
    },
    myFeedback() {
      this.$router.push("/myindex/myFeedback");
    },
    //跳转维保详情
    wbrecode() {
      this.$router.push("/myindex/wbrecode");
    },
    // 获取用户总积分
    total() {
      var data = {
        no: this.$store.state.userId
        // no:'AD022018090502444422707'
      };
      this.$http.post(My.Credit, data).then(res => {
        if (res.data.code == 0) {
          if (res.data.data == "") {
            this.integral = 0;
            this.$store.state.integral = res.data.data[0].count;
          } else {
            this.integral = res.data.data[0].count;
            this.$store.state.integral = res.data.data[0].count;
          }
        }
      });
    },

    //积分详情
    ToScore() {
      // 检查登录状态,如果没登陆，弹出提示框并且return false
      if (!this.$store.state.islogin) {
        this.toLogin();
        return false;
      }
      this.$router.push("/my/scoredetails");
    },
    //编辑个人信息
    edict() {
      // 检查登录状态,如果没登陆，弹出提示框并且return false
      if (!this.$store.state.islogin) {
        this.toLogin();
        return false;
      }
      this.$router.push({
        path: "/edictperson",
        query: {
          imgV: this.imgV
        }
      });
    },
    //消息
    tonews() {
      this.$router.push("/news");
    },
    ton() {
      if (isMobile.iOS()) {
        let params = {};
        window.webkit.messageHandlers.gotoOnlineWeb.postMessage(params);
      } else if (isMobile.Android()) {
        js2android.gotoOnlineWeb();
      }

      //  location.href="http://220.178.49.215:8888/webchat/jsp/common/visitorMobileEnter4.html"
    },
    //二维码
    twoma() {
      this.$router.push("/twoma");
    },
    //扫一扫
    scan() {
      if (isMobile.iOS()) {
        var params = {};
        window.webkit.messageHandlers.scan.postMessage(params);
      } else if (isMobile.Android()) {
        js2android.scan();
      }
    },
    // //获取原生的no和token
    // getTokenAndNo() {
    //   //js判断手机操作系统(ios或者是Android)
    //   var system = IOSAndAndroid.isIOSOrAndroid();
    //   if (system == "Android") {
    //     let tokenAndNo = js2android.getUserInfo();
    //     let tokensandno = JSON.parse(tokenAndNo);
    //     this.$store.dispatch("TOKEN", tokensandno);
    //   } else if (system == "IOS") {
    //     let Iostoken = getCookie("token");
    //     let Iosno = getCookie("no");
    //   }
    // },
    recommended() {
      this.$router.push("/Recommended");
    },
    //跳转到商城
    tobuy() {
      // 检查登录状态,如果没登陆，弹出提示框并且return false
      if (!this.$store.state.islogin) {
        this.toLogin();
        return false;
      }
      if (this.$store.state.userId) {
        let params = {
          userNo: this.$store.state.userId
        };
        this.$http.post(Lovecar.TSP, params).then(res => {
          if (res.data.msg == "success") {
            var tsp = res.data.data;
            this.aaaid = tsp.aaaid;
            this.$store.dispatch("TSP", tsp);
            this.userName = this.$store.state.userName;
            this.mobile = this.$store.state.mobile;
            this.add = "JAC" + this.aaaid + this.mobile + this.userName + "APP";
            this.add = this.$md5(this.add);
            let Stringurl =
              "http://gift.jac.com.cn/app/authLogin" +
              "?" +
              "uid=" +
              this.aaaid +
              "&mobile=" +
              this.mobile +
              "&userName=" +
              this.userName +
              "&toOrderList=suc&token=" +
              this.add;
            if (isMobile.iOS()) {
              var params = { Stringurl: Stringurl };
              window.webkit.messageHandlers.gotoMallOrderWeb.postMessage(
                params
              );
            } else if (isMobile.Android()) {
              js2android.gotoMallOrderWeb(Stringurl);
            }
          }
        });
      } else {
        this.toLogin();
      }
    },
    //粉丝
    toFans: function() {
      // 检查登录状态,如果没登陆，弹出提示框并且return false
      if (!this.$store.state.islogin) {
        this.toLogin();
        return false;
      }
      this.$router.push({ path: "/fans" });
    },
    //关注
    toFocus: function() {
      // 检查登录状态,如果没登陆，弹出提示框并且return false
      if (!this.$store.state.islogin) {
        this.toLogin();
        return false;
      }
      this.$router.push({ path: "/focus" });
    },
    //我的发布
    mypublish: function() {
      // 检查登录状态,如果没登陆，弹出提示框并且return false
      if (!this.$store.state.islogin) {
        this.toLogin();
        return false;
      }
      this.$router.push({ path: "/myPublish" });
    },
    //游客模式下直接跳登入
    gologinal() {
      if (this.$store.state.userId != null) {
        this.$router.push({
          path: "/myindex/mySetUp",
          query: { no: this.$store.state.no }
        });
      } else {
        this.toLogin();
      }
    },
    // 获取我的基本信息
    getuserinfo() {
      var param = {
        no: this.$store.state.userId
      };
      this.$http.post(My.UserInfo, param).then(res => {
        if (res.data.code == 0) {
          this.Personal = res.data.data;
          for (let val of this.Personal.entitys) {
            if (val.entity == "V") {
              this.imgV = true;
            }
            if (val.entity == "JAC") {
              this.imgJac = true;
            }
          }
        }
      });
    },
    //获赞、关注、发布、粉丝数量
    // getuserinfo() {
    //   var param = {
    //     no: this.$store.state.no,
    //   }
    //   this.$http.post(Wit.UserInfo, param).then(res => {
    //     if(res.data.code == 0) {
    //       this.Personal = res.data.data
    //     }
    //   })
    // },
    //关注、粉丝、获赞、发布、数量
    myNum: function() {
      var _this = this;
      // const uid = this.$route.query.id

      this.$http
        .post(DISCOVERMESSAGE.count, { uid: _this.$store.state.userId })
        // .post(DISCOVERMESSAGE.count, { uid })
        .then(function(res) {
          if (res.data.status) {
            _this.focusNum = res.data.data.focusNum;
            _this.fansNum = res.data.data.fansNum;
            _this.likeNum = res.data.data.likeNum;
            _this.momentNum = res.data.data.momentNum;
          } else {
            // MessageBox('提示', res.data.errorMsg);
          }
        });
    },
    //我的发布
    getMineList: function() {
      var _this = this;
      this.$http
        .post(DISCOVERMESSAGE.issueMomentList, {
          uid: _this.$store.state.userId,
          hisUid: _this.$store.state.userId
        })
        .then(function(res) {
          if (res.data.status) {
            _this.myList = res.data.data;
          } else {
            //MessageBox('提示', res.data.errorMsg);
          }
        });
    },
    //获取推荐码 如没有  推荐码 栏不显示
    // RecomendCode() {
    //   var param = {
    //     userNo: this.$store.state.userId
    //   };
    //   this.$http.post(My.RecomendCode, param).then(res => {
    //     if(res.data.msg='success'){
    //       if(res.data.code!=500){
    //       this.share = res.data.code;
    //       this.flag = true;
    //     }
    //     }
    //   });
    // },
    Tsp() {
      let params = {
        userNo: this.$store.state.userId
      };
      this.$http.post(Lovecar.TSP, params).then(res => {
        if (res.data.msg == "success") {
          var tsp = res.data.data;
          this.$store.dispatch("TSP", tsp);
        }
      });
    },
    gologin() {
      if (isMobile.iOS()) {
        window.webkit.messageHandlers.login.postMessage("");
      } else if (isMobile.Android() && window.js2android) {
        window.js2android.login();
      }
    }
  },
  computed: {
    show() {
      return this.$store.state.aaaid;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  created() {
    // this.RecomendCode(); //获取推荐码
  },
  watch: {
    show(newVal, oldVal) {
      // this.userName = JSON.parse(localStorage.getItem("userName"));
      // this.aaaid =JSON.parse(localStorage.getItem("aaaid"));
      // this.mobile = JSON.parse(localStorage.getItem("mobile"));
      // this.token=JSON.parse(this.$store.state.tsppin.headers.identityParam).token
    }
    // userId(newVal, oldVal){
    //     this.getuserinfo();
    //     this.myNum();
    //     this.IsSign(); //判断是否签到
    //     this.total(); //h获取用户总积分
    // }
  },
  mounted() {
    if (this.$store.state.islogin) {
      this.getuserinfo();
      this.myNum();
      this.IsSign(); //判断是否签到
      this.total(); //h获取用户总积分
    }
  }
};
</script>
<style scoped>
.mint-popup {
  width: 80%;
  height: 3.33rem;
  border-radius: 0.2rem;
}
.btn {
  width: 1.8rem;
  height: 0.66rem;
  display: block;
  background-color: pink;
  line-height: 0.66rem;
  text-align: center;
  border-radius: 0.7rem;
  font-size: 0.28rem;
  color: #fff;
  background: linear-gradient(to right, #79bff9, #2099ff);
}
.signimg {
  display: block;
  /* width: .4rem;
  height: .4rem; */
  position: absolute;
  top: 0.8rem;
  left: 1.05rem;
}
.btns {
  width: 1.8rem;
  height: 0.66rem;
  display: block;
  background-color: pink;
  line-height: 0.66rem;
  text-align: center;
  border-radius: 0.7rem;
  font-size: 0.28rem;
  color: #fff;
  background-color: #ccc;
}
.mytop {
  height: 4.28rem;
  padding: 0 0.3rem;
  background: url("../../../static/images/my/bg-mine@2x.png") no-repeat center
    center;
  background-size: 100% 100%;
  position: relative;
}

.mytopicon {
  height: 0.88rem;
  /* margin-top:.3rem */
}

.mytopicon > img {
  width: 0.4rem;
  height: 0.4rem;
}

.mytophead {
  margin-top: 0.1rem;
}

.mytopbottom {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.3rem;
  width: 100%;
}

.mytopbottom > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.mytopbottom > div > span:nth-child(1) {
  font-size: 0.36rem;
}

.mytopbottom > div > span:nth-child(2) {
  font-size: 0.24rem;
  color: #dcf5ff;
}

.mybottom {
  padding-top: 0.2rem;
}

.mylist {
  height: 1rem;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}

.mylist img {
  width: 0.4rem;
  height: 0.4rem;
}

.mylist span {
  font-size: 0.28rem;
  color: #555555;
  margin-left: 0.2rem;
}
.mytop {
  height: 4.28rem;
  padding: 0 0.3rem;
  background: url("../../../static/images/my/bg-mine@2x.png") no-repeat center
    center;
  background-size: 100% 100%;
  position: relative;
}

.mytopicon {
  height: 0.88rem;
}

.mytopicon > img {
  width: 0.4rem;
  height: 0.4rem;
}

.mytophead {
  margin-top: 0.1rem;
}

.mytopbottom {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.3rem;
  width: 100%;
}

.mytopbottom > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}

.mytopbottom > div > span:nth-child(1) {
  font-size: 0.36rem;
}

.mytopbottom > div > span:nth-child(2) {
  font-size: 0.24rem;
  color: #dcf5ff;
}

.mybottom {
  padding-top: 0.2rem;
}

.mylist {
  height: 1rem;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}

.mylist img {
  width: 0.4rem;
  height: 0.4rem;
}

.mylist span {
  font-size: 0.28rem;
  color: #555555;
  margin-left: 0.2rem;
}
.jacshow {
  display: inline;
  margin-left: 0.1rem;
  width: 0.88rem;
  height: 0.36rem;
  line-height: 0.31rem;
  text-align: center;
  border: 0.02rem solid #fff;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.2rem;
  font-weight: 520;
  /* -webkit-transform: scale(0.75);
  -o-transform: scale(.75) */
}
.loginto {
  font: 500 0.6rem/.4rem "PingFang-SC-Medium";
  color: #fff;
}
</style>
