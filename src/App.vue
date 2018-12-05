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
    // this.isLogin({name:'',no:'AD022018110703532168908'})
    // this.$http.defaults.headers.common['timaToken'] = 'Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcImF1dGhlbnRpY2F0aW9uU3RhdHVzXCI6MCxcImNyZWF0ZWREYXRlXCI6MTU0MjA3NDc5ODAwMCxcImRlbGV0ZUZsYWdcIjpcIjBcIixcImlkXCI6Mzc4LFwiaW5pdFVzZXJcIjowLFwibGFzdE1vZGlmaWVkRGF0ZVwiOjE1NDIwNzQ4MTkwMDAsXCJub1wiOlwiQUQwMjIwMTgxMTEzMTAwNjMzODExNTVcIixcInBob25lXCI6XCIxODY1NTQ1MjYyOVwiLFwidXNlckNvZGVcIjpcIjE4NjU1NDUyNjI5XCIsXCJ1c2VyU3RhdHVzXCI6MCxcInVzZXJUeXBlXCI6XCIwMVwifSIsImNyZWF0ZWQiOjE1NDM0NjMxNjE2MDksInVzZXJObyI6IkFEMDIyMDE4MTExMzEwMDYzMzgxMTU1IiwidXNlclR5cGUiOiIwMSIsImV4cCI6MTU0NDMyNzE2MSwidXNlcklkIjozNzh9.GqSaqDHK8llEZO40h8AJ1NYAT6gSn0OIqVhfMd4-8kk'
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
