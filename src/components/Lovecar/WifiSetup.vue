<template>
	<div class="wifi-setup">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">设置账户密码</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					wifi名称:
				</span>
				<input type="text" v-model="wifiData.name" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					密码:
				</span>
				<input style="margin-left: 0.9rem;" type="text" v-model="wifiData.pwd" />
			</div>
		</div>
		<button class="bottom-btn" @click="confirm">确认</button>
	</div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  name: "wifiSetup",
  data() {
    return {
      time:'',//定时器命名
      //wifi数据
      wifiData: {
        name: "",
        //wifi密码
        pwd: ""
      },
      userCategory: "", //传入1：车主或者2：授权用户
      operationIds: ""
    };
  },
  methods: {
    //重复调用异步接口
    getAsyReturn(operationId) {
      var flag = true;
      this.sjc = new Date().getTime();
      this.time = setInterval(() => {
        this.$http
          .post(
            Lovecar.OperationId,
            { operationId: operationId },
            this.$store.state.getpin
          )
          .then(res => {
            var tS = new Date().getTime() - this.sjc; //时间戳 差
            var tSS = parseInt((tS / 1000) % 60); // 时间差
            if ((res.data.returnSuccess == true)) {
              if (res.data.status == "IN_PROGRESS") {
                //60s  后 清除定时器，不在发请求
                console.log(tSS);
                if (tSS >= 56) {
                  Toast({
                    message: "无线修改请求超时",
                    position: "middle",
                    duration: 3000
                  });
                  var self = this;
                  clearInterval(self.time);
                }
              } else if (res.data.status == "SUCCEED") {
                flag = false;
                clearInterval(this.time);
              } else if (res.data.status == "FAILED") {
                flag = false;
                Toast({
                  message: "指令下发成功，处理失败！",
                  position: "middle",
                  duration: 3000
                });
                clearInterval(this.time);
              }
            } else {
              Toast({
                message: "指令下发失败！",
                position: "middle",
                duration: 3000
              });
              flag = false;
              clearInterval(this.time);
            }
          });
      }, 4000);
    },

    confirm() {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定保存当前WiFi信息吗？？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
            var param = {
              vin: this.$store.state.vin,
              operationType: "WIFI",
              operation: 3,
              extParams: {
                userCategory: 1,
                newAccount: this.wifiData.name,
                newPwd: this.wifiData.pwd
              }
            };
            this.$http
              .post(Lovecar.Control, param, this.$store.state.getpin)
              .then(res => {
                console.log(res);
                this.operationIds = res.data.operationId;
                console.log(this.operationIds);
                if (res.data.returnSuccess) {
                  this.getAsyReturn(res.data.operationId);
                } else {
                  Toast({
                    message: "token验证失败",
                    position: "middle",
                    duration: 3000
                  });
                }
                if (res.data.returnSuccess == true) {
                  this.$router.push({
                    name: "wifi直连",
                    params: {
                      wifiname: this.wifiData.name,
                      wifipwd: this.wifiData.pwd
                      // userCategory:this.userCategory,
                    }
                  });
                }
              });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            console.log("cancel");
          }
        });
    }
  },
  mounted() {
    // this.$route.params.userCategory?this.userCategory=1:this.userCategory=2
    this.wifiData.name = this.$route.params.names;
    this.wifiData.pwd = this.$route.params.pwd;
    // console.log(this.userCategory)
  }
};
</script>

<style scoped>
/*flex*/

.flex-center-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-align-center {
  /*垂直居中*/
  display: flex;
  align-items: center;
}
/*公共样式*/

.revisePinCommon {
  height: 1rem;
  border-bottom: 1px solid #efefef;
}

input {
  outline: none;
  border: none;
  background: none;
  margin-left: 0.4rem;
}

.origin-pin > div {
  width: 90%;
  margin: 0 auto;
}
</style>