<template>
  <div id="app">
    <keep-alive> 
    	<router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
 </div>
</template>

<script>
import Secret from './utils/secret'

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
//      console.log('从原生拿到的对象'+JSON.stringify(userInfo))
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
                params = {
                  aaaUserID: this.$store.state.aaaid,
                  tspUserId: this.$store.state.tspId,
                  userId: this.$store.state.trueuserId,
                  phone: this.$store.state.mobile
                };
              }
            });
      } else {
        this.$store.dispatch("isLogin", false);
        this.$store.dispatch("userId", null);
        //      this.$store.dispatch('userInfo',null);
      }
      this.$http.defaults.headers.common['timaToken'] = this.$store.state.token;
    },
   	localshow () {
    	if (isMobile.iOS()) {
      var params = {};
      window.webkit.messageHandlers.scan.showProgressDialog(params);
	    } else if (isMobile.Android() && window.js2android) {
	          js2android.showProgressDialog();
	    }
    },
    localhide () {
    	// 防止用户原生连点隐藏的遮罩层
	    if (isMobile.iOS()) {
	       /* var params = {};
	        window.webkit.messageHandlers.scan.dismissProgressDialog(params);*/
	    } else if (isMobile.Android() && window.js2android) {
	        js2android.dismissProgressDialog();
	    }
    }
  },
  created() {
    window.isLogin = this.isLogin;
    window.localshow = this.localshow
    window.localhide = this.localhide
    // window.loadTab = this.loadTab;
  },
  mounted() {
    // this.isLogin({name:'',no:'AD022018090401514458675'})
    // this.$http.defaults.headers.common['timaToken'] = 'Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcImF1dGhlbnRpY2F0aW9uU3RhdHVzXCI6MCxcImNyZWF0ZWREYXRlXCI6MTUzNjA0MDMwNDAwMCxcImRlbGV0ZUZsYWdcIjpcIjBcIixcImVtZXJnZW5jeUNvbnRhY3ROYW1lXCI6XCLlvKDkuInlm5vkupRcIixcImVtZXJnZW5jeUNvbnRhY3RQaG9uZVwiOlwiMTgyMTUxMjQzNjUxXCIsXCJpZFwiOjEwMCxcImluaXRVc2VyXCI6MCxcImxhc3RNb2RpZmllZERhdGVcIjoxNTM2MDU5MTU5MDAwLFwibm9cIjpcIkFEMDIyMDE4MDkwNDAxNTE0NDU4Njc1XCIsXCJwZXJzb25hbFNpZ25hdHVyZVwiOlwi6LWw5oiR55qE6Lev77yM6LCB566h6LCBXCIsXCJwaG9uZVwiOlwiMTg5MzA0NTU5MjhcIixcInJlYWxQaG9uZVwiOlwiMTg5KioqKjU5MjhcIixcInNleFwiOjIsXCJ1c2VyQ29kZVwiOlwiMTg5MzA0NTU5MjhcIixcInVzZXJOYW1lXCI6XCLmiJHnn6XpgZPmiJHmmK_osIFcIixcInVzZXJTdGF0dXNcIjowLFwidXNlclR5cGVcIjpcIjAxXCJ9IiwiY3JlYXRlZCI6MTU0NTAzNDcyMjM4MywidXNlck5vIjoiQUQwMjIwMTgwOTA0MDE1MTQ0NTg2NzUiLCJ1c2VyVHlwZSI6IjAxIiwidXNlck5hbWUiOiLmiJHnn6XpgZPmiJHmmK_osIEiLCJleHAiOjE1NDU4OTg3MjIsInVzZXJJZCI6MTAwfQ.AIRbPneG8HAnyFHWi5NHZ90mzX06srpWm2cEnjcIECA'
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
.mint-toast{
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
