<template>
  <div id="app">
    <keep-alive> 
    	<router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
 </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    isLogin(userInfo) {
      if (isMobile.iOS()) {
        //     alert( JSON.stringify(userInfo))
      }
      if (userInfo && userInfo.no) {
        this.$store.dispatch("isLogin", true);
        // 江淮用户系统的需要通过no字段作为用户的唯一标识，所以将no作为userId使用
        this.$store.dispatch("userId", userInfo.no);
        this.$store.dispatch("userInfo", userInfo);
      } else {
        this.$store.dispatch("isLogin", false);
        this.$store.dispatch("userId", null);
        //      this.$store.dispatch('userInfo',null);
      }
      this.$http.defaults.headers.common["timaToken"] = this.$store.state.token;
    }
  },
  created() {
    window.isLogin = this.isLogin;
  },
  mounted() {
    // alert(JSON.parse(this.$store.state.getpin.headers.identityParam).userId)
    // this.isLogin({name:'',no:'AD022018091802395260173'})
    // this.$http.defaults.headers.common['timaToken'] = 'Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcImF1dGhlbnRpY2F0aW9uU3RhdHVzXCI6MCxcImlkXCI6MTc3LFwiaW5pdFVzZXJcIjowLFwibm9cIjpcIkFEMDIyMDE4MDkxODAyMzk1MjYwMTczXCIsXCJwaG9uZVwiOlwiMTc2ODExMDgzMThcIixcInVzZXJDb2RlXCI6XCIxNzY4MTEwODMxOFwiLFwidXNlclN0YXR1c1wiOjAsXCJ1c2VyVHlwZVwiOlwiMDFcIn0iLCJjcmVhdGVkIjoxNTM5MTU2MDY1MDcyLCJ1c2VyTm8iOiJBRDAyMjAxODA5MTgwMjM5NTI2MDE3MyIsInVzZXJUeXBlIjoiMDEiLCJleHAiOjE1NDAwMjAwNjUsInVzZXJJZCI6MTc3fQ.DhJGKo93jkJ4e-3wK0GCHoysvmN0jJXyVqRgzD1zfEM'
    //获取用户
    let params = {
      userNo: this.$store.state.userId
    };
    this.$http.post(Lovecar.TSP, params).then(res => {
      // alert(res.data.data.tspId)
      // alert(JSON.stringify(res))
      if (res.data.msg == "success") {
        var tsp = res.data.data;
        this.$store.dispatch("TSP", tsp);
        console.log(tsp)
        if(tsp.tspid!=undefined){
          params = {
            tspUserId: this.$store.state.tspId,
            userId: this.$store.state.trueuserId,
            phone: this.$store.state.mobile
          };
          this.$http
            .post(Lovecar.vehicle, params, this.$store.state.getpin)
            .then(res => {
              // console.log(res)
            });
        }
      }
      // alert(JSON.parse(this.$store.state.getpin.headers.identityParam).userId)
      // alert(res.data.data.tspId)
      // JSON.parse(this.$store.state.getpin.headers.identityParam).userId=res.data.data.tspId
      // alert(JSON.parse(this.$store.state.getpin.headers.identityParam).userId)
      // alert(2)
    });

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
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ccc;
    left: 0;
    top: 0;
    width: 100%;
    box-sizing: border-box;
    -webkit-transition-duration: .3s;
    transition-duration: .3s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
.picker-center-highlight:before, .picker-center-highlight:after {
  content: '';
  position: absolute;
  height: 1px;
  width: 100%;
  background-color: #eaeaea;
  display: block;
  z-index: 1200;
  -webkit-transform: scaleY(0.5);
          transform: scaleY(0.5);
}
</style>
