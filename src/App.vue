<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
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
    init() {
      try {
        if (isMobile.iOS()) {
          var params = {};
          window.webkit.messageHandlers.init.postMessage(params);
        } else if (isMobile.Android()) {
          window.js2android.isLogin();
        }
      } catch (err) {
        console.log("无此方法");
      }
    },
    isLogin(userInfo) {
      // this.$store.dispatch('change$FLAG', true)// 不要动 有用
      if (userInfo && userInfo.no) {
        this.$store.dispatch("isLogin", true);
        // 江淮用户系统的需要通过no字段作为用户的唯一标识，所以将no作为userId使用
        // const secUid = Secret.Encrypt(userInfo.no)
        // this.$store.dispatch("userId", secUid);
        this.$store.dispatch("userId", userInfo.no);
        this.$store.dispatch("userInfo", userInfo);
        this.$http.defaults.headers.common["timaToken"] = userInfo.token;
        let params = {
          userNo: userInfo.no
        };

        this.$http.post(Lovecar.TSP, params).then(res => {
          if (res.data.msg == "success") {
            var tsp = res.data.data;
            this.$store.dispatch("TSP", tsp);
            localStorage.setItem(
              "aaaid",
              JSON.stringify(this.$store.state.aaaid)
            );
          }
        });
        //获取原生给你默认车辆的所有信息
        if (isMobile.iOS()) {
          if (userInfo.defaultInformation) {
            this.$store.dispatch(
              "defaultInformation",
              JSON.parse(userInfo.defaultInformation)
            );
            //  if(JSON.parse(userInfo.defaultInformation).brandId==5){
            //     let identityParam=JSON.parse(this.$store.state.tsppin.headers.identityParam)
            //     identityParam.tspType='NEUSOFT_ENERGY'
            //     this.$store.state.tsppin.headers.identityParam = JSON.stringify(identityParam)
            //   }else{
            //       let identityParam=JSON.parse(this.$store.state.tsppin.headers.identityParam)
            //       identityParam.tspType=''
            //       this.$store.state.tsppin.headers.identityParam = JSON.stringify(identityParam)
            //   }
            // if (
            //   JSON.parse(userInfo.defaultInformation).brandId == 4 ||
            //   5 ||
            //   6
            // ) {
            //   this.$store.state.enterMaintenance = true;
            // } else {
            //   this.$store.state.enterMaintenance = false;
            // }
            // if(userInfo.token){
            //   let param = {
            //     lmscode:
            //       JSON.parse(userInfo.defaultInformation).modelNo,
            //     levelCode:
            //       JSON.parse(userInfo.defaultInformation).seriesNo,
            //     tspFlag: JSON.parse(userInfo.defaultInformation).tspFlag,
            //     seriesName:JSON.parse(userInfo.defaultInformation).seriesName
            //   };
            //   this.$http
            //     .post(Wit.SearchVehicleSeriesByVehicle, param)
            //     .then(res => {
            //       if(res.data.code==0){
            //         if (res.data.data.brandId == 4 || 5 || 6) {

            //           if (userInfo.no) {
            //             this.$store.state.enterMaintenance = true;
            //           }else{
            //             this.$store.state.enterMaintenance = false;
            //           }
            //         }else{
            //             this.$store.state.enterMaintenance = false;
            //           }
            //       }else{
            //           this.$store.state.enterMaintenance = false;
            //       }
            //     });
            // }
          } 
          // else {
          //   this.$store.state.enterMaintenance = false;
          // }
        } else if (isMobile.Android()) {
          if (userInfo.defaultInformation && userInfo.defaultInformation.vin) {
            this.$store.dispatch(
              "defaultInformation",
              userInfo.defaultInformation
            );
            // if(userInfo.defaultInformation.brandId==5){
            //     let identityParam=JSON.parse(this.$store.state.tsppin.headers.identityParam)
            //     identityParam.tspType='NEUSOFT_ENERGY'
            //     this.$store.state.tsppin.headers.identityParam = JSON.stringify(identityParam)
            // }else{
            //     let identityParam=JSON.parse(this.$store.state.tsppin.headers.identityParam)
            //     identityParam.tspType=''
            //     this.$store.state.tsppin.headers.identityParam = JSON.stringify(identityParam)
            // }
            // if (userInfo.defaultInformation.brandId == 4 || 5 || 6) {
            //   this.$store.state.enterMaintenance = true;
            // } else {
            //   this.$store.state.enterMaintenance = false;
            // }
            // if(userInfo.token){
            //   let param = {
            //     lmscode:
            //       userInfo.defaultInformation.modelNo,
            //     levelCode:
            //       userInfo.defaultInformation.seriesNo,
            //     tspFlag: userInfo.defaultInformation.tspFlag,
            //     seriesName: userInfo.defaultInformation.seriesName
            //   };
            //   this.$http
            //     .post(Wit.SearchVehicleSeriesByVehicle, param)
            //     .then(res => {
            //       if(res.data.code==0){
            //         if (res.data.data.brandId == 4 || 5 || 6) {
            //           if (userInfo.no) {
            //             this.$store.state.enterMaintenance = true;
            //           }else{
            //             this.$store.state.enterMaintenance = false;
            //           }
            //         }else{
            //             this.$store.state.enterMaintenance = false;
            //           }
            //       }else{
            //           this.$store.state.enterMaintenance = false;
            //       }
            //     });
            // }
          }
          //  else {
          //   this.$store.state.enterMaintenance = false;
          // }
        }
        this.$store.dispatch("CARVINS", userInfo.vin);
        this.$store.dispatch("nomarlseriseName", userInfo.seriesName);

        localStorage.setItem("mobile", JSON.stringify(userInfo.mobile));
        localStorage.setItem("userName", JSON.stringify(userInfo.userName));
      } else {
        // this.$store.state.enterMaintenance = false;
        this.$store.dispatch("isLogin", false);
        this.$store.dispatch("userId", null);
      }
      // 如果登录成功，获取用户头像
      if (
        this.$http.defaults.headers.common["timaToken"] &&
        this.$store.state.userId
      ) {
        var param = {
          no: this.$store.state.userId
        };
        this.$http.post(My.UserInfo, param).then(res => {
          if (res.data.code == 0) {
            this.$store.dispatch("imgUrl", res.data.data.headUrl);
          }
        });
        //暂时不上uat
        // this.synchronization();
      }
    },
    localshow() {
      var system = IOSAndAndroid.isIOSOrAndroid();
      try {
        if (system == "IOS") {
          var params = {};
          window.webkit.messageHandlers.showProgressDialog.postMessage(params);
        } else if (isMobile.Android() && window.js2android) {
          js2android.showProgressDialog();
        }
      } catch (err) {
        console.log("无此方法");
      }
    },
    localhide() {
      // 防止用户原生连点隐藏的遮罩层
      try {
        if (isMobile.iOS()) {
          var params = {};
          window.webkit.messageHandlers.dismissProgressDialog.postMessage(
            params
          );
        } else if (isMobile.Android() && window.js2android) {
          js2android.dismissProgressDialog();
        }
      } catch (err) {
        console.log("暂时没有此方法");
      }
    },
    //同步用户标签
    synchronization() {
      this.$http.post(My.addLabelEntityToUser, {}).then(res => {});
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
    window.goindex = this.goindex;
    window.localshow = this.localshow;
    window.localhide = this.localhide;
    this.init();
    // window.loadTab = this.loadTab;
  },
  mounted() {
    localStorage.setItem("time", "60");
    // this.isLogin({name:'',no:'AD022018101009093840922'})
    // this.$http.defaults.headers.common['timaToken'] = 'Tima eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySW5mbyI6IntcIkFBQUlkXCI6MTMzMjkzMjk2MSxcIlRTUElkXCI6MTMzMjkzMjk2MSxcImFhYVRva2VuXCI6XCJiMjM4MDBjNC00ZDRjLTRjNjQtYjQ3Yi02ODJjZWRlNTM3MTFcIixcImF1dGhlbnRpY2F0aW9uU3RhdHVzXCI6MCxcImNyZWF0ZWREYXRlXCI6MTUzOTEzMzc3ODAwMCxcImRlbGV0ZUZsYWdcIjpcIjBcIixcImlkXCI6MzAyLFwiaW5pdFVzZXJcIjowLFwibGFzdE1vZGlmaWVkRGF0ZVwiOjE1NTA0ODczMTMwMDAsXCJub1wiOlwiQUQwMjIwMTgxMDEwMDkwOTM4NDA5MjJcIixcInBob25lXCI6XCIxNzMzMzIxOTg1MlwiLFwicmVhbFBob25lXCI6XCIxNzMqKioqOTg1MlwiLFwidXNlckNvZGVcIjpcIjE3MzMzMjE5ODUyXCIsXCJ1c2VyU3RhdHVzXCI6MCxcInVzZXJUeXBlXCI6XCIwMVwifSIsImNyZWF0ZWQiOjE1NTQzNjE0OTc0NzksInVzZXJObyI6IkFEMDIyMDE4MTAxMDA5MDkzODQwOTIyIiwidXNlclR5cGUiOiIwMSIsImV4cCI6MTU1NTIyNTQ5NywidXNlcklkIjozMDJ9.5DQ8qpPIdztF2eq33znqyNKlyrTu9AH9BeoDqHqzxIc'
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
