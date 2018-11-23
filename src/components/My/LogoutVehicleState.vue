<template>
	<div>
		<mhead currentTitle="车机登录状态"></mhead>
		<div class="vehicle-show">
			<img class="state-car" src="../../../static/images/my/qrcode@2x.png" alt="" />
			<div>
				<h5 class="car-title">账号还未在车机登录</h5>
				<div class="car-info">
					<p>点击扫码登录，登录账号到车机</p >
				</div>
			</div>
		</div>
			<div class="bottom-btn" @click="login">
				<img :src="'./static/images/my/code@2x.png'" alt="" />
				<span>扫码登录</span>
			</div>
</div>
</template>

<script>
import PublicHead from "../publicmodel/PublicHead";
import { Toast } from "mint-ui";
export default {
  name: "logoutVehicleState",
  components: {
    mhead: PublicHead
  },
  data() {
    return {};
  },
  methods: {
    login() {
      // 机车未登录 点击 扫一扫
      if (isMobile.iOS()) {
        var params = {};
        window.webkit.messageHandlers.scan.postMessage(params);
      } else if (isMobile.Android()) {
        js2android.scan();
      }
    },
    getStatus(status) {
      //暴露方法给原生,登入判断
      this.$store.dispatch("QRCODEPIN", JSON.parse(status));
    }
  },
  created() {
    window.getStatus = this.getStatus;
  },
  mounted() {
    console.log(this.$store.state.qrCodeDate);
  },
  computed: {
    qrCode() {
      return this.$store.state.qrCodeDate;
    }
  },
  watch: {
    qrCode(newVal, oldVal) {
      //解决扫一扫无法及时获取二维码信息的异步问题
      if (this.qrCode) {
        // let nowtime=(new Date()).getTime()
        // console.log(nowtime-this.qrCode.createTime)
        // if((nowtime-this.qrCode.createTime)<500000){

        let data = {
          vin: this.qrCode.vin,
          userName: this.$store.state.mobile
        };
        this.$http
          .post(Lovecar.RemoteVehicleLogin, data, this.$store.state.tsppin)
          .then(res => {
            const data = res.data;
            //							console.log('扫一扫登入接口状态: '+data.returnSuccess)
            if (data.returnSuccess) {
              Toast({
                message: "登录成功",
                position: "middle",
                duration: 2000
              });
            }else{
              Toast({
                message: "登入失败",
                position: "middle",
                duration: 2000
              });
            }
          })
          .catch(err => {});
        // }else{
        // 	Toast({
        // 			message: '二维码超时',
        // 				position: "middle",
        // 				duration: 2000
        // 		})
        // }
      }
    }
  }
};
</script>

<style scoped>
.vehicle-show {
  position: relative;
  width: 100%;
  height: 100%;
  top: 2.6rem;
  text-align: center;
}
.vehicle-show .state-car {
  position: absolute;
  width: 2.2rem;
  height: 1.73rem;
  top: 50%;
  left: 50%;
  margin-left: -1.1rem;
  margin-bottom: 1.14rem;
}
.vehicle-show .car-title {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  margin-left: -50%;
  margin-top: 2.6rem;
  color: #444444;
  font-size: 0.36rem;
  text-align: center;
}
.vehicle-show .car-info {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  margin-top: 3.2rem;
  margin-left: -50%;
}
.bottom-btn {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bottom-btn > img {
  width: 0.28rem;
  height: 0.28rem;
  margin-bottom: 0;
  margin-right: 0.2rem;
}
</style>