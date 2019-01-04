<template>
  <div id="app">
    <keep-alive>
    	<router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
 </div>
</template>

<script>
import Secret from "./utils/secret";

export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    // loadTab(type) {
    //   if (type == 0) {
    //     this.$router.push({ path: "/recommend" });//主页
    //   } else if (type == 1) {
    //     this.$router.push({ path: "/wit" })//智享
    //   } else if (type == 2) {
    //     this.$router.push({ path: "/lovecar" });//爱车
    //   }  else if (type == 3) {
    //     this.$router.push({ path: "/myindex" });//我的
    //   }
    //    else if (type == 4) {
    //     this.$router.push({ path: "/wit/CarChoose" });//买车页面
    //   }
    // },
    isLogin(userInfo) {
      // if (isMobile.iOS()) {
      //   //     alert( JSON.stringify(userInfo))
      // }
      if (userInfo && userInfo.no) {
        this.$store.dispatch("isLogin", true);
        // 江淮用户系统的需要通过no字段作为用户的唯一标识，所以将no作为userId使用
        // const secUid = Secret.Encrypt(userInfo.no)
        // console.log(secUid)
        // this.$store.dispatch("userId", secUid);
        this.$store.dispatch("userId", userInfo.no);
        this.$store.dispatch("userInfo", userInfo);

        let params = {
          userNo: userInfo.no
        };
        this.$http.post(Lovecar.TSP, params).then(res => {
          if (res.data.msg == "success") {
            var tsp = res.data.data;
            this.$store.dispatch("TSP", tsp);
            // console.log(tsp);
            localStorage.setItem(
              "aaaid",
              JSON.stringify(this.$store.state.aaaid)
            );
            params = {
              aaaUserID: this.$store.state.aaaid,
              tspUserId: this.$store.state.tspId,
              userId: this.$store.state.trueuserId,
              phone: this.$store.state.mobile
            };
          }
        });
        localStorage.setItem("mobile", JSON.stringify(userInfo.mobile));
        localStorage.setItem("userName", JSON.stringify(userInfo.userName));
      } else {
        this.$store.dispatch("isLogin", true);
        this.$store.dispatch("userId", null);
        //      this.$store.dispatch('userInfo',null);
      }
      this.$http.defaults.headers.common["timaToken"] = this.$store.state.token;
      // 如果登录成功，获取用户头像
      if (this.$http.defaults.headers.common["timaToken"]) {
        var param = {
          no: this.$store.state.userId
        };
        this.$http.post(My.UserInfo, param).then(res => {
          if (res.data.code == 0) {
            this.$store.dispatch("imgUrl", res.data.data.headUrl);
          }
        });
      }
    },
    localshow() {
      var system = IOSAndAndroid.isIOSOrAndroid();
      try{
          if (system == "IOS") {
                  var params = {};
                  window.webkit.messageHandlers.showProgressDialog.postMessage(params);
                } else if (isMobile.Android() && window.js2android) {
                  js2android.showProgressDialog();
                }
      }catch(err){
          console.log("无此方法")
      }

    },
    localhide() {
      // 防止用户原生连点隐藏的遮罩层
      try{
          if (isMobile.iOS()) {
            var params = {};
            window.webkit.messageHandlers.dismissProgressDialog.postMessage(params);
          } else if (isMobile.Android() && window.js2android) {
            js2android.dismissProgressDialog();
          }
      }catch(err){
        console.log('暂时没有此方法')
      }

    },
    goActivityDetail(activityId) {
      this.$router.push({
        path: "/activity/activityLive",
        query: {
          activityId: activityId
        }
      });
    }
  },
  created() {
    window.goActivityDetail = this.goActivityDetail;
    window.isLogin = this.isLogin;
    window.localshow = this.localshow;
    window.localhide = this.localhide;
    // window.loadTab = this.loadTab;
  },
  mounted() {
    // this.isLogin({name:'',no:'AD022018121402494457431'})
    // this.$http.defaults.headers.common['timaToken'] = 'Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcImF1dGhlbnRpY2F0aW9uU3RhdHVzXCI6MCxcImNyZWF0ZWREYXRlXCI6MTU0NDc3MDE4NDAwMCxcImRlbGV0ZUZsYWdcIjpcIjBcIixcImlkXCI6NDkyLFwiaW5pdFVzZXJcIjowLFwibGFzdE1vZGlmaWVkRGF0ZVwiOjE1NDQ3NzA1NjYwMDAsXCJub1wiOlwiQUQwMjIwMTgxMjE0MDI0OTQ0NTc0MzFcIixcInBob25lXCI6XCIxNTAyNjU2Njk5MlwiLFwidXNlckNvZGVcIjpcIjE1MDI2NTY2OTkyXCIsXCJ1c2VyTmFtZVwiOlwiWVlGXCIsXCJ1c2VyU3RhdHVzXCI6MCxcInVzZXJUeXBlXCI6XCIwMVwifSIsImNyZWF0ZWQiOjE1NDUwNjMzNTM4NTgsInVzZXJObyI6IkFEMDIyMDE4MTIxNDAyNDk0NDU3NDMxIiwidXNlclR5cGUiOiIwMSIsInVzZXJOYW1lIjoiWVlGIiwiZXhwIjoxNTQ1OTI3MzUzLCJ1c2VySWQiOjQ5Mn0.QRPXVmMziV1tH4KcakZ7KcoVg1mx9dhDLVetoMEGhgI'
    // 获取用户
    // this.Getmarkedwords()
    // this.getNo()
  }
};
</script>
<style>
/* .picker-item {
  color: #ccc;
}
.picker-item.picker-selected {
  color: #222;
} */
.picker-item.picker-selected {
  color: #000;
  -webkit-transform: translate3d(0, 0, 0) rotateX(0);
  transform: translate3d(0, 0, 0) rotateX(0);
}
.picker-item {
  height: 0.36rem;
  line-height: 0.36rem;
  padding: 0 0.1rem;
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #ccc;
  left: 0;
  top: 0;
  width: 100%;
  box-sizing: border-box;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
}
.picker-center-highlight:before,
.picker-center-highlight:after {
  content: "";
  position: absolute;
  height: 0.05rem;
  width: 100%;
  background-color: #888888;
  display: block;
  z-index: 9900;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
.mint-toast {
  z-index: 99999;
}
/*.mint-msgbox-message {
    color: #999;
    margin: 0;
    text-align: left;
    line-height: .56rem;
    text-indent: 2em;
}*/
</style>
