<template>
	<div class="my-setup">
		<mhead currentTitle="设置"></mhead>
		<!--<mt-cell :title="title">
			<mt-switch @change="turn" v-model="value"><span></span></mt-switch>
		</mt-cell>-->

		<router-link tag="div" class="setup-ctcperson" to="/myindex/contactPerson">
			<mt-cell title="紧急联系人" is-link></mt-cell>
		</router-link>
		<!-- <router-link tag="div" class="setup-feedback" to="/myindex/myFeedback">
			<mt-cell title="我的反馈" is-link></mt-cell>
		</router-link> -->
		<div tag="div" class="setup-modifypwd" @click="changeWord">
			<mt-cell title="修改密码" is-link></mt-cell>
		</div>
		<!-- <router-link tag="div" class="setup-modifypwd" to="/myindex/changeMobile">
			<mt-cell title="修改手机号" is-link></mt-cell>
		</router-link> -->
		<!-- <router-link tag="div" class="setup-modifypwd" to="/DotCommentDetail">
			<mt-cell title="查看网点评分" is-link></mt-cell>
		</router-link> -->
		<!-- <router-link v-if="vehicleState" tag="div" class="setup-vehiclestate" :to="{path:'/myindex/loginVehicleState',query:{vin:this.vin}}">
			<mt-cell title="车机登录状态" is-link></mt-cell>
		</router-link> -->
		<router-link  tag="div" class="setup-vehiclestate" to="/myindex/logoutVehicleState">
			<mt-cell title="车机扫码登录" is-link></mt-cell>
		</router-link>
		<div v-show="this.banben" class="setup-ctcperson" @click="versionupdate" style="position:relative">
			<div v-show="this.flag" style="position:absolute;z-index:2;width:.1rem;height:.1rem;border-radius:50%;background:red;left:2.4rem;top:.3rem;"></div>
			<mt-cell  :title="this.update" is-link></mt-cell>
		</div>
		<div tag="div" class="setup-loginout" to="">
			<mt-cell @click.native="signOut" title="退出登录" is-link></mt-cell>
		</div>
	</div>
</template>

<script>
import PublicHead from "../publicmodel/PublicHead";
import { MessageBox } from "mint-ui";
export default {
  name: "mySetup",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      title: "软键盘",
      value: true,
      vin: "",
      banben: true, //判断兼容低版本不能更新显示消失
      flag: false, //控制版本更新的红点
      update: "", //更新版本号
      vehicleState: "", //车机登录状态,true代表登录, false代表未登录
      firstTips: true //车机状态第一次提示,true不提示,改变为false的时候,Toast进行提示
    };
  },
  methods: {
    signOut() {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定要退出登录吗？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "退出",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
            localStorage.removeItem("Tip");
            // 登出时候清空vuex中用户信息和登录状态，清空axios的token
            // this.$store.dispatch("isLogin", false);
            // this.$store.dispatch("userId", null);
            // this.$store.dispatch('userInfo',null);
            // this.$http.defaults.headers.common["timaToken"]=null;
            // this.$store.state.enterMaintenance=false;
            this.$store.state.addiflogin=false
            // this.$store.state.defaultInformation={};
            var system = this.isIOSOrAndroid();
            if (system == "Android") {
              window.js2android.logout(); //安卓退出App
            } else if (system == "IOS") {
              let param={}
              window.webkit.messageHandlers.logout.postMessage(param);
            }
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    getvalue(value) {
      value = JSON.parse(value);
      this.flag = value.flag;
      this.flag = this.flag == "1" ? true : false;
      this.update = value.versionName;
      this.update = "当前版本 " + this.update;
    },
    //判断是否更新
    newphone() {
      if (isMobile.iOS()) {
        window.webkit.messageHandlers.getVersionInfo.postMessage({});
      } else if (isMobile.Android()) {
        if (this.update == "") {
          this.banben = false;
        }
        let Detectionupdate = JSON.parse(window.js2android.getVersionInfo());
        this.flag = Detectionupdate.flag;
        this.flag = this.flag == "1" ? true : false;
        this.update = Detectionupdate.versionName;
        this.update = "当前版本 " + this.update;
        if (this.update != "") {
          this.banben = true;
        }
      }
    },
    //版本更新
    versionupdate() {
      if (isMobile.iOS()) {
        window.webkit.messageHandlers.checkVersion.postMessage({});
      } else if (isMobile.Android()) {
        window.js2android.checkVersion();
      }
    },
    turn() {
      //switch开关方法
      this.value
        ? this.$store.dispatch("SOFTKEYBOARD", true)
        : this.$store.dispatch("SOFTKEYBOARD", false);
    },
    //修改跳转
    changeWord(){
      // if (isMobile.iOS()) {
      //   let params={}
			// 	window.webkit.messageHandlers.showKeyboard.postMessage(params);
			// } else if (isMobile.Android()) {
				this.$router.push('/myindex/modifyPassword')
			// }
    },
    isIOSOrAndroid() {
      //判断ios和安卓机型的方法
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return "Android";
      } else if (isIOS) {
        return "IOS";
      }
    },
    getCarLoginState() {
      //获取机车 登录登出状态
      this.$http
        .get(Lovecar.LogStatus, this.$store.state.tsppin)
        .then(res => {
          const data = res.data;
          if (data.returnSuccess) {
            //字段缺乏,等待接口完成之后添加判断
            var allvin = data.data;
            for (let i = 0; i < allvin.length; i++) {
              if (allvin[i].logStatus) {
                this.vin = allvin[i].vin;
                this.vehicleState = true;
              } else {
                this.vehicleState = false;
              }
            }
            // this.vehicleState = data.data[0].logStatus //true 代表机车已经登录
          } else {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 2001
            });
          }
        })
        .catch(err => {
          Toast({
            message: res.data.returnErrMsg,
            position: "middle",
            duration: 2001
          });
        });
    }
  },
  created() {
          window.getvalue = this.getvalue;
  },
  mounted() {
      this.newphone();

    // this.getCarLoginState()
  }
};
</script>

<style scoped>
.mint-msgbox {
  height: 23% !important;
}
</style>
