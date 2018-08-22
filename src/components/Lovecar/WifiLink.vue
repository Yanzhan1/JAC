<template>
	<div class="wifi-link">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">WIFI直连</span>
			<span class="header-right"><router-link tag="img" :to="{name:'wifi设置',params:{names:this.names,pwd:this.pwd}}" @click.native="wifisend" style="width: 0.36rem;height: 0.36rem;" :src="'./static/images/Lovecar/Set@2x.png'"></router-link></span>
		</header>
		<div style="height:0.88rem"></div>
		<mt-cell :title="title">
			<mt-switch  v-model="value" @change="turn"></mt-switch>
		</mt-cell>
		<div class="line"></div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					wifi名称:
				</span>
				<input :disabled="disabled" type="text" v-model="names" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					账户:
				</span>
				<input style="margin-left: 1rem;" :disabled="disabled" type="text" v-model="pwd" />
			</div>
		</div>
	</div>
</template>

<script>
export default {
  name: "wifiLink",
  data() {
    return {
      time: "", //定时器命名
      //开关按钮状态
      value: true,
      //开关按钮title
      title: "wifi开关",
      //输入框是否可输入
      disabled: true,
      //名字输入框内容
      names: "",
      //密码输入框内容
      pwd: "",
      nums: "", //床给后端的判断空调是否开启
      operationIds: ""
    };
  },
  methods: {
    //重复调用异步接口
    getAsyReturn(operationId) {
      var flag = true;
      this.sjc = new Date().getTime();
      this.$http
        .post(
          Lovecar.OperationId,
          { operationId: operationId },
          this.$store.state.getpin
        )
        .then(res => {
          var tS = new Date().getTime() - this.sjc; //时间戳 差
          var tSS = parseInt((tS / 1000) % 60); // 时间差
          if (res.data.returnSuccess == true) {
            if (res.data.status == "IN_PROGRESS") {
              //60s  后 清除定时器，不在发请求
              console.log(tSS);
              if (tSS >= 56) {
                Toast({
                  message: "请求超时",
                  position: "middle",
                  duration: 3000
                });
                this.$store.dispatch("LOADINGFLAG", false);
              } else {
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
                      if (res.data.returnSuccess == true) {
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求
                          console.log(tSS);
                          if (tSS >= 56) {
                            Toast({
                              message: "请求超时",
                              position: "middle",
                              duration: 3000
                            });
                            clearInterval(this.time);
                            this.$store.dispatch("LOADINGFLAG", false);
                          }
                        } else if (res.data.status == "SUCCEED") {
                          flag = false;
                          Toast({
                            message: "下达指令成功",
                            position: "middle",
                            duration: 3000
                          });
                          clearInterval(this.time);
                          this.$store.dispatch("LOADINGFLAG", false);
                        } else if (res.data.status == "FAILED") {
                          flag = false;
                          Toast({
                            message: "指令下发成功，处理失败！",
                            position: "middle",
                            duration: 3000
                          });
                          clearInterval(this.time);
                          this.$store.dispatch("LOADINGFLAG", false);
                        }
                      } else {
                        Toast({
                          message: "指令下发失败！",
                          position: "middle",
                          duration: 3000
                        });
                        flag = false;
                        clearInterval(this.time);
                        this.$store.dispatch("LOADINGFLAG", false);
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              flag = false;
              Toast({
                message: "下达指令成功",
                position: "middle",
                duration: 3000
              });
              this.$store.dispatch("LOADINGFLAG", false);
            } else if (res.data.status == "FAILED") {
              Toast({
                message: "指令下发成功，处理失败！",
                position: "middle",
                duration: 3000
              });
              this.$store.dispatch("LOADINGFLAG", false);
            }
          } else {
            Toast({
              message: "指令下发失败！",
              position: "middle",
              duration: 3000
            });
            flag = false;
            clearInterval(this.time);
            this.$store.dispatch("LOADINGFLAG", false);
          }
        });
    },
    turn() {
      this.value ? (this.nums = 1) : (this.nums = 2);
      console.log(this.value);
      console.log(this.nums);
      var param = {
        vin: this.$store.state.vins,
        operationType: "WIFI",
        operation: this.nums, //操作项
        extParams: {
          userCategory: 1, //授权人
          newAccount: this.names,
          newPwd: this.pwd
        }
      };
      this.$http
        .post(Lovecar.Control, param, this.$store.state.getpin)
        .then(res => {
          if (res.data.returnSuccess) {
            this.getAsyReturn(res.data.operationId);
          } else {
            Toast({
              message: "token验证失败",
              position: "middle",
              duration: 3000
            });
          }
        });
    },
    wifisend() {}
  },
  mounted() {
    var param = {
      vin: this.$store.state.vins,
      operationType: "WIFI",
      operation: 5, //操作项
      extParams: {
        userCategory: 1 //授权人
      }
    };
    this.$http
      .post(Lovecar.Control, param, this.$store.state.getpin)
      .then(res => {
        console.log(res);
        this.operationIds = res.data.operationId;
        if (res.data.returnSuccess) {
          this.getAsyReturn(res.data.operationId);
        } else {
          Toast({
            message: "token验证失败",
            position: "middle",
            duration: 3000
          });
        }
      });
    // console.log(this.$route.params.userCategory)
    this.names = this.$route.params.wifiname;
    this.pwd = this.$route.params.wifipwd;
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
  margin-left: 0.6rem;
}
/*灰色间隔*/
.line {
  height: 0.1rem;
  background: #f1f1f1;
}
/*每个item*/
.origin-pin > div {
  width: 90%;
  margin: 0 auto;
}
</style>