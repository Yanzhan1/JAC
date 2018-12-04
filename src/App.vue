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
        this.$store.dispatch("userId", userInfo.no);
        this.$store.dispatch("userInfo", userInfo);
      } else {
        this.$store.dispatch("isLogin", false);
        this.$store.dispatch("userId", null);
        //      this.$store.dispatch('userInfo',null);
      }
      this.$http.defaults.headers.common["timaToken"] = this.$store.state.token;
    },
    // Getmarkedwords(){
    //   this.$http.post(My.getwords,{}).then((res)=>{
    //     if(res.data.msg=='success'){
    //       this.$store.dispatch('getWords',res.data.data)
    //     }
    //   })
    // }
    // //拿到个人信息
    // personname(){
    //   //获取用户基本信息
    // var param = {
    // no: this.$store.state.userId
    //    // no:'AD022018072505235135056'
    // };
    // this.$http.post(My.UserInfo, param).then(res => {
    //   if (res.data.code == 0) {
    //     var UserInfo=res.data.data
    //     this.$store.dispatch("UserInfo",UserInfo)
    //   }
    // });
    // }
  },
  created() {
    window.isLogin = this.isLogin;
    // window.loadTab = this.loadTab;
  },
  mounted() {
    // this.isLogin({name:'',no:'AD022018110210272109037'})
    // this.$http.defaults.headers.common['timaToken'] = '1c3ec1e7-44e9-462e-aa85-fe264cdefe50'
    // 获取用户
    let params = {
      userNo: this.$store.state.userId
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
        // this.$http
        //   .post(Lovecar.vehicle, params, this.$store.state.tsppin)
        //   .then(res => {
        //     // console.log(res)
        //   });
      }
    });
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
.mint-msgbox-message {
    color: #999;
    margin: 0;
    text-align: left;
    line-height: .56rem;
    text-indent: 2em;
}
</style>
