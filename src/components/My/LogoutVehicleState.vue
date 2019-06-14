<template>
	<div>
		<mhead currentTitle="车机扫码登录"></mhead>
		<div class="vehicle-show">
			<img class="state-car" src="../../../static/images/my/qrcode@2x.png" alt="" />
			<div>
				<!-- <h5 class="car-title">账号还未在车机登录</h5> -->
				<div class="car-info">
					<h3 style="font: 800 .3rem/.5rem 'PingFang-SC-Medium'">点击扫码登录，登录账号到车机</h3>
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
      //暴露方法给安卓,登入判断
      this.$store.dispatch("QRCODEPIN", status);
    },
    //暴露方法给ios拿数据
    getiosStatus(iosstatus){
     let status= JSON.parse(iosstatus)
     this.$store.dispatch("QRCODEPIN", status);
    },
    getAsyReturn(operationId) {
      this.sjc = new Date().getTime();
      this.$http
        .post(
          Lovecar.OperationId,
          { operationId: operationId },
          this.$store.state.tsppin
        )
        .then(res => {
          var tS = new Date().getTime() - this.sjc; //时间戳 差
          var tSS = parseInt((tS / 1000) % 60); // 时间差
          if (res.data.returnSuccess == true) {
            if (res.data.status == "IN_PROGRESS") {
              //60s  后 清除定时器，不在发请求
              if (tSS >= 5) {
                localhide();
              } else {
                this.time = setInterval(() => {
                  this.$http
                    .post(
                      Lovecar.OperationId,
                      { operationId: operationId },
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      var tS = new Date().getTime() - this.sjc; //时间戳 差
                      var tSS = parseInt((tS / 1000) % 60); // 时间差
                      if (res.data.returnSuccess == true) {
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求
                          if (tSS >= 5) {
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          Toast({
                            message: "登入成功",
                            position: "middle",
                            duration: 2000
                          });
                          clearInterval(this.time);
                          localhide();
                        } else if (res.data.status == "FAILED") {
                          clearInterval(this.time);
                          localhide();
                        }
                      } else {
                        clearInterval(this.time);
                        localhide();
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              Toast({
                message: "登入成功",
                position: "middle",
                duration: 2000
              });
               clearInterval(this.time);
              localhide();
            } else if (res.data.status == "FAILED") {

               clearInterval(this.time);
              localhide();
            }
          } else {
            clearInterval(this.time);
            localhide();
          }
        });
    },
  },
  created() {
    window.getStatus = this.getStatus;
    window.getiosStatus = this.getiosStatus;
    // window.getStatus2 = this.getStatus2;
  },
  mounted() {

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
        let data = {
          vin: this.qrCode.vin,
          userName: this.$store.state.mobile
        };
        this.$http
          .post(Lovecar.RemoteVehicleLogin, data, this.$store.state.tsppin)
          .then(res => {
            const data = res.data;
            if (data.returnSuccess) {
              this.getAsyReturn(data.operationId)
            }
          })
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
   color: #444444;
  font: 600 .4rem/.6rem 'PingFang-SC-Medium'
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
